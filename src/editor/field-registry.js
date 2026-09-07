const fields = [
  [2, '/awaken/'],
  [3, '/awaken/pay-attention/'],
  [4, '/awaken/name-your-desire/'],
  [5, '/awaken/listen-within/'],
  [6, '/awaken/practice-presence/'],
  [7, '/see-clearly/'],
  [8, '/see-clearly/your-formation/'],
  [9, '/see-clearly/family-of-origin/'],
  [10, '/see-clearly/patterns/'],
  [11, '/see-clearly/false-self/'],
  [12, '/see-clearly/review-one/'],
  [13, '/see-god-clearly/'],
  [14, '/see-god-clearly/images/'],
  [15, '/see-god-clearly/distortions/'],
  [16, '/see-god-clearly/with-us/'],
  [17, '/see-god-clearly/practice/'],
  [18, '/become/'],
  [19, '/become/true-self/'],
  [20, '/become/living-from-love/'],
  [21, '/become/practice-change/'],
  [22, '/become/rule-of-life/'],
  [23, '/become/relationships/'],
  [24, '/become/boundaries/'],
  [25, '/become/repair/'],
  [26, '/become/embodied-faith/'],
  [27, '/become/daily-examen/'],
  [28, '/become/integrate/'],
  [29, '/become/blessing/'],
  [30, '/become-together/'],
  [31, '/become-together/companions/'],
  [32, '/become-together/listening/'],
  [33, '/become-together/safety/'],
  [34, '/become-together/shared-practice/'],
  [35, '/become-together/guided-conversation/'],
  [36, '/become-together/sending/'],
  [37, '/join/'],
  [39, '/music/'],
  [40, '/books/']
].map(([pageNumber, route]) => Object.freeze({
  pageNumber,
  route,
  sectionId: 'hero',
  fieldId: 'heading',
  // Every currently generated editable route has exactly one live <h1>.
  // A selector is used until source renderers can add stable edit IDs without
  // changing their locked output.
  selector: 'h1',
  kinds: Object.freeze(['text', 'spacing', 'align', 'color'])
}));

