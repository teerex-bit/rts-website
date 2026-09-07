const {createSign} = require('node:crypto');
const {validateOverrideDocument} = require('../../src/editor/override-schema');
const ROOT='https://api.github.com';
const REPO='/repos/teerex-bit/rts-website';
const FILE='src/editor/overrides.json';
const BRANCH='review';

function createRepository({appId,privateKey,fetcher=fetch,now=Date.now}) {
 let accessToken;
 async function request(path,token,method='GET',body) {
  const result=await fetcher(ROOT+path,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','User-Agent':'RTS-private-editor','Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
  if(!result.ok)throw new Error(result.status===409||result.status===422?'STALE_CHANGE':`GITHUB_REQUEST_FAILED_${result.status}`);
  return result.json();
 }
 async function token() {
  if(accessToken&&accessToken.until>now()+60000)return accessToken.value;
  const encode = value=>Buffer.from(JSON.stringify(value)).toString('base64url');
  const data=encode({alg:'RS256',typ:'JWT'})+'.'+encode({iat:Math.floor(now()/1000)-60,exp:Math.floor(now()/1000)+540,iss:String(appId)});
  const signer=createSign('RSA-SHA256');signer.update(data);signer.end();
  const jwt=data+'.'+signer.sign(privateKey,'base64url');
  const installation=await request(REPO+'/installation',jwt);
  const result=await request(`/app/installations/${installation.id}/access_tokens`,jwt,'POST',{repositories:['rts-website'],permissions:{contents:'write',actions:'read'}});
  accessToken={value:result.token,until:Date.parse(result.expires_at)};return accessToken.value;
 }
 async function read(path) {return request(REPO+path,await token());}
 return {
  async snapshot() {
   const ref=await read('/git/ref/heads/'+BRANCH);const head=ref.object.sha;
   const file=await read('/contents/'+FILE+'?ref='+head);
   if(file.encoding!=='base64')throw new Error('UNSUPPORTED_CONTENT');
   const document=JSON.parse(Buffer.from(file.content,'base64').toString('utf8'));
   validateOverrideDocument(document);return {head,document};
  },
  async commit(parent,document) {
   validateOverrideDocument(document);
   const t=await token();const base=await request(REPO+'/git/commits/'+parent,t);
   const tree=await request(REPO+'/git/trees',t,'POST',{base_tree:base.tree.sha,tree:[{path:FILE,mode:'100644',type:'blob',content:JSON.stringify(document,null,2)+'\n'}]});
   const commit=await request(REPO+'/git/commits',t,'POST',{message:'editor: apply approved routine review change',tree:tree.sha,parents:[parent]});
   // Never force: if review advanced meanwhile, GitHub rejects this update.
   await request(REPO+'/git/refs/heads/'+BRANCH,t,'PATCH',{sha:commit.sha,force:false});
   return commit.sha;
  }
 };
}
module.exports={createRepository};
