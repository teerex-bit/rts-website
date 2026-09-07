# Reforming the Soul Routine Chat Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let Trey and Malea make safe routine website edits from ordinary ChatGPT Chat without Work/Codex credits, while preserving GitHub history, locked pages, validation, and production approval.

**Architecture:** Add schema-validated edit overrides to the existing static-site build, then expose only those edits through a private Cloudflare Worker MCP plugin. Every accepted edit produces one commit on `review`; GitHub Actions validates and deploys the review build. A one-time update keeps the existing OpenAI Sites review URL as the permanent viewer for the Cloudflare-backed review build.

**Tech Stack:** Node.js 24, CommonJS site generator, Cheerio, Node test runner, GitHub REST API, GitHub Actions, Cloudflare Workers/Pages, MCP Apps protocol.

**Spec:** `docs/superpowers/specs/2026-09-07-rts-chat-editor-design.md`

## Global Constraints

- Start from current `main` commit `58094d9821927489746f738fc2aec0ab683eded6` or a verified newer approved commit.
- Preserve OpenAI Sites project `appgprj_6a942c28d51c81919b927fc5eef4a46b` and its existing review URL.
- Preserve all 40 pages and exactly 44 generated HTML routes.
- Preserve `done/` references; never render a reference screenshot as a webpage.
- Preserve Page 01 and Page 38 locks from `AGENTS.md`.
- Never introduce `Walk` as a stage or route; stages remain Awaken, See Clearly, Become, Join.
- Routine editing writes only to `review`; production requires explicit approval.
- Do not change current page output while adding edit infrastructure.
- Do not invoke an external coding model for routine edits.
- Never store GitHub or Cloudflare credentials in repository files, generated pages, logs, or plugin responses.

## File Map

### Website repository

- `src/editor/override-schema.js` — validates editable operations and enforces page locks.
- `src/editor/overrides.json` — versioned routine-edit records; starts empty.
- `src/editor/field-registry.js` — maps page/section/field IDs to allowed selectors and edit kinds.
- `src/editor/apply-overrides.js` — applies validated overrides to generated HTML.
- `src/editor/style-tokens.js` — allowlisted spacing, color, alignment, and image-position values.
- `scripts/build.js` — calls the override layer after page rendering and before writing HTML.
- `scripts/check-editor.js` — verifies locks, route count, forbidden stages, registry coverage, and override validity.
- `scripts/hash-locked-pages.js` — creates/verifies Page 01 and Page 38 output hashes.
- `tests/editor/*.test.js` — unit and integration tests for the editing layer.
- `.github/workflows/review-edit.yml` — validates every `review` commit and deploys only passing builds.

### Private editing service/plugin

- `editor-service/src/index.js` — Cloudflare Worker entrypoint and MCP transport.
- `editor-service/src/auth.js` — validates private plugin requests and requester identity.
- `editor-service/src/github.js` — minimal GitHub read/write and workflow-status client.
- `editor-service/src/tools.js` — tool definitions and request routing.
- `editor-service/src/preview.js` — resolves and previews one change against a commit SHA.
- `editor-service/src/apply.js` — stale-safe one-commit write to `review`.
- `editor-service/src/status.js` — validation/deployment status lookup.
- `editor-service/src/audit.js` — append-only audit event writer.
- `editor-service/wrangler.jsonc` — Worker bindings without secret values.
- `.codex-plugin/plugin.json` — private plugin manifest.
- `editor-service/test/*.test.js` — service and MCP contract tests.

### Review handoff

- `src/review-remote.js` — allowlisted Cloudflare review origin used by the existing page switcher.
- `src/pages-01-40-review.js` — loads review routes from the remote validated origin while retaining the existing viewer.
- `tests/editor/review-shell.test.js` — verifies the existing review entry URL and all 40 page targets.

---

### Task 1: Establish the protected implementation branch and baseline

**Files:**
- Modify: `package.json`
- Create: `tests/editor/baseline.test.js`
- Create: `scripts/hash-locked-pages.js`
- Create: `src/editor/locked-output.json`

