const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  validateOverride,
  validateOverrideDocument
} = require('../../src/editor/override-schema');
const { getField } = require('../../src/editor/field-registry');

const validText = {
  id: 'change-20260907-001',
  pageNumber: 3,
  route: '/awaken/pay-attention/',
  sectionId: 'hero',
  fieldId: 'heading',
  kind: 'text',
  value: 'Where Did That Come From?',
  sourceCommit: '6433e72',
  requestedBy: 'Malea',
  createdAt: '2026-09-07T12:00:00.000Z'
};
const validLink = {
  ...validText,
  sectionId: 'navigation',
  fieldId: 'continue',
  kind: 'link',
  value: '/awaken/name-your-desire/'
};
const validImage = {
  ...validText,
  sectionId: 'sidebar',
  fieldId: 'image',
  kind: 'image',
  value: '/assets/editor/page-03-sidebar.jpg'
};
const validColor = {
  ...validText,
  fieldId: 'layout',
  kind: 'color',
  value: 'navy'
};

test('accepts a declared text operation as an immutable override', () => {
  const override = validateOverride(validText);

  assert.equal(override.kind, 'text');
  assert.equal(Object.isFrozen(override), true);
});

test('accepts declared links, images, and bounded layout tokens', () => {
  assert.equal(validateOverride(validLink).value, '/awaken/name-your-desire/');
  assert.equal(validateOverride(validImage).value, '/assets/editor/page-03-sidebar.jpg');
  assert.equal(validateOverride(validColor).value, 'navy');
  assert.equal(validateOverride({...validColor, kind: 'spacing', value: 'spacious'}).value, 'spacious');
  assert.equal(validateOverride({...validColor, kind: 'align', value: 'center'}).value, 'center');
  assert.equal(validateOverride({...validText, pageNumber: 39, route: '/music/', kind: 'color', value: 'gold'}).value, 'gold');
  assert.equal(validateOverride({...validText, sectionId: 'sidebar', fieldId: 'visibility', kind: 'visibility', value: false}).value, false);
  assert.throws(() => validateOverride({...validText, sectionId: 'sidebar', fieldId: 'order', kind: 'order', value: 1}), /undeclared field/i);
});

test('rejects locked, unsupported, and forbidden stage routes', () => {
  assert.throws(() => validateOverride({...validText, pageNumber: 1}), /locked/i);
  assert.throws(() => validateOverride({...validText, pageNumber: 38}), /locked/i);
  assert.equal(validateOverride({...validText, value: 'Walk.'}).value, 'Walk.');
  assert.throws(() => validateOverride({...validText, route: '/walk?x=1'}), /forbidden stage/i);
  assert.throws(() => validateOverride({...validText, route: '/Walk./'}), /forbidden stage/i);
  assert.throws(() => validateOverride({...validText, route: '/awaken/?stage=Walk'}), /forbidden stage/i);
  assert.throws(() => validateOverride({...validText, route: '/walk;next'}), /forbidden stage/i);
  assert.throws(() => validateOverride({...validText, route: '/%77alk/'}), /forbidden stage/i);
  for (const value of ['/walk%2Fnext', '/walk%3Fnext', '/awaken/?stage=Walk%3F']) {
    assert.throws(() => validateOverride({...validText, route: value}), /forbidden stage/i);
  }
  assert.throws(() => validateOverride({...validText, kind: 'javascript'}), /unsupported kind/i);
});

test('rejects undeclared fields, unsafe links, reference images, and unknown keys', () => {
  assert.throws(() => validateOverride({...validText, fieldId: 'made-up'}), /undeclared field/i);
  assert.throws(() => validateOverride({...validText, kind: 'link', fieldId: 'primary-action', value: 'javascript:alert(1)'}), /unsafe url/i);
  assert.throws(() => validateOverride({...validText, kind: 'link', fieldId: 'primary-action', value: '//untrusted.example'}), /unsafe url/i);
  assert.throws(() => validateOverride({...validText, kind: 'image', fieldId: 'image', value: '/done/reference.jpg'}), /reference image/i);
  assert.throws(() => validateOverride({...validImage, value: '/assets/../secrets.jpg'}), /unsafe image/i);
  assert.throws(() => validateOverride({...validImage, value: 'https://example.com/image.jpg'}), /unsafe image/i);
  assert.throws(() => validateOverride({...validText, extra: true}), /unknown key/i);
});

