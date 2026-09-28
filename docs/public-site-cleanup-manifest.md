# Public Site Cleanup Manifest

Audit branch: `audit/public-site-full-2026-09-28`

Starting source SHA: `e123801cccc2bf4e51fba186c07e289d970910bc`

No files were deleted. One proven unused public file was moved intact into `audit-hold/` outside `public/` so it will no longer be uploaded as a site asset.

| Original path | Holding path | SHA-256 | Evidence and reference checks |
|---|---|---|---|
| `public/see-clearly/lesson-2/validate.mjs` | `audit-hold/public/see-clearly/lesson-2/validate.mjs` | `d462e0141dbde8a3ebbf98ff49b7c1035592f9ef52f5e0fc726119a5cd5f556a` | No in-scope HTML, CSS, JS, JSON, metadata, config, test, workflow, or documentation reference to this filename was found. The file only reads its neighboring `index.html`/CSS and asserts a former title (`Seeing God Clearly`), former `working-draft` marker and former page copy; those assertions do not describe the current route. It is not called by build/deployment/runtime. It is preserved byte-for-byte at the holding path. |

The following items were retained because the evidence does not establish that they are safe to move:

| Path or item | Evidence | Decision |
|---|---|---|
| `public/assets/css/overview-statement.css` | No source, test, workflow, or documentation reference found; historical purpose is unknown. | Keep in place; owner review needed. |
| `public/assets/css/review-switcher.css` | No deployed public page uses it; the only reference is archived `archive/review/index.html`. Could be a recovery artifact. | Keep in place. No Review Navigator exists in the current public pages. |
| `/doorway/` | No incoming route-graph link, but its direct page is a usable Formation overview that links into all stages. | Keep as unlinked supporting content. |
| `/logo-review/` | No incoming route-graph link; title and content identify it as a Circle-Spirit logo review page. Public intent is unclear. | Keep as unknown; owner review needed. |
| `public/assets/styles.css` | Loaded by Music and Coming Soon and imported by the homepage CSS; content is mixed with the protected Books area. | Do not inspect, alter, or move. |
| `src/worker.js` | Contains both the public Worker and protected Books click analytics endpoint. | Do not inspect or alter. |

No duplicate image or authoritative source artwork was moved. Unreferenced assets without conclusive purpose remain in place.
