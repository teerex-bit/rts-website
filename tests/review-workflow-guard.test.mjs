import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateReviewWorkflow } from '../scripts/verify-review-workflow.mjs';

const workflowPath = new URL('../.github/workflows/deploy-website-review.yml', import.meta.url);
const source = await readFile(workflowPath, 'utf8');
const productionWorkflow = await readFile(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');

test('review workflow has an executable-command guard and keeps exact deployment safeguards', () => {
  assert.equal(validateReviewWorkflow(source), true);
});

test('comments and explanatory output mentioning prohibited services are ignored', () => {
  const harmless = source.replace(
    'echo "DEPLOY_SHA=$actual" >> "$GITHUB_ENV"',
    '# Do not run unrelated tools\n          echo "Vercel, Supabase and rts-deep-dive are prohibited"\n          echo "This is documentation, not a command"\n          echo "DEPLOY_SHA=$actual" >> "$GITHUB_ENV"',
  );
  assert.equal(validateReviewWorkflow(harmless), true);
});

test('actual unrelated infrastructure commands fail closed', () => {
  const unsafe = source.replace(
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"',
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"\n          npx vercel deploy',
  );
  assert.throws(() => validateReviewWorkflow(unsafe), /unrelated infrastructure command/i);
});

test('Wrangler route or domain mutations fail closed', () => {
  const unsafe = source.replace(
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"',
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"\n          npx wrangler routes add reformingthesoul.com',
  );
  assert.throws(() => validateReviewWorkflow(unsafe), /unexpected Wrangler command/i);
});

test('Cloudflare API infrastructure operations fail closed', () => {
  const unsafe = source.replace(
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"',
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"\n          curl -X PUT https://api.cloudflare.com/client/v4/accounts/123/workers/scripts/rts-website',
  );
  assert.throws(() => validateReviewWorkflow(unsafe), /Cloudflare API operation/i);
});

test('unexpected executable heredocs fail closed', () => {
  const unsafe = source.replace(
    'node scripts/verify-review-workflow.mjs',
    "node <<'SCRIPT'\n          process.exit(0)\n          SCRIPT",
  );
  assert.throws(() => validateReviewWorkflow(unsafe), /here-document/i);
});

test('review Worker configuration script is fingerprinted so it cannot be edited around the checks', () => {
  const unsafe = source.replace(
    'const expectedWorker = process.env.EXPECTED_WORKER;',
    'fetch("https://api.cloudflare.com/client/v4");\n          const expectedWorker = process.env.EXPECTED_WORKER;',
  );
  assert.throws(() => validateReviewWorkflow(unsafe), /configuration guard changed/i);
});

test('unexpected deploy commands fail closed even when their text is otherwise innocuous', () => {
  const unsafe = source.replace(
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"',
    'test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"\n          npx wrangler deploy --config production.jsonc',
  );
  assert.throws(() => validateReviewWorkflow(unsafe), /unexpected Wrangler command/i);
});

test('production deployment is guarded to the exact repository main ref and checked-out SHA', () => {
  const guardPosition = productionWorkflow.indexOf('Guard production deployment target');
  const deployPosition = productionWorkflow.indexOf('Deploy static public site to Cloudflare');
  assert.ok(guardPosition >= 0 && deployPosition > guardPosition);
  const guard = productionWorkflow.slice(guardPosition, deployPosition);
  assert.match(guard, /test "\$GITHUB_REPOSITORY" = "teerex-bit\/rts-website"/);
  assert.match(guard, /test "\$GITHUB_REF" = "refs\/heads\/main"/);
  assert.match(guard, /git rev-parse HEAD/);
  assert.match(guard, /test "\$actual" = "\$requested"/);
});
