import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function html(route) {
  return readFile(new URL(`public${route}index.html`, root), 'utf8');
}

test('new RTS public routes are present', async () => {
  const routes = ['/', '/formation/', '/doorway/', '/conversations/', '/books/', '/music/'];
  await Promise.all(routes.map(route => access(new URL(`public${route}index.html`, root))));
});

test('public landing page links the primary navigation', async () => {
  const page = await html('/');
  for (const route of ['/formation/', '/conversations/', '/books/', '/music/']) {
    assert.match(page, new RegExp(`href=["']${route.replaceAll('/', '\\/')}["']`));
  }
});

test('Formation hands the visitor to the Doorway', async () => {
  assert.match(await html('/formation/'), /href=["']\/doorway\/["']/);
});


test('public discovery pages send visitors through the Formation introduction', async () => {
  const publicRoutes = ['/', '/conversations/', '/books/', '/music/'];
  const journeyBypasses = /href=["']\/(?:doorway|awaken|see-clearly|become|join)(?:\/|["'])/g;

  for (const route of publicRoutes) {
    const page = await html(route);
    assert.deepEqual(
      [...page.matchAll(journeyBypasses)].map(match => match[0]),
      [],
      `${route} must not bypass the Formation introduction`,
    );
    assert.match(page, /href=["']\/formation\/["']/);
  }
});

test('Books and Music use the primary navigation without a duplicate Formation button', async () => {
  for (const route of ['/books/', '/music/']) {
    assert.doesNotMatch(await html(route), /class=["']rts-36-40__start["']/);
  }
});

test('Music quote and library have explicit readable spacing', async () => {
  const css = await readFile(new URL('public/assets/styles.css', root), 'utf8');
  assert.match(css, /\.rts-36-40__music-hero blockquote\{[^}]*line-height:1\.65[^}]*padding:30px 34px[^}]*\}/);
  assert.match(css, /\.rts-36-40__song-library\{[^}]*padding:22px 4% 28px[^}]*\}/);
  assert.match(css, /\.rts-36-40__song-columns\{[^}]*row-gap:14px[^}]*\}/);
});

test('Doorway contains all four approved movements', async () => {
  const page = await html('/doorway/');
  for (const movement of ['Awaken', 'See Clearly', 'Become', 'Join']) {
    assert.match(page, new RegExp(movement));
  }
  assert.match(page, /href=["']\/awaken\/lesson-1\/["']/);
  assert.match(page, /href=["']\/join\/useful\/["']/);
});

test('review page exposes every public page and the formation journey', async () => {
  const page = await html('/review/');
  for (const route of ['/', '/formation/', '/doorway/', '/conversations/', '/books/', '/music/', '/join/useful/']) {
    assert.match(page, new RegExp(`data-url=["']${route.replaceAll('/', '\\/')}["']`));
  }
});

test('all local href and asset targets resolve', async () => {
  const { default: path } = await import('node:path');
  const { readdir } = await import('node:fs/promises');
  const publicRoot = new URL('public/', root);

  async function files(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map(entry => {
      const target = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
      return entry.isDirectory() ? files(target) : [target];
    }));
    return nested.flat();
  }

  const pages = (await files(publicRoot)).filter(file => file.pathname.endsWith('.html'));
  const missing = [];
  for (const file of pages) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/(?:href|src)=["'](\/[^"'?#]*)/g)) {
      const target = match[1];
      if (target === '/') continue;
      const relative = target.endsWith('/') ? `${target.slice(1)}index.html` : target.slice(1);
      try {
        await access(new URL(relative, publicRoot));
      } catch {
        missing.push(`${path.relative(publicRoot.pathname, file.pathname)} -> ${target}`);
      }
    }
  }
  assert.deepEqual(missing, []);
});