**Interfaces:**
- Consumes: current `main`, `AGENTS.md`, `scripts/build.js`, and generated `dist/`.
- Produces: `npm run test:editor`, `npm run check:locked`, and immutable baseline hashes for `/` and `/conversations/`.

- [ ] **Step 1: Create an isolated worktree from current main**

Run:

```bash
git fetch origin main review
git worktree add ../rts-chat-editor -b codex/rts-chat-editor origin/main
cd ../rts-chat-editor
git rev-parse HEAD
```

Expected: HEAD equals `58094d9821927489746f738fc2aec0ab683eded6` or a newer commit explicitly verified as approved.

- [ ] **Step 2: Write the failing baseline test**

Create `tests/editor/baseline.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const pages = require('../../src/pages');

test('website baseline contains 40 pages and protected routes', () => {
  assert.equal(pages.length, 40);
  assert.equal(pages.find(page => page.number === 1).route, '/');
  assert.equal(pages.find(page => page.number === 38).route, '/conversations/');
});

test('locked output hash manifest exists for both approved pages', () => {
  const file = path.join(__dirname, '../../src/editor/locked-output.json');
  const hashes = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.match(hashes['01'], /^[a-f0-9]{64}$/);
  assert.match(hashes['38'], /^[a-f0-9]{64}$/);
});
```

- [ ] **Step 3: Run the test and verify the missing manifest failure**

Run: `node --test tests/editor/baseline.test.js`

Expected: FAIL because `src/editor/locked-output.json` does not exist.

- [ ] **Step 4: Implement locked-output hashing**

Create `scripts/hash-locked-pages.js` to SHA-256 `dist/index.html` and `dist/conversations/index.html`. With `--write`, write the two computed 64-character digests under keys `01` and `38`; never hand-enter or reuse a digest from another build.

Without `--write`, compare current output to the manifest and exit nonzero on mismatch. Add scripts:

```json
{
  "test:editor": "node --test tests/editor/*.test.js editor-service/test/*.test.js",
  "check:locked": "node scripts/hash-locked-pages.js"
}
```

- [ ] **Step 5: Generate and verify the baseline**

Run:

```bash
npm ci
npm run build
node scripts/hash-locked-pages.js --write
npm run build
npm run check:locked
node --test tests/editor/baseline.test.js
```

Expected: all commands PASS and generated Page 01/Page 38 files remain byte-identical across both builds.

- [ ] **Step 6: Commit the baseline**

```bash
git add package.json scripts/hash-locked-pages.js src/editor/locked-output.json tests/editor/baseline.test.js
git commit -m "test: protect locked website output"
```

---

### Task 2: Add the routine-edit schema and field registry

**Files:**
- Create: `src/editor/override-schema.js`
- Create: `src/editor/field-registry.js`
- Create: `src/editor/style-tokens.js`
- Create: `src/editor/overrides.json`
- Create: `tests/editor/override-schema.test.js`

**Interfaces:**
- Produces: `validateOverride(value) -> frozen Override`, `validateOverrideDocument(value) -> frozen Override[]`, `getField(pageNumber, sectionId, fieldId) -> FieldDefinition`.
- `Override` shape: `{id, pageNumber, route, sectionId, fieldId, kind, value, sourceCommit, requestedBy, createdAt}`.

- [ ] **Step 1: Write schema tests covering accepted and rejected operations**

Tests must assert:

```js
assert.equal(validateOverride(validText).kind, 'text');
assert.throws(() => validateOverride({...validText, pageNumber: 1}), /locked/i);
assert.throws(() => validateOverride({...validText, pageNumber: 38}), /locked/i);
assert.throws(() => validateOverride({...validText, value: 'Walk'}), /forbidden stage/i);
assert.throws(() => validateOverride({...validText, kind: 'javascript'}), /unsupported kind/i);
```

- [ ] **Step 2: Run the schema test and verify it fails**

Run: `node --test tests/editor/override-schema.test.js`

Expected: FAIL because the schema module does not exist.

