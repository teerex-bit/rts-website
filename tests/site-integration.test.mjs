import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function html(route) {
  return readFile(new URL(`public${route}index.html`, root), 'utf8');
}

test('new RTS public routes are present', async () => {
  const routes = ['/', '/formation/', '/doorway/', '/conversations/', '/music/', '/about/', '/contact/'];
  await Promise.all(routes.map(route => access(new URL(`public${route}index.html`, root))));
});

test('public landing page links the primary navigation', async () => {
  const page = await html('/');
  for (const route of ['/formation/', '/conversations/', '/music/']) {
    assert.match(page, new RegExp(`href=["']${route.replaceAll('/', '\\/')}["']`));
  }
});

test('Formation sends the visitor directly to Pay Attention', async () => {
  assert.match(await html('/formation/'), /href=["']\/awaken\/lesson-1\/["']/);
});


test('public discovery pages send visitors through the Formation introduction', async () => {
  const publicRoutes = ['/', '/conversations/', '/music/', '/about/', '/contact/'];
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

test('Music uses the primary navigation without a duplicate Formation button', async () => {
  assert.doesNotMatch(await html('/music/'), /class=["']rts-36-40__start["']/);
});

test('Music uses one Spotify playlist without the retired quote or manual song catalogue', async () => {
  const page = await html('/music/');
  assert.match(page, /open\.spotify\.com\/embed\/playlist\/6yFOgURdofxKjPEB3ev6az/);
  assert.doesNotMatch(page, /Select a song to listen|song-columns|Play All In/);
  assert.doesNotMatch(page, /He is better than we imagined|Music for every moment/);
});

test('Doorway contains all four approved movements', async () => {
  const page = await html('/doorway/');
  for (const movement of ['Awaken', 'See Clearly', 'Become', 'Join']) {
    assert.match(page, new RegExp(movement));
  }
  assert.match(page, /href=["']\/awaken\/lesson-1\/["']/);
  assert.match(page, /href=["']\/join\/useful\/["']/);
});

test('review hub is excluded and Books is public', async () => {
  await assert.rejects(access(new URL('public/review/index.html', root)));
  await access(new URL('public/books/index.html', root));
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
