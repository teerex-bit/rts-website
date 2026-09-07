const {createHmac,createHash,timingSafeEqual,randomUUID} = require('node:crypto');
const {validateOverride,validateOverrideDocument} = require('../../src/editor/override-schema');
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const publicEdit = edit => ({pageNumber:edit.pageNumber,route:edit.route,sectionId:edit.sectionId,fieldId:edit.fieldId,kind:edit.kind,value:edit.value});

// Caller identity must come from verified authentication, never tool arguments.
function createEditor({repo,secret,owner,now=Date.now}) {
 if (typeof secret!=='string'||secret.length<32||!owner) throw new Error('EDITOR_NOT_CONFIGURED');
 const authorize = user => {if(user!==owner)throw new Error('FORBIDDEN');};
 const sign = data => createHmac('sha256',secret).update(data).digest('base64url');
 const encode = payload => {const data=Buffer.from(JSON.stringify(payload)).toString('base64url');return data+'.'+sign(data);};
 const decode = token => {
  if(typeof token!=='string'||token.length>32768)throw new Error('INVALID_CHANGE');
  const parts=token.split('.');if(parts.length!==2)throw new Error('INVALID_CHANGE');
  const expected=Buffer.from(sign(parts[0]));const actual=Buffer.from(parts[1]);
  if(actual.length!==expected.length||!timingSafeEqual(actual,expected))throw new Error('INVALID_CHANGE');
  let value;try{value=JSON.parse(Buffer.from(parts[0],'base64url'));}catch{throw new Error('INVALID_CHANGE');}
  if(!Number.isFinite(value.expires)||value.expires<=now())throw new Error('EXPIRED_CHANGE');
  return value;
 };
 return {
  async preview(input,user) {
   authorize(user);
   if(!input||Object.keys(input).some(k=>!['pageNumber','route','sectionId','fieldId','kind','value'].includes(k)))throw new Error('INVALID_CHANGE');
   if(typeof input.value==='string'&&input.value.length>8000)throw new Error('CHANGE_TOO_LARGE');
   const snapshot=await repo.snapshot();validateOverrideDocument(snapshot.document);
   const edit=validateOverride({...input,id:randomUUID(),sourceCommit:snapshot.head,requestedBy:user,createdAt:new Date(now()).toISOString()});
   const payload={edit,before:hash(snapshot.document),expires:now()+15*60*1000};
   return {changeToken:encode(payload),sourceCommit:snapshot.head,summary:`Page ${edit.pageNumber}: ${edit.sectionId}.${edit.fieldId} (${edit.kind})`,proposedValue:edit.value,validationState:'schema-valid; build validation pending',untouched:['production','Page 01','Page 38']};
  },
  async apply(token,user,confirmation) {
   authorize(user);const payload=decode(token);const edit=validateOverride(payload.edit);
   if(edit.requestedBy!==user)throw new Error('FORBIDDEN');
   if(!confirmation||JSON.stringify(publicEdit(edit))!==JSON.stringify(publicEdit(confirmation)))throw new Error('MISMATCH_CHANGE');
   const snapshot=await repo.snapshot();validateOverrideDocument(snapshot.document);
   if(snapshot.head!==edit.sourceCommit||hash(snapshot.document)!==payload.before)throw new Error('STALE_CHANGE');
   const document={version:1,overrides:[...snapshot.document.overrides,edit]};validateOverrideDocument(document);
   const commitSha=await repo.commit(snapshot.head,document);
   return {changeId:edit.id,commitSha,summary:`Saved Page ${edit.pageNumber} change to review only.`,validationState:'pending',untouched:['production','Page 01','Page 38']};
  }
 };
}
module.exports={createEditor};
