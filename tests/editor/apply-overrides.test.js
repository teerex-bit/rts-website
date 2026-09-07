const test = require('node:test');
const assert = require('node:assert/strict');
const {load} = require('cheerio');
const {applyOverrides} = require('../../src/editor/apply-overrides');
const page = {number:3, route:'/awaken/pay-attention/'};
const html = '<!DOCTYPE html><html><head></head><body><h1>Original</h1><p class="course-intro">Intro</p><a class="lesson-navigation__continue" href="/join/">Continue<img src="/assets/icon.svg" alt=""></a><aside class="course-aside"><img class="course-aside__image" src="/assets/old.jpg" alt="Old"></aside></body></html>';
const operation = (kind,value,sectionId='hero',fieldId='heading') => ({id:'test',pageNumber:3,route:page.route,sectionId,fieldId,kind,value,sourceCommit:'a'.repeat(40),requestedBy:'owner',createdAt:'2026-09-07T00:00:00Z'});
const apply = (...overrides) => applyOverrides({html,page,document:{version:1,overrides:overrides.map((o,i)=>({...o,id:`test-${i}`}))}});
test('empty overrides preserve exact bytes',()=>assert.equal(apply(),html));
test('text is escaped and unrelated image retained',()=>{
 const $=load(apply(operation('text','<script>not code</script>')));
 assert.equal($('h1').text(),'<script>not code</script>'); assert.equal($('script').length,0);
 assert.equal($('.course-aside__image').attr('src'),'/assets/old.jpg');
});
test('link edits preserve independent icons',()=>{
 const $=load(apply(operation('text','Next','navigation','continue'),operation('link','/awaken/','navigation','continue')));
 assert.equal($('a').text(),'Next'); assert.equal($('a').attr('href'),'/awaken/'); assert.equal($('a img').length,1);
});
test('image source and alt are independently editable',()=>{
 const $=load(apply(operation('image','/assets/new.jpg','sidebar','image'),operation('alt','New','sidebar','image')));
 assert.equal($('.course-aside__image').attr('src'),'/assets/new.jpg'); assert.equal($('.course-aside__image').attr('alt'),'New');
});
test('layout tokens and visibility have rendered effects',()=>{
 const $=load(apply(operation('color','navy'),operation('spacing','spacious'),operation('align','center'),operation('visibility',false,'sidebar','visibility')));
 assert.match($('h1').attr('style'),/text-align:center/); assert.match($('h1').attr('style'),/--rts-edit-color/);
 assert.equal($('.course-aside').is('[hidden]'),true);
});
test('missing or ambiguous selectors fail closed',()=>{
 const document={version:1,overrides:[operation('text','New')]};
 assert.throws(()=>applyOverrides({html:'<p>No heading</p>',page,document}),/exactly one/);
 assert.throws(()=>applyOverrides({html:'<h1>A</h1><h1>B</h1>',page,document}),/exactly one/);
});
test('locked-page overrides are rejected',()=>assert.throws(()=>applyOverrides({html,page:{number:1,route:'/'},document:{version:1,overrides:[{...operation('text','New'),pageNumber:1,route:'/'}]}}),/locked/));
test('bounded ordering applies only within declared group',()=>{
 const result=applyOverrides({html:'<div class="course-body"><h2 class="course-section-heading">Title</h2><div class="course-card-grid">Cards</div><h3 class="course-secondary-title">Next</h3><aside class="course-callout--note">Note</aside><nav class="lesson-navigation">Links</nav></div>',page:{number:8,route:'/see-clearly/your-formation/'},document:{version:1,overrides:[{...operation('order',3,'course-body','section-heading'),pageNumber:8,route:'/see-clearly/your-formation/'}]}});
 assert.deepEqual(load(result)('.course-body').children().map((_,n)=>n.attribs.class).get(),['course-card-grid','course-secondary-title','course-section-heading','course-callout--note','lesson-navigation']);
});
test('prose edits preserve surrounding headings and buttons',()=>{
 const source='<section class="rts-11-15__landing-copy"><h1>Keep heading</h1><p>Old prose</p><a href="/join/">Keep button</a></section>';
 const result=applyOverrides({html:source,page:{number:13,route:'/see-god-clearly/'},document:{version:1,overrides:[{...operation('text','New prose','content','prose'),pageNumber:13,route:'/see-god-clearly/'}]}});
 const $=load(result);
 assert.equal($('h1').text(),'Keep heading');
 assert.equal($('a').text(),'Keep button');
 assert.equal($('p').text(),'New prose');
});
test('text editing rejects structural descendants',()=>{
 assert.throws(()=>applyOverrides({html:'<h1><a href="/join/">Protected link</a></h1>',page,document:{version:1,overrides:[operation('text','New')]}}),/structural/);
});
