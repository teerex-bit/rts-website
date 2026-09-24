import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
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

test('About and Contact are secondary links in the public footer', async () => {
  for (const route of ['/', '/conversations/', '/music/', '/about/', '/contact/']) {
    const source = await page(route);
    assert.match(source, /href=["']\/about\//);
    assert.match(source, /href=["']\/contact\//);
  }
});
