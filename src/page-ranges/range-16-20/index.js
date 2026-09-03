const css = require('./styles');

const modules = [
  require('./page-16'),
  require('./page-17'),
  require('./page-18'),
  require('./page-19'),
  require('./page-20')
];

const pages = new Map(modules.map(page => [page.number, page]));
const assetRoot = '/assets/page-ranges/range-16-20';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function icon(name, className = '') {
  return `<svg class="r1620-icon ${className}" aria-hidden="true"><use href="${assetRoot}/journey-icons.svg#${escapeHtml(name)}"></use></svg>`;
}

function logo(light = false) {
  return `<a class="r1620-logo ${light ? 'r1620-logo--light' : ''}" href="/" aria-label="Reforming the Soul home">
    ${icon('tree')}
    <span>REFORMING<em>the</em>SOUL</span>
  </a>`;
}

function topbar(active = '') {
  const nav = [
    ['Awaken', '/awaken/'],
    ['See Clearly', '/see-clearly/'],
    ['Become', '/become/'],
    ['Join', '/join/']
  ];
  return `<header class="r1620-topbar">
    ${logo()}
    <nav class="r1620-topbar__nav" aria-label="Primary">
      ${nav.map(([label, href]) => `<a data-stage="${label}" class="${active === label ? 'is-active' : ''}" href="${href}">${label}</a>`).join('')}
    </nav>
    <a class="r1620-conversation" href="/conversations/">Enter a Conversation</a>
    <span class="r1620-account" aria-label="Account">${icon('person')}</span>
  </header>`;
}

function rail(active, detailed = false) {
  const stages = [
    ['Awaken', 'Notice what has formed you.', 'awaken', '/awaken/'],
    ['See Clearly', 'Learn what is actually true.', 'eye', '/see-clearly/'],
    ['Become', 'Learn to live with God until His life becomes increasingly natural in you.', 'walk', '/become/'],
    ['Join', 'Live from that growing wholeness in participation with God.', 'people', '/join/']
  ];
  const lessonList = detailed ? `<div class="r1620-rail__part"><b>Part One</b><strong>Live With God</strong></div>
    <ol class="r1620-rail__lessons">
      ${['Recognize His Presence','Listen Deeply','Release Control','Receive the Moment','Take the Next Right Step','Repeat Daily'].map((label, index) => `<li class="${index === 0 ? 'is-current' : ''}"><span>${index + 1}</span>${label}${index === 0 ? icon('check') : ''}</li>`).join('')}
    </ol>` : '';
  return `<aside class="r1620-rail">
    ${detailed ? '' : logo(true)}
    <p class="r1620-rail__label">The Formation Journey</p>
    <nav class="r1620-rail__journey" aria-label="Formation journey">
      ${stages.map(([label, description, symbol, href]) => `<a data-stage="${label}" class="${active === label ? 'is-active' : ''}" href="${href}">${icon(symbol)}<span><b>${label}</b><small>${description}</small></span>${active === label ? icon('chevron') : label !== 'Join' ? icon('check') : ''}</a>${active === label && label === 'Become' ? lessonList : ''}`).join('')}
    </nav>
    <div class="r1620-help">${icon('question')}<span><b>Need help?</b><small>We’re here if you have questions along the way.</small><a href="/conversations/">Contact Support →</a></span></div>
  </aside>`;
}

function coursebar(page) {
  return `<header class="r1620-coursebar"><span><b>${escapeHtml(page.course)}</b><small>${escapeHtml(page.lesson)}</small></span><a href="/">← &nbsp; Course Overview</a><span class="r1620-coursebar__tools">${icon('question')}${icon('person')}</span></header>`;
}

function pager(page, labels = ['Back', 'Continue →']) {
  return `<nav class="r1620-pager" aria-label="Lesson navigation"><a href="${page.previous}">← &nbsp; ${labels[0]}</a><span class="r1620-dots" aria-hidden="true"><i></i><i></i><i class="is-active"></i><i></i><i></i></span><a class="r1620-pager__next" href="${page.next}">${labels[1]}</a></nav>`;
}

