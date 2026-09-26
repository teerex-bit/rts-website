import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('V2 colorways share exact geometry with only approved flat fills', () => {
  const variants = {'dark-bg':['#b87525','#ffffff'], 'light-bg':['#b87525','#09263d'],
    white:['#ffffff','#ffffff'], 'mono-dark':['#09263d','#09263d']};
  let geometry;
  for (const [variant, fills] of Object.entries(variants)) {
    const svg = read(`public/assets/rts-v2-logo-${variant}.svg`);
    const paths = [...svg.matchAll(/ d="([^"]+)"/g)].map(m => m[1]);
    assert.equal(paths.length, 2);
    const stacked = read(`public/assets/rts-v1-logo-${variant}.svg`);
    assert.deepEqual(paths, [...stacked.matchAll(/ d="([^"]+)"/g)].map(m => m[1]),
      'V2 repositions the exact V1 symbol and wordmark without redrawing either');
    assert.match(svg, /transform="translate\(270 -174\)"/);
    if (geometry) assert.deepEqual(paths, geometry, `${variant} must preserve the approved contours`);
    geometry = paths;
    assert.deepEqual([...svg.matchAll(/ fill="([^"]+)"/g)].map(m => m[1]), fills);
    assert.doesNotMatch(svg, /<(rect|image|text|filter|linearGradient|radialGradient)\b/);
  }
});

test('all ten public placements use the contextual central V1/V2 family', () => {
  for (const page of ['index.html','conversations/index.html','music/index.html','about/index.html','contact/index.html']) {
    const html = read(`public/${page}`);
    const logos = [...html.matchAll(/<img src="(\/assets\/rts-v[12]-logo-[^"]+)"[^>]+>/g)];
    assert.equal(logos.length, 2, page);
    assert.equal(logos[0][1], `/assets/rts-v2-logo-${page.startsWith('music/') ? 'dark' : 'light'}-bg.svg`);
    assert.equal(logos[1][1], '/assets/rts-v1-logo-dark-bg.svg');
    assert.doesNotMatch(html, /brand-main-(transparent|footer)\.png/);
    assert.match(html, /public-brand-lockups\.css/);
  }
});
