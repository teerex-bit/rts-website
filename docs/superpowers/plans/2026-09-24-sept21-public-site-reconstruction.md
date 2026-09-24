# September 21 Public Site Reconstruction Plan

**Goal:** Reconstruct the approved Reforming the Soul public website from commit `cbc67972`, without changing deployment configuration, the Overview review site, or the Deep Dive app.

**Architecture:** Preserve the existing framework-free static site. Use the September 21 HTML/CSS and approved repository assets as the base, then selectively recover later public About/Contact work. Keep the public journey compact: Formation Introduction → Awaken → See Clearly → Become → Join.

## 1. Protect and isolate

- Pin `backup/pre-sept21-final-public-site-2026-09-24` to the current `main` head.
- Pin `restore/sept21-final-public-site` to `cbc67972`.
- Verify `wrangler.jsonc` and workflow files are unchanged throughout.

## 2. Encode the approved public contract

- Add tests for the three-item primary navigation, required routes, brand-logo split, Calendly link, journey sequence, and Books being publicly inaccessible.
- Run the tests and confirm they fail against the baseline for the expected reasons.

## 3. Reconstruct public discovery pages

- Update Home to three resource cards and remove extra journey CTA/button clutter.
- Rework Conversations from the curriculum rail into a public mentoring layout using existing approved assets.
- Retain the approved Music page while standardizing its public header.
- Recover and normalize About and Contact from later history.
- Add a shared public footer with About and Contact secondary links.

## 4. Normalize the Formation journey

- Keep Tree of Life branding and the compact September 21 Formation pages.
- Standardize public navigation entry points and sequence links.
- Preserve the specified Formation, Awaken, See Clearly, Become, and Join content and imagery.

## 5. Archive Books safely

- Keep the Books source in an archive outside the public output.
- Remove `/books/` from public HTML and all navigation.

## 6. Verify and preview

- Run Node tests and link/asset checks.
- Start a local static preview.
- Capture Home, Formation Introduction, Awaken, See Clearly, Become, Join, Conversations, Music, About, and Contact at 1536, 768, and 375 widths.
- Review screenshots for overflow, branding, navigation, spacing, and broken assets.
- Commit and push only the recovery branch; do not merge or deploy.
