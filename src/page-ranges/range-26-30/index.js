const page26 = require('./page-26');
const page27 = require('./page-27');
const page28 = require('./page-28');
const page29 = require('./page-29');
const page30 = require('./page-30');
const render = require('./renderer');
const css = require('./styles');

const pages = new Map([page26, page27, page28, page29, page30].map(page => [page.number, page]));

module.exports = {pages, render, css};
