import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import test from 'node:test';
const root=new URL('../public/',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
async function catalog(){return JSON.parse(await read('books/catalog.json'));}
test('Books provides an accessible cover library and one reusable dialog',async()=>{
 const html=await read('books/index.html');
 assert.equal((html.match(/<dialog\b/g)||[]).length,1);
 assert.match(html,/aria-labelledby="book-title"/);
 assert.match(html,/id="book-grid"/);
 assert.match(html,/aria-current="page" href="\/books\/"/);
 assert.match(html,/rts-v2-logo-light-bg.svg/);assert.match(html,/rts-v1-logo-dark-bg.svg/);
});
test('all published books have unique records, real covers, descriptions and first-party PDFs',async()=>{
 const books=await catalog(); assert.ok(books.length>0);
 assert.equal(new Set(books.map(b=>b.id)).size,books.length);
 for(const b of books){
  assert.ok(b.title.trim()&&b.description.trim());assert.equal(b.pdfAvailable,true);
  assert.match(b.pdfUrl,/^\/books\/files\/[a-z0-9-]+\.pdf$/);
  assert.match(b.cover,/^\/books\/covers\/[a-z0-9-]+\.jpg$/);
  const pdf=await readFile(new URL(b.pdfUrl.slice(1),root));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
  await access(new URL(b.cover.slice(1),root));
  if(b.luluUrl){const u=new URL(b.luluUrl);assert.equal(u.protocol,'https:');assert.ok(/(^|\.)lulu\.com$/.test(u.hostname));assert.match(u.pathname,/\/shop\//);assert.equal(b.printStatus,'available');}
  else assert.equal(b.printStatus,'coming-soon');
 }
});
test('Books is reachable through every shared public header and footer',async()=>{
 for(const p of ['index.html','about/index.html','contact/index.html','conversations/index.html','music/index.html','books/index.html']){
  const html=await read(p);
  for(const part of ['header','footer'])assert.match([...html.matchAll(new RegExp(`<${part}[\\s\\S]*?<\\/${part}>`,'g'))].find(m=>m[0].includes(part==='header'?'public-primary-header':'public-footer'))[0],/href="\/books\/"/);
 }
});
