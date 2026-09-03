# Pages 01–40 Finalization Specification

## Outcome

Finalize all 40 Reforming the Soul reference pages as responsive, editable webpages in this repository. Every route must be visually balanced against its matching `done/*.png` reference at a 1536×1024 desktop review viewport, while remaining usable at tablet and mobile widths.

## Binding rules

- All visible ordinary text is live HTML.
- Cards, forms, panels, navigation, buttons, progress indicators, overlays, and text boxes are HTML/CSS.
- Full-page reference PNGs remain reference-only and never appear in active page markup or CSS.
- Photographs, botanical art, figures, and icons are independent replaceable assets.
- Recompose references with nonstandard dimensions proportionally into the 1536×1024 review viewport; never stretch them.
- Preserve exact visible reference copy unless the existing authoritative four-stage decision requires removal of a legacy `Walk` stage.
- The only stage sequence is Awaken → See Clearly → Become → Join. Ordinary prose may use “walk.”
- Each page has a dedicated source module. Shared renderers may be used only where the references genuinely share structure.
- Generated files under `public/` must be reproducible through `npm run build`.
- Keep Page 22’s duplicate reference files as one page; use `22 Becoming 1 - 2B.png` as canonical because the duplicate bytes are identical.
- Do not touch, stage, or commit `.github/workflows/conversations-preview.yml` or `start-pages-03-10-review.cmd`.
- Do not push, merge, deploy, or modify a pull request.

## Parallel ownership

Each range agent owns exactly one directory under `src/page-ranges/`, one matching asset directory under `src/assets/page-ranges/`, and one audit under `docs/codex-batches/page-ranges/`. Range agents must not edit `scripts/build.js`, `scripts/check.js`, `src/assets/styles.css`, `public/`, or another range.

| Range | References | Routes |
| --- | --- | --- |
| 11–15 | `done/11*` through `done/15*` | Existing page numbers 11–15 in `src/pages.js` |
| 16–20 | `done/16*` through `done/20*` | Existing page numbers 16–20 in `src/pages.js` |
| 21–25 | `done/21*` through `done/25*` | Existing page numbers 21–25 in `src/pages.js` |
| 26–30 | `done/26*` through `done/30*` | Existing page numbers 26–30 in `src/pages.js` |
| 31–35 | `done/31*` through `done/35*` | Existing page numbers 31–35 in `src/pages.js` |
| 36–40 | `done/36*` through `done/40*` | Existing page numbers 36–40 in `src/pages.js` |

## Range deliverable

Each range must provide:

1. An original-resolution audit per page recording exact text, composition, interactive-looking elements, separable assets, and source dimensions.
2. One standalone page data module per page.
3. A range renderer that consumes those modules and returns semantic HTML.
4. A range stylesheet exported as a string or otherwise namespaced so the integration coordinator can append it without selector collisions.
5. Independent SVG/code-native assets when the reference uses simple icons or illustration geometry.
6. A missing-raster-assets manifest with precise generation briefs for photographs or complex art that cannot be recreated faithfully in code.
7. Module-level validation proving all page modules load, route numbers match, `Walk` is absent as a stage, and no `done/` path is active.

## Integration and final review

The coordinator integrates ranges into the build, generates all 40 routes plus review routes, and adds structural checks. Then agents review Pages 01–10 and 11–40 against references, correct balance and missing graphics, and run:

```bash
npm run build
npm run check
npm run check:server
git diff --check
```

The final review screen must provide easy switching across all 40 pages and may remain separate from public navigation.
