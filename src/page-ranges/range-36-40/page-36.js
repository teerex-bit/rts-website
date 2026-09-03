const stages = require('./stages');

module.exports = {
  number: 36,
  title: 'Sending Practice',
  route: '/become-together/sending/',
  stage: 'Become',
  template: 'closing',
  stages,
  trail: ['Becoming', 'Part Two', 'Lesson 5 of 5', 'Screen 2 of 3'],
  heading: 'What a Changed Person Actually Looks Like',
  introduction: 'If life with God is actually reforming the soul, we should expect to see something different. Change shows up in every part of a person.',
  emphasis: 'These are not instant or perfect. They are the direction and increasingly natural character of a life being formed by God.',
  quote: { copy: 'The mind governed by the Spirit is life and peace.', reference: 'Romans 8:6' },
  domains: [
    {
      icon: 'thoughts', title: 'Their Thoughts', tone: 'navy',
      paragraphs: [
        'God increasingly occupies their attention. They enjoy thinking about His goodness, greatness, purposes, and activity.',
        'Their minds are increasingly hospitable to what is true, honorable, right, pure, lovely, excellent, and worthy of praise.',
        'Evil is real, but it does not dominate their mental world.'
      ],
      evidence: 'My mind returns to God more naturally than it returns to fear, offense, accusation, or imagined disaster.'
    },
    {
      icon: 'heart', title: 'Their Emotional Life', tone: 'burgundy',
      paragraphs: [
        'Love increasingly characterizes their emotional life.',
        'They become capable of gratitude for their lives even when life contains genuine difficulty.',
        'Joy and peace can remain present even during suffering because their emotional life increasingly rests upon what they have learned to be true about God.'
      ],
      evidence: 'Peace is becoming less dependent upon circumstances cooperating.'
    },
    {
      icon: 'will', title: 'Their Will', tone: 'green',
      paragraphs: [
        'They are increasingly disposed toward what is good.',
        'Doing God’s will becomes less of a prolonged internal negotiation.',
        'Getting their own way matters less.',
        'Doing what is right increasingly becomes the obvious response rather than something they must repeatedly force themselves into.'
      ],
      evidence: 'I spend less time arguing with God about whether I will obey Him.'
    },
    {
      icon: 'body', title: 'Their Body', tone: 'ochre',
      paragraphs: [
        'Their bodies increasingly cooperate with their intentions.',
        'Their tongue, face, eyes, hands, posture, and automatic responses don’t continually betray what their will has chosen.',
        'The body becomes habituated toward serving what is good.'
      ],
      evidence: 'The response I once had to stop myself from making occurs less often. The Christlike response I once had to consciously manufacture occurs more naturally.'
    },
    {
      icon: 'relationships', title: 'Their Relationships', tone: 'navy',
      paragraphs: [
        'They become increasingly transparent and less manipulative.',
        'Because their confidence is in God, they have less need to manage other people.',
        'They don’t need condemnation to distinguish good from evil, nor do they need participation in evil in order to remain present with people.'
      ],
      evidence: 'I increasingly seek your good without needing to control you.'
    },
    {
      icon: 'inner-life', title: 'Their Inner Life', tone: 'violet',
      paragraphs: [
        'Their inner life becomes increasingly unified.',
        'Thoughts, feelings, desires, will, body, and relationships increasingly align under God’s loving rule.',
        'The secret, private, and public person become less divided and more whole.'
      ],
      evidence: 'My life is becoming less fragmented and more integrated under God.'
    }
  ],
  pagination: {
    current: 2,
    total: 3,
    previous: { label: 'Previous: Screen 1 — The Fruit', href: '/become-together/guided-conversation/' },
    next: { label: 'Next: Screen 3 — A Soul at Home in God', href: '/join/' }
  }
};