test('validates and freezes an override document', () => {
  const overrides = validateOverrideDocument({version: 1, overrides: [validText]});

  assert.equal(overrides.length, 1);
  assert.equal(Object.isFrozen(overrides), true);
  assert.equal(Object.isFrozen(overrides[0]), true);
});

test('registers editable fields against existing page elements', () => {
  assert.deepEqual(getField(3, 'hero', 'heading'), {
    pageNumber: 3,
    route: '/awaken/pay-attention/',
    sectionId: 'hero',
    fieldId: 'heading',
    selector: 'h1',
    kinds: ['text', 'spacing', 'align', 'color']
  });
  assert.equal(getField(1, 'hero', 'heading'), undefined);
  assert.deepEqual(getField(39, 'hero', 'heading').kinds, ['text', 'spacing', 'align', 'color']);
  assert.deepEqual(getField(3, 'navigation', 'continue').kinds, ['text', 'link']);
  assert.deepEqual(getField(3, 'sidebar', 'image').kinds, ['image', 'alt']);
  assert.deepEqual(getField(3, 'hero', 'layout').kinds, ['spacing', 'align', 'color']);
});

test('uses one existing heading selector for every initially editable route', () => {
  const { fields } = require('../../src/editor/field-registry');

  assert.equal(fields.filter(field => field.fieldId === 'heading').length, 38);
  for (const field of fields.filter(field => field.fieldId === 'heading')) {
    const html = fs.readFileSync(path.join(__dirname, '../../public', field.route, 'index.html'), 'utf8');
    assert.equal(field.selector, 'h1');
    assert.equal((html.match(/<h1(?:\s|>)/gi) || []).length, 1, `page ${field.pageNumber}`);
  }
});

test('uses each additional page 03 selector exactly once', () => {
  const html = fs.readFileSync(path.join(__dirname, '../../public/awaken/pay-attention/index.html'), 'utf8');
  const selectors = ['.course-intro', '.course-hero', '.lesson-navigation__continue', '.course-aside__image', '.course-aside'];

  for (const selector of selectors) {
    const className = selector.slice(1);
    const pattern = new RegExp('class="[^"]*\\b' + className + '\\b[^"]*"', 'gi');
    assert.equal((html.match(pattern) || []).length, 1, selector);
  }
});

test('uses every static inventory selector exactly once', () => {
  const { fields } = require('../../src/editor/field-registry');

  for (const field of fields.filter(field => field.selector !== 'h1')) {
    const html = fs.readFileSync(path.join(__dirname, '../../public', field.route, 'index.html'), 'utf8');
    const $ = require('cheerio').load(html);
    assert.equal($(field.selector).length, 1, field.pageNumber + ' ' + field.selector);
  }
});

test('accepts declared edits across independent page families', () => {
  assert.equal(validateOverride({...validText, pageNumber: 11, route: '/see-clearly/false-self/', sectionId: 'navigation', fieldId: 'continue', kind: 'link', value: '/see-clearly/review-one/'}).kind, 'link');
  assert.equal(validateOverride({...validText, pageNumber: 11, route: '/see-clearly/false-self/', sectionId: 'sidebar', fieldId: 'image', kind: 'image', value: '/assets/editor/page-11-sidebar.jpg'}).kind, 'image');
  assert.equal(validateOverride({...validText, pageNumber: 21, route: '/become/practice-change/', sectionId: 'navigation', fieldId: 'continue', kind: 'link', value: '/become/rule-of-life/'}).kind, 'link');
});

test('accepts only the declared Page 08 course-body order group values', () => {
  const ordered = {...validText, pageNumber: 8, route: '/see-clearly/your-formation/', sectionId: 'course-body', fieldId: 'card-grid', kind: 'order', value: 2};

  assert.equal(validateOverride(ordered).value, 2);
  assert.throws(() => validateOverride({...ordered, value: 6}), /invalid order value/i);
  assert.throws(() => validateOverride({...validText, sectionId: 'sidebar', fieldId: 'order', kind: 'order', value: 1}), /undeclared field/i);
});
