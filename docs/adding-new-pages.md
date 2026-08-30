# Adding new pages

1. Put route HTML at `public/<route>/index.html`; place route-specific CSS in `public/assets/css/pages/<descriptive-name>.css`.
2. Store logos in `assets/logos`, journey icons in `assets/icons/journey`, supporting icons in `assets/icons/supporting`, photographs by page in `assets/images/<page>`, and complex non-photo visuals in `assets/graphics`.
3. Name assets using lowercase descriptive kebab-case, including page and role where ambiguity is possible.
4. Reuse `global.css` and `components.css`; do not duplicate the header, button, journey, sidebar, card, quote, or focus system in page CSS.
5. Compare the page directly with its approved reference at the reference desktop size, common laptop width, tablet, and mobile. Check composition first, then typography, spacing, color, and details.
6. Navigation, headings, paragraphs, labels, controls, cards, quotations, sidebar copy, and lesson copy must remain live HTML. Only photography, botanicals, illustrations, complex scenes, and artwork without clean layers may remain raster images.
7. At 1440px, 1024px, 768px, and 390px, check content order, readability, touch targets, undistorted media, and absence of horizontal overflow.
8. Preserve **Awaken → See Clearly → Become → Join** exactly. “Walk” is not a separate stage.
9. Frameworks and architecture migrations require explicit approval. The default remains semantic HTML, shared CSS, and minimal vanilla JavaScript.