- [ ] **Step 3: Implement exact allowlists**

`style-tokens.js` exports:

```js
module.exports = Object.freeze({
  spacing: ['compact', 'standard', 'spacious'],
  align: ['left', 'center', 'right'],
  imagePosition: ['left', 'center', 'right', 'top', 'bottom'],
  color: ['navy', 'cream', 'gold', 'olive', 'charcoal', 'white']
});
```

`override-schema.js` accepts only `text`, `link`, `image`, `alt`, `spacing`, `align`, `color`, `visibility`, and `order`. It rejects pages 1 and 38, undeclared fields, unknown keys, unsafe URL schemes, reference images under `done/`, and any stage/route value that introduces Walk.

- [ ] **Step 4: Register every initially editable page and section**

`field-registry.js` explicitly lists pages 2–37 and 39–40. Each field definition contains:

```js
{
  pageNumber: 3,
  route: '/awaken/pay-attention/',
  sectionId: 'hero',
  fieldId: 'heading',
  selector: '[data-edit-id="hero.heading"]',
  kinds: ['text']
}
```

Only register fields already represented by current live text, link, asset, or existing layout section. Do not invent new content.

- [ ] **Step 5: Create the empty override document**

Create `src/editor/overrides.json` containing exactly:

```json
{
  "version": 1,
  "overrides": []
}
```

- [ ] **Step 6: Run schema tests**

Run: `node --test tests/editor/override-schema.test.js`

Expected: PASS.

- [ ] **Step 7: Commit schema and registry**

```bash
git add src/editor tests/editor/override-schema.test.js
git commit -m "feat: define safe routine website edits"
```

---

### Task 3: Apply overrides without changing current output

**Files:**
- Create: `src/editor/apply-overrides.js`
- Create: `tests/editor/apply-overrides.test.js`
- Modify: `scripts/build.js`
- Modify: renderer files under `src/pages-03-10/`, `src/page-ranges/`, and `src/page-corrections/` only to add stable `data-edit-id` attributes.

**Interfaces:**
- Consumes: validated override document and field registry.
- Produces: `applyOverrides({html, page, document}) -> html`.

- [ ] **Step 1: Write focused transformation tests**

Cover text, link, image source/alt, style token, visibility, and order. Include this no-op assertion:

```js
assert.equal(
  applyOverrides({html: fixture, page, document: {version: 1, overrides: []}}),
  fixture
);
```

- [ ] **Step 2: Run tests and verify module-not-found failure**

Run: `node --test tests/editor/apply-overrides.test.js`

Expected: FAIL.

- [ ] **Step 3: Add Cheerio and implement deterministic transformations**

Run: `npm install cheerio@1.1.2 --save-exact`

`applyOverrides` must load HTML without entity rewriting, resolve each registered selector exactly once, apply only the declared kind, and throw if a selector matches zero or multiple elements. Style operations write only scoped CSS custom properties from `style-tokens.js`.

- [ ] **Step 4: Add stable edit IDs to unlocked renderers**

Add `data-edit-id="section.field"` only to registered editable elements. Do not add markers or change bytes in `src/page-01-approved.html`, `src/conversations-approved.html`, their CSS, or their protected assets.

- [ ] **Step 5: Integrate after rendering and before file write**

In `scripts/build.js`, validate `src/editor/overrides.json` once, then call:

```js
const editableHtml = applyOverrides({html, page: p, document: overrideDocument});
fs.writeFileSync(path.join(dir, 'index.html'), editableHtml);
```

For pages 1 and 38, continue using the existing approved snapshot paths and do not call `applyOverrides`.

- [ ] **Step 6: Prove empty overrides preserve all current output**

Run two builds, saving SHA-256 manifests of `dist/` before and after integration. Expected: every generated file hash matches except intentional package lock metadata; HTML and assets are byte-identical.

- [ ] **Step 7: Run all repository checks**

```bash
npm run build
npm run check
npm run check:server
npm run check:locked
node --test tests/editor/apply-overrides.test.js
```

Expected: PASS; 44 routes reported.

