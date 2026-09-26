import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const modules=process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES;
const {chromium}=modules?await import(pathToFileURL(path.join(modules,'playwright/index.mjs'))):await import('playwright');
const root=path.resolve(new URL('../',import.meta.url).pathname);
const evidence=path.join(root,'docs/books-qa');await fs.mkdir(evidence,{recursive:true});
const base=process.env.BOOKS_QA_ORIGIN||'http://127.0.0.1:4187';
const server=process.env.BOOKS_QA_ORIGIN?null:spawn('python',['-m','http.server','4187','--bind','127.0.0.1','--directory',path.join(root,'public')],{stdio:'ignore'});
let browser;
try{
 for(let i=0;i<30;i++){try{await fetch(base+'/books/');break;}catch{await new Promise(r=>setTimeout(r,100));}}
 browser=await chromium.launch({executablePath:process.env.BOOKS_QA_CHROMIUM||undefined,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--no-zygote']});
 const page=await browser.newPage();const downloads=[];page.on('download',d=>downloads.push(d.url()));page.context().on('page',p=>p.on('download',d=>downloads.push(d.url())));const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const catalog=JSON.parse(await fs.readFile(path.join(root,'public/books/catalog.json'),'utf8'));
 const result={origin:base,widths:[],pdfs:[],openedPdfs:[],runtimeErrors:errors};
 for(const width of [1536,1363,768,375]){
  await page.setViewportSize({width,height:width===375?812:1000});await page.goto(base+'/books/');await page.waitForSelector('.book-card');
  assert.equal(await page.locator('.book-card').count(),catalog.length);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page overflow '+width);
  if(width<841){await page.getByRole('button',{name:'Menu',exact:true}).click();assert.ok(await page.locator('#main-nav').isVisible());await page.keyboard.press('Escape');}
  await page.screenshot({path:path.join(evidence,`books-${width}.png`)});
  for(let i=0;i<catalog.length;i++){
   const book=catalog[i];const button=page.getByRole('button',{name:`About ${book.title}`,exact:true});await button.click();
   assert.equal(await page.locator('#book-title').innerText(),book.title);assert.equal(await page.locator('#book-description').innerText(),book.description);
   assert.equal(await page.locator('#book-pdf').getAttribute('href'),book.pdfUrl);
   assert.equal(await page.locator('#book-print-pending').innerText(),'PRINT COPY\nComing soon');
   assert.equal(await page.locator('#book-print').isVisible(),false);
   assert.ok(await page.evaluate(()=>document.querySelector('#book-dialog').scrollWidth<=document.querySelector('#book-dialog').clientWidth),'dialog overflow');
   assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed');
   if(i===0)await page.screenshot({path:path.join(evidence,`dialog-${width}.png`)});
   await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.querySelector('#book-dialog').contains(document.activeElement)));
   await page.keyboard.press('Shift+Tab');assert.ok(await page.evaluate(()=>document.querySelector('#book-dialog').contains(document.activeElement)));
   if(i===0){await page.getByRole('button',{name:'Close'}).click();}
   else await page.keyboard.press('Escape');
   assert.equal(await page.locator('#book-dialog').isVisible(),false);
   assert.equal(await button.evaluate(b=>document.activeElement===b),true);
  }
  result.widths.push({width,books:catalog.length,dialogChecks:'passed',overflow:false});
 }
 for(const book of catalog){const response=await page.request.get(base+book.pdfUrl);assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/application\/pdf/);const bytes=await response.body();assert.equal(bytes.subarray(0,5).toString(),'%PDF-');result.pdfs.push({title:book.title,bytes:bytes.length,url:book.pdfUrl});}
 await page.setViewportSize({width:1363,height:1000});
 for(const book of [catalog[0],catalog.find(b=>b.id==='the-scandal-of-grace'),catalog.find(b=>b.id==='the-what-if-trap')]){
  await page.getByRole('button',{name:`About ${book.title}`,exact:true}).click();
  const [popup]=await Promise.all([page.waitForEvent('popup'),page.locator('#book-pdf').click()]);
  for(let i=0;i<30&&!downloads.includes(base+book.pdfUrl)&&popup.url()!==base+book.pdfUrl;i++)await new Promise(r=>setTimeout(r,100));
  assert.ok(popup.url()===base+book.pdfUrl||downloads.includes(base+book.pdfUrl));result.openedPdfs.push({url:base+book.pdfUrl,mode:downloads.includes(base+book.pdfUrl)?'headless PDF download':'new-tab viewer'});await popup.close();await page.keyboard.press('Escape');
 }
 assert.deepEqual(errors,[]);
 await fs.writeFile(path.join(evidence,'browser-results.json'),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify({widths:result.widths,pdfs:result.pdfs.length,openedPdfs:result.openedPdfs,runtimeErrors:errors},null,2));
}finally{await browser?.close();server?.kill();}
