// Regenerate the no-JavaScript fallback after editing the one central catalog.
import {readFile,writeFile} from 'node:fs/promises';
const catalog=JSON.parse(await readFile(new URL('../public/books/catalog.json',import.meta.url),'utf8'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const items=catalog.filter(b=>b.pdfAvailable).map(b=>`<li><a target="_blank" rel="noopener" href="${escape(b.pdfUrl)}">${escape(b.title)}</a></li>`).join('\n');
await writeFile(new URL('../public/books/reading-list/index.html',import.meta.url),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Free PDF reading list | Reforming the Soul</title><link rel="stylesheet" href="/assets/info-pages.css"></head><body><main style="max-width:800px;margin:auto;padding:32px"><a href="/books/">← Books</a><h1>Free PDF reading list</h1><p>Each book opens as a PDF in a new tab.</p><ul style="line-height:2">${items}</ul></main></body></html>\n`);
