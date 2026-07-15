// Single source of truth for Review Mode: every page + its top-level sections.
// Section ids here MUST match the id="" on each <section> in the page markup.
window.GATHER_SECTIONS = {
  'gather-everywhere': {
    label: 'Gather Everywhere',
    file: 'gather-everywhere.html',
    sections: [
      { id: 'hero', label: 'Hero' },
      { id: 'why-now', label: 'Why Now' },
      { id: 'flywheel', label: 'Flywheel' },
      { id: 'expressions', label: 'Three Expressions' },
      { id: 'founder', label: 'Founder Tie-In' },
      { id: 'proof', label: 'Proof' },
      { id: 'partners', label: 'Partners' },
      { id: 'cta', label: 'Closing CTA' },
    ],
  },
  'gather-global': {
    label: 'Gather Global (Gather27)',
    file: 'gather-global.html',
    sections: [
      { id: 'hero', label: 'Hero' },
      { id: 'about', label: 'About' },
      { id: 'what-it-is', label: 'The Event' },
      { id: 'leaders', label: 'Leaders / Locations' },
      { id: 'proof', label: 'Global Proof' },
      { id: 'get-involved', label: 'Get Involved' },
      { id: 'faq', label: 'FAQ' },
      { id: 'partners', label: 'Partners' },
      { id: 'stories', label: 'Global Stories' },
    ],
  },
  'gather-cities': {
    label: 'Gather Cities',
    file: 'gather-cities.html',
    sections: [
      { id: 'hero', label: 'Hero' },
      { id: 'what-it-is', label: 'What It Is' },
      { id: 'why', label: 'Why Bring It Here' },
      { id: 'how-it-works', label: 'How It Works' },
      { id: 'proof', label: 'Proof' },
      { id: 'cta', label: 'Partner / Inquiry CTA' },
      { id: 'faq', label: 'FAQ' },
    ],
  },
  'if-gathering': {
    label: 'IF:Gathering',
    file: 'if-gathering.html',
    sections: [
      { id: 'hero', label: 'Hero' },
      { id: 'story', label: 'Our Story' },
      { id: 'what-it-is', label: 'What It Is' },
      { id: 'get-involved', label: 'Get Involved' },
      { id: 'leaders', label: 'Leaders' },
      { id: 'proof', label: 'Proof / Stories' },
      { id: 'give', label: 'Give' },
      { id: 'faq', label: 'FAQ' },
    ],
  },
};
