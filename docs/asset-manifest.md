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

