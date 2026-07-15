# Gather Wireframes — Onboarding Brief

Read this first in a new session. It gets you back to full speed on this project without re-deriving anything from scratch.

## What this is

Interactive, coded wireframes (plain HTML/CSS/JS, no build step) for **Gather** — a global Christian movement founded by Jennie Allen — built by **Whiteboard** (an agency; the user, Jordan, works there). This is a client deliverable: four landing pages for the Gather ecosystem, meant to be reviewed live in a browser, not static comps.

The brief came from two Google Drive docs (both owned by jordan@whiteboard.is, accessible via the connected Google Drive MCP tool):
- **"Gather - Interactive Wireframe Build Context"** (doc ID `1anMi_qgJ23EdPBqD6HclnR_iod_7RoVASYYVvAEINV4`) — design tokens, logo rules, color pairings, per-expression motifs/copy, page-by-page section lists, and a Review Mode feature spec.
- A companion doc, "Jennie Allen - Landing Pages Content Scaffolding & Build Brief.md" — fuller section-by-section content rationale (referenced but not re-read every session; re-fetch via Drive search if content questions come up that this brief doesn't answer).

Brand ecosystem: **Gather Everywhere** (parent hub) → three expressions: **Gather Global** (Gather27, the 24-hour global broadcast), **Gather Cities** (local church-led city activations), **IF:Gathering** (women's discipleship movement, Jennie's original project).

## Where everything lives

- **Repo**: `/Users/jordan/Desktop/claude/Gather Wireframes` (a sibling of `Alterion Web`, NOT the same project — if your session's nominal working directory is `Alterion Web`, `cd` into this folder for all work here).
- **Remote**: `origin` → `https://github.com/jordanepperson/gather-wireframes.git`, branch `main`.
- **A second, parallel Claude Code/Cowork session has been handling deployment/hosting setup** (Vercel — see `.vercel/` dir, gitignored). Always `git fetch origin` and check `git status -sb` before starting work, and push after each verified change — this has been the working norm all session, since both sessions commit to the same repo.
- **Local preview server**: plain Python static server, e.g. `cd "Gather Wireframes" && python3 -m http.server 5173 &`, then open `http://localhost:5173/index.html` in the Browser pane. (Do NOT open pages via `file://` — relative asset paths and the review-mode/tab JS need a real origin.)

## Pages & where each one stands

| Page | Status |
|---|---|
| `index.html` | Dark-mode navigation hub, links to the four pages below. Fairly settled. |
| `gather-everywhere.html` | **The one we've iterated on heavily** — full content pass done section-by-section (hero, why-now, what-we-do/globe, events tabs, founder, art-moment, stories, partners, closing CTA). This is the reference implementation for patterns (see below). |
| `gather-global.html` | Built early (initial scaffold + logo pass), has **not** had the deep content/design iteration that Gather Everywhere got. |
| `gather-cities.html` | Same — early scaffold only, no deep pass yet. |
| `if-gathering.html` | Same — early scaffold only, no deep pass yet. |

**Natural next step**: the user works "page by page" — Gather Global, Cities, or IF:Gathering are the obvious next targets, applying the same kind of section-by-section content/design rigor already done on Gather Everywhere.

## Design system (shared across pages)

- `css/tokens.css` — colors (`--color-off-white #FFFAF0`, `--color-bright-blue #2A5ED8`, `--color-dark-blue #12161D`, `--color-light-blue #BDD8E7`), type scale, spacing scale, and four `.pairing-01`–`.pairing-04` utility classes (background/heading/body/accent/button color sets, straight from the brand doc's color-pairing table).
- `css/base.css` — reset, layout, buttons, motif shapes (`.motif-ripple`, `.motif-circle`, `.motif-dot-globe`, `.motif-constellation`), the floating back-to-index button, `overflow-x: hidden` on `html`/`body` (fixes a real bug where `.motif-ripple`'s bleed rings could create a phantom horizontal scrollbar at narrow viewports).
- Fonts: Plus Jakarta Sans (primary) + Instrument Serif (secondary/accent, italic by default — regular weight is IF:Gathering-only per brand doc), loaded via Google Fonts CDN.
- **Known gotcha**: centering an eyebrow/small-caps label needs both `text-align:center` AND `margin-inline:auto` — the global `p { max-width: 60ch }` rule shrinks the element's own box down (ch scales with that element's small font-size), so without the auto margin it centers text within a box that itself isn't centered. Bit this twice already; check for it whenever a centered label looks off.
- Logos in `assets/`: `gather-dark/light.svg` (parent mark), `gather-27-dark/light/blue.svg`, `gather-cities.svg` + `gather-cities-dark.svg` (the dark variant was added by the user mid-session), `if-gathering-dark.svg` (no light variant exists — IF pages are always light-background, so this hasn't been a problem).

## Patterns built (all currently only on `gather-everywhere.html` — not yet ported to the other 3 pages)

- **Nav**: "Give" button + circular hamburger toggle → dropdown panel grouped into "Gather Everywhere" / "The Movement" / "Partner" (see `js/nav-menu.js`, shared, but only wired up on this page's markup so far). The other 3 pages still use an older inline anchor-nav style from the initial build.
- **"Goes to: X" cursor tooltip** on real navigation buttons (inline script + `DESTINATIONS` map at the bottom of `gather-everywhere.html`) — follows the cursor, shows on hover, deliberately skips placeholder `href="#"` buttons that don't go anywhere real yet.
- **Content-note pattern for placeholders**: visible small italic caption baked into the placeholder (not a hover tooltip) — decided because these notes are for whoever sources the real photo/video later, not an interactive affordance for an end user. Applied to the Jennie Allen video placeholder and the art-moment section; not yet retrofitted onto the hero image / event photos / story-grid photos (offered, not done — ask if wanted).
- **Real rotating globe** (in the "What We Do" section): d3-geo orthographic projection + `world-atlas` topojson country data, loaded via jsdelivr CDN (`d3@7`, `topojson-client@3`, `world-atlas@2/countries-110m.json`). Renders actual country borders, properly foreshortened rotation via `requestAnimationFrame`, and lat/long-accurate dot markers for the countries referenced in the events/stories sections. Respects `prefers-reduced-motion`. This is a real external network dependency (CDN), consistent with already using Google Fonts from a CDN.
- **Review Mode** (section-by-section feedback UI, localStorage-backed) exists in `js/review-mode.js` + `css/review-mode.css` but is **currently disabled** — `var ENABLED = false;` at the top of `js/review-mode.js`. The client said feedback is going through chat "for now"; flip that one flag back to `true` to re-enable it everywhere (it's already wired into all 4 pages via `data-page` attributes + `js/sections-manifest.js`).

## Working style notes

- User wants everything **verified in the browser**, not just claimed done — screenshot or JS-assertion proof before saying something works. Several real bugs were caught this way (invisible off-white-on-off-white text from CSS custom-property inheritance, the ripple-motif horizontal-overflow bug, the "goes nowhere" Give button).
- Fast, iterative, high-volume requests — batches of 5-10 discrete asks per message are normal; work through them as a list, verify at the end, one commit + push per batch (not per line-item).
- Push cadence: push after essentially every verified commit — established explicitly as the norm since two sessions share this repo.
- Silently fix obvious typos in requested copy (has come up a couple of times) rather than reproducing them literally.
- When a design/content question is genuinely open (not just "implement X"), give a short recommendation + the main tradeoff and ask before committing to it, rather than silently picking one.

## If you need to re-read the source briefs

Use the Google Drive MCP tools (`read_file_content` with the doc ID above, or `search_files` with a query like `title contains 'Gather'`) — don't guess at brand facts (colors, stats, naming) that are already resolved in the build-context doc; it explicitly flags what's settled vs. still open.
