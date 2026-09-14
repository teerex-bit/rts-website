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
assert.match(css, /\.r1620--reflection \.r1620-rail\{background:linear-gradient\(160deg,#06223a,#082e4d 65%,#061d31\);width:280px;flex-basis:280px;padding:0 16px 20px\}/, 'Pages 16–17 rail must not leave a navy strip above the white logo header');
assert.match(css, /\.r1620--reflection \.r1620-coursebar\{height:102px/, 'Pages 16–17 main course header must align with the logo header strip');
assert.match(css, /\.r1620--reflection \.r1620-rail__journey small\{max-width:none;font-size:11px;line-height:1\.42\}/, 'Pages 16–17 must share the approved rail subtitle rhythm');
assert.match(css, /\.r1620--reflection \.r1620-rail__journey>a>\.r1620-journey-icon\{width:42px;height:42px\}/, 'Pages 16–17 must use the approved rail icon geometry');
assert.match(page17Html, /Discover What is Possible/, 'Pages 16–17 must use the approved Awaken subtitle');
assert.match(page17Html, /Discover What is True/, 'Pages 16–17 must use the approved See Clearly subtitle');
assert.match(css, /\.r1620--reflection \.r1620-rail__journey>a\.is-active\{background:linear-gradient\(135deg,#145ca7,#2878c5\)/, 'Pages 16–17 active See Clearly stage must use the approved blue treatment');
const page16Html = range.render(range.pages.get(16));
assert.match(page16Html, /class="r1620-anger-image-row"/, 'Page 16 must render the two photographs in their own independent image row');
assert.match(page16Html, /class="r1620-anger-content-row"/, 'Page 16 must render the two live comparison lists in a separate content row');
assert.doesNotMatch(page16Html, /class="r1620-anger-column"/, 'Page 16 must not bind each image and list together inside one rigid card');
assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-image-row\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:24px/, 'Page 16 photo panels must form an evenly balanced two-column row');
assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-content-row\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\);gap:24px/, 'Page 16 list panels must form an evenly balanced two-column row');
assert.match(css, /\.r1620\[data-page-number="16"\] \.r1620-anger-image>img\{display:block;height:220px;object-fit:cover/, 'Page 16 images must keep a deliberate, independently adjustable crop');
assert.match(page16Html, /jesus-righteous-anger-crop\.jpg/, 'Page 16 must use the clean Jesus crop without the baked-in right-edge strip');

const page18Html = range.render(range.pages.get(18));
assert.match(page18Html, /class="r1620-become-topbar"/, 'Page 18 renders its dedicated navy Becoming header');
assert.match(page18Html, /curriculum-logo-transparent\.png/, 'Page 18 uses the approved Tree of Life header asset');
assert.match(page18Html, /class="r1620-landing-steps"/, 'Page 18 keeps the editable four-step hero panel');
assert.doesNotMatch(page18Html, /Watch the Overview/i, 'Page 18 must not render the removed overview button');
assert.match(page18Html, /becoming-hero-natural-wide\.webp/, 'Page 18 hero uses the approved full seated-woman valley composition with natural wide scenery');
assert.doesNotMatch(page18Html, /becoming-hero-wide\.webp/, 'Page 18 must not use the former hero asset with blurred dark side panels');
assert.match(css, /\.r1620\[data-page-number="18"\] \.r1620-landing-steps\{right:max\(32px,calc\(\(100% - 1440px\)\/2 \+ 30px\)\);top:112px;width:236px/, 'Page 18 four-step panel stays in the reserved right-side hero space beside the woman');
assert.match(css, /landing-hero::after\{background:linear-gradient\(90deg,#fcfaf7 0%,#fcfaf7 30%,rgba\(252,250,247,\.96\) 38%,rgba\(252,250,247,\.68\) 46%,rgba\(252,250,247,\.28\) 55%,rgba\(252,250,247,0\) 68%,transparent 100%\)/, 'Page 18 hero keeps a modest cream text field followed by a gradual fade to a fully clear right side');
assert.doesNotMatch(css, /landing-hero::after\{[^}]*rgba\((?:20,11,38|25,15,42)/, 'Page 18 hero overlay must not tint the woman, card, or right side with a dark brown-purple stop');
assert.match(page18Html, /This is not a checklist/, 'Page 18 keeps its way-of-life band');
assert.match(page18Html, /class="r1620-movement r1620-movement--1"/, 'Page 18 keeps its first editable movement panel');
assert.match(page18Html, /class="r1620-movement r1620-movement--2"/, 'Page 18 keeps its second editable movement panel');
assert.doesNotMatch(page18Html, /class="r1620-between"/, 'Page 18 keeps the two movement boxes balanced without a large center arrow');
assert.doesNotMatch(page18Html, /r1620-movement__heading"><svg/, 'Page 18 movement titles must not render the two removed large icons');
assert.match(page18Html, /r1620-movements__phrase">Two Movements\. One Journey\.<\/span>/, 'Page 18 movement heading reads as one naturally spaced centered line');
assert.doesNotMatch(css, /r1620-movements__phrase\+\.r1620-movements__phrase/, 'Page 18 movement heading does not split the phrase with an artificial gap');
assert.match(page18Html, /<h2>Become Like Him<\/h2>/, 'Page 18 Part Two uses the balanced Become Like Him title');
assert.doesNotMatch(page18Html, />Soul<|>Fruit</, 'Page 18 removes Soul and Fruit from the Part Two movement list');
assert.match(page18Html, /Thoughts[\s\S]*Feelings[\s\S]*Desires[\s\S]*Will[\s\S]*Body[\s\S]*Relationships/, 'Page 18 retains the six approved Part Two movement items');
assert.match(css, /data-page-number="18"\] \.r1620-movement__steps\{grid-template-columns:repeat\(3,1fr\)/, 'Page 18 uses matching three-column grids for both six-item lists');
assert.match(css, /data-page-number="18"\] \.r1620-movement__heading\{min-height:105px\}/, 'Page 18 reserves matching title-and-description height above both icon grids');
assert.match(css, /data-page-number="18"\] \.r1620-movement>a\{[^}]*margin-top:auto[^}]*text-align:center/, 'Page 18 anchors both Explore links to the same centered bottom baseline');
assert.match(page18Html, /Dallas Willard/, 'Page 18 keeps the editable Dallas Willard quote band');
assert.match(page18Html, /class="r1620-principles-wrap"><div class="r1620-principles">/, 'Page 18 keeps the white principles tray within the navy closing field');
assert.match(css, /\.r1620\[data-page-number="18"\] \.r1620-movement--1\{background-image:[^}]*movement-live-clean\.webp/, 'Page 18 Part One uses its clean replaceable scenic asset');
assert.match(css, /\.r1620\[data-page-number="18"\] \.r1620-movement--2\{background-image:[^}]*movement-become-clean\.webp/, 'Page 18 Part Two uses its clean replaceable scenic asset');
assert.doesNotMatch(css, /data-page-number="18"[^}]*movement-live\.webp/, 'Page 18 must not reference the old Part One image with baked letter fragments');
assert.doesNotMatch(css, /data-page-number="18"[^}]*movement-become\.webp/, 'Page 18 must not reference the old Part Two image with the baked gold-circle fragment');
assert.match(css, /movement--1\{background-image:linear-gradient\(90deg,rgba\(242,236,248,0\) 0 24%,rgba\(247,242,249,\.72\) 29%,#f8f3fa 34%\)/, 'Page 18 Part One solid text field reaches farther toward its outer photo with a short transition');
assert.match(css, /movement--2\{background-image:linear-gradient\(90deg,#fdf8ed 0 62%,rgba\(253,248,237,\.7\) 66%,rgba\(253,248,237,0\) 72%\)/, 'Page 18 Part Two solid text field reaches farther toward its outer photo with a short transition');
assert.match(css, /@media\(max-width:760px\)[\s\S]*data-page-number="18"\] \.r1620-movements__grid\{grid-template-columns:1fr/, 'Page 18 movement panels must stack at the mobile breakpoint');
assert.match(css, /\.r1620\[data-page-number="18"\] \.r1620-principles-wrap\{background:linear-gradient\([^}]*#17152f/, 'Page 18 principles tray remains visually attached to the deep-navy quote band');

for (const asset of ['anger-jesus.webp', 'anger-storm.webp', 'becoming-hero.webp', 'becoming-hero-wide.webp', 'presence-path.webp', 'movement-live.webp', 'movement-become.webp', 'movement-live-clean.webp', 'movement-become-clean.webp']) {
  assert.ok(fs.existsSync(path.join(assets, asset)), `${asset} is a separate replaceable photographic asset`);
}

assert.deepEqual([...range.pages.get(17).rows].map(row => row.heard), [
  '“The God of the Old Testament was angry. Jesus showed us a God of love.”',
  '“God’s judgments mean He has changed His mind about me.”',
  '“If God is good, why is there so much hardship and pain?”'
]);
assert.equal(range.pages.get(19).quote[1], 'Matthew 28:20');
const page19Html = range.render(range.pages.get(19));
assert.doesNotMatch(page19Html, /Enter a Conversation/, 'Page 19 removes the top-right conversation control');
assert.doesNotMatch(page19Html, /aria-label="Account"/, 'Page 19 removes the top-right profile control');
assert.doesNotMatch(page19Html, /Watch Overview/, 'Page 19 removes the overview button');
assert.match(page19Html, /Begin Lesson/, 'Page 19 retains the Begin Lesson button');
assert.match(css, /data-page-number="19"\] \.r1620-lesson-hero blockquote\{top:90px\}/, 'Page 19 raises the Matthew 28:20 quote card in the hero');
assert.match(css, /data-page-number="19"\] \.r1620-lesson-hero blockquote cite\{[^}]*white-space:nowrap/, 'Page 19 keeps Matthew 28:20 on one balanced line');
const page20Html = range.render(range.pages.get(20));
assert.doesNotMatch(page20Html, /Enter a Conversation/, 'Page 20 removes the top-right conversation control to match the other lesson pages');
assert.match(page20Html, /aria-label="Account"/, 'Page 20 retains its top-right profile control');
assert.doesNotMatch(page20Html, /Screen 2 of 2/, 'Page 20 does not display a separate screen counter');
assert.doesNotMatch(page20Html, /Listen Deeply/, 'Page 20 keeps screen two within Recognize His Presence instead of adding a second sidebar lesson');
assert.doesNotMatch(page20Html, /class="r1620-lesson-pager"/, 'Page 20 removes the bottom previous and next screen controls');
assert.match(page20Html, /Recognize His Presence/, 'Page 20 keeps Recognize His Presence selected in the sidebar');
assert.equal(range.pages.get(20).newResponse.length, 6);

console.log('range 16–20 validation passed');
