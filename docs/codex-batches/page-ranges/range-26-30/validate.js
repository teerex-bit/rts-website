const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rangeRoot = path.resolve(__dirname, '../../../../src/page-ranges/range-26-30');
const assetRoot = path.resolve(__dirname, '../../../../src/assets/page-ranges/range-26-30');
const range = require(rangeRoot);

assert.deepEqual(Object.keys(range).sort(), ['css', 'pages', 'render']);
assert.ok(range.pages instanceof Map, 'pages export must be a Map');
assert.deepEqual([...range.pages.keys()], [26, 27, 28, 29, 30]);
assert.equal(typeof range.render, 'function');
assert.equal(typeof range.css, 'string');
assert.match(range.css, /\.rts-r2630\b/, 'CSS must be namespaced');

for (const number of range.pages.keys()) {
  const modulePath = path.join(rangeRoot, `page-${number}.js`);
  const page = require(modulePath);
  assert.equal(page.number, number, `page-${number} route number`);
  assert.equal(range.pages.get(number), page, `page-${number} standalone module identity`);
  assert.equal(page.route, require('../../../../src/pages').find(item => item.number === number).route);

  const html = range.render(page);
  assert.match(html, new RegExp(`rts-r2630[^\"]*rts-r2630--p${number}`));
  assert.match(html, /<main\b/);
  assert.match(html, /<h1\b/);
  assert.doesNotMatch(html, /done\//i, `page-${number} must not activate a reference PNG`);
  assert.doesNotMatch(html, /<img[^>]+(?:26|27|28|29|30)[^>]+\.png/i, `page-${number} must not use a full-page PNG`);
  assert.doesNotMatch(html, /(?:>|\b)(?:Walk)(?:<|\b)/, `page-${number} must not expose Walk as a stage`);
  for (const stage of ['Awaken', 'See Clearly', 'Become', 'Join']) assert.match(html, new RegExp(stage));
}

for (const asset of ['icons.svg', 'lighthouse.svg', 'seedling-placeholder.svg']) {
  assert.ok(fs.existsSync(path.join(assetRoot, asset)), `missing code-native asset: ${asset}`);
}

assert.throws(() => range.render({number: 25}), /outside range 26–30/);
console.log('range-26-30: 5 page modules and renderer contract validated');
