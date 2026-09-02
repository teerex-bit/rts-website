const esc = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const iconPaths = {
  sun: '<path d="M4 15h24M8 13a8 8 0 0 1 16 0M16 2v5M5 6l4 4M27 6l-4 4"/>',
  eye: '<path d="M2 16s5-8 14-8 14 8 14 8-5 8-14 8S2 16 2 16Z"/><circle cx="16" cy="16" r="4"/>',
  leaf: '<path d="M7 25C8 13 15 5 27 4c-1 12-8 20-20 21Zm1 0c5-7 10-11 17-17"/>',
  people: '<circle cx="11" cy="11" r="4"/><circle cx="22" cy="11" r="4"/><path d="M3 27v-4c0-5 3-8 8-8s8 3 8 8v4M17 27v-4c0-4 2-7 6-7s6 3 6 7v4"/>',
  check: '<path d="m7 16 6 6L26 9"/>', close: '<path d="M9 9l14 14M23 9 9 23"/>', renew: '<path d="M25 12a10 10 0 1 0 1 9M25 5v7h-7"/>',
  heart: '<path d="M16 27S5 20 5 12a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 8-11 15-11 15Z"/>', search: '<circle cx="14" cy="14" r="8"/><path d="m20 20 7 7"/>', mountain: '<path d="m3 26 9-13 5 7 4-6 8 12H3Z"/>',
  idea: '<path d="M10 22h12M12 26h8M9 14a7 7 0 1 1 14 0c0 4-3 5-4 8h-6c-1-3-4-4-4-8Z"/>', botanical: '<path d="M16 29V8M16 14c-6 0-9-3-10-8 6 0 9 3 10 8Zm0 7c6 0 9-3 10-8-6 0-9 3-10 8Z"/>',
  profile: '<circle cx="16" cy="11" r="5"/><path d="M7 28c0-7 3-11 9-11s9 4 9 11"/>', crown: '<path d="m4 10 7 6 5-10 5 10 7-6-3 16H7L4 10Z"/>', cross: '<path d="M16 4v24M8 12h16"/>',
  shield: '<path d="M16 3 27 7v8c0 7-4 12-11 15C9 27 5 22 5 15V7l11-4Z"/>', key: '<circle cx="11" cy="13" r="6"/><path d="m16 17 12 11m-5-6 3-3"/>', path: '<path d="M7 29c12-8 4-15 18-26M10 25h8M15 18h7"/>',
  hand: '<path d="M9 16V8m4 8V5m4 11V6m4 11V9m-12 7-3-4c-3-3-6 0-3 4l7 11h9c5-4 6-8 6-13"/>', gift: '<path d="M4 13h24v16H4zM3 9h26v6H3zM16 9v20M16 9c-5 0-8-2-8-5 4-2 7 0 8 5Zm0 0c5 0 8-2 8-5-4-2-7 0-8 5Z"/>',
  clock: '<circle cx="16" cy="16" r="12"/><path d="M16 9v8l5 3"/>', book: '<path d="M4 7h9c2 0 3 1 3 3v17c0-2-1-3-3-3H4V7Zm24 0h-9c-2 0-3 1-3 3v17c0-2 1-3 3-3h9V7Z"/>', quote: '<path d="M7 19c0-7 3-11 9-13v4c-3 2-4 4-4 6h4v10H7V19Zm14 0c0-7 3-11 9-13v4c-3 2-4 4-4 6h4v10H7V19Z"/>'
};
const icon = name => `<span class="rts-11-15__icon rts-11-15__icon--${esc(name)}" aria-hidden="true"><svg viewBox="0 0 32 32" focusable="false">${iconPaths[name] || iconPaths.leaf}</svg></span>`;

function rail(page) {
  return `<aside class="rts-11-15__rail">
    <a class="rts-11-15__brand" href="/"><img src="/assets/page-ranges/range-11-15/curriculum-wordmark.svg" alt="Reforming the Soul"></a>
    <p class="rts-11-15__rail-title">The Formation Journey</p>
    <nav class="rts-11-15__stages" aria-label="Formation journey">${page.journey.map(stage => `<a data-stage="${esc(stage.name)}" class="${stage.name === 'See Clearly' ? 'is-active' : ''}" href="${esc(stage.route)}">${icon(stage.icon)}<span><strong>${esc(stage.name)}</strong><small>${esc(stage.description)}</small></span>${stage.name === 'Awaken' ? '<b aria-label="Completed">✓</b>' : ''}</a>`).join('')}</nav>
    <section class="rts-11-15__progress" aria-label="Course progress"><h2>Your Progress</h2><p>${esc(page.progress)}</p><progress max="${page.progressMax}" value="${page.progressValue}">${esc(page.progress)}</progress></section>
    <section class="rts-11-15__help"><h2><span aria-hidden="true">?</span> Need help?</h2><p>We’re here if you have questions along the way.</p><a href="/join/">Contact Support <span aria-hidden="true">→</span></a></section>
  </aside>`;
}

