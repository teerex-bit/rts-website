# Locked V1 public identity

Visual authority: `approved-color-board.png`, first primary panel, supplied as
“V1 Logo Color Variations Guide.png” (Library ID
`libfile_5f174e920f8081919a311d248eb76ba2`).

The website derivatives trace the approved symbol and lettering contours;
no replacement font or independently redrawn symbol is used. SVG paths are
identical across all four variants; only their flat fills differ. The vector
conversion retains the source artwork's small irregularities. It is not a
claim that a new high-detail original was recovered.

The generated extraction attempt was rejected for lettering artifacts and is
not an authoritative asset. Regenerate from this board with `build_assets.py`.

Palette authority: `public/assets/page-00-approved.css`: gold `#b87525`, navy
`#09263d`; white `#ffffff` is already used by shared public footer styling.
Existing page background colors are preserved.

Central family under `public/assets/`:
- `rts-v1-logo-master.png`: 2400px primary transparent raster master.
- `rts-v1-logo-dark-bg.svg/.png`: gold symbol/rules, white lettering.
- `rts-v1-logo-light-bg.svg/.png`: gold symbol/rules, navy lettering.
- `rts-v1-logo-white.svg/.png`: all white, reserved for contextual need.
- `rts-v1-logo-mono-dark.svg/.png`: all navy, reserved for monochrome use.

Public page mapping, based on rendered background inspection:

| Page | Header background | Header asset | Footer background | Footer asset |
|---|---|---|---|---|
| Home | rgba(255,253,249,.96) over cream | light-bg | #061a2e | dark-bg |
| Conversations | #fffdf9 | light-bg | #061a2e | dark-bg |
| Music | #06131e | dark-bg | #061a2e | dark-bg |
| About Us | transparent over #fffdf8 | light-bg | #061a2e | dark-bg |
| Contact | transparent over #fffdf8 | light-bg | #061a2e | dark-bg |

No other public logo placements were found on these five pages. No logo sits
over their scenic hero images. The monochrome variants are available but are
not forced into any placement. Tree of Life curriculum files and assets are
unchanged. Earlier `/logo-review/` is a historical preview, not V1 authority.

The approved stacked composition requires more height than the prior wide
wordmark. Shared sizing is 170px wide on desktop, 150px at <=840px, preserving
the complete wordmark and LIFE WITH GOD line and the original proportions.
