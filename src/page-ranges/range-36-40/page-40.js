const stages = require('./stages');

module.exports = {
  number: 40,
  title: 'Books',
  route: '/books/',
  stage: 'Join',
  template: 'library',
  stages,
  brand: 'Reforming the Soul',
  nav: ['Teachings', 'Writings', 'Books', 'Music', 'Spiritual Direction', 'About Us'],
  heading: 'Books for the Journey.',
  headingLines: ['Books for', 'the Journey.'],
  introduction: ['Ideas that challenge. Truth that anchors. Stories that awaken. Wisdom that endures.', 'Every book is an invitation to see more clearly, think more deeply, and walk more faithfully with the God who is always near.'],
  primaryAction: { label: 'Explore all books', href: '#range-36-40-books' },
  quote: 'The goal is not to have more ideas about God, but a truer understanding of who He is.',
  books: [
    'The Scandal of Dominion', 'The Scandal of Choice', 'The Scandal of Grace', 'The Scandal of Love', 'The Scandal of Peace', 'The Comparison Trap', 'The Identity Trap: You’re Not Good Enough', 'The Pride Trap',
    'The “What if” Trap', 'The Ache', 'The Awakening', 'Am I a Bad God?', 'Jesus Wants to Kill You', 'The Journey Home', 'The Path: A Journey of Transformation', 'The Sanctification Cycle', 'The Signposts of Sin',
    'The Soldier’s Path', 'The Step', 'Surely, This Was…', 'The Unseen Dominion', 'De-Moral-ized', 'Mis-Align-ment', 'Pre-Form-ing'
  ],
  card: { heading: 'More than information. Transformation. The right book at the right time can change everything.', action: 'Find your next book' },
  closing: { heading: 'Truth has a way of finding those who are ready for it.', subheading: 'Explore. Discover. Grow.', quote: 'Your story matters. And so does the One who is writing it with you.' }
};
