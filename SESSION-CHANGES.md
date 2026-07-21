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

## Follow-up: revert Gather27's social handles, note naming decision
- Reverted the `@gather27` social handle placeholders back to
  `@gatherglobal` on Gather27's own footer — the one deliberate
  exception to the rename, per explicit client direction.
- Added a "Naming decided" note to `ONBOARDING.md`'s brand ecosystem
  section flagging Gather27 as final, so a future session doesn't
  mistake earlier "Gather Global" history in the logs as license to
  reintroduce it live.
- `gather-global.html`, `ONBOARDING.md`

## Client feedback: Gather27 page content updates
- Hero eyebrow: "Gather27 — 2027" &rarr; "A Global Gathering".
- Every "Host a Watch Party" CTA (nav, hero info-bar, Commission pillar,
  host-card heading + button, closing CTA — 6 instances) renamed to
  "Host a Gathering."
- Take Part section: added a "Watch from Anywhere" tertiary CTA
  (`data-tooltip="/watch"`) under the Find a Gathering banner.
- New **What Hosts Get** section, right after Take Part: Host Guide,
  Promotional Materials, Worship Resources, A Spot on the Map — reusing
  the existing `.how-it-works`/`.how-step` pattern. The two existing
  "host toolkit" mentions (FAQ, worship-song caption) now link to this
  section (`#what-hosts-get`) instead of dangling as plain text.
  `js/sections-manifest.js` updated to match.
- Partners section restructured: asked first, since none of the 24
  partners were actually rendered as logo images (all identical
  dashed-border placeholder boxes) and no real logo files exist in
  `assets/` for YouVersion/Alpha/RightNow Media. Per Jordan's answer,
  kept the same placeholder-box treatment for just the 4 called out
  (IF:Gathering, YouVersion, Alpha, RightNow Media) and moved the
  remaining 20 partners into a plain comma-separated text line below.
- `gather-global.html`, `js/sections-manifest.js`

## Client feedback: refine the new Gather27 sections
- **Watch from Anywhere**: found and fixed a real centering bug while
  looking into this — the CTA paragraph inherits the site's global
  `p { max-width: 60ch }` rule, which shrinks its own box narrower than
  the container, so `text-align: center` was only centering the text
  within an off-center box (the same "text-align + margin-inline:auto"
  gotcha documented for eyebrow labels elsewhere on the site). Added
  `margin-inline: auto` to actually center the box itself — verified the
  text's bounding box now sits exactly centered in its container.
- **What Hosts Get**: converted the 4 items from a free-flowing row into
  a proper 2x2 grid (`.host-benefits-grid`), each wrapped in a bordered
  card (`.bordered-card`: 1px border, rounded corners, padding). Framed
  the whole section with matching top and bottom divider lines
  (`.host-benefits-frame`) so it reads as bookended.
- **Partners**: converted the plain-text partner list from one
  comma-separated paragraph into a vertical list (one name per line,
  thin dividers between rows), with "and more" appended as the final
  item.
- `gather-global.html`

## Client feedback: email-capture opportunity in every footer
Added a shared "Stay in the Loop" email-capture block (heading + short
page-specific line + email input + Sign Up button) as the first element
inside `<footer>` on all four sub-pages. Built as a new shared component
(`.footer-email-capture`) in `css/base.css`, using the same `currentColor`
trick as `.btn-outline` so the input border and button colors adapt
automatically to each page's own pairing tokens — no per-page overrides
needed. Confirmed this correctly picks up IF:Gathering's existing
page-scoped `--btn-bg`/`--btn-text` override (light-blue/dark-blue,
matching its "Host IF:" button) rather than the generic pairing-01
default, which is expected, not a bug.
- `css/base.css`, `gather-everywhere.html`, `gather-global.html`,
  `gather-cities.html`, `if-gathering.html`

## Correction: globe should feature hosting highlights, not fixed hubs
First pass only renamed the stat-callout caption. Client clarified: the
globe itself should conceptually drop the "regional hub" framing (fixed,
official relay-broadcast anchor points) in favor of "hosting highlights"
— a handful of illustrative real-world locations, in the same spirit as
the watch-party ticker beneath the globe. Swapped the 7 structural hub
dots (Dallas/Auckland/Kuala Lumpur/Cluj/Kigali/London/Lima, each tagged
by continent) for 7 cities pulled directly from the existing ticker data
(London UK, Nairobi Kenya, Hong Kong, Geelong Australia, Lubbock Texas,
Geneva Switzerland, Villa Nueva Guatemala) so the globe and ticker feel
like one consistent picture rather than two disconnected data sets.
Stat callout now reads "Hosting highlights from around the world."

