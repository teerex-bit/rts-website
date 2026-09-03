# Pages 01–40 Visual Compliance Design
## Goal

Bring every editable route into close visual and structural agreement with its numbered PNG in `done/`, while preserving a maintainable webpage implementation.

## Authority and locks

- Each numbered PNG is the visual authority for composition, hierarchy, spacing, color, imagery, icon intent, and wording.
- The website remains authoritative on the four curriculum stages: Awaken, See Clearly, Become, Join. Walk must not appear as a stage even where an older PNG includes it.
- Page 01 Formation and Page 38 Conversations remain locked to their approved snapshots.
- Page 02 Awaken retains the approved curriculum brand and current approved landing treatment; only objective defects found during integration may be corrected.

## Implementation rules

- All ordinary text stays live HTML.
- Cards, controls, progress panels, sidebars, overlays, icons, and photographs remain independently replaceable.
- Do not use a complete reference PNG as a page background or flattened page substitute.
- Use supplied project assets first. Create page-local SVG/CSS treatments only when no clean asset exists.
- Keep page-range changes isolated to their existing data, renderer, stylesheet, and asset directories.
- Match the reference at the standard 1536×1024 desktop review size and retain responsive layouts.

## Review standard

For every page, verify title/copy, section order, column proportions, major spacing, card count, progress state, controls, icon meaning, hero/side imagery, and route continuity. Automated checks must confirm resolved local assets, one H1, no Walk stage, no full-page reference PNG dependency, and successful generation of all routes.
