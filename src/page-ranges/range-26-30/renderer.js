const iconPath = '/assets/page-ranges/range-26-30/icons.svg';

const esc = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const icon = (name, className = '') => `<svg class="rts-r2630__icon ${className}" aria-hidden="true"><use href="${iconPath}#${esc(name)}"></use></svg>`;
const lines = values => values.map(value => `<p>${esc(value)}</p>`).join('');
const bullets = (values, className = '') => `<ul class="${className}">${values.map(value => `<li>${esc(value)}</li>`).join('')}</ul>`;

function header() {
  return `<header class="rts-r2630__top">
    <a class="rts-r2630__brand" href="/" aria-label="Reforming the Soul home"><img src="/assets/logo.svg" alt="Reforming the Soul"></a>
    <nav class="rts-r2630__stages" aria-label="Formation journey stages">
      <a href="/awaken/">Awaken</a><a href="/see-clearly/">See Clearly</a><a class="is-active" href="/become/" aria-current="step">Become</a><a href="/join/">Join</a>
    </nav>
    <a class="rts-r2630__conversation" href="/conversations/">Enter a Conversation</a>
    <a class="rts-r2630__profile" href="/join/" aria-label="Account">${icon('user')}</a>
  </header>`;
}

function rail(page) {
  const lessonSteps = ['Recognize His Presence', 'Listen Deeply', 'Release Control', 'Receive the Moment', 'Take the Next Right Step', 'Repeat Daily'];
  const journey = [
    ['Awaken', 'Notice what has formed you.', 'awaken'],
    ['See Clearly', 'Learn what is actually true.', 'see'],
    ['Become', page.number === 30 ? 'Learn to recognize and cooperate with what life with God is forming in you.' : 'Learn to live with God until His life becomes increasingly natural in you.', 'become'],
    ['Join', 'Participate in what God is doing.', 'join']
  ];
  return `<aside class="rts-r2630__rail" aria-label="Formation journey">
    <p class="rts-r2630__rail-title">The Formation Journey</p>
    <nav class="rts-r2630__rail-journey">${journey.map(([name, copy, symbol]) => `<a class="${name === 'Become' ? 'is-active' : ''}" href="/${name === 'See Clearly' ? 'see-clearly' : name.toLowerCase()}/">${icon(symbol)}<span><strong>${esc(name)}</strong><small>${esc(copy)}</small></span>${name === 'Become' ? '<b aria-hidden="true">›</b>' : name !== 'Join' ? '<i aria-hidden="true">✓</i>' : ''}</a>`).join('')}</nav>
    ${page.number < 30 ? `<section class="rts-r2630__part" aria-labelledby="rts-r2630-part-${page.number}"><h2 id="rts-r2630-part-${page.number}">Part One: <span>Live With God</span></h2><ol>${lessonSteps.map((step, index) => `<li class="${index + 1 === page.activeStep ? 'is-current' : ''}"><span>${index + 1}</span>${esc(step)}${index + 1 < page.activeStep ? '<i aria-hidden="true">✓</i>' : ''}</li>`).join('')}</ol></section>` : ''}
    <section class="rts-r2630__help"><h2>${icon('question')} Need help?</h2><p>We’re here if you have questions along the way.</p><a href="/conversations/">Contact Support <span aria-hidden="true">→</span></a></section>
  </aside>`;
}

function lessonHeader(page) {
  return `<header class="rts-r2630__lesson-header"><p>${esc(page.stage)} <span>•</span> ${esc(page.part)} <span>•</span> ${esc(page.lesson)} <span>•</span> ${esc(page.screen)}</p><h1>${esc(page.heading)}</h1><i aria-hidden="true"></i></header>`;
}

function lessonNav(page) {
  return `<nav class="rts-r2630__lesson-nav" aria-label="Lesson navigation"><a href="${esc(page.previousRoute)}">← <span>${esc(page.previous)}</span></a><ol>${[1,2,3,4,5,6].map(step => `<li class="${step < page.activeStep ? 'is-complete' : step === page.activeStep ? 'is-current' : ''}">${step < page.activeStep ? '✓' : step}</li>`).join('')}</ol><a href="${esc(page.nextRoute)}"><span>${esc(page.next)}</span> →</a></nav>`;
}

