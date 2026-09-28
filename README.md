# Reforming the Soul

An editable, responsive static website for Reforming the Soul's Formation journey and supporting resources.

## Local preview

```sh
python3 -m http.server 8788 --directory public
```

Open <http://localhost:8788/> for the home page. Public routes use their directory paths, such as `/formation/`, `/conversations/`, and `/music/`.

## Deploy

Cloudflare Workers Static Assets serves `public/`; no build step is required.

```sh
npx wrangler deploy --dry-run
```

The public booking link is currently present in the Conversations and Contact page HTML. Update both pages together if that destination changes.
