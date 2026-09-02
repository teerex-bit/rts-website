const fs=require('fs'),path=require('path'); const root=path.join(__dirname,'..','public');
const pages=require('../src/pages');
const html=[];(function walk(d){for(const f of fs.readdirSync(d)){const p=path.join(d,f),s=fs.statSync(p);s.isDirectory()?walk(p):f.endsWith('.html')&&html.push(p)}})(root);
let errors=[]; for(const f of html){const s=fs.readFileSync(f,'utf8');if((s.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${f}: expected one h1`);for(const m of s.matchAll(/(?:href|src)="(\/[^"?#]+)"/g)){let u=m[1],p=path.join(root,u);if(u.endsWith('/'))p=path.join(p,'index.html');if(!fs.existsSync(p))errors.push(`${f}: missing ${u}`)}for(const m of s.matchAll(/href="#([^"]*)"/g)){const id=m[1];if(!id||(!s.includes(`id="${id}"`)&&!s.includes(`id='${id}'`)))errors.push(`${f}: unresolved local fragment #${id}`)}}
const conversationsPath=path.join(root,'conversations','index.html');
if(fs.existsSync(conversationsPath)){
  const conversations=fs.readFileSync(conversationsPath,'utf8');
  const required=[
    'class="conversations-page"',
    'The formation journey',
    'Learn what God wants<br>you to hear.',
    'Book an appointment',
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
const homePath=path.join(root,'index.html');
if(!fs.existsSync(homePath))errors.push(`${homePath}: missing specialized Page 01 route`);
else{
  const home=fs.readFileSync(homePath,'utf8');
  for(const marker of ['class="home-page"','class="home-hero"','class="journey-section"','class="experience"'])if(!home.includes(marker))errors.push(`${homePath}: missing specialized Page 01 marker ${marker}`);
  if(home.includes('class="content-grid"'))errors.push(`${homePath}: generic placeholder renderer must not be used`);
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
  if(number==='07')continue;
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
const correctedPages=[
  {number:2,text:'You Have Already Been Formed'},
  {number:7,text:'See Who You Really Are'}
];
for(const {number,text} of correctedPages){
  const page=pages.find(candidate=>candidate.number===number),file=path.join(root,page.route,'index.html'),source=fs.readFileSync(file,'utf8');
  if(!source.includes(`data-page-number="${String(number).padStart(2,'0')}"`)||!source.includes('data-editable-source="pages-01-10-corrections"')||!source.includes(text))errors.push(`${file}: expected approved Pages 01-10 replacement for Page ${number}`);
  if(source.includes('class="content-grid"'))errors.push(`${file}: generic placeholder renderer must not be used`);
}
const correctedPageSix=fs.readFileSync(path.join(root,pages.find(page=>page.number===6).route,'index.html'),'utf8');
if(!correctedPageSix.includes('I’ve Noticed Something I’m Ready to Look At'))errors.push('Page 6: expected approved continuation label correction');
const dedicatedPageMarkers=[
  {first:11,last:15,marker:'data-editable-source="range-11-15"'},
  {first:16,last:20,marker:'data-editable-source="range-16-20"'},
  {first:21,last:25,marker:'class="rts-range-21-25 '},
  {first:26,last:30,marker:'class="rts-r2630 '},
  {first:31,last:35,marker:'data-editable-source="range-31-35"'},
  {first:36,last:37,marker:'class="rts-36-40 '},
  {first:38,last:38,marker:'class="conversations-page"'},
  {first:39,last:40,marker:'class="rts-36-40 '}
];
for(const {first,last,marker} of dedicatedPageMarkers){
  for(let number=first;number<=last;number+=1){
    const page=pages.find(candidate=>candidate.number===number);
    const file=page&&path.join(root,page.route,'index.html');
    if(!page||!file||!fs.existsSync(file)){errors.push(`Page ${number}: missing dedicated route`);continue}
    const source=fs.readFileSync(file,'utf8');
    if(!source.includes(marker))errors.push(`${file}: expected dedicated editable Page ${number} renderer`);
    if(source.includes('class="content-grid"'))errors.push(`${file}: generic placeholder renderer must not be used`);
    if(/(?:src|href)="[^"]*done\//i.test(source))errors.push(`${file}: full-page reference PNG must remain reference-only`);
  }
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
const finalReviewPath=path.join(root,'review','pages-01-40','index.html');
if(!fs.existsSync(finalReviewPath))errors.push(`${finalReviewPath}: missing Pages 01-40 review route`);
else{
  const review=fs.readFileSync(finalReviewPath,'utf8');
  if(!review.includes('class="pages-final-review"'))errors.push(`${finalReviewPath}: missing Pages 01-40 review UI`);
  const reviewTargets=[...review.matchAll(/data-final-review-route="([^"]+)"/g)].map(match=>match[1]);
  const expectedTargets=pages.map(page=>page.route);
  if(JSON.stringify(reviewTargets)!==JSON.stringify(expectedTargets))errors.push(`${finalReviewPath}: expected 40 ordered review targets`);
  if(!review.includes('id="pages-01-40-review-frame"')||!review.includes('data-final-review-previous')||!review.includes('data-final-review-next'))errors.push(`${finalReviewPath}: missing viewer or Previous/Next controls`);
}
const builtStylesPath=path.join(root,'assets','styles.css');
const builtStyles=fs.existsSync(builtStylesPath)?fs.readFileSync(builtStylesPath,'utf8'):'';
for(const label of ['11-15','16-20','21-25','26-30','31-35','36-40']){
  const marker=`/* Pages ${label} range styles */`;
  const registrations=builtStyles.split(marker).length-1;
  if(registrations!==1)errors.push(`${builtStylesPath}: expected one ${label} range style registration, got ${registrations}`);
}
const correctionStyleMarker='/* Pages 01-10 correction styles */';
const correctionStyleRegistrations=builtStyles.split(correctionStyleMarker).length-1;
if(correctionStyleRegistrations!==1)errors.push(`${builtStylesPath}: expected one Pages 01-10 correction style registration, got ${correctionStyleRegistrations}`);
if(html.length!==44)errors.push(`expected 44 routes, got ${html.length}`);if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Checked ${html.length} HTML routes: links/assets and local fragments resolve; one h1 each.`);
