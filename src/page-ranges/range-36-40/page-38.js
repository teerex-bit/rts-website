const stages = require('./stages');

module.exports = {
  number: 38,
  title: 'Conversations',
  route: '/conversations/',
  stage: 'Join',
  template: 'library',
  stages,
  eyebrow: 'Spiritual mentoring',
  heading: 'Conversations',
  headline: 'Learn what God wants you to hear.',
  introduction: 'Sometimes we just need a conversation that helps us see what we can’t see on our own. In these mentoring conversations, we invite God into the room and listen together for what He wants you to notice, understand, and do next.',
  booking: { label: 'Book an appointment', detail: 'Schedule a video conversation', href: '/coming-soon/' },
  benefits: [
    { icon: 'person', title: 'God-Centered', copy: 'We seek His voice together.' },
    { icon: 'heart', title: 'Safe & Trusting', copy: 'A space to be honest, open, and heard.' },
    { icon: 'leaf', title: 'Spirit-Led', copy: 'Not advice driven—led by the Spirit.' },
    { icon: 'relationships', title: 'Clarity & Next Steps', copy: 'Leave with greater clarity and peace.' }
  ],
  principles: [
    { icon: 'see', copy: 'See what you haven’t been able to see.' },
    { icon: 'heart', copy: 'Find freedom in what God is forming in you.' },
    { icon: 'cross', copy: 'Walk forward with confidence and peace.' }
  ],
  support: { heading: 'Need help?', copy: 'We’re here if you have questions along the way.', label: 'Contact Support', href: '/coming-soon/' },
  scripture: 'Speak, Lord, for Your servant is listening.',
  scriptureReference: '1 Samuel 3:9'
};