function page26(page) {
  return `<article class="rts-r2630__lesson rts-r2630__lesson--26">
    ${lessonHeader(page)}
    <div class="rts-r2630__p26-grid">
      <section><h2 class="rts-r2630__lead">${esc(page.lead)}</h2><p>${esc(page.introduction)}</p><h3>Receiving a painful moment does not mean:</h3>${bullets(page.doesNotMean, 'rts-r2630__cross-list')}
        <blockquote class="rts-r2630__soft-quote">${esc(page.receiving)}</blockquote>
        <section class="rts-r2630__icon-section">${icon('book')}<div><h3>${esc(page.job.heading)}</h3><p>${esc(page.job.intro)}</p>${page.job.quotes.map(([quote, reference]) => `<blockquote>${esc(quote)} <cite>— ${esc(reference)}</cite></blockquote>`).join('')}<p>${esc(page.job.close)}</p></div></section>
      </section>
      <section class="rts-r2630__p26-right"><h3>${esc(page.luke.heading)}</h3><p>${esc(page.luke.intro)}</p><blockquote class="rts-r2630__scripture">${esc(page.luke.quote)} <cite>— ${esc(page.luke.reference)}</cite></blockquote>${lines(page.luke.explanation)}<blockquote class="rts-r2630__soft-quote">${page.luke.promise.map(value => `<strong>${esc(value)}</strong>`).join('')}</blockquote><p>${esc(page.luke.bridge)}</p><blockquote class="rts-r2630__scripture">${esc(page.luke.secondQuote)} <cite>— ${esc(page.luke.secondReference)}</cite></blockquote><p>${esc(page.luke.close)}</p>
        <aside class="rts-r2630__truth-card">${icon('shield')}<div><h3>${esc(page.truth.heading)}</h3><p>${esc(page.truth.copy)}</p><strong>${esc(page.truth.emphasis)}</strong></div></aside>
      </section>
    </div>${lessonNav(page)}
  </article>`;
}

function page27(page) {
  return `<article class="rts-r2630__lesson rts-r2630__lesson--27">
    ${lessonHeader(page)}<div class="rts-r2630__p27-grid"><section><h2 class="rts-r2630__lead">${esc(page.lead)}</h2><p>${esc(page.introduction)}</p>
      <blockquote class="rts-r2630__soft-quote"><strong>${esc(page.scripture.heading)}</strong><b>${esc(page.scripture.quote)}</b><span>${esc(page.scripture.close)}</span></blockquote>
      <h3>${esc(page.truthsHeading)}</h3>${bullets(page.truths, 'rts-r2630__two-col-list')}${lines(page.truthsClose)}
      <div class="rts-r2630__questions"><section><h3>Instead of only asking…</h3><p>${icon('question')} ${esc(page.question)}</p></section><span aria-hidden="true">→</span><section><h3>We also begin learning to ask…</h3>${bullets(page.betterQuestions)}</section></div>
      <aside class="rts-r2630__reassurance">${icon('heart')}<div><h3>${esc(page.reassurance.heading)}</h3>${bullets(page.reassurance.items, 'rts-r2630__check-list')}</div></aside>
    </section><aside class="rts-r2630__p27-side"><section class="rts-r2630__icon-section">${icon('person')}<div><h3>${esc(page.peter.heading)}</h3>${lines(page.peter.lines)}<strong>${esc(page.peter.emphasis)}</strong></div></section>
      <section class="rts-r2630__redemption">${icon('mountain')}<h2>${esc(page.redemption.heading)}</h2>${page.redemption.items.map(([heading, copy], index) => `<article>${icon(['awaken','compass','heart','see','person'][index])}<p><strong>${esc(heading)}</strong><span>${esc(copy)}</span></p></article>`).join('')}<strong class="rts-r2630__closing-emphasis">${esc(page.redemption.close)}</strong></section>
    </aside></div>${lessonNav(page)}
  </article>`;
}

function page28(page) {
  return `<article class="rts-r2630__lesson rts-r2630__lesson--28">
    ${lessonHeader(page)}<div class="rts-r2630__p28-grid"><section><h2 class="rts-r2630__lead">${esc(page.lead)}</h2>${lines(page.introduction)}
      <section class="rts-r2630__lighthouse"><img src="/assets/page-ranges/range-26-30/lighthouse.svg" alt="Lighthouse casting beams over the sea"><div><h2>${esc(page.lighthouse.heading)}</h2>${lines(page.lighthouse.actions)}<strong>${esc(page.lighthouse.emphasis)}</strong></div></section>
      <div class="rts-r2630__responsibility">${page.responsibility.map(item => `<section><h3>${esc(item.heading)}</h3><div>${icon(item.icon)}<p>${item.lines.map(line => `<span>${esc(line)}</span>`).join('')}</p></div></section>`).join('')}</div>
    </section><aside class="rts-r2630__biblical">${icon('compass')}<div><h2>${esc(page.biblical.heading)}</h2>${bullets(page.biblical.items, 'rts-r2630__arrow-list')}<strong>${page.biblical.close.map(value => `<span>${esc(value)}</span>`).join('')}</strong></div></aside></div>
    <section class="rts-r2630__practical">${icon('question')}<div><h2>${esc(page.practical.heading)}</h2><strong>${esc(page.practical.question)}</strong>${lines(page.practical.lines)}</div>${bullets(page.practical.truths, 'rts-r2630__check-list')}</section>${lessonNav(page)}
  </article>`;
}

