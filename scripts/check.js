const fs=require('fs'),path=require('path'); const root=path.join(__dirname,'..','public');
const html=[];(function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f),s=fs.statSync(p);s.isDirectory()?walk(p):f.endsWith('.html')&&html.push(p)}})(root);
let errors=[]; for(const f of html){const s=fs.readFileSync(f,'utf8');if((s.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${f}: expected one h1`);for(const m of s.matchAll(/(?:href|src)="(\/[^"?#]+)"/g)){let u=m[1],p=path.join(root,u);if(u.endsWith('/'))p=path.join(p,'index.html');if(!fs.existsSync(p))errors.push(`${f}: missing ${u}`)}if(/href="#/.test(s))errors.push(`${f}: hash link`)}
const conversationsPath=path.join(root,'conversations','index.html');
if(fs.existsSync(conversationsPath)){
  const conversations=fs.readFileSync(conversationsPath,'utf8');
  const required=[
    'class="conversations-page"',
    'The formation journey',
    'Learn what God wants<br>you to hear.',
    'Schedule a conversation',
    'A different kind<br>of conversation',
    'Speak, Lord, for Your servant is listening.'
  ];
  for(const value of required)if(!conversations.includes(value))errors.push(`${conversationsPath}: missing ${value}`);
  if(!fs.existsSync(path.join(root,'assets','conversations-hero.jpg')))errors.push(`${conversationsPath}: missing conversations hero asset`);
}
if(html.length!==42)errors.push(`expected 42 routes, got ${html.length}`);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Checked ${html.length} HTML routes: links/assets resolve; one h1 each; no hash links.`);
