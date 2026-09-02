# Pages 31–35 Range Report

## Status

Implemented the isolated Pages 31–35 range. The range exports exactly `pages`, `render`, and `css`; contains one module per page; renders semantic, editable HTML; uses namespaced responsive CSS; and includes independent code-native SVG assets. It is intentionally not wired into the shared build.

## Reference review

All five source references were inspected at their original 1536 × 1024 resolution. Per-page audits record visible copy, composition, interactive-looking controls, separable art, and dimensions:

- `page-31-audit.md` — The Will
- `page-32-audit.md` — The Body
- `page-33-audit.md` — Relationships
- `page-34-audit.md` — The Soul
- `page-35-audit.md` — You Will Know the Tree by Its Fruit

The visible lesson titles follow the reference artwork, while route and stage values follow `src/pages.js` as required. The shared journey chrome uses only Awaken → See Clearly → Become → Join.

## Implementation

- `src/page-ranges/range-31-35/index.js` provides the exact coordinator contract.
- `page-31.js` through `page-35.js` keep all instructional copy in structured page data.
- `render.js` turns shared block primitives—columns, flows, callouts, questions, comparisons, definitions, lists, and quotes—into semantic HTML.
- `styles.js` scopes every rule under `.rts-r31-35`, balances the dense dashboard composition at 1536 px, and reflows at 1180 px, 820 px, and 520 px.
- `brand-tree.svg`, `fruit-tree.svg`, `growth.svg`, and `person.svg` are independently replaceable code-native assets.
- `missing-raster-assets.json` contains precise briefs for the four complex photographs that cannot be recreated faithfully as code-native art.

## Validation evidence

The implementation followed a red/green cycle. `validate.js` first failed because `src/page-ranges/range-31-35/index.js` did not exist. After the range was implemented it passed. The audit/manifest assertions were then added and observed failing on the missing Page 31 audit before those deliverables were created.

Fresh final checks:

```text
node --check <all owned JavaScript files>
PASS

node docs/codex-batches/page-ranges/range-31-35/validate.js
Validated Pages 31–35: modules, routes, renderer, stage sequence, and runtime assets.

Rendered HTML sizes / h1 counts
31 8106 1
32 8068 1
33 9586 1
34 10168 1
35 7308 1

missing-raster-assets.json parse
PASS

Python xml.etree.ElementTree parse of src/assets/page-ranges/range-31-35/*.svg
PASS

Runtime source scan for reference-image paths and legacy stage routes
PASS — none found

Owned-file trailing-whitespace scan
PASS — none found

git diff --check -- <owned directories>
PASS
```

## Responsive and visual self-review

Desktop structure mirrors the references: 80 px masthead, 270 px journey rail, off-white dashboard canvas, serif editorial headings, colored information cards, and previous/progress/next footer. Pages 31–32 use three-column lesson layouts; Page 33 uses four diagnostic columns; Page 34 overlays the wholeness card alongside its restoration flow at desktop; Page 35 uses wide question and pressure bands. At tablet widths, dense columns reduce to two; at phone widths, the rail becomes a compact horizontal stage strip, panels stack, flow items wrap, and navigation remains reachable.

A Playwright capture was attempted with the repository’s installed Chromium, but the execution environment rejected Chromium’s process-singleton socket before page creation (`socket() failed: Operation not permitted`). No screenshot comparison could be produced in this isolated run. The optional helper was removed rather than leave a nonportable script.

## Remaining concerns

1. Pages 32–35 need the independent photographic assets described in `missing-raster-assets.json`. Their current scenic regions use editable CSS/SVG compositions to preserve layout and hierarchy, not photorealistic fidelity.
2. Final pixel-level height and overflow tuning should be performed after coordinator integration in the actual site shell, because this range was not allowed to modify the shared build, stylesheet, or generated `public/` routes.
3. `src/pages.js` names Pages 31–35 as Sacred Companions, Listening Well, Creating Safety, Shared Practice, and Guided Conversation, while the matching reference images visibly title them The Will, The Body, Relationships, The Soul, and You Will Know the Tree by Its Fruit. This range preserves canonical routes and visible reference titles; the coordinator should retain that distinction unless the page registry is intentionally revised.

## Final QA addendum

A second source-to-reference pass confirmed the five pages remain componentized and use live HTML/CSS rather than the reference PNGs. It also found and fixed a navigation defect: the shared pager previously sent every page to the same generic destinations. Pages 31–35 now connect to their actual adjacent lesson routes, and the validator asserts the complete previous/next route matrix. The unresolved visual-fidelity limitation remains the four independent photographs listed above; the current CSS/SVG scenic treatments preserve balance but are not photorealistic substitutes.

## Fidelity asset pass

The approved Page 32, 33, and 34 references contained clean photographic regions with no text, cards, or controls baked into them. Those regions were extracted as independent JPEG assets under `src/assets/page-ranges/range-31-35/fidelity/` and now replace the generic CSS scenic treatments. Page 35 retains its independently editable vector orchard because its reference photograph cannot be separated cleanly from the overlaid quote card. Page 31 contains no photographic hero.
