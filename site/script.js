/* ROEA — minimal site script: hamburger drawer + auxiliary chrome.
   Native <a href> navigation (we never preventDefault on links). */
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(function () {
    /* ---- Locale detection ---- */
    var path = (location.pathname || '').toLowerCase();
    var isRo = path.indexOf('/ro/') !== -1;

    /* ---- Brand wordmark: replace any <br> with a space so words don't smash ---- */
    document.querySelectorAll('.site-header .brand__name br').forEach(function (br) {
      br.parentNode.insertBefore(document.createTextNode(' '), br);
      br.parentNode.removeChild(br);
    });

    /* ---- Convert the inline header Donate button to a compact CTA ---- */
    document.querySelectorAll('.site-header .btn-gold').forEach(function (a) {
      a.classList.add('header-cta');
      a.classList.remove('btn', 'btn-gold');
    });

    /* ---- Rebuild the primary menu from a single source of truth ---- */
    var labels = isRo
      ? {
          home: 'Acasă', about: 'Despre Episcopie', hierarchs: 'Ierarhi',
          vatra: 'Vatra Românească', youth: 'Tineret și tabere',
          news: 'Știri și evenimente', letter: 'Pastorala 2026',
          solia: 'Solia', structure: 'Organizare', contact: 'Contact',
          donate: 'Donează', followLabel: 'Urmărește-ne',
          eyebrow: 'Centrul Episcopiei'
        }
      : {
          home: 'Home', about: 'About', hierarchs: 'Hierarchs',
          vatra: 'The Vatra', youth: 'Youth & Camps',
          news: 'News & Events', letter: 'Pastoral Letter 2026',
          solia: 'Solia', structure: 'Structure', contact: 'Contact',
          donate: 'Donate', followLabel: 'Follow',
          eyebrow: 'Episcopate Center'
        };

    var navItems = [
      { label: labels.home,      href: 'index.html' },
      { label: labels.about,     href: 'about.html' },
      { label: labels.hierarchs, href: 'hierarchs.html' },
      { label: labels.vatra,     href: 'vatra.html' },
      { label: labels.youth,     href: 'youth.html' },
      { label: labels.news,      href: 'news.html' },
      { label: labels.letter,    href: 'pastoral-letter-2026.html' },
      { label: labels.solia,     href: 'solia.html' },
      { label: labels.structure, href: 'structure.html' },
      { label: labels.contact,   href: 'contact.html' }
    ];

    var pathFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (!pathFile || pathFile === '/') pathFile = 'index.html';
    if (pathFile.indexOf('.') === -1) pathFile = pathFile + '.html';

    var menu = document.getElementById('primaryMenu');
    if (menu) {
      menu.innerHTML = '';
      navItems.forEach(function (item) {
        var li = document.createElement('li');
        if (pathFile === item.href.toLowerCase()) li.className = 'active';
        var a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        li.appendChild(a);
        menu.appendChild(li);
      });
    }

    /* ---- Drawer open / close ---- */
    var toggle = document.getElementById('navToggle');

    function openMenu() {
      if (!menu) return;
      menu.classList.add('is-open');
      document.body.classList.add('no-scroll');
      var ov = ensureOverlay();
      ov.classList.add('is-visible');
    }
    function closeMenu() {
      if (menu) menu.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      var ov = document.getElementById('drawerOverlay');
      if (ov) ov.classList.remove('is-visible');
    }
    function ensureOverlay() {
      var ov = document.getElementById('drawerOverlay');
      if (!ov) {
        ov = document.createElement('div');
        ov.id = 'drawerOverlay';
        ov.className = 'drawer-overlay';
        document.body.appendChild(ov);
        ov.addEventListener('click', closeMenu);
      }
      return ov;
    }

    if (toggle && menu) {
      toggle.setAttribute('type', 'button');
      ensureOverlay();

      /* Insert close button inside the drawer (mobile only via CSS) */
      if (!menu.querySelector('.drawer-close')) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'drawer-close';
        btn.setAttribute('aria-label', 'Close menu');
        btn.innerHTML = '&times;';
        btn.addEventListener('click', closeMenu);
        menu.insertBefore(btn, menu.firstChild);
      }

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (menu.classList.contains('is-open')) closeMenu();
        else openMenu();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      /* When a link inside the drawer is tapped, just hide the drawer
         cosmetically. Native <a href> navigation handles the rest. */
      menu.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a');
        if (!a || !a.getAttribute('href')) return;
        if (a.getAttribute('href').charAt(0) === '#') return;
        if (menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          document.body.classList.remove('no-scroll');
          var ov = document.getElementById('drawerOverlay');
          if (ov) ov.classList.remove('is-visible');
        }
      });
    }
  });
})();
