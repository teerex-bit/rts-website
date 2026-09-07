const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pages = require('../../src/pages');

test('website baseline contains 40 pages and protected routes', () => {
  assert.equal(pages.length, 40);
  assert.equal(pages.find(page => page.number === 1).route, '/');
  assert.equal(pages.find(page => page.number === 38).route, '/conversations/');
});

test('locked output hash manifest exists for both approved pages', () => {
  const file = path.join(__dirname, '../../src/editor/locked-output.json');
  const hashes = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.match(hashes['01'], /^[a-f0-9]{64}$/);
  assert.match(hashes['38'], /^[a-f0-9]{64}$/);
});
