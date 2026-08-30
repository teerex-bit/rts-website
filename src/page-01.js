const links = require('./links');

module.exports = {
  eyebrow: 'Soul formation',
  heading: 'Formation that changes the way you see.',
  introduction: 'A journey from inherited faith to a lived relationship with God.',
  supporting: 'You were made for more than knowing about God. This curriculum will help you notice what has shaped you, look again with God, and learn to live from what He shows you.',
  actions: [
    { label: 'Begin with Awaken', href: links.awaken, style: 'primary' },
    { label: 'Watch the overview', href: links.overview, style: 'outline' }
  ],
  message: ['Look again.', 'Respond in faith.', 'Walk with Him daily.', 'Become more like Him.', 'Participate in what He is doing in the world.'],
  journey: [
    { name: 'Awaken', description: 'Become aware of what has shaped you.', icon: 'awaken', href: links.awaken },
    { name: 'See Clearly', description: 'Learn to see God and reality more clearly.', icon: 'see', href: links.seeClearly },
    { name: 'Become', description: 'Allow His life to transform your heart and character.', icon: 'become', href: links.become },
    { name: 'Join', description: 'Participate with God in what He is doing in the world.', icon: 'join', href: links.join }
  ],
  pathCard: {
    heading: 'This is a path, not a menu.',
    copy: 'We’ll walk with you one step at a time.',
    action: { label: 'Begin with Awaken', href: links.awaken }
  },
  experiences: [
    { title: 'Notice', description: 'Interactive questions and prompts help you surface what you naturally assume, believe, or expect.', image: 'experience-notice', icon: '≈' },
    { title: 'Look Again', description: 'Scripture, teaching, and reflection invite you to consider another way of seeing.', image: 'experience-look-again', icon: '◇' },
    { title: 'Respond', description: 'Practical steps and moments of response help you live from what God shows you.', image: 'experience-respond', icon: '☼' }
  ].map(card => ({ ...card, action: { label: 'Learn more', href: links.learnMore } })),
  closing: {
    heading: 'It’s not about doing more.',
    emphasis: 'It’s about becoming more like Him.',
    copy: 'Soul Formation is not a quick fix. It is a lifelong journey of seeing, being, and doing—together with the One who formed you.',
    action: { label: 'Explore the journey', href: links.awaken }
  }
};
