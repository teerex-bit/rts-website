const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'public', 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'public', 'assets', 'page-01-approved.css'), 'utf8');
const required = [
  ['Page 01 uses its dedicated stylesheet', '/assets/page-01-approved.css'],
  ['editable landing marker is present', 'data-landing-page="new"'],
  ['approved transparent circle flame logo is used', 'src="/assets/brand-main-transparent.png"'],
  ['hero message is present', 'class="home-message"'],
  ['three editable ways cards are present', 'class="ways-grid"'],
];
const cssRequired = [
  ['single-line desktop title', 'white-space:nowrap'],
  ['smooth shifted hero gradient', 'rgba(251,248,241,.60) 49%'],
  ['tall narrow message beside the woman', 'width:168px;min-height:236px'],
  ['botanical icon is centered at the top of the message', 'top:21px;left:50%;width:44px;transform:translateX(-50%)'],
  ['clean logo background matches header', '.landing-header .landing-logo'],
  ['conversation photo', "ways-conversations.jpg"],
  ['music photo', "ways-music.jpg"],
  ['books photo', "ways-books.jpg"],
  ['Start the Journey button styling', '.home-journey-cta{display:inline-flex'],
];
const forbidden = ['experience-notice', 'experience-look-again', 'experience-respond'];
const failures = [];
for (const [label, token] of required) if (!html.includes(token)) failures.push(`missing ${label}`);
for (const [label, token] of cssRequired) if (!css.includes(token)) failures.push(`missing ${label}`);
for (const token of forbidden) if (html.includes(token)) failures.push(`obsolete Page 01 card class or asset is still present: ${token}`);
for (const asset of ['ways-conversations.jpg', 'ways-music.jpg', 'ways-books.jpg']) {
  if (!fs.existsSync(path.join(root, 'public', 'assets', 'page-01', asset))) failures.push(`missing built asset: ${asset}`);
}
if (failures.length) {
  console.error('Page 01 visual release verification failed:\n' + failures.map(x => `- ${x}`).join('\n'));
  process.exit(1);
}
console.log('Page 01 visual release verification passed: dedicated stylesheet, editable structure, transparent circle logo, hero gradient/message rules, and three current card photos are present.');
