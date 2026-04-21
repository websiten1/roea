(function () {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('primaryMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('is-open'));
  }
  document.querySelectorAll('.menu .has-sub > a').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        const li = a.parentElement;
        if (li && li.classList.contains('has-sub')) {
          e.preventDefault();
          li.classList.toggle('is-open');
        }
      }
    });
  });
})();
