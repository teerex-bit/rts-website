const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pages, render } = require('./index');

const root = path.resolve(__dirname, '../../..');
const styles = fs.readFileSync(path.join(__dirname, 'styles.js'), 'utf8');
const expected = new Map([
  [11, ["That’s Formation, Not Identity", 'Identity Is Who You Are', 'Formation Is How You Learn']],
  [12, ['Make Room for Life', 'Old Wineskin', 'New Wineskin']],
  [13, ['Seeing God Clearly', 'What You’ll Discover', 'Why This']],
  [14, ['Is This God Trustworthy?', 'Take a moment to consider:', 'worthy of your trust']],
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
const page13 = render(13);
assert(page13.includes('rts-11-15__landing-reflection'), 'Page 13 must place its retained reflection content below the hero');
assert(page13.includes('rts-11-15__landing-parts'), 'Page 13 must retain its editable two-movement section below the hero');
assert(page13.includes('Part 1') && page13.includes('See Yourself Clearly'), 'Page 13 must retain the Part 1 movement');
assert(page13.includes('Part 2') && page13.includes('See God Clearly'), 'Page 13 must retain the Part 2 movement');
assert(page13.includes('<article class="is-active"><span>02</span>'), 'Page 13 must highlight Part 2 as the current movement');
assert(!page13.includes('<article class="is-active"><span>01</span>'), 'Page 13 must not highlight Part 1');
assert(page13.indexOf('rts-11-15__landing-parts') > page13.indexOf('</main>'), 'Page 13 movements must begin below the hero');
assert(page13.indexOf('rts-11-15__landing-parts') < page13.indexOf('rts-11-15__landing-reflection'), 'Page 13 movements must appear before discovery content');
assert(!page13.includes('rts-11-15__part-cards'), 'Page 13 hero must not include phase cards');
assert(!page13.includes('rts-11-15__start'), 'Page 13 hero must not include a start button');
assert(!page13.includes('rts-11-15__discover'), 'Page 13 hero must not include a right-side discovery panel');
assert(styles.includes('curriculum-logo-transparent.png'), 'Page 13 must use the Tree of Life logo');

for (const pageNumber of [14, 15]) {
  const html = render(pageNumber);
  assert.match(html, /curriculum-logo-transparent\.png/, `Page ${pageNumber} must use the approved Tree of Life rail logo`);
  assert.match(html, /Discover What is Possible/, `Page ${pageNumber} must use the approved Awaken subtitle`);
  assert.match(html, /Discover What is True/, `Page ${pageNumber} must use the approved See Clearly subtitle`);
}
assert(styles.includes('.rts-11-15--page-14 .rts-11-15__compact,.rts-11-15--page-15 .rts-11-15__compact{grid-template-columns:280px minmax(0,1fr)}'), 'Pages 14–15 rail width must match Pages 16–17');
assert(styles.includes('.rts-11-15--page-14 .rts-11-15__rail,.rts-11-15--page-15 .rts-11-15__rail{background:linear-gradient(160deg,#06223a,#082e4d 65%,#061d31);padding:0 16px 20px}'), 'Pages 14–15 must not leave a navy strip above the Tree of Life logo');
assert(styles.includes('@media (min-width:821px) and (max-width:1200px){.rts-11-15--page-14 .rts-11-15__compact,.rts-11-15--page-15 .rts-11-15__compact{grid-template-columns:280px minmax(0,1fr)}'), 'Pages 14–15 must retain the same rail width at the tablet desktop breakpoint');
assert(!page13.includes('Part 2 of 2'), 'Page 13 must not show a Part number in its header');
for (const [pageNumber, lesson] of [[14, 1], [15, 2]]) {
  const html = render(pageNumber);
  assert(!html.includes('Reflection'), `Page ${pageNumber} must not use reflection wording`);
  assert(!html.includes('rts-11-15__lesson-nav'), `Page ${pageNumber} must not show Back or Continue controls`);
  assert(!html.includes('Part 2 of 2'), `Page ${pageNumber} must not use a Part marker`);
  assert(html.includes(`See Clearly</strong><span aria-hidden="true">•</span>Lesson ${lesson} of 4`), `Page ${pageNumber} must show its actual lesson counter directly after See Clearly`);
  assert(!html.includes('rts-11-15__rail-marker'), `Page ${pageNumber} must not duplicate the lesson counter in the rail`);
  assert(!html.includes('rts-11-15__progress'), `Page ${pageNumber} must not duplicate the lesson counter in the rail`);
}

const renderer = fs.readFileSync(path.join(__dirname, 'render.js'), 'utf8');
assert(styles.includes('grid-template-columns:minmax(0,1fr) minmax(270px,320px)'), 'Page 13 discovery content must use a compact balanced panel');
assert(renderer.includes('rts-11-15__stage-icon'), 'Shared renderer must use the editable stage-icon component');
assert(renderer.includes('/assets/icon-'), 'Shared renderer must reference the shared editable stage SVGs');
assert(renderer.includes('/assets/page-awaken/curriculum-logo-transparent.png'), 'Pages 11–12 must use the approved Tree of Life logo');
assert(styles.includes('padding-top:0'), 'Pages 11–12 side imagery must start at the top of the sidebar');
assert(styles.includes('clamp(270px,20vw,300px)'), 'Pages 11–12 must use the full-width formation rail');
assert(styles.includes('.rts-11-15--page-12 .rts-11-15__transform-arrow{align-self:center}'), 'Page 12 transformation arrow must be vertically centered');
for (const pageNumber of [11, 12]) assert(render(pageNumber).includes('curriculum-logo-transparent.png'), `Page ${pageNumber} must render the approved Tree of Life logo`);
for (const pageNumber of [11, 12]) {
  const html = render(pageNumber);
  assert(!html.includes('rts-11-15__rail-marker'), `Page ${pageNumber} must not duplicate the lesson counter in the rail`);
  assert(html.includes(`See Clearly</strong><span aria-hidden="true">•</span>Lesson ${pageNumber - 7} of 5`), `Page ${pageNumber} must show its lesson counter only in the header`);
}

for (const page of pages.values()) {
  for (const source of [page.heroImage, page.side?.image, ...(page.wineskins || []).map(card => card.image)].filter(Boolean)) {
    assert(source.startsWith('/assets/page-ranges/range-11-15/'), `Page ${page.number} uses an out-of-range asset`);
    assert(fs.existsSync(path.join(root, 'src', source)), `Missing editable asset ${source}`);
  }
}

console.log('Pages 11–15 compliance validation passed');
