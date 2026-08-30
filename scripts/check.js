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
  const header=conversations.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0]||'';
  const headerStages=[...header.matchAll(/<a href="\/(awaken|see-clearly|become|join)\/">([^<]+)<\/a>/g)].map(match=>match[2]);
  const expectedHeaderStages=['Awaken','See Clearly','Become','Join'];
  if(JSON.stringify(headerStages)!==JSON.stringify(expectedHeaderStages))errors.push(`${conversationsPath}: expected Conversations header stages ${expectedHeaderStages.join(', ')}, got ${headerStages.join(', ')||'none'}`);
  if(/>Walk<|\/walk\//i.test(header))errors.push(`${conversationsPath}: Walk must not appear in the Conversations header`);
  if(!fs.existsSync(path.join(root,'assets','conversations-hero.jpg')))errors.push(`${conversationsPath}: missing conversations hero asset`);
}
const editableCoursePages=[
  ['03','awaken/pay-attention','page-awaken'],
  ['04','awaken/name-your-desire','page-awaken'],
  ['05','awaken/listen-within','page-awaken'],
  ['06','awaken/practice-presence','page-awaken'],
  ['07','see-clearly','page-see-clearly'],
  ['08','see-clearly/your-formation','page-see-clearly'],
  ['09','see-clearly/family-of-origin','page-see-clearly'],
  ['10','see-clearly/patterns','page-see-clearly']
];
for(const [number,route,assetDirectory] of editableCoursePages){
  const file=path.join(root,route,'index.html');
  if(!fs.existsSync(file)){errors.push(`${file}: missing editable course route`);continue}
  const source=fs.readFileSync(file,'utf8');
  if(!/class="[^"]*\bformation-course-page\b/.test(source)||!source.includes(`data-page-number="${number}"`)||!source.includes('data-editable-source="pages-03-10"'))errors.push(`${file}: expected dedicated editable Pages 03-10 renderer/configuration`);
  if(source.includes('class="content-grid"'))errors.push(`${file}: generic placeholder renderer must not be used`);
  const rail=source.match(/<nav class="formation-rail__journey"[\s\S]*?<\/nav>/)?.[0]||'';
  const stages=[...rail.matchAll(/data-stage="([^"]+)"/g)].map(match=>match[1]);
  const expectedStages=['Awaken','See Clearly','Become','Join'];
  if(JSON.stringify(stages)!==JSON.stringify(expectedStages))errors.push(`${file}: expected formation stages ${expectedStages.join(', ')}, got ${stages.join(', ')||'none'}`);
  if(/>\s*Walk\s*<|\/walk\//i.test(source))errors.push(`${file}: Walk must not be generated as a stage or route`);
  if(/(?:src|href)="[^"]*done\/(?:0?${Number(number)})(?:\s|%20)/i.test(source))errors.push(`${file}: full-page reference PNG must remain reference-only`);
  if(!source.includes(`/assets/${assetDirectory}/`))errors.push(`${file}: expected page-specific asset path under ${assetDirectory}`);
}
const batchReviewPath=path.join(root,'review','pages-03-10','index.html');
if(!fs.existsSync(batchReviewPath))errors.push(`${batchReviewPath}: missing Pages 03-10 review route`);
else{
  const review=fs.readFileSync(batchReviewPath,'utf8');
  if(!review.includes('class="pages-batch-review"'))errors.push(`${batchReviewPath}: missing isolated batch review UI`);
  const reviewTargets=[...review.matchAll(/data-review-route="([^"]+)"/g)].map(match=>match[1]);
  const expectedTargets=editableCoursePages.map(([,route])=>`/${route}/`);
  if(JSON.stringify(reviewTargets)!==JSON.stringify(expectedTargets))errors.push(`${batchReviewPath}: expected eight ordered review targets`);
  if(!review.includes('id="batch-review-frame"')||!review.includes('data-review-previous')||!review.includes('data-review-next'))errors.push(`${batchReviewPath}: missing viewer or Previous/Next controls`);
}
if(html.length!==43)errors.push(`expected 43 routes, got ${html.length}`);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Checked ${html.length} HTML routes: links/assets resolve; one h1 each; no hash links.`);
