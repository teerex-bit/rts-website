const stages = require('./stages');

module.exports = {
  number: 37,
  title: 'Join the Journey',
  route: '/join/',
  stage: 'Join',
  template: 'cta',
  stages,
  heading: 'Reformed Souls for His purposes.',
  headingLines: ['Reformed Souls', 'for His purposes.'],
  introduction: [
    'God has not restored your soul merely so you can experience a better life.',
    'He is restoring you so that His life can be expressed through yours.'
  ],
  summary: [
    'As your thoughts, feelings, desires, will, body, relationships, and soul increasingly come under His direction, something becomes possible:',
    'You become increasingly useful to God.'
  ],
  movements: [
    {
      icon: 'see', title: 'To See as He Sees', tone: 'navy',
      bullets: ['You have learned to look again.', 'To question what you assumed.', 'To recognize what is true.', 'To notice the person others overlook.', 'To see beyond appearances.', 'To recognize where God may already be at work.'],
      aside: 'The more clearly you see with Him, the more readily you can recognize what He is doing.'
    },
    {
      icon: 'thoughts', title: 'To Think as He Thinks', tone: 'green',
      paragraphs: ['Your mind is increasingly being renewed around the reality of God and His Kingdom.', 'Instead of thinking from fear, self-protection, cultural assumptions, personal ambition, or the need for control, you are learning to ask:'],
      questions: ['What is true?', 'What is good?', 'What is God seeing here?'],
      aside: 'You are learning to understand your world from His point of view.'
    },
    {
      icon: 'serve', title: 'To Act as He Acts', tone: 'ochre',
      bullets: ['You love.', 'You serve.', 'You give.', 'You forgive.', 'You create.', 'You speak truth.', 'You bring peace.', 'You confront what is wrong.', 'You care for what has been entrusted to you.', 'You take the next right step.'],
      aside: 'Not merely because Jesus commanded these things—but because His kind of life is increasingly becoming your kind of life.'
    }
  ],
  declaration: 'God restores the soul so that the whole person can become available to Him—seeing as He sees, thinking as He thinks, acting as He acts, and fulfilling His purposes in the earth.',
  quote: { copy: 'Discipleship is the process of becoming who Jesus would be if He were me.', reference: 'Dallas Willard' },
  closing: { heading: 'This is not the end of the journey.', copy: 'Keep walking with Him. One life with Him. One moment at a time. For His purposes in the earth.' }
};
