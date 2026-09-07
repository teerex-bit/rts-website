# Reforming the Soul Routine Editing Bridge

**Date:** 2026-09-07  
**Status:** Proposed architecture approved in principle; implementation pending final specification approval

## Purpose

Create a private editing connection that lets Trey and Malea request routine Reforming the Soul website changes from an ordinary ChatGPT Chat conversation without consuming ChatGPT Work or Codex credits. Malea should only need to identify the page number and describe the desired change in ordinary language. She must not need to use GitHub, edit code, run commands, manage files, or understand the website's implementation.

The bridge must preserve the existing website, Git history, page locks, review process, and production safeguards. It is not a general-purpose coding agent and will not perform unrestricted redesigns.

## Authoritative Sources and Non-Negotiable Rules

- GitHub repository `teerex-bit/rts-website` is the authoritative source.
- New work starts from the newest approved commit on `main`, not from an older local checkout or stale `review` branch.
- Routine edits are committed to `review`; production is updated only after explicit approval from Trey or Malea.
- OpenAI Sites project `appgprj_6a942c28d51c81919b927fc5eef4a46b` and the existing private review URL are preserved.
- All 40 pages and 44 generated HTML routes must remain present.
- `done/` images remain visual references and are never substituted for live webpages.
- Page 01 and Page 38 remain locked according to `AGENTS.md`. The bridge rejects changes to locked page files, assets, routes, and styles unless Trey or Malea has explicitly unlocked the relevant page through the controlled approval process.
- The curriculum is always **Awaken → See Clearly → Become → Join**. The bridge rejects any operation that introduces `Walk` as a stage or route.
- Normal text remains live HTML or structured content. Photographs, icons, logos, and other graphics remain independent replaceable assets.

## Scope

### Supported Routine Edits

The bridge supports controlled changes to existing editable page elements:

- headings, paragraphs, labels, quotations, and captions;
- button text and approved internal or external links;
- replacement of an existing image with an attached image;
- image alt text, focal position, and approved crop behavior;
- approved colors through named design tokens;
- spacing through bounded presets such as compact, standard, and spacious;
- alignment through existing supported values;
- showing or hiding an optional existing section;
- reordering existing sections when the page template permits it;
- reverting a previous bridge-created edit.

### Explicitly Unsupported Edits

The bridge does not:

- create a new page template or application feature;
- write arbitrary JavaScript, HTML, CSS, or workflow code;
- redesign an entire page;
- change global navigation structure;
- modify locked pages without explicit unlocking;
- delete routes or reference images;
- publish directly to production;
- bypass failed validation;
- recreate or replace the OpenAI Sites project.

Unsupported requests are returned to Chat with a plain-language explanation that the change requires Work/Codex or a future expansion of the controlled editing system.

## Recommended Architecture

### 1. Structured Editable Content

Existing page content will be normalized gradually into schema-validated page data files. Each editable page record identifies:

- page number and route;
- template and section identifiers;
- editable text fields;
- asset references and alt text;
- permitted section ordering;
- permitted style tokens;
- lock state and approval metadata.

The current renderer remains responsible for producing HTML. The bridge edits only declared fields; it never searches and replaces arbitrary source text. Pages can be migrated incrementally while preserving their generated output.

### 2. Private ChatGPT Plugin

A private Reforming the Soul plugin exposes a small set of purpose-built tools to ordinary ChatGPT Chat. Chat interprets Trey or Malea's request, confirms the resolved page and section when needed, and calls the narrow editing tool.

Initial tools:

- `get_page(page_number)` — returns the current editable section map and review URL.
- `preview_change(page_number, section_id, changes)` — validates a proposed change without writing it.
- `apply_change(change_token, requested_by)` — applies exactly the validated proposal to `review`.
- `replace_image(page_number, section_id, asset, alt_text, focal_position)` — validates and replaces one declared image asset.
- `get_change_status(change_id)` — reports build, validation, and deployment state.
- `revert_change(change_id, requested_by)` — creates a new commit restoring the prior declared values.
- `request_production_publish(change_ids, requested_by)` — records approval but does not bypass the protected production workflow.

Every write tool returns a human-readable summary, Git commit SHA, validation status, and exact review link.

### 3. Editing Service

A small authenticated service sits behind the plugin. A Cloudflare Worker is the preferred host because the domain and Cloudflare account already exist. The service:

- verifies the private plugin identity;
- validates requests against the page schema;
- reads the newest GitHub state before every edit;
- refuses stale writes when the target changed after preview;
- writes the smallest possible GitHub commit to `review`;
- starts or observes the repository validation workflow;
- records an audit entry containing requester, page, section, before/after values, commit, and outcome;
- never stores GitHub credentials in page code or browser-visible content.

GitHub access should use a narrowly scoped GitHub App installation or fine-grained token held only in encrypted Cloudflare secrets. It receives access only to `teerex-bit/rts-website` and only the permissions required to read contents, write the `review` branch, and read workflow results.

### 4. GitHub Validation and Deployment

Each bridge edit produces one commit on `review`. GitHub Actions then:

1. installs pinned dependencies;
2. runs `npm run build`;
3. confirms 44 generated routes;
4. runs `npm run check`;
5. runs `npm run check:server`;
6. verifies Page 01 and Page 38 locked output hashes;
7. verifies that no `Walk` stage or route was introduced;
8. publishes the validated `review` build to the stable Cloudflare review deployment;
9. reports success or failure to the editing service.

