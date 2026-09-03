# Page 40 — original-resolution audit

- Reference: `done/40 books landing.png`
- Source dimensions: **1536 × 1024** (1.500:1)
- Route/module: `/books/` / `page-40.js`

## Composition

A 73 px editorial header precedes a 320 px warm mountain/table hero. The left column contains “Books for the Journey.”, two paragraphs, and an action; a quote is centered; a book stack and mug occupy the right. Three tightly spaced rows of cover art sit below an “Explore Our Books” heading, with a final information card embedded at lower right. A compact dark footer closes the 1024 px frame.

## Exact visible content captured

The heading, full introduction, hero quotation, both actions, all readable cover titles, information-card text, and closing statements are editable module data. Cover title copy remains HTML over art slots, so generated cover imagery must not include baked text.

## Interactive-looking elements

- Editorial navigation with Books active and Start Here
- Explore All Books anchor to the library grid
- Individual book-cover articles and Find Your Next Book action

## Separable assets

- Simple: crescent/arrow logo and book icon — external SVG.
- Raster: mountain table still life and 24 distinct cover-art backgrounds — replaceable slots.
- All titles, headings, navigation, buttons, cards, quotation, and footer are HTML/CSS.

## Responsive decision

The hero collapses to a vertical composition and the cover grid reduces from eight visible columns to four, then two cover cards per row. Book titles remain available as text at every width.
