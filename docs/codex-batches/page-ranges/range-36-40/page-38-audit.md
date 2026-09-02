# Page 38 — original-resolution audit and compatibility contract

- Reference: `done/38 Conversations landing .png`
- Source dimensions: **1535 × 1024** (1.499:1)
- Route/module: `/conversations/` / `page-38.js`

## Composition

A white navigation header sits over a 268 px dark journey rail and large feature. The feature pairs a cream editorial column with a golden-hour mountain/chairs image. A white floating principles card overlaps the image. Four compact benefits line the bottom of the copy column; a full-width dark scripture strip closes the page.

## Exact visible content and existing behavior preserved

The range module deliberately matches the existing specialized `src/conversations.js` contract: Spiritual mentoring, Conversations, “Learn what God wants you to hear,” full introduction, Calendly action, four benefits, three principles, support block, and 1 Samuel 3:9 scripture. Its booking/support destinations remain `/coming-soon/`, matching current behavior. It does not replace or modify the shared Conversations renderer, stylesheet, build logic, or checks.

The reference still displays Walk. This auditable module uses the authoritative four-stage journey and does not render Walk as a stage. The sentence “Walk forward with confidence and peace” is preserved because it is ordinary prose.

## Interactive-looking elements

- Formation navigation and dark journey rail
- Schedule a Conversation / Book via Calendly action
- 1-of-1 progress indicator and Contact Support action
- Four benefit items and three principle rows

## Separable assets

- Simple: logo, journey/benefit/principle/calendar/help/account icons — external SVG.
- Raster: Adirondack chairs and coffee at a wooded mountain overlook — replaceable slot.
- All copy, cards, navigation, progress, and scripture are HTML/CSS.

## Responsive decision

At tablet width the rail is removed and the editorial content stacks over the image. At mobile width benefits become two columns and the principles card spans the scene with chairs retained as a subordinate visual.
