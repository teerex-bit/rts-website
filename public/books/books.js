(() => {
  const grid = document.getElementById('book-grid');
  const status = document.getElementById('books-status');
  const dialog = document.getElementById('book-dialog');
  const closeButton = document.getElementById('book-close');
  let origin;
  let scrollTop = 0;
  const field = id => document.getElementById(id);

  function openBook(book, button) {
    origin = button;
    field('book-title').textContent = book.title;
    field('book-description').textContent = book.description;
    field('book-collection').textContent = book.collection || 'Reforming the Soul';
    field('book-cover').src = book.cover;
    field('book-cover').alt = `Cover of ${book.title}`;
    const pdf = field('book-pdf');
    pdf.href = book.pdfUrl;
    pdf.setAttribute('aria-label', `Read ${book.title} PDF (opens in a new tab)`);
    const print = field('book-print');
    const available = Boolean(book.luluUrl) && book.printStatus === 'available';
    print.hidden = !available;
    field('book-print-pending').hidden = available;
    print.removeAttribute('href');
    if (available) {
      print.href = book.luluUrl;
      print.setAttribute('aria-label', `Buy ${book.title} print copy (opens in a new tab)`);
    }
    scrollTop = window.scrollY;
    document.body.style.top = `-${scrollTop}px`;
    document.body.classList.add('book-modal-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    closeButton.focus();
  }

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('book-modal-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollTop);
    origin?.focus({ preventScroll: true });
  });

  fetch('/books/catalog.json').then(response => {
    if (!response.ok) throw new Error('Catalog unavailable');
    return response.json();
  }).then(books => {
    const groups = new Map();
    for (const book of books) {
      if (!book.pdfAvailable || !book.pdfUrl || !book.cover || !book.description) continue;
      const group = book.collection || 'Books for the journey';
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(book);
    }
    for (const [name, books] of groups) {
      const section = document.createElement('section');
      section.className = 'book-collection';
      const heading = document.createElement('h3');
      heading.textContent = name;
      section.append(heading);
      const list = document.createElement('ul');
      list.className = 'book-covers';
      for (const book of books) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'book-card';
        button.setAttribute('aria-haspopup', 'dialog');
        button.setAttribute('aria-label', `About ${book.title}`);
        const cover = document.createElement('img');
        cover.src = book.cover;
        cover.alt = `Cover of ${book.title}`;
        cover.loading = 'lazy';
        const title = document.createElement('span');
        title.className = 'book-card-title';
        title.textContent = book.title;
        const hint = document.createElement('span');
        hint.className = 'book-card-hint';
        hint.textContent = 'Explore book ↗';
        button.append(cover, title, hint);
        button.addEventListener('click', () => openBook(book, button));
        item.append(button);
        list.append(item);
      }
      section.append(list);
      grid.append(section);
    }
    if (!grid.children.length) throw new Error('No available books');
    status.hidden = true;
  }).catch(() => {
    status.textContent = 'The cover library could not load. ';
    const link = document.createElement('a');
    link.href = '/books/reading-list/';
    link.textContent = 'Open the free PDF reading list.';
    status.append(link);
  });
})();
