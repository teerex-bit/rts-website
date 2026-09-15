const assert = require('assert');
const fs = require('fs');
const path = require('path');

const range = require('./index');

assert.deepStrictEqual(Object.keys(range).sort(), ['css', 'pages', 'render']);
assert(range.pages instanceof Map, 'pages must be a Map');
assert.deepStrictEqual([...range.pages.keys()], [21, 22, 23, 24, 25]);
assert.strictEqual(typeof range.render, 'function');
assert.strictEqual(typeof range.css, 'string');
assert(range.css.includes('.rts-range-21-25'), 'CSS must be range-namespaced');

const expected = [
  [21, '/become/practice-change/', 'Listen Deeply — Relationship Is Interactive'],
  [22, '/become/rule-of-life/', 'Learn to Recognize His Voice'],
  [23, '/become/relationships/', 'Release Control — Whole Surrender to God and His Will'],
  [24, '/become/boundaries/', 'Living With Open Hands'],
  [25, '/become/repair/', 'This Is the Moment You Have Been Given'],
];

for (const [number, route, title] of expected) {
  const page = range.pages.get(number);
  assert(page, `page ${number} must load`);
  assert.strictEqual(page.number, number);
  assert.strictEqual(page.route, route);
  assert.strictEqual(page.title, title);
  assert.strictEqual(page.stage, 'Become');
  assert(Array.isArray(page.content) && page.content.length > 0, `page ${number} needs editable content`);

  const html = range.render(page);
  assert.strictEqual((html.match(/<h1\b/g) || []).length, 1, `page ${number} needs one h1`);
  assert(html.includes(`data-page-number="${number}"`), `page ${number} needs its data marker`);
  assert(html.includes('data-editable-source="range-21-25"'));
  assert(!/(?:src|href)=["'][^"']*done\//i.test(html), `page ${number} must not use done/ assets`);
  assert(!/>\s*Walk\s*</i.test(html), `page ${number} must not render a Walk stage`);
  assert.deepStrictEqual(
    [...html.matchAll(/data-stage="([^"]+)"/g)].map(match => match[1]),
    ['Awaken', 'See Clearly', 'Become', 'Join'],
    `page ${number} needs the four canonical stages`,
  );
}

for (const number of [21, 22]) {
  const page = range.pages.get(number);
  const html = range.render(page);
  assert(!html.includes('rts2521-part'), `page ${number} must use the simplified sidebar without the lesson list`);
  assert(!html.includes('rts2521-footer-nav'), `page ${number} must remove the bottom navigation and progress row`);
  assert(!html.includes('rts2521-eyebrow'), `page ${number} must remove the lesson and screen counter above the title`);
  assert(!html.includes('ENTER A CONVERSATION'), `page ${number} must remove the top conversation control`);
  assert(!html.includes('rts2521-user'), `page ${number} must remove the top account control`);
  assert(!html.includes('aria-label="Complete"'), `page ${number} must remove detached completion marks from the sidebar`);
  for (const section of page.content) {
    assert(html.includes(`class="rts2521-zone ${section.className}"`), `page ${number} must retain ${section.className}`);
  }
}

const page23Html = range.render(range.pages.get(23));
assert(!page23Html.includes('rts2521-part'), 'page 23 must use the simplified four-stage sidebar');
assert(!page23Html.includes('rts2521-footer-nav'), 'page 23 must remove the bottom buttons and breadcrumbs');
assert(!page23Html.includes('rts2521-eyebrow'), 'page 23 must remove the lesson and screen counter above the title');
assert(!page23Html.includes('ENTER A CONVERSATION'), 'page 23 must remove the top conversation control');
assert(!page23Html.includes('rts2521-user'), 'page 23 must remove the top account control');
assert(page23Html.includes('/olive-tree.svg'), 'page 23 must use the clean olive-tree graphic without embedded text');
assert(/\.page-23 \.rts2521-layout\{grid-template-columns:1\.08fr \.92fr;grid-template-areas:'intro tree' 'jesus distinction' 'surrendering distinction'/.test(range.css), 'page 23 must use the approved balanced teaching layout');
assert(/\.page-23 \.rts2521-quote p\{font-size:clamp\(20px,2vw,30px\);line-height:1\.12/.test(range.css), 'page 23 quote must fit completely inside its panel');

const page22Html = range.render(range.pages.get(22));
assert(!/<li><span>[1-5]<\/span><p>/.test(page22Html), 'page 22 must replace discernment step numbers with icons');
assert(/journey-icons\.svg#question[\s\S]*journey-icons\.svg#ear[\s\S]*journey-icons\.svg#eye[\s\S]*journey-icons\.svg#shield[\s\S]*journey-icons\.svg#walk/.test(page22Html), 'page 22 must render a meaningful icon for every discernment step');

assert(/\.page-21 \.rts2521-layout\{grid-template-columns:1fr 1fr;grid-template-areas:'intro scripture' 'prayer listening' 'shift shift'/.test(range.css), 'page 21 must use a balanced two-column teaching layout');
assert(/\.page-21 \.p21-shift\{grid-area:shift;display:grid;grid-template-columns:1fr 1fr/.test(range.css), 'page 21 must align the two shift patterns side by side');
assert(/\.page-21 \.p21-shift \.rts2521-icon-callout\{width:100%;margin:0/.test(range.css), 'page 21 shift cards must fill and center their matching columns');
assert(/\.page-22 \.rts2521-layout\{grid-template-columns:1fr 1fr;grid-template-areas:'intro perspective' 'ways recognize' 'reminders reminders'/.test(range.css), 'page 22 must use a balanced two-column teaching layout');
assert(/\.page-22 \.p22-recognize\{grid-area:recognize;display:flex;flex-direction:column/.test(range.css), 'page 22 recognition pattern must fill the right column evenly');
assert(/\.page-22 \.p22-recognize \.rts2521-steps\{flex:1;display:flex;flex-direction:column;justify-content:space-evenly/.test(range.css), 'page 22 recognition steps must be distributed through the available height');
assert(/\.page-24 \.rts2521-layout\{grid-template-columns:1\.08fr \.92fr;grid-template-areas:'intro intro' 'control practice' 'formation reasonable'/.test(range.css), 'page 24 must use a calm, ordered two-column layout');
assert(/\.page-24 \.p24-practice \.rts2521-image-checklist\{float:none;width:100%;margin:18px 0 0/.test(range.css), 'page 24 open-hands practice must remain in the reading flow');

const sourceFiles = fs.readdirSync(__dirname).filter(file => /^page-(?:21|22|23|24|25)\.js$/.test(file));
assert.strictEqual(sourceFiles.length, 5, 'one source module is required per page');

const assetRoot = path.join(__dirname, '..', '..', 'assets', 'page-ranges', 'range-21-25');
for (const asset of ['logo.svg', 'stage-awaken.svg', 'stage-see.svg', 'stage-become.svg', 'stage-join.svg', 'ear.svg', 'heart.svg', 'clock.svg', 'olive-tree.svg', 'open-hands.svg', 'olive-tree-reference.webp', 'open-hands-reference.webp']) {
  assert(fs.existsSync(path.join(assetRoot, asset)), `missing code-native asset ${asset}`);
}

console.log('range-21-25 validation passed: 5 modules, exact exports, canonical stages, safe assets.');
