const http=require('http');
const fs=require('fs');
const path=require('path');

const root=path.join(__dirname,'..','public');
const mime={
  '.css':'text/css',
  '.html':'text/html',
  '.jpg':'image/jpeg',
  '.js':'text/javascript',
  '.png':'image/png',
  '.svg':'image/svg+xml'
};

http.createServer((request,response)=>{
  let pathname=decodeURIComponent(request.url.split('?')[0]);
  let file=path.join(root,pathname);
  if(file.endsWith(path.sep))file=path.join(file,'index.html');
  fs.readFile(file,(error,body)=>{
    response.statusCode=error?404:200;
    response.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');
    response.end(error?'Not found':body);
  });
}).listen(process.env.PORT||4173,process.env.HOST||'0.0.0.0',()=>{
  console.log(`http://${process.env.HOST||'0.0.0.0'}:${process.env.PORT||4173}`);
});
