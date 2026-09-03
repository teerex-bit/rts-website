const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const range = require(path.join(__dirname, '../../../../src/page-ranges/range-11-15'));

assert.deepEqual(Object.keys(range).sort(), ['css', 'pages', 'render']);
assert.ok(range.pages instanceof Map, 'pages must be a Map');
assert.deepEqual([...range.pages.keys()], [11, 12, 13, 14, 15]);
assert.equal(typeof range.render, 'function');
assert.equal(typeof range.css, 'string');
assert.match(range.css, /\.rts-11-15\b/);

for (const [number, page] of range.pages) {
  assert.equal(page.number, number, `Page ${number} route number must match`);
  assert.equal(typeof page.route, 'string');
  assert.equal(typeof page.title, 'string');
  assert.ok(page.title.length > 0);
  const html = range.render(page);
  assert.match(html, new RegExp(`data-page-number="${number}"`));
  assert.match(html, /class="rts-11-15/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Page ${number} must have one h1`);
  assert.doesNotMatch(html, /(?:src|href)=["'][^"']*done\//i);
  assert.doesNotMatch(html, /data-stage=["']Walk["']|href=["'][^"']*\/walk\//i);
  assert.doesNotMatch(JSON.stringify(page), /done\//i);
  if (page.family !== 'landing') {
    assert.ok(page.previous?.startsWith('/'), `Page ${number} must expose an absolute previous route`);
    assert.ok(page.next?.startsWith('/'), `Page ${number} must expose an absolute next route`);
    assert.match(html, new RegExp(`href=["']${page.previous.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`));
    assert.match(html, new RegExp(`href=["']${page.next.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`));
  }
  for (const match of html.matchAll(/src="(\/assets\/page-ranges\/range-11-15\/[^"?#]+)"/g)) {
    const asset = path.join(__dirname, '../../../../src', match[1]);
    assert.ok(fs.existsSync(asset), `Page ${number} must resolve ${match[1]}`);
  }
}

const stageOrder = range.pages.get(11).journey.map(stage => stage.name);
assert.deepEqual(stageOrder, ['Awaken', 'See Clearly', 'Become', 'Join']);
assert.match(range.render(14), /href="\/see-god-clearly\/distortions\/"/);
assert.doesNotMatch(range.render(14), />\s*Continue to Walk\s*</i);

const sourceDirectory = path.join(__dirname, '../../../../src/page-ranges/range-11-15');
assert.deepEqual(
  fs.readdirSync(sourceDirectory).filter(file => /^page-\d+\.js$/.test(file)).sort(),
  ['page-11.js', 'page-12.js', 'page-13.js', 'page-14.js', 'page-15.js']
);

console.log('Validated range 11–15: 5 modules, renderer contract, stage order, and reference isolation.');