function top(page) {
  return `<header class="rts-11-15__top"><p><strong>${esc(page.course)}</strong><span aria-hidden="true">•</span>${esc(page.lesson)}</p><a href="/see-clearly/">← &nbsp; Course Overview</a><div aria-label="Account tools"><span class="rts-11-15__tool" title="Help">?</span><span class="rts-11-15__tool" title="Account">${icon('profile')}</span></div></header>`;
}

function dots(page) {
  const max = page.progressMax;
  return `<div class="rts-11-15__dots" aria-label="Step ${page.step} of ${max}">${Array.from({ length: max }, (_, index) => `<span class="${index + 1 === page.step ? 'is-current' : ''}"></span>`).join('')}</div>`;
}

function lessonNav(page) {
  return `<nav class="rts-11-15__lesson-nav" aria-label="Lesson navigation"><a href="${esc(page.backRoute || '/see-clearly/')}">← &nbsp; Back</a>${dots(page)}<div><a class="rts-11-15__continue" href="${esc(page.nextRoute || '/become/')}">${esc(page.continueLabel)} &nbsp; →</a>${page.continueNote ? `<small>${esc(page.continueNote)}</small>` : ''}</div></nav>`;
}

function sideCards(page) {
  return `<aside class="rts-11-15__side"><img class="rts-11-15__side-image" src="${esc(page.side.image)}" alt="A contemplative person walking toward a sunlit mountain valley"><span class="rts-11-15__sprout">${icon('leaf')}</span><div class="rts-11-15__side-stack">
    <section><h2>Why This Matters</h2>${page.side.why.map((text, index) => `<p class="${index === 0 ? 'with-emblem' : ''}">${index === 0 ? icon('heart') : ''}${esc(text)}</p>`).join('')}</section>
    <section><h2>In This Lesson You Will</h2><ul>${page.side.outcomes.map((text, index) => `<li>${icon(['eye', 'search', 'leaf'][index])}<span>${esc(text)}</span></li>`).join('')}</ul></section>
    <section class="rts-11-15__remember"><h2>Remember</h2>${page.side.remember.map(text => `<p>${esc(text)}</p>`).join('')}</section>
  </div></aside>`;
}

function comparisonPanel(panel) {
  return `<article class="rts-11-15__compare-card is-${esc(panel.tone)}"><header><h2>${esc(panel.title)}</h2><p>${esc(panel.subtitle)}</p></header><ul>${panel.items.map(item => `<li>${icon(panel.tone === 'gold' ? 'renew' : 'check')}<span>${esc(item[0])}${item[1] ? `<small>${esc(item[1])}</small>` : ''}</span></li>`).join('')}</ul><footer>${icon(panel.tone === 'gold' ? 'mountain' : 'leaf')}<p>${esc(panel.note[0])}<strong>${esc(panel.note[1])}</strong></p></footer></article>`;
}

function renderLesson(page) {
  return `<div class="rts-11-15__lesson-shell">${rail(page)}<section class="rts-11-15__lesson-main">${top(page)}<article class="rts-11-15__content"><header class="rts-11-15__heading"><h1>${esc(page.title)}</h1><span></span>${page.introduction.map((text, index) => `<p class="${index === page.introduction.length - 1 ? 'is-strong' : ''}">${esc(text)}</p>`).join('')}</header><section class="rts-11-15__comparisons">${comparisonPanel(page.comparison.left)}<span aria-label="Not equal">≠</span>${comparisonPanel(page.comparison.right)}</section><blockquote class="rts-11-15__quote">${icon('quote')}<div>${page.quote.map(text => `<p>${esc(text)}</p>`).join('')}</div>${icon('botanical')}</blockquote>${lessonNav(page)}</article></section>${sideCards(page)}</div>`;
}

function wineskinCard(card) {
  return `<article class="rts-11-15__wineskin-card is-${esc(card.tone)}"><header><h2>${esc(card.title)}</h2></header>${card.subtitle.map(text => `<p class="rts-11-15__wineskin-sub">${esc(text)}</p>`).join('')}<div class="rts-11-15__wineskin-body"><img src="${esc(card.image)}" alt="${esc(card.title)} illustration"><ul>${card.items.map(text => `<li>${icon(card.tone === 'gold' ? 'check' : 'close')}<span>${esc(text)}</span></li>`).join('')}</ul></div><blockquote>${esc(card.quote)} <cite>${esc(card.citation)}</cite></blockquote></article>`;
}

function renderWineskins(page) {
  return `<div class="rts-11-15__lesson-shell">${rail(page)}<section class="rts-11-15__lesson-main">${top(page)}<article class="rts-11-15__content rts-11-15__content--wineskins"><header class="rts-11-15__heading"><h1>${esc(page.title)}</h1><span></span>${page.introduction.map((text, index) => `<p class="${index === page.introduction.length - 1 ? 'is-strong' : ''}">${esc(text)}</p>`).join('')}</header><section class="rts-11-15__wineskins">${wineskinCard(page.wineskins[0])}<span class="rts-11-15__transform-arrow" aria-hidden="true">→</span>${wineskinCard(page.wineskins[1])}</section><section class="rts-11-15__assurance">${icon('leaf')}<div>${page.assurance.map((text, index) => `<p class="${index === page.assurance.length - 1 ? 'is-strong' : ''}">${esc(text)}</p>`).join('')}</div></section><section class="rts-11-15__choice">${icon('idea')}<div>${page.choice.map((text, index) => `<p class="${index === page.choice.length - 1 ? 'is-strong' : ''}">${esc(text)}</p>`).join('')}</div></section>${lessonNav(page)}</article></section>${sideCards(page)}</div>`;
}

