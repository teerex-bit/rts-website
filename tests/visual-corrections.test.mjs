import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const css = (path) => read(path).replace(/\/\*[\s\S]*?\*\//g, '');
function rules(source, range = [0, Infinity]) {
  const found = [];
  for (let start = 0; start < source.length;) {
    const open = source.indexOf('{', start);
    if (open < 0) break;
    let end = open + 1, depth = 1;
    while (depth && end < source.length) {
      if (source[end] === '{') depth++;
      if (source[end] === '}') depth--;
      end++;
    }
    assert.equal(depth, 0, 'CSS braces are balanced');
    const selector = source.slice(start, open).trim();
    const body = source.slice(open + 1, end - 1);
    if (selector.startsWith('@media')) {
      const min = Number(selector.match(/min-width\s*:\s*(\d+)px/)?.[1] ?? 0);
      const max = Number(selector.match(/max-width\s*:\s*(\d+)px/)?.[1] ?? Infinity);
      found.push(...rules(body, [Math.max(min, range[0]), Math.min(max, range[1])]));
    } else {
      const declarations = Object.fromEntries(body.split(';').filter(value => value.trim()).map(value => {
        const colon = value.indexOf(':');
        return [value.slice(0, colon).trim(), value.slice(colon + 1).trim()];
      }));
      for (const item of selector.split(',')) found.push({ selector: item.trim(), declarations, range });
    }
    start = end;
  }
  return found;
}
const styleAt = (sheet, selector, width) => Object.assign({}, ...sheet
  .filter(rule => rule.selector === selector && width >= rule.range[0] && width <= rule.range[1])
  .map(rule => rule.declarations));

test('Formation journey arrows occupy dedicated, evenly centered tracks', () => {
  const html = read('public/formation/index.html');
  const styles = css('public/assets/css/pages/formation-introduction.css');
  assert.equal((html.match(/class="journey-stage\b/g) || []).length, 4);
  assert.equal((html.match(/class="journey-arrow\b/g) || []).length, 3);
  assert.match(styles, /\.journey-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,1fr\) 40px minmax\(0,1fr\) 40px minmax\(0,1fr\) 40px minmax\(0,1fr\)/);
  assert.match(styles, /\.journey-arrow\s*\{[^}]*align-self:\s*center/);
  assert.match(styles, /@media\s*\(max-width:\s*900px\)[\s\S]*?\.journey-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
});

test('Awaken practice and next sections stay centered at mobile width', () => {
  const styles = css('public/assets/css/pages/awaken-lesson-1.css');
  assert.match(styles, /\.practice-centered\s*\{[^}]*text-align:\s*center/);
  assert.match(styles, /\.next-centered\s*\{[^}]*text-align:\s*center/);
  assert.doesNotMatch(styles, /@media\s*\(max-width:\s*700px\)[\s\S]*?\.next-centered\s*\{[^}]*text-align:\s*left/);
});

test('Become introduction keeps its approved photo and a smooth, balanced composition', () => {
  const html = read('public/become/index.html');
  const styles = css('public/become/become.css');
  assert.match(html, /become-ordinary-life-hero-v2\.jpg/);
  assert.match(styles, /\.hero--become-intro__image\s*\{\s*object-position:\s*68% center\s*\}/);
  assert.match(styles, /\.hero--become-intro__veil\s*\{[^}]*linear-gradient\(90deg/);
  assert.match(styles, /@media\s*\(min-width:\s*681px\) and \(max-width:\s*900px\)[\s\S]*?\.hero--become-intro__image\s*\{[^}]*object-position:\s*78% center/);
  assert.match(styles, /@media\s*\(max-width:\s*680px\)[\s\S]*?\.hero--become-intro__image\s*\{[^}]*object-position:\s*66% center/);
});

test('About page uses the supplied TandM photo asset', () => {
  const html = read('public/about/index.html');
  assert.match(html, /src="\/assets\/tandm-photo\.jpg(?:\?v=\d+)?"/);
  assert.ok(existsSync(new URL('public/assets/tandm-photo.jpg', root)));
});

test('About portrait keeps faces in the tablet crop and natural proportions on phones', () => {
  const html = read('public/about/index.html');
  const styles = css('public/assets/css/about-photo.css');
  assert.match(html, /about-photo\.css/);
  assert.match(styles, /@media\s*\(max-width:\s*850px\)[\s\S]*?\.portrait img\s*\{[^}]*object-position:\s*center top/);
  assert.match(styles, /@media\s*\(max-width:\s*500px\)[\s\S]*?\.portrait img\s*\{[^}]*height:\s*auto/);
});

test('Music keeps the approved AIluminate hero and uses Spotify as its only music listing', () => {
  const html = read('public/music/index.html');
  const styles = css('public/assets/css/music-branding.css');
  const hero = html.match(/<section class="rts-36-40__music-hero"[\s\S]*?<\/section>/)?.[0] ?? '';
  const playlist = html.indexOf('open.spotify.com/embed/playlist/6yFOgURdofxKjPEB3ev6az');
  const closing = html.indexOf('class="rts-36-40__music-closing"');
  const footer = html.indexOf('class="public-footer"');

  assert.match(hero, /src="\/assets\/page-ranges\/range-36-40\/alluminate-hero\.jpg"/);
  assert.match(hero, /href="https:\/\/open\.spotify\.com\/playlist\/6yFOgURdofxKjPEB3ev6az"/);
  assert.match(hero, /Listen on Spotify/);
  assert.doesNotMatch(hero, /<blockquote|He is better than we imagined/);
  assert.ok(playlist > html.indexOf('Listen to AIluminate'));
  assert.ok(closing > playlist && footer > closing, 'playlist precedes the approved closing and public footer');
  assert.doesNotMatch(html, /Select a song to listen|song-columns|Play All In|Fear in My Rearview/);
  assert.doesNotMatch(html, /Music for every moment|Lyrics for every season|EXPLORE OUR MUSIC ON SPOTIFY/i);
  assert.match(styles, /\.music-spotify\{/);
  assert.match(styles, /\.music-spotify \.rts-spotify-embed\{[^}]*width:min\(88vw,1280px\)/);
  const musicRules = rules(styles);
  for (const [width, heroHeight, focal] of [[1536, '529px', 'center'], [768, '600px', '52% center'], [375, '620px', '20% center']]) {
    assert.equal(styleAt(musicRules, '.rts-36-40--p39 .rts-36-40__music-hero', width).height, heroHeight);
    assert.equal(styleAt(musicRules, '.rts-36-40--p39 .rts-36-40__music-hero>img', width)['object-position'], focal);
  }
  for (const [width, expectedHeight] of [[1536, '680px'], [768, '600px'], [375, '560px']]) {
    assert.equal(styleAt(musicRules, '.music-spotify iframe', width).height, expectedHeight);
    assert.equal(styleAt(musicRules, '.music-spotify .rts-spotify-embed', width).width, 'min(88vw,1280px)');
  }
});

test('site-controlled Music content spells the name exactly AIluminate', () => {
  const html = read('public/music/index.html');
  const visibleText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
  const playerTitle = html.match(/<iframe[^>]*title="([^"]+)"/)?.[1] ?? '';
  const siteCopy = `${visibleText} ${title} ${description} ${playerTitle}`;
  assert.match(siteCopy, /AIluminate/);
  assert.doesNotMatch(siteCopy, /\b(?:Alluminated|Alluminate|Illuminate|AIuminate)\b/);
  assert.match(html, /<h1>AIluminate<\/h1>/);
  assert.match(html, /<h2 id="music-spotify-title">Listen to AIluminate<\/h2>/);
  assert.match(html, /<title>AIluminate Music \| Reforming the Soul<\/title>/);
  assert.match(description, /AIluminate/);
});

test('shared public header groups the circle-flame logo and navigation responsively', () => {
  const styles = rules(css('public/assets/css/public-header-navigation.css'));
  const headerSelector = '.public-primary-header';
  const innerSelector = '.public-primary-header__inner';
  const brandSelector = '.public-primary-header__inner > a.public-primary-header__brand';
  const logoSelector = '.public-primary-header .public-primary-header__inner .public-primary-header__brand img';
  const navSelector = '.public-primary-header .public-primary-nav';
  const linkSelector = '.public-primary-header .public-primary-nav a';
  const menuSelector = '.public-primary-header .menu';

  for (const [width, logoWidth, navFontSize, navDisplay, menuDisplay, innerHeight] of [
    [1536, '200px', '14px', 'flex', 'none', '80px'],
    [1363, '200px', '14px', 'flex', 'none', '80px'],
    [768, 'min(200px, 56vw)', '1rem', 'none', 'inline-flex', '76px'],
    [375, 'min(200px, 56vw)', '1rem', 'none', 'inline-flex', '76px']
  ]) {
    const header = styleAt(styles, headerSelector, width);
    const inner = styleAt(styles, innerSelector, width);
    const brand = styleAt(styles, brandSelector, width);
    const logo = styleAt(styles, logoSelector, width);
    const nav = styleAt(styles, navSelector, width);
    const link = styleAt(styles, linkSelector, width);
    const menu = styleAt(styles, menuSelector, width);

    assert.equal(header.display, 'block');
    assert.equal(inner['align-items'], 'center');
    assert.equal(inner.width, width > 840 ? 'min(calc(100% - 48px), 1200px)' : 'calc(100% - 32px)');
    assert.equal(inner['min-height'], innerHeight);
    assert.equal(brand.width, 'auto');
    assert.equal(brand.height, 'auto');
    assert.equal(logo.width, logoWidth);
    assert.equal(logo.height, 'auto');
    assert.equal(nav.display, navDisplay);
    assert.equal(link['font-size'], navFontSize);
    assert.equal(link['text-transform'], 'uppercase');
    assert.equal(link['white-space'], 'nowrap');
    assert.equal(menu.display, menuDisplay);
    assert.equal(styleAt(styles, `${linkSelector}.is-active`, width)['border-bottom-color'], 'currentColor');
  }
  assert.equal(styleAt(styles, innerSelector, 1363).gap, 'clamp(28px, 5vw, 72px)');
  assert.equal(styleAt(styles, navSelector, 1536).gap, 'clamp(18px, 2vw, 26px)');
});

test('AIluminate hero uses Impact with natural word spacing', () => {
  const styles = css('public/assets/css/music-branding.css');
  const title = rules(styles).find(rule => rule.selector === '.rts-36-40--p39 .rts-36-40__music-copy h1');
  assert.equal(title.declarations['font-family'], 'Impact,Haettenschweiler,"Arial Narrow Bold",sans-serif');
  assert.ok(!title.declarations['letter-spacing'] || title.declarations['letter-spacing'] === 'normal' || title.declarations['letter-spacing'] === '0');
  assert.equal(read('public/music/index.html').match(/<h1>([^<]+)<[/]h1>/)?.[1], 'AIluminate');
});

test('public header uses the approved H2 core and utility groups', async () => {
  const coreRoutes = ['/formation/', '/conversations/', '/music/'];
  const utilityRoutes = ['/about/', '/contact/'];
  for (const route of ['/', '/conversations/', '/music/', '/about/', '/contact/']) {
    const html = read(`public${route}index.html`);
    const nav = html.match(/<nav id="main-nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? '';
    const core = nav.match(/class="public-primary-nav__core"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
    const utility = nav.match(/class="public-primary-nav__utility"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
    assert.deepEqual([...core.matchAll(/href="([^"]+)"/g)].map(m => m[1]), coreRoutes, `${route} core links`);
    assert.deepEqual([...utility.matchAll(/href="([^"]+)"/g)].map(m => m[1]), utilityRoutes, `${route} utility links`);
  }
  const cssText = css('public/assets/css/public-header-navigation.css');
  assert.match(cssText, /public-primary-nav__utility[^}]*border-left/s);
  assert.match(cssText, /@media \(max-width: 840px\)[\s\S]*?public-primary-nav__utility[^}]*border-top/s);
});

test('Live With God Part 1 has deliberate responsive eyebrow, title, and intro spacing', () => {
  const html = read('public/become/live-with-god/index.html');
  const styles = css('public/become/become.css');
  assert.match(html, /class="hero hero--growth hero--live"/);
  assert.match(styles, /\.hero--live\s+\.eyebrow\s*\{[^}]*margin-bottom:\s*24px/);
  assert.match(styles, /\.hero--live\s*\{[^}]*grid-template-columns:\s*minmax\(0,1\.3fr\) minmax\(320px,\.7fr\)/);
  assert.match(styles, /\.hero--live\s+\.headline--living\s*\{[^}]*font-size:\s*clamp\(3\.2rem,4\.8vw,5\.2rem\)!important[^}]*line-height:\s*1\.1\s*!important/);
  assert.match(styles, /@media\s*\(max-width:\s*680px\)[\s\S]*?\.hero--live\s+\.headline--living\s*\{[^}]*line-height:\s*1\.06\s*!important/);
});

test('supplied About photo is referenced and repository Whole Person history is preserved', () => {
  assert.ok(existsSync(new URL('public/assets/tandm-photo.jpg', root)));
  const whole = read('public/become/whole-person/index.html');
  assert.match(whole, /class="whole-hero__mark"/);
  assert.match(whole, /aria-label="Dimensions of the whole person"/);
  assert.equal((whole.match(/<li>(?:Will|Body|Relationships|Soul)<\/li>/g) || []).length, 4);
});

test('responsive correction rules are deliberate at 1536, 768, and 375 pixels', () => {
  const formation = rules(css('public/assets/css/pages/formation-introduction.css'));
  const awaken = rules(css('public/assets/css/pages/awaken-lesson-1.css'));
  const become = rules(css('public/become/become.css'));
  for (const width of [1536, 768, 375]) {
    assert.equal(styleAt(awaken, '.practice-centered', width)['text-align'], 'center');
    assert.equal(styleAt(awaken, '.next-centered', width)['text-align'], 'center');
    assert.equal(styleAt(formation, '.journey-grid', width)['grid-template-columns'], width > 900
      ? 'minmax(0,1fr) 40px minmax(0,1fr) 40px minmax(0,1fr) 40px minmax(0,1fr)'
      : 'minmax(0,1fr)');
    assert.equal(styleAt(formation, '.journey-stage--active', width).transform, 'none');
    assert.equal(styleAt(become, '.hero--become-intro__image', width)['object-position'], width > 900
      ? '68% center'
      : width > 680 ? '78% center' : '66% center');
  }
  assert.equal(styleAt(formation, '.journey-arrow', 768).transform, 'rotate(90deg)');
  assert.equal(styleAt(formation, '.journey-arrow', 375).transform, 'rotate(90deg)');
  assert.equal(styleAt(become, '.hero--live .headline--living', 1536)['line-height'], '1.1!important');
  assert.equal(styleAt(become, '.hero--live .headline--living', 1536)['font-size'], 'clamp(3.2rem,4.8vw,5.2rem)!important');
  assert.equal(styleAt(become, '.hero--live', 1536)['grid-template-columns'], 'minmax(0,1.3fr) minmax(320px,.7fr)');
  assert.equal(styleAt(become, '.hero--live .headline--living', 768)['line-height'], '1.1!important');
  assert.equal(styleAt(become, '.hero--live .headline--living', 768)['font-size'], 'clamp(3rem,5vw,4rem)!important');
  assert.equal(styleAt(become, '.hero--live .headline--living', 375)['line-height'], '1.06!important');
});
