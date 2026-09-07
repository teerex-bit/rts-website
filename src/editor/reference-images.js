const paths = [
  '01 - Soul Formation landing.png','02 Awaken landing.png','03 Awaken - 1.png','04 Awaken - 2.png','05 Awaken - 3.png','06 Awaken - 4.png',
  '07 see clearly 1 landing.png','08 see clearly 1 - 1.png','09 see clearly 1 - 2.png','10 see clearly 1 - 3.png','11 see clearly 1 - 4.png','12 see clearly 1 - 5.png',
  '13 see god clearly 2  landing.png','14 see clearly 2- 1.png','15 see clearly 2 - 2.png','16 see clearly 2 - 3.png','17 see clearly 2 - 4.png',
  '18 Becoming landing .png','19 Becoming  1 -1A .png','20 Becoming  1 - 1B .png','21 Becoming  1 - 2A .png','22 Becoming  1 - 2B .png','23 Becoming  1 - 3A .png','24 Becoming  1-  3B .png','25 Becoming  1 - 4A .png','26 Becoming  1 - 4B .png','27 Becoming  1 - 4C .png','28 Becoming 1 - 5A .png','29 Becoming  1 - 5B .png','30 Becoming  2 landing.png','31 Becoming 2 - 1 .png','32 Becoming 2 - 2 .png','33 Becoming 2 - 3 .png','34 Becoming  2 - 4 .png','35 Becoming  2 - 5A .png','36 Becoming  2 - 5B .png','37 Join 1-1.png','38 Conversations landing .png','39 music landing.png','40 books landing.png'
];

function referenceForPage(pageNumber) {
  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > paths.length) throw new Error('INVALID_PAGE');
  return Object.freeze({pageNumber, path:`done/${paths[pageNumber - 1]}`, mimeType:'image/png'});
}

module.exports = {referenceForPage};
