(() => {
  'use strict';
  const key = 'rts-deepdive-v1';
  const screens = [...document.querySelectorAll('[data-screen]')];
  let saved = {};
  let storageAvailable = true;
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '{}');
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) saved = parsed;
  } catch { storageAvailable = false; }
  let current = -1;
  // Screen addresses contain location only, never the person's reflections.
  const screenNames = ['welcome', 'introduction-1', 'introduction-2',
    ...Array.from({ length: 3 }, (_, i) => 'awaken-' + (i + 1)),
    ...Array.from({ length: 7 }, (_, i) => 'see-clearly-' + (i + 1)),
    ...Array.from({ length: 7 }, (_, i) => 'become-' + (i + 1)),
    ...Array.from({ length: 5 }, (_, i) => 'join-' + (i + 1))];
  function pageFromAddress() {
    const index = screenNames.indexOf(window.location.hash.slice(1));
    return index === -1 ? null : index - 1;
  }
  const store = () => { try { localStorage.setItem(key, JSON.stringify({ page: saved.page })); } catch {} };
  // Record each milestone once per browser tab session, without identifiers or reflection content.
  const milestonePages = new Map([[0, 'start'], [3, 'awaken'], [6, 'see-clearly'], [13, 'become'], [20, 'join'], [23, 'complete']]);
  function recordMilestone(page) {
    const stage = milestonePages.get(page);
    if (!stage) return;
    const key = 'rts-deepdive-milestone-' + stage;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch { /* Tracking is optional. */ }
    try {
      fetch('/api/deepdive/event', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage }), keepalive: true, credentials: 'same-origin'
      }).catch(() => {});
    } catch { /* Never interrupt the curriculum for analytics. */ }
  }
  function show(page, scroll = true, historyMode = 'push') {
    current = Number.isInteger(page) && page >= -1 && page <= 23 ? page : -1;
    if (historyMode !== 'none') {
      const address = new URL(window.location.href);
      address.hash = screenNames[current + 1];
      const state = { rtsDeepDive: true, page: current };
      if (historyMode === 'replace') window.history.replaceState(state, '', address.href);
      else if (window.location.hash !== address.hash) window.history.pushState(state, '', address.href);
    }
    screens.forEach(screen => { screen.hidden = Number(screen.dataset.screen) !== current; });
    saved.page = current;
    store();
    recordMilestone(current);
    if (scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const title = screens.find(screen => !screen.hidden).querySelector('h1');
      if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
    }
  }
  function toggle(button, open) {
    button.setAttribute('aria-expanded', String(open));
    const content = button.nextElementSibling;
    if (content) content.hidden = !open;
    button.parentElement.classList.toggle('rts-reveal-card--open', open);
    const hint = button.querySelector('.rts-reveal-affordance > span, .rts-chain-affordance > span');
    if (hint) hint.textContent = open ? '' : 'Tap to read';
  }
  document.querySelectorAll('[data-toggle]').forEach(button => toggle(button, false));
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-go')) show(Number(button.dataset.go));
    if (button.hasAttribute('data-toggle')) {
      const open = button.getAttribute('aria-expanded') !== 'true';
      if (button.dataset.toggle === 'influence') {
        document.querySelectorAll('[data-toggle="influence"]').forEach(other => {
          if (other !== button) toggle(other, false);
        });
      }
      toggle(button, open);
    }
  });
  window.addEventListener('popstate', () => {
    const page = pageFromAddress();
    if (page !== null) show(page, true, 'none');
  });
  window.addEventListener('hashchange', () => {
    const page = pageFromAddress();
    if (page !== null && page !== current) show(page, true, 'none');
  });
  show(pageFromAddress() ?? saved.page, false, 'replace');
})();


