// ============================================================
// ahmalassaf.com — site script
// All client-side interactivity lives here.
// ============================================================

(function () {
  'use strict';

  // Eastern Arabic-Indic digit conversion
  const toAr = (n) => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

  // ============ HERO CAROUSEL ============
  const initCarousel = () => {
    const carEl = document.getElementById('car');
    if (!carEl) return;

    const slides = carEl.querySelectorAll('.slide');
    const dots = carEl.querySelectorAll('.thumb-dots button');
    const progBar = carEl.querySelector('.progress .bar');
    const prevBtn = carEl.querySelector('#prev');
    const nextBtn = carEl.querySelector('#next');
    // Must stay in sync with --carousel-duration in css/site.css
    const AUTOPLAY_MS = 6000;
    let i = 0, timer;

    const restartProgress = () => {
      if (!progBar) return;
      progBar.classList.remove('run');
      void progBar.offsetWidth;     // force reflow so the animation restarts
      progBar.classList.add('run');
    };

    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('active', k === i));
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
      restartProgress();
    };

    const start = () => {
      stop();
      timer = setInterval(() => go(i + 1), AUTOPLAY_MS);
    };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

    dots.forEach((d, k) => d.addEventListener('click', () => { go(k); start(); }));
    if (nextBtn) nextBtn.addEventListener('click', () => { go(i + 1); start(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { go(i - 1); start(); });

    let mouseInside = false;
    carEl.addEventListener('mouseenter', () => { mouseInside = true; stop(); });
    carEl.addEventListener('mouseleave', () => { mouseInside = false; start(); });

    // keyboard navigation when carousel is focused
    carEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); start(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); start(); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); start(); }
      else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); start(); }
    });
    carEl.addEventListener('focus', stop);
    carEl.addEventListener('blur', () => { if (!mouseInside) start(); });

    // honor reduced motion: don't autoplay
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stop();
    } else {
      start();
    }
  };

  // ============ ARCHIVE FILTER ============
  const initArchiveFilter = () => {
    const catFilter = document.getElementById('cat-filter');
    if (!catFilter) return;
    const yearFilter = document.getElementById('year-filter');
    const essays = document.querySelectorAll('.essay');
    const cntVisible = document.getElementById('cnt-visible');
    const empty = document.getElementById('empty');
    const titleEl = document.getElementById('ah-title');

    let activeCat = 'all';
    let activeYear = 'all';

    const applyFilters = () => {
      let visible = 0;
      essays.forEach(e => {
        const cat = e.dataset.cat;
        const year = e.dataset.year;
        const ok = (activeCat === 'all' || cat === activeCat) &&
                   (activeYear === 'all' || year === activeYear);
        e.classList.toggle('hidden', !ok);
        if (ok) visible++;
      });

      // mark the first visible essay so it can drop its top border
      let firstSet = false;
      essays.forEach(e => {
        const isHidden = e.classList.contains('hidden');
        if (!firstSet && !isHidden) {
          e.classList.add('first-visible');
          firstSet = true;
        } else {
          e.classList.remove('first-visible');
        }
      });

      if (cntVisible) cntVisible.textContent = toAr(visible);
      if (empty) empty.classList.toggle('show', visible === 0);

      if (titleEl) {
        const catEl = catFilter.querySelector(`[data-cat="${activeCat}"]`);
        const yearEl = yearFilter ? yearFilter.querySelector(`[data-year="${activeYear}"]`) : null;
        if (activeCat === 'all' && activeYear === 'all') {
          titleEl.textContent = 'كل المقالات';
        } else {
          const parts = [];
          if (activeCat !== 'all' && catEl) parts.push(catEl.firstChild.textContent.trim());
          if (activeYear !== 'all' && yearEl) parts.push(yearEl.firstChild.textContent.trim());
          titleEl.textContent = parts.join(' · ');
        }
      }
    };

    const setActive = (group, el) => {
      document.querySelectorAll(`#${group} .filter-item`).forEach(b => {
        const isActive = b === el;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    };

    catFilter.querySelectorAll('.filter-item').forEach(b => {
      b.addEventListener('click', () => { activeCat = b.dataset.cat; setActive('cat-filter', b); applyFilters(); });
    });
    if (yearFilter) {
      yearFilter.querySelectorAll('.filter-item').forEach(b => {
        b.addEventListener('click', () => { activeYear = b.dataset.year; setActive('year-filter', b); applyFilters(); });
      });
    }

    // expose reset for the empty-state link
    window.AHMALASSAF.resetFilters = () => {
      activeCat = 'all';
      activeYear = 'all';
      setActive('cat-filter', catFilter.querySelector('[data-cat="all"]'));
      if (yearFilter) setActive('year-filter', yearFilter.querySelector('[data-year="all"]'));
      applyFilters();
    };

    applyFilters();
  };

  // ============ FORM SUCCESS STATES ============
  const initFormSuccessStates = () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.classList.add('sent');
      });
    }
    const newsCard = document.getElementById('newsCard');
    if (newsCard) {
      const newsForm = newsCard.querySelector('.news-form');
      if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
          e.preventDefault();
          newsCard.classList.add('sent');
        });
      }
    }
  };

  // ============ SEARCH POPOVER ============
  const initSearchPopover = () => {
    const wrap = document.getElementById('searchWrap');
    if (!wrap) return;
    const trigger = document.getElementById('searchTrigger');
    const input = document.getElementById('searchInput');
    const resultsEl = document.getElementById('searchResults');
    const countEl = document.getElementById('searchCount');

    // build searchable index from existing archive entries
    const essays = Array.from(document.querySelectorAll('.essay')).map(e => {
      const titleEl = e.querySelector('.essay-title');
      const catEl = e.querySelector('.essay-cat');
      const metaB = e.querySelector('.essay-meta b');
      const metaText = e.querySelector('.essay-meta');
      return {
        title: titleEl ? titleEl.textContent.trim() : '',
        cat:   catEl   ? catEl.textContent.trim()   : '',
        date:  metaB   ? metaB.textContent.trim()   : '',
        meta:  metaText ? metaText.textContent.replace(metaB?.textContent || '', '').trim() : '',
      };
    });

    const esc = (s) => String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const open = () => {
      wrap.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      // Defer focus by 100ms so the .open class transition starts first;
      // otherwise screen readers may announce the input before the dialog
      // becomes visible.
      setTimeout(() => input.focus(), 100);
      render('');
    };
    const close = () => {
      wrap.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      input.value = '';
    };
    const toggle = () => wrap.classList.contains('open') ? close() : open();

    const highlight = (text, q) => {
      if (!q) return esc(text);
      // Use case-insensitive indexOf so case mismatches still highlight
      const i = text.toLowerCase().indexOf(q.toLowerCase());
      if (i < 0) return esc(text);
      return esc(text.slice(0, i)) + '<em>' + esc(text.slice(i, i + q.length)) + '</em>' + esc(text.slice(i + q.length));
    };

    const render = (q) => {
      const ql = q.trim().toLowerCase();
      const filtered = ql === '' ? essays : essays.filter(e =>
        e.title.toLowerCase().includes(ql) ||
        e.cat.toLowerCase().includes(ql)
      );
      countEl.textContent = toAr(filtered.length);

      if (filtered.length === 0) {
        resultsEl.innerHTML = '<div class="empty">لا نتائج تطابق «' + esc(q) + '»</div>';
        return;
      }

      resultsEl.innerHTML = filtered.slice(0, 8).map(e => `
        <button class="result" type="button">
          <div class="cat">${esc(e.cat)}</div>
          <div class="title">${highlight(e.title, q.trim())}</div>
          <div class="result-meta">${esc(e.date)} · ${esc(e.meta)}</div>
        </button>
      `).join('');
    };

    trigger.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    input.addEventListener('input', () => render(input.value));
    input.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    document.addEventListener('click', (e) => {
      if (wrap.classList.contains('open') && !wrap.contains(e.target)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wrap.classList.contains('open')) close();
      if (e.key === '/' &&
          !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) &&
          !document.activeElement.isContentEditable) {
        e.preventDefault();
        open();
      }
    });
  };

  // expose helpers/state on a namespace; later init functions extend it
  window.AHMALASSAF = { toAr };

  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initArchiveFilter();
    initFormSuccessStates();
    initSearchPopover();
  });
})();
