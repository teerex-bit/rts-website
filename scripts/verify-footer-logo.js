const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

execFileSync(process.execPath, ['scripts/build.js'], { stdio: 'inherit' });

for (const page of ['about', 'contact']) {
  const html = fs.readFileSync(`dist/${page}/index.html`, 'utf8');
  const footer = html.match(/<footer class="rts-info-footer">[\s\S]*?<\/footer>/)?.[0] || '';

  if (!footer.includes('/assets/brand-main-transparent.png')) {
    throw new Error(`${page} footer must use the approved circle-flame logo`);
  }

  if (footer.includes('/assets/logo-light.svg')) {
    throw new Error(`${page} footer must not use the retired footer logo`);
  }
}

const css = fs.readFileSync('dist/assets/info-pages.css', 'utf8');
if (!css.includes('.rts-info-footer__brand')) {
  throw new Error('Footer must provide a readable treatment for the approved logo');
}

console.log('Footer logo verification passed.');