**Left untouched, flagged for a decision**: "regional hub(s)" still
appears in this page's own prose elsewhere (the About paragraph, two FAQ
answers, and the Pray section) — the ask was scoped to the globe/map
specifically, so those weren't touched. Say the word if those should
drop the "hub" framing too.
- `gather-global.html`

## Client feedback: wrap the footer email-capture in a bordered card
Wrapped `.footer-email-capture-inner` in a soft-bordered card (padding,
1.25rem radius, and a translucent border via `color-mix(in srgb,
currentColor 18%, transparent)`) — first use of `color-mix()` in this
codebase, chosen specifically because a flat `currentColor` border
would've been too heavy/high-contrast against each page's own
background; the translucency needed to adapt across all four pairing
color schemes without per-page overrides. Verified computed border
color resolves correctly on both light (dark-blue-derived) and dark
(off-white-derived) footers.
- `css/base.css`

## Client feedback: resolve ticket contradiction, fix event toolbar label
- Tickets to the live event are real. The FAQ answer for "How do I get
  tickets to the main IF:Gathering?" previously said "There's no
  traditional ticket to buy" — directly contradicting the "Get Tickets
  Here" CTA elsewhere on the page. Rewrote the answer to lead with
  ticket availability (linking to the same `/tickets` tooltip target as
  the existing CTA) while still explaining that most people experience
  IF:Gathering through an IF:Local instead.
- Event toolbar's "Format" value changed from "Back to two days" to
  "Two days" — the toolbar already followed Gather27's When/What/Format
  pattern, this was just a copy fix.
- `if-gathering.html`

## Client feedback: add Host Login to the global nav bar
Added a "Host Login" link to the right side of the shared `.gather-nav`
bar on all four pages, while the four expression links stay grouped on
the left (`margin-left: auto` on the new `.gather-nav-login` link).
Placeholder `href="#"` with a `/host-login` tooltip, consistent with
the site's tooltip-only-placeholder-links convention. Verified via
layout measurements and screenshots on all four pages.
- `css/base.css`, `gather-everywhere.html`, `gather-global.html`,
  `gather-cities.html`, `if-gathering.html`

## Client feedback: add a What Hosts Get section to IF:Gathering
Added the same "What Hosts Get" pattern built for Gather27 — eyebrow,
heading, and a 2x2 grid of bordered cards (Host Guide, IF:Studies,
Promotional Materials, A Spot on the Map) — right after the "Fire up
the group chat" (Get Involved) section, framed top/bottom to match.

CSS classes (`.how-step`, `.how-step-number`, `.host-benefits-frame`,
`.host-benefits-grid`, `.bordered-card`) are duplicated page-scoped in
IF:Gathering's own `<style>` block rather than shared, matching this
codebase's existing convention (Gather27's own version lives the same
way, page-scoped, not in `css/base.css`). Border colors adapted for
this page's light background (`rgba(18,22,29,0.12)` vs Gather27's
`rgba(255,250,240,0.15)`) — verified via computed styles. Card content
is IF:Local-specific (studies/discipleship framing) rather than a copy
of Gather27's watch-party framing. `js/sections-manifest.js` updated
with the new section entry.
- `if-gathering.html`, `js/sections-manifest.js`

## Client feedback: IF:Gathering CTA copy renames
Renamed two phrases everywhere they appear on the page (button labels
and headings alike, as substrings where they're part of a longer
string):
- "Host IF:" &rarr; "Host An IF:" (nav CTA, hero info-bar CTA, Get
  Involved button — plus the "Host IF:Local" heading, which becomes
  "Host An IF:Local").
- "Find an IF:Local" &rarr; "Find An IF:" (Get Involved button, plus the
  "Find an IF:Local Near You" heading, which becomes "Find An IF: Near
  You").
- `if-gathering.html`

## Client feedback: remove the "7 Hosting Highlights" stat card
Removed the small floating stat card (`.globe-stat-edge`) that sat at
the globe's edge showing the "7" number + "Hosting highlights from
around the world" label. Deleted the markup and its now-dead CSS
(`.globe-stat-edge`, `.globe-stat-number`, `.globe-stat-label` — none
used elsewhere in this file). The globe itself and its 7 hosting-
highlight dots/labels are unaffected.
- `gather-global.html`

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
