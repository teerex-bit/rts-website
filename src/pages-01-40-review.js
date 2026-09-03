const esc = value => String(value).replace(/[&<>]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[character]));

function renderPagesFinalReview(pages) {
  const targets = pages.map(page => ({
    number: String(page.number).padStart(2, '0'),
    label: page.title,
    route: page.route,
    stage: page.stage
  }));
  return `<main class="pages-final-review">
    <header class="pages-final-review__header">
      <div><p>Editable webpage review</p><h1>Pages 01–40</h1></div>
      <p>Switch among all forty live routes. Previous and Next wrap around the complete set.</p>
    </header>
    <nav class="pages-final-review__pages" aria-label="Pages 01 through 40">${targets.map((target, index) => `<button type="button" data-final-review-route="${target.route}" class="${index === 0 ? 'is-current' : ''}" aria-pressed="${index === 0 ? 'true' : 'false'}"><span>${target.number}</span><strong>${esc(target.label)}</strong><small>${esc(target.stage)}</small></button>`).join('')}</nav>
    <section class="pages-final-review__controls" aria-label="Review controls">
      <button type="button" data-final-review-previous>← Previous</button>
      <p><span>Viewing</span> <strong data-final-review-status>Page ${targets[0].number} — ${esc(targets[0].label)}</strong></p>
      <button type="button" data-final-review-next>Next →</button>
    </section>
    <div class="pages-final-review__viewer"><iframe id="pages-01-40-review-frame" src="${targets[0].route}" title="Page ${targets[0].number} — ${esc(targets[0].label)}"></iframe></div>
  </main>
  <script>(()=>{const buttons=[...document.querySelectorAll('[data-final-review-route]')],frame=document.querySelector('#pages-01-40-review-frame'),status=document.querySelector('[data-final-review-status]');let current=0;const select=index=>{current=(index+buttons.length)%buttons.length;buttons.forEach((button,buttonIndex)=>{const active=buttonIndex===current;button.classList.toggle('is-current',active);button.setAttribute('aria-pressed',String(active))});const button=buttons[current],label='Page '+button.querySelector('span').textContent+' — '+button.querySelector('strong').textContent;frame.src=button.dataset.finalReviewRoute;frame.title=label;status.textContent=label;button.scrollIntoView({block:'nearest',inline:'nearest'})};buttons.forEach((button,index)=>button.addEventListener('click',()=>select(index)));document.querySelector('[data-final-review-previous]').addEventListener('click',()=>select(current-1));document.querySelector('[data-final-review-next]').addEventListener('click',()=>select(current+1));})();</script>`;
}

renderPagesFinalReview.css = `
.pages-final-review{min-height:100vh;padding:18px;color:#10283d;background:#e9e4da;font-family:var(--sans)}
.pages-final-review__header{display:flex;justify-content:space-between;align-items:end;gap:30px;max-width:1540px;margin:0 auto 12px}
.pages-final-review__header>div>p{margin:0;color:#58703f;font-size:.7rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase}
.pages-final-review__header h1{margin:2px 0 0;font:400 2.45rem/1 var(--serif)}
.pages-final-review__header>p{max-width:560px;margin:0;color:#50606d}
.pages-final-review__pages{display:grid;grid-template-columns:repeat(10,minmax(92px,1fr));gap:6px;max-width:1540px;margin:auto}
.pages-final-review__pages button{display:grid;grid-template-columns:25px 1fr;gap:1px 7px;align-items:center;min-height:48px;padding:6px 8px;color:#1b3142;background:#faf7f0;border:1px solid #cac4ba;border-radius:6px;text-align:left;cursor:pointer}
.pages-final-review__pages button span{grid-row:1/3;display:grid;place-items:center;width:25px;height:25px;color:#fff;background:#607548;border-radius:50%;font-size:.65rem}
.pages-final-review__pages button strong{overflow:hidden;font-size:.62rem;line-height:1.1;text-overflow:ellipsis;white-space:nowrap}
.pages-final-review__pages button small{color:#68747d;font-size:.55rem;text-transform:uppercase}
.pages-final-review__pages button.is-current{color:#fff;background:#123b60;border-color:#123b60}
.pages-final-review__pages button.is-current small{color:#d9e3ec}
.pages-final-review__controls{display:grid;grid-template-columns:140px 1fr 140px;align-items:center;max-width:1540px;margin:10px auto}
.pages-final-review__controls button{min-height:38px;color:#fff;background:#173a57;border:0;border-radius:999px;cursor:pointer}
.pages-final-review__controls p{margin:0;text-align:center}.pages-final-review__controls p span{color:#69747c;font-size:.68rem;text-transform:uppercase}
.pages-final-review__viewer{max-width:1540px;height:min(1024px,calc(100vh - 302px));min-height:480px;margin:auto;background:#fff;border:1px solid #bfb8ac;border-radius:9px;box-shadow:0 14px 35px #1a2b3822;overflow:hidden}
.pages-final-review__viewer iframe{display:block;width:100%;height:100%;border:0;background:#fff}
@media(max-width:1180px){.pages-final-review__pages{display:flex;overflow-x:auto;padding-bottom:5px}.pages-final-review__pages button{flex:0 0 135px}.pages-final-review__viewer{height:calc(100vh - 225px)}}
@media(max-width:650px){.pages-final-review{padding:12px}.pages-final-review__header{display:block}.pages-final-review__header>p{margin-top:8px;font-size:.75rem}.pages-final-review__header h1{font-size:2rem}.pages-final-review__controls{grid-template-columns:1fr 1fr;gap:8px}.pages-final-review__controls p{grid-column:1/-1;grid-row:1}.pages-final-review__viewer{height:calc(100vh - 260px);min-height:400px}}
`;

module.exports = renderPagesFinalReview;
