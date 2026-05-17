document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header');
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function onScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 60) {
      header.style.background = 'rgba(255, 255, 255, 0.97)';
      header.style.boxShadow = '0 1px 8px rgba(0, 0, 0, 0.06)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.92)';
      header.style.boxShadow = 'none';
    }

    var current = '';
    sections.forEach(function (section) {
      var top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('nav__link--active');
    });

    var active = document.querySelector('.nav__link[href="#' + current + '"]');
    if (active) {
      active.classList.add('nav__link--active');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== Accordion (scroll-based) =====
  var items = document.querySelectorAll('[data-accordion]');

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        items.forEach(function (el) { el.classList.remove('accordion__item--open'); });
        entry.target.classList.add('accordion__item--open');
      }
    });
  }, { threshold: 0.6 });

  items.forEach(function (el) { obs.observe(el); });

  // ===== Carousel =====
  var carousels = document.querySelectorAll('[data-crsl]');

  carousels.forEach(function (el) {
    var track = el.querySelector('[data-crsl-track]');
    if (!track) return;
    var slides = track.querySelectorAll('img');
    var total = slides.length;
    if (total < 2) {
      el.querySelector('[data-crsl-prev]').style.display = 'none';
      el.querySelector('[data-crsl-next]').style.display = 'none';
      return;
    }

    var prevBtn = el.querySelector('[data-crsl-prev]');
    var nextBtn = el.querySelector('[data-crsl-next]');
    var dotsEl = el.querySelector('[data-crsl-dots]');
    if (!prevBtn || !nextBtn || !dotsEl) return;

    var idx = 0;

    function goTo(i) {
      if (i < 0) i = total - 1;
      if (i >= total) i = 0;
      idx = i;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      var dots = dotsEl.children;
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle('carousel__dot--active', d === idx);
      }
    }

    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(idx - 1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goTo(idx + 1); });

    for (var j = 0; j < total; j++) {
      var dot = document.createElement('button');
      dot.className = 'carousel__dot' + (j === 0 ? ' carousel__dot--active' : '');
      dot.setAttribute('aria-label', 'Imagem ' + (j + 1));
      dot._idx = j;
      dot.addEventListener('click', function (e) { e.stopPropagation(); goTo(this._idx); });
      dotsEl.appendChild(dot);
    }
  });

  // ===== Lightbox =====
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var lbCounter = document.getElementById('lbCounter');
  var allImgs = document.querySelectorAll('.carousel__track img');
  var srcs = [];

  allImgs.forEach(function (img) { srcs.push(img.getAttribute('src')); });

  var cur = 0;

  function openLB(i) {
    cur = i;
    lbImg.setAttribute('src', srcs[cur]);
    lbCounter.textContent = (cur + 1) + ' / ' + srcs.length;
    lb.classList.add('lightbox--open');
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    lb.classList.remove('lightbox--open');
    document.body.style.overflow = '';
  }

  function prevLB() { openLB(cur > 0 ? cur - 1 : srcs.length - 1); }
  function nextLB() { openLB(cur < srcs.length - 1 ? cur + 1 : 0); }

  allImgs.forEach(function (img, i) {
    img.addEventListener('click', function () { openLB(i); });
  });

  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', prevLB);
  lbNext.addEventListener('click', nextLB);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLB();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') prevLB();
    if (e.key === 'ArrowRight') nextLB();
  });
});
