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

const sourceFiles = fs.readdirSync(__dirname).filter(file => /^page-(?:21|22|23|24|25)\.js$/.test(file));
assert.strictEqual(sourceFiles.length, 5, 'one source module is required per page');

const assetRoot = path.join(__dirname, '..', '..', 'assets', 'page-ranges', 'range-21-25');
for (const asset of ['logo.svg', 'stage-awaken.svg', 'stage-see.svg', 'stage-become.svg', 'stage-join.svg', 'ear.svg', 'heart.svg', 'clock.svg', 'olive-tree.svg', 'open-hands.svg', 'olive-tree-reference.webp', 'open-hands-reference.webp']) {
  assert(fs.existsSync(path.join(assetRoot, asset)), `missing code-native asset ${asset}`);
}

console.log('range-21-25 validation passed: 5 modules, exact exports, canonical stages, safe assets.');