function page29(page) {
  return `<article class="rts-r2630__lesson rts-r2630__lesson--29">
    ${lessonHeader(page)}<div class="rts-r2630__p29-grid"><section><h2 class="rts-r2630__lead">${page.lead.map(value => `<span>${esc(value)}</span>`).join('')}</h2>${lines(page.introduction)}
      <h3 class="rts-r2630__sequence-label">Desire → Intention → Obedience</h3><ol class="rts-r2630__sequence">${page.sequence.map((item, index) => `<li>${icon(item.icon)}<p><strong>${esc(item.heading)}</strong><span>${esc(item.copy)}</span></p>${index < page.sequence.length - 1 ? '<b aria-hidden="true">→</b>' : ''}</li>`).join('')}</ol><p>${esc(page.sequenceClose)}</p>
      <aside class="rts-r2630__hearing">${icon('speech')}<div><h2>${esc(page.hearing.heading)}</h2>${lines(page.hearing.lines)}<strong>${esc(page.hearing.emphasis)}</strong></div></aside>
      <div class="rts-r2630__lower-cards">${page.lower.map(item => `<section>${icon(item.icon)}<div><h3>${esc(item.heading)}</h3>${lines(item.lines)}</div></section>`).join('')}</div>
    </section><aside><section class="rts-r2630__pattern">${icon('repeat')}<div><h2>${esc(page.pattern.heading)}</h2>${lines(page.pattern.introduction)}</div><ol>${page.pattern.items.map(([heading, symbol, copy]) => `<li>${icon(symbol)}<p><strong>${esc(heading)}</strong><span>${esc(copy)}</span></p></li>`).join('')}</ol><strong>${page.pattern.close.map(value => `<span>${esc(value)}</span>`).join('')}</strong></section><blockquote class="rts-r2630__final-quote">${icon('speech')}<span>${page.quote.map(value => `<strong>${esc(value)}</strong>`).join('')}</span></blockquote></aside></div>${lessonNav(page)}
  </article>`;
}

function page30(page) {
  return `<article class="rts-r2630__landing"><header><p>${esc(page.stage)} <span>•</span> ${esc(page.part)}</p><h1>${esc(page.heading)}</h1><i aria-hidden="true"></i><h2>${esc(page.lead)}</h2>${lines(page.introduction)}</header>
    <img class="rts-r2630__seedling" src="/assets/page-ranges/range-26-30/seedling-growth.webp" alt="Young green seedling emerging through dry soil in warm light">
    <section class="rts-r2630__areas"><h2>${esc(page.areasHeading)}</h2><ol>${page.areas.map(area => `<li>${icon(area.icon)}<h3>${area.number}. ${esc(area.heading)}${area.subheading ? `<span>${esc(area.subheading)}</span>` : ''}</h3><i aria-hidden="true"></i><p>${esc(area.copy)}</p><small>${esc(area.screens)}</small></li>`).join('')}</ol></section>
    <aside class="rts-r2630__lifetime">${icon('repeat')}<div><h2>${esc(page.lifetime.heading)}</h2><p>${esc(page.lifetime.copy)}</p></div><a href="${esc(page.actionRoute)}">${esc(page.action)} →</a></aside><p class="rts-r2630__landing-close">${esc(page.close)}</p>
  </article>`;
}

function render(page) {
  if (!page || ![26, 27, 28, 29, 30].includes(page.number)) throw new RangeError('Page is outside range 26–30');
  const tall = page.number === 28 || page.number === 29 ? ' rts-r2630--legacy-tall' : '';
  const body = ({26: page26, 27: page27, 28: page28, 29: page29, 30: page30})[page.number](page);
  return `<div class="rts-r2630 rts-r2630--p${page.number}${tall}">${header()}<main class="rts-r2630__shell">${rail(page)}${body}</main></div>`;
}

module.exports = render;
