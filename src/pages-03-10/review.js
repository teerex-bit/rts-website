const esc = value => String(value).replace(/[&<>]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[character]));

module.exports = function renderPagesBatchReview(pages) {
  const targets = pages.map(page => ({
    number: String(page.number).padStart(2, '0'),
    label: page.title,
    route: page.route,
    stage: page.stage
  }));
  return `<main class="pages-batch-review">
    <header class="pages-batch-review__header">
      <div><p>Editable webpage review</p><h1>Pages 03–10</h1></div>
      <p>Switch pages below. The selected route stays live and interactive inside this same-origin viewer.</p>
    </header>
    <nav class="pages-batch-review__pages" aria-label="Pages 03 through 10">${targets.map((target, index) => `<button type="button" data-review-route="${target.route}" class="${index === 0 ? 'is-current' : ''}" aria-pressed="${index === 0 ? 'true' : 'false'}"><span>${target.number}</span><strong>${esc(target.label)}</strong><small>${esc(target.stage)}</small></button>`).join('')}</nav>
    <section class="pages-batch-review__controls" aria-label="Review controls">
      <button type="button" data-review-previous>← Previous</button>
      <p><span>Viewing</span> <strong data-review-status>Page ${targets[0].number} — ${esc(targets[0].label)}</strong></p>
      <button type="button" data-review-next>Next →</button>
    </section>
    <div class="pages-batch-review__viewer"><iframe id="batch-review-frame" src="${targets[0].route}" title="Page ${targets[0].number} — ${esc(targets[0].label)}"></iframe></div>
  </main>
  <script>(()=>{const buttons=[...document.querySelectorAll('[data-review-route]')],frame=document.querySelector('#batch-review-frame'),status=document.querySelector('[data-review-status]');let current=0;const select=index=>{current=(index+buttons.length)%buttons.length;buttons.forEach((button,buttonIndex)=>{const active=buttonIndex===current;button.classList.toggle('is-current',active);button.setAttribute('aria-pressed',String(active))});const button=buttons[current],label='Page '+button.querySelector('span').textContent+' — '+button.querySelector('strong').textContent;frame.src=button.dataset.reviewRoute;frame.title=label;status.textContent=label;button.scrollIntoView({block:'nearest',inline:'nearest'})};buttons.forEach((button,index)=>button.addEventListener('click',()=>select(index)));document.querySelector('[data-review-previous]').addEventListener('click',()=>select(current-1));document.querySelector('[data-review-next]').addEventListener('click',()=>select(current+1));})();</script>`;
};
