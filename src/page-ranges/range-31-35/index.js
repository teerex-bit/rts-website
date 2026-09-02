const page31 = require('./page-31');
const page32 = require('./page-32');
const page33 = require('./page-33');
const page34 = require('./page-34');
const page35 = require('./page-35');
const render = require('./render');
const css = require('./styles');

const pages = new Map([page31, page32, page33, page34, page35].map((page) => [page.number, page]));

module.exports = { pages, render, css };
