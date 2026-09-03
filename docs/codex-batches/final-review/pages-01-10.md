# Pages 01–10 final review

Review date: 2026-09-02

Scope: compare Pages 01–10 with `done/01` through `done/10`, verify independent HTML/CSS/assets, enforce the authoritative four-stage progression, reject runtime use of flattened reference PNGs, and verify route intent.

## Executive result

Pages 01–10 are implemented as editable HTML/CSS compositions. No page loads a full-page PNG from `done/` at runtime. All generated journey rails use exactly **Awaken → See Clearly → Become → Join**; the obsolete Walk stage visible in the historical PNGs is intentionally not reproduced.

The owned correction adapter now passes its validator. It supplies dedicated replacement compositions for Pages 02 and 07, a Page 06 CTA correction, scoped balance rules for Pages 03–10, and the approved Page 01 removal of the secondary overview and closing journey buttons.

One functional issue remains outside this adapter's ownership: the shared course renderer sends the Continue buttons on Pages 03–06 and 08–10 to the generic `/coming-soon/` destination instead of the next lesson. This must be corrected in `src/course-pages.js` or the central route configuration before deployment.

## Page-by-page audit

| Page | Reference composition | Editable implementation | Fidelity and disposition |
|---|---|---|---|
| 01 | Photo-led Soul Formation landing, journey row, invitation card, three experience cards, closing panel | Specialized live home renderer; all headings, copy, buttons, journey entries, cards and panels are HTML; hero and experience art are independent SVG assets | Structure and visual hierarchy are substantially represented. Four-stage rule is correct. Historical `Walk Daily` stage is removed. Approved removal of Watch Overview and closing Explore Journey buttons is enforced in correction CSS. The current mountain/experience art is illustration rather than the photographic reference, so exact photographic fidelity depends on later asset replacement without markup changes. |
| 02 | Awaken landing with left journey rail, sunrise hero, outcomes, quote and progress card | Dedicated replacement renderer in the correction adapter; text, outcomes, rail and progress list are live HTML; hero is an independent SVG | Composition closely follows the reference while removing Walk. Page 02 begins at `/awaken/pay-attention/`. The historic five-stage reference is superseded by the four-stage rule. Photography is represented by an editable/replaceable illustration asset. |
| 03 | Awaken lesson: scenarios, right photo, Why panel and objectives | Dedicated data module plus shared course renderer; scenario cards, headings, rail, side cards and navigation are live HTML | Main grid and three-column desktop balance are represented. Uses one shared Awaken illustration in place of the reference photograph; symbols are CSS-generated rather than exact reference icons. Continue route remains generic and must be fixed centrally. |
| 04 | Awaken lesson: radial origin map with seven selectable origins | Dedicated module and semantic checkbox controls | Correct editable interaction structure and four-stage rail. The radial relationship is CSS/HTML, not baked art. Shared illustration and CSS symbols do not exactly reproduce reference photography/icons. Continue route remains generic. |
| 05 | Awaken lesson: four-step Notice/Ask/Listen/Receive practice | Dedicated module and four editable cards | Correct content hierarchy and responsive card layout. Shared illustration and symbolic icons are replaceable fidelity approximations. Continue route remains generic. |
| 06 | Awaken practice form with four-step rhythm, notes form and side guidance | Dedicated module with real labels, textareas, buttons and cards | Most functionally complete of the lesson pages. Desktop density is specifically balanced in correction CSS. CTA wording corrected to “I’ve Noticed Something I’m Ready to Look At.” Continue/defer destinations remain generic. |
| 07 | See Clearly phase overview with photographic hero, outcomes, five-part seeing journey and right cards | Dedicated replacement renderer in the correction adapter | Recreates the reference's major three-column composition and content with live elements; authoritative four-stage nav replaces the historical five-stage nav. Hero is an independent illustration, not exact photography. Begin This Phase correctly routes to `/see-clearly/your-formation/`. |
| 08 | See Clearly identity-choice lesson | Dedicated module with live choice cards and side cards | Correct editable structure and responsive ordering. Uses replaceable shared hero illustration and CSS symbols. Continue route remains generic. |
| 09 | See Clearly three-part Old Person / Old Formation / New Creation lesson | Dedicated module with three semantic panels and quotations | Correct editable panel structure; text is not baked into art. Shared hero illustration and symbolic icons are fidelity approximations. Continue route remains generic. |
| 10 | See Clearly comparison rows: old formation vs new life | Dedicated module with paired live HTML cards, selection controls and side cards | Strong structural match to the reference; all comparison text remains editable. Shared hero illustration and symbolic icons are approximations. Continue route remains generic. |

## Structural checks

- Reference PNGs remain confined to `done/`; no Page 01–10 runtime `src` or `href` points there.
- Pages 03–10 are data-driven modules, not copied full-page screenshots.
- Pages 02 and 07 use dedicated correction renderers and identify themselves with `data-editable-source="pages-01-10-corrections"`.
- Pages 03–10 use the dedicated course renderer/configuration and identify themselves with page numbers.
- The active journey rails contain only Awaken, See Clearly, Become and Join.
- The word “walk” may remain in ordinary prose (for example, “walk with you”), but there is no Walk stage or `/walk/` route.
- Responsive CSS exists for desktop, tablet and mobile layouts.

## Asset assessment

The implementation is safely editable, but “editable” and “photographically identical” are separate requirements. Pages 01–10 currently use clean, replaceable SVG illustrations for the large photo regions and CSS-generated symbols for several small icons. These avoid flattened pages and preserve future replaceability, but they do not exactly match the people, light, terrain or icon artwork in every reference PNG. Replacing those individual image slots with approved photography/icon assets will improve visual fidelity without rebuilding the page structure.

## Required shared follow-up

1. Replace the generic `links.next` behavior in the shared course renderer with ordered page-to-page routes.
2. Keep the current adapter registered exactly once in the build and append its CSS exactly once.
3. Rebuild and run the complete route/link validator after shared route correction.
4. If pixel-level photographic fidelity is required, replace the independent hero/photo assets; do not introduce full-page screenshots.

## Owned verification

Command:

```text
node src/page-corrections/pages-01-10/validate.js
```

Expected result:

```text
Pages 01–10 correction adapter validation passed.
```
