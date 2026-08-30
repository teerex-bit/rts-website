# Pages 03–10 Editable Web Conversion Specification

## Goal

Convert reference graphics 03 through 10 into eight responsive, editable webpages in the existing `rts-website` repository while preserving the visual composition and content of each reference.

## Reference manifest

| Page | Reference file | Original dimensions | Existing route |
| --- | --- | --- | --- |
| 03 | `done/03 Awaken - 1.png` | 1536×1024 | `/awaken/pay-attention/` |
| 04 | `done/04 Awaken - 2.png` | 1402×1122 | `/awaken/name-your-desire/` |
| 05 | `done/05 Awaken - 3.png` | 1402×1122 | `/awaken/listen-within/` |
| 06 | `done/06 Awaken - 4.png` | 1205×1306 | `/awaken/practice-presence/` |
| 07 | `done/07 see clearly 1 landing.png` | 1536×1024 | `/see-clearly/` |
| 08 | `done/08 see clearly 1 - 1.png` | 1402×1122 | `/see-clearly/your-formation/` |
| 09 | `done/09 see clearly 1 - 2.png` | 1536×1024 | `/see-clearly/family-of-origin/` |
| 10 | `done/10 see clearly 1 - 3.png` | 1536×1024 | `/see-clearly/patterns/` |

All eight files must be read directly from `done/`. They are design references only and must never be embedded as full-page images in the finished webpages.

## Dimension rule

- Use a 1536×1024 desktop viewport as the common visual-review standard for all eight webpages.
- Preserve the composition, visual hierarchy, relative scale, and reading order of references whose source dimensions differ.
- Do not stretch, squash, or arbitrarily crop the reference graphics to 1536×1024.
- Finished pages must remain fluid and responsive below the desktop review viewport.

## Editable-page rule

- Ordinary text must be live HTML.
- Cards, panels, navigation, buttons, progress elements, overlays, and text boxes must be HTML/CSS.
- Photographs, illustrations, botanicals, logos, and icons must be independent replaceable assets when they cannot be recreated accurately with semantic HTML/CSS.
- No reference PNG may be used as a page background, full-page image, or flattened substitute for live content.
- Page-specific content must live in focused source configuration modules, not only in generated files under `public/`.
- `npm run build` must regenerate every output route without losing any page-specific work.

## Shared journey rule

The only stage sequence is:

1. Awaken
2. See Clearly
3. Become
4. Join

`Walk` must not appear as a stage, route, navigation item, or progress item. Ordinary prose may use the verb “walk” when it is part of approved sentence copy.

## Project boundaries

- Work only in the existing `rts-website` repository and current branch.
- Preserve Pages 01, 02, and 38 and all unrelated routes.
- Preserve the uncommitted `.github/workflows/conversations-preview.yml` change; do not edit, stage, commit, or revert it.
- Do not push, merge, open or modify a pull request, or deploy.
- Do not add a second hosting configuration or repository.

## Validation

The completed batch must pass:

```bash
npm run build
npm run check
npm run check:server
git diff --check
```

Add automated structural checks proving that:

- Pages 03–10 use dedicated editable renderers/configuration rather than the generic placeholder renderer.
- All eight routes exist after a clean build.
- The four approved stages appear in their intended shared navigation and no `Walk` stage is generated.
- No page references its own full-page source PNG from `done/`.
- Page-specific asset paths resolve.

## Review deliverables

- A source-to-output manifest listing each page’s content module, renderer/template, route, and asset directory.
- A remaining-assets report that distinguishes exact assets, suitable reusable assets, and missing replacements.
- No claim of pixel-level visual approval; final visual comparison belongs to the reviewing assistant after Codex finishes.
