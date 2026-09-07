const test=require('node:test');const assert=require('node:assert/strict');
test('sign-in rejects wrong host, unbound callbacks, and unbound consent',async()=>{
 const {authHandler,ORIGIN}=await import('../src/auth.mjs');
 assert.equal((await authHandler.fetch(new Request('https://evil.invalid/authorize'),{})).status,400);
 assert.equal((await authHandler.fetch(new Request(ORIGIN+'/github/callback?state=forged&code=fake'),{})).status,403);
 assert.equal((await authHandler.fetch(new Request(ORIGIN+'/consent?consent=forged&decision=allow'),{OAUTH_KV:{get:async()=>null}})).status,403);
});
test('consent accepts a same-session approval link from a delegated browser',async()=>{
 const {authHandler,ORIGIN}=await import('../src/auth.mjs');
 const env={OAUTH_KV:{get:async()=>({session:'browser-session',auth:{scope:['rts:edit']},clientName:'Chat'}),delete:async()=>{}},OAUTH_PROVIDER:{completeAuthorization:async()=>({redirectTo:'https://chatgpt.com/return'})}};
 const request=new Request(ORIGIN+'/consent?consent=consent-id&decision=allow',{headers:{Cookie:'__Host-rts-auth=browser-session',Origin:'https://chatgpt.com'}});
 const response=await authHandler.fetch(request,env);
 assert.equal(response.status,302);
 assert.equal(response.headers.get('Location'),'https://chatgpt.com/return');
});
test('authorization request binds a short-lived browser cookie to the login state',async()=>{
 const {authHandler,ORIGIN}=await import('../src/auth.mjs');let record;
 const env={RTS_OAUTH_CLIENT_ID:'client',OAUTH_PROVIDER:{parseAuthRequest:async()=>({clientId:'chat',scope:['rts:edit']}),lookupClient:async()=>({clientName:'Private Chat'})},OAUTH_KV:{put:async(...args)=>{record=args;}}};
 const result=await authHandler.fetch(new Request(ORIGIN+'/authorize'),env);
 assert.equal(result.status,302);assert.match(result.headers.get('Set-Cookie'),/HttpOnly; Secure; SameSite=Lax/);
 assert.equal(record[2].expirationTtl,600);
 assert.equal(new URL(result.headers.get('Location')).searchParams.get('redirect_uri'),ORIGIN+'/github/callback');
});
