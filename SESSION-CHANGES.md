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

## Client feedback: remove wireframe utility bar, gather-nav becomes non-sticky
Follow-up round on the same nav work:
- Removed `.site-utility-bar` entirely (all 4 sub-pages) — its sibling-page
  logos were already superseded by `.gather-nav`, and Home/Notes needed a
  new home anyway.
- Home + Notes now live in a new `.corner-cluster`: fixed to the bottom-left
  corner, tight 8px gap, both buttons standardized to the same 36px height.
- Voiceover button removed outright — both the copy that lived in the old
  utility bar and the one on the index page (`index.html`'s "Watch Voice
  Over (27 min)" link is gone).
- `.gather-nav` is no longer sticky — it now scrolls away with the page.
- New "layer" effect: each page's own header (`.page-top-layer`) gets a
  negative top margin + rounded top corners, so it visually sits as a card
  on top of `.gather-nav`'s dark band, revealing a sliver of that band's
  color peeking through the two top corners. Gather Global's header
  background is nearly the same dark as the band, so it also gets an
  explicit 1px border (top/left/right) to make the rounded edge visible —
  the other three pages' off-white headers already contrast enough on
  their own.
- Reverted Gather Global's `.sticky-nav` and IF:Gathering's `.site-header`
  sticky `top` offset back to `0` (no longer any sticky bar above them to
  clear, since `.gather-nav` isn't sticky anymore).
- Re-tuned Gather Cities' `.hero-top` full-viewport-height calc from
  `calc(100vh - 143px)` down to `calc(100vh - 118px)`, measured live —
  the header's negative-margin overlap with `.gather-nav` changes the
  actual in-flow height above the hero, so the constant needed a second
  correction pass (verified to within 0.1px of the exact viewport height).
- Known trade-off, flagged rather than "fixed": since `.corner-cluster` is
  `position: fixed`, it can overlap real page content depending on scroll
  position — confirmed on IF:Gathering's mobile view, where it briefly
  sits over part of the hero-info-bar. Inherent to any fixed corner
  widget; left as-is pending a decision on whether it's worth addressing.
- `css/base.css`, `index.html`, `gather-everywhere.html`,
  `gather-global.html`, `gather-cities.html`, `if-gathering.html`

## Client feedback: more breathing room above gather-nav
Links felt cramped against the very top edge of the viewport. First
pass added `padding-top: max(1.25rem, env(safe-area-inset-top))` to
`.gather-nav` (20px) — still looked cramped in a follow-up screenshot,
so bumped it again to `calc(2rem + env(safe-area-inset-top, 0px))`
(32px), which reads as a clearly visible gap now.

Each height change cascaded into Gather Cities' hero full-viewport-height
calc, since `.gather-nav` isn't sticky and its height is part of the
in-flow space above the hero — this went through two more tuning passes
this round (`118px` &rarr; `128px` &rarr; `140px`), each re-measured live
and landing within 0.4px of exact. Gather Global/IF:Gathering needed no
change since their sticky headers already sit at `top: 0`, independent
of `.gather-nav`'s height.
- `css/base.css`, `gather-cities.html`

## Client feedback: rename "Gather Global" to "Gather27" everywhere
Bulk renamed every mention of "Gather Global" to "Gather27" across all
live site files (index, all four sub-pages, shared CSS/JS) — nav links,
headings, alt text, tag pills, FAQ copy, section labels, `<title>` tags.
Also renamed the placeholder social handles (`@gatherglobal` &rarr;
`@gather27`) on Gather Global's own footer for consistency.

Two spots needed manual fixes after the mechanical rename, since a blind
replace would have made them nonsensical:
- Gather Global's footer disclaimer read "Gather27 and Gather Global are
  part of Gather..." (two names for the same expression) &rarr; became a
  duplicate "Gather27 and Gather27" — fixed to the singular "Gather27 is
  part of Gather...", matching the pattern already used on IF:Gathering's
  footer.
- The Notes modal's Outstanding Questions had "Gather Global vs Gather27:
  what is the final naming hierarchy?" — this instruction directly
  resolves that question, so a blind rename would've produced "Gather27
  vs Gather27." Removed the bullet outright rather than leave it broken
  (Outstanding Questions: 5 items &rarr; 4).

**Left untouched, flagged for a decision**: this rename did not touch
`ONBOARDING.md` or `SESSION-CHANGES.md` itself — both are historical/
reference logs describing what was true *at the time of writing* (e.g.
past commits, past session states), and rewriting "Gather Global" to
"Gather27" retroactively in those would misrepresent when the naming
actually changed. Say the word if you'd like `ONBOARDING.md`'s
current-state sections (not its narrative history) updated too.
- `index.html`, `gather-everywhere.html`, `gather-global.html`,
  `gather-cities.html`, `if-gathering.html`, `css/base.css`,
  `css/tokens.css`, `js/sections-manifest.js`, `js/notes-modal.js`

## Correction: the gap needed was at the bottom of gather-nav, not the top
Follow-up screenshot showed the real problem — `.gather-nav`'s links sat
right up against the header's rounded top corner below, not the viewport
edge above. The two earlier top-padding passes were fixing the wrong
side. Added `padding-bottom: 2rem` to `.gather-nav` (previously the
shorthand's plain 0.6rem) so there's a clear dark band visible between
the links and the header card's rounded edge, regardless of the header's
-1.5rem overlap eating into it.

Cascaded into a fourth tuning pass on Gather Cities' hero calc (`140px`
&rarr; `163px`), re-measured live and landing within 0.3px of exact.
- `css/base.css`, `gather-cities.html`
