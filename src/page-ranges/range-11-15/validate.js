const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pages, render } = require('./index');

const root = path.resolve(__dirname, '../../..');
const expected = new Map([
  [11, ["That’s Formation, Not Identity", 'Identity Is Who You Are', 'Formation Is How You Learn']],
  [12, ['Make Room for Life', 'Old Wineskin', 'New Wineskin']],
  [13, ['Seeing God Clearly', 'What You’ll Discover', 'Why This']],
  [14, ['Is This God Trustworthy?', 'Take a moment to reflect:', 'Continue to Become']],
  [15, ['The Same God.', 'In Jesus (New Testament)', 'In God (Old Testament)']]
]);

for (const [number, phrases] of expected) {
  const page = pages.get(number);
  const html = render(number);
  assert.equal(page.journey.length, 4, `Page ${number} must have four stages`);
  assert(!page.journey.some(stage => stage.name === 'Walk'), `Page ${number} must not include Walk`);
  assert(!html.includes('Continue to Walk'), `Page ${number} must not navigate to Walk`);
  assert(html.includes('data-editable-source="range-11-15"'), `Page ${number} must remain editable HTML`);
  for (const phrase of phrases) assert(html.includes(phrase), `Page ${number} missing ${phrase}`);
}
assert(render(11).includes('href="/see-clearly/review-one/"'), 'Page 11 must continue to Page 12');
assert(render(12).includes('href="/see-god-clearly/"'), 'Page 12 must continue to the Part 2 landing');
assert(render(15).includes('href="/see-god-clearly/images/"'), 'Page 15 must continue to the trust reflection');
assert(render(14).includes('href="/become/"'), 'Page 14 must continue to Become');

const renderer = fs.readFileSync(path.join(__dirname, 'render.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, 'styles.js'), 'utf8');
assert(renderer.includes('<svg'), 'Shared renderer must use editable SVG icons');
assert(!styles.match(/content:\s*['"][◉❧♧♛♢⚿♨▣◷●]/), 'Styles must not use keyboard glyphs as icons');

for (const page of pages.values()) {
  for (const source of [page.heroImage, page.side?.image, ...(page.wineskins || []).map(card => card.image)].filter(Boolean)) {
    assert(source.startsWith('/assets/page-ranges/range-11-15/'), `Page ${page.number} uses an out-of-range asset`);
    assert(fs.existsSync(path.join(root, 'src', source)), `Missing editable asset ${source}`);
  }
}

console.log('Pages 11–15 compliance validation passed');
