# Deep Dive analytics — operations note

Last updated: 2026-11-08

## Links
- Private dashboard: https://www.reformingthesoul.com/internal/deepdive-analytics
- Public Deep Dive: https://www.reformingthesoul.com/deepdive/
- Cloudflare: https://dash.cloudflare.com/ (Workers & Pages → rts-website; Analytics Engine → rts_deepdive_events)
- Source repository: https://github.com/teerex-bit/rts-website

## Current setup
- Production Worker: `rts-website`.
- Dataset: `rts_deepdive_events`.
- Analytics Engine binding: `DEEPDIVE_EVENTS` (verified in Cloudflare production settings).
- Browser sends anonymous milestones to `POST /api/deepdive/event`: `start`, `awaken`, `see-clearly`, `become`, `join`, `complete`.
- Milestones are deduplicated per browser-tab session, not unique people. No reflection text or personal identifiers are sent.
- Cloudflare Studio query confirmed recorded `awaken` and `see-clearly` events on November 5, 2026.
- Private dashboard code committed November 5, 2026 (Worker code and Wrangler route). The live dashboard has not been verified fully functional.

## Dashboard access
- URL: https://www.reformingthesoul.com/internal/deepdive-analytics
- HTTP Basic username: `rts`.
- Password is a Cloudflare production secret named `RTS_ANALYTICS_PASSWORD`, confirmed configured November 8, 2026. **Never put its value in source control or this document.**
- Dashboard supports 7-day and 30-day milestone counts.

## Pending before dashboard can display data
1. Confirm dashboard route deployed and login works.
2. Configure `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_ANALYTICS_TOKEN` as production secrets for the dashboard's server-side Analytics Engine SQL query. The token should have the minimum required read/query permission. Never commit values.
3. Verify authenticated dashboard loads real counts; check errors and API response shape if it does not.
4. Do not assume completion-rate figures represent unique users; these are milestone events.

## SQL sanity check (Analytics Engine Studio)
```sql
SELECT blob1 AS stage, COUNT() AS events
FROM rts_deepdive_events
WHERE timestamp >= NOW() - INTERVAL '7' DAY
GROUP BY blob1
ORDER BY events DESC
```

## Source locations
- `src/worker.js`: event receiver and private dashboard/API.
- `public/deepdive/deepdive.js`: milestone dispatch.
- `wrangler.jsonc`: Analytics Engine binding and Worker-first routes.

This note tracks the analytics work; other website deployment and recovery details may be in the separate RTS website cheat sheet.
