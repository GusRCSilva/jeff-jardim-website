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
});
