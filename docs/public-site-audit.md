# Public Website Audit

Audit date: 2026-09-28

Repository: `teerex-bit/rts-website`

Production branch: `main`

Preserved audit record; cleanup rebased onto current `main` at `2772998f4b67d1cf7ac4350043e91ee23e8c9f90`.

## Authority and scope

The audit originally began from `main` at `e123801cccc2bf4e51fba186c07e289d970910bc`. Cleanup was later rebuilt from current `main` at `2772998f4b67d1cf7ac4350043e91ee23e8c9f90` so already-promoted website changes are not reintroduced. GitHub Actions production run #21 (`36355741269`) is the latest successful deployment found during the audit; it checked out that same SHA and its Cloudflare deploy step succeeded. That confirms the deployed source identity recorded by the workflow. The live apex homepage was opened and matched the current source. `www.reformingthesoul.com` also served the homepage, but stayed on the `www` host rather than redirecting to the apex. Both hosts are configured as custom domains in the source.

The audit covered the public site outside Books. It did not inspect Books pages, catalog, art, PDFs, click analytics, protected Worker handler code, or mixed stylesheet content. It did not access Deep Dive, Vercel, Supabase, Google Drive, Lulu, DNS, or unrelated repositories. No external account login or user participation was needed for the public audit. No external service was modified and no data was submitted.

**No user login is needed to continue this audit.** The only blocked step is review deployment: its required all-tests command includes Books-related tests, which cannot be run under this task's protection rule. Mobile viewport control is also unavailable in the current browser, so those visual checks remain unverified rather than requiring a user login.

## Route and page inventory

There are 22 in-scope static `index.html` routes. All were opened directly in the production browser and had a page title and page content. The local source route check returned 200 for all 22 routes. The local 307-reference check below covers first-party references outside Books and the protected mixed stylesheet; it found no missing target. Browser direct-route checks covered the 22 routes, while browser hands-on visual testing was limited to the available desktop viewport.

