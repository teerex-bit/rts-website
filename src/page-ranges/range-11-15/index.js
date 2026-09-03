const pages = new Map([
  [11, require('./page-11')],
  [12, require('./page-12')],
  [13, require('./page-13')],
  [14, require('./page-14')],
  [15, require('./page-15')]
]);
const renderPage = require('./render');
const css = require('./styles');

function render(page) {
  return renderPage(page, pages);
}

module.exports = { pages, render, css };
