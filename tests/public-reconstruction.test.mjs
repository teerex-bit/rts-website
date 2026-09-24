import assert from 'node:assert/strict';
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

test('public discovery pages use only Formation, Conversations, and Music in primary navigation', async () => {
  for (const route of ['/', '/conversations/', '/music/', '/about/', '/contact/']) {
    const source = await page(route);
    const nav = source.match(/<nav[^>]*aria-label=["']Main navigation["'][^>]*>([\s\S]*?)<\/nav>/i)?.[1] ?? '';
    assert.match(nav, />Formation</);
    assert.match(nav, />Conversations</);
    assert.match(nav, />Music</);
    assert.doesNotMatch(nav, />Books</);
    assert.doesNotMatch(nav, />Teachings</);
    assert.doesNotMatch(nav, />Writings</);
    assert.doesNotMatch(nav, />Spiritual Direction</);
  }
});

test('public pages use circle flame branding and Formation pages use Tree of Life', async () => {
  for (const route of ['/', '/conversations/', '/music/', '/about/', '/contact/']) {
    assert.match(await page(route), /brand-main-transparent\.png/);
  }
  for (const route of ['/formation/', '/awaken/lesson-1/', '/see-clearly/', '/become/', '/join/']) {
    assert.match(await page(route), /rts-tree-wordmark\.png/);
  }
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