| Route | Source | Page styles | Script | Main media | In-scope route destinations |
|---|---|---|---|---|---|
| `/` | `public/index.html` | `assets/page-00-approved.css`; shared footer, review corrections, header and brand CSS | `assets/site.js` | page-00 hero, stage icons, logos | `/`, `/formation/`, `/conversations/`, `/music/`, `/about/`, `/contact/` |
| `/conversations/` | `public/conversations/index.html` | conversations approved, icons, shared footer/header/brand CSS | `assets/site.js` | conversations hero and logos | `/`, `/formation/`, `/conversations/`, `/music/`, `/about/`, `/contact/` |
| `/music/` | `public/music/index.html` | `assets/styles.css` (mixed and protected), music branding, shared footer/header/brand CSS, Google Fonts stylesheet | `assets/site.js` | Alluminate hero and logos | `/`, `/formation/`, `/conversations/`, `/music/`, `/about/`, `/contact/` |
| `/join/` | `public/join/index.html` | `join/join.css`, overview context nav | — | join community hero, wordmark | `/`, `/become/fruit/`, `/formation/`, `/join/useful/` |
| `/formation/` | `public/formation/index.html` | formation introduction, overview context nav | — | formation hero and stage icons | `/`, `/formation/`, `/conversations/`, `/music/`, `/awaken/lesson-1/` |
| `/coming-soon/` | `public/coming-soon/index.html` | `assets/styles.css` (mixed and protected) | `assets/site.js` | brand image | `/`, `/formation/`, `/conversations/`, `/music/`, `/coming-soon/`, `/join/` |
| `/doorway/` | `public/doorway/index.html` | none | — | none | Formation and lesson routes across Awaken, See Clearly, Become and Join |
| `/about/` | `public/about/index.html` | info pages, footer, about photo, shared header/brand CSS | `assets/site.js` | about photo and logos | `/`, `/formation/`, `/conversations/`, `/music/`, `/about/`, `/contact/` |
| `/contact/` | `public/contact/index.html` | info pages, footer, shared header/brand, contact CSS | `assets/site.js` | logos | `/`, `/formation/`, `/conversations/`, `/music/`, `/about/`, `/contact/` |
| `/see-clearly/` | `public/see-clearly/index.html` | See Clearly overview, context nav | — | See Clearly hero and wordmark | `/`, `/awaken/lesson-2/`, `/formation/`, `/see-clearly/part-1/` |
| `/logo-review/` | `public/logo-review/index.html` | footer, shared header, logo review CSS | `assets/site.js` | Circle-Spirit logo comparison artwork | `/`, `/formation/`, `/conversations/`, `/music/`, `/about/`, `/contact/` |
| `/become/` | `public/become/index.html` | Become CSS, overview context nav | — | Become hero and wordmark | `/`, `/see-clearly/integration/`, `/formation/`, `/become/live-with-god/` |
| `/join/useful/` | `public/join/useful/index.html` | Join CSS, overview context nav | — | wordmark | `/`, `/join/`, `/formation/` |
| `/awaken/lesson-1/` | `public/awaken/lesson-1/index.html` | curriculum, lesson 1, context nav | — | lesson 1 forest image and wordmark | `/`, `/awaken/lesson-1/`, `/awaken/lesson-2/`, `/see-clearly/`, `/formation/` |
| `/awaken/lesson-2/` | `public/awaken/lesson-2/index.html` | curriculum, lesson 2, context nav | — | lesson 2 lake image and wordmark | `/`, `/awaken/lesson-1/`, `/awaken/lesson-2/`, `/see-clearly/`, `/formation/` |
| `/see-clearly/part-1/` | `public/see-clearly/part-1/index.html` | Part 1 CSS, context nav | — | wordmark | `/`, `/see-clearly/`, `/formation/`, `/see-clearly/lesson-2/` |
| `/see-clearly/lesson-2/` | `public/see-clearly/lesson-2/index.html` | Lesson 2 CSS, context nav | — | forest image and wordmark | `/`, `/see-clearly/part-1/`, `/formation/`, `/see-clearly/`, `/see-clearly/integration/` |
| `/see-clearly/integration/` | `public/see-clearly/integration/index.html` | Integration CSS, context nav | — | wordmark | `/`, `/see-clearly/lesson-2/`, `/formation/`, `/see-clearly/`, `/become/` |
| `/become/live-with-god/` | `public/become/live-with-god/index.html` | Become CSS, context nav | — | wordmark | `/`, `/become/`, `/formation/`, `/become/practice-forms-the-person/` |
| `/become/practice-forms-the-person/` | `public/become/practice-forms-the-person/index.html` | Become CSS, context nav | — | wordmark | `/`, `/become/live-with-god/`, `/formation/`, `/become/`, `/become/whole-person/` |
| `/become/fruit/` | `public/become/fruit/index.html` | Become CSS, context nav | — | wordmark | `/`, `/become/whole-person/`, `/formation/`, `/become/`, `/join/` |
| `/become/whole-person/` | `public/become/whole-person/index.html` | Become CSS, context nav | — | wordmark | `/`, `/become/practice-forms-the-person/`, `/formation/`, `/become/`, `/become/fruit/` |

The HTML-level source scan found 307 first-party file references among these routes after excluding Books links and the protected mixed stylesheet; all resolved. A direct source map also confirmed that the public image references resolve. Google Fonts is loaded by Music. Spotify is embedded on Music. Calendly is linked by Conversations and Contact.

## Route graph and page classification

- 20 routes have incoming links from other in-scope pages.
- `/doorway/` is directly reachable and provides a useful Formation index, but has no incoming link from the current public route graph. It is classified **C: unlinked supporting content**; preserve it.
- `/logo-review/` is directly reachable, is titled “Circle-Spirit Logo Review,” and has no incoming link from the current public route graph. Its intended public role is unclear. It is classified **E: unknown**; preserve it pending owner direction.
- `/coming-soon/` is linked to itself in its header and footer “Give” links. It does link visitors to the homepage and Join, so it is not a complete dead end. The page says the destination is being prepared. The actual donation/“Give” destination is unresolved. Classified **E: unknown/placeholder**; do not substitute a destination without direction.
- All other routes are linked from the site navigation or Formation journey. None was found to require browser Back as its only exit.
- `public/assets/css/review-switcher.css` has no reference from deployed public HTML. Its only reference is in archived `archive/review/index.html`, outside the public asset tree. The public site has no Review Navigator UI to center; no change was made.
- No route was proven obsolete enough to remove. No other page or asset was moved because its ownership or intent was uncertain.

