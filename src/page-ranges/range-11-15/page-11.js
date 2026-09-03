const { journey } = require('./shared');

module.exports = {
  number: 11,
  route: '/see-clearly/false-self/',
  title: 'That’s Formation, Not Identity',
  family: 'lesson',
  course: 'See Clearly 1',
  lesson: 'Lesson 4 of 5',
  progress: 'See Clearly 4 of 5',
  progressValue: 4,
  progressMax: 5,
  step: 4,
  journey,
  introduction: [
    'Your old reactions don’t prove the old person is alive.',
    'They reveal places where old formation still has influence.',
    'Identity is settled. Formation is the journey.'
  ],
  comparison: {
    left: {
      title: 'Identity Is Who You Are', subtitle: 'Settled once you are in Christ', tone: 'olive',
      items: [
        ['You are a new creation.', '2 Corinthians 5:17'],
        ['The old self was crucified with Christ.', 'Romans 6:6'],
        ['You are fully forgiven.', 'Colossians 2:13'],
        ['You are deeply loved and accepted.', 'Romans 8:37–39']
      ],
      note: ['These are facts that will never change.', 'This is your foundation.']
    },
    right: {
      title: 'Formation Is How You Learn', subtitle: 'Ongoing as God shapes you', tone: 'gold',
      items: [
        ['Old patterns may still show up.', ''],
        ['Habits take time to be reshaped.', ''],
        ['Renewal happens one choice at a time.', ''],
        ['God is not finished forming you yet.', '']
      ],
      note: ['These are areas God is transforming.', 'This is your journey.']
    }
  },
  quote: ['You don’t need to earn your identity.', 'You need to learn how to live from it.', 'Awareness brings freedom. Truth brings change.'],
  side: {
    image: '/assets/page-ranges/range-11-15/identity-forest.jpg',
    why: ['Condemnation says, “You’re still the same.”', 'The truth says, “You are new, and you are becoming.”', 'Freedom lives in the space between what God has done and what He is still doing.'],
    outcomes: ['Understand the difference between identity and formation.', 'See why old patterns don’t define who you are.', 'Begin to live from the truth of who you already are in Christ.'],
    remember: ['Your identity is secure.', 'Your formation is growing.', 'God is faithful to complete the work He has begun in you.']
  },
  previous: '/see-clearly/patterns/',
  next: '/see-clearly/review-one/',
  continueLabel: 'Continue'
};
