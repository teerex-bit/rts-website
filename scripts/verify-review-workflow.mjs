import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const expectedSteps = [
  'Validate requested candidate',
  'Check out exact candidate',
  'Enforce exact checked-out SHA',
  'Fail closed on review Worker configuration',
  'Verify workflow has no unrelated infrastructure operations',
  'Run website automated tests',
  'Run diff whitespace validation',
  'Deploy exact candidate to review Worker',
  'Verify review website',
];

function stepBlocks(source) {
  const lines = source.split(/\r?\n/);
  const blocks = [];
  let current = null;
  for (const line of lines) {
    const match = line.match(/^      - name: (.+)$/);
    if (match) {
      if (current) blocks.push(current);
      current = { name: match[1].replace(/^['"]|['"]$/g, ''), lines: [line] };
    } else if (current) current.lines.push(line);
  }
  if (current) blocks.push(current);
  return blocks;
}

function runBody(block) {
  const start = block.lines.findIndex(line => /^        run: \|\s*$/.test(line));
  if (start < 0) return null;
  const body = [];
  for (const line of block.lines.slice(start + 1)) {
    if (line.trim() && !/^          /.test(line)) break;
    body.push(line.replace(/^          /, ''));
  }
  return body.join('\n');
}

function commandLines(run, { allowHeredoc = false } = {}) {
  if (!run) return [];
  const lines = run.split(/\r?\n/);
  const commands = [];
  let heredoc = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (heredoc) {
      if (line === heredoc) heredoc = null;
      continue;
    }
    if (!line || line.startsWith('#')) continue;
    const hd = line.match(/<<\s*['"]?([A-Za-z_][A-Za-z0-9_]*)['"]?/);
    if (hd) {
      if (!allowHeredoc) throw new Error('Unexpected executable here-document in review workflow.');
      commands.push(line);
      heredoc = hd[1];
      continue;
    }
    if (/^(?:echo|printf)\b/.test(line)) continue;
    commands.push(line);
  }
  return commands;
}

export function validateReviewWorkflow(source) {
  const blocks = stepBlocks(source);
  const names = blocks.map(block => block.name);
  if (JSON.stringify(names) !== JSON.stringify(expectedSteps)) {
    throw new Error('Review workflow step structure changed; refusing deployment until audited.');
  }

  const checkout = blocks[1].lines.join('\n');
  if (!/uses: actions\/checkout@v4/.test(checkout) || !/ref: \$\{\{ inputs\.candidate \}\}/.test(checkout)) {
    throw new Error('Review checkout must use the requested exact candidate.');
  }
  const candidateGuard = runBody(blocks[0]) ?? '';
  const shaGuard = runBody(blocks[2]) ?? '';
  const configGuard = runBody(blocks[3]) ?? '';
  const configGuardHash = createHash('sha256').update(configGuard).digest('hex');
  if (configGuardHash !== '94a45eb95607239540f626485a07ac20ab7ceb2c0314fb87b003cd03ceae4037') {
    throw new Error('Review Worker configuration guard changed; refusing deployment until re-audited.');
  }
  if (!candidateGuard.includes('test "$GITHUB_REPOSITORY" = "$EXPECTED_REPOSITORY"') ||
      !candidateGuard.includes('^([0-9a-fA-F]{40})$') && !candidateGuard.includes('^[0-9a-fA-F]{40}$')) {
    throw new Error('Repository and exact 40-character candidate guards are required.');
  }
  if (!shaGuard.includes('git rev-parse HEAD') || !shaGuard.includes('test "$actual" = "$requested"')) {
    throw new Error('Exact checked-out SHA guard is required.');
  }
  for (const required of [
    'expectedWorker = process.env.EXPECTED_WORKER',
    'productionWorker = process.env.PRODUCTION_WORKER',
    'cfg.name !== expectedWorker',
    'cfg.name === productionWorker',
    'cfg.assets.directory !== expectedAssets',
    'reformingthesoul.com',
    '"routes", "route"',
  ]) {
    if (!configGuard.includes(required)) throw new Error(`Review Worker safety check missing: ${required}`);
  }

  const allCommands = blocks.flatMap((block, index) =>
    commandLines(runBody(block), { allowHeredoc: index === 3 })
      .map(command => ({ step: block.name, index, command })),
  );
  const deployCommands = allCommands.filter(({ command }) => /\bwrangler\b/i.test(command));
  if (deployCommands.length !== 1 ||
      deployCommands[0].step !== 'Deploy exact candidate to review Worker' ||
      deployCommands[0].command !== 'npx --yes wrangler@4.86.0 deploy --config wrangler.jsonc') {
    throw new Error('Unexpected Wrangler command; refusing deployment.');
  }
  const forbiddenCli = /\b(?:vercel|supabase|rts-deep-dive|terraform|tofu|pulumi|aws|gcloud|az)\b/i;
  for (const { command } of allCommands) {
    if (forbiddenCli.test(command)) throw new Error(`Unrelated infrastructure command detected: ${command}`);
    if (/\bcloudflare\b/i.test(command) && /\b(?:dns|zone)\b/i.test(command) &&
        /\b(?:curl|fetch|wrangler|npx|node|python|terraform|tofu|pulumi)\b/i.test(command)) {
      throw new Error(`Cloudflare DNS/zone operation detected: ${command}`);
    }
    if (/\bapi\.cloudflare\.com\b|\/client\/v4\//i.test(command)) {
      throw new Error(`Cloudflare API operation is outside the review deployment allowlist: ${command}`);
    }
  }
  return true;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const source = await readFile('.github/workflows/deploy-website-review.yml', 'utf8');
  validateReviewWorkflow(source);
  console.log('Review workflow executable-command guard passed.');
}
