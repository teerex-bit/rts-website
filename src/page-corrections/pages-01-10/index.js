const page07 = require('../../pages-03-10/page-07');
const awakenPages = [3, 4, 5, 6].map(number => require(`../../pages-03-10/page-${String(number).padStart(2, '0')}`));

const esc = value => String(value).replace(/[&<>]/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}[character]));

const stages = [
  ['Awaken', 'Discover What is Possible', '/awaken/', 'awaken'],
  ['See Clearly', 'Discover What is True', '/see-clearly/', 'see'],
  ['Become', 'The Inner Person is Reordered', '/become/', 'become'],
  ['Join', 'Participate in What God is Doing', '/join/', 'join']
];

function renderStageLinks(active, className) {
  return stages.map(([name, description, href, icon]) => `<a data-stage="${esc(name)}" class="${name === active ? 'is-active' : ''}" href="${href}"${name === active ? ' aria-current="step"' : ''}><img src="/assets/icon-${icon}.svg" alt=""><span><strong>${esc(name)}</strong><small>${esc(description)}</small></span></a>`).join('');
}

function renderPage02() {
  const outcomes = [
    ['formation', 'Discover how formation happens in visible and invisible ways.'],
    ['notice', 'Learn to notice what happens inside you in real life.'],
    ['leaf', 'Take your first step in the journey of transformation with God.']
  ];
  const routes = ['/awaken/pay-attention/', '/awaken/name-your-desire/', '/awaken/listen-within/', '/awaken/practice-presence/'];
  const steps = awakenPages.map((page, index) => ({ title: page.title, href: routes[index] }));
  return `<div class="p02-awaken" data-page-number="02" data-editable-source="pages-01-10-corrections">
    <header class="p02-top"><a class="p02-brand" href="/" aria-label="Reforming the Soul home"><span class="p02-brand__mark" aria-hidden="true"><img src="/assets/page-awaken/curriculum-logo.png" alt=""></span><span class="p02-brand__type"><strong>Reforming</strong><span><em class="p02-brand__the">the</em> <em class="p02-brand__soul">Soul</em></span></span></a><nav aria-label="Account navigation"><a href="/review/">Dashboard</a><a href="/review/">My Journey</a><a href="/coming-soon/">Resources</a><a href="/coming-soon/">Notes</a><span class="p02-account" aria-label="Account"><svg aria-hidden="true"><use href="/assets/page-awaken/icons.svg#account"></use></svg></span></nav></header>
    <main class="p02-shell">
      <aside class="p02-rail"><p>The Formation Journey</p><nav aria-label="Formation journey">${renderStageLinks('Awaken')}</nav></aside>
      <section class="p02-main">
        <section class="p02-hero" aria-labelledby="p02-title"><div><p>Awaken 1</p><h1 id="p02-title">You Have Already Been Formed</h1><p>Before we can be re-formed into Christlikeness,<br>we must first recognize that we have already<br>been formed.</p><a href="/awaken/pay-attention/">Begin Lesson <span aria-hidden="true">→</span></a></div></section>
        <section class="p02-outcomes" aria-label="In this lesson you will"><h2>In This Lesson You Will</h2><div>${outcomes.map(([icon, copy]) => `<article><span aria-hidden="true"><svg><use href="/assets/page-awaken/icons.svg#${icon}"></use></svg></span><p>${esc(copy)}</p></article>`).join('')}</div></section>
        <blockquote class="p02-quote"><span aria-hidden="true">“</span><p>Everyone’s spirit has already been formed. Its present character has come to be through the experiences and choices of a lifetime.</p><cite>— Dallas Willard</cite></blockquote>
        <aside class="p02-progress" aria-label="Your progress"><h2>Your Progress</h2><p>Awaken 1 of 7</p><progress max="7" value="1">Awaken 1 of 7</progress><ol>${steps.map((step, index) => `<li class="p02-progress__step ${index === 0 ? 'is-current' : ''}"><a href="${step.href}"><span>${index + 1}</span>${esc(step.title)}</a></li>`).join('')}</ol></aside>
      </section>
    </main>
  </div>`;
}

const conceptIcons = {
  person: '●', heart: '♥', search: '⌕', sign: '†', leaf: '❧', eye: '◉'
};

