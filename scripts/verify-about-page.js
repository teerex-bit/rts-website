const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

execFileSync(process.execPath, ['scripts/build.js'], { stdio: 'inherit' });

const html = fs.readFileSync('dist/about/index.html', 'utf8');
const cssPath = 'dist/assets/about-page.css';
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';

const checks = [
  ['editorial hero', html.includes('class="about-hero"')],
  ['founder story', html.includes('class="about-founders"')],
  ['portrait figure', html.includes('class="about-portrait"') && html.includes('Trey and Malea')],
  ['four-stage journey', (html.match(/class="about-stage"/g) || []).length === 4],
  ['focused closing invitation', html.includes('class="about-invitation"')],
  ['books remains offline', !html.includes('href="/books/"')],
  ['page-scoped responsive stylesheet', css.includes('@media (max-width: 720px)')],
];

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name);
if (failures.length) {
  console.error(`About page verification failed: ${failures.join(', ')}`);
  process.exit(1);
}

console.log('About page verification passed.');
