const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rangeRoot = path.resolve(__dirname, '../../../../src/page-ranges/range-16-20');
const range = require(path.join(rangeRoot, 'index.js'));

assert.deepEqual(Object.keys(range).sort(), ['css', 'pages', 'render']);
assert.ok(range.pages instanceof Map, 'pages export must be a Map');
assert.deepEqual([...range.pages.keys()], [16, 17, 18, 19, 20]);
assert.equal(typeof range.render, 'function');
assert.equal(typeof range.css, 'string');
assert.match(range.css, /\.r1620\b/, 'CSS must be namespaced to the range');

for (const number of [16, 17, 18, 19, 20]) {
  const page = range.pages.get(number);
  assert.equal(page.number, number, `page-${number} route number mismatch`);
  assert.equal(typeof page.route, 'string', `page-${number} must expose its route`);
  assert.ok(page.route.startsWith('/'), `page-${number} route must be absolute`);
  const html = range.render(page);
  assert.match(html, new RegExp(`data-page-number=["']${number}["']`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `page-${number} must render one h1`);
  assert.doesNotMatch(html, /(?:src|href)=["'][^"']*done\//i, `page-${number} activates a reference PNG`);
  assert.doesNotMatch(html, /data-stage=["']Walk["']|href=["'][^"']*\/walk\//i, `page-${number} exposes legacy Walk stage`);
  assert.match(html, /data-editable-source=["']range-16-20["']/);
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/page-ranges\/range-16-20\/[^"?#]+)(?:#[^"]+)?"/g)) {
    const asset = path.join(__dirname, '../../../../src', match[1]);
    assert.ok(fs.existsSync(asset), `page-${number} must resolve ${match[1]}`);
  }
}

for (const number of [16, 17, 18, 19, 20]) {
  assert.ok(fs.existsSync(path.join(rangeRoot, `page-${number}.js`)), `page-${number}.js is missing`);
  assert.ok(fs.existsSync(path.join(__dirname, `page-${number}.md`)), `page-${number} audit is missing`);
}

const manifestPath = path.join(__dirname, 'missing-raster-assets.json');
assert.ok(fs.existsSync(manifestPath), 'missing-raster-assets.json is missing');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.deepEqual(manifest.range, [16, 20]);
assert.ok(manifest.assets.length >= 3, 'raster manifest requires precise replacement briefs');
for (const asset of manifest.assets) {
  assert.ok(asset.pages.length > 0 && asset.filename && asset.prompt && asset.aspectRatio);
  assert.ok(asset.prompt.length > 120, `${asset.filename} prompt is not precise enough`);
}

console.log('Validated range 16-20: exports, five modules, semantic renders, stage policy, audits, and raster manifest.');
