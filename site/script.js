(function () {
  // ---- Per-page accent class on <body> ----
  (function setPageAccent() {
    var path = (location.pathname || '').toLowerCase();
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    if (file === '' || file === '/') file = 'index.html';
    var lang = path.indexOf('/ro/') !== -1 ? 'lang-ro' : 'lang-en';
    var pageClass = 'page-home';
    if (/^index\.html?$/.test(file) || file === '') pageClass = 'page-home';
    else if (/^about\./.test(file)) pageClass = 'page-about';
    else if (/^hierarchs?\./.test(file) || /^bishop-/.test(file)) pageClass = 'page-hierarchs';
    else if (/^vatra\./.test(file)) pageClass = 'page-vatra';
    else if (/^youth\./.test(file)) pageClass = 'page-youth';
    else if (/^news\./.test(file) || /^event-/.test(file)) pageClass = 'page-news';
    else if (/^solia/.test(file)) pageClass = 'page-solia';
    else if (/^donate\./.test(file)) pageClass = 'page-donate';
    else if (/^structure\./.test(file)) pageClass = 'page-structure';
    else if (/^contact\./.test(file)) pageClass = 'page-contact';
    else if (/^pastoral-letter/.test(file)) pageClass = 'page-letter';
    document.body.classList.add(pageClass, lang, 'v2');
  })();

  // ---- Drawer menu (hamburger) ----
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('primaryMenu');

  function closeMenu() {
    if (menu) menu.classList.remove('is-open');
    document.body.classList.remove('drawer-open');
    var ov = document.getElementById('drawerOverlay');
    if (ov) ov.classList.remove('is-visible');
  }

  function openMenu() {
    if (menu) menu.classList.add('is-open');
    document.body.classList.add('drawer-open');
    var ov = document.getElementById('drawerOverlay');
    if (ov) ov.classList.add('is-visible');
  }

  if (toggle && menu) {
    // Build overlay once
    if (!document.getElementById('drawerOverlay')) {
      var ov = document.createElement('div');
      ov.id = 'drawerOverlay';
      ov.className = 'drawer-overlay';
      document.body.appendChild(ov);
      ov.addEventListener('click', closeMenu);
    }
    // Build close button inside menu
    if (menu && !menu.querySelector('.drawer-close')) {
      var closeBtn = document.createElement('button');
      closeBtn.className = 'drawer-close';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', closeMenu);
      menu.insertBefore(closeBtn, menu.firstChild);
    }
    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // Submenus inside the drawer
  document.querySelectorAll('.menu .has-sub > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var li = a.parentElement;
      if (li && li.classList.contains('has-sub')) {
        e.preventDefault();
        li.classList.toggle('is-open');
      }
    });
  });
})();
