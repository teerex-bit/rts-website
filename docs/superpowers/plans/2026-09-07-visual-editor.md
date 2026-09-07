# Visual Editor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let ordinary Chat route visual page-edit requests through the private editor using the approved reference image, while writing only review changes after explicit approval.

**Architecture:** The private Cloudflare Worker receives an authenticated visual-edit request, loads the approved `done/` reference and page field registry, and uses the protected OpenAI API key to make a constrained proposal. The proposal may only select declared editable fields and existing project assets; unsupported structural work returns an explicit review request rather than changing a page. Production and locked pages remain unreachable.

**Tech Stack:** Cloudflare Workers, MCP, GitHub App API, OpenAI Responses API, Node tests.

## Global Constraints

- Never modify Page 01, Page 38, production, or the stage names Awaken → See Clearly → Become → Join.
- Never use a `done/` screenshot as a website asset.
- Use only review-branch commits and existing `/assets/` paths for routine visual edits.
- Each proposal requires ordinary Chat approval before `apply_change` can save it.
- Cap model input and output; do not log the API key or reference image bytes.

### Task 1: Visual proposal boundary

**Files:**
- Create: `editor-service/src/visual.js`
- Test: `editor-service/test/visual.test.js`

- [ ] Write a failing test proving locked pages are rejected before any model request.
- [ ] Write a failing test proving an allowed request returns only declared fields and `/assets/` image values.
- [ ] Implement the validator and response parser.
- [ ] Run `node --test editor-service/test/visual.test.js` until green.

### Task 2: Private MCP tool

**Files:**
- Modify: `editor-service/src/index.mjs`
- Test: `editor-service/test/visual.test.js`

- [ ] Add a read-only `plan_visual_change` tool that accepts a page number and short request.
- [ ] Load the approved reference, field registry, and review snapshot; pass only bounded context to the planner.
- [ ] Return a human-readable review proposal and structured candidate edit; never save from this tool.
- [ ] Run the editor test suite.

### Task 3: Deployment and proof

**Files:**
- Modify: `editor-service/deploy.mjs`
- Modify: `.github/workflows/editor-service.yml`
- Test: existing editor tests and build checks

- [ ] Deploy the OpenAI API key only through Cloudflare Worker secrets.
- [ ] Run `npm run test:editor`, `npm run build`, and `npm run check:locked`.
- [ ] Deploy the private editor, verify anonymous access remains denied, then perform one ordinary-Chat visual proposal and approved review-only save.
