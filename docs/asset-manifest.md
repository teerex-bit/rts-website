# Asset manifest

No clean approved asset files were present in the authorized repository. The supplied full-page graphics were visible in the task context but were not available as copyable files. Production HTML therefore uses live copy with temporary CSS scene treatments and provisional standalone SVGs. These must be replaced—not treated as approved artwork.

| Needed clean asset | Current temporary treatment | Recommended minimum |
| --- | --- | --- |
| Approved horizontal RTS logo and closing mark | `assets/logos/rts-logo.svg` provisional SVG | SVG preferred; 560×160 PNG fallback |
| Four locked journey icons | individual provisional SVGs in `icons/journey/` | SVG, 128×128 viewBox |
| Supporting lesson/quality icons | individual provisional SVGs in `icons/supporting/` | SVG, 128×128 viewBox |
| Soul Formation seated-woman mountain scene | CSS gradient; no raster image served | 2400×1050 WebP/JPG |
| Soul Formation botanicals and experience photos | omitted / CSS panels | SVG botanicals; 900×700 photos |
| Awaken mountain-path hero | CSS gradient | 1900×750 WebP/JPG |
| Lesson seated-person sidebar scene | CSS color field | 700×430 WebP/JPG |
| Conversations terrace scene | CSS gradient | 2200×1250 WebP/JPG |
| Conversations gold botanical | omitted | SVG preferred |

The booking placeholder is defined once as `BOOKING_URL` in `public/assets/js/page-interactions.js`.


## Approved public V1 identity — September 26, 2026

Public/discovery branding now uses the centrally maintained `rts-v1-logo-*`
SVG/PNG family in `public/assets/`. The approved source, exact palette,
conversion method, and rendered-background placement mapping are documented in
`design/v1/README.md`. `rts-v1-logo-master.png` is the 2400px primary raster
master. All four SVG variants share identical artwork paths. Tree of Life
curriculum identity is separate and unchanged.

## V1 / V2 placement clarification — September 26, 2026

Both V1 stacked and V2 horizontal are authoritative public logo lockups.
V2 reuses the exact V1 symbol and lettering contours with the wordmark moved
to the right. Neither contains LIFE WITH GOD. Public headers use V2; public
footers use V1. See `design/v2/README.md` for the central asset paths,
contextual colorways, and sizes. Tree of Life remains separate.
