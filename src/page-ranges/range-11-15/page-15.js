const { journey } = require('./shared');

module.exports = {
  number: 15,
  route: '/see-god-clearly/distortions/',
  title: 'The Same God.',
  family: 'reflection-table',
  course: 'See Clearly · Part 2 of 2',
  lesson: 'Lesson 5 of 5',
  progress: 'Reflection 5 of 6',
  progressValue: 5,
  progressMax: 6,
  step: 5,
  journey,
  eyebrow: 'Reflection 5 of 6',
  introduction: ['Jesus does not reveal a different God from the Old Testament. He reveals clearly the God who was there all along.', 'Look at the heart of God in both Testaments.', 'What do we see?'],
  heroImage: '/assets/page-ranges/range-11-15/jesus-child.jpg',
  columns: ['In Jesus (New Testament)', 'In God (Old Testament)'],
  rows: [
    { trait: 'Compassion', icon: 'heart', new: 'Jesus was moved with compassion toward suffering people. (Matthew 9:36)', old: 'God saw their suffering and said, “I am concerned about their suffering.” (Exodus 3:7)' },
    { trait: 'Mercy', icon: 'hand', new: 'Jesus welcomed sinners and offered forgiveness and new life. (Luke 15:1–7)', old: '“Merciful and gracious, slow to anger, and abounding in steadfast love.” (Exodus 34:6–7)' },
    { trait: 'Faithfulness', icon: 'shield', new: 'Jesus remained faithful—even when His followers failed Him. (2 Timothy 2:13)', old: 'God’s faithfulness continues through Israel’s failures. (Lamentations 3:22–23)' },
    { trait: 'Kindness', icon: 'gift', new: 'Jesus provided, healed, and gave good gifts. (Matthew 7:11)', old: '“The Lord is good to all, and His mercy is over all that He has made.” (Psalm 145:9)' },
    { trait: 'Patience', icon: 'clock', new: 'Jesus patiently taught and endured slow, confused disciples. (Mark 4:33–34)', old: 'God bore with Israel again and again for many generations. (Nehemiah 9:28–31)' }
  ],
  previous: '/see-god-clearly/images/',
  next: '/see-god-clearly/with-us/',
  continueLabel: 'Continue'
};
