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
  const reflectionKeys = ['awaken', 'seeClearly', 'become', 'join'];
  const storedReflections = saved.reflections && typeof saved.reflections === 'object' && !Array.isArray(saved.reflections) ? saved.reflections : {};
  const reflections = {};
  reflectionKeys.forEach(name => { reflections[name] = typeof storedReflections[name] === 'string' ? storedReflections[name] : ''; });
  // Before connected reflections, the only textarea was See Clearly (fields[0]).
  if (!Object.prototype.hasOwnProperty.call(storedReflections, 'seeClearly') && typeof saved.fields?.[0] === 'string') {
    reflections.seeClearly = saved.fields[0];
  }
  saved.reflections = reflections;
  delete saved.fields;
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
  const store = () => {
    try { localStorage.setItem(key, JSON.stringify(saved)); storageAvailable = true; }
    catch { storageAvailable = false; }
    document.querySelectorAll('[data-reflection-storage]').forEach(note => {
      note.textContent = storageAvailable
        ? 'Your place and writing are saved in this browser and are not sent to us or analyzed.'
        : 'Saving is unavailable in this browser. Your writing will remain only while this page stays open and is not sent to us or analyzed.';
    });
  };
  function renderReflections() {
    const has = name => typeof reflections[name] === 'string' && reflections[name].trim().length > 0;
    document.querySelectorAll('[data-reflection-context]').forEach(context => {
      let any = false;
      context.querySelectorAll('[data-reflection-source]').forEach(source => {
        const name = source.dataset.reflectionSource;
        source.hidden = !has(name);
        source.querySelector('blockquote').textContent = has(name) ? reflections[name] : '';
        any = any || has(name);
      });
      context.hidden = !any;
      const fallback = context.parentElement.querySelector('[data-reflection-fallback]');
      if (fallback) fallback.hidden = any;
    });
    const summary = document.querySelector('[data-reflection-summary]');
    if (summary) {
      summary.hidden = !reflectionKeys.some(has);
      summary.querySelectorAll('[data-reflection-row]').forEach(row => {
        const name = row.dataset.reflectionRow;
        row.hidden = !has(name);
        row.querySelector('[data-reflection-value]').textContent = has(name) ? reflections[name] : '';
      });
    }
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
    renderReflections();
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
  document.querySelectorAll('[data-reflection-field]').forEach(field => {
    const name = field.dataset.reflectionField;
    if (!reflectionKeys.includes(name)) return;
    field.value = reflections[name];
    field.addEventListener('input', () => {
      reflections[name] = field.value;
      store();
      renderReflections();
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