const pageInventory = [
  [2, '/awaken/', '.p02-hero'],
  [3, '/awaken/pay-attention/', '.course-hero', '.course-intro', '.lesson-navigation__continue', '.course-aside__image', '.course-aside'],
  [4, '/awaken/name-your-desire/', '.course-hero', '.course-intro', '.lesson-navigation__continue', '.course-aside__image'],
  [5, '/awaken/listen-within/', '.course-hero', '.course-intro', '.lesson-navigation__continue', '.course-aside__image'],
  [6, '/awaken/practice-presence/', '.course-hero', '.course-intro', '.lesson-navigation__continue', '.course-aside__image'],
  [7, '/see-clearly/', '.p07-hero'],
  [8, '/see-clearly/your-formation/', '.course-hero', '.course-intro', '.lesson-navigation__continue', '.course-aside__image'],
  [9, '/see-clearly/family-of-origin/', '.course-hero', '.course-intro', '.lesson-navigation__continue', '.course-aside__image'],
  [10, '/see-clearly/patterns/', '.course-hero', '.course-intro', '.lesson-navigation__continue', '.course-aside__image'],
  [11, '/see-clearly/false-self/', '.rts-11-15__heading', '.rts-11-15__heading', '.rts-11-15__continue', '.rts-11-15__side-image'],
  [12, '/see-clearly/review-one/', '.rts-11-15__content--wineskins', '.rts-11-15__content--wineskins', '.rts-11-15__continue', '.rts-11-15__side-image'],
  [13, '/see-god-clearly/', '.rts-11-15__landing-copy', '.rts-11-15__landing-copy', '.rts-11-15__start', '.rts-11-15__landing-scene'],
  [14, '/see-god-clearly/images/', '.rts-11-15__compact-main', '.rts-11-15__compact-main', '.rts-11-15__continue'],
  [15, '/see-god-clearly/distortions/', '.rts-11-15__table-page', '.rts-11-15__table-page', '.rts-11-15__continue'],
  [16, '/see-god-clearly/with-us/', '.r1620-reflection__content', '.r1620-intro', '.r1620-pager__next'],
  [17, '/see-god-clearly/practice/', '.r1620-reflection__content', '.r1620-look-subtitle', '.r1620-pager__next'],
  [18, '/become/', '.r1620-landing-hero', '.r1620-landing-copy'],
  [19, '/become/true-self/', '.r1620-lesson-hero', '.r1620-lesson-hero'],
  [20, '/become/living-from-love/', '.r1620-pattern-hero', '.r1620-pattern-hero'],
  [21, '/become/practice-change/', '.rts2521-lesson', '.rts2521-lesson', '.rts2521-next'],
  [22, '/become/rule-of-life/', '.rts2521-lesson', '.rts2521-lesson', '.rts2521-next'],
  [23, '/become/relationships/', '.rts2521-lesson', '.rts2521-lesson', '.rts2521-next'],
  [24, '/become/boundaries/', '.rts2521-lesson', '.rts2521-lesson', '.rts2521-next'],
  [25, '/become/repair/', '.rts2521-lesson', '.rts2521-lesson', '.rts2521-next'],
  [26, '/become/embodied-faith/', '.rts-r2630__lesson--26', '.rts-r2630__lesson-header'],
  [27, '/become/daily-examen/', '.rts-r2630__lesson--27', '.rts-r2630__lesson-header'],
  [28, '/become/integrate/', '.rts-r2630__lesson--28', '.rts-r2630__lesson-header'],
  [29, '/become/blessing/', '.rts-r2630__lesson--29', '.rts-r2630__lesson-header'],
  [30, '/become-together/', '.rts-r2630__areas', '.rts-r2630__landing-close'],
  [31, '/become-together/companions/', '.rts-r31-35__hero-copy', '.rts-r31-35__hero-copy', '.rts-r31-35__pager-next'],
  [32, '/become-together/listening/', '.rts-r31-35__hero--scenic', '.rts-r31-35__hero-copy', '.rts-r31-35__pager-next'],
  [33, '/become-together/safety/', '.rts-r31-35__hero--scenic', '.rts-r31-35__hero-copy', '.rts-r31-35__pager-next'],
  [34, '/become-together/shared-practice/', '.rts-r31-35__hero--scenic', '.rts-r31-35__hero-copy', '.rts-r31-35__pager-next'],
  [35, '/become-together/guided-conversation/', '.rts-r31-35__hero--scenic', '.rts-r31-35__hero-copy', '.rts-r31-35__pager-next'],
  [36, '/become-together/sending/', '.rts-36-40__changed-intro', '.rts-36-40__changed-intro'],
  [37, '/join/', '.rts-36-40__join-hero', '.rts-36-40__join-hero'],
  [39, '/music/', '.rts-36-40__music-hero', '.rts-36-40__music-copy', '.rts-36-40__start'],
  [40, '/books/', '.rts-36-40__books-hero', '.rts-36-40__books-hero', '.rts-36-40__start']
].flatMap(([pageNumber, route, layout, prose, link, image, sidebar]) => {
  const contentSection = pageNumber === 3 ? 'hero' : 'content';
  const entries = [
    { sectionId: contentSection, fieldId: 'layout', selector: layout, kinds: ['spacing', 'align', 'color'] },
    { sectionId: contentSection, fieldId: pageNumber === 3 ? 'intro' : 'prose', selector: [16,17,30].includes(pageNumber) ? (prose || layout) : `${prose || layout} p:first`, kinds: ['text'] }
  ];
  if (link) entries.push({ sectionId: 'navigation', fieldId: 'continue', selector: link, kinds: ['text', 'link'] });
  if (image) entries.push({ sectionId: 'sidebar', fieldId: 'image', selector: image, kinds: ['image', 'alt'] });
  if (sidebar) {
    entries.push({ sectionId: 'sidebar', fieldId: 'visibility', selector: sidebar, kinds: ['visibility'] });
  }
  return entries.map(field => Object.freeze({ pageNumber, route, ...field, kinds: Object.freeze(field.kinds) }));
});

const orderedPage08Fields = [
  ['section-heading', '.course-section-heading', 1],
  ['card-grid', '.course-card-grid', 2],
  ['secondary-title', '.course-secondary-title', 3],
  ['note', '.course-callout--note', 4],
  ['lesson-navigation', '.lesson-navigation', 5]
].map(([fieldId, selector, order]) => Object.freeze({
  pageNumber: 8,
  route: '/see-clearly/your-formation/',
  sectionId: 'course-body',
  fieldId,
  selector,
  kinds: Object.freeze(['order']),
  orderGroup: 'course-body',
  orderValues: Object.freeze([1, 2, 3, 4, 5]),
  defaultOrder: order
}));

const registry = new Map([...fields, ...pageInventory, ...orderedPage08Fields].map(field => [
  `${field.pageNumber}:${field.sectionId}:${field.fieldId}`,
  field
]));

function getField(pageNumber, sectionId, fieldId) {
  return registry.get(`${pageNumber}:${sectionId}:${fieldId}`);
}

module.exports = Object.freeze({
  fields: Object.freeze([...fields, ...pageInventory, ...orderedPage08Fields]),
  getField
});
