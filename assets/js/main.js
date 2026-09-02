// World Famous Chicken — site interactions

document.getElementById('year').textContent = new Date().getFullYear();

/* Sticky header state */
const header = document.getElementById('siteHeader');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Mobile nav toggle */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Scroll-reveal animations */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* handleImgError is defined inline in <head> (see the page template) so it
   exists before any <img onerror> can fire — see index.html for details. */

/* Menu category nav: highlight active section on scroll */
const menuNavLinks = document.querySelectorAll('.menu-nav a');
if (menuNavLinks.length) {
  const cats = Array.from(menuNavLinks).map(a => document.querySelector(a.getAttribute('href')));
  const setActive = () => {
    let current = cats[0];
    cats.forEach(cat => {
      if (cat && cat.getBoundingClientRect().top < 180) current = cat;
    });
    menuNavLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current?.id));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
}
