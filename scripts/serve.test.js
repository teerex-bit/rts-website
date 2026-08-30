const assert=require('assert');
const {spawn}=require('child_process');
const path=require('path');

const port=4317;
const child=spawn(process.execPath,[path.join(__dirname,'serve.js')],{
  env:{...process.env,PORT:String(port),HOST:'127.0.0.1'},
  stdio:['ignore','pipe','pipe']
});

const timeout=setTimeout(()=>{
  child.kill();
  console.error('server did not become ready');
  process.exit(1);
},5000);

child.stdout.once('data',async()=>{
  try{
    const response=await fetch(`http://127.0.0.1:${port}/assets/conversations-hero.jpg`);
    assert.equal(response.status,200);
    assert.equal(response.headers.get('content-type'),'image/jpeg');
    console.log('Static server serves the Conversations hero as image/jpeg.');
    clearTimeout(timeout);
    child.kill();
  }catch(error){
    clearTimeout(timeout);
    child.kill();
    console.error(error.message);
    process.exitCode=1;
  }
});
