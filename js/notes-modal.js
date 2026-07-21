// Shared "Notes & Open Questions" modal — one source of truth, injected on
// any page that includes this script. Triggered by any element carrying
// [data-open-notes] (the top utility bar's "Notes" button on every sub-page,
// plus the index page's own Notes button).
(function () {
  var NOTES = [
    {
      page: 'General',
      items: [
        '<strong>Copy Disclaimer:</strong> All wireframes have been planned and pored over by the Whiteboard team. Headlines have been lightly drafted for clarity of intent, and tone of voice. Paragraph messaging has been Claude Generated as directional placeholder. All messaging is meant to be directional for copywriting and editing by Jersey Road.',
        '<strong>Subpages:</strong> These landing pages aren\'t meant to hold everything themselves. This approach assumes some necessary sub-pages, outlined below.',
        '<strong>Content Flow:</strong> The content flow, per our discussion and Matt\'s audit, is to clearly answer: what is it, what does it mean for me, what\'s the action I need to take. Roughly in that order. It creates a flow from understanding &rarr; meaning &rarr; action. With a central, focused CTA per page.',
        '<strong>Nav:</strong> Reminder that Gather Everywhere &amp; Gather Cities will be on the same domain. They will share a navigation. IF:Gathering &amp; Gather27 retain their own navigation. However, in the interest of establishing clear relational lines between each brand expression, we are recommending a consistent branded watermark to go in each footer that shows all the brand expressions in symphony. Each will route to their respective pages.',
      ],
    },
    {
      page: 'Jobs To Be Done',
      items: [
        '<strong>Gather Everywhere:</strong> become a partner / donate',
        '<strong>Gather27:</strong> host a watch party / join a watch party',
        '<strong>IF:Gathering:</strong> host an IF:Local / join an IF:Local / attend the gathering',
        '<strong>Gather Cities:</strong> bring gather to your church',
      ],
    },
    {
      page: 'Strategy Considerations',
      items: [
        '<strong>Gather Everywhere Ministry Pages:</strong> Let\'s talk about the trade offs for having ministry subpages on Gather Everywhere vs linking directly out to Gather27, IF:Gathering, and Jennie Allen.',
        '<strong>IF:Gathering Media:</strong> Let\'s bias toward IF:Local content specifically as the primary expression of the event. The broadcast is the product, but the local environment is the experience.',
        '<strong>CTA Hierarchy:</strong> Gather Everywhere is now partner- and donor-focused, so Give CTAs move to Gather Everywhere, and group CTAs move to their respective events so both sit in context with their respective audiences.',
        '<strong>Jennie Allen Positioning:</strong> The most recent brand guides we received moved Jennie Allen Ministries as an adjacent brand. Let\'s talk about whether the current treatment of Jennie\'s intro on Gather Everywhere, and her position in the footer watermark solve for that new relationship.',
        '<strong>Event Content Cycles:</strong> A possible "content cycle" pattern worth exploring: Host/Join &rarr; In Case You Missed It &rarr; Watch On Demand. Let\'s talk about how you all handle this now.',
      ],
    },
    {
      page: 'Outstanding Questions',
      items: [
        '<strong>Host Hub:</strong> Is there a single, consolidated "host" hub across expressions, or does each expression keep its own separate hosting flow? (per Matt\'s audit)',
        '<strong>Sub-Brands:</strong> Where do Everybody Everywhere and Gather Worship fit into the ecosystem?',
        '<strong>Gather Cities Pitch:</strong> What\'s the value pitch to churches for Gather Cities? What do pastors get out of hosting?',
        '<strong>"Join" vs. "Find":</strong> which verb should we standardize on site-wide?',
      ],
    },
    {
      page: 'Planned Sub-Pages (reference)',
      items: [
        '<strong>Gather Everywhere:</strong> /our-story, /careers, /give, /our-partners, /contact, /jennie-allen, plus possible ministry landers.',
        '<strong>Gather Cities:</strong> none planned — self-contained as a single lander.',
        '<strong>Gather27:</strong> /host, /join, /partner, plus an external link to Gather Worship.',
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
