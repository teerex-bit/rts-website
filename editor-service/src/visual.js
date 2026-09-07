const LOCKED=new Set([1,38]);

function sameField(edit,field){
 return edit.pageNumber===field.pageNumber&&edit.route===field.route&&edit.sectionId===field.sectionId&&edit.fieldId===field.fieldId&&field.kinds.includes(edit.kind);
}

function createVisualPlanner({apiKey,fetcher=fetch,model='gpt-6'}){
 if(typeof apiKey!=='string'||apiKey.length<20)throw Error('OPENAI_NOT_CONFIGURED');
 return {async plan({pageNumber,request,reference,fields,assets}){
  if(LOCKED.has(pageNumber))throw Error('LOCKED_PAGE');
  if(!Number.isInteger(pageNumber)||typeof request!=='string'||request.trim().length<3||request.length>2000)throw Error('INVALID_VISUAL_REQUEST');
  if(typeof reference!=='string'||reference.length<20||!Array.isArray(fields)||!Array.isArray(assets))throw Error('INVALID_VISUAL_CONTEXT');
  const allowed=fields.map(({pageNumber,route,sectionId,fieldId,kinds})=>({pageNumber,route,sectionId,fieldId,kinds}));
  const instructions='You are a careful visual editor for a review-only website. Compare the approved reference image with the current page request. Return one safe, minimal proposed edit only when it can be performed through an allowed registered field and, for image edits, one provided project asset. Do not change prose unless explicitly requested. Never use the reference screenshot as an asset. If there is no safe registered edit, return an empty edit and explain what is missing.';
  const schema={type:'object',additionalProperties:false,required:['summary','edit'],properties:{summary:{type:'string',maxLength:600},edit:{anyOf:[{type:'null'},{type:'object',additionalProperties:false,required:['pageNumber','route','sectionId','fieldId','kind','value'],properties:{pageNumber:{type:'integer'},route:{type:'string'},sectionId:{type:'string'},fieldId:{type:'string'},kind:{type:'string'},value:{type:['string','boolean','integer']}}}]}}};
  const response=await fetcher('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({model,input:[{role:'developer',content:[{type:'input_text',text:instructions}]},{role:'user',content:[{type:'input_text',text:JSON.stringify({pageNumber,request,allowedFields:allowed,existingAssetPaths:assets})},{type:'input_image',image_url:'data:image/png;base64,'+reference,detail:'low'}]}],text:{format:{type:'json_schema',name:'visual_review_edit',strict:true,schema}},max_output_tokens:700})});
  if(!response.ok)throw Error('VISUAL_MODEL_UNAVAILABLE');
  const raw=await response.json();let result;try{result=JSON.parse(raw.output_text);}catch{throw Error('VISUAL_MODEL_INVALID');}
  if(result.edit===null)return {summary:result.summary,edit:null};
  const edit=result.edit;
  if(!allowed.some(field=>sameField(edit,field)))throw Error('VISUAL_MODEL_UNSAFE_EDIT');
  if(edit.kind==='image'&&(!assets.includes(edit.value)||!String(edit.value).startsWith('/assets/')))throw Error('VISUAL_MODEL_UNSAFE_ASSET');
  return {summary:result.summary,edit};
 }};
}

module.exports={createVisualPlanner};
