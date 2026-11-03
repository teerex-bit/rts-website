# Adding new pages

1. Put route HTML at `public/<route>/index.html` (or `public/index.html` for the home page). Place CSS with the route or in `public/assets/css/` and link it explicitly from the page.
2. Reuse existing assets under `public/assets/` only where they match the page's approved design. Keep new route assets in a descriptive subdirectory there.
3. Name assets using lowercase descriptive kebab-case, including page and role where ambiguity is possible.
4. Do not assume a global stylesheet: this static site currently links multiple shared and route-specific files. Check the actual header, footer, and interaction references on nearby pages before adding or changing shared behavior.
5. Compare the page directly with its approved reference at the reference desktop size, common laptop width, tablet, and mobile. Check composition first, then typography, spacing, color, and details.
6. Navigation, headings, paragraphs, labels, controls, cards, quotations, sidebar copy, and lesson copy must remain live HTML. Only photography, botanicals, illustrations, complex scenes, and artwork without clean layers may remain raster images.
7. At desktop, tablet, and mobile widths, check content order, readability, touch targets, undistorted media, and horizontal overflow. Record the viewport sizes actually tested.
8. Preserve **Awaken → See Clearly → Become → Join** exactly. “Walk” is not a separate stage.
9. Frameworks and architecture migrations require explicit approval. The default remains semantic HTML, shared CSS, and minimal vanilla JavaScript.