function renderLanding(page) {
  return `<div class="rts-11-15__landing">${top(page)}<main><img class="rts-11-15__landing-scene" src="${esc(page.heroImage)}" alt="A contemplative person on a forest path overlooking a mountain valley"><section class="rts-11-15__landing-copy"><p class="rts-11-15__pill">${esc(page.eyebrow)}</p><h1>${esc(page.title)}</h1><span class="rts-11-15__rule"></span><h2>${esc(page.subheading)}</h2>${page.introduction.map(text => `<p>${esc(text)}</p>`).join('')}<h3>${esc(page.invitation)}</h3><a class="rts-11-15__start" href="/see-god-clearly/images/">Begin Part 2: See God Clearly <span>→</span><small>About 20–25 minutes</small></a></section><section class="rts-11-15__part-cards">${page.parts.map(part => `<article class="${part.active ? 'is-active' : ''}">${icon(part.icon)}<p>${esc(part.label)}</p><h2>${esc(part.title)}</h2>${part.text.map(text => `<span>${esc(text)}</span>`).join('')}</article>`).join('<span aria-hidden="true">→</span>')}</section><aside class="rts-11-15__discover"><h2>What You’ll Discover</h2><ul>${page.discoveries.map((text, index) => `<li>${icon(['heart', 'cross', 'leaf', 'people'][index])}<span>${esc(text)}</span></li>`).join('')}</ul><blockquote>${icon('quote')}${page.scripture.map(text => `<p>${esc(text)}</p>`).join('')}<cite>${esc(page.citation)}</cite></blockquote></aside></main><section class="rts-11-15__matters"><h2>Why This<br>Matters</h2>${page.matters.map((item, index) => `<article>${icon(['shield', 'key', 'sun', 'path'][index])}<div><h3>${esc(item[0])}</h3><p>${esc(item[1])}</p></div></article>`).join('')}<p class="rts-11-15__matters-note">▤<span>The clearest view of God leads to the clearest life.</span></p></section></div>`;
}

function renderTrust(page) {
  return `<div class="rts-11-15__compact">${rail(page)}<section class="rts-11-15__compact-main">${top(page)}<article><header><p>${esc(page.eyebrow)}</p><h1>${esc(page.title)}</h1>${page.introduction.map(text => `<span>${esc(text)}</span>`).join('')}<strong>${esc(page.prompt)}</strong></header><div class="rts-11-15__trust-grid"><img src="${esc(page.heroImage)}" alt="A person seated above a quiet mountain lake at sunrise"><section><h2>Take a moment to reflect:</h2><ul>${page.questions.map((text, index) => `<li>${icon(['heart', 'people', 'shield', 'crown'][index])}<span>${esc(text)}</span></li>`).join('')}</ul></section></div><blockquote class="rts-11-15__declaration">${icon('cross')}<p>${esc(page.declaration[0])}<strong>${esc(page.declaration[1])}</strong></p></blockquote>${lessonNav(page)}</article></section></div>`;
}

function renderReflectionTable(page) {
  return `<div class="rts-11-15__compact">${rail(page)}<section class="rts-11-15__compact-main">${top(page)}<article class="rts-11-15__table-page"><header><div><p>${esc(page.eyebrow)}</p><h1>${esc(page.title)}</h1>${page.introduction.map(text => `<span>${esc(text)}</span>`).join('')}</div><img src="${esc(page.heroImage)}" alt="Jesus sharing a warm conversation with a child in a sunlit landscape"></header><section class="rts-11-15__god-table" aria-label="The same character of God in both Testaments"><div class="rts-11-15__god-head"><span></span><h2>${icon('cross')} ${esc(page.columns[0])}</h2><h2>${icon('crown')} ${esc(page.columns[1])}</h2></div>${page.rows.map(row => `<article><h3>${icon(row.icon)}<span>${esc(row.trait)}</span></h3><p>${esc(row.new)}</p><p>${esc(row.old)}</p></article>`).join('')}</section>${lessonNav(page)}</article></section></div>`;
}

module.exports = function render(pageOrNumber, pages) {
  const page = typeof pageOrNumber === 'number' ? pages.get(pageOrNumber) : pageOrNumber;
  if (!page || page.number < 11 || page.number > 15) throw new Error('Unknown range 11–15 page');
  const content = page.family === 'lesson' ? renderLesson(page)
    : page.family === 'wineskins' ? renderWineskins(page)
      : page.family === 'landing' ? renderLanding(page)
        : page.family === 'reflection-trust' ? renderTrust(page)
          : renderReflectionTable(page);
  return `<div class="rts-11-15 rts-11-15--page-${page.number}" data-page-number="${page.number}" data-editable-source="range-11-15">${content}</div>`;
};
