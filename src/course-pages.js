const links = require('./links');

const esc = value => String(value).replace(/[&<>]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[character]));
const symbol = icon => `<span class="course-symbol course-symbol--${esc(icon)}" aria-hidden="true"></span>`;

const lessonRoutes = new Map([
  [3, { back: '/awaken/', next: '/awaken/name-your-desire/' }],
  [4, { back: '/awaken/pay-attention/', next: '/awaken/listen-within/' }],
  [5, { back: '/awaken/name-your-desire/', next: '/awaken/practice-presence/' }],
  [6, { back: '/awaken/listen-within/', next: '/see-clearly/' }],
  [7, { back: '/awaken/practice-presence/', next: '/see-clearly/your-formation/' }],
  [8, { back: '/see-clearly/', next: '/see-clearly/family-of-origin/' }],
  [9, { back: '/see-clearly/your-formation/', next: '/see-clearly/patterns/' }],
  [10, { back: '/see-clearly/family-of-origin/', next: '/see-clearly/false-self/' }]
]);

function journeyRail(page, stages) {
  return `<aside class="formation-rail">
    <a class="formation-rail__brand" href="${links.home}"><img src="${page.number === 3 ? '/assets/page-awaken/curriculum-wordmark.svg' : '/assets/logo-light.svg'}" alt="Reforming the Soul"></a>
    <p class="formation-rail__title">The Formation Journey</p>
    <nav class="formation-rail__journey" aria-label="Formation journey">${stages.map(stage => `<a data-stage="${esc(stage.name)}" class="${stage.name === page.activeStage ? 'is-active' : ''}" href="${stage.href}"><img src="/assets/icon-${stage.icon}.svg" alt=""><span><strong>${esc(stage.name)}</strong><small>${esc(stage.description)}</small></span></a>`).join('')}</nav>
    <section class="formation-rail__progress" aria-label="Course progress"><p>Your Progress</p><span>${esc(page.progressLabel)}</span><progress max="${page.progressMax}" value="${page.progress}">${page.progressLabel}</progress></section>
    ${page.family === 'awaken' && page.number < 6 && page.number !== 3 ? `<blockquote>${esc("Everyone’s spirit has already been formed. Its present character has come to be through the experiences and choices of a lifetime.")}<cite>— Dallas Willard</cite></blockquote>` : `<section class="formation-rail__help"><strong><span aria-hidden="true">?</span> Need help?</strong><p>We’re here if you have questions along the way.</p><a href="${links.learnMore}">Contact Support →</a></section>`}
  </aside>`;
}

function courseTop(page) {
  const page03LogoOverride = page.number === 3 ? `<style>.course-top:has(+.formation-course-page[data-page-number="03"]):before{background-image:url('/assets/page-awaken/curriculum-wordmark.svg')!important}</style>` : '';
  return `${page03LogoOverride}<header class="course-top"><p><strong>${esc(page.courseLabel)}</strong><span aria-hidden="true">•</span>${esc(page.lessonLabel)}</p>${page.number === 3 ? '' : `<a href="${page.activeStage === 'Awaken' ? links.awaken : links.seeClearly}">← &nbsp; Course Overview</a>`}<div class="course-tools" aria-label="Account tools"><span title="Help">?</span><span aria-hidden="true">●</span></div></header>`;
}

function renderCallout(lines, tone = '') {
  if (!lines) return '';
  return `<section class="course-callout ${tone}">${symbol('leaf')}<div>${lines.map(line => `<p>${esc(line)}</p>`).join('')}</div></section>`;
}

