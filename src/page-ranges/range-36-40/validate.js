const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const range = require('./index');

assert.deepEqual(Object.keys(range).sort(), ['css', 'pages', 'render']);
assert.ok(range.pages instanceof Map, 'pages must be a Map');
assert.deepEqual([...range.pages.keys()], [36, 37, 38, 39, 40]);
assert.equal(typeof range.render, 'function');
assert.equal(typeof range.css, 'string');
assert.match(range.css, /\.rts-36-40/);
assert.match(range.css, /@media\s*\(max-width:\s*900px\)/);
assert.match(range.css, /@media\s*\(max-width:\s*600px\)/);
assert.doesNotMatch(range.css, /done\//i);

const expected = new Map([
  [36, ['/become-together/sending/', 'What a Changed Person Actually Looks Like']],
  [37, ['/join/', 'Reformed Souls for His purposes.']],
  [38, ['/conversations/', 'Learn what God wants you to hear.']],
  [39, ['/music/', 'Alluminate']],
  [40, ['/books/', 'Books for the Journey.']]
]);

for (const [number, page] of range.pages) {
  assert.equal(page.number, number, `Page ${number} number mismatch`);
  assert.equal(page.route, expected.get(number)[0], `Page ${number} route mismatch`);
  assert.equal(page.stages.length, 4, `Page ${number} must use four stages`);
  assert.deepEqual(page.stages.map(stage => stage.name), ['Awaken', 'See Clearly', 'Become', 'Join']);
  assert.ok(!page.stages.some(stage => /^walk$/i.test(stage.name)), `Page ${number} has legacy Walk stage`);

  const html = range.render(page);
  const visibleText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Page ${number} must render one h1`);
  assert.match(html, /<main\b/);
  assert.match(visibleText, new RegExp(expected.get(number)[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.ok(!/(?:src|href|url\()[^>)]*done\//i.test(html), `Page ${number} references done/ at runtime`);
  assert.ok(!/data-stage=["']Walk["']/i.test(html), `Page ${number} renders legacy Walk stage`);
  assert.match(html, new RegExp(`rts-36-40--p${number}`));

  for (const match of html.matchAll(/(?:src|href)="\/assets\/page-ranges\/range-36-40\/([^"#]+)/g)) {
    const assetPath = path.resolve(__dirname, '../../assets/page-ranges/range-36-40', match[1]);
    assert.ok(fs.existsSync(assetPath), `Page ${number} references missing range asset ${match[1]}`);
  }
}

const conversations = range.render(range.pages.get(38));
const conversationsText = conversations.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
assert.doesNotMatch(conversations, /<li class="is-active">/, 'Conversations must not present itself as a Join-stage lesson');
for (const phrase of [
  'Schedule a conversation',
  'Book via Calendly',
  'A different kind of conversation',
  'Speak, Lord, for Your servant is listening.'
]) assert.match(conversationsText, new RegExp(phrase, 'i'));

assert.doesNotThrow(() => range.render({ number: 36, ...range.pages.get(36) }));
assert.throws(() => range.render({ number: 99 }), /Pages 36–40/);

console.log('range-36-40 validation passed: 5 pages, exact export contract, semantic render, no legacy stage or done assets.');