function renderSeeClearly(page) {
  const body = page.number === 16 ? `<div class="r1620-anger-grid">
    ${page.comparisons.map(column => `<section class="r1620-anger-column"><h2>${escapeHtml(column.heading)}</h2><img src="${assetRoot}/${column.image}" alt="${escapeHtml(column.imageAlt)}"><ul>${column.items.map(([symbol, text, citation]) => `<li>${icon(symbol)}<span>${escapeHtml(text)} <small>${escapeHtml(citation)}</small></span></li>`).join('')}</ul></section>`).join('')}
  </div>
  <aside class="r1620-wide-note">${icon('heart')}<p><b>${escapeHtml(page.note[0])}</b><br>${escapeHtml(page.note[1])}</p></aside>` : `<p class="r1620-look-subtitle">${page.subtitle.map(escapeHtml).join('<br>')}</p>
  <div class="r1620-look-rows">
    ${page.rows.map(row => `<article><div><b>You’ve heard it said:</b><p>${escapeHtml(row.heard)}</p></div><span class="r1620-row-arrow">→</span><div><b>But Scripture shows:</b><p>${escapeHtml(row.scripture)}</p><small>${escapeHtml(row.citations)}</small></div><span class="r1620-book">${icon('book')}</span></article>`).join('')}
  </div>
  <aside class="r1620-wide-note">${icon('branch')}<p><b>${escapeHtml(page.note[0])}</b><br>${escapeHtml(page.note[1])}</p></aside>`;

  return `<main class="r1620 r1620--reflection" data-page-number="${page.number}" data-editable-source="range-16-20">
    ${rail(page.stage)}
    <div class="r1620-reflection__main">
      ${coursebar(page)}
      <div class="r1620-reflection__content">
        <p class="r1620-eyebrow">${escapeHtml(page.progress)}</p>
        <h1>${escapeHtml(page.title)}</h1>
        ${page.intro ? `<p class="r1620-intro">${page.intro.map(escapeHtml).join('<br>')}</p>` : ''}
        ${body}
        ${pager(page)}
      </div>
    </div>
  </main>`;
}

function movementCard(movement, index) {
  const icons = index === 0 ? ['awaken','ear','hand','drop','walk','repeat'] : ['mind','heart','leaf','cross','walk','people','target','branch'];
  return `<article class="r1620-movement r1620-movement--${index + 1}">
    <div class="r1620-movement__heading">${icon(index === 0 ? 'walk' : 'tree')}<span><small>${movement.part}</small><h2>${movement.title}</h2><p>${movement.description}</p></span></div>
    <div class="r1620-movement__steps">${movement.labels.map((label, i) => `<span>${icon(icons[i])}<small>${label}</small></span>`).join('')}</div>
    <a href="${movement.link}">Explore ${movement.part} &nbsp; →</a>
  </article>`;
}

function renderLanding(page) {
  return `<main class="r1620 r1620--landing" data-page-number="${page.number}" data-editable-source="range-16-20">
    ${topbar(page.stage)}
    <section class="r1620-landing-hero">
      <img src="${assetRoot}/becoming-overlook.jpg" alt="A woman overlooking a mountain valley at sunrise">
      <div class="r1620-landing-copy"><p class="r1620-eyebrow">${icon('leaf')} ${page.kicker}</p><h1>${page.title}</h1><div class="r1620-gold-rule"></div><h2>${page.headline.join('<br>')}</h2><p>${page.intro.join('<br>')}</p><strong>${page.emphasis}</strong><div class="r1620-actions"><a href="/become/true-self/">Begin This Journey →</a><a href="/become/">▷ &nbsp; Watch the Overview</a></div></div>
      <aside class="r1620-landing-steps">${[['awaken','Live with God in every moment.'],['heart','Let His life change you.'],['leaf','Become more like Him.'],['people','Then join Him in what He is doing in the world.']].map(([symbol, text]) => `<span>${icon(symbol)}<b>${text}</b></span>`).join('')}</aside>
    </section>
    <section class="r1620-way"><span class="r1620-way__art">${icon('leaf')}</span><h2>This is not a checklist.<br>It is a <em>way of life.</em></h2><p>As your relationship with God grows,<br>His Spirit brings healing, alignment,<br>and wholeness to every part of you.</p></section>
    <section class="r1620-movements"><h2><span></span>Two Movements. One Journey.<span></span></h2><div class="r1620-movements__grid">${page.movements.map(movementCard).join('<span class="r1620-between">→</span>')}</div></section>
    <section class="r1620-landing-quote"><div>${icon('target')}<p>As you learn to live with God,<br>His life becomes increasingly<br><em>natural</em> in you.</p></div><blockquote><b>“</b><p>The goal of spiritual formation<br>is not to become something we are not,<br>but to become more fully who we already are in Christ.<cite>— Dallas Willard</cite></p></blockquote></section>
    <section class="r1620-principles">${page.principles.map(([symbol, first, second]) => `<span>${icon(symbol)}<p>${first}<br>${second}</p></span>`).join('')}</section>
  </main>`;
}

