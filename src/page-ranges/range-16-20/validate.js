const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const range = require('./index');

const assets = path.resolve(__dirname, '../../assets/page-ranges/range-16-20');

for (const page of range.pages.values()) {
  const html = range.render(page);
  assert.match(html, new RegExp(`data-page-number="${page.number}"`));
  const stages = [...html.matchAll(/data-stage="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual([...new Set(stages)], ['Awaken', 'See Clearly', 'Become', 'Join'], `page ${page.number}: exactly four stages`);
  assert.doesNotMatch(html, /data-stage="Walk"/, `page ${page.number}: Walk is not a stage`);
  if (page.family === 'see-clearly-reflection') {
    assert.match(html, /class="r1620-rail__progress"/, `page ${page.number}: rail progress is visible`);
    assert.match(html, new RegExp(page.progress), `page ${page.number}: rail progress matches the page`);
  }
}

for (const asset of ['anger-jesus.webp', 'anger-storm.webp', 'becoming-hero.webp', 'presence-path.webp', 'movement-live.webp', 'movement-become.webp']) {
  assert.ok(fs.existsSync(path.join(assets, asset)), `${asset} is a separate replaceable photographic asset`);
}

assert.deepEqual([...range.pages.get(17).rows].map(row => row.heard), [
  '“The God of the Old Testament was angry. Jesus showed us a God of love.”',
  '“God’s judgments mean He has changed His mind about me.”',
  '“If God is good, why is there so much hardship and pain?”'
]);
assert.equal(range.pages.get(19).quote[1], 'Matthew 28:20');
assert.equal(range.pages.get(20).newResponse.length, 6);

console.log('range 16–20 validation passed');
