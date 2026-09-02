const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pages, render } = require('./index');

const root = path.resolve(__dirname, '../../assets/page-ranges/range-31-35');
const expected = new Map([
  [31, ['The Will', 'Becoming · Part Two · Lesson 1 of 5']],
  [32, ['The Body', 'Becoming · Part Two · Lesson 2 of 5']],
  [33, ['Relationships', 'Becoming · Part Two · Lesson 3 of 5']],
  [34, ['The Soul', 'Becoming · Part Two · Lesson 4 of 5']],
  [35, ['You Will Know the Tree by Its Fruit', 'Becoming · Part Two · Lesson 5 of 5 · Screen 1 of 3']]
]);

for (const [number, [title, kicker]] of expected) {
  const page = pages.get(number);
  assert.equal(page.title, title, `Page ${number} title`);
  assert.equal(page.kicker, kicker, `Page ${number} kicker`);
  const html = render(page);
  assert.doesNotMatch(html, /data-stage="Walk"|>Walk</i, `Page ${number} must use four stages`);
  assert.doesNotMatch(html, /[♧♨⌕⌂]/, `Page ${number} must not use placeholder glyph icons`);
}

for (const file of ['body-lake.jpg', 'relationships.jpg', 'soul-mountains.jpg', 'fruit-orchard.jpg', 'icons.svg']) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} must be a replaceable scenic asset`);
}

console.log('Pages 31–35 validation passed.');