function renderPage07SideCards() {
  return page07.sideCards.map(card => `<section class="p07-side-card"><h2>${esc(card.title)}</h2>${(card.paragraphs || []).map(text => `<p>${esc(text)}</p>`).join('')}${card.quote ? `<blockquote>${esc(card.quote)}${card.quoteBy ? `<cite>— ${esc(card.quoteBy)}</cite>` : ''}</blockquote>` : ''}${card.items ? `<ul>${card.items.map((item, index) => `<li><span aria-hidden="true">${['◉', '⌕', '♥', '❧'][index % 4]}</span>${esc(item)}</li>`).join('')}</ul>` : ''}</section>`).join('');
}

function renderPage07() {
  return `<div class="p07-overview" data-page-number="07" data-editable-source="pages-01-10-corrections">
    <header class="p07-top"><a href="/" aria-label="Reforming the Soul home"><img src="/assets/logo.svg" alt="Reforming the Soul"></a><nav aria-label="Formation stages">${stages.map(([name, , href]) => `<a class="${name === page07.activeStage ? 'is-active' : ''}" href="${href}">${esc(name)}</a>`).join('')}</nav><div><a href="/review/">Dashboard</a><a href="/review/">My Journey</a><a href="/coming-soon/">Resources</a><a href="/coming-soon/">Notes</a><span aria-label="Account">●</span></div></header>
    <main class="p07-shell">
      <aside class="p07-rail"><p>The Formation Journey</p><nav aria-label="Formation journey">${renderStageLinks(page07.activeStage)}</nav><section><h2>Your Progress</h2><p>${esc(page07.progressLabel)}</p><progress max="${page07.progressMax}" value="${page07.progress}">${esc(page07.progressLabel)}</progress></section><aside><strong><span aria-hidden="true">?</span> Need help?</strong><p>We’re here if you have questions along the way.</p><a href="/coming-soon/">Contact Support →</a></aside></aside>
      <section class="p07-work">
        <article class="p07-main">
          <section class="p07-hero" aria-labelledby="p07-title"><div><p>${esc(page07.courseLabel)} <span aria-hidden="true">•</span> ${esc(page07.lessonLabel)}</p><h1 id="p07-title">${esc(page07.title)}</h1><i aria-hidden="true"></i>${page07.introduction.map((line, index) => `<p class="${index === 0 || index === 2 ? 'is-emphasis' : ''}">${esc(line)}</p>`).join('')}<a href="/see-clearly/your-formation/">Begin This Phase <span aria-hidden="true">→</span></a></div></section>
          <section class="p07-outcomes" aria-label="In this phase you will"><h2>In This Phase You Will</h2><div>${page07.outcomes.map((outcome, index) => `<article><span aria-hidden="true">${['●', '◌', '❧'][index]}</span><p>${esc(outcome)}</p></article>`).join('')}</div></section>
          <section class="p07-journey"><h2>${esc(page07.journeyTitle)}</h2><div>${page07.cards.map((card, index) => `<article><span aria-hidden="true">${conceptIcons[card[0]] || '•'}</span><h3>${esc(card[1])}</h3><p>${esc(card[2])}</p></article>${index < page07.cards.length - 1 ? '<b aria-hidden="true">→</b>' : ''}`).join('')}</div></section>
          <blockquote class="p07-quote">${esc(page07.note[0])}</blockquote>
        </article>
        <aside class="p07-aside">${renderPage07SideCards()}</aside>
      </section>
    </main>
  </div>`;
}

const patches = new Map([
  [2, { mode: 'replace', render: renderPage02 }],
  [6, { mode: 'merge', data: { continueLabel: 'I’ve Noticed Something I’m Ready to Look At' } }],
  [7, { mode: 'replace', render: renderPage07 }]
]);

