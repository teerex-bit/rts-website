# Reforming the Soul

An editable, responsive static website for the first four approved Reforming the Soul experiences.

## Local preview

```sh
python3 -m http.server 8788 --directory public
```

Open <http://localhost:8788/review/> for the private development review hub.

## Deploy

Cloudflare Workers Static Assets serves `public/`; no build step is required.

```sh
npx wrangler deploy --dry-run
```

The temporary booking destination is defined once as `BOOKING_URL` in `public/assets/js/page-interactions.js`.
