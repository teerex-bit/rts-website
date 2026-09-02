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
  [21, '/become/practice-change/', 'Listen Deeply — Relationship Is Interactive', 2, 1, 5],
  [22, '/become/rule-of-life/', 'Learn to Recognize His Voice', 2, 2, 5],
  [23, '/become/relationships/', 'Release Control — Whole Surrender to God and His Will', 3, 1, 5],
  [24, '/become/boundaries/', 'Living With Open Hands', 3, 2, 5],
  [25, '/become/repair/', 'This Is the Moment You Have Been Given', 4, 1, 2],
];

for (const [number, route, title, lesson, screen, sectionCount] of expected) {
  const page = range.pages.get(number);
  assert(page, `page ${number} must load`);
  assert.strictEqual(page.number, number);
  assert.strictEqual(page.route, route);
  assert.strictEqual(page.title, title);
  assert.strictEqual(page.stage, 'Become');
  assert.strictEqual(page.lesson, lesson, `page ${number} needs the reference lesson number`);
  assert.strictEqual(page.screen, screen, `page ${number} needs the reference screen number`);
  assert(Array.isArray(page.content) && page.content.length > 0, `page ${number} needs editable content`);
  assert.strictEqual(page.content.length, sectionCount, `page ${number} needs the reference section count`);

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
  assert.strictEqual((html.match(/class="rts2521-zone /g) || []).length, sectionCount, `page ${number} must render every editable section`);
  assert.strictEqual((html.match(/class="rts2521-progress"/g) || []).length, 1, `page ${number} needs one footer progress control`);
  assert.strictEqual((html.match(/class="rts2521-part"/g) || []).length, 1, `page ${number} needs one lesson rail`);
}

assert(range.render(range.pages.get(21)).includes('ear.svg'), 'page 21 needs the listening icon');
assert(range.render(range.pages.get(21)).includes('heart.svg'), 'page 21 needs the maturing-relationship icon');
assert(range.render(range.pages.get(23)).includes('olive-tree.svg'), 'page 23 needs the surrender illustration');
assert(range.render(range.pages.get(24)).includes('open-hands.svg'), 'page 24 needs the open-hands illustration');
assert(range.render(range.pages.get(25)).includes('clock.svg'), 'page 25 needs the ordinary-moment icon');
assert(range.render(range.pages.get(21)).includes('data-progress-style="numbers-outline"'), 'page 21 needs numbered completed progress and an outlined current lesson');
assert(range.render(range.pages.get(22)).includes('data-progress-style="checks-filled"'), 'page 22 needs checked completed progress and a filled current lesson');
assert(range.render(range.pages.get(23)).includes('data-progress-style="checks-outline"'), 'page 23 needs checked completed progress and an outlined current lesson');
assert(range.render(range.pages.get(24)).includes('data-progress-style="checks-outline"'), 'page 24 needs checked completed progress and an outlined current lesson');
assert(range.render(range.pages.get(25)).includes('data-progress-style="numbers-outline"'), 'page 25 needs numbered completed progress and an outlined current lesson');
assert(range.css.includes('@media(max-width:760px)'), 'range needs a mobile breakpoint');
assert(range.css.includes('@media(max-width:1100px)'), 'range needs a tablet breakpoint');
assert(range.css.includes('@media(min-width:1400px)'), 'range needs reference-width calibration');

const sourceFiles = fs.readdirSync(__dirname).filter(file => /^page-(?:21|22|23|24|25)\.js$/.test(file));
assert.strictEqual(sourceFiles.length, 5, 'one source module is required per page');

const assetRoot = path.join(__dirname, '..', '..', 'assets', 'page-ranges', 'range-21-25');
for (const asset of ['logo.svg', 'stage-awaken.svg', 'stage-see.svg', 'stage-become.svg', 'stage-join.svg', 'ear.svg', 'heart.svg', 'clock.svg', 'olive-tree.svg', 'open-hands.svg']) {
  assert(fs.existsSync(path.join(assetRoot, asset)), `missing code-native asset ${asset}`);
}

console.log('range-21-25 validation passed: 5 modules, exact exports, canonical stages, safe assets.');
