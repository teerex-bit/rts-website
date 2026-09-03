const render = require('./renderer');
const css = require('./styles');

const pages = new Map([
  [36, require('./page-36')],
  [37, require('./page-37')],
  [38, require('./page-38')],
  [39, require('./page-39')],
  [40, require('./page-40')]
]);

module.exports = { pages, render, css };
