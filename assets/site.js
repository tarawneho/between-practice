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
  document.querySelectorAll('[data-images]').forEach(view => {
    const images = JSON.parse(view.dataset.images);
    const original = view.querySelector('img');
    const link = original.closest('a');
    const title = original.alt;
    const hero = view.classList.contains('hero-image-browser');
    const count = view.querySelector('.image-count');
    const controls = view.querySelector('.image-controls');
    if (images.length < 2) return;
    const viewport = document.createElement('div');
    viewport.className = 'slide-viewport';
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-roledescription', 'carousel');
    viewport.setAttribute('aria-label', title + ' images');
    const track = document.createElement('div');
    track.className = 'slide-track';
    images.forEach((url, index) => {
      const slide = document.createElement(link ? 'a' : 'div');
      slide.className = 'image-slide';
      if (link) slide.href = link.getAttribute('href');
      slide.setAttribute('aria-label', title + ', image ' + (index + 1) + ' of ' + images.length);
      const image = document.createElement('img');
      image.src = url; image.alt = title;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async'; image.draggable = false;
      slide.append(image); track.append(slide);
    });
    viewport.append(track);
    (link || original).replaceWith(viewport);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, timer, hovered = false, focused = false;
    let playing = hero && !reduced.matches;
    const go = (next, smooth = true) => {
      index = (next + images.length) % images.length;
      viewport.scrollTo({left: index * viewport.clientWidth, behavior: smooth && !reduced.matches ? 'smooth' : 'instant'});
    };
    const update = () => {
      const current = Math.round(viewport.scrollLeft / viewport.clientWidth);
      index = Math.max(0, Math.min(images.length - 1, current));
      view.dataset.imageIndex = String(index);
      count.textContent = `${index + 1} / ${images.length}`;
      track.querySelectorAll('.image-slide').forEach((slide, i) => {slide.setAttribute('aria-hidden', String(i !== index)); if (slide.tagName === 'A') slide.tabIndex = i === index ? 0 : -1;});
    };
    count.removeAttribute('aria-live');
    viewport.addEventListener('scroll', update, {passive: true});
    view.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
      go(index + Number(button.dataset.step)); restart();
    }));
    viewport.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      go(event.key === 'Home' ? 0 : event.key === 'End' ? images.length - 1 : index + (event.key === 'ArrowRight' ? 1 : -1));
      restart();
    });
    // Touch uses the browser's native horizontal swipe. Mouse drag retains vertical scrolling.
    let start, dragged = false;
    viewport.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      start = {x:event.clientX, y:event.clientY, scroll:viewport.scrollLeft, pointer:event.pointerId};
      dragged = false;
    });
    viewport.addEventListener('pointermove', event => {
      if (!start) return;
      const dx = event.clientX - start.x;
      if (!dragged && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(event.clientY - start.y)) {
        dragged = true; viewport.setPointerCapture(start.pointer);
        viewport.classList.add('is-dragging'); clearInterval(timer);
      }
      if (dragged) { event.preventDefault(); viewport.scrollLeft = start.scroll - dx; }
    });
    const release = () => {
      if (!start) return;
      if (dragged) {viewport.classList.remove('is-dragging'); go(Math.round(viewport.scrollLeft / viewport.clientWidth));}
      start = null; restart();
    };
    viewport.addEventListener('pointerup', release);
    viewport.addEventListener('pointercancel', release);
    viewport.addEventListener('pointerleave', () => {if (!dragged) start = null;});
    viewport.addEventListener('click', event => {if (dragged) {event.preventDefault();event.stopPropagation();dragged=false;return;} if (hero) {const rect = viewport.getBoundingClientRect();go(index + (event.clientX - rect.left < rect.width / 2 ? -1 : 1));restart();}}, true);
    viewport.addEventListener('dragstart', event => event.preventDefault());
    function restart() {
      clearInterval(timer);
      if (playing && !hovered && !focused && !document.hidden) timer = setInterval(() => go(index + 1, index !== images.length - 1), 6500);
    }
    if (hero) {
      const pause = document.createElement('button');
      pause.type = 'button'; pause.className = 'slideshow-toggle';
      const label = () => {pause.textContent = playing ? 'Pause' : 'Play'; pause.setAttribute('aria-label', (playing ? 'Pause' : 'Play') + ' slideshow of ' + title);};
      pause.addEventListener('click', () => {playing = !playing; label(); restart();});
      controls.append(pause); label();
      view.addEventListener('mouseenter', () => {hovered = true; restart();});
      view.addEventListener('mouseleave', () => {hovered = false; restart();});
      view.addEventListener('focusin', () => {focused = true; restart();});
      view.addEventListener('focusout', event => {if (!view.contains(event.relatedTarget)) {focused = false; restart();}});
      document.addEventListener('visibilitychange', restart);
      reduced.addEventListener('change', () => {if (reduced.matches) {playing = false; label();restart();}});
      restart();
    }
    new ResizeObserver(() => go(index, false)).observe(viewport);
    update();
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
