const assert = require('assert');
const fs = require('fs');
const path = require('path');

const adapterPath = path.join(__dirname, 'index.js');
assert.ok(fs.existsSync(adapterPath), 'correction adapter must exist');

const adapter = require(adapterPath);
assert.deepStrictEqual(Object.keys(adapter).sort(), ['css', 'patches']);
assert.ok(adapter.patches instanceof Map, 'patches must be a Map');
assert.ok(adapter.css.includes('[data-page-number="05"]'), 'CSS must scope Page 05 balance fixes');
assert.ok(adapter.css.includes('[data-page-number="06"]'), 'CSS must scope Page 06 balance fixes');
assert.ok(adapter.css.includes('@media'), 'CSS must preserve responsive behavior');
assert.ok(adapter.css.includes('.home-actions .outline'), 'Page 01 must hide the removed overview action');
assert.ok(adapter.css.includes('.home-closing .button'), 'Page 01 must hide the removed journey action');

for (const number of [2, 6, 7]) {
  assert.ok(adapter.patches.has(number), `missing Page ${number} patch`);
}

for (const number of [2, 7]) {
  const patch = adapter.patches.get(number);
  assert.strictEqual(patch.mode, 'replace');
  assert.strictEqual(typeof patch.render, 'function');
  const html = patch.render();
  assert.ok(html.includes(`data-page-number="${String(number).padStart(2, '0')}"`));
  assert.ok(html.includes('data-editable-source="pages-01-10-corrections"'));
  assert.ok(!/data-stage="Walk"|>\s*WALK\s*</i.test(html), `Page ${number} exposes a Walk stage`);
  assert.ok(!/done\//.test(html), `Page ${number} uses a reference PNG`);
}

assert.ok(adapter.patches.get(2).render().includes('You Have Already Been Formed'));
assert.ok(adapter.patches.get(7).render().includes('See Who You Really Are'));
assert.deepStrictEqual(adapter.patches.get(6).data, {
  continueLabel: 'I’ve Noticed Something I’m Ready to Look At'
});

assert.ok(!/data-stage="Walk"|>\s*WALK\s*</i.test(adapter.css), 'CSS must not add a Walk stage');
assert.ok(!/done\//.test(adapter.css), 'CSS must not use a reference PNG');

const expectedStages = ['Awaken', 'See Clearly', 'Become', 'Join'];
for (const number of [2, 7]) {
  const html = adapter.patches.get(number).render();
  const railStages = [...html.matchAll(/data-stage="([^"]+)"/g)].map(match => match[1]);
  assert.deepStrictEqual(railStages, expectedStages, `Page ${number} must expose the authoritative four-stage rail`);
  for (const href of ['/awaken/', '/see-clearly/', '/become/', '/join/']) {
    assert.ok(html.includes(`href="${href}"`), `Page ${number} missing stage route ${href}`);
  }
}

console.log('Pages 01–10 correction adapter validation passed.');