function lessonFrame(page, content) {
  return `<main class="r1620 r1620--lesson" data-page-number="${page.number}" data-editable-source="range-16-20">
    ${topbar(page.stage)}
    <div class="r1620-lesson-shell">${rail(page.stage, true)}<section class="r1620-lesson-main">${content}</section></div>
  </main>`;
}

function lessonPager(page, nextLabel) {
  return `<nav class="r1620-lesson-pager" aria-label="Lesson navigation"><a href="${page.previous}">← &nbsp; Previous${page.number === 20 ? ': Screen 1' : ''}</a><a href="${page.next}">Next: ${nextLabel} &nbsp; →</a></nav>`;
}

function renderLessonOne(page) {
  const content = `<section class="r1620-lesson-hero">
      <img src="${assetRoot}/presence-mountain-path.jpg" alt="A mountain path at sunrise">
      <div><p class="r1620-eyebrow">${page.course}</p><h1>${page.title}</h1><div class="r1620-gold-rule"></div><h2>${page.headline}</h2><p>${page.intro}</p><div class="r1620-actions"><a href="${page.route}">Begin Lesson →</a><a href="/become/">▷ &nbsp; Watch Overview</a></div></div>
      <blockquote><b>“</b><p>${page.quote[0]}</p><cite>${page.quote[1]}</cite></blockquote>
    </section>
    <section id="lesson-content" class="r1620-screen-card"><header><span>1</span><div><small>${page.screen}</small><h2>${page.screenTitle}</h2></div></header><div class="r1620-screen-columns">
      <article><h3>${page.left.heading}</h3>${page.left.paragraphs.map(p => `<p>${p}</p>`).join('')}<ul>${page.left.items.map(item => `<li>${icon('branch')}${item}</li>`).join('')}</ul><p>${page.left.closing}</p><aside>${icon('person')}<b>${page.left.callout}</b></aside></article>
      <article><h3>${page.right.heading}</h3>${page.right.paragraphs.map(p => `<p>${p}</p>`).join('')}<ul class="r1620-life-list">${page.right.items.map((item, i) => `<li>${icon(['awaken','book','people','heart','hand','question','branch'][i])}${item}</li>`).join('')}</ul><aside>${icon('branch')}<b>${page.right.callout}</b></aside></article>
    </div>${lessonPager(page, 'Screen 2')}</section>`;
  return lessonFrame(page, content);
}

function renderLessonTwo(page) {
  const content = `<section class="r1620-pattern-hero"><img src="${assetRoot}/presence-mountain-path.jpg" alt="A mountain path at sunrise"><div><p class="r1620-eyebrow">${page.course}</p><p class="r1620-screen-label">${page.screen}</p><h1>${page.title}</h1><div class="r1620-gold-rule"></div><h2>${page.headline}</h2><p>${page.intro}</p></div>
    <aside class="r1620-practice"><h2>${icon('branch')}${page.practice.title}</h2>${page.practice.paragraphs.map(p => `<p>${p}</p>`).join('')}<hr><h3>${page.practice.heading}</h3><p>${page.practice.body}</p><hr><div class="r1620-reassurance">${icon('person')}<p>${page.practice.reassurance.join('<br>')}</p></div><strong>${page.practice.prayer.join('<br>')}</strong></aside>
    <div class="r1620-patterns"><section><p class="r1620-chip">Old Pattern</p><h3>We react from what we see.</h3><ol>${page.oldPattern.map((item, i) => `<li>${icon(['warning','ear','target','shield','repeat','person','clock'][i])}<span>${item}</span></li>`).join('')}</ol></section><span class="r1620-pattern-arrow">→</span><section><p class="r1620-chip r1620-chip--new">A New First Response</p><h3>We respond from who is already here.</h3><ol>${page.newResponse.map((item, i) => `<li><b>${i < 5 ? i + 1 : '♥'}</b><span>${item}</span></li>`).join('')}</ol></section></div>
    <blockquote class="r1620-goal"><b>“</b><p>${page.quote[0]}<br><strong>${page.quote[1]}</strong></p></blockquote>
    ${lessonPager(page, 'Lesson 2')}</section>`;
  return lessonFrame(page, content);
}

function render(page) {
  if (!page || !pages.has(page.number)) throw new TypeError('render(page) requires a page from range 16–20');
  if (page.family === 'see-clearly-reflection') return renderSeeClearly(page);
  if (page.family === 'becoming-landing') return renderLanding(page);
  return page.number === 19 ? renderLessonOne(page) : renderLessonTwo(page);
}

module.exports = { pages, render, css };
