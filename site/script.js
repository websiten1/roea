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
    document.body.classList.add(pageClass, lang);
    if (!document.body.classList.contains('v2')) document.body.classList.add('v2');
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

  // ---- Inject inline secondary nav into header (between brand and hamburger) ----
  (function injectHeaderAux() {
    var nav = document.querySelector('.site-header .nav');
    if (!nav || nav.querySelector('.header-aux')) return;
    var isRo = document.body.classList.contains('lang-ro');
    var prefix = isRo ? '../' : '';
    var labels = isRo
      ? { about: 'Despre', hier: 'Ierarhi', news: 'Știri', donate: 'Donează' }
      : { about: 'About',  hier: 'Hierarchs', news: 'News', donate: 'Donate' };
    var aux = document.createElement('div');
    aux.className = 'header-aux';
    aux.innerHTML =
      '<a class="header-aux__link" href="' + (isRo ? 'about.html' : 'about.html') + '">' + labels.about + '</a>' +
      '<a class="header-aux__link" href="' + (isRo ? 'hierarchs.html' : 'hierarchs.html') + '">' + labels.hier + '</a>' +
      '<a class="header-aux__link" href="' + (isRo ? 'news.html' : 'news.html') + '">' + labels.news + '</a>' +
      '<a class="header-aux__cta"  href="' + (isRo ? 'donate.html' : 'donate.html') + '">' + labels.donate + '</a>';
    var toggle = nav.querySelector('.nav-toggle');
    if (toggle) nav.insertBefore(aux, toggle);
    else nav.appendChild(aux);
  })();

  // ---- Add address + socials at the bottom of the drawer ----
  (function enrichDrawer() {
    if (!menu || menu.querySelector('.drawer-foot')) return;
    var isRo = document.body.classList.contains('lang-ro');
    var labels = isRo
      ? { eyebrow: 'Centrul Episcopiei', followLabel: 'Urmărește-ne' }
      : { eyebrow: 'Episcopate Center', followLabel: 'Follow' };
    var foot = document.createElement('div');
    foot.className = 'drawer-foot';
    foot.innerHTML =
      '<span class="drawer-foot__eyebrow">' + labels.eyebrow + '</span>' +
      '<p class="drawer-foot__address">2535 Grey Tower Road<br/>Jackson, MI 49201-9120</p>' +
      '<a class="drawer-foot__phone" href="tel:+15175224800">(517) 522-4800</a>' +
      '<span class="drawer-foot__eyebrow" style="margin-top:6px;">' + labels.followLabel + '</span>' +
      '<div class="drawer-foot__socials">' +
        '<a href="https://www.facebook.com/ROEofA" target="_blank" rel="noopener" aria-label="Facebook">f</a>' +
        '<a href="https://twitter.com/ROEofA" target="_blank" rel="noopener" aria-label="Twitter">t</a>' +
        '<a href="https://www.youtube.com/user/RomanianDioceseROEA" target="_blank" rel="noopener" aria-label="YouTube">y</a>' +
      '</div>';
    menu.appendChild(foot);
  })();

  // ---- Sticky header scroll state ----
  (function stickyHeaderState() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 8) document.body.classList.add('scrolled');
      else document.body.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
})();
