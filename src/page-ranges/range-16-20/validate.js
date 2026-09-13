const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const range = require('./index');
const css = range.css;

const assets = path.resolve(__dirname, '../../assets/page-ranges/range-16-20');

// The See Clearly God movement continues the first five lessons; it has its
// own four-lesson sequence.  Keep this map explicit so a future content edit
// cannot silently put every page back on "5 of 5".
const seeClearlyGodCounters = new Map([
  [14, 'Lesson 1 of 4'],
  [15, 'Lesson 2 of 4'],
  [16, 'Lesson 3 of 4'],
  [17, 'Lesson 4 of 4']
]);

for (const page of range.pages.values()) {
  const html = range.render(page);
  assert.match(html, new RegExp(`data-page-number="${page.number}"`));
  const stages = [...html.matchAll(/data-stage="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual([...new Set(stages)], ['Awaken', 'See Clearly', 'Become', 'Join'], `page ${page.number}: exactly four stages`);
  assert.doesNotMatch(html, /data-stage="Walk"/, `page ${page.number}: Walk is not a stage`);
  if (page.family === 'see-clearly-reflection') {
    assert.match(html, /class="r1620-rail__journey"/, `page ${page.number}: formation rail is visible`);
    assert.doesNotMatch(html, />Reflection/, `page ${page.number}: reflection wording is removed`);
    assert.doesNotMatch(html, /r1620-pager/, `page ${page.number}: Back and Continue controls are removed`);
    assert.doesNotMatch(html, /Part 2 of 2/, `page ${page.number}: Part marker is removed`);
    const expectedLesson = seeClearlyGodCounters.get(page.number);
    assert.match(html, new RegExp(`<b>See Clearly<\\/b><small>${expectedLesson}<\\/small>`), `page ${page.number}: actual lesson counter follows See Clearly`);
    assert.doesNotMatch(html, /r1620-coursebar__tools/, `page ${page.number}: standalone header tools are removed`);
  }
}

for (const [pageNumber, expectedLesson] of seeClearlyGodCounters) {
  const source = pageNumber < 16
    ? require(`../range-11-15/page-${pageNumber}`)
    : range.pages.get(pageNumber);
  assert.equal(source.lesson, expectedLesson, `Page ${pageNumber}: correct visible lesson number`);
  assert.equal(source.progress, expectedLesson, `Page ${pageNumber}: correct progress number`);
}

const page17Html = range.render(range.pages.get(17));
assert.match(page17Html, /data-stage="Awaken"[^>]*>[\s\S]*?journey-icons\.svg#check/, 'Page 17: only Awaken remains marked complete');
assert.doesNotMatch(page17Html, /#chevron/, 'Page 17: the detached chevron/check rail is removed');
assert.doesNotMatch(page17Html, /r1620-look-subtitle">[^<]+<br>/, 'Page 17: introductory sentence stays on one desktop line');
assert.match(css, /@media\(max-width:760px\)\{[^}]*\.r1620\[data-page-number="17"\] \.r1620-look-subtitle\{[^}]*white-space:normal/, 'Page 17: narrow-screen subtitle restores normal wrapping');

assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-grid\{align-items:stretch\}/, 'Page 16 comparison cards must begin and end as a balanced pair');
assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-column>img\{display:block;height:clamp\(190px,19vw,250px\);object-fit:cover\}/, 'Page 16 images must keep an intentional crop within the card');

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
