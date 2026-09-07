const test = require('node:test');
const assert = require('node:assert/strict');
const {createEditor} = require('../src/changes');
function fixture() {
  let head='a'.repeat(40), document={version:1,overrides:[]}, writes=0;
  const repo={snapshot:async()=>({head,document}), commit:async(parent,next)=>{assert.equal(parent,head);document=next;head='b'.repeat(40);writes++;return head;}};
  const editor=createEditor({repo,secret:'test-secret-with-at-least-32-characters',owner:'320403715',now:()=>1000000});
  return {editor,stale:()=>{head='c'.repeat(40);},writes:()=>writes};
}
const change={pageNumber:3,route:'/awaken/pay-attention/',sectionId:'hero',fieldId:'heading',kind:'text',value:'New heading'};
test('preview does not write; approved change writes one override',async()=>{
 const f=fixture();const p=await f.editor.preview(change,'320403715');assert.equal(f.writes(),0);
 const r=await f.editor.apply(p.changeToken,'320403715');assert.equal(r.commitSha,'b'.repeat(40));assert.equal(f.writes(),1);
 await assert.rejects(()=>f.editor.apply(p.changeToken,'320403715'),/STALE/);assert.equal(f.writes(),1);
});
test('unauthorized users, locked pages, forged and stale changes are rejected',async()=>{
 const f=fixture();await assert.rejects(()=>f.editor.preview(change,'someone-else'),/FORBIDDEN/);
 await assert.rejects(()=>f.editor.preview({...change,pageNumber:1},'320403715'),/locked/);
 const p=await f.editor.preview(change,'320403715');
 await assert.rejects(()=>f.editor.apply(p.changeToken+'x','320403715'),/INVALID/);
 f.stale();await assert.rejects(()=>f.editor.apply(p.changeToken,'320403715'),/STALE/);assert.equal(f.writes(),0);
});
test('expired preview tokens are rejected',async()=>{
 const f=fixture();const p=await f.editor.preview(change,'320403715');
 const late=createEditor({repo:{},secret:'test-secret-with-at-least-32-characters',owner:'320403715',now:()=>3000000});
 await assert.rejects(()=>late.apply(p.changeToken,'320403715'),/EXPIRED/);
});
