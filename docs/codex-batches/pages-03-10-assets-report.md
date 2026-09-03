# Pages 03–10 Remaining Assets Report

## Audit method

All eight reference PNGs were opened directly from `done/` and inspected at their original resolution. The audit treated every ordinary text block, card, panel, navigation item, progress meter, button, option control, and form control as live HTML/CSS. The reference PNGs remain reference-only and are not copied into `src/assets/` or referenced by generated HTML.

## Asset classification

### Exact shared assets already available

- `src/assets/logo.svg` and `src/assets/logo-light.svg`: Reforming the Soul brand marks. The light variant is used on the dark course rail where appropriate.
- `src/assets/icon-awaken.svg`, `icon-see.svg`, `icon-become.svg`, and `icon-join.svg`: reusable formation-stage marks. Only the approved stages Awaken, See Clearly, Become, and Join are generated.
- `src/assets/botanical.svg`: reusable botanical decoration available to the wider site. Pages 03–10 primarily use semantic/CSS decoration to avoid overusing it.

### Suitable new reusable assets

- `src/assets/page-awaken/sunrise-figure.svg`: independent, replaceable editorial illustration for Pages 03–06. It preserves the warm sunrise, layered valley, and contemplative figure motif without extracting pixels from a full-page reference.
- `src/assets/page-see-clearly/path-figure.svg`: independent, replaceable editorial illustration for Pages 07–10. It preserves the wooded path, bright valley, and paused figure motif without extracting pixels from a full-page reference.

### Missing exact replacements

- The clean sunrise/person photograph shown on Pages 03–06 is not present as a standalone source asset.
- The clean forest-path/person photograph shown on Pages 07–10 is not present as a standalone source asset.
- The reference’s complete proprietary pictogram family (speech, clock, person, heart, phone, cloud, home, book, trophy, cross, shield, eye, leaf, ladder, gift, and related variants) is not available as independent files.
- The exact decorative bottom botanical artwork on Page 07 is not available as a standalone source asset.

The implementation uses honest, independently replaceable SVG illustrations for the two photo families and consistent CSS-drawn symbols for unavailable pictograms. These are deliberate placeholders, not claims of exact source assets.

## Page-by-page composition audit

### Page 03 — `03 Awaken - 1.png` (1536×1024)

- Live text: course/lesson label, title, two-line introduction, “Let’s Notice” guidance, six situation prompts, reminder, right-column teaching panels, and lesson navigation.
- HTML/CSS: dark journey rail, active Awaken card, progress bar, top utility bar, 3×2 prompt card grid, note panel, right teaching cards, and pagination.
- Imagery: warm sunrise/person scene; replaced with `page-awaken/sunrise-figure.svg`.
- Overlay/details: circular prompt symbols and leaf badge are CSS symbols.

### Page 04 — `04 Awaken - 2.png` (1402×1122)

- Live text: title and formation explanation, deeper-exploration instructions, six origin choices, central “I tend to…” example, unsure option, reminder, and right-column teaching content.
- HTML/CSS: shared rail/top utility, two-sided origin map with central circle, checkboxes, reminder banner, side cards, and pagination.
- Imagery: same warm family scene; shared replaceable Awaken illustration.
- Overlay/details: connecting relationships are represented by responsive spacing and grouping rather than flattened lines.

### Page 05 — `05 Awaken - 3.png` (1402×1122)

- Live text: title, three-line introduction, formation callout, four-step Notice/Ask/Listen/Receive practice, assurance note, scripture, and side teaching panels.
- HTML/CSS: four practice cards, numbered badges, callout panels, right-side content cards, progress, and navigation.
- Imagery: shared replaceable Awaken illustration.

### Page 06 — `06 Awaken - 4.png` (1205×1306)

- Live text: title, practice invitation, four-step rhythm, encouragement, optional “I Noticed Something” prompts/examples, privacy notice, side tips, and reminder.
- HTML/CSS: four-step row, optional notes form with real textareas, privacy note, right-side cards, and responsive lesson navigation.
- Imagery: shared replaceable Awaken illustration.
- Limitation: this repository is a static site, so notes are editable in the browser session but are not stored or transmitted.

### Page 07 — `07 see clearly 1 landing.png` (1536×1024)

- Live text: phase label, title, three-part overview copy, CTA, three phase outcomes, five-step “seeing differently” journey, key truth, foundational realities, phase objectives, reminder, and bottom quotation.
- HTML/CSS: shared rail with active See Clearly card, hero copy overlay, CTA, outcome row, five-step journey, right-column card stack, progress, and responsive reflow.
- Imagery: mountain path/person hero; replaced with `page-see-clearly/path-figure.svg`.
- Missing: exact decorative gold botanical linework and photographic background.

### Page 08 — `08 see clearly 1 - 1.png` (1402×1122)

- Live text: identity introduction, honesty instructions, four identity options, next-step note, and side teaching panels.
- HTML/CSS: 2×2 choice card grid, presentational radio controls, next-step callout, rail/progress, side cards, and lesson navigation.
- Imagery: shared replaceable See Clearly path illustration.

### Page 09 — `09 see clearly 1 - 2.png` (1536×1024)

- Live text: title/introduction, Old Person/Old Formation/New Creation panel content, scripture citations, identity reminder, lesson outcomes, and side explanations.
- HTML/CSS: three colored truth panels with semantic headings, arrows, citations, reminder panels, rail/progress, and navigation.
- Imagery: shared replaceable See Clearly path illustration.

### Page 10 — `10 see clearly 1 - 3.png` (1536×1024)

- Live text: title/introduction, discovery instruction, five old-formation/new-life comparisons, awareness reminder, lesson outcomes, and side explanations.
- HTML/CSS: two-column comparison table, paired presentational radio controls, direction arrows, reminder callout, rail/progress, and navigation.
- Imagery: shared replaceable See Clearly path illustration.

## Responsive decisions

The 1536×1024 viewport is the shared desktop review standard. At narrower widths the left journey rail becomes a compact stage grid, the right teaching rail follows the main lesson, multi-column cards collapse, truth panels stack, and comparison pairs become vertical. Reference images are never stretched or used as page backgrounds; the independent SVG scenes use `object-fit: cover` within bounded media regions.