function renderSideCards(page) {
  return `<aside class="course-aside"><img class="course-aside__image" src="${page.image}" alt="A contemplative figure looking across a mountain landscape"><span class="course-aside__leaf" aria-hidden="true">⌁</span><div class="course-aside__cards">${page.sideCards.map(card => `<section class="course-side-card"><h2>${esc(card.title)}</h2>${(card.paragraphs || []).map(text => `<p>${esc(text)}</p>`).join('')}${card.quote ? `<blockquote>“${esc(card.quote)}”${card.quoteBy ? `<cite>— ${esc(card.quoteBy)}</cite>` : ''}</blockquote>` : ''}${card.items ? `<ul>${card.items.map((item, index) => `<li>${symbol(['eye', 'leaf', 'heart', 'search'][index % 4])}<span>${esc(item)}</span></li>`).join('')}</ul>` : ''}</section>`).join('')}</div></aside>`;
}

function renderIconCards(page, choice = false) {
  return `<div class="course-card-grid ${choice ? 'course-card-grid--choices' : ''}">${page.cards.map((card, index) => `<article class="course-card">${symbol(card[0])}<div>${card.length > 2 ? `<span class="course-card__number">${index + 1}</span><h3>${esc(card[1])}</h3><p>${esc(card[2])}</p><small>${esc(card[3])}</small>` : `<p>${esc(card[1])}</p>${choice ? '<span class="course-radio" aria-hidden="true"></span>' : '<a href="' + links.learnMore + '">What happens inside you? <span aria-hidden="true">→</span></a>'}`}</div></article>`).join('')}</div>`;
}

function renderOriginMap(page) {
  const items = page.cards.slice(0, 6).map(card => `<label class="origin-choice">${symbol(card[0])}<span>${esc(card[1])}</span><input type="checkbox" aria-label="${esc(card[1])}"></label>`).join('');
  const unsure = page.cards[6];
  return `<div class="origin-map"><div class="origin-map__choices">${items}</div><div class="origin-map__center">${symbol('person')}<strong>${esc(page.center[0])}</strong><em>(${esc(page.center[1])})</em></div><label class="origin-choice origin-choice--wide">${symbol(unsure[0])}<span>${esc(unsure[1])}</span><input type="checkbox" aria-label="${esc(unsure[1])}"></label></div>`;
}

function renderPracticeForm(page) {
  const f = page.form;
  return `${renderIconCards(page)}<section class="notice-form"><header>${symbol('phone')}<div><h2>${esc(f.title)}</h2>${f.description.map(text => `<p>${esc(text)}</p>`).join('')}</div><button type="button">＋ ${esc(f.title)}</button></header><div class="notice-form__prompts">${f.prompts.map((prompt, index) => `<label><strong>${index + 1}. ${esc(prompt[0])}</strong><small>Example: ${esc(prompt[1])}</small><textarea placeholder="Type your notes…"></textarea></label>`).join('')}</div><p class="notice-form__privacy">▣ &nbsp; Your notes are private and only visible to you.</p></section>`;
}

function renderPhaseOverview(page) {
  return `<section class="phase-outcomes" aria-label="In this phase you will">${page.outcomes.map((outcome, index) => `<article>${symbol(['person', 'search', 'leaf'][index])}<p>${esc(outcome)}</p></article>`).join('')}</section><div class="phase-title"><span></span><h2>${esc(page.journeyTitle)}</h2><span></span></div><section class="phase-steps">${page.cards.map((card, index) => `<article>${symbol(card[0])}<h3>${esc(card[1])}</h3><p>${esc(card[2])}</p></article>${index < page.cards.length - 1 ? '<span aria-hidden="true">→</span>' : ''}`).join('')}</section>`;
}

function renderTruthPanels(page) {
  return `<section class="truth-panels">${page.cards.map(card => `<article><header><h2>${esc(card.title)}</h2><p>${esc(card.subtitle)}</p></header>${symbol(card.icon)}<p>${esc(card.copy)}</p><blockquote>${esc(card.quote)}</blockquote><cite>${esc(card.citation)}</cite></article>`).join('<span class="truth-arrow" aria-hidden="true">→</span>')}</section>`;
}

