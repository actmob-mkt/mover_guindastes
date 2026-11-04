(function () {
  if (window.MoverFX) return;
  var E = 'cubic-bezier(0.32,0.72,0,1)';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.style.opacity = '1'; el.style.transform = 'translateY(0)'; el.style.filter = 'blur(0)';
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
  var wo = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.style.opacity = '1'; wo.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -38% 0px' });
  function scan() {
    document.querySelectorAll('[data-reveal]:not([data-rv])').forEach(function (el) {
      el.setAttribute('data-rv', '');
      if (reduce) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.style.opacity = '0'; el.style.transform = 'translateY(64px)'; el.style.filter = 'blur(12px)';
      el.style.transition = 'opacity 900ms ' + E + ', transform 900ms ' + E + ', filter 900ms ' + E;
      io.observe(el);
    });
    document.querySelectorAll('[data-word]:not([data-rv])').forEach(function (el) {
      el.setAttribute('data-rv', '');
      if (reduce) { el.style.opacity = '1'; return; }
      el.style.transition = 'opacity 700ms ' + E;
      wo.observe(el);
    });
  }
  var t;
  var mo = new MutationObserver(function () { clearTimeout(t); t = setTimeout(scan, 120); });
  function start() { scan(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  window.MoverFX = { scan: scan };
})();
