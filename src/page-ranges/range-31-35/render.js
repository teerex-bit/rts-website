const ASSET_ROOT = '/assets/page-ranges/range-31-35';

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const iconGlyphs = {
  thought: '◌', heart: '♡', flame: '♨', hand: '✋', search: '⌕', cross: '†',
  people: '♧', star: '☆', broken: '♢', link: '∞', home: '⌂', charcoal: '○',
  gold: '✦', violet: '♡'
};

function renderIcon(name) {
  if (name === 'tree') return `<img src="${ASSET_ROOT}/fruit-tree.svg" alt="">`;
  if (name === 'person') return `<img src="${ASSET_ROOT}/person.svg" alt="">`;
  if (name === 'growth') return `<img src="${ASSET_ROOT}/growth.svg" alt="">`;
  return `<span aria-hidden="true">${escapeHtml(iconGlyphs[name] || name || '•')}</span>`;
}

function renderList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderBlock(block) {
  switch (block.type) {
    case 'p':
      return `<p>${escapeHtml(block.text)}</p>`;
    case 'emphasis':
      return `<p class="rts-r31-35__emphasis">${escapeHtml(block.text)}</p>`;
    case 'list':
      return renderList(block.items);
    case 'quote':
      return `<blockquote>${escapeHtml(block.text)}</blockquote>`;
    case 'callout':
      return `<aside class="rts-r31-35__callout"><strong>${escapeHtml(block.heading)}</strong><p>${escapeHtml(block.text)}</p></aside>`;
    case 'cards':
      return `<div class="rts-r31-35__mini-cards">${block.cards.map((card) => `<article><span class="rts-r31-35__mini-icon">${renderIcon(card.icon)}</span><div><h3>${escapeHtml(card.heading)}</h3><p>${escapeHtml(card.text)}</p></div></article>`).join('')}</div>`;
    case 'columns':
      return `<div class="rts-r31-35__columns rts-r31-35__columns--${Math.min(block.columns.length, 4)}">${block.columns.map((column) => `<section><h3>${escapeHtml(column.heading)}</h3>${renderList(column.items)}</section>`).join('')}</div>`;
    case 'flow':
      return `<ol class="rts-r31-35__flow">${block.steps.map((step) => `<li><span>${renderIcon(step.icon || 'growth')}</span><h3>${escapeHtml(step.heading)}</h3><p>${escapeHtml(step.text)}</p></li>`).join('')}</ol>`;
    case 'questions':
      return `<div class="rts-r31-35__questions">${block.items.map(([question, answer]) => `<section><span aria-hidden="true">○</span><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></section>`).join('')}</div>`;
    case 'terms':
      return `<dl class="rts-r31-35__terms">${block.items.map(([term, description]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(description)}</dd></div>`).join('')}</dl>`;
    case 'pairs':
      return `<dl class="rts-r31-35__pairs">${block.items.map(([before, after]) => `<div><dt>${escapeHtml(before)}</dt><dd><span aria-hidden="true">→</span>${escapeHtml(after)}</dd></div>`).join('')}</dl>`;
    default:
      throw new Error(`Unsupported block type: ${block.type}`);
  }
}

function renderPanel(panel, index) {
  return `<article class="rts-r31-35__panel rts-r31-35__panel--${escapeHtml(panel.tone)}${panel.wide ? ' rts-r31-35__panel--wide' : ''}">
    <header class="rts-r31-35__panel-header"><span class="rts-r31-35__panel-icon">${renderIcon(panel.icon || String(index + 1))}</span><h2>${escapeHtml(panel.heading)}</h2></header>
    ${panel.lede ? `<p class="rts-r31-35__panel-lede">${escapeHtml(panel.lede)}</p>` : ''}
    <div class="rts-r31-35__panel-body">${panel.blocks.map(renderBlock).join('')}</div>
  </article>`;
}

function renderHeader() {
  const stages = [
    ['Awaken', '/awaken/'],
    ['See Clearly', '/see-clearly/'],
    ['Become', '/become/'],
    ['Join', '/join/']
  ];
  return `<header class="rts-r31-35__site-header">
    <a class="rts-r31-35__brand" href="/" aria-label="Reforming the Soul home"><img src="${ASSET_ROOT}/brand-tree.svg" alt=""><span><b>REFORMING</b><i>the</i> SOUL</span></a>
    <nav aria-label="Main journey">${stages.map(([label, href]) => `<a data-stage="${label}" class="${label === 'Become' ? 'is-active' : ''}" href="${href}">${label}</a>`).join('')}</nav>
    <a class="rts-r31-35__conversation" href="/conversations/">Enter a conversation</a>
    <a class="rts-r31-35__account" href="/join/" aria-label="Account"><span aria-hidden="true">●</span></a>
  </header>`;
}

function renderRail() {
  const stages = [
    ['Awaken', 'Notice what has formed you.', '/awaken/', '☀'],
    ['See Clearly', 'Learn what is actually true.', '/see-clearly/', '◉'],
    ['Become', 'Learn to recognize and cooperate with what life with God is forming in you.', '/become/', '♧'],
    ['Join', 'Participate in what God is doing.', '/join/', '♧']
  ];
  return `<aside class="rts-r31-35__rail">
    <p class="rts-r31-35__rail-title">The formation journey</p>
    <nav aria-label="Formation journey">${stages.map(([label, text, href, icon]) => `<a data-stage="${label}" class="${label === 'Become' ? 'is-active' : ''}" href="${href}"><span class="rts-r31-35__rail-icon" aria-hidden="true">${icon}</span><span><b>${label}</b><small>${text}</small></span>${label !== 'Join' ? '<i aria-hidden="true">✓</i>' : ''}</a>`).join('')}</nav>
    <section class="rts-r31-35__support"><h2><span aria-hidden="true">?</span> Need help?</h2><p>We’re here if you have questions along the way.</p><a href="/join/">Contact Support <span aria-hidden="true">→</span></a></section>
  </aside>`;
}

function renderProgress(progress) {
  const dots = Array.from({ length: progress.total }, (_, index) => {
    const step = index + 1;
    return `<li class="${step < progress.current ? 'is-complete' : step === progress.current ? 'is-current' : ''}">${step < progress.current ? '✓' : step}</li>`;
  }).join('');
  return `<nav class="rts-r31-35__pager" aria-label="Lesson navigation">
    <a class="rts-r31-35__pager-previous" href="${escapeHtml(progress.previousHref)}">← <span>Previous: ${escapeHtml(progress.previous)}</span></a>
    <ol>${dots}</ol>
    <a class="rts-r31-35__pager-next" href="${escapeHtml(progress.nextHref)}">Next: ${escapeHtml(progress.next)} <span aria-hidden="true">→</span></a>
  </nav>`;
}

function render(page) {
  if (!page || !Number.isInteger(page.number)) throw new TypeError('render(page) requires a valid page module');
  const scenic = page.scenic ? `<div class="rts-r31-35__scenic rts-r31-35__scenic--${escapeHtml(page.scenic)}" role="img" aria-label="Editorial scenic illustration"><span></span>${page.scenic === 'orchard' ? `<img src="${ASSET_ROOT}/fruit-tree.svg" alt="">` : ''}</div>` : '';
  return `<div class="rts-r31-35 rts-r31-35--page-${page.number}" data-page-number="${page.number}" data-editable-source="range-31-35">
    ${renderHeader()}
    <div class="rts-r31-35__shell">
      ${renderRail()}
      <main class="rts-r31-35__main">
        <header class="rts-r31-35__hero${page.scenic ? ' rts-r31-35__hero--scenic' : ''}">
          <div class="rts-r31-35__hero-copy"><p class="rts-r31-35__kicker">${escapeHtml(page.kicker)}</p><div class="rts-r31-35__title-line"><h1>${escapeHtml(page.title)}</h1>${page.subtitle ? `<p>${escapeHtml(page.subtitle)}</p>` : ''}</div>${page.introduction ? `<p class="rts-r31-35__intro">${escapeHtml(page.introduction)}</p>` : ''}${page.statement ? `<p class="rts-r31-35__statement">${escapeHtml(page.statement)}</p>` : ''}</div>
          ${scenic}
          ${page.heroNote ? `<aside class="rts-r31-35__hero-note"><span aria-hidden="true">${page.scenic ? '“' : 'ⓘ'}</span><p>${escapeHtml(page.heroNote)}</p></aside>` : ''}
        </header>
        <section class="rts-r31-35__dashboard" aria-label="Lesson content">${page.panels.map(renderPanel).join('')}</section>
        ${renderProgress(page.progress)}
      </main>
    </div>
  </div>`;
}

module.exports = render;
