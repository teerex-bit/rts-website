module.exports = {
  number: 31,
  route: '/become-together/companions/',
  stage: 'Become',
  title: 'The Will',
  kicker: 'Becoming · Part Two · Lesson 1 of 5',
  subtitle: 'Where the inner life becomes a life actually lived.',
  heroNote: 'This lesson is in three parts. Follow the flow, then return whenever you need it.',
  progress: { current: 1, total: 5, previous: 'Become Overview', previousHref: '/become/', next: '2. The Body', nextHref: '/become-together/listening/' },
  panels: [
    {
      icon: '1', tone: 'navy', heading: 'The Executive Center of the Person',
      lede: 'Your will is not what you think, feel, want, or prefer. Your will is where you decide what you will do with all of it.',
      blocks: [
        { type: 'columns', columns: [
          { heading: 'The will is', items: ['The capacity to choose.', 'To intend.', 'To consent or refuse.', 'To commit.', 'To act.'] },
          { heading: 'The will is not', items: ['Your thoughts', 'Your feelings', 'Your desires', 'Your impulses', 'Your preferences', 'Your opinions', 'Your fears', 'Your appetites'] }
        ] },
        { type: 'callout', heading: 'You can feel resistance and still be surrendered.', text: 'Fear does not mean you lack faith. Not wanting something does not mean you have rejected God’s will. Feeling angry does not require choosing anger. Having an unwanted thought does not mean you have consented to it.' },
        { type: 'quote', text: 'The will can choose God in the middle of the conflict.' }
      ]
    },
    {
      icon: '2', tone: 'navy', heading: 'What Moves the Will?',
      lede: 'Your will makes the choice—but it does not make that choice in a vacuum.',
      blocks: [
        { type: 'cards', cards: [
          { icon: 'thought', heading: 'Thoughts', text: 'What do I believe is true? What I believe shapes the reality within which my will chooses. Renewed thinking makes different choices reasonable.' },
          { icon: 'heart', heading: 'Feelings', text: 'What is moving within me? Feelings provide information and motivation. They are powerful, but they do not deserve automatic authority.' },
          { icon: 'flame', heading: 'Desires', text: 'What do I want? The will tends to move toward what the person has learned to see as desirable. Formation changes what we see, which changes what we value, which changes what we desire.' }
        ] },
        { type: 'callout', heading: 'The will can choose what is good before the rest of the person agrees.', text: 'Thought: I know forgiveness is the way of Jesus. Feeling: I am angry and hurt. Desire: I want them to pay for what they did. Will: Nevertheless, I choose not to retaliate.' },
        { type: 'p', text: 'At first, obedience may require this kind of decision. But formation goes deeper than fighting alone.' }
      ]
    },
    {
      icon: '3', tone: 'navy', heading: 'When My Will Aligns With God',
      lede: 'God is not merely teaching you to choose against yourself. He is changing the self from which your choices come.',
      blocks: [
        { type: 'flow', steps: [
          { heading: 'At first', text: 'I choose God’s way despite what I want.' },
          { heading: 'Increasingly', text: 'I begin wanting God’s way.' },
          { heading: 'Over time', text: 'God’s way becomes the way I naturally live.' }
        ] },
        { type: 'columns', columns: [
          { heading: 'A divided inner life', items: ['I know what is good.', 'But I want something else.', 'My feelings pull against it.', 'I argue with myself.', 'My will eventually chooses.'] },
          { heading: 'An aligned inner life', items: ['I see what God sees.', 'I value what God values.', 'I increasingly desire what God desires.', 'My feelings increasingly correspond to truth.', 'My will freely chooses His way.', 'My life increasingly expresses that choice.'] }
        ] },
        { type: 'callout', heading: 'Christlikeness is not finally measured by how often you defeat yourself.', text: 'It is revealed as there becomes less within you that must be defeated.' },
        { type: 'quote', text: 'God doesn’t want to eliminate your will. He wants your will freely aligned with His. “I delight to do Your will, O my God.” — Psalm 40:8' }
      ]
    }
  ]
};