- [ ] **Step 8: Commit override application**

```bash
git add package.json package-lock.json scripts/build.js src tests/editor
git commit -m "feat: apply validated website overrides"
```

---

### Task 4: Add editor-specific repository validation

**Files:**
- Create: `scripts/check-editor.js`
- Create: `tests/editor/check-editor.test.js`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run check:editor`; zero exit only when locks, routes, fields, and overrides are safe.

- [ ] **Step 1: Write fixture-driven failing tests**

Create fixtures that separately introduce a locked-page change, a 43-route build, a `Walk` route, a `done/` page image, a duplicate edit ID, and an unregistered override. Assert each produces a distinct error.

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/editor/check-editor.test.js`

Expected: FAIL because `scripts/check-editor.js` does not exist.

- [ ] **Step 3: Implement the validator**

The script must verify:

```text
40 source page records
44 generated HTML routes
Page 01 and 38 output hashes
no /walk/ route
no Walk stage label
no rendered done/ reference image
unique data-edit-id values per page
every override resolves to one registry field
every registry field resolves to one generated element
```

- [ ] **Step 4: Add the package command and run all checks**

Add `"check:editor": "node scripts/check-editor.js"` and run:

```bash
npm run build
npm run check
npm run check:server
npm run check:locked
npm run check:editor
npm run test:editor
```

Expected: PASS.

- [ ] **Step 5: Commit validation**

```bash
git add package.json scripts/check-editor.js tests/editor/check-editor.test.js
git commit -m "test: validate routine website edits"
```

---

### Task 5: Build the private GitHub editing service

**Files:**
- Create: `editor-service/package.json`
- Create: `editor-service/src/{index,auth,github,preview,apply,status,audit}.js`
- Create: `editor-service/test/{auth,preview,apply,status}.test.js`
- Create: `editor-service/wrangler.jsonc`

**Interfaces:**
- `previewChange(input, deps) -> {changeToken, sourceCommit, summary, diff}`.
- `applyChange({changeToken, requestedBy}, deps) -> {changeId, commitSha, status}`.
- `getChangeStatus({changeId}, deps) -> {state, checks, reviewUrl}`.
- GitHub writes only `src/editor/overrides.json` or a registered replacement asset on `review`.

- [ ] **Step 1: Write service contract tests with a fake GitHub client**

Tests must cover authentication failure, locked page, stale source SHA, minimal override commit, idempotent status, redacted errors, and audit event creation.

- [ ] **Step 2: Run and verify failure**

Run: `node --test editor-service/test/*.test.js`

Expected: FAIL because service modules do not exist.

- [ ] **Step 3: Implement the GitHub client boundary**

Expose only:

```js
getBranchHead('review')
getUtf8File(path, ref)
putUtf8File(path, content, expectedBlobSha, branch, message)
putBinaryFile(path, base64, branch, message)
getWorkflowStatus(commitSha)
```

Reject other branches and paths outside `src/editor/overrides.json` and the field registry's exact asset paths.

- [ ] **Step 4: Implement signed preview tokens**

The token payload contains `sourceCommit`, target field key, SHA-256 of before value, SHA-256 of proposed value, expiry no longer than 30 minutes, and a nonce. Sign with `CHANGE_TOKEN_SECRET`; never include GitHub credentials.

- [ ] **Step 5: Implement stale-safe application**

Before writing, reload `review`, reload the target file, and compare the source commit and before-value hash. On mismatch return `409 STALE_CHANGE`; do not retry or overwrite.

- [ ] **Step 6: Implement append-only audit events**

Write one JSON event per operation to a Cloudflare D1 or KV binding using key `audit/<ISO timestamp>/<changeId>`. Store requester label, page, section, field, before/after hashes, commit, and outcome; do not store secrets or full uploaded image bytes.

- [ ] **Step 7: Configure Worker bindings**

`wrangler.jsonc` names bindings `GITHUB_REPOSITORY`, `GITHUB_APP_ID`, `GITHUB_INSTALLATION_ID`, `GITHUB_PRIVATE_KEY`, `CHANGE_TOKEN_SECRET`, `PLUGIN_SHARED_SECRET`, and `AUDIT_LOG`. Secret values are added through Cloudflare encrypted secrets only.