## Route, content and semantics

- Each of the 22 pages has one `<h1>`, a page-specific title, and `lang="en"`. No duplicate IDs, missing in-page fragments, or skipped heading levels were found in source.
- Five pages have no meta description: `/formation/`, `/awaken/lesson-1/`, `/awaken/lesson-2/`, `/doorway/`, `/logo-review/`. All 22 pages lack a canonical link element.
- The live apex and `www` host both serve the site. The browser remained on `www` when opened there, and relative navigation retains the current host. This creates duplicate host variants; source does not establish a preferred-host redirect or canonical. Host/routing changes are outside the authorized scope, so no redirect or canonical policy was added.
- The “Give” links on `/coming-soon/` point back to `/coming-soon/`. This is a demonstrated placeholder/self-link, not an inferred broken URL; the proper destination needs owner direction.
- The homepage stage cards currently point to `/formation/`. The Formation intro proceeds into Awaken. This is consistent with an intentional common entry point; no rerouting was made.
- Meaningful image alternatives are present; some decorative elements use empty `alt`, which is appropriate where they are decorative.

## CSS, JavaScript and media

- Public tree inventory outside Books: 22 HTML routes, 27 CSS files, 1 JavaScript file, and 78 other static files. Non-HTML media counts include 19 JPG, 31 PNG, 20 SVG, 6 WebP and 1 OTF. Counts include files not individually rendered in the audit.
- `public/assets/site.js` is the only in-scope public JavaScript source. It handles the `.menu` button: `aria-expanded`, opening/closing the associated nav, closing after link selection, and Escape returning focus to the button. No stale element access or duplicate menu handler was found.
- 26 of the 27 stylesheet files are outside the mixed protected stylesheet. Page-specific stylesheets are linked by their route HTML; shared public header/footer/branding styles are linked by affected pages. `public/assets/css/overview-statement.css` is not referenced by source, tests, deployment, or docs. It was retained because its intent/history is unknown.
- `public/assets/css/review-switcher.css` is only referenced by the archived review page and is not used by current public HTML. It was retained because it may be a recovery artifact, and was excluded from mobile Review Navigator changes.
- `public/assets/styles.css` is linked by Music and Coming Soon and imported by the homepage stylesheet. It is mixed with the protected Books presentation; it was not opened or edited. That prevents a full cascade/dead-selector audit for those pages.
- CSS sources reference assets and selectors from earlier design states. Where a page-level replacement or later rule makes a reference inactive, it was not treated as a broken live asset. No broad CSS cleanup was attempted.
- The referenced image paths in in-scope HTML all resolve. Identity was checked from paths and rendered page context, not from names alone. Alliterate hero/music art and the Calendly destination were visually or directly spot-checked in the live browser.

## External services

- **Calendly:** the public booking page opened. The visible event is “RTS Conversation” with a 45-minute duration. The site copy refers to a 45-minute conversation. No booking was made.
- **Spotify:** the Music embed loaded and exposed its player and track list after page load. No sign-in or play action was needed.
- **Google Fonts:** Public Sans stylesheet is loaded by Music. The page remained usable with the external font stylesheet present. No request data beyond ordinary public page loading was sent.

## Responsive, interaction and runtime checks

- Browser hands-on checks were conducted in the available 1363×936 desktop viewport. The homepage, Formation, Music, Conversations, Contact and Calendly were observed in the live browser; the mobile menu behavior was reviewed from its markup, JavaScript and CSS.
- Mobile 375, 390, 430 and 768 pixel viewports could not be set in the available browser. No mobile visual pass is claimed. Source-level checks confirm the responsive menu breakpoint is 840px and the menu uses an `aria-controls`/`aria-expanded` relationship, closes on selection and Escape, and restores focus.
- Browser console output showed no site JavaScript error during the observed page visits. A Chrome extension metadata message was observed and is browser tooling, not a site runtime error.
- Source validation confirms local static routes return 200 and first-party resources resolve. A local static-server probe returned 404 for `/review/` and a unique missing route. `/review/` is not a deployed public route; README instructions that directed developers there were stale and have been corrected.
- Live browser navigation to a unique missing route was blocked by the browser client, so a production HTTP status/body for that route is not claimed. Cloudflare config has `not_found_handling: 404-page`; no custom `404.html` exists in the in-scope public tree. The exact Cloudflare response body for a missing path remains unverified.

