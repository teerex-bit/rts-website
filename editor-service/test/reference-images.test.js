const test = require('node:test');
const assert = require('node:assert/strict');
const {referenceForPage} = require('../../src/editor/reference-images');

test('every page has one approved PNG reference image', () => {
  for (let pageNumber = 1; pageNumber <= 40; pageNumber++) {
    const reference = referenceForPage(pageNumber);
    assert.match(reference.path, /^done\/.*\.png$/);
  }
});

test('page 22 uses its non-duplicate approved reference', () => {
  assert.equal(referenceForPage(22).path, 'done/22 Becoming  1 - 2B .png');
});
