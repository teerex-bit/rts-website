const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pages = require('../src/pages');
const page00Path = path.join(root, 'public', 'index.html');
const page01Path = path.join(root, 'public', 'soul-formation', 'index.html');
const reviewPath = path.join(root, 'public', 'review', 'pages-01-40', 'index.html');
const failures = [];

if (pages.length !== 41) failures.push('page registry does not contain Pages 00–40');
if (pages[0]?.number !== 0 || pages[0]?.route !== '/') failures.push('Page 00 is not the root route');
if (pages[1]?.number !== 1 || pages[1]?.route !== '/soul-formation/') failures.push('Page 01 is not preserved at /soul-formation/');
if (pages[2]?.number !== 2 || pages[2]?.title !== 'You Have Already Been Formed') failures.push('Page 02 review title does not match its visible headline');
if (!fs.existsSync(page00Path)) failures.push('Page 00 output is missing');
if (!fs.existsSync(page01Path)) failures.push('Page 01 output is missing at /soul-formation/');

if (fs.existsSync(page00Path)) {
  const html = fs.readFileSync(page00Path, 'utf8');
  const required = [
    'data-page-number="00"',
    '<h1 id="page00-title">You’re being shaped<br>by something.</h1>',
    '/assets/brand-main-transparent.png',
    '/assets/page-00-hero-clean.png',
    '>Teachings</a>',
    'aria-controls="main-nav"',
    'A journey of formation',
    '>Awaken<',
    '>See Clearly<',
    '>Become<',
    '>Join<',
    'Soul Formation',
    'Conversations',
    'Music',
    'Books',
    '/assets/page-00-approved.css'
  ];
  for (const token of required) if (!html.includes(token)) failures.push(`Page 00 is missing ${token}`);
  for (const obsolete of ['>Walk<', '>Becoming<', 'Writings &amp; Blogs', 'page00-outcomes', 'page00-number']) if (html.includes(obsolete)) failures.push(`Page 00 contains removed content ${obsolete}`);
}

const page00CssPath = path.join(root, 'public', 'assets', 'page-00-approved.css');
if (!fs.existsSync(page00CssPath) || !fs.readFileSync(page00CssPath, 'utf8').includes('@media(max-width:900px)')) failures.push('Page 00 mobile navigation breakpoint is missing');
const heroPath = path.join(root, 'public', 'assets', 'page-00-hero-clean.png');
if (!fs.existsSync(heroPath)) failures.push('Page 00 clean hero image is missing');
if (fs.existsSync(page00Path)) {
  const html = fs.readFileSync(page00Path, 'utf8');
  if (html.includes('/assets/page-00-hero-reference.png')) failures.push('Page 00 still uses the hero asset with baked labels');
}
if (fs.existsSync(page00CssPath)) {
  const css = fs.readFileSync(page00CssPath, 'utf8');
  if (!css.includes('.page00-hero__image')) failures.push('Page 00 hero image presentation is missing');
  if (!css.includes('filter:saturate(1.1) contrast(1.06) brightness(.99) sepia(.025)')) failures.push('Page 00 restrained hero color grade is missing');
  if (!css.includes('@media(max-width:900px)')) failures.push('Page 00 responsive hero presentation is missing');
  if (!css.includes('@media(min-width:1500px)')) failures.push('Page 00 wide-screen breakpoint is missing');
  for (const token of ['max-width:1500px', 'min-height:440px', 'font-size:1rem', 'min-height:220px']) {
    if (!css.includes(token)) failures.push(`Page 00 wide-screen treatment is missing ${token}`);
  }
}

if (fs.existsSync(reviewPath)) {
  const review = fs.readFileSync(reviewPath, 'utf8');
  if (!review.includes('Pages 00–40')) failures.push('review heading does not read Pages 00–40');
  const buttonCount = (review.match(/data-final-review-route=/g) || []).length;
  if (buttonCount !== 41) failures.push(`review contains ${buttonCount} page buttons instead of 41`);
}

if (failures.length) {
  console.error('Page 00 verification failed:\n' + failures.map(failure => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log('Page 00 verification passed: root landing page, Page 01 route, approved stages, resources, and 41-page review are present.');