Failed builds are never promoted. Git history remains the rollback mechanism, and `revert_change` creates a normal auditable reversal commit rather than rewriting history.

### 5. Existing Review URL

The existing OpenAI Sites URL must not be replaced. Because ordinary Chat cannot redeploy OpenAI Sites without Work/Codex, implementation includes one final controlled Sites update. The existing review interface becomes a permanent review shell whose viewer loads the current validated Cloudflare review deployment.

After that one-time update:

- the user continues opening the same Sites review URL;
- the page switcher remains available;
- routine GitHub edits update the content shown inside the viewer through Cloudflare;
- future routine edits do not require another Sites deployment or Codex credits.

If cross-origin restrictions prevent the embedded viewer, the fallback is a stable redirect from the same Sites review entry URL to a dedicated Cloudflare review subdomain. This fallback requires explicit approval because the final address bar would change after the redirect.

## User Experience

A normal Malea request:

> Page 6, hero section: change the sentence to “…” and move the picture slightly to the right.

The plugin responds with the resolved page and section, previews the exact supported changes, and applies them after ordinary conversational confirmation when the request could affect more than one field. When complete, it returns:

- what changed;
- what remained untouched;
- validation result;
- review link;
- simple instruction: “Tell me if you want another change or want this reverted.”

Malea is never asked for filenames, repository branches, commands, asset paths, or deployment terminology.

## Authorization and Production Safety

- The plugin is private to the ChatGPT account/workspace used by Trey and Malea.
- Only Trey and Malea are recognized design authorities.
- Routine edits may write only to `review`.
- Production publishing requires an explicit, current approval statement identifying the reviewed change or group of changes.
- Page unlocks require explicit approval naming the locked page and requested scope. An unlock is temporary for that approved change and automatically closes afterward.
- The service rejects branch deletion, force pushes, history rewriting, secret changes, workflow changes, and repository administration.

## Concurrency and Stale-Edit Protection

Every preview records the source commit SHA and hashes of the target fields. Before applying, the service reloads GitHub. If another edit changed the target, the write is stopped and Chat explains that the page changed since the preview. Unrelated edits can proceed independently.

The bridge uses one commit per approved routine request. This keeps changes small, reviewable, and easy to revert.

## Image Handling

When Malea attaches a replacement image in Chat, the plugin validates:

- supported file type;
- safe file size and dimensions;
- absence of executable content;
- target page and declared image slot;
- responsive crop/focal settings;
- meaningful alt text or a deliberate decorative designation.

The original asset remains recoverable through Git history. The service uses deterministic filenames based on page and slot, preventing duplicate or ambiguous assets.

## Error Handling

- **Unknown page or section:** show the closest valid page/section choices in ordinary language.
- **Locked target:** refuse the edit and explain that the page is protected.
- **Unsupported redesign:** preserve the request as a clear handoff note for Work/Codex.
- **Validation failure:** do not deploy; return the failed check and preserve the prior review deployment.
- **Deployment delay:** return a pending status and allow Chat to check the same change ID.
- **GitHub conflict:** stop and require a fresh preview; never overwrite newer work.
- **Service outage:** make no repository change and preserve the live review site.

## Testing Strategy

### Service Tests

- authentication and authorization;
- schema validation for each tool;
- lock enforcement;
- stale-edit rejection;
- minimal Git diff creation;
- audit logging;
- secret redaction;
- idempotent status requests;
- safe revert behavior.

### Repository Tests

- existing build, link, asset, fragment, and server checks;
- exactly 40 pages and 44 HTML routes;
- locked output hash comparisons;
- forbidden `Walk` navigation/route scan;
- structured-content schema validation;
- asset-reference validation;
- desktop and mobile smoke checks for edited pages.

### End-to-End Acceptance Tests

1. From ordinary Chat, change one unlocked heading and receive the updated review link.
2. Replace one declared image and verify responsive rendering.
3. Attempt a Page 01 edit and confirm rejection while locked.
4. Attempt to introduce `Walk` and confirm rejection.
5. Submit two simultaneous edits to the same field and confirm stale-write protection.
6. Cause a validation failure and confirm that the prior review deployment remains active.
7. Revert a completed change from Chat and confirm a new audited Git commit.
8. Confirm no Work/Codex task or credits are used during these routine edit operations.

## Cost Boundary

Routine edits use ordinary Chat plus the private plugin, Cloudflare Worker, GitHub API, GitHub Actions, and Cloudflare deployment. They do not invoke Work or Codex. Any applicable hosting, GitHub Actions, ChatGPT plan, or third-party service limits remain separate from Codex credits.

Requests outside the declared tools are not silently sent to a paid coding model. Chat explains that the requested structural work requires a separate decision.

## Delivery Sequence

1. Preserve and tag the current `main` baseline.
2. Reconcile `review` forward from current `main` without losing approved work.
3. Add page-content schemas and lock/output-hash checks without altering generated pages.
4. Add repository validation and Cloudflare review deployment.
5. Build the private editing service and audit log.
6. Build and connect the private ChatGPT plugin.
7. Run end-to-end acceptance tests using unlocked test content.
8. Perform the one-time existing Sites review-shell update.
9. Confirm that subsequent routine edits work from ordinary Chat without Work/Codex usage.

## Success Criteria

The project is complete when Malea can start an ordinary ChatGPT Chat, identify an unlocked page number and section, request a supported routine change, receive the updated existing review experience, and revert the change if desired—without using GitHub, commands, code, Work, or Codex credits, and without risking locked pages or production.
