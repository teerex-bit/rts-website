import {OAuthProvider} from '@cloudflare/workers-oauth-provider';
import {WorkerEntrypoint} from 'cloudflare:workers';
import changes from './changes.js';
import github from './github.js';
import registry from '../../src/editor/field-registry.js';
import references from '../../src/editor/reference-images.js';
import visual from './visual.js';
import {authHandler,ORIGIN,OWNER} from './auth.mjs';
const schema=properties=>({type:'object',properties,required:Object.keys(properties),additionalProperties:false});
const tools=[
 {name:'get_page',description:'Read registered editable fields and saved review overrides. Pages 01 and 38 are locked.',inputSchema:schema({pageNumber:{type:'integer',minimum:1,maximum:40}}),annotations:{readOnlyHint:true}},
 {name:'plan_visual_change',description:'REQUIRED for any request involving a page graphic, image, visual layout, or missing visual. It privately compares the approved reference and returns a safe pre-previewed review-only edit using a registered field and an existing project asset. Never call preview_change directly for an image; reference PNGs are never website assets.',inputSchema:schema({pageNumber:{type:'integer',minimum:1,maximum:40},request:{type:'string',minLength:3,maxLength:2000}}),annotations:{readOnlyHint:true}},
 {name:'preview_change',description:'Preview only text, links, alt text, or declared layout values. For every image or visual request, use plan_visual_change instead. Does not save.',inputSchema:schema({pageNumber:{type:'integer'},route:{type:'string'},sectionId:{type:'string'},fieldId:{type:'string'},kind:{enum:['text','link','image','alt','spacing','align','color','visibility','order']},value:{type:['string','boolean','integer']}}),annotations:{readOnlyHint:true}},
 {name:'apply_change',description:'Save the exact previously previewed review-only change after approval. The page, field, and proposed value must match the signed preview. Never changes production.',inputSchema:schema({changeToken:{type:'string'},pageNumber:{type:'integer'},route:{type:'string'},sectionId:{type:'string'},fieldId:{type:'string'},kind:{enum:['text','link','image','alt','spacing','align','color','visibility','order']},value:{type:['string','boolean','integer']}}),annotations:{readOnlyHint:false,destructiveHint:false,idempotentHint:false}}
];
export class McpHandler extends WorkerEntrypoint{
 async fetch(request){
  if(this.ctx.props?.userId!==OWNER)return new Response('Forbidden',{status:403});
  if(request.method!=='POST')return new Response('Method not allowed',{status:405,headers:{Allow:'POST'}});
  if(Number(request.headers.get('content-length'))>40000)return new Response('Too large',{status:413});
  let msg;try{const body=await request.text();if(body.length>40000)throw Error();msg=JSON.parse(body);}catch{return new Response('Invalid request',{status:400});}
  const reply=result=>Response.json({jsonrpc:'2.0',id:msg.id,result},{headers:{'Cache-Control':'no-store'}});
  if(msg.method==='notifications/initialized')return new Response(null,{status:202});
  if(msg.method==='initialize')return reply({protocolVersion:'2025-03-26',capabilities:{tools:{}},serverInfo:{name:'RTS private editor',version:'0.1.0'}});
  if(msg.method==='ping')return reply({});
  if(msg.method==='tools/list')return reply({tools});
  if(msg.method!=='tools/call')return Response.json({jsonrpc:'2.0',id:msg.id,error:{code:-32601,message:'Unknown method'}});
  try{
   const repo=github.createRepository({appId:this.env.RTS_APP_ID,privateKey:this.env.RTS_APP_PRIVATE_KEY});
   const editor=changes.createEditor({repo,secret:this.env.CHANGE_TOKEN_SECRET,owner:OWNER});
   const args=msg.params?.arguments||{};let result;
   if(msg.params?.name==='get_page'){
    if(!Number.isInteger(args.pageNumber)||args.pageNumber<1||args.pageNumber>40||Object.keys(args).length!==1)throw Error('Invalid page number');
    if([1,38].includes(args.pageNumber))result={pageNumber:args.pageNumber,locked:true};
    else{const snapshot=await repo.snapshot();result={pageNumber:args.pageNumber,sourceCommit:snapshot.head,fields:registry.fields.filter(f=>f.pageNumber===args.pageNumber),overrides:snapshot.document.overrides.filter(e=>e.pageNumber===args.pageNumber),note:'Base page content is not included. Do not infer current text from these overrides alone.'};}
   }else if(msg.params?.name==='plan_visual_change'){
    if(!Number.isInteger(args.pageNumber)||args.pageNumber<1||args.pageNumber>40||typeof args.request!=='string'||Object.keys(args).length!==2)throw Error('Invalid visual request');
    if([1,38].includes(args.pageNumber))throw Error('Locked page');
    const snapshot=await repo.snapshot();const reference=references.referenceForPage(args.pageNumber);const image=await repo.reference(reference.path);
    const planner=visual.createVisualPlanner({apiKey:this.env.OPENAI_API_KEY,model:this.env.VISUAL_MODEL});
    const proposal=await planner.plan({pageNumber:args.pageNumber,request:args.request,reference:image.data,fields:registry.fields.filter(field=>field.pageNumber===args.pageNumber),assets:await repo.assets(snapshot.head)});
    const preview=proposal.edit&&await editor.preview(proposal.edit,OWNER);
    result={...proposal,preview,reviewOnly:true,nextAction:proposal.edit?'Show the proposal to the user. On approval, call apply_change with preview.changeToken and the exact previewed edit.':'No safe registered visual edit exists; do not improvise a page rebuild.'};
   }else if(msg.params?.name==='preview_change'){
    if(args.kind==='image')throw Error('Image changes require plan_visual_change');
    result=await editor.preview(args,OWNER);
   }
   else if(msg.params?.name==='apply_change'){
    if(this.env.EDITOR_WRITES_ENABLED!=='true')throw Error('Saving is disabled until review deployment acceptance is complete.');
    if(typeof args.changeToken!=='string')throw Error('Invalid approval');
    result=await editor.apply(args.changeToken,OWNER,args);
   }else throw Error('Unknown tool');
   return reply({content:[{type:'text',text:JSON.stringify(result)}]});
  }catch{return reply({isError:true,content:[{type:'text',text:'The request could not be completed. No successful save is confirmed. Check configuration, approval expiry, and review status before retrying.'}]});}
 }
}
export default new OAuthProvider({apiRoute:'/mcp',apiHandler:McpHandler,defaultHandler:authHandler,authorizeEndpoint:'/authorize',tokenEndpoint:'/oauth/token',clientRegistrationEndpoint:'/oauth/register',scopesSupported:['rts:edit'],resourceMetadata:{resource:ORIGIN+'/mcp',authorization_servers:[ORIGIN],scopes_supported:['rts:edit'],resource_name:'Reforming the Soul private editor'}});
