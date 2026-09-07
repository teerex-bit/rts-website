const test=require('node:test');
const assert=require('node:assert/strict');

test('visual planner rejects locked pages before calling the model',async()=>{
 const {createVisualPlanner}=require('../src/visual');
 let calls=0;
 const planner=createVisualPlanner({apiKey:'sk-test-12345678901234567890',fetcher:async()=>{calls++;throw Error('must not call');}});
 await assert.rejects(()=>planner.plan({pageNumber:1,request:'change the picture',reference:'abc',fields:[],assets:[]}),/LOCKED_PAGE/);
 assert.equal(calls,0);
});

test('visual planner returns only a declared review edit using a project asset',async()=>{
 const {createVisualPlanner}=require('../src/visual');
 const fetcher=async()=>new Response(JSON.stringify({output_text:JSON.stringify({summary:'Use the approved illustration.',edit:{pageNumber:3,route:'/awaken/pay-attention/',sectionId:'sidebar',fieldId:'image',kind:'image',value:'/assets/page-awaken/awaken-sunrise-path.png'}})}),{status:200});
 const planner=createVisualPlanner({apiKey:'sk-test-12345678901234567890',fetcher});
 const result=await planner.plan({pageNumber:3,request:'make the sidebar graphic match the reference',reference:'a'.repeat(20),fields:[{pageNumber:3,route:'/awaken/pay-attention/',sectionId:'sidebar',fieldId:'image',kinds:['image']}],assets:['/assets/page-awaken/awaken-sunrise-path.png']});
 assert.equal(result.edit.value,'/assets/page-awaken/awaken-sunrise-path.png');
});
