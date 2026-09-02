const ASSET_ROOT = '/assets/page-ranges/range-21-25/';

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const icon = (name, alt = '') => `<img src="${ASSET_ROOT}${escapeHtml(name)}" alt="${escapeHtml(alt)}">`;

function renderBlock(block) {
  switch (block.type) {
    case 'heading': return `<h2>${escapeHtml(block.text)}</h2>`;
    case 'lead': return `<p class="rts2521-lead">${escapeHtml(block.text)}</p>`;
    case 'p': return `<p>${escapeHtml(block.text)}</p>`;
    case 'strong': return `<p class="rts2521-strong">${escapeHtml(block.text)}</p>`;
    case 'accent': return `<p class="rts2521-accent">${escapeHtml(block.text)}</p>`;
    case 'gold': return `<p class="rts2521-gold">${escapeHtml(block.text)}</p>`;
    case 'rule': return '<span class="rts2521-rule" aria-hidden="true"></span>';
    case 'callout': return `<aside class="rts2521-callout">${block.title ? `<strong>${escapeHtml(block.title)}</strong>` : ''}<p>${escapeHtml(block.text)}</p></aside>`;
    case 'goldCallout': return `<aside class="rts2521-gold-callout"><p>${escapeHtml(block.text)}</p>${block.accent ? `<strong>${escapeHtml(block.accent)}</strong>` : ''}</aside>`;
    case 'softCallout': return `<aside class="rts2521-soft-callout">${block.title ? `<strong>${escapeHtml(block.title)}</strong>` : ''}<p>${escapeHtml(block.text)}</p></aside>`;
    case 'scripture': return `<blockquote class="rts2521-scripture"><p>${escapeHtml(block.text)}</p><cite>${escapeHtml(block.cite)}</cite></blockquote>`;
    case 'quote': return `<blockquote class="rts2521-quote"><span aria-hidden="true">“</span><p>${escapeHtml(block.text)}</p>${block.accent ? `<strong>${escapeHtml(block.accent)}</strong>` : ''}</blockquote>`;
    case 'list': return `<ul class="rts2521-list${block.columns ? ` is-${block.columns}-column` : ''}">${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    case 'richList': return `<ul class="rts2521-list rts2521-rich-list">${block.items.map(([title, text]) => `<li><strong>${escapeHtml(title)} — </strong>${escapeHtml(text)}</li>`).join('')}</ul>`;
    case 'steps': return `<ol class="rts2521-steps">${block.items.map(([title, text], index) => `<li><span>${index + 1}</span><p><strong>${escapeHtml(title)}</strong> — ${escapeHtml(text)}</p></li>`).join('')}</ol>`;
    case 'reminders': return `<div class="rts2521-reminders">${block.items.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`;
    case 'iconCallout': return `<aside class="rts2521-icon-callout">${icon(block.icon)}<div><strong>${escapeHtml(block.text)}</strong>${block.detail ? `<p>${escapeHtml(block.detail)}</p>` : ''}</div></aside>`;
    case 'imageText': return `<aside class="rts2521-image-text">${icon(block.icon, block.alt)}<div><p>${escapeHtml(block.text)}</p><strong>${escapeHtml(block.accent)}</strong></div></aside>`;
    case 'imageChecklist': return `<aside class="rts2521-image-checklist">${icon(block.icon, block.alt)}<ul>${block.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul><strong>${escapeHtml(block.footer)}</strong></aside>`;
    case 'comparison': return `<div class="rts2521-comparison"><div class="rts2521-comparison-head"><strong>${escapeHtml(block.leftTitle)}</strong><strong>${escapeHtml(block.rightTitle)}</strong></div>${block.rows.map(([left, right]) => `<div class="rts2521-comparison-row"><p>${escapeHtml(left)}</p><p>${escapeHtml(right)}</p></div>`).join('')}</div>`;
    case 'columns': return `<div class="rts2521-columns">${block.items.map(item => `<article><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.text)}</p></article>`).join('')}</div>`;
    case 'practicePrompt': return `<aside class="rts2521-practice-prompt">${icon(block.icon)}<div><p class="rts2521-gold">${escapeHtml(block.eyebrow)}</p><strong>${escapeHtml(block.title)}</strong><p>${escapeHtml(block.text)}</p></div></aside>`;
    default: throw new Error(`Unsupported range-21-25 block type: ${block.type}`);
  }
}

const lessons = [
  ['Recognize His Presence', '/become/true-self/'],
  ['Listen Deeply', '/become/practice-change/'],
  ['Release Control', '/become/relationships/'],
  ['Receive the Moment', '/become/repair/'],
  ['Take the Next Right Step', '/become/embodied-faith/'],
  ['Repeat Daily', '/become/daily-examen/'],
];

function renderHeader() {
  return `<header class="rts2521-header">
    <a class="rts2521-brand" href="/" aria-label="Reforming the Soul home">${icon('logo.svg', 'Reforming the Soul')}</a>
    <nav aria-label="Main navigation">
      <a href="/awaken/">AWAKEN</a><a href="/see-clearly/">SEE CLEARLY</a><a class="is-active" href="/become/">BECOME</a><a href="/join/">JOIN</a>
    </nav>
    <a class="rts2521-conversation" href="/conversations/">ENTER A CONVERSATION</a>
    <span class="rts2521-user" aria-label="Account"><span aria-hidden="true"></span></span>
  </header>`;
}

function renderRail(page) {
  const stages = [
    ['Awaken', 'Notice what has formed you.', '/awaken/', 'stage-awaken.svg', 'is-complete'],
    ['See Clearly', 'Learn what is actually true.', '/see-clearly/', 'stage-see.svg', 'is-complete'],
    ['Become', 'Learn to live with God until His life becomes increasingly natural in you.', '/become/', 'stage-become.svg', 'is-current'],
    ['Join', 'Participate in what God is doing.', '/join/', 'stage-join.svg', ''],
  ];
  return `<aside class="rts2521-rail" aria-label="The formation journey">
    <p class="rts2521-rail-title">THE FORMATION JOURNEY</p>
    <nav class="rts2521-stage-list" aria-label="Journey stages">${stages.map(([name, description, href, asset, state]) => `<a class="${state}" data-stage="${name}" href="${href}">${icon(asset)}<span><strong>${name.toUpperCase()}</strong><small>${description}</small></span>${state === 'is-complete' ? '<b aria-label="Complete">✓</b>' : state === 'is-current' ? '<b aria-hidden="true">›</b>' : ''}</a>${name === 'Become' ? `<div class="rts2521-part"><p>PART ONE: Live With God</p><ol>${lessons.map(([label, route], index) => `<li class="${index + 1 === page.lesson ? 'is-current' : ''} ${index + 1 < page.lesson ? 'is-complete' : ''}"><a href="${route}"><span>${index + 1}</span>${label}${index + 1 < page.lesson ? '<b aria-label="Complete">✓</b>' : ''}</a></li>`).join('')}</ol></div>` : ''}`).join('')}</nav>
    <aside class="rts2521-support"><span aria-hidden="true">?</span><div><strong>Need help?</strong><p>We’re here if you have questions along the way.</p><a href="/conversations/">Contact Support&nbsp; →</a></div></aside>
  </aside>`;
}

function renderProgress(page) {
  return `<div class="rts2521-progress" aria-label="Lesson progress">${lessons.map((_, index) => {
    const lesson = index + 1;
    const state = lesson < page.lesson ? 'is-complete' : lesson === page.lesson ? (page.screen === 2 ? 'is-complete is-current' : 'is-current') : '';
    return `<span class="${state}">${lesson < page.lesson || (lesson === page.lesson && page.screen === 2) ? '✓' : lesson}</span>`;
  }).join('<i aria-hidden="true"></i>')}</div>`;
}

function render(page) {
  if (!page || !Number.isInteger(page.number)) throw new TypeError('render(page) requires a page module');
  const sections = page.content.map(section => `<section class="rts2521-zone ${escapeHtml(section.className)}">${section.blocks.map(renderBlock).join('')}</section>`).join('');
  return `<div class="rts-range-21-25 page-${page.number}" data-page-number="${page.number}" data-editable-source="range-21-25">
    ${renderHeader()}
    <div class="rts2521-shell">${renderRail(page)}<main class="rts2521-main">
      <article class="rts2521-lesson"><p class="rts2521-eyebrow">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1><span class="rts2521-title-rule" aria-hidden="true"></span><div class="rts2521-layout">${sections}</div></article>
      <nav class="rts2521-footer-nav" aria-label="Lesson navigation"><a class="rts2521-previous" href="${escapeHtml(page.previous.href)}">←&nbsp;&nbsp; ${escapeHtml(page.previous.label)}</a>${renderProgress(page)}<a class="rts2521-next" href="${escapeHtml(page.next.href)}">${escapeHtml(page.next.label)} &nbsp;→</a></nav>
    </main></div>
  </div>`;
}

module.exports = render;
