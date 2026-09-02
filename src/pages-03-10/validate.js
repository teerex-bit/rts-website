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
assert.strictEqual(byNumber.get(6).dotCount, 5, 'Page 06 reference uses five lesson navigation dots');
assert.strictEqual(byNumber.get(7).cards.length, 5, 'Page 07 must show five seeing-differently steps');
assert.strictEqual(byNumber.get(8).cards.length, 4, 'Page 08 must show four identity choices');
assert.strictEqual(byNumber.get(9).cards.length, 3, 'Page 09 must show the three-part identity picture');
assert.strictEqual(byNumber.get(10).cards.length, 5, 'Page 10 must show five formation comparisons');

for (const number of [3, 4, 5, 6]) {
  const page = byNumber.get(number);
  assert.strictEqual(page.progressLabel, 'Awaken 1 of 7');
  assert.strictEqual(page.progress, 1);
  assert.strictEqual(page.progressMax, 7);
}

assert.strictEqual(byNumber.get(7).progressLabel, 'See Clearly 0 of 7');
assert.strictEqual(byNumber.get(8).progressLabel, 'See Clearly 1 of 7');
assert.strictEqual(byNumber.get(9).progressLabel, 'See Clearly 2 of 5');
assert.strictEqual(byNumber.get(10).progressLabel, 'See Clearly 3 of 5');

for (const number of [3, 4, 5, 6, 8, 9, 10]) {
  const pageSelector = `[data-page-number="${String(number).padStart(2, '0')}"]`;
  assert.ok(correctionCss.includes(`${pageSelector} .course-hero h1`), `Page ${number} needs reference-scaled heading treatment`);
}
assert.ok(correctionCss.includes('[data-page-number="03"] .course-card'), 'Page 03 needs reference-scaled scenario cards');
assert.ok(correctionCss.includes('[data-page-number="04"] .origin-map__center'), 'Page 04 needs a reference-scaled center diagram');
assert.ok(correctionCss.includes('[data-page-number="08"] .course-card-grid--choices .course-card'), 'Page 08 needs compact reference-scaled identity choices');
assert.ok(correctionCss.includes('[data-page-number="09"] .truth-panels article'), 'Page 09 needs reference-scaled truth panels');
assert.ok(correctionCss.includes('[data-page-number="10"] .comparison-row article'), 'Page 10 needs reference-scaled comparison rows');

const page07Html = correctionAdapter.patches.get(7).render();
assert.ok(page07Html.includes('class="p07-icon"'), 'Page 07 must use editable SVG concept icons');
assert.ok(!page07Html.includes('<span aria-hidden="true">●</span>'), 'Page 07 must not use placeholder dot icons');

console.log('Pages 03–10 reference compliance validation passed.');
