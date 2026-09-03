const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '../../../..');
const rangeRoot = path.join(projectRoot, 'src/page-ranges/range-31-35');
const range = require(path.join(rangeRoot, 'index.js'));
const registry = require(path.join(projectRoot, 'src/pages.js'));

assert.deepEqual(Object.keys(range).sort(), ['css', 'pages', 'render'], 'range must export exactly pages, render, and css');
assert.ok(range.pages instanceof Map, 'pages must be a Map');
assert.equal(typeof range.render, 'function', 'render must be a function');
assert.equal(typeof range.css, 'string', 'css must be a string');
assert.match(range.css, /\.rts-r31-35\b/, 'CSS must be namespaced to .rts-r31-35');

const expectedNumbers = [31, 32, 33, 34, 35];
const expectedPagerRoutes = new Map([
  [31, ['/become/', '/become-together/listening/']],
  [32, ['/become-together/companions/', '/become-together/safety/']],
  [33, ['/become-together/listening/', '/become-together/shared-practice/']],
  [34, ['/become-together/safety/', '/become-together/guided-conversation/']],
  [35, ['/become-together/shared-practice/', '/become-together/sending/']]
]);
assert.deepEqual([...range.pages.keys()], expectedNumbers, 'page keys must be 31 through 35 in order');

for (const number of expectedNumbers) {
  const page = range.pages.get(number);
  const canonical = registry.find((entry) => entry.number === number);
  assert.ok(page, `page ${number} must exist`);
  assert.equal(page.number, number, `page ${number} number must match its key`);
  assert.equal(page.route, canonical.route, `page ${number} route must match src/pages.js`);
  assert.equal(page.stage, canonical.stage, `page ${number} stage must match src/pages.js`);
  assert.ok(Array.isArray(page.panels) && page.panels.length >= 3, `page ${number} must have structured panels`);
  assert.deepEqual([page.progress.previousHref, page.progress.nextHref], expectedPagerRoutes.get(number), `page ${number} pager routes must connect adjacent lessons`);
  assert.ok(fs.existsSync(path.join(rangeRoot, `page-${number}.js`)), `page ${number} must have a dedicated module`);

  const html = range.render(page);
  assert.equal(typeof html, 'string', `page ${number} renderer must return a string`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `page ${number} must render exactly one h1`);
  assert.match(html, new RegExp(`data-page-number="${number}"`), `page ${number} must identify its source number`);
  assert.match(html, /class="rts-r31-35\b/, `page ${number} must use the range namespace`);
  assert.match(html, /data-stage="Awaken"[\s\S]*data-stage="See Clearly"[\s\S]*data-stage="Become"[\s\S]*data-stage="Join"/, `page ${number} must render the four-stage sequence`);
  assert.doesNotMatch(html, />\s*Walk\s*</i, `page ${number} must not render Walk as a stage`);
  assert.doesNotMatch(html, /\/walk\//i, `page ${number} must not link to a Walk route`);
  assert.ok(html.includes(`href="${page.progress.previousHref}"`), `page ${number} must render its previous route`);
  assert.ok(html.includes(`href="${page.progress.nextHref}"`), `page ${number} must render its next route`);
  assert.doesNotMatch(html, /done\//i, `page ${number} must not use reference PNGs at runtime`);
  assert.doesNotMatch(JSON.stringify(page), /done\//i, `page ${number} data must not use reference PNGs at runtime`);

  const auditPath = path.join(__dirname, `page-${number}-audit.md`);
  assert.ok(fs.existsSync(auditPath), `page ${number} must have an original-resolution audit`);
  const audit = fs.readFileSync(auditPath, 'utf8');
  for (const heading of ['Source dimensions', 'Exact visible copy', 'Composition', 'Interactive-looking elements', 'Separable assets']) {
    assert.match(audit, new RegExp(`## ${heading}`), `page ${number} audit must include ${heading}`);
  }
}

assert.doesNotMatch(range.css, /done\//i, 'CSS must not use reference PNGs at runtime');
const rasterManifestPath = path.join(__dirname, 'missing-raster-assets.json');
assert.ok(fs.existsSync(rasterManifestPath), 'missing-raster-assets.json must exist');
const rasterManifest = JSON.parse(fs.readFileSync(rasterManifestPath, 'utf8'));
assert.deepEqual(rasterManifest.map((asset) => asset.page), [32, 33, 34, 35], 'raster manifest must cover the four photographic references');
for (const asset of rasterManifest) {
  assert.ok(asset.filename && asset.prompt && asset.aspectRatio && asset.placement, `page ${asset.page} raster brief must be precise`);
  assert.doesNotMatch(JSON.stringify(asset), /done\//i, `page ${asset.page} raster manifest must not suggest a reference PNG runtime path`);
}
console.log('Validated Pages 31–35: modules, routes, renderer, stage sequence, and runtime assets.');