function renderComparisonRows(page) {
  return `<section class="comparison-table"><header><h2>${esc(page.columns[0])}</h2><span></span><h2>${esc(page.columns[1])}</h2></header>${page.cards.map(card => `<div class="comparison-row"><article>${symbol(card[0])}<p>${esc(card[1])}</p><span class="course-radio" aria-hidden="true"></span></article><span class="comparison-arrow" aria-hidden="true">→</span><article>${symbol(card[2])}<p>${esc(card[3])}</p><span class="course-radio" aria-hidden="true"></span></article></div>`).join('')}</section>`;
}

function composition(page) {
  switch (page.composition) {
    case 'scenario-grid': return renderIconCards(page);
    case 'origin-map': return renderOriginMap(page);
    case 'practice-cards': return renderIconCards(page);
    case 'practice-form': return renderPracticeForm(page);
    case 'phase-overview': return renderPhaseOverview(page);
    case 'choice-grid': return renderIconCards(page, true);
    case 'truth-panels': return renderTruthPanels(page);
    case 'comparison-rows': return renderComparisonRows(page);
    default: throw new Error(`Unknown course composition: ${page.composition}`);
  }
}

function lessonNavigation(page) {
  const dotCount = page.dotCount || (page.number < 7 ? 5 : 6);
  const routes = lessonRoutes.get(page.number) || { back: page.activeStage === 'Awaken' ? links.awaken : links.seeClearly, next: links.next };
  return `<nav class="lesson-navigation" aria-label="Lesson navigation"><a href="${routes.back}">← &nbsp; Back</a><div aria-label="Step ${Math.max(page.step, 1)} of ${dotCount}">${Array.from({ length: dotCount }, (_, index) => `<span class="${index === Math.max(page.step - 1, 0) ? 'is-current' : ''}"></span>`).join('')}</div><a class="lesson-navigation__continue" href="${routes.next}">${esc(page.continueLabel || 'Continue')} &nbsp; →</a>${page.deferLabel ? `<a class="lesson-navigation__defer" href="${routes.next}">${esc(page.deferLabel)}</a>` : ''}</nav>`;
}

function renderCoursePage(page, stages) {
  const isOverview = page.composition === 'phase-overview';
  return `${courseTop(page)}<main class="formation-course-page formation-course-page--${page.family} ${isOverview ? 'formation-course-page--overview' : ''}" data-page-number="${String(page.number).padStart(2, '0')}" data-editable-source="pages-03-10">
    ${journeyRail(page, stages)}
    <article class="course-content">
      <section class="course-hero"><p>${esc(page.courseLabel)} <span aria-hidden="true">•</span> ${esc(page.lessonLabel)}</p><h1>${esc(page.title)}</h1><span class="course-rule" aria-hidden="true"></span><div class="course-intro">${page.introduction.map((line, index) => `<p class="${index === page.introduction.length - 1 ? 'course-intro__last' : ''}">${esc(line)}</p>`).join('')}</div>${isOverview ? `<a class="course-primary-action" href="${(lessonRoutes.get(page.number) || {}).next || links.next}">Begin This Phase &nbsp; →</a>` : ''}</section>
      <div class="course-body">${renderCallout(page.callout)}${page.sectionTitle ? `<header class="course-section-heading">${symbol(page.family === 'awaken' ? 'leaf' : 'person')}<div><h2>${esc(page.sectionTitle)}</h2>${(page.sectionCopy || []).map(text => `<p>${esc(text)}</p>`).join('')}</div></header>` : ''}${composition(page)}${renderCallout(page.note, 'course-callout--note')}${page.secondaryTitle ? `<h2 class="course-secondary-title">${esc(page.secondaryTitle)}</h2>` : ''}${renderCallout(page.secondaryNote, 'course-callout--secondary')}${isOverview ? '' : lessonNavigation(page)}</div>
    </article>
    ${renderSideCards(page)}
  </main>`;
}

module.exports = renderCoursePage;