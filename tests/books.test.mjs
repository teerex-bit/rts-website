import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import test from 'node:test';
const root=new URL('../public/',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
async function catalog(){return JSON.parse(await read('books/catalog.json'));}
const sortKey=s=>s.replace(/^(a|an|the)\s+/i,'').toLocaleLowerCase('en');
test('Books provides an accessible cover library and one reusable dialog',async()=>{
 const html=await read('books/index.html');
 assert.equal((html.match(/<dialog\b/g)||[]).length,1);
 assert.match(html,/aria-labelledby="book-title"/);
 assert.match(html,/id="book-grid"/);
 assert.match(html,/aria-current="page" href="\/books\/"/);
 assert.match(html,/rts-v2-logo-light-bg.svg/);assert.match(html,/rts-v1-logo-dark-bg.svg/);
});
test('active Books inventory has 26 books, standalone titles first, then documented collections',async()=>{
 const books=await catalog();
 assert.equal(books.length,26);
 assert.equal(new Set(books.map(b=>b.id)).size,26);
 const standalone=books.filter(b=>!b.collection);
 const series=books.filter(b=>b.collection);
 assert.ok(books.indexOf(standalone.at(-1))<books.indexOf(series[0]));
 assert.deepEqual(standalone.map(b=>b.title),[...standalone.map(b=>b.title)].sort((a,b)=>sortKey(a).localeCompare(sortKey(b),'en')));
 const groups=[...new Set(series.map(b=>b.collection))];
 assert.deepEqual(groups,['Re-Design-ed Series','Scandal Collection','Trap Collection']);
 const titlesFor=name=>series.filter(b=>b.collection===name).map(b=>b.title);
 assert.deepEqual(titlesFor('Re-Design-ed Series'),['Pre-Form-ing','Mis-Align-ment','De-Moral-ized']);
 assert.deepEqual(titlesFor('Scandal Collection'),['The Scandal of Dominion','The Scandal of Peace','The Scandal of Love','The Scandal of Choice','The Scandal of Grace']);
 assert.deepEqual(titlesFor('Trap Collection'),['The Identity Trap','The "What if" Trap','The Pride Trap','The Comparison Trap']);
 for(const id of ['the-scandal-of-choice','the-scandal-of-dominion']){
  const book=books.find(b=>b.id===id);assert.ok(book);assert.equal(book.collection,'Scandal Collection');
  assert.ok(book.cover&&book.description);assert.equal(book.pdfAvailable,false);assert.equal(book.pdfUrl,null);
 }
 assert.ok(!books.some(b=>['The Comfort Trap','The Windows of Heaven','The Scandal of Suffering','Alignment with God','Kingdom Economy'].includes(b.title)));
});
test('all active books have covers and descriptions, and each available first-party PDF exists',async()=>{
 const books=await catalog(); assert.ok(books.length>0);
 assert.equal(new Set(books.map(b=>b.id)).size,books.length);
 for(const b of books){
  assert.ok(b.title.trim()&&b.description.trim());
  assert.match(b.cover,/^\/books\/covers\/[a-z0-9-]+\.jpg$/);
  await access(new URL(b.cover.slice(1),root));
  if(b.pdfAvailable){
   assert.match(b.pdfUrl,/^\/books\/files\/[a-z0-9-]+\.pdf$/);
   const pdf=await readFile(new URL(b.pdfUrl.slice(1),root));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
  } else assert.equal(b.pdfUrl,null);
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