- [ ] **Step 8: Run tests and commit**

```bash
npm run test:editor
git add editor-service
git commit -m "feat: add protected website editing service"
```

---

### Task 6: Expose narrow MCP tools to ordinary Chat

**Files:**
- Create: `editor-service/src/tools.js`
- Create: `editor-service/test/tools.test.js`
- Create: `.codex-plugin/plugin.json`
- Modify: `editor-service/src/index.js`

**Interfaces:**
- Produces MCP tools: `get_page`, `preview_change`, `apply_change`, `replace_image`, `get_change_status`, `revert_change`, and `request_production_publish`.

- [ ] **Step 1: Write exact tool-schema tests**

Assert that every schema uses `additionalProperties: false`, requires page number and stable IDs, and exposes no raw path, branch, HTML, CSS, JavaScript, command, token, or secret parameter.

- [ ] **Step 2: Run and verify failure**

Run: `node --test editor-service/test/tools.test.js`

Expected: FAIL because tool definitions do not exist.

- [ ] **Step 3: Implement tool handlers**

Each handler calls the service interfaces from Task 5. `apply_change` accepts only an unexpired `changeToken`; `replace_image` validates MIME type, dimensions, byte limit, declared slot, alt text, and focal-position token; `request_production_publish` records approval but cannot update `main`.

- [ ] **Step 4: Create the private plugin manifest**

Set the plugin name to `Reforming the Soul Editor`, point its MCP server to the Worker URL supplied at deployment, request no unrelated apps, and describe that it performs controlled routine edits only for `teerex-bit/rts-website`.

- [ ] **Step 5: Add conversational response tests**

Verify tool results always include `summary`, `untouched`, `commitSha` when written, `validationState`, and `reviewUrl`; errors use ordinary language suitable for Malea.

- [ ] **Step 6: Run tests and commit**

```bash
npm run test:editor
git add .codex-plugin editor-service
git commit -m "feat: expose private routine editing tools"
```

---

### Task 7: Add review validation and Cloudflare deployment

**Files:**
- Create: `.github/workflows/review-edit.yml`
- Create: `tests/editor/workflow.test.js`

**Interfaces:**
- Consumes: commits to `review` touching declared editable files.
- Produces: passing GitHub check and stable Cloudflare review deployment; failed commits leave previous deployment active.

- [ ] **Step 1: Write workflow structure test**

Parse the YAML and assert branch `review`, Node 24, `npm ci`, all five checks, locked hashes before deployment, Cloudflare deploy after checks, and concurrency cancellation for superseded review builds.

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/editor/workflow.test.js`

Expected: FAIL because the workflow does not exist.

- [ ] **Step 3: Implement the workflow**

Use least-privilege `contents: read` for validation. Deployment uses repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, runs only after all checks pass, and publishes `dist` to the fixed review project. Do not expose secrets to pull requests from forks.

- [ ] **Step 4: Configure protected environments**

Create GitHub environment `review` with Cloudflare secrets and no production credentials. Confirm the token can deploy only the review Worker/Pages resources.

- [ ] **Step 5: Push a no-op test override commit to review**

Expected: validation PASS, 44 routes, locked hashes unchanged, and stable Cloudflare review URL updated.

- [ ] **Step 6: Push an intentionally invalid test branch**

Add a `Walk` stage only on a disposable branch and run the workflow validation job without deployment. Expected: `check:editor` FAIL and no review deployment change. Delete the disposable branch after recording the result.

- [ ] **Step 7: Commit workflow**

```bash
git add .github/workflows/review-edit.yml tests/editor/workflow.test.js
git commit -m "ci: validate and deploy routine review edits"
```

---

### Task 8: Preserve the existing Sites review URL as the permanent viewer

**Files:**
- Create: `src/review-remote.js`
- Modify: `src/pages-01-40-review.js`
- Create: `tests/editor/review-shell.test.js`

**Interfaces:**
- Consumes: fixed HTTPS Cloudflare review origin.
- Produces: existing OpenAI Sites review switcher displaying the latest validated Cloudflare review pages.

- [ ] **Step 1: Write review-shell tests**

Assert 40 ordered page routes, previous/next controls, fixed allowlisted HTTPS origin, no arbitrary URL input, and preservation of the existing review route.

- [ ] **Step 2: Run and verify failure**

Run: `node --test tests/editor/review-shell.test.js`

Expected: FAIL because `src/review-remote.js` does not exist.

- [ ] **Step 3: Implement the remote viewer origin**

Export one constant `REVIEW_ORIGIN` and construct iframe sources with `new URL(page.route, REVIEW_ORIGIN)`. Reject non-HTTPS and any hostname other than the deployed review hostname.

- [ ] **Step 4: Verify embedding**

Deploy Cloudflare headers allowing framing only by the existing `https://reforming-the-soul-review.teerex.chatgpt.site` origin. Test all 40 pages in the switcher on desktop and mobile.

