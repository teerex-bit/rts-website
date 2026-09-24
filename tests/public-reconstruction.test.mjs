import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { access, readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const requiredRoutes = [
  '/', '/formation/', '/awaken/lesson-1/', '/awaken/lesson-2/',
  '/see-clearly/', '/become/', '/join/', '/conversations/', '/music/',
  '/about/', '/contact/',
];

async function page(route) {
  return readFile(new URL(`public${route}index.html`, root), 'utf8');
}

test('all approved public routes exist and Books is outside public output', async () => {
  await Promise.all(requiredRoutes.map(route => access(new URL(`public${route}index.html`, root))));
  await assert.rejects(access(new URL('public/books/index.html', root)));
  await access(new URL('archive/books/index.html', root));
});

test('public discovery headers expose the five approved destinations and the accessible mobile menu', async () => {
  const destinations = ['/formation/', '/conversations/', '/music/', '/about/', '/contact/'];
  const excluded = ['/doorway/', '/books/', '/deep-dive/', '/dashboard/', '/auth/'];
  for (const route of ['/', '/conversations/', '/music/', '/about/', '/contact/']) {
    const source = await page(route);
    const nav = source.match(/<nav[^>]*aria-label=["']Main navigation["'][^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
    const labels = ['Formation', 'Conversations', 'Music', 'About Us', 'Contact'];
    assert.deepEqual([...nav.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/g)].map(match => [match[1], match[2]]),
      destinations.map((path, index) => [path, labels[index]]));
    for (const path of excluded) assert.doesNotMatch(nav, new RegExp(`href=["']${path.replaceAll('/', '\\/')}["']`));
    const currentPath = route === '/' ? null : route;
    if (currentPath) assert.match(nav, new RegExp(`<a(?=[^>]*href=["']${currentPath.replaceAll('/', '\\/')}["'])(?=[^>]*aria-current=["']page["'])[^>]*>`));
    assert.match(source, /<button[^>]*class=["']menu["'][^>]*aria-expanded=["']false["'][^>]*aria-controls=["']main-nav["']/);
    assert.match(source, /<nav id=["']main-nav["']/);
    assert.match(source, /\/assets\/site\.js/);
  }
  const menuScript = await readFile(new URL('public/assets/site.js', root), 'utf8');
  assert.match(menuScript, /button\.setAttribute\('aria-expanded', String\(open\)\)/);
  assert.match(menuScript, /event\.key === 'Escape'/);
  assert.match(menuScript, /button\.focus\(\)/);
  assert.match(menuScript, /event\.target\.closest\('a'\)/);
});

test('public header rules show five links on desktop and use the Menu control on mobile', async () => {
  const stylesheet = new URL('public/assets/css/public-header-navigation.css', root);
  assert.ok(existsSync(stylesheet), 'shared public header stylesheet exists');
  const styles = await readFile(stylesheet, 'utf8');
  assert.match(styles, /\.public-primary-header \.public-primary-nav\s*\{[^}]*display:\s*flex/);
  assert.match(styles, /\.public-primary-header \.public-primary-nav\s*\{[^}]*flex-wrap:\s*nowrap/);
  assert.match(styles, /@media\s*\(max-width:\s*740px\)[\s\S]*?\.public-primary-header \.public-primary-nav\s*\{[^}]*display:\s*none/);
  assert.match(styles, /\.public-primary-header \.public-primary-nav\.open\s*\{[^}]*display:\s*flex/);
  assert.match(styles, /@media\s*\(max-width:\s*740px\)[\s\S]*?\.public-primary-header \.menu\s*\{[^}]*display:\s*inline-flex/);
});

test('curriculum Tree of Life logo links provide a route back to the public home', async () => {
  for (const route of ['/formation/', '/awaken/lesson-1/', '/awaken/lesson-2/', '/see-clearly/', '/become/', '/join/']) {
    const source = await page(route);
    assert.match(source, /<a[^>]*href=["']\/["'][^>]*>[\s\S]{0,240}rts-tree-wordmark\.png/,
      `${route} keeps Tree of Life branding linked to public home`);
  }
});

test('public pages use circle flame branding and Formation pages use Tree of Life', async () => {
  for (const route of ['/', '/conversations/', '/music/', '/about/', '/contact/']) {
    const source = await page(route);
    assert.match(source, /brand-main-transparent\.png/);
    assert.match(source, /<footer[\s\S]*?class=["']public-footer__brand["'][^>]*>[\s\S]*?brand-main-footer\.png/);
    assert.match(source, /public-footer-branding\.css/);
  }
  for (const route of ['/formation/', '/awaken/lesson-1/', '/see-clearly/', '/become/', '/join/']) {
    assert.match(await page(route), /rts-tree-wordmark\.png/);
  }
});

test('Music themes use one gold circle icon system and keep the approved wording', async () => {
  const source = await page('/music/');
  const group = source.match(/<nav aria-label="Music themes">([\s\S]*?)<\/nav>/)?.[1] ?? '';
  assert.equal((group.match(/class="music-theme-icon"/g) ?? []).length, 3);
  assert.equal((group.match(/class="rts-36-40__icon"/g) ?? []).length, 3);
  for (const label of ['SEE HIM MORE CLEARLY', 'KNOW HIM MORE DEEPLY', 'WALK WITH HIM DAILY']) {
    assert.match(group, new RegExp(label));
  }
  assert.match(group, /#see/);
  assert.match(group, /#heart/);
  assert.match(group, /#music/);
  const styles = await readFile(new URL('public/assets/css/music-branding.css', root), 'utf8');
  assert.match(styles, /\.rts-36-40__music-closing\{[^}]*grid-template-columns:minmax\(300px,1fr\) minmax\(0,2fr\)/);
  assert.match(styles, /\.music-theme\{[^}]*white-space:nowrap/);
  assert.match(styles, /@media\(max-width:900px\)\{\.rts-36-40__music-closing\{grid-template-columns:1fr\}/);
  assert.match(styles, /@media\(max-width:600px\)[\s\S]*?flex-direction:column/);
});

test('approved footer mark keeps its gold flame on the navy background', async () => {
  const styles = await readFile(new URL('public/assets/css/public-footer-branding.css', root), 'utf8');
  assert.match(styles, /\.public-footer__brand img\{filter:none\}/);
  await access(new URL('public/assets/brand-main-footer.png', root));
});

test('Conversations value cards use matching gold circles and a shared mobile layout', async () => {
  const source = await page('/conversations/');
  const section = source.match(/<section class="conversation-benefits"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((section.match(/class="benefit-icon(?: gold-heart)?"/g) ?? []).length, 4);
  assert.match(section, /#cross/);
  assert.match(section, /#heart/);
  assert.match(section, /#awaken/);
  assert.match(section, /#will/);
  assert.equal((section.match(/class="benefit-icon gold-heart"/g) ?? []).length, 1);
  const styles = await readFile(new URL('public/assets/css/conversations-icons.css', root), 'utf8');
  assert.match(styles, /\.benefit-icon\{[^}]*width:48px[^}]*height:48px/);
  assert.match(styles, /\.benefit-icon\{[^}]*border-radius:50%/);
  assert.match(styles, /\.benefit-icon\s+\.conversation-icon\{[^}]*width:26px[^}]*height:26px/);
  assert.match(styles, /@media\(max-width:600px\)[\s\S]*?\.conversation-benefits article\{[^}]*grid-template-columns:48px minmax\(0,1fr\)/);
});

test('Home exposes exactly three public resource cards', async () => {
  const source = await page('/');
  assert.equal((source.match(/class=["'][^"']*page00-resource(?:\s|["'])/g) ?? []).length, 3);
  assert.doesNotMatch(source, /href=["']\/books\//);
});

test('Home presents the three resources as quiet, neutral entry points', async () => {
  const source = await page('/');
  const styles = await readFile(new URL('public/assets/page-00-approved.css', root), 'utf8');

  assert.match(source, /class=["']page00-resources__intro["']/);
  assert.match(source, /formation journey, personal conversations, and music/i);
  assert.match(styles, /\.page00-resources__intro\{/);
  assert.match(styles, /\.page00-resource\{[^}]*background:\s*var\(--p00-paper\)/s);
  assert.match(styles, /\.page00-resource\{[^}]*border-top:\s*3px solid var\(--p00-gold\)/s);
  assert.match(styles, /\.page00-resource__icon\{[^}]*background:\s*#f3e7d2/s);
});

test('Home hero image spans beneath a gradual overlay without a hard vertical seam', async () => {
  const styles = await readFile(new URL('public/assets/page-00-approved.css', root), 'utf8');
  const imageRules = [...styles.matchAll(/\.page00-hero__image\{([^}]*)\}/g)];
  const overlayRules = [...styles.matchAll(/(?:^|})\.page00-hero:after\{([^}]*)\}/gm)];
  const finalImageRule = imageRules.at(-1)?.[1] ?? '';
  const finalOverlayRule = overlayRules.at(-1)?.[1] ?? '';

  assert.match(finalImageRule, /width:\s*100%/);
  assert.match(finalImageRule, /object-position:\s*center top/);
  assert.match(finalOverlayRule, /linear-gradient\(90deg/);
  assert.match(finalOverlayRule, /rgba\(251,248,241,\.94\)/);
  assert.match(finalOverlayRule, /transparent\s+72%/);
});

async function publicHtmlFiles(directory = new URL('public/', root)) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const target = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    if (entry.isDirectory()) return publicHtmlFiles(target);
    return target.pathname.endsWith('.html') ? [target] : [];
  }));
  return nested.flat();
}

test('public visitor-facing pages do not link to the legacy Doorway page', async () => {
  const pages = (await publicHtmlFiles()).filter(file => !file.pathname.endsWith('/doorway/index.html'));
  const links = [];
  for (const file of pages) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/\bhref=["']([^"']+)["']/gi)) {
      const target = match[1].split(/[?#]/, 1)[0];
      if (target === '/doorway' || target.startsWith('/doorway/')) {
        links.push(`${file.pathname.replace(root.pathname, '')}: ${match[1]}`);
      }
    }
  }
  assert.deepEqual(links, []);
});

test('Conversations links to the approved Calendly appointment and has approved trust language', async () => {
  const source = await page('/conversations/');
  assert.match(source, /https:\/\/calendly\.com\/reformingthesoul-info\/30min/);
  assert.match(source, /Book an appointment/);
  assert.match(source, /Safe &amp; Trusting/);
  assert.doesNotMatch(source, /conversations-rail/);
});

test('Formation journey retains the approved sequence and closing emphasis', async () => {
  const formation = await page('/formation/');
  for (const phrase of ['What got attention.', 'Who could be trusted.', 'What failure meant.', 'What God was like.', 'Luke 6:45', 'Romans 8:29']) {
    assert.match(formation, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(await page('/join/useful/'), /God restored your soul to be useful\./);
});

test('Formation introduction hero uses a curved veil instead of a vertical washed-out band', async () => {
  const styles = await readFile(new URL('public/assets/css/pages/formation-introduction.css', root), 'utf8');

  assert.match(styles, /\.hero-overlay\{background:radial-gradient\(ellipse/);
  assert.match(styles, /rgba\(250,246,239,\.16\) 82%/);
  assert.match(styles, /transparent 100%/);
});

test('About and Contact are secondary links in the public footer', async () => {
  for (const route of ['/', '/conversations/', '/music/', '/about/', '/contact/']) {
    const source = await page(route);
    assert.match(source, /href=["']\/about\//);
    assert.match(source, /href=["']\/contact\//);
  }
});