const css = `
/* Pages 01–10 final-review corrections. All selectors are page-specific. */
.home-actions .outline,.home-closing .button{display:none}
@media (min-width:1181px){
  .course-top:has(+.formation-course-page[data-page-number]){position:relative;height:104px;grid-template-columns:268px minmax(0,1fr) 342px;padding-left:300px}
  .course-top:has(+.formation-course-page[data-page-number]):before{content:"";position:absolute;left:24px;top:15px;width:218px;height:74px;background:url('/assets/logo.svg') left center/contain no-repeat}
  .formation-course-page[data-page-number]{grid-template-columns:268px minmax(0,1fr) 342px;min-height:calc(100vh - 104px)}
  .formation-course-page[data-page-number] .course-hero>p{display:none}
  .formation-course-page[data-page-number] .course-hero{padding-top:10px}
  .formation-course-page[data-page-number] .course-aside__image{height:218px}
  .formation-course-page[data-page-number] .course-aside__leaf{top:192px}
  .formation-course-page[data-page-number="05"] .course-card-grid,
  .formation-course-page[data-page-number="06"] .course-card-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
  .formation-course-page[data-page-number="05"] .course-card,
  .formation-course-page[data-page-number="06"] .course-card{min-height:206px;padding:13px 10px}
  .formation-course-page[data-page-number="06"]{font-size:13px;line-height:1.43}
  .formation-course-page[data-page-number="06"] .course-content{padding-bottom:10px}
  .formation-course-page[data-page-number="06"] .course-hero{padding-bottom:8px}
  .formation-course-page[data-page-number="06"] .course-hero h1{font-size:3.25rem}
  .formation-course-page[data-page-number="06"] .course-callout{margin:8px 0 12px;padding:12px 18px}
  .formation-course-page[data-page-number="06"] .course-section-heading{margin:8px 0}
  .formation-course-page[data-page-number="06"] .course-card{min-height:164px}
  .formation-course-page[data-page-number="06"] .course-card .course-symbol{width:52px;height:52px}
  .formation-course-page[data-page-number="06"] .notice-form{margin-top:10px;padding:12px}
  .formation-course-page[data-page-number="06"] .notice-form__prompts{margin-top:10px}
  .formation-course-page[data-page-number="06"] .notice-form__prompts label{min-height:116px;padding:9px}
  .formation-course-page[data-page-number="06"] .course-aside__cards{gap:8px;padding-top:22px}
  .formation-course-page[data-page-number="06"] .course-side-card{padding:13px 16px}
  .formation-course-page[data-page-number="06"] .course-side-card ul{gap:6px}
  .formation-course-page[data-page-number="06"] .lesson-navigation{margin-top:10px;padding-top:10px}
  .formation-course-page[data-page-number="08"] .course-body{display:flex;flex-direction:column}
  .formation-course-page[data-page-number="08"] .course-section-heading{order:1}
  .formation-course-page[data-page-number="08"] .course-card-grid{order:2}
  .formation-course-page[data-page-number="08"] .course-secondary-title{order:3}
  .formation-course-page[data-page-number="08"] .course-callout--note{order:4}
  .formation-course-page[data-page-number="08"] .lesson-navigation{order:5}
  .formation-course-page[data-page-number="08"] .course-callout--note .course-symbol:before{content:'◉'}
}
.p02-awaken,.p07-overview{min-height:100vh;color:#092039;background:#fbf8f2;font-family:var(--sans)}
.p02-top,.p07-top{height:96px;display:flex;align-items:center;justify-content:space-between;padding:12px 40px;background:#fffdfa;border-bottom:1px solid #e2ddd4}
.p02-brand{display:flex;align-items:center;gap:10px;color:#092039;text-decoration:none}
.p02-brand__mark{display:block;width:68px;height:67px;overflow:hidden;flex:0 0 68px}
.p02-brand__mark img{display:block;width:196px;height:67px;max-width:none}
.p02-brand__type{display:flex;flex-direction:column;font-family:var(--serif);line-height:.95}
.p02-brand__type strong{font-size:1.55rem;font-weight:400;letter-spacing:.04em;text-transform:uppercase}
.p02-brand__type>span{display:flex;align-items:baseline;gap:7px;margin-left:12px}
.p02-brand__the{font:italic 1.05rem var(--serif)}
.p02-brand__soul{font:italic 2rem/1 'RTS Script',cursive;text-transform:none}
.p07-top>a img{display:block;width:220px}
.p02-top nav,.p07-top nav,.p07-top>div{display:flex;align-items:center;gap:36px}
.p02-top nav a,.p07-top a{font-size:.76rem;text-decoration:none}
.p02-top nav span,.p07-top>div span{display:grid;place-items:center;width:34px;height:34px;color:#fff;background:#0b253a;border-radius:50%}
.p02-account svg{width:25px;height:25px;fill:#fff;stroke:#fff;stroke-width:2}
.p02-shell{display:grid;grid-template-columns:300px 1fr;min-height:calc(100vh - 96px)}
.p02-rail,.p07-rail{color:#fff;background:linear-gradient(160deg,#06223a,#082e4d 65%,#061d31)}
.p02-rail{padding:28px 24px}
.p02-rail>p,.p07-rail>p{margin:0 0 24px;color:#d6a740;font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.p02-rail nav,.p07-rail nav{display:grid;gap:11px}
.p02-rail nav{gap:22px}
.p02-rail nav>a,.p07-rail nav>a{display:grid;grid-template-columns:56px 1fr;gap:13px;align-items:center;padding:14px 12px;color:#fff;border-radius:8px;text-decoration:none}
.p02-rail nav>a.is-active,.p07-rail nav>a.is-active{background:linear-gradient(135deg,#78925b,#627d48)}
.p02-rail nav img,.p07-rail nav img{width:48px;height:48px;filter:brightness(0) invert(1)}
.p02-rail nav strong,.p02-rail nav small,.p07-rail nav strong,.p07-rail nav small{display:block}
.p02-rail nav strong,.p07-rail nav strong{font-size:.82rem;letter-spacing:.06em;text-transform:uppercase}
.p02-rail nav small,.p07-rail nav small{font-size:.74rem;line-height:1.4}
.p02-main{position:relative;min-width:0;background:#fffdfa}
.p02-hero{min-height:475px;padding:54px 54px;background:#e8dfce url('/assets/page-awaken/awaken-sunrise-path.png') center/cover no-repeat}
.p02-hero>div{width:54%;min-height:360px;padding:0 45px 30px 0}
.p02-hero>div>p:first-child{margin:0;color:#5f7547;font-size:1.05rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.p02-hero h1{margin:9px 0;color:#092039;font:400 clamp(3.4rem,4.2vw,4.8rem)/.98 var(--serif)}
.p02-hero>div>p:nth-of-type(2){font-size:1rem;line-height:1.55}
.p02-hero a,.p07-hero a{display:inline-flex;gap:22px;align-items:center;margin-top:7px;padding:10px 26px;color:#fff;background:#637f49;border-radius:999px;text-decoration:none}
.p02-outcomes{padding:23px 350px 24px 50px;border-bottom:1px solid #ddd6ca}
.p02-outcomes h2,.p07-outcomes h2,.p07-journey h2{margin:0 0 13px;color:#526a3e;font-size:.75rem;letter-spacing:.1em;text-transform:uppercase}
.p02-outcomes>div{display:grid;grid-template-columns:repeat(3,1fr)}
.p02-outcomes article{display:grid;grid-template-columns:46px 1fr;gap:13px;align-items:center;padding:4px 22px;border-right:1px solid #ded7cc}
.p02-outcomes article:last-child{border:0}
.p02-outcomes article>span{display:grid;place-items:center;width:42px;height:42px;color:#fff;background:#6b7750;border-radius:50%}
.p02-outcomes article svg{width:29px;height:29px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.p02-outcomes article:first-child svg{fill:currentColor;stroke:none}
.p02-outcomes article p{margin:0;font-size:.72rem;line-height:1.45}
.p02-quote{display:grid;grid-template-columns:34px 1fr;max-width:760px;margin:24px 360px 0 50px;padding:20px 30px;color:#28341f;background:transparent;border:0;border-top:1px solid #d9d1c4;font:italic 1rem/1.65 var(--serif)}
.p02-quote>span{color:#aab38e;font:700 3.3rem/1 var(--serif)}
.p02-quote p{margin:0}
.p02-quote cite{display:block;margin-top:10px;color:#5c7444;font:700 .68rem var(--sans);letter-spacing:.12em;text-transform:uppercase}
.p02-quote cite{grid-column:2}
.p02-progress{position:absolute;right:30px;top:385px;width:300px;padding:24px;background:#fffdfa;border:1px solid #dfd8cd;border-radius:10px;box-shadow:0 12px 30px #13283a22}
.p02-progress h2{margin:0;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase}
.p02-progress p{margin:10px 0 0;font-size:.8rem}
.p02-progress progress{height:8px;margin:10px 0 15px}
.p02-progress ol{display:grid;gap:8px;margin:0;padding:0;list-style:none}
.p02-progress li{font-size:.7rem}
.p02-progress li a{display:grid;grid-template-columns:25px 1fr;gap:8px;align-items:center;color:inherit;text-decoration:none}
.p02-progress li span{display:grid;place-items:center;width:23px;height:23px;border:1px solid #74816c;border-radius:50%}
.p02-progress li.is-current span{color:#fff;background:#667e4e}
.p07-top{height:84px;padding:8px 28px}
.p07-top>a img{width:210px}
.p07-top nav{gap:42px}
.p07-top nav a{padding:25px 5px 17px;border-bottom:2px solid transparent}
.p07-top nav a.is-active{color:#145ca7;border-color:#145ca7;font-weight:700}
.p07-top>div{gap:27px}
.p07-shell{display:grid;grid-template-columns:268px 1fr;min-height:calc(100vh - 84px)}
.p07-rail{display:flex;flex-direction:column;padding:28px 20px 20px}
.p07-rail nav>a.is-active{background:linear-gradient(135deg,#145ca7,#2878c5)}
.p07-rail>section{margin-top:auto;padding-top:20px;border-top:1px solid #ffffff2a}
.p07-rail>section h2{margin:0;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}
.p07-rail>section p{margin:9px 0;font-size:.8rem}
.p07-rail>section progress{height:7px;margin:0}
.p07-rail>aside{margin-top:22px;padding:15px 17px;border:1px solid #ffffff25;border-radius:9px}
.p07-rail>aside strong{font-size:.8rem}.p07-rail>aside p,.p07-rail>aside a{font-size:.72rem}.p07-rail>aside a{color:#51b6f2}
.p07-work{display:grid;grid-template-columns:minmax(0,1fr) 318px;min-width:0}
.p07-main{min-width:0;background:#fffdfa}
.p07-hero{min-height:530px;padding:42px 38px;background:#dfe6e0 url('/assets/page-see-clearly/path-figure.svg') center/cover no-repeat}
.p07-hero>div{width:48%;min-height:446px;padding:0 70px 18px 0;background:linear-gradient(90deg,#fffdfa 0%,rgba(255,253,250,.95) 76%,transparent 100%)}
.p07-hero>div>p:first-child{margin:0;color:#145ca7;font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.p07-hero h1{margin:13px 0 6px;color:#092039;font:400 clamp(3.4rem,4.4vw,5rem)/.96 var(--serif)}
.p07-hero i{display:block;width:58px;margin:19px 0;border-top:2px solid #c48a25}
.p07-hero>div>p:not(:first-child){margin:8px 0;font-size:.9rem;line-height:1.52}
.p07-hero>div>p.is-emphasis{font-weight:700}
.p07-hero a{background:#145ca7}
.p07-outcomes{padding:17px 30px 12px}
.p07-outcomes h2,.p07-journey h2{color:#145ca7;text-align:center}
.p07-outcomes>div{display:grid;grid-template-columns:repeat(3,1fr)}
.p07-outcomes article{display:grid;grid-template-columns:48px 1fr;gap:12px;align-items:center;padding:4px 15px;border-right:1px solid #ddd6cb}
.p07-outcomes article:last-child{border:0}
.p07-outcomes article>span,.p07-journey article>span{display:grid;place-items:center;width:43px;height:43px;color:#fff;background:#145ca7;border-radius:50%}
.p07-outcomes article p{margin:0;font-size:.66rem;line-height:1.4}
.p07-journey{padding:0 30px 10px}
.p07-journey>h2{display:flex;align-items:center;gap:15px;margin:3px 0 8px}.p07-journey>h2:before,.p07-journey>h2:after{content:"";flex:1;border-top:1px solid #ded6ca}
.p07-journey>div{display:flex;align-items:flex-start;justify-content:space-between}
.p07-journey article{width:16%;text-align:center}.p07-journey article>span{margin:auto}.p07-journey article:nth-of-type(2) span,.p07-journey article:nth-of-type(4) span{background:#53713b}.p07-journey article:nth-of-type(3) span{background:#0c3b68}
.p07-journey article h3{margin:6px 0 2px;font-size:.62rem;text-transform:uppercase}.p07-journey article p{margin:0;font-size:.58rem;line-height:1.35}.p07-journey b{padding-top:12px;color:#c68b24;font-size:1.3rem;font-weight:400}
.p07-quote{margin:0;padding:14px 40px;color:#fff;background:#092e52;border:0;font:italic 1.05rem/1.5 var(--serif)}
.p07-aside{display:grid;align-content:start;gap:12px;padding:8px 12px;background:#f4f0e9}
.p07-side-card{padding:18px 20px;background:#fffdfa;border:1px solid #e2dbd1;border-radius:9px}
.p07-side-card h2{margin:0 0 11px;font-size:.7rem;letter-spacing:.08em;text-align:center;text-transform:uppercase}
.p07-side-card p,.p07-side-card li{font-size:.69rem;line-height:1.5}
.p07-side-card blockquote{margin:0;padding:7px 4px;border:0;background:transparent;font:italic .78rem/1.55 var(--serif)}
.p07-side-card cite{display:block;margin-top:8px;color:#145ca7;font:700 .6rem var(--sans);letter-spacing:.06em;text-transform:uppercase}
.p07-side-card ul{display:grid;gap:9px;margin:0;padding:0;list-style:none}.p07-side-card li{display:grid;grid-template-columns:35px 1fr;gap:9px;align-items:start}.p07-side-card li>span{font-size:1.35rem;color:#145ca7}
@media (max-width:1180px){
  .p02-shell,.p07-shell{grid-template-columns:220px 1fr}.p02-rail nav>a,.p07-rail nav>a{grid-template-columns:38px 1fr;padding:10px 5px}.p02-rail nav img,.p07-rail nav img{width:36px}.p07-top>div a:nth-child(-n+2){display:none}.p07-work{grid-template-columns:minmax(0,1fr) 270px}.p07-hero>div{width:60%}
}
@media (max-width:900px){
  .p02-top,.p07-top{height:auto;min-height:72px;padding:10px 20px}.p02-top nav a,.p07-top>div a{display:none}.p07-top nav{gap:16px}.p02-shell,.p07-shell{grid-template-columns:1fr}.p02-rail,.p07-rail{padding:18px}.p02-rail nav,.p07-rail nav{grid-template-columns:repeat(4,1fr)}.p02-main{display:flex;flex-direction:column}.p02-progress{position:relative;right:auto;top:auto;width:auto;margin:18px;order:4}.p02-outcomes{padding-right:50px}.p02-quote{margin-right:50px}.p07-work{grid-template-columns:1fr}.p07-aside{grid-template-columns:1fr 1fr}.p07-hero>div{width:70%}
}
@media (max-width:620px){
  .p02-brand{gap:5px}.p02-brand__mark{width:55px;height:55px;flex-basis:55px}.p02-brand__mark img{width:161px;height:55px}.p02-brand__type strong{font-size:1.1rem}.p02-brand__the{font-size:.85rem}.p02-brand__soul{font-size:1.55rem}.p07-top>a img{width:165px}.p07-top nav{display:none}.p02-rail nav,.p07-rail nav{grid-template-columns:1fr 1fr}.p02-hero{min-height:620px;padding:30px 22px;background-position:63% center}.p02-hero>div,.p07-hero>div{width:100%;padding:25px;background:rgba(255,253,248,.94)}.p02-hero h1,.p07-hero h1{font-size:3rem}.p02-outcomes{padding:22px}.p02-outcomes>div{grid-template-columns:1fr}.p02-outcomes article{border-right:0;border-bottom:1px solid #ded7cc}.p02-quote{margin:18px 22px}.p07-hero{padding:25px 20px}.p07-outcomes>div{grid-template-columns:1fr}.p07-journey>div{display:grid;grid-template-columns:1fr}.p07-journey article{width:100%}.p07-journey b{margin:auto;transform:rotate(90deg)}.p07-aside{grid-template-columns:1fr}
}`;

module.exports = { patches, css };
