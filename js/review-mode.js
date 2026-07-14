// Review Mode — Section 9 of "Gather - Interactive Wireframe Build Context".
// Standalone project, browser storage only (no backend), per the brief.
(function () {
  var STORAGE_NOTES = 'gather-review-notes';
  var STORAGE_ACTIVE = 'gather-review-mode-active';
  var manifest = window.GATHER_SECTIONS || {};
  var currentPage = document.body.getAttribute('data-page');

  function loadNotes() {
    try { return JSON.parse(localStorage.getItem(STORAGE_NOTES)) || {}; }
    catch (e) { return {}; }
  }
  function saveNotes(notes) {
    localStorage.setItem(STORAGE_NOTES, JSON.stringify(notes));
  }
  function getNote(pageKey, sectionId) {
    var notes = loadNotes();
    return (notes[pageKey] && notes[pageKey][sectionId]) || '';
  }
  function setNote(pageKey, sectionId, text) {
    var notes = loadNotes();
    if (!notes[pageKey]) notes[pageKey] = {};
    if (text.trim()) {
      notes[pageKey][sectionId] = text;
    } else {
      delete notes[pageKey][sectionId];
    }
    saveNotes(notes);
  }

  function toast(msg) {
    var el = document.getElementById('review-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'review-toast';
      el.className = 'review-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(function () { el.classList.remove('show'); }, 1800);
  }

  function buildToggle() {
    var btn = document.createElement('button');
    btn.id = 'review-toggle';
    btn.textContent = 'Leave Feedback';
    btn.addEventListener('click', function () {
      var active = !document.body.classList.contains('review-mode');
      setActive(active);
    });
    document.body.appendChild(btn);
    return btn;
  }

  function buildPanelToggle() {
    var btn = document.createElement('button');
    btn.id = 'review-panel-toggle';
    btn.textContent = 'Notes';
    btn.addEventListener('click', function () {
      document.getElementById('review-panel').classList.toggle('open');
    });
    document.body.appendChild(btn);
  }

  function buildPanel() {
    var panel = document.createElement('div');
    panel.id = 'review-panel';
    panel.innerHTML = '<h2>Review Notes</h2><div id="review-panel-list"></div>' +
      '<div class="panel-actions">' +
      '<button id="review-export">Export Feedback</button>' +
      '</div>';
    document.body.appendChild(panel);
    document.getElementById('review-export').addEventListener('click', exportFeedback);
  }

  function renderPanel() {
    var list = document.getElementById('review-panel-list');
    if (!list) return;
    var notes = loadNotes();
    var html = '';
    Object.keys(manifest).forEach(function (pageKey) {
      var page = manifest[pageKey];
      html += '<div class="panel-page"><h3>' + page.label + '</h3><ul>';
      page.sections.forEach(function (s) {
        var hasNote = !!(notes[pageKey] && notes[pageKey][s.id]);
        var href = pageKey === currentPage ? '#' + s.id : page.file + '#' + s.id;
        html += '<li><a href="' + href + '" data-page="' + pageKey + '" data-section="' + s.id + '">' +
          '<span class="dot' + (hasNote ? ' filled' : '') + '"></span>' + s.label + '</a></li>';
      });
      html += '</ul></div>';
    });
    list.innerHTML = html;
    list.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (a.getAttribute('data-page') === currentPage) {
          e.preventDefault();
          var target = document.getElementById(a.getAttribute('data-section'));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function exportFeedback() {
    var notes = loadNotes();
    var blocks = [];
    Object.keys(manifest).forEach(function (pageKey) {
      var page = manifest[pageKey];
      page.sections.forEach(function (s) {
        var text = notes[pageKey] && notes[pageKey][s.id];
        if (text) {
          blocks.push('## ' + page.label + ' — ' + s.label + '\n\n' + text);
        }
      });
    });
    if (!blocks.length) {
      toast('No feedback yet to export');
      return;
    }
    var md = blocks.join('\n\n');
    var copied = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).then(function () {
        toast('Copied to clipboard + downloading');
      }).catch(function () {});
      copied = true;
    }
    var blob = new Blob([md], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'gather-wireframe-feedback.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    if (!copied) toast('Feedback downloaded');
  }

  function attachSectionControls() {
    if (!manifest[currentPage]) return;
    manifest[currentPage].sections.forEach(function (s) {
      var section = document.getElementById(s.id);
      if (!section) return;

      var commentBtn = document.createElement('button');
      commentBtn.className = 'review-comment-btn';
      commentBtn.setAttribute('aria-label', 'Leave feedback on ' + s.label);
      commentBtn.textContent = '✎'; // pencil
      section.appendChild(commentBtn);

      var box = document.createElement('div');
      box.className = 'review-note-box';
      var existing = getNote(currentPage, s.id);
      box.innerHTML = '<textarea placeholder="Notes on ' + s.label + '&hellip;">' + existing + '</textarea>' +
        '<div class="row"><span>Saves automatically</span><button type="button" class="close-note">Close</button></div>';
      section.appendChild(box);

      if (existing) commentBtn.classList.add('has-note');

      var textarea = box.querySelector('textarea');
      textarea.addEventListener('input', function () {
        setNote(currentPage, s.id, textarea.value);
        commentBtn.classList.toggle('has-note', !!textarea.value.trim());
        renderPanel();
      });

      commentBtn.addEventListener('click', function () {
        box.classList.toggle('open');
        if (box.classList.contains('open')) textarea.focus();
      });
      box.querySelector('.close-note').addEventListener('click', function () {
        box.classList.remove('open');
      });
    });
  }

  function setActive(active) {
    document.body.classList.toggle('review-mode', active);
    var toggleBtn = document.getElementById('review-toggle');
    if (toggleBtn) toggleBtn.classList.toggle('active', active);
    localStorage.setItem(STORAGE_ACTIVE, active ? '1' : '0');
    if (!active) {
      document.getElementById('review-panel').classList.remove('open');
    }
  }

  function init() {
    document.body.classList.add('has-review-toggle');
    buildToggle();
    buildPanelToggle();
    buildPanel();
    attachSectionControls();
    renderPanel();
    var wasActive = localStorage.getItem(STORAGE_ACTIVE) === '1';
    setActive(wasActive);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
