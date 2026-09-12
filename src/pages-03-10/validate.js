const assert = require('assert');
const { pages, stages } = require('./index');
const correctionCss = require('../page-corrections/pages-01-10').css;
const correctionAdapter = require('../page-corrections/pages-01-10');

const byNumber = new Map(pages.map(page => [page.number, page]));

assert.deepStrictEqual(stages.map(stage => stage.name), [
  'Awaken',
  'See Clearly',
  'Become',
  'Join'
], 'curriculum rail must retain the approved four stages');

assert.deepStrictEqual(pages.map(page => page.number), [3, 4, 5, 6, 7, 8, 9, 10]);

for (const page of pages) {
  assert.ok(page.title, `Page ${page.number} needs a live heading`);
  assert.ok(Array.isArray(page.introduction), `Page ${page.number} needs editable introduction copy`);
  assert.ok(!String(page.image).includes('/done/'), `Page ${page.number} must not use its full reference PNG`);
}

assert.strictEqual(byNumber.get(3).cards.length, 6, 'Page 03 must show six noticing scenarios');
assert.strictEqual(byNumber.get(4).cards.length, 7, 'Page 04 must show six origins and one unsure option');
assert.strictEqual(byNumber.get(4).center[1], 'Example: I need to fix things when things go wrong.', 'Page 04 center example must match the reference');
assert.strictEqual(byNumber.get(5).cards.length, 4, 'Page 05 must show the four-part practice');
assert.strictEqual(byNumber.get(6).cards.length, 4, 'Page 06 must show the four-part practice');
assert.strictEqual(byNumber.get(7).cards.length, 5, 'Page 07 must show five seeing-differently steps');
assert.strictEqual(byNumber.get(8).cards.length, 4, 'Page 08 must show four identity choices');
assert.strictEqual(byNumber.get(9).cards.length, 3, 'Page 09 must show the three-part identity picture');
assert.strictEqual(byNumber.get(10).cards.length, 5, 'Page 10 must show five formation comparisons');

// The approved scenic artwork on the first three See Clearly lessons must be
// displayed in full within a complete right rail rather than cropped by the
// shared sidebar image rule.
for (const number of [8, 9, 10]) {
  const pageSelector = `[data-page-number="${String(number).padStart(2, '0')}"]`;
  assert.ok(correctionCss.includes(`${pageSelector} .course-aside__image`), `Page ${number} needs a full-visible approved sidebar graphic treatment`);
}
assert.ok(correctionCss.includes('object-fit:contain'), 'See Clearly scenic graphics must not be clipped by a cover crop');
for (const number of [8, 9, 10]) {
  assert.ok(byNumber.get(number).image.includes(`page-${String(number).padStart(2, '0')}-approved-scene.png`), `Page ${number} must use its page-specific approved scenic crop`);
}

for (const [number, progress] of [[3, 1], [4, 2], [5, 3], [6, 4]]) {
  const page = byNumber.get(number);
  assert.strictEqual(page.progressLabel, `Awaken ${progress} of 4`);
  assert.strictEqual(page.progress, progress);
  assert.strictEqual(page.progressMax, 4);
}

assert.strictEqual(byNumber.get(7).progressLabel, 'See Clearly 0 of 7');
assert.strictEqual(byNumber.get(8).progressLabel, 'See Clearly 1 of 7');
assert.strictEqual(byNumber.get(9).progressLabel, 'See Clearly 2 of 5');
assert.strictEqual(byNumber.get(10).progressLabel, 'See Clearly 3 of 5');

// Page 06 has a deliberate page-specific heading scale. The remaining pages
// use the shared course-heading rule, so requiring individual overrides was stale.
for (const number of [6]) {
  const pageSelector = `[data-page-number="${String(number).padStart(2, '0')}"]`;
  assert.ok(correctionCss.includes(`${pageSelector} .course-hero h1`), `Page ${number} needs reference-scaled heading treatment`);
}
// Pages 03, 08, 09, and 10 now deliberately inherit the shared editable
// course components. Only Page 04 retains a unique correction-layer layout.
assert.ok(correctionCss.includes('[data-page-number="04"] .origin-map__center'), 'Page 04 needs a reference-scaled center diagram');

const page07Html = correctionAdapter.patches.get(7).render();
assert.ok(page07Html.includes('src="/assets/icon-see.svg"'), 'Page 07 must use the editable See Clearly SVG icon');
assert.ok(page07Html.includes('class="p07-movements"'), 'Page 07 must retain its editable two-movement section');

console.log('Pages 03–10 reference compliance validation passed.');
