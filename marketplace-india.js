(() => {
  'use strict';
  const search = document.getElementById('market-search');
  const filters = [...document.querySelectorAll('[data-kind]')];
  const cards = [...document.querySelectorAll('.listing-card')];
  const count = document.getElementById('market-results-count');
  const empty = document.getElementById('market-empty');
  const reset = document.getElementById('market-reset');
  const toast = document.getElementById('market-toast');
  let activeKind = 'all';
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4200);
  };
  const applyFilters = () => {
    const q = (search?.value || '').trim().toLocaleLowerCase('en-IN');
    let visible = 0;
    cards.forEach((card) => {
      const matchesKind = activeKind === 'all' || card.dataset.kind === activeKind;
      const matchesSearch = !q || (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase('en-IN').includes(q);
      const show = matchesKind && matchesSearch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = visible + (visible === 1 ? ' demo example' : ' demo examples');
    if (empty) empty.hidden = visible !== 0;
  };
  search?.addEventListener('input', applyFilters);
  filters.forEach((button) => button.addEventListener('click', () => {
    activeKind = button.dataset.kind || 'all';
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    applyFilters();
  }));
  reset?.addEventListener('click', () => {
    if (search) search.value = '';
    activeKind = 'all';
    filters.forEach((item) => {
      const active = item.dataset.kind === 'all';
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    applyFilters();
  });
  document.querySelectorAll('.listing-demo').forEach((button) => button.addEventListener('click', () => {
    showToast('“' + button.dataset.item + '” is illustrative demo content. There are no live listings or purchases yet.');
  }));
  const form = document.getElementById('seller-preview-form');
  const result = document.getElementById('seller-preview-result');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('seller-title');
    const price = document.getElementById('seller-price');
    const description = document.getElementById('seller-description');
    if (!title.value.trim() || !description.value.trim() || !price.value || !price.checkValidity()) {
      form.reportValidity();
      showToast('Please complete the listing name, valid INR price and deliverable description.');
      return;
    }
    const amount = Number(price.value);
    if (!Number.isSafeInteger(amount) || amount < 0 || amount > 10000000) {
      price.setCustomValidity('Enter a whole INR amount between ₹0 and ₹1,00,00,000.');
      price.reportValidity();
      price.setCustomValidity('');
      return;
    }
    result.replaceChildren();
    const heading = document.createElement('h3');
    heading.textContent = title.value.trim();
    const meta = document.createElement('p');
    const kind = document.getElementById('seller-type').value === 'tool' ? 'AI tool' : 'AI service';
    const category = document.getElementById('seller-category').value;
    const billing = document.getElementById('seller-billing').value;
    meta.textContent = kind + ' · ' + category + ' · ₹' + amount.toLocaleString('en-IN') + ' · ' + billing;
    const body = document.createElement('p');
    body.textContent = description.value.trim();
    const notice = document.createElement('strong');
    notice.textContent = 'LOCAL PREVIEW ONLY — not submitted or published.';
    result.append(heading, meta, body, notice);
    result.hidden = false;
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
  });
  const menu = document.getElementById('menu-toggle');
  const nav = document.querySelector('.main-nav');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav?.classList.toggle('nav-open', open);
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Open navigation');
  }));
  applyFilters();
})();
