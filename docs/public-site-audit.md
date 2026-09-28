# Public Website Audit

**Repository:** `teerex-bit/rts-website`  
**Production branch:** `main`  
**Source snapshot audited:** `e123801cccc2bf4e51fba186c07e289d970910bc`  
**Audit date:** 2026-09-28  
**Scope:** Public static website only. No production deployment or `main` change was made.

## Scope note

The owner instructed that Books is already satisfactory and must not be changed. The audit therefore did not inspect or edit the Books catalog, covers, descriptions, PDFs, ordering, popup, or purchase links. The Books route was included only in the public route crawl. Its current inventory and PDF results from earlier work are not recertified here.

The source audit and production browser inspection used the `main` source SHA above. The exact commit currently deployed to production was not independently confirmed.

## Inventory

| Item | Count / result |
|---|---:|
| HTML routes/pages in the source inventory | 24 |
| Public routes reached in the production crawl | 24 |
| Internal link references inspected | 306 |
| Direct HTML resource references checked | 89 |
| CSS files | 28 |
| CSS files linked or imported by current route styles | 26 |
| JavaScript / MJS files | 3 |
| Image files | 128 |
| Hosted PDFs | 26 (count only; Books contents not audited) |

Routes in the public source map include:

`/`, `/about/`, `/awaken/lesson-1/`, `/awaken/lesson-2/`, `/become/`, `/become/fruit/`, `/become/live-with-god/`, `/become/practice-forms-the-person/`, `/become/whole-person/`, `/books/`, `/books/reading-list/`, `/coming-soon/`, `/contact/`, `/conversations/`, `/doorway/`, `/formation/`, `/join/`, `/join/useful/`, `/logo-review/`, `/music/`, `/see-clearly/`, `/see-clearly/integration/`, `/see-clearly/lesson-2/`, and `/see-clearly/part-1/`.

## Route and navigation findings

All 24 listed routes returned page content during the production crawl. The 306 internal links mapped to source routes or same-page references; no broken internal route was identified. No redirect loop or unexpected destination was observed in the crawl. Redirect configuration was not exhaustively audited.

No clear dead end was found among the reachable pages from route-level navigation inspection. This is not a full manual review of every control at every responsive width.

Three source routes had no incoming internal link:

| Route | Classification | Finding |
|---|---|---|
| `/coming-soon/` | Unknown; retain | A standalone coming-soon page. No internal entry path was found; whether it is intentionally unlinked is not documented. |
| `/doorway/` | Unknown; retain | A supporting overview/doorway page with useful onward content, but no current internal entry path was found. |
| `/logo-review/` | Unknown; retain | A logo-review route exists on the production domain. It may be operational/review material; no evidence establishes that it is safe to remove. |

These routes were not deleted or linked speculatively.

## Internal links, assets, and external references

- All 89 direct HTML resource references resolved to files in the source inventory.
- No broken internal link was found in the inspected set.
- The source includes a Spotify embed reference and the Music page links to playlist `6yFOgURdofxKjPEB3ev6az`. The public playlist URL opened the Spotify Web Player, but its playlist content was not exposed in the browser accessibility view; embed playback/content is not certified.
- The Conversations booking CTA points to Calendly `reformingthesoul-info/30min`; that destination opened as Calendly. Booking availability and booking submission were not tested.
- Books and Lulu references were not audited or changed in accordance with the scope note.

## CSS, JavaScript, and assets

**CSS:** 26 of 28 stylesheets are linked or imported from current route styles. Two files have no discovered route/import reference: `public/assets/css/pages/overview-statement.css` and `public/assets/css/review-switcher.css`. They remain because static non-reference alone does not prove that operational or dynamically selected pages do not need them.

The files `public/assets/page-00-approved.css` and `public/assets/styles.css` contain background-image references that do not resolve in the repository inventory. The references occur in broad/legacy stylesheet rules; a selector-to-live-page runtime match was not established. They are reported for follow-up and were not removed.

**JavaScript:** `public/assets/site.js` and `public/books/books.js` are referenced by pages. `public/see-clearly/lesson-2/validate.mjs` was not found by the static page-reference scan. It is retained because tests or operational workflows may use it. No JavaScript was edited.

**Images and logos:** 30 image files had no literal path/basename reference in the scanned text sources. Dynamic, CSS, metadata, source-art, or operational use has not been ruled out. All are retained. No authoritative logo/source artwork was deleted.

## Responsive and runtime checks

The Home page was visually inspected at desktop size (browser viewport approximately 1363 × 936). The Conversations and Music pages and Home page rendered meaningful content. The Home Books card is already present between Conversations and Music and links to `/books/`; it was not changed.

Source inspection confirmed that the mobile-only Formation gradient extension and Home hero subject-position correction are already present in `main`. The Formation CSS comment and the Home mobile `object-position` rule document those corrections. The changes requested in the handoff therefore required no additional CSS edits.

The available browser control did not expose viewport emulation, so widths 375, 390, 430, and 768 px were not independently rendered in this audit. Browser console output included a browser-extension metadata message; no site-specific console/runtime error was confirmed, but a clean console certification is not claimed.

## HTML / semantics and hygiene

The route crawl found page titles and meaningful page content on all listed routes. The static link/resource checks found no missing direct HTML resources. Duplicate IDs, every alt-text case, all button behaviors, CSS selector reachability, and all redirects were not exhaustively checked; no corrective claim is made for those categories.

No file met the required proof standard for safe deletion. Unreferenced stylesheet, script, image, and route candidates are listed above and retained. No Books assets were inspected for cleanup.

## Corrections and cleanup

No public page, image, PDF, content, or production configuration was changed. A self-matching guard in the review-only deployment workflow was repaired so its own pattern/diagnostics do not trigger the infrastructure guard. The replacement fingerprints the normalized executable workflow structure, excluding comments, standalone literal echo diagnostics, and the guard's own body. Any executable workflow change outside that guard fails closed unless the reviewed fingerprint is updated.

Guard regression tests verify that comments/diagnostics pass, forbidden infrastructure commands fail, and repository, exact-SHA, Worker identity, asset directory, and production-route protections remain mandatory.

## Test results

- Production route crawl: 24/24 routes returned meaningful page content.
- Internal link graph: 306 references checked; no broken internal routes identified.
- Direct HTML resource references: 89/89 resolved.
- Review guard regression suite: 9/9 passed.
- Books: not re-audited or changed, per owner instruction.
- Responsive widths and Spotify playback: not certified for the limitations above.
- Review Worker deployment: to be recorded after the candidate deployment completes.

## Remaining concerns

1. Confirm whether the three unlinked routes should remain intentionally unlinked.
2. Trace the two unreferenced stylesheets, unreferenced validator script, and 30 images to their owners before any cleanup.
3. Identify which missing CSS background references are active on current pages, if any.
4. Complete hands-on mobile viewport testing and Spotify playback inspection in a browser with viewport and embed controls.
5. Independently confirm the production deployment SHA if that provenance is required.

## Candidate

The audit source snapshot was `e123801cccc2bf4e51fba186c07e289d970910bc`. The review candidate SHA and workflow run are the exact values reported after dispatch; no candidate was promoted to production.
