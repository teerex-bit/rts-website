# Connected Deep Dive reflections implementation plan

Goal: Carry one optional personal situation through Awaken, See Clearly, Become and Join, with standalone prompts when earlier answers are absent.

Architecture: Preserve the static 25-screen HTML, CSS and vanilla-JavaScript journey. Add four keyed local reflections and render existing answers as plain text. Preserve current-screen resume and migrate the previous single field to See Clearly.

Approved design: Four pauses and a conditional final summary approved in conversation, including the correction that absent answers must never be referenced.

- [x] Test absent, partial, edited, deleted, migrated, malicious-text and unavailable-storage behavior before implementation.
- [x] Add four labeled optional fields at screens 3, 7, 16, 22; a short non-writing return at screen 9; a conditional summary at screen 23.
- [x] Store keyed answers and current page in the existing browser-local record; no network requests for personal responses.
- [x] Verify screen/answer restoration on return and preserve previous See Clearly content.
- [x] Independent code review, nine focused reflection tests and all 127 existing website tests.
- [ ] Verify deployment success and exact live file contents.

Production files: public/deepdive/index.html, deepdive.js, deepdive.css. Reuse established typography, colors, fields and separators; preserve photographs, Scripture, examples, navigation and unlisted access.

Validation: with jsdom available, run `RTS_JSDOM_MODULE=/absolute/path/to/jsdom node --test validation/deepdive-reflections.cjs`. This is a development-only dependency; production remains static HTML, CSS and vanilla JavaScript. Tests cover blank/skipped/partial answers, safe text, legacy migration, storage failure, resume, labels and edit navigation.
