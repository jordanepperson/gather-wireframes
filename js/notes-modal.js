// Shared "Notes & Open Questions" modal — one source of truth, injected on
// any page that includes this script. Triggered by any element carrying
// [data-open-notes] (the top utility bar's "Notes" button on every sub-page,
// plus the index page's own Notes button).
(function () {
  var NOTES = [
    {
      page: 'Outstanding Questions',
      items: [
        'Gather Everywhere: which content should live as real on-brand pages vs. just link out to existing external sites?',
        'Gather Global vs. "Gather27" — final naming and URL handling still needs a last confirmation.',
        'Is there a single, consolidated "host" hub across expressions, or does each expression keep its own separate hosting flow?',
        'Gather Group has moved under Gather Global — does that mean Gather Everywhere becomes purely donor- and partner-focused?',
        'Where do Everybody Everywhere and Gather Worship fit into the ecosystem?',
        'An Instagram add-on specifically for Gather27?',
        'Trade-off to weigh: linking out to external sites directly from the nav vs. building a preview page on Gather Everywhere itself.',
        'What\'s the pitch / WIIFM (what\'s-in-it-for-me) to churches for Gather Cities?',
        'Jennie Allen\'s positioning — nested under Gather, or adjacent to it? Affects the nav, Gather Everywhere, and the footer treatment.',
        'The IF:Gathering &rarr; IF:One Night &rarr; IF:Gathering naming pattern is genuinely confusing and worth simplifying.',
        'A possible "content cycle" pattern worth exploring: Host/Join &rarr; In Case You Missed It &rarr; Watch On Demand.',
        'Reconsider removing the Give CTA from IF:Gathering entirely.',
        '"Join" vs. "Find" — which verb should we standardize on site-wide?',
      ],
    },
    {
      page: 'Strategy Notes',
      items: [
        'Copy throughout these wireframes is gestural toward each section\'s intent — it\'s not final copy.',
        'These landing pages assume real sub-pages exist behind them; they\'re not meant to hold everything themselves.',
        'Each section\'s job, in order: what is it, what does it mean for you, is it free — one focused CTA per moment (understanding &rarr; meaning &rarr; action).',
        'Our nav "solve" is pushing secondary navigation into the footer rather than the primary nav, so the primary nav can stay focused on user intent — applies both on the index and on a per-page basis.',
        'When in doubt, refer back to the brief\'s jobs-to-be-done and site goals.',
        'Bias IF:Gathering\'s media toward IF:Local content specifically, not the broadcast event.',
      ],
    },
    {
      page: 'Planned Sub-Pages (reference)',
      items: [
        '<strong>Gather Everywhere:</strong> /our-story, /careers, /give, /our-partners, /contact, /jennie-allen, plus possible ministry landers.',
        '<strong>Gather Cities:</strong> none planned — self-contained as a single lander.',
        '<strong>Gather Global:</strong> /host, /join, /partner, plus an external link to Gather Worship.',
        '<strong>IF:Gathering:</strong> /host, /join, /attend (or /tickets?), /on-demand.',
      ],
    },
  ];

  function renderGroup(group) {
    var items = group.items.map(function (item) { return '<li>' + item + '</li>'; }).join('');
    return '<div class="notes-group"><h3>' + group.page + '</h3><ul>' + items + '</ul></div>';
  }

  var overlay = document.createElement('div');
  overlay.className = 'notes-modal-overlay';
  overlay.id = 'notes-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'notes-modal-title');

  var box = document.createElement('div');
  box.className = 'notes-modal-box';
  box.innerHTML =
    '<button type="button" class="notes-modal-close" aria-label="Close">&times;</button>' +
    '<p class="notes-modal-eyebrow">Notes &amp; Open Questions</p>' +
    '<h2 class="notes-modal-title" id="notes-modal-title">Where things stand</h2>' +
    NOTES.map(renderGroup).join('');

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  function open() { overlay.classList.add('open'); }
  function close() { overlay.classList.remove('open'); }

  document.querySelectorAll('[data-open-notes]').forEach(function (btn) {
    btn.addEventListener('click', open);
  });
  box.querySelector('.notes-modal-close').addEventListener('click', close);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
