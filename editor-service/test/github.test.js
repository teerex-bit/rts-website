const test=require('node:test');
const assert=require('node:assert/strict');
const {generateKeyPairSync}=require('node:crypto');
const {createRepository}=require('../src/github');
test('GitHub writes only the override document on review using non-force update',async()=>{
 const {privateKey}=generateKeyPairSync('rsa',{modulusLength:2048,privateKeyEncoding:{type:'pkcs8',format:'pem'},publicKeyEncoding:{type:'spki',format:'pem'}});
 const calls=[];
 const replies=[{id:9},{token:'test-token',expires_at:'2099-01-01T00:00:00Z'},{tree:{sha:'base-tree'}},{sha:'new-tree'},{sha:'new-commit'},{}];
 const repo=createRepository({appId:4864592,privateKey,fetcher:async(url,options)=>{
  calls.push({url,method:options.method,body:options.body&&JSON.parse(options.body)});
  return Response.json(replies.shift());
 }});
 assert.equal(await repo.commit('a'.repeat(40),{version:1,overrides:[]}),'new-commit');
 assert.deepEqual(calls[1].body,{repositories:['rts-website'],permissions:{contents:'write',actions:'read'}});
 assert.equal(calls[3].body.tree.length,1);
 assert.equal(calls[3].body.tree[0].path,'src/editor/overrides.json');
 assert.equal(calls[5].url,'https://api.github.com/repos/teerex-bit/rts-website/git/refs/heads/review');
 assert.deepEqual(calls[5].body,{sha:'new-commit',force:false});
});
