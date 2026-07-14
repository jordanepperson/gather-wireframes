// Generic hamburger-in-circle nav menu toggle. Works off any
// [data-nav-toggle]/[data-nav-panel] pair, or the default
// #nav-menu-toggle / #nav-menu-panel ids used on wireframe pages.
(function () {
  function setup(toggle, panel) {
    if (!toggle || !panel) return;

    function close() {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function open() {
      panel.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.classList.contains('open')) close(); else open();
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('click', function (e) {
      if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== toggle) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  setup(document.getElementById('nav-menu-toggle'), document.getElementById('nav-menu-panel'));
})();
