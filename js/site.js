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
      timer = setInterval(() => go(i + 1), 6000);
    };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

    dots.forEach((d, k) => d.addEventListener('click', () => { go(k); start(); }));
    if (nextBtn) nextBtn.addEventListener('click', () => { go(i + 1); start(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { go(i - 1); start(); });

    carEl.addEventListener('mouseenter', stop);
    carEl.addEventListener('mouseleave', start);

    // keyboard navigation when carousel is focused
    carEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); start(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); start(); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); start(); }
      else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); start(); }
    });
    carEl.addEventListener('focus', stop);
    carEl.addEventListener('blur', start);

    // honor reduced motion: don't autoplay
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stop();
    } else {
      start();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
  });

  // expose toAr for future modules in this file
  window.AHMALASSAF = { toAr };
})();
