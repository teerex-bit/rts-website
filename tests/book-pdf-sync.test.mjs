import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(readFileSync(new URL('public/books/catalog.json', root), 'utf8'));

test('all active book popups map to one hosted PDF named for that book', () => {
  assert.equal(catalog.length, 26);

  const urls = catalog.map(book => book.pdfUrl);
  assert.equal(new Set(urls).size, 26, 'every book has its own PDF URL');

  for (const book of catalog) {
    assert.equal(book.pdfAvailable, true, `${book.title} has a hosted PDF`);
    assert.equal(book.pdfUrl, `/books/files/${book.id}.pdf`, `${book.title} maps to its own normalized PDF`);
    assert.ok(existsSync(new URL(`public${book.pdfUrl}`, root)), `${book.title} PDF exists`);
  }

  for (const id of ['the-scandal-of-choice', 'the-scandal-of-dominion']) {
    const book = catalog.find(item => item.id === id);
    assert.ok(book, `${id} remains in the active catalog`);
    assert.equal(book.pdfUrl, `/books/files/${id}.pdf`);
    assert.equal(book.pdfAvailable, true);
  }
});
