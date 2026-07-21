# Session Changes — 2026-07-21

Running log of changes made this session, for packaging into documented
revision notes at the end. Newest entries at the bottom.

## Client feedback: real global ecosystem nav (all 4 pages)
Client asked to explore "a simple Gather bar above each site that shows
the expressions and highlights the current one" — as an actual part of
the shipped website, distinct from the `.site-utility-bar` we'd built
for wireframe review only (Home/Notes/Voiceover — that one goes away at
delivery). Direction confirmed: neutral/dark, reading as "the ecosystem"
rather than any one expression's own brand color.

Built a new `.gather-nav` component: a slim (~45px) sticky strip listing
all four expressions as plain text links, current page shown at full
opacity with a bright-blue underline (deliberately different from the
utility bar's dot-indicator, so review tooling and real product don't
look alike). Sits directly between the utility bar and each page's own
branded header on all four sub-pages.

Follow-on fixes needed to keep stacking/offsets correct now that there
are two sticky bars instead of one:
- Gather Global's `.sticky-nav` and IF:Gathering's `.site-header` (both
  sticky, sitting below the bars) had their `top` offset bumped from
  48px to 100px (measured: utility bar ~54px + gather-nav ~45px).
- Gather Cities' `.hero-top` full-viewport-height calc moved from
  `calc(100vh - 98px)` to `calc(100vh - 143px)` (added gather-nav's
  measured height to the existing constant) to preserve the same hero
  proportions as before.
- `css/base.css`, `gather-everywhere.html`, `gather-global.html`,
  `gather-cities.html`, `if-gathering.html`
