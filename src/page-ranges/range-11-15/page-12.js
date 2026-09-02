const { journey } = require('./shared');

module.exports = {
  number: 12,
  route: '/see-clearly/review-one/',
  title: 'Make Room for Life',
  family: 'wineskins',
  course: 'See Clearly 1',
  lesson: 'Lesson 5 of 5',
  progress: 'See Clearly 5 of 5',
  progressValue: 5,
  progressMax: 5,
  step: 5,
  journey,
  introduction: [
    'Jesus used a simple illustration that reveals a profound truth about change.',
    'The question is no longer, “How do I get rid of the old me?”',
    'The old person has been crucified with Christ.',
    'The question becomes, “What needs to change so the life already within me has room to grow?”'
  ],
  wineskins: [
    {
      title: 'Old Wineskin', tone: 'olive', subtitle: ['Stretched, brittle, and unable to expand.', 'It can’t hold what God wants to do.'], image: '/assets/page-ranges/range-11-15/old-wineskin.svg',
      items: ['Rigid patterns', 'Fear of change', 'Control and self-reliance', 'Holding on to the old way of life'],
      quote: '“No one puts new wine into old wineskins. If they do, the new wine will burst the skins; the wine will run out, and the wineskins will be ruined.”', citation: 'Luke 5:37'
    },
    {
      title: 'New Wineskin', tone: 'gold', subtitle: ['Flexible, receptive, and able to expand.', 'It holds the new wine and allows it to grow.'], image: '/assets/page-ranges/range-11-15/new-wineskin.svg',
      items: ['Open to God’s leading', 'Willing to learn and unlearn', 'Trusting God instead of self', 'Room for life to grow'],
      quote: '“No, new wine is put into fresh wineskins.”', citation: 'Luke 5:38'
    }
  ],
  assurance: ['God is not trying to patch the old wineskin.', 'Jesus has already given you a new one—one that can hold the abundant life He has given you.', 'The life is already in you. Let’s make room for it.'],
  choice: ['Awareness leads to choice.', 'Choice leads to change.', 'Today, you choose to live from what is already true: you are new in Christ.'],
  side: {
    image: '/assets/page-ranges/range-11-15/wineskin-forest.jpg',
    why: ['God’s goal is not to shame you into changing. His goal is to make more room for the new life He has already given you.', 'When the wineskin changes, the wine flows. When the wine flows, you live the life you were created for.'],
    outcomes: ['See why your old reactions don’t define who you are.', 'Understand that old formation can still influence you.', 'Choose to make room for the new life God has already given you.'],
    remember: ['You are new in Christ.', 'God is forming you.', 'Make room for life.']
  },
  previous: '/see-clearly/false-self/',
  next: '/see-god-clearly/',
  continueLabel: 'Complete Lesson'
};
