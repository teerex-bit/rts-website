(() => {
  'use strict';
  const key = 'rts-deepdive-v1';
  const screens = [...document.querySelectorAll('[data-screen]')];
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch {}
  let current = -1;
  const store = () => { try { localStorage.setItem(key, JSON.stringify(saved)); } catch {} };
  function show(page, scroll = true) {
    current = Number.isInteger(page) && page >= -1 && page <= 23 ? page : -1;
    screens.forEach(screen => { screen.hidden = Number(screen.dataset.screen) !== current; });
    saved.page = current;
    store();
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
  document.querySelectorAll('textarea').forEach((field, index) => {
    field.value = saved.fields?.[index] || '';
    field.addEventListener('input', () => {
      saved.fields = saved.fields || {};
      saved.fields[index] = field.value;
      store();
    });
  });
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
  show(saved.page, false);
})();