## Worker, headers, security and deployment

- `wrangler.jsonc` points static assets at `./public`, uses `not_found_handling: 404-page`, and has custom domains for apex and `www`. It also configures `run_worker_first` for `/api/books/click`; because that is the protected Books analytics route and its handler shares a source file with the site Worker, the handler was not inspected or called.
- `public/_headers` contains cache-control rules that force revalidation for the root, HTML, assets, and selected CSS. It declares no explicit CSP, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. No policy was added: CSP needs a complete review of the protected mixed stylesheet and allowed embed/font hosts.
- Production workflow `.github/workflows/deploy.yml` used `workflow_dispatch` without a guard preventing dispatch from a non-main ref. It now checks exact repository, `refs/heads/main`, and equality of `GITHUB_SHA` with checked-out `HEAD` before invoking production Wrangler deploy.
- Review workflow `.github/workflows/deploy-website-review.yml` used a whole-file grep containing its own prohibited vocabulary and diagnostic string, so the guard self-matched. It now invokes `scripts/verify-review-workflow.mjs`, which checks workflow structure and executable command blocks, ignores shell comments and echo/printf diagnostics, requires the exact existing repository/SHA/Worker/assets/route guards, and permits only the exact `wrangler@4.86.0 deploy --config wrangler.jsonc` invocation against review configuration. Unit tests prove comments/error output do not trip it and that Vercel, Wrangler route mutations, and an alternate deploy config fail closed.
- The review deployment workflow still runs `node --test tests/*.test.mjs`. The requested protected-area boundary prevents running tests that inspect or test Books. The full workflow test suite was therefore not run and the review deployment was not dispatched. We did not alter the workflow to skip its full test gate.
- No credentials, secrets or user data were read or exposed.

## Changes made

1. Replaced the review workflow's self-matching grep with a separate executable-command structural validator while retaining exact repository, exact SHA, review Worker identity, production Worker exclusion, asset directory and no-route/domain guards. The validator fingerprints the existing inline config-guard block, rejects unexpected executable here-documents, and permits only the one exact review deploy command. Comments and echo/printf diagnostics are ignored.
2. Added a pre-deploy production guard requiring `teerex-bit/rts-website`, `refs/heads/main`, and exact checked-out `GITHUB_SHA`.
3. Corrected README's local preview URL and booking-link source documentation.
4. Corrected current stylesheet/page architecture guidance in `docs/brand-system.md` and `docs/adding-new-pages.md`.
5. Moved the stale, unused lesson validation script to the non-public audit hold area. Its SHA-256 is `d462e0141dbde8a3ebbf98ff49b7c1035592f9ef52f5e0fc726119a5cd5f556a`. All non-protected repository references to its filename were checked before moving; none were found. The script's assertions target a former page title, labels, and markup that do not exist on the current lesson page.

## Verification and limitations

- Passed 13 scoped Node tests: the new review/production guard tests plus Become, Contact and Join tests. The review validator's normal run also passed.
- `git diff --check` passed.
- 22 in-scope local routes returned 200; 307 in-scope first-party file references resolved; no missing fragment IDs were found.
- 22 direct production routes were opened. Live `www` behavior differs from the previously assumed redirect: it remained on `www`; report this as observed.
- No full all-tests suite or review deployment was run because the workflow's all-tests step crosses the user's protected Books boundary. Mobile visual tests and a live unique-missing-route response remain unverified.
- Candidate SHA is recorded in the final report after commit. `main` and production remain unchanged.

## Remaining concerns

- Decide whether to consolidate the two public hostnames and establish a canonical host.
- Decide the intended destination for the “Give” placeholder, and whether `/coming-soon/` and `/logo-review/` should remain public.
- Decide whether to add page descriptions/canonical metadata to the five/further affected routes.
- Consider a custom 404 page and explicit response-security headers after the mixed protected stylesheet/Worker constraints are resolved.
- Complete responsive visual checks at 375, 390, 430, 768 and 1365px in a browser with viewport control.
- Review the Worker body and full workflow test suite only when Books-protected source/tests can be included without violating the scope.
