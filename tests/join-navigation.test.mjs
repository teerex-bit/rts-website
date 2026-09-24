import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const fruit = read('public/become/fruit/index.html');
const doorway = read('public/doorway/index.html');

assert.match(fruit, /href="\/join\/"/, 'Become Fruit advances to Join');
assert.match(fruit, />Continue to Join[\s\S]*?→<\/span><\/a>/, 'Fruit uses an explicit Join action');

assert.match(doorway, /Movement 04 · Join/, 'doorway labels movement four');
assert.match(doorway, /href="\/join\/"/, 'doorway lists Join introduction');
assert.match(doorway, /href="\/join\/useful\/"/, 'doorway lists Join conclusion');
assert.ok(doorway.indexOf('href="/join/"') < doorway.indexOf('href="/join/useful/"'), 'doorway preserves Join order');

const join = read('public/join/index.html');
assert.match(join, /href="\/join\/useful\/"/, 'Join introduction advances to the useful conclusion');
