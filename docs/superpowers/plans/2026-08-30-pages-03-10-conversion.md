# Pages 03–10 Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build eight reference-faithful, responsive, independently editable webpages for Pages 03–10 in the existing Reforming the Soul website.

**Architecture:** Extend the repository’s source-driven static build with focused content modules and renderers for the Awaken and See Clearly page families. Reuse shared layout primitives while keeping page-specific composition and assets isolated, then regenerate the existing `public/` routes.

**Tech Stack:** Node.js build scripts, semantic HTML, CSS, JavaScript content modules, SVG/PNG/JPG assets, existing npm validation scripts.

**Spec:** `docs/codex-batches/pages-03-10-spec.md`

## Global Constraints

- All eight references remain in `done/` and are design references only.
- Desktop visual review uses exactly 1536×1024.
- Different source dimensions must be recomposed proportionally, never stretched.
- All ordinary text is live HTML and all interface layers remain independently editable.
- The only stage sequence is Awaken → See Clearly → Become → Join.
- `Walk` is forbidden as a stage but permitted as an ordinary verb in approved prose.
- Preserve the uncommitted `.github/workflows/conversations-preview.yml` change without touching it.
- Do not push, merge, modify a pull request, or deploy.

---

### Task 1: Convert Pages 03–10 as one coordinated batch

**Files:**
- Read: `docs/codex-batches/pages-03-10-spec.md`
- Read: `done/03 Awaken - 1.png`
- Read: `done/04 Awaken - 2.png`
- Read: `done/05 Awaken - 3.png`
- Read: `done/06 Awaken - 4.png`
- Read: `done/07 see clearly 1 landing.png`
- Read: `done/08 see clearly 1 - 1.png`
- Read: `done/09 see clearly 1 - 2.png`
- Read: `done/10 see clearly 1 - 3.png`
- Modify: `scripts/build.js`
- Modify: `scripts/check.js`
- Create or modify: focused files under `src/` and `src/assets/`
- Generate: matching routes under `public/`
- Create: `docs/codex-batches/pages-03-10-output-manifest.md`
- Create: `docs/codex-batches/pages-03-10-assets-report.md`

**Interfaces:**
- Consumes: existing `src/pages.js` routes, `src/links.js` destinations, and shared brand assets.
- Produces: source-driven renderers/configuration for page numbers 03–10 and generated HTML at their existing routes.

- [ ] **Step 1: Add failing structural validation**

Extend `scripts/check.js` so it fails while Pages 03–10 still use the generic placeholder renderer. The validation must also reject a `Walk` stage and any full-page reference PNG path from `done/` in generated HTML.

- [ ] **Step 2: Run the structural validation and verify RED**

Run:

```bash
npm run build
npm run check
```

Expected: `npm run check` fails because Pages 03–10 do not yet have their dedicated editable implementations.

- [ ] **Step 3: Audit the eight reference graphics**

Inspect every listed PNG at original resolution. Record reusable assets, missing assets, live-text blocks, cards, panels, navigation, imagery, overlays, and page-specific composition in `docs/codex-batches/pages-03-10-assets-report.md`.

- [ ] **Step 4: Implement focused source content and renderers**

Create the smallest coherent source structure that keeps text and assets independently editable. Use shared renderers only where the references genuinely share structure; do not force visually different pages into one generic placeholder template.

- [ ] **Step 5: Add or register independent assets**

Store page-specific assets under clear page-family directories in `src/assets/`. Do not copy full-page reference graphics into active assets. Use honest placeholders only when the exact clean asset is absent, and document each placeholder in the assets report.

- [ ] **Step 6: Generate all eight public routes**

Run:

```bash
npm run build
```

Confirm the existing routes for Pages 03–10 are regenerated from their focused source implementation.

- [ ] **Step 7: Write the output manifest**

In `docs/codex-batches/pages-03-10-output-manifest.md`, provide one row per page with reference filename, original dimensions, route, content module, renderer/template, active asset directory, and known limitations.

- [ ] **Step 8: Verify GREEN**

Run:

```bash
npm run build
npm run check
npm run check:server
git diff --check
```

Expected: every command exits zero.

- [ ] **Step 9: Self-review and commit only batch files**

Inspect the complete diff for full-page-image shortcuts, hardcoded page copy that belongs in content modules, accidental changes outside Pages 03–10, and edits to `.github/workflows/conversations-preview.yml`. Commit only the batch implementation, tests, generated routes, manifests, and required assets with message:

```text
Convert Pages 03-10 to editable web layouts
```
