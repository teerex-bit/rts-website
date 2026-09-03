module.exports = String.raw`
.rts-r31-35 {
  --r31-ink: #071d3e;
  --r31-blue: #05284d;
  --r31-violet: #2d0b88;
  --r31-gold: #d99a1d;
  --r31-copper: #7c3b0e;
  --r31-green: #294d22;
  --r31-paper: #fbfaf7;
  min-height: 100vh;
  color: var(--r31-ink);
  background: var(--r31-paper);
  font-family: Inter, Avenir, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.42;
}
.rts-r31-35 *, .rts-r31-35 *::before, .rts-r31-35 *::after { box-sizing: border-box; }
.rts-r31-35 a { color: inherit; text-decoration: none; }
.rts-r31-35 p, .rts-r31-35 h1, .rts-r31-35 h2, .rts-r31-35 h3, .rts-r31-35 ul, .rts-r31-35 ol, .rts-r31-35 dl, .rts-r31-35 blockquote { margin-top: 0; }
.rts-r31-35__site-header {
  height: 80px;
  display: grid;
  grid-template-columns: 280px 1fr auto 42px;
  align-items: center;
  gap: 24px;
  padding: 0 24px 0 20px;
  border-bottom: 1px solid #e2ddd6;
  background: rgba(253, 252, 249, .97);
}
.rts-r31-35__brand { display: flex; align-items: center; gap: 12px; font-family: Georgia, serif; letter-spacing: .11em; font-size: 22px; line-height: .93; }
.rts-r31-35__brand img { width: 60px; height: 60px; }
.rts-r31-35__brand span { display: grid; grid-template-columns: auto auto; column-gap: 7px; }
.rts-r31-35__brand b { grid-column: 1 / -1; font-size: 16px; }
.rts-r31-35__brand i { font-size: 26px; letter-spacing: .02em; }
.rts-r31-35__site-header > nav { display: flex; height: 100%; justify-content: center; gap: clamp(38px, 7vw, 105px); }
.rts-r31-35__site-header > nav a { position: relative; display: grid; place-items: center; text-transform: uppercase; font-weight: 800; font-size: 14px; }
.rts-r31-35__site-header > nav a.is-active { color: var(--r31-violet); }
.rts-r31-35__site-header > nav a.is-active::after { content: ""; position: absolute; bottom: 10px; width: 78px; height: 2px; background: var(--r31-violet); }
.rts-r31-35__site-header > nav a.is-active::before { content: ""; position: absolute; bottom: 20px; width: 6px; height: 6px; border-radius: 50%; background: var(--r31-violet); }
.rts-r31-35__conversation { min-width: 220px; border: 1.5px solid var(--r31-violet); border-radius: 24px; padding: 11px 20px; text-align: center; text-transform: uppercase; color: var(--r31-violet)!important; font-weight: 800; letter-spacing: .02em; }
.rts-r31-35__account { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--r31-ink); color: white!important; font-size: 20px; }
.rts-r31-35__shell { display: grid; grid-template-columns: 270px minmax(0, 1fr); min-height: calc(100vh - 80px); }
.rts-r31-35__rail { display: flex; flex-direction: column; padding: 26px 17px 22px; color: #fff; background: radial-gradient(circle at 30% 15%, #123860 0, #062847 35%, #031b35 100%); }
.rts-r31-35__rail-title { margin: 0 5px 12px; color: #ffc130; font-size: 15px; letter-spacing: .04em; text-transform: uppercase; }
.rts-r31-35__rail nav { display: grid; gap: 10px; }
.rts-r31-35__rail nav a { min-height: 72px; display: grid; grid-template-columns: 42px 1fr 22px; align-items: start; gap: 8px; padding: 12px 8px; border-radius: 10px; }
.rts-r31-35__rail nav a.is-active { min-height: 132px; background: linear-gradient(120deg, #38307d, #33206d 75%, #3a2c7c); }
.rts-r31-35__rail-icon { color: #f5c35b; font-size: 33px; line-height: 1; text-align: center; }
.rts-r31-35__rail nav b { display: block; margin-bottom: 4px; font-size: 15px; font-weight: 600; text-transform: uppercase; }
.rts-r31-35__rail nav small { display: block; font-size: 13px; line-height: 1.7; }
.rts-r31-35__rail nav i { display: grid; place-items: center; align-self: center; width: 21px; height: 21px; border-radius: 50%; background: #e5a126; font-style: normal; font-size: 12px; }
.rts-r31-35__support { margin-top: auto; padding: 20px 25px; border: 1px solid rgba(184, 168, 236, .25); border-radius: 10px; }
.rts-r31-35__support h2 { margin-bottom: 12px; font-size: 15px; font-weight: 500; }
.rts-r31-35__support h2 span { display: inline-grid; place-items: center; width: 26px; height: 26px; margin-right: 10px; border: 1px solid white; border-radius: 50%; }
.rts-r31-35__support p { line-height: 1.65; }
.rts-r31-35__support a { color: #ffc130; }
.rts-r31-35__main { min-width: 0; padding: 20px 26px 16px 30px; background: radial-gradient(circle at 60% 15%, #fff 0, #faf8f4 70%, #f7f4ef 100%); }
.rts-r31-35__hero { position: relative; min-height: 114px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(250px, 420px); gap: 20px; align-items: start; margin-bottom: 12px; }
.rts-r31-35__hero--scenic { min-height: 250px; grid-template-columns: minmax(490px, 1.35fr) minmax(420px, .9fr); margin: -20px -26px 10px -30px; padding: 20px 26px 18px 30px; overflow: hidden; }
.rts-r31-35__hero-copy { position: relative; z-index: 2; }
.rts-r31-35__kicker { margin-bottom: 6px; color: #190c78; font-weight: 800; letter-spacing: .035em; text-transform: uppercase; }
.rts-r31-35__title-line { display: flex; align-items: center; gap: 24px; }
.rts-r31-35__title-line h1 { margin-bottom: 5px; font-family: Georgia, serif; font-size: clamp(44px, 4.2vw, 64px); line-height: 1; font-weight: 500; letter-spacing: -.035em; }
.rts-r31-35--page-33 .rts-r31-35__title-line h1 { font-size: clamp(40px, 3.8vw, 58px); }
.rts-r31-35--page-35 .rts-r31-35__title-line h1 { max-width: 560px; font-size: clamp(42px, 4vw, 60px); line-height: 1.05; }
.rts-r31-35__title-line > p { max-width: 360px; margin-bottom: 0; padding-left: 23px; border-left: 1px solid #d6c1a8; color: #5d2e0d; font-family: Georgia, serif; font-size: 21px; line-height: 1.2; font-weight: 600; }
.rts-r31-35__intro { max-width: 780px; margin: 10px 0 5px; font-size: 16px; line-height: 1.55; }
.rts-r31-35__statement { max-width: 790px; margin: 5px 0 0; color: #211182; font-size: 15px; font-weight: 700; line-height: 1.55; white-space: pre-line; }
.rts-r31-35__hero-note { position: relative; z-index: 3; display: flex; gap: 14px; align-items: flex-start; min-width: 250px; margin-top: 22px; padding: 18px; border-radius: 10px; background: rgba(243, 240, 240, .92); box-shadow: 0 8px 24px rgba(25, 15, 52, .04); color: #17116e; }
.rts-r31-35__hero-note > span { font-family: Georgia, serif; font-size: 27px; line-height: 1; }
.rts-r31-35__hero-note p { margin: 0; line-height: 1.6; }
.rts-r31-35__hero--scenic .rts-r31-35__hero-note { position: absolute; right: 385px; bottom: 15px; max-width: 185px; padding: 14px; font-style: italic; }
.rts-r31-35__scenic { position: absolute; z-index: 1; top: 0; right: 0; width: 46%; height: 100%; overflow: hidden; background: linear-gradient(145deg, #f5ddae, #cc8a40 55%, #345235); }
.rts-r31-35__scenic::before, .rts-r31-35__scenic::after { content: ""; position: absolute; }
.rts-r31-35__scenic::before { inset: 0; background: radial-gradient(circle at 50% 45%, #fff8c5 0 5%, transparent 6%), linear-gradient(160deg, transparent 43%, rgba(30, 59, 50, .48) 44% 57%, transparent 58%); }
.rts-r31-35__scenic::after { inset: auto -5% -25% -8%; height: 62%; border-radius: 50% 50% 0 0; background: linear-gradient(#5f745e, #1e3d30); transform: rotate(-5deg); }
.rts-r31-35__scenic--lake { background: linear-gradient(165deg, #f6d6a3 0 36%, #fef1c8 37% 48%, #c89656 49% 58%, #4b382a 59%); }
.rts-r31-35__scenic--conversation { background: linear-gradient(145deg, #bfca84, #48663c 45%, #172d2b); }
.rts-r31-35__scenic--conversation::after { width: 46%; height: 70%; left: 11%; bottom: -10%; border-radius: 50% 50% 10% 10%; background: radial-gradient(circle at 50% 18%, #d9c4a0 0 13%, #eee 14% 16%, transparent 17%), linear-gradient(90deg, transparent 20%, #252b2c 21% 80%, transparent 81%); transform: none; }
.rts-r31-35__scenic--mountains { background: linear-gradient(#ffd79a 0 33%, #778b80 34% 54%, #315048 55% 70%, #23352f 71%); }
.rts-r31-35__scenic--orchard { background: linear-gradient(155deg, #f5dfb0, #aab073 46%, #385331); }
.rts-r31-35__scenic--orchard > img { position: absolute; z-index: 2; right: 3%; bottom: -9%; width: 72%; height: 106%; filter: drop-shadow(0 8px 5px rgba(0,0,0,.2)); }
.rts-r31-35__dashboard { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 9px; }
.rts-r31-35__panel { grid-column: span 4; min-width: 0; padding: 14px; border: 1px solid #e5ded5; border-radius: 10px; background: rgba(255, 255, 255, .43); }
.rts-r31-35__panel--wide { grid-column: 1 / -1; }
.rts-r31-35--page-32 .rts-r31-35__panel:not(.rts-r31-35__panel--wide) { grid-column: span 4; }
.rts-r31-35--page-33 .rts-r31-35__panel:not(.rts-r31-35__panel--wide) { grid-column: span 3; }
.rts-r31-35--page-34 .rts-r31-35__panel:not(.rts-r31-35__panel--wide) { grid-column: span 3; }
.rts-r31-35--page-35 .rts-r31-35__panel:not(.rts-r31-35__panel--wide) { grid-column: span 6; }
.rts-r31-35__panel-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.rts-r31-35__panel-header h2 { margin: 0; color: currentColor; font-family: Georgia, serif; font-size: 19px; line-height: 1.15; }
.rts-r31-35__panel-icon { flex: 0 0 43px; display: grid; place-items: center; width: 43px; height: 43px; border-radius: 50%; background: currentColor; color: white; font-family: Georgia, serif; font-size: 24px; }
.rts-r31-35__panel-icon img { width: 30px; height: 30px; filter: brightness(0) invert(1); }
.rts-r31-35__panel--navy { color: #0b2344; }
.rts-r31-35__panel--copper { color: #74370e; }
.rts-r31-35__panel--green { color: #315326; }
.rts-r31-35__panel--violet { color: #2c0b85; }
.rts-r31-35__panel--blue { color: #174d77; }
.rts-r31-35__panel--burgundy { color: #74192b; }
.rts-r31-35__panel--gold { color: #a45d05; }
.rts-r31-35__panel--charcoal { color: #343638; }
.rts-r31-35__panel-lede, .rts-r31-35__panel-body { color: var(--r31-ink); }
.rts-r31-35__panel-lede { margin-bottom: 9px; font-weight: 600; }
.rts-r31-35__panel-body > :last-child { margin-bottom: 0; }
.rts-r31-35__panel-body p { margin-bottom: 8px; }
.rts-r31-35__panel-body ul { margin-bottom: 8px; padding-left: 18px; }
.rts-r31-35__panel-body li { margin-bottom: 3px; }
.rts-r31-35__panel-body blockquote { margin-bottom: 8px; padding: 10px 12px; border-left: 2px solid currentColor; color: #151174; font-family: Georgia, serif; font-size: 14px; font-weight: 600; }
.rts-r31-35__emphasis { color: currentColor; font-weight: 700; }
.rts-r31-35__callout { margin-top: 9px; padding: 10px 12px; border-radius: 9px; background: linear-gradient(110deg, rgba(241, 237, 234, .8), rgba(247, 238, 221, .8)); color: var(--r31-ink); }
.rts-r31-35__callout strong { display: block; margin-bottom: 5px; color: currentColor; text-transform: uppercase; font-size: 11px; }
.rts-r31-35__mini-cards { display: grid; gap: 7px; }
.rts-r31-35__mini-cards article { display: flex; gap: 10px; padding: 9px; border-radius: 9px; background: rgba(239, 236, 231, .68); }
.rts-r31-35__mini-cards h3 { display: inline; margin-right: 4px; color: #315076; font-size: 13px; text-transform: uppercase; }
.rts-r31-35__mini-cards p { display: inline; }
.rts-r31-35__mini-icon { flex: 0 0 38px; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: #315c7d; color: white; font-size: 20px; }
.rts-r31-35__columns { display: grid; gap: 8px; }
.rts-r31-35__columns--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.rts-r31-35__columns--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.rts-r31-35__columns--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.rts-r31-35__columns section { min-width: 0; padding: 8px 10px; border-right: 1px solid #ddd4cb; }
.rts-r31-35__columns section:last-child { border-right: 0; }
.rts-r31-35__columns h3 { margin-bottom: 6px; color: currentColor; font-family: Georgia, serif; font-size: 14px; }
.rts-r31-35__columns ul { margin: 0; padding-left: 15px; }
.rts-r31-35__flow { display: flex; gap: 0; margin-bottom: 8px; padding: 0; list-style: none; }
.rts-r31-35__flow li { position: relative; flex: 1 1 0; min-width: 0; padding: 5px 13px; text-align: center; }
.rts-r31-35__flow li + li::before { content: "→"; position: absolute; top: 24px; left: -7px; color: #9f5a18; font-size: 18px; }
.rts-r31-35__flow li > span { display: grid; place-items: center; width: 45px; height: 45px; margin: 0 auto 5px; }
.rts-r31-35__flow img { max-width: 42px; max-height: 42px; }
.rts-r31-35__flow h3 { margin-bottom: 2px; color: currentColor; font-size: 12px; text-transform: uppercase; }
.rts-r31-35__flow p { margin: 0; font-size: 11px; }
.rts-r31-35__questions { display: grid; grid-template-columns: repeat(auto-fit, minmax(105px, 1fr)); }
.rts-r31-35__questions section { min-width: 0; padding: 6px 9px; border-right: 1px solid #ddd4ca; text-align: center; }
.rts-r31-35__questions section:last-child { border-right: 0; }
.rts-r31-35__questions > section > span { display: block; margin-bottom: 3px; color: currentColor; font-size: 23px; }
.rts-r31-35__questions h3 { margin-bottom: 3px; font-size: 11px; }
.rts-r31-35__questions p { margin: 0; font-size: 10px; }
.rts-r31-35__terms, .rts-r31-35__pairs { margin-bottom: 8px; }
.rts-r31-35__terms div, .rts-r31-35__pairs div { display: grid; grid-template-columns: 90px 1fr; gap: 8px; margin-bottom: 4px; }
.rts-r31-35__terms dt { color: currentColor; font-weight: 800; text-transform: uppercase; font-size: 10px; }
.rts-r31-35__terms dd, .rts-r31-35__pairs dd { margin: 0; }
.rts-r31-35__pairs div { grid-template-columns: 1fr 1.2fr; font-size: 10px; }
.rts-r31-35__pairs dt { font-weight: 500; }
.rts-r31-35__pairs dd span { margin-right: 8px; }
.rts-r31-35__pager { display: grid; grid-template-columns: minmax(200px, auto) 1fr minmax(300px, auto); gap: 18px; align-items: center; min-height: 64px; margin-top: 10px; }
.rts-r31-35__pager > a { display: flex; align-items: center; min-height: 50px; padding: 0 18px; border: 1px solid #d4cae1; border-radius: 9px; text-transform: uppercase; font-weight: 700; }
.rts-r31-35__pager-previous { gap: 12px; }
.rts-r31-35__pager-next { justify-content: space-between; gap: 24px; color: white!important; background: linear-gradient(110deg, #37108b, #21056e); font-size: 15px; }
.rts-r31-35__pager ol { display: flex; align-items: center; justify-content: center; gap: 30px; margin: 0; padding: 0; list-style: none; }
.rts-r31-35__pager ol li { position: relative; z-index: 1; display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: #eceae8; color: #666; font-weight: 700; }
.rts-r31-35__pager ol li + li::before { content: ""; position: absolute; z-index: -1; top: 17px; right: 36px; width: 31px; height: 2px; background: #d5d1d2; }
.rts-r31-35__pager ol li.is-complete { background: #35118c; color: white; }
.rts-r31-35__pager ol li.is-current { border: 2px solid #35118c; background: white; color: #20106d; }
.rts-r31-35--page-33, .rts-r31-35--page-34, .rts-r31-35--page-35 { font-size: 12px; }
.rts-r31-35--page-33 .rts-r31-35__main, .rts-r31-35--page-34 .rts-r31-35__main, .rts-r31-35--page-35 .rts-r31-35__main { padding-top: 12px; }
.rts-r31-35--page-33 .rts-r31-35__hero--scenic, .rts-r31-35--page-34 .rts-r31-35__hero--scenic, .rts-r31-35--page-35 .rts-r31-35__hero--scenic { min-height: 298px; margin-top: -12px; padding-top: 18px; }
.rts-r31-35--page-33 .rts-r31-35__panel, .rts-r31-35--page-34 .rts-r31-35__panel { padding: 10px; }
.rts-r31-35--page-33 .rts-r31-35__panel-header h2, .rts-r31-35--page-34 .rts-r31-35__panel-header h2 { font-size: 16px; }
.rts-r31-35--page-34 .rts-r31-35__flow p { font-size: 9px; }
.rts-r31-35--page-34 .rts-r31-35__flow h3 { font-size: 10px; }
@media (min-width: 1181px) {
  .rts-r31-35--page-34 .rts-r31-35__dashboard { position: relative; }
  .rts-r31-35--page-34 .rts-r31-35__panel:nth-child(5) { min-height: 206px; padding-right: 322px; }
  .rts-r31-35--page-34 .rts-r31-35__panel:nth-child(7) { position: absolute; z-index: 2; top: 286px; right: 10px; width: 300px; min-height: 190px; background: rgba(251, 249, 247, .96); box-shadow: 0 8px 24px rgba(21, 13, 60, .05); }
}
@media (max-width: 1180px) {
  .rts-r31-35__site-header { grid-template-columns: 220px 1fr auto; gap: 14px; }
  .rts-r31-35__site-header > nav { gap: 30px; }
  .rts-r31-35__account { display: none; }
  .rts-r31-35__shell { grid-template-columns: 220px minmax(0, 1fr); }
  .rts-r31-35__rail { padding-inline: 10px; }
  .rts-r31-35__main { padding-inline: 18px; }
  .rts-r31-35__hero--scenic { margin-inline: -18px; padding-inline: 18px; grid-template-columns: 1fr 340px; }
  .rts-r31-35__hero--scenic .rts-r31-35__hero-note { right: 260px; }
  .rts-r31-35__panel, .rts-r31-35--page-33 .rts-r31-35__panel:not(.rts-r31-35__panel--wide), .rts-r31-35--page-34 .rts-r31-35__panel:not(.rts-r31-35__panel--wide) { grid-column: span 6; }
  .rts-r31-35__pager { grid-template-columns: auto 1fr auto; }
  .rts-r31-35__pager > a span { display: none; }
}
@media (max-width: 820px) {
  .rts-r31-35__site-header { height: auto; min-height: 74px; grid-template-columns: 1fr auto; padding: 8px 16px; }
  .rts-r31-35__brand img { width: 48px; height: 48px; }
  .rts-r31-35__brand { font-size: 16px; }
  .rts-r31-35__brand b { font-size: 12px; }
  .rts-r31-35__brand i { font-size: 19px; }
  .rts-r31-35__site-header > nav { grid-column: 1 / -1; order: 3; justify-content: space-between; height: 40px; gap: 10px; overflow-x: auto; }
  .rts-r31-35__site-header > nav a { font-size: 11px; }
  .rts-r31-35__site-header > nav a.is-active::after { bottom: 0; width: 55px; }
  .rts-r31-35__site-header > nav a.is-active::before { display: none; }
  .rts-r31-35__conversation { min-width: 0; font-size: 10px; }
  .rts-r31-35__shell { display: block; }
  .rts-r31-35__rail { padding: 10px 14px; }
  .rts-r31-35__rail-title, .rts-r31-35__support, .rts-r31-35__rail nav small, .rts-r31-35__rail nav i { display: none; }
  .rts-r31-35__rail nav { display: flex; justify-content: space-between; }
  .rts-r31-35__rail nav a, .rts-r31-35__rail nav a.is-active { min-height: 42px; display: flex; align-items: center; gap: 6px; padding: 6px 8px; }
  .rts-r31-35__rail-icon { font-size: 20px; }
  .rts-r31-35__rail nav b { margin: 0; font-size: 11px; }
  .rts-r31-35__main { padding: 18px 14px; }
  .rts-r31-35__hero, .rts-r31-35__hero--scenic { min-height: 0; display: block; margin: -18px -14px 12px; padding: 20px 14px; }
  .rts-r31-35__hero-copy { padding-right: 0; }
  .rts-r31-35__scenic { position: relative; width: calc(100% + 28px); height: 210px; margin: 16px -14px -20px; }
  .rts-r31-35__hero-note, .rts-r31-35__hero--scenic .rts-r31-35__hero-note { position: relative; right: auto; bottom: auto; max-width: none; margin: 12px 0 0; }
  .rts-r31-35__title-line { display: block; }
  .rts-r31-35__title-line h1, .rts-r31-35--page-33 .rts-r31-35__title-line h1, .rts-r31-35--page-35 .rts-r31-35__title-line h1 { font-size: clamp(37px, 11vw, 54px); }
  .rts-r31-35__title-line > p { margin-top: 8px; padding-left: 0; border-left: 0; font-size: 18px; }
  .rts-r31-35__panel, .rts-r31-35__panel--wide, .rts-r31-35--page-32 .rts-r31-35__panel:not(.rts-r31-35__panel--wide), .rts-r31-35--page-33 .rts-r31-35__panel:not(.rts-r31-35__panel--wide), .rts-r31-35--page-34 .rts-r31-35__panel:not(.rts-r31-35__panel--wide), .rts-r31-35--page-35 .rts-r31-35__panel:not(.rts-r31-35__panel--wide) { grid-column: 1 / -1; }
  .rts-r31-35__columns--3, .rts-r31-35__columns--4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rts-r31-35__flow { flex-wrap: wrap; }
  .rts-r31-35__flow li { flex-basis: 33.333%; }
  .rts-r31-35__flow li + li::before { display: none; }
  .rts-r31-35__pager { grid-template-columns: 1fr 1fr; }
  .rts-r31-35__pager ol { grid-column: 1 / -1; grid-row: 1; gap: 18px; }
  .rts-r31-35__pager-next { min-width: 0; }
}
@media (max-width: 520px) {
  .rts-r31-35__conversation { padding: 8px 10px; }
  .rts-r31-35__rail nav a { padding-inline: 3px; }
  .rts-r31-35__rail-icon { display: none; }
  .rts-r31-35__columns--2, .rts-r31-35__columns--3, .rts-r31-35__columns--4 { grid-template-columns: 1fr; }
  .rts-r31-35__columns section { border-right: 0; border-bottom: 1px solid #ddd4cb; }
  .rts-r31-35__flow li { flex-basis: 50%; }
  .rts-r31-35__questions { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rts-r31-35__pager > a { padding: 0 10px; font-size: 10px; }
}
/* Reference-derived, text-free photography remains independently replaceable. */
.rts-r31-35--page-32 .rts-r31-35__scenic--lake {
  background: url('/assets/page-ranges/range-31-35/fidelity/page-32-lakeside.jpg') center/cover no-repeat;
}
.rts-r31-35--page-33 .rts-r31-35__scenic--conversation {
  background: url('/assets/page-ranges/range-31-35/fidelity/page-33-conversation.jpg') center/cover no-repeat;
}
.rts-r31-35--page-34 .rts-r31-35__scenic--mountains {
  background: url('/assets/page-ranges/range-31-35/fidelity/page-34-mountain.jpg') center/cover no-repeat;
}
.rts-r31-35--page-32 .rts-r31-35__scenic::before,
.rts-r31-35--page-32 .rts-r31-35__scenic::after,
.rts-r31-35--page-33 .rts-r31-35__scenic::before,
.rts-r31-35--page-33 .rts-r31-35__scenic::after,
.rts-r31-35--page-34 .rts-r31-35__scenic::before,
.rts-r31-35--page-34 .rts-r31-35__scenic::after { display: none; }
`;
