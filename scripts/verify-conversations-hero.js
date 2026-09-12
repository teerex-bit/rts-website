const fs = require('fs');
const assert = require('assert');

const css = fs.readFileSync('src/assets/conversations-approved.css', 'utf8');

assert.match(css, /\.conversations-hero:before\{[^}]*width:60%/, 'Conversations needs a wide fade layer, not a hard half-page overlay.');
assert.match(css, /rgba\(251,247,239,\.42\) 80%/, 'The Conversations fade needs a soft mid-image transition.');
assert.match(css, /rgba\(251,247,239,0\) 100%/, 'The Conversations fade must fully clear into the scenic image.');
assert.doesNotMatch(css, /width:50%;pointer-events:none;background:linear-gradient\(90deg,#fbf7ef 0%,rgba\(251,247,239,\.99\) 48%/, 'The former hard half-page Conversations gradient must not return.');

console.log('Conversations hero gradient verified.');
