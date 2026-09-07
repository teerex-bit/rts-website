import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {randomBytes} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const names=['RTS_APP_ID','RTS_APP_PRIVATE_KEY','RTS_OAUTH_CLIENT_ID','RTS_OAUTH_CLIENT_SECRET'];
for(const name of ['CLOUDFLARE_API_TOKEN','CLOUDFLARE_ACCOUNT_ID',...names])if(!process.env[name])throw Error('Missing configuration: '+name);
const account=process.env.CLOUDFLARE_ACCOUNT_ID;
if(!/^[a-f0-9]{32}$/i.test(account))throw Error('Invalid account ID');
async function cf(suffix,method='GET',body){
 const r=await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/${suffix}`,{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
 const data=await r.json();if(!r.ok||!data.success)throw Error('Cloudflare configuration failed: HTTP '+r.status);return data;
}
let found=[];
for(let page=1;;page++){
 const result=await cf('storage/kv/namespaces?per_page=100&page='+page);found.push(...result.result);
 if(page>=(result.result_info?.total_pages||1))break;
}
const matches=found.filter(n=>n.title==='rts-private-editor-oauth');
if(matches.length>1)throw Error('Ambiguous editor namespace');
const namespace=matches[0]||(await cf('storage/kv/namespaces','POST',{title:'rts-private-editor-oauth'})).result;
const config=JSON.parse(fs.readFileSync('editor-service/wrangler.jsonc','utf8'));
if(config.name!=='rts-private-editor'||config.vars.EDITOR_WRITES_ENABLED!=='true')throw Error('Unsafe deployment target');
config.kv_namespaces=[{binding:'OAUTH_KV',id:namespace.id}];
const configFile='editor-service/wrangler.runtime.jsonc';
fs.writeFileSync(configFile,JSON.stringify(config));
function wrangler(args){const r=spawnSync('npx',['wrangler',...args,'--config',configFile],{encoding:'utf8',env:process.env});if(r.status!==0)throw Error('Editor deployment command failed. Inspect Cloudflare deployment status; credentials were not logged.');}
wrangler(['deploy']);
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'rts-editor-secrets-'));
const file=path.join(temporary,'secrets.json');
try{
 const values=Object.fromEntries(names.map(name=>[name,process.env[name]]));
 // Rotating the approval-signing key invalidates any previews from an older deployment.
 values.CHANGE_TOKEN_SECRET=randomBytes(48).toString('hex');
 fs.writeFileSync(file,JSON.stringify(values),{mode:0o600});wrangler(['secret','bulk',file]);
}finally{if(fs.existsSync(file))fs.unlinkSync(file);fs.rmdirSync(temporary);fs.unlinkSync(configFile);}
const origin='https://rts-private-editor.teerex1066.workers.dev';
const health=await fetch(origin+'/health');const state=await health.json();
if(!health.ok||state.writesEnabled!==true)throw Error('Editor health check failed');
const unauth=await fetch(origin+'/mcp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'})});
if(unauth.status!==401)throw Error('Unauthenticated access was not rejected');
console.log('PASS: Private editor deployed with review-only saving enabled; anonymous access rejected.');
console.log('GitHub OAuth callback: '+origin+'/github/callback');
