const { journey } = require('./shared');

module.exports = {
  number: 14,
  route: '/see-god-clearly/images/',
  title: 'Is This God Trustworthy?',
  family: 'reflection-trust',
  course: 'See Clearly',
  lesson: 'Lesson 1 of 4',
  progress: 'Lesson 1 of 4',
  progressValue: 1,
  progressMax: 4,
  step: 1,
  journey,
  eyebrow: '',
  introduction: [
    'You’ve seen His heart in both Testaments.',
    'You’ve compared what you’ve heard with what Scripture says.',
    'You’ve looked at Jesus, the clearest revelation of the Father.'
  ],
  prompt: 'Now the question is personal.',
  heroImage: '/assets/page-ranges/range-11-15/trust-overlook.jpg',
  questions: [
    'Does His character consistently reflect what is good, true, just, and life-giving?',
    'Does He keep His promises—even when I don’t understand the timing?',
    'Do I believe He is for my ultimate good and is able to bring good from all things?',
    'Can I entrust my life to Him?'
  ],
  declaration: ['He is good. He is faithful. He is just. He is kind. He is holy.', 'And He is worthy of your trust.'],
  previous: '/see-god-clearly/',
  next: '/see-god-clearly/distortions/',
  continueLabel: 'Continue'
};
