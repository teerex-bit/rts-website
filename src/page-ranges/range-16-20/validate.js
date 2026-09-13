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
assert.match(page17Html, /<a class="r1620-rail__brand" href="\/"[^>]*><img src="\/assets\/page-awaken\/curriculum-logo-transparent\.png" alt="Reforming the Soul"><\/a>/, 'Pages 16–17 must render the approved transparent Tree of Life logo asset');
assert.doesNotMatch(page17Html, /class="r1620-logo r1620-logo--light"/, 'Pages 16–17 must not render a hand-built icon and wordmark in the rail');
assert.doesNotMatch(page17Html, /journey-icons\.svg#check/, 'Page 17: sidebar matches the standard See Clearly rail without detached status marks');
assert.doesNotMatch(page17Html, /#chevron/, 'Page 17: the detached chevron/check rail is removed');
assert.doesNotMatch(page17Html, /r1620-look-subtitle">[^<]+<br>/, 'Page 17: introductory sentence stays on one desktop line');
assert.match(css, /@media\(max-width:760px\)\{[^}]*\.r1620\[data-page-number="17"\] \.r1620-look-subtitle\{[^}]*white-space:normal/, 'Page 17: narrow-screen subtitle restores normal wrapping');

assert.match(css, /\.r1620--reflection \.r1620-rail\{background:linear-gradient\(160deg,#06223a,#082e4d 65%,#061d31\)/, 'Pages 16–17 rail must use the approved navy formation gradient');
assert.match(css, /\.r1620--reflection \.r1620-rail__brand\{align-items:center;background:#fffefa;display:flex;height:102px/, 'Pages 16–17 must place the approved transparent logo in the standard clean header strip');
assert.match(css, /\.r1620--reflection \.r1620-rail__journey>a\.is-active\{background:linear-gradient\(135deg,#145ca7,#2878c5\)/, 'Pages 16–17 active See Clearly stage must use the approved blue treatment');
const page16Html = range.render(range.pages.get(16));
assert.match(page16Html, /class="r1620-anger-image-row"/, 'Page 16 must render the two photographs in their own independent image row');
assert.match(page16Html, /class="r1620-anger-content-row"/, 'Page 16 must render the two live comparison lists in a separate content row');
assert.doesNotMatch(page16Html, /class="r1620-anger-column"/, 'Page 16 must not bind each image and list together inside one rigid card');
assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-image-row\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:24px/, 'Page 16 photo panels must form an evenly balanced two-column row');
assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-content-row\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:24px/, 'Page 16 list panels must form an evenly balanced two-column row');
assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-image>img\{display:block;height:220px;object-fit:cover/, 'Page 16 images must keep a deliberate, independently adjustable crop');

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
