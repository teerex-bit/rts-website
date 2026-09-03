# Pages 01–40 Finalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete, balance, and validate all 40 reference pages as editable responsive webpages.

**Architecture:** Six range agents produce isolated page modules, namespaced renderers/styles, assets, and audits for Pages 11–40. A coordinator integrates those outputs with the existing Pages 01–10 implementation, performs graphics replacement and visual-balance correction, and generates a 40-page review surface.

**Tech Stack:** Node.js source generator, semantic HTML, CSS, JavaScript modules, SVG/JPG/PNG assets.

**Spec:** `docs/codex-batches/pages-01-40-finalization-spec.md`

## Global Constraints

- Desktop review viewport is exactly 1536×1024.
- All normal text and interface layers remain independently editable.
- Full-page files under `done/` are never active page assets.
- Stage sequence is Awaken → See Clearly → Become → Join.
- Nonstandard references are recomposed proportionally, never stretched.
- `.github/workflows/conversations-preview.yml` and `start-pages-03-10-review.cmd` remain untouched.
- No push, merge, deployment, or pull-request mutation.

---

### Task 1: Implement isolated ranges 11–40

**Files:** Create isolated range modules, renderers, styles, audits, and assets exactly as assigned by the specification.

**Interfaces:** Each range exports `pages: Map<number, object>`, `render(page): string`, and `css: string` from its `index.js`.

- [ ] Audit each reference at original resolution and record exact page structure.
- [ ] Create one page module per page with exact editable copy and structured composition data.
- [ ] Create the namespaced range renderer, stylesheet export, independent code-native assets, and missing-raster manifest.
- [ ] Run a Node validation that loads the range index, renders every page, rejects `done/` runtime references, rejects `Walk` as a stage, and confirms one `<h1>` per result.

### Task 2: Integrate all ranges and generate review surfaces

**Files:** Modify `scripts/build.js`, `scripts/check.js`, shared source/style files, and generated `public/`; create a Pages 01–40 review route.

**Interfaces:** Consume every range’s `pages`, `render`, and `css` exports without changing their contracts.

- [ ] Add failing structural checks proving Pages 11–40 still use generic placeholders.
- [ ] Run `npm run build && npm run check` and confirm the new checks fail for the missing dedicated renderers.
- [ ] Register all six range exports in the build and append their namespaced CSS once.
- [ ] Generate every route and the 40-page switcher.
- [ ] Run `npm run build && npm run check && npm run check:server && git diff --check` and require zero exit status.

### Task 3: Final graphics and balance review for Pages 01–40

**Files:** Modify only the page modules, namespaced styles, and independent assets identified by visual review; update asset manifests.

**Interfaces:** Preserve all renderer export contracts and routes.

- [ ] Compare every page’s hierarchy, composition, proportions, whitespace, imagery placement, and content density against its reference at 1536×1024.
- [ ] Replace missing simple graphics with independent SVG/code-native assets and complex photographic assets with generated raster files.
- [ ] Correct tablet/mobile reflow without changing desktop reference hierarchy.
- [ ] Re-run the complete validation matrix and record remaining unavoidable fidelity limits in the final report.
