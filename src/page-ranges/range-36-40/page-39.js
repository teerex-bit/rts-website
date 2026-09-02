const stages = require('./stages');

module.exports = {
  number: 39,
  title: 'Music',
  route: '/music/',
  stage: 'Join',
  template: 'library',
  stages,
  brand: 'Reforming the Soul',
  nav: ['Teachings', 'Writings', 'Books', 'Music', 'Spiritual Direction', 'About Us'],
  heading: 'Alluminate',
  tagline: ['Songs that illuminate truth.', 'Melodies that lead you home.'],
  introduction: [
    'Each song is a story—of struggle and surrender, hope and healing, questions and encounters, and the unwavering pursuit of a Father who never stopped calling.',
    'Whether you need courage, comfort, clarity, or a reminder that you are not alone, there is a song here for your journey.'
  ],
  primaryAction: { label: 'Listen to all songs', href: '/coming-soon/' },
  quote: 'He is better than we imagined, closer than we believed, and more interested in a relationship with us than simply changing our circumstances.',
  songs: [
    'All In', 'Buried Way Too Deep', 'Called Me Friend', 'The Dust and the Flame', 'Fear in My Rearview (Funk)', 'Fear in My Rearview (Rock)', 'Fear Won’t Speak for Me', 'Fear Won’t Speak for Me (Reprise)', 'Giant Voices', 'Holding the Line',
    'I Am Held', 'I Rise', 'It Was You', 'I Will Wait for You', 'The Kingdom is Among You', 'Let’s GO!', 'Looking for Your Voice', 'The Misaligned Dreamer',
    'No Interest in Fear', 'The Quiet Things', 'React Like Jesus', 'Rest in Peace', 'Right Here With You', 'Safe Here', 'The Slow and the Still', 'So Good to Me',
    'Steps Into Freedom', 'Tight Strings', 'Trust Without Receipts', 'We Dance', 'What Remains of Me', 'What They Said', 'Where I Stand', 'World’s on Fire',
    'You Made it Clear'
  ],
  card: { heading: 'Music for every moment. Lyrics for every season. Truth for every heart.', action: 'Explore our music' },
  closing: { heading: 'Let truth find you. Let the songs speak. Let His light alluminate the way.', pillars: ['See Him more clearly', 'Know Him more deeply', 'Walk with Him daily'] }
};