- [ ] **Step 5: Perform the one-time Sites deployment**

Deploy to existing project `appgprj_6a942c28d51c81919b927fc5eef4a46b`. Do not create a new project or change the existing review URL. Confirm the page switcher shows the Cloudflare review build.

- [ ] **Step 6: Run final checks and commit**

```bash
npm run build
npm run check
npm run check:server
npm run check:locked
npm run check:editor
npm run test:editor
git add src/review-remote.js src/pages-01-40-review.js tests/editor/review-shell.test.js
git commit -m "feat: connect existing review viewer to validated builds"
```

---

### Task 9: End-to-end acceptance and guarded rollout

**Files:**
- Create: `docs/rts-chat-editor-operations.md`
- Create: `tests/editor/acceptance.test.js`
- Modify: `AGENTS.md`

**Interfaces:**
- Produces: verified ordinary-Chat editing workflow and documented recovery procedure.

- [ ] **Step 1: Add acceptance harness**

Automate an unlocked heading change, image replacement, locked Page 01 rejection, locked Page 38 rejection, Walk rejection, stale edit conflict, validation failure, status check, and revert.

- [ ] **Step 2: Run the acceptance suite against staging**

Run: `node --test tests/editor/acceptance.test.js`

Expected: all scenarios PASS; successful edits create review commits, rejected scenarios create none, and no Work/Codex task is invoked.

- [ ] **Step 3: Test from an ordinary Chat conversation**

Issue: `Page 3, hero section: change the heading to "Temporary acceptance heading."` Apply, verify the existing review experience, then invoke `revert_change`. Confirm the original heading returns through a new commit.

- [ ] **Step 4: Document the human workflow**

`docs/rts-chat-editor-operations.md` must include the one-sentence request pattern, supported changes, locked-page behavior, approval wording, rollback, credential rotation, outage behavior, and how to disable the plugin without affecting the website.

- [ ] **Step 5: Extend AGENTS.md safeguards**

Add the editor paths, review-only rule, production-approval rule, and requirement that agents preserve override and audit contracts. Do not weaken the existing Page 01/Page 38 locks.

- [ ] **Step 6: Run the complete verification matrix**

```bash
npm ci
npm run build
npm run check
npm run check:server
npm run check:locked
npm run check:editor
npm run test:editor
git diff --check
```

Expected: PASS; build reports 44 routes.

- [ ] **Step 7: Request code review and merge into review first**

Fetch both branches and run `git merge-base --is-ancestor origin/review HEAD`. It must exit zero, proving the implementation includes every current `review` commit. If it fails, stop and reconcile without force pushing. Then open a pull request from `codex/rts-chat-editor` to `review`. Resolve review findings, rerun the full matrix, and merge only after checks pass.

- [ ] **Step 8: Obtain explicit production approval**

After Trey or Malea confirms the complete bridge in ordinary Chat, open a separate promotion pull request from the reconciled `review` branch to `main`. Do not merge without that approval.
