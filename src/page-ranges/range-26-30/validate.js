const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pages, render} = require('./index');

const rendered = [...pages.values()].map(render).join('\n');

assert.match(rendered, /\/assets\/logo\.svg/, 'pages use the approved shared formation wordmark');
assert.match(rendered, /rts-r2630--legacy-tall/, 'Pages 28–29 retain their approved expanded reading layout');
assert.doesNotMatch(rendered, /placeholder|data-missing-raster/, 'review pages contain no placeholder assets');
assert.match(rendered, /range-26-30\/seedling-growth\.webp/, 'Page 30 uses its approved replaceable local hero asset');
assert.doesNotMatch(rendered, />\s*Walk\s*</, 'Walk is not exposed as a journey stage');

for (const page of pages.values()) {
  const html = render(page);
  assert.match(html, new RegExp(`<h1>${page.heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h1>`), `Page ${page.number} heading stays live HTML`);
  assert.match(html, /<nav[^>]+aria-label="Formation journey stages"/, `Page ${page.number} has stage navigation`);
}

for (const asset of ['brand-logo.svg', 'icons.svg', 'lighthouse.svg', 'seedling-growth.webp']) {
  assert.ok(fs.existsSync(path.join(__dirname, '../../assets/page-ranges/range-26-30', asset)), `${asset} exists`);
}

console.log('range-26-30 validation passed');
