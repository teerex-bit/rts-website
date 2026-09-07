const test=require('node:test');const assert=require('node:assert/strict');
test('sign-in rejects wrong host, unbound callbacks, and cross-origin consent',async()=>{
 const {authHandler,ORIGIN}=await import('../src/auth.mjs');
 assert.equal((await authHandler.fetch(new Request('https://evil.invalid/authorize'),{})).status,400);
 assert.equal((await authHandler.fetch(new Request(ORIGIN+'/github/callback?state=forged&code=fake'),{})).status,403);
 assert.equal((await authHandler.fetch(new Request(ORIGIN+'/consent',{method:'POST',headers:{Origin:'https://evil.invalid'}}),{})).status,403);
});
test('authorization request binds a short-lived browser cookie to the login state',async()=>{
 const {authHandler,ORIGIN}=await import('../src/auth.mjs');let record;
 const env={RTS_OAUTH_CLIENT_ID:'client',OAUTH_PROVIDER:{parseAuthRequest:async()=>({clientId:'chat',scope:['rts:edit']}),lookupClient:async()=>({clientName:'Private Chat'})},OAUTH_KV:{put:async(...args)=>{record=args;}}};
 const result=await authHandler.fetch(new Request(ORIGIN+'/authorize'),env);
 assert.equal(result.status,302);assert.match(result.headers.get('Set-Cookie'),/HttpOnly; Secure; SameSite=Lax/);
 assert.equal(record[2].expirationTtl,600);
 assert.equal(new URL(result.headers.get('Location')).searchParams.get('redirect_uri'),ORIGIN+'/github/callback');
});
