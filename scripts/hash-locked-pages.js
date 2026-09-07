const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const manifestFile = path.join(root, 'src', 'editor', 'locked-output.json');
const lockedFiles = {
  '01': path.join(root, 'dist', 'index.html'),
  '38': path.join(root, 'dist', 'conversations', 'index.html')
};

function hashFile(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function readCurrentHashes() {
  return Object.fromEntries(
    Object.entries(lockedFiles).map(([page, file]) => [page, hashFile(file)])
  );
}

const currentHashes = readCurrentHashes();

if (process.argv.includes('--write')) {
  fs.mkdirSync(path.dirname(manifestFile), { recursive: true });
  fs.writeFileSync(manifestFile, `${JSON.stringify(currentHashes, null, 2)}\n`);
  console.log(`Wrote locked output hashes to ${path.relative(root, manifestFile)}.`);
} else {
  const expectedHashes = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  const changedPages = Object.keys(lockedFiles).filter(
    page => expectedHashes[page] !== currentHashes[page]
  );

  if (changedPages.length > 0) {
    for (const page of changedPages) {
      console.error(
        `Locked Page ${page} output changed: expected ${expectedHashes[page]}, got ${currentHashes[page]}.`
      );
    }
    process.exitCode = 1;
  } else {
    console.log('Locked Page 01 and Page 38 output hashes match the baseline.');
  }
}
