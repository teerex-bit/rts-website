const styleTokens = require('./style-tokens');
const { getField } = require('./field-registry');

const allowedKeys = new Set([
  'id', 'pageNumber', 'route', 'sectionId', 'fieldId', 'kind', 'value',
  'sourceCommit', 'requestedBy', 'createdAt'
]);
const supportedKinds = new Set([
  'text', 'link', 'image', 'alt', 'spacing', 'align', 'color', 'visibility', 'order'
]);
const lockedPages = new Set([1, 38]);

function fail(message) {
  throw new TypeError(message);
}

function requiredString(value, name) {
  if (typeof value !== 'string' || value.trim() === '') fail(`${name} must be a non-empty string`);
}

function includesForbiddenWalkRoute(value) {
  if (typeof value !== 'string') return false;
  let url;
  try {
    url = new URL(value, 'https://rts.invalid');
  } catch {
    return /(^|\/)walk(?:[-._;:?/#]|$)/i.test(value);
  }
  const decode = part => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  };
  const hasWalkSegment = url.pathname
    .split('/')
    .map(decode)
    .some(segment => /^walk(?:[^a-z0-9]|$)/i.test(segment));
  const hasWalkStage = [...url.searchParams]
    .some(([key, entry]) => key.toLowerCase() === 'stage' && /^walk(?:[^a-z0-9]|$)/i.test(decode(entry).trim()));
  return hasWalkSegment || hasWalkStage;
}

function validateUrl(value) {
  requiredString(value, 'value');
  const trimmed = value.trim();
  if (includesForbiddenWalkRoute(trimmed)) fail('forbidden stage or route: Walk');
  if (trimmed.startsWith('//')) fail('unsafe URL');
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return;
  let url;
  try {
    url = new URL(trimmed);
  } catch {
    fail('unsafe URL');
  }
  if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) fail('unsafe URL');
}

function validateValue(kind, value) {
  if (kind === 'link') return validateUrl(value);
  if (kind === 'image') {
    requiredString(value, 'value');
    if (/(^|\/)done\//i.test(value)) fail('reference image under done/ is not allowed');
    if (!value.startsWith('/assets/') || value.includes('\\') || /(?:^|\/)\.\.?(?:\/|$)/.test(value) || /%2e/i.test(value)) {
      fail('unsafe image path');
    }
    return;
  }
  if (kind === 'text' || kind === 'alt') {
    requiredString(value, 'value');
    return;
  }
  if (kind === 'spacing' && !styleTokens.spacing.includes(value)) fail('invalid spacing token');
  if (kind === 'align' && !styleTokens.align.includes(value)) fail('invalid align token');
  if (kind === 'color' && !styleTokens.color.includes(value)) fail('invalid color token');
  if (kind === 'visibility' && typeof value !== 'boolean') fail('visibility value must be boolean');
  if (kind === 'order' && (!Number.isInteger(value) || value < 0)) fail('order value must be a non-negative integer');
}

function validateOverride(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('override must be an object');
  for (const key of Object.keys(value)) if (!allowedKeys.has(key)) fail(`unknown key: ${key}`);
  for (const key of allowedKeys) if (!(key in value)) fail(`missing key: ${key}`);
  if (!Number.isInteger(value.pageNumber)) fail('pageNumber must be an integer');
  if (lockedPages.has(value.pageNumber)) fail(`page ${value.pageNumber} is locked`);
  if (!supportedKinds.has(value.kind)) fail(`unsupported kind: ${value.kind}`);
  requiredString(value.id, 'id');
  requiredString(value.route, 'route');
  requiredString(value.sectionId, 'sectionId');
  requiredString(value.fieldId, 'fieldId');
  requiredString(value.sourceCommit, 'sourceCommit');
  requiredString(value.requestedBy, 'requestedBy');
  requiredString(value.createdAt, 'createdAt');
  if (Number.isNaN(Date.parse(value.createdAt))) fail('createdAt must be a valid date');
  if (includesForbiddenWalkRoute(value.route)) fail('forbidden stage or route: Walk');
  validateValue(value.kind, value.value);

  const field = getField(value.pageNumber, value.sectionId, value.fieldId);
  if (!field) fail('undeclared field');
  if (field.route !== value.route) fail('route does not match declared field');
  if (!field.kinds.includes(value.kind)) fail(`unsupported kind for declared field: ${value.kind}`);
  if (value.kind === 'order' && !field.orderValues?.includes(value.value)) fail('invalid order value for declared group');

  return Object.freeze({...value});
}

function validateOverrideDocument(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail('override document must be an object');
  const keys = Object.keys(value);
  if (keys.length !== 2 || !keys.includes('version') || !keys.includes('overrides')) fail('override document has unknown key');
  if (value.version !== 1) fail('unsupported override document version');
  if (!Array.isArray(value.overrides)) fail('overrides must be an array');
  const overrides = value.overrides.map(validateOverride);
  const ids = new Set(overrides.map(override => override.id));
  if (ids.size !== overrides.length) fail('duplicate override id');
  return Object.freeze(overrides);
}

module.exports = Object.freeze({ validateOverride, validateOverrideDocument });
