export const ORIGIN='https://rts-private-editor.teerex1066.workers.dev';
export const OWNER='320403715';
const headers={'Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",'Content-Type':'text/html; charset=utf-8','Referrer-Policy':'no-referrer'};
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cookie=request=>(request.headers.get('Cookie')||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('__Host-rts-auth='))?.slice(16);
const page=body=>new Response('<!doctype html><meta name="viewport" content="width=device-width"><title>Reforming the Soul Editor</title>'+body,{headers});
export const authHandler={async fetch(request,env){
 const url=new URL(request.url);
 if(url.origin!==ORIGIN)return new Response('Invalid host',{status:400});
 if(url.pathname==='/health')return Response.json({service:'RTS private editor',writesEnabled:env.EDITOR_WRITES_ENABLED==='true'},{headers:{'Cache-Control':'no-store'}});
 if(url.pathname==='/')return page('<h1>Reforming the Soul Editor</h1><p>This private service connects your chat to website review edits. It is not the public website.</p>');
 try{
  if(url.pathname==='/authorize'&&request.method==='GET'){
   const auth=await env.OAUTH_PROVIDER.parseAuthRequest(request);
   const client=await env.OAUTH_PROVIDER.lookupClient(auth.clientId);
   if(!client)return new Response('Unknown client',{status:400});
   const nonce=crypto.randomUUID();
   await env.OAUTH_KV.put('rts-login/'+nonce,JSON.stringify({auth,clientName:client.clientName||auth.clientId}),{expirationTtl:600});
   const github=new URL('https://github.com/login/oauth/authorize');
   github.searchParams.set('client_id',env.RTS_OAUTH_CLIENT_ID);github.searchParams.set('redirect_uri',ORIGIN+'/github/callback');github.searchParams.set('state',nonce);
   return new Response(null,{status:302,headers:{Location:github.href,'Cache-Control':'no-store','Set-Cookie':`__Host-rts-auth=${nonce}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`}});
  }
  if(url.pathname==='/github/callback'&&request.method==='GET'){
   const state=url.searchParams.get('state');
   if(!state||cookie(request)!==state)return new Response('Sign-in expired. Start again.',{status:403});
   const stored=await env.OAUTH_KV.get('rts-login/'+state,'json');
   if(!stored||!url.searchParams.get('code'))return new Response('Sign-in expired. Start again.',{status:403});
   await env.OAUTH_KV.delete('rts-login/'+state);
   const response=await fetch('https://github.com/login/oauth/access_token',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({client_id:env.RTS_OAUTH_CLIENT_ID,client_secret:env.RTS_OAUTH_CLIENT_SECRET,code:url.searchParams.get('code'),redirect_uri:ORIGIN+'/github/callback'})});
   const token=await response.json();if(!response.ok||!token.access_token)return new Response('GitHub sign-in failed.',{status:403});
   const userResponse=await fetch('https://api.github.com/user',{headers:{Authorization:`Bearer ${token.access_token}`,'User-Agent':'RTS-private-editor',Accept:'application/vnd.github+json'}});
   const user=await userResponse.json();
   if(!userResponse.ok||String(user.id)!==OWNER)return new Response('Only the website owner can connect this editor.',{status:403});
   const consent=crypto.randomUUID();
   await env.OAUTH_KV.put('rts-consent/'+consent,JSON.stringify({...stored,userId:OWNER,session:state}),{expirationTtl:300});
   return page(`<h1>Connect your website editor?</h1><p>Allow ${escape(stored.clientName)} to request review edits for Reforming the Soul? Approved pages and production remain protected by the editor.</p><form method="post" action="/consent"><input type="hidden" name="consent" value="${consent}"><button name="decision" value="allow">Allow editor access</button><button name="decision" value="deny">Cancel</button></form>`);
  }
  if(url.pathname==='/consent'&&request.method==='POST'){
   if(request.headers.get('Origin')!==ORIGIN)return new Response('Forbidden',{status:403});
   const form=await request.formData();const id=form.get('consent');
   const stored=typeof id==='string'&&await env.OAUTH_KV.get('rts-consent/'+id,'json');
   if(!stored||stored.session!==cookie(request))return new Response('Consent expired. Start again.',{status:403});
   await env.OAUTH_KV.delete('rts-consent/'+id);
   if(form.get('decision')!=='allow')return page('<p>Connection cancelled.</p>');
   const result=await env.OAUTH_PROVIDER.completeAuthorization({request:stored.auth,userId:OWNER,metadata:{clientName:stored.clientName},scope:stored.auth.scope.filter(s=>s==='rts:edit'),props:{userId:OWNER}});
   return new Response(null,{status:302,headers:{Location:result.redirectTo,'Cache-Control':'no-store','Set-Cookie':'__Host-rts-auth=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'}});
  }
 }catch{return new Response('Unable to complete sign-in. Start again.',{status:400});}
 return new Response('Not found',{status:404});
}};
