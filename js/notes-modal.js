// Shared "Notes & Open Questions" modal — one source of truth, injected on
// any page that includes this script. Triggered by any element carrying
// [data-open-notes] (the top utility bar's "Notes" button on every sub-page,
// plus the index page's own Notes button).
(function () {
  var NOTES = [
    {
      page: 'Global Updates',
      items: [
        '<strong>Global Nav:</strong> Added a Gather bar above every site that shows all four expressions and highlights the current one, plus a "Host Login" link on the right.',
        '<strong>Email Capture:</strong> Added an email-capture block to every site.',
        '<strong>Global Footer:</strong> Added Pray and Give buttons to every footer, plus ECFA, Candid, and Excellence in Giving trust badges.',
        '<strong>CTA Language:</strong> Standardized to one consistent set of actions everywhere: "Host a Gathering," "Host an IF," "Find a Gathering," "Find an IF," "Watch from Anywhere." Retired "watch party," "Gather Group," and "Join" as button language, replacing every "Join" with "Find a Gathering."',
        '<strong>FAQ:</strong> Each event page now answers "How is this free?" and routes people to the giving page.',
      ],
    },
    {
      page: 'Gather Everywhere',
      items: [
        '<strong>Pray / Give / Partner:</strong> Added clear paths to all three near the top of the page.',
        '<strong>Upcoming Gathering:</strong> Added a direct route to the latest Gathering.',
        '<strong>Partners:</strong> Rebuilt the Partners section to be more robust.',
      ],
    },
    {
      page: 'Gather27',
      items: [
        '<strong>Naming:</strong> Renamed to "Gather27" everywhere on the site.',
        '<strong>Main CTA:</strong> Updated to "Host a Gathering."',
        '<strong>Watch:</strong> Added a /watch path.',
        '<strong>What Hosts Get:</strong> Added a new section.',
        '<strong>Globe:</strong> Changed from fixed regional hubs to hosting highlights.',
        '<strong>Partners:</strong> Updated the Partners section.',
      ],
    },
    {
      page: 'IF:Gathering',
      items: [
        '<strong>CTAs:</strong> Updated to "Host An IF:," with "Find An IF:" for people who want to attend.',
        '<strong>Tickets:</strong> Removed the contradiction between "Get Tickets" and "no traditional ticket to buy."',
        '<strong>Event Toolbar:</strong> Updated to say "Two days."',
        '<strong>What Hosts Get:</strong> Added a new section.',
      ],
    },
    {
      page: 'Gather Cities',
      items: [
        '<strong>Messaging:</strong> Updated with pastor- and city-focused messaging.',
        '<strong>CTA:</strong> Updated to "Start the Conversation."',
        '<strong>What This Is Not:</strong> Added a new section.',
        '<strong>Dallas:</strong> Added a Dallas event pathway.',
        '<strong>Social Proof:</strong> Trimmed the section down.',
      ],
    },
    {
      page: 'Notes for Design',
      items: [
        '<strong>Global Cohesiveness:</strong> Our main feedback is that these should not feel like four separate websites. They should feel like one connected movement with several clear ways in. The three most important outcomes: make the movement feel connected, give every visitor a clear next step, and capture that next step so we can invite people from watching, to attending, to hosting.',
      ],
    },
    {
      page: 'Notes for Dev',
      items: [
        '<strong>HubSpot &amp; Follow-up:</strong> Every action should be captured and source-tagged in HubSpot, including host registrations, Finder activity, RSVPs and tickets, watch registrations, giving, partner inquiries, prayer signups, Cities conversations, IF subscriptions, and story submissions. Every form should identify whether the person plans to host, attend, or watch alone, and that answer should guide the follow-up they receive.',
        '<strong>Give Page:</strong> Should support both one-time and monthly gifts.',
        '<strong>Sunsetting Everybody Everywhere:</strong> Should remain connected to giving and generosity language rather than becoming a separate website destination.',
        '<strong>Stories Farming:</strong> Should use one shared submission process with a clear internal owner.',
        '<strong>Site States:</strong> Each event page should have three planned states: Before (watch, attend, and host), During (watch live), After (watch on demand).',
        '<strong>Gather Cities:</strong> Needs a dedicated Dallas event page, including the gathering, the leaders\' event, participating churches, and free ticketed registration. Dates and venues stay placeholders until confirmed.',
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
