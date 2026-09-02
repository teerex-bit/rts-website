const page21 = require('./page-21');
const page22 = require('./page-22');
const page23 = require('./page-23');
const page24 = require('./page-24');
const page25 = require('./page-25');
const render = require('./renderer');
const css = require('./css');

const pages = new Map([page21, page22, page23, page24, page25].map(page => [page.number, page]));

module.exports = { pages, render, css };
