# Pages 03–10 Source-to-Output Manifest

Pages 03–10 are generated from focused source modules by `npm run build`. The full-page files in `done/` remain design references only.

Batch review route: `/review/pages-03-10/`. Its source-generated, responsive switcher provides eight labeled page buttons, Previous/Next controls, and a same-origin embedded viewer. It is intentionally separate from public site navigation.

| Page | Reference and original dimensions | Generated route | Content module | Renderer/template | Active asset directory | Known limitations |
| --- | --- | --- | --- | --- | --- | --- |
| 03 | `done/03 Awaken - 1.png` — 1536×1024 | `/awaken/pay-attention/` | `src/pages-03-10/page-03.js` | `src/course-pages.js` — `scenario-grid` | `src/assets/page-awaken/` | Scenic source photograph and exact proprietary icon set are unavailable; uses a replaceable illustration and CSS symbols. |
| 04 | `done/04 Awaken - 2.png` — 1402×1122 | `/awaken/name-your-desire/` | `src/pages-03-10/page-04.js` | `src/course-pages.js` — `origin-map` | `src/assets/page-awaken/` | Scenic source photograph and exact proprietary icon set are unavailable; the radial relationship is recreated responsively with HTML/CSS. |
| 05 | `done/05 Awaken - 3.png` — 1402×1122 | `/awaken/listen-within/` | `src/pages-03-10/page-05.js` | `src/course-pages.js` — `practice-cards` | `src/assets/page-awaken/` | Scenic source photograph and exact proprietary icon set are unavailable; uses a replaceable illustration and CSS symbols. |
| 06 | `done/06 Awaken - 4.png` — 1205×1306 | `/awaken/practice-presence/` | `src/pages-03-10/page-06.js` | `src/course-pages.js` — `practice-form` | `src/assets/page-awaken/` | The editable notes UI is structural only and does not persist data; scenic source photograph and exact icons are unavailable. |
| 07 | `done/07 see clearly 1 landing.png` — 1536×1024 | `/see-clearly/` | `src/pages-03-10/page-07.js` | `src/course-pages.js` — `phase-overview` | `src/assets/page-see-clearly/` | Mountain-path photography is represented by a replaceable illustration; the reference’s decorative gold linework is simplified. |
| 08 | `done/08 see clearly 1 - 1.png` — 1402×1122 | `/see-clearly/your-formation/` | `src/pages-03-10/page-08.js` | `src/course-pages.js` — `choice-grid` | `src/assets/page-see-clearly/` | Choice controls are presentational in this static build and do not persist selection; exact scenic photography is unavailable. |
| 09 | `done/09 see clearly 1 - 2.png` — 1536×1024 | `/see-clearly/family-of-origin/` | `src/pages-03-10/page-09.js` | `src/course-pages.js` — `truth-panels` | Scenic photograph and custom pictograms are approximated with independent illustration/CSS symbols. |
| 10 | `done/10 see clearly 1 - 3.png` — 1536×1024 | `/see-clearly/patterns/` | `src/pages-03-10/page-10.js` | `src/course-pages.js` — `comparison-rows` | Comparison controls are presentational in this static build and do not persist selection; exact scenic photography is unavailable. |

## Shared source structure

- `src/pages-03-10/index.js` registers the eight independent content modules and the approved journey stages.
- `src/pages-03-10/shared.js` holds only the approved shared formation-stage configuration.
- `src/course-pages.js` owns the semantic course shell and the eight page compositions.
- `src/pages-03-10/review.js` owns the isolated review switcher and embedded page viewer.
- `src/assets/styles.css` owns the responsive visual system.
- `scripts/build.js` selects the dedicated course renderer for page numbers 03–10.
- `scripts/check.js` validates route generation, source markers, stage order, active asset families, and the absence of full-page reference shortcuts.
