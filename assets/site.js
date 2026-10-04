(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close −' : 'Menu +';
    nav.classList.toggle('open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      toggle.click(); toggle.focus();
    }
  });
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      let count = 0;
      document.querySelectorAll('[data-category]').forEach(card => {
        card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
        if (!card.hidden) count++;
      });
      document.querySelector('#filter-status').textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
    });
  });
  document.querySelectorAll('[data-demo]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('.form-status').textContent = form.dataset.demo === 'newsletter'
      ? 'Signup preview complete. No email was saved. A newsletter provider must be connected before launch.'
      : 'Enquiry preview complete. Nothing was sent. A contact service must be connected before launch.';
  }));
  const interest = new URLSearchParams(location.search).get('interest');
  const select = document.querySelector('select[name="interest"]');
  if (select && [...select.options].some(option => option.value === interest)) select.value = interest;
})();
