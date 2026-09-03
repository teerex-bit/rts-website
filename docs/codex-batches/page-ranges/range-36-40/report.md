# Pages 36–40 implementation report

## Status

Range-owned implementation is complete and isolated under the three assigned directories. The entry point exports exactly `{ pages, render, css }`; `pages` is a `Map` containing 36–40 in order. No shared build, check, stylesheet, public, git, workflow, or other-range file was changed.

## Delivered

- Five dedicated data modules with editable reference copy and structured content.
- One semantic renderer with five reference-specific compositions.
- One fully namespaced stylesheet string with 1536 × 1024 desktop proportions and explicit 900 px / 600 px responsive reflow.
- Three independent code-native SVG assets (two brand marks and one external icon symbol sheet).
- Five original-resolution audit documents.
- One generation-ready manifest covering all unresolved complex raster slots.
- One Node validation covering export shape, map order, routes, stage sequence, rendering, h1 count, namespace, Page 38 behavior, unsupported-page errors, and runtime asset safety.

## Desktop balance model

- Page 36: 76 px header + 948 px course frame; 258 px journey rail; 300/570/78 px main rows; six equal characteristic columns.
- Page 37: 76 px header + 61 px stage band + 362 px hero + 299 px movements + 145 px declaration + 57 px closing strip.
- Page 38: 76 px header + 795 px rail/feature + 153 px scripture band; 46/54 editorial-to-scene split.
- Page 39: 73 px editorial header + 529 px scene + 330 px song library + 92 px closing band.
- Page 40: 73 px editorial header + 320 px hero + 570 px three-row book library + 61 px closing band. The 18-track grid fits 24 two-track covers plus a four-track CTA in three rows.

At tablet width, side rails collapse and major editorial/photo regions stack. At phone width, Page 36 cards and Page 39 song columns become one column; Page 40 covers become a two-up reading grid. All navigation is live HTML and stays scrollable where needed.

## Page 38 compatibility

The Page 38 module mirrors the specialized existing Conversations content and destinations: mentoring eyebrow, hero, introduction, Calendly CTA, four benefits, three principles, support card, progress, and scripture. This range does not overwrite `src/conversations.js`, `scripts/build.js`, `scripts/check.js`, or shared CSS. The coordinator can retain the specialized renderer or integrate this compatible range renderer without losing behavior.

## Four-stage decision

The reference images for Pages 36–38 include a legacy Walk stage. Every module exposes only Awaken, See Clearly, Become, and Join; every rendered stage link uses those four names. Ordinary reference prose containing “walk” or “walking” remains intact.

## Verification evidence

```text
$ node src/page-ranges/range-36-40/validate.js
range-36-40 validation passed: 5 pages, exact export contract, semantic render, no legacy stage or done assets.

$ node -e "...render every page and count raster slots..."
36 8784 7
37 7544 1
38 5744 1
39 10065 1
40 5235 25

$ node -e "JSON.parse(...missing-raster-assets.json...)"
manifest json valid
```

Fresh final checks are recorded at handoff.

## Remaining concerns

- Complex photography and book-cover backgrounds are deliberately CSS placeholders until the independent raster assets in `missing-raster-assets.json` are generated. No reference PNG is active at runtime.
- Browser screenshot smoke testing could not run in this executor: Playwright’s headless-shell binary is absent, while the available full Chromium aborts because process sockets are restricted. Structural viewport dimensions and responsive rules were self-reviewed in source; the integration coordinator should perform the requested final screenshot comparison after registering the range in the shared build.
- Page 40 includes every title readable at original resolution; titles partly obscured or artistically ambiguous in the cover artwork are transcribed conservatively and should receive editorial confirmation before publication.

## Fidelity asset pass

The generic placeholders for Pages 36, 37, 39, and 40 were replaced with independently addressable assets derived from clean regions of the approved references:

- Page 36 now uses six separate editorial portraits.
- Page 37 now uses the four-person mountain overlook photograph.
- Page 39 now uses the illuminated valley photograph behind live hero copy.
- Page 40 now uses a text-free mountain/book hero crop plus 24 separate real book-cover assets; cover images have meaningful alternative text.

No full-page reference image is loaded at runtime. Page 38 Conversations code and assets were intentionally not changed in this pass.

## Final QA addendum

A second source-to-reference pass confirmed semantic structure, responsive reflow, route safety, separate asset slots, and the four-stage rule across Pages 36–40. Page 38 now explicitly avoids highlighting Join in its journey rail: Conversations is a separate service page, while its four header stage links remain text-only. Its ordinary sentence “Walk forward with confidence and peace” remains valid prose. The principal fidelity gap is still the independent raster set in `missing-raster-assets.json`—especially the six Page 36 portraits, Pages 37–39 heroes, Page 38 chairs scene, and Page 40 cover art.
