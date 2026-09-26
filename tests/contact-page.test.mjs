import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('Contact offers two clear paths and preserves the established destinations', () => {
  const html = readFileSync(new URL('../public/contact/index.html', import.meta.url), 'utf8');
  const main = html.match(/<main[\s\S]*?<\/main>/)[0];
  assert.equal((main.match(/<article\b/g) || []).length, 2);
  assert.match(main, /Questions, conversations, or something we can help with\?/);
  assert.match(main, /General Contact/);
  assert.match(main, /Spiritual Conversation/);
  assert.match(main, /href="mailto:info@reformingthesoul.com"/);
  assert.match(main, /href="mailto:info@reformingthesoul.com\?subject=Reforming%20the%20Soul%20Inquiry"/);
  assert.match(main, /href="https:\/\/calendly.com\/reformingthesoul-info\/30min"/);
  assert.doesNotMatch(main, /contact-art|You are.*welcome here|<img\b/);
  assert.match(html, /href="\/assets\/css\/contact-page.css"/);
});
