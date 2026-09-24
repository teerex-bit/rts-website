# Cloudflare Read-only Audit (Filtered)

Generated: `2026-09-24T15:34:05.715111+00:00`
Zone: `reformingthesoul.com`

This report contains only website-relevant metadata. No Cloudflare resource was modified.

## Relevant DNS

API success: **True**

```json
[
  {
    "comment": null,
    "content": "rts-overview-review.pages.dev",
    "name": "review.reformingthesoul.com",
    "proxied": true,
    "tags": [],
    "ttl": 1,
    "type": "CNAME"
  },
  {
    "comment": null,
    "content": "aspmx.l.google.com",
    "name": "reformingthesoul.com",
    "proxied": false,
    "tags": [],
    "ttl": 1,
    "type": "MX"
  },
  {
    "comment": null,
    "content": "alt1.aspmx.l.google.com",
    "name": "reformingthesoul.com",
    "proxied": false,
    "tags": [],
    "ttl": 1,
    "type": "MX"
  },
  {
    "comment": null,
    "content": "alt3.aspmx.l.google.com",
    "name": "reformingthesoul.com",
    "proxied": false,
    "tags": [],
    "ttl": 1,
    "type": "MX"
  },
  {
    "comment": null,
    "content": "alt4.aspmx.l.google.com",
    "name": "reformingthesoul.com",
    "proxied": false,
    "tags": [],
    "ttl": 1,
    "type": "MX"
  },
  {
    "comment": null,
    "content": "alt2.aspmx.l.google.com",
    "name": "reformingthesoul.com",
    "proxied": false,
    "tags": [],
    "ttl": 1,
    "type": "MX"
  },
  {
    "comment": null,
    "content": "\"v=spf1 include:dc-aa8e722993._spfm.reformingthesoul.com ~all\"",
    "name": "reformingthesoul.com",
    "proxied": false,
    "tags": [],
    "ttl": 1,
    "type": "TXT"
  },
  {
    "comment": null,
    "content": "\"google-site-verification=HPMrkK48CmJux3B2VoFuFZOagRvjm4fuZBbv3ZEIYGc\"",
    "name": "reformingthesoul.com",
    "proxied": false,
    "tags": [],
    "ttl": 1,
    "type": "TXT"
  },
  {
    "comment": null,
    "content": "100::",
    "name": "reformingthesoul.com",
    "proxied": true,
    "tags": [],
    "ttl": 1,
    "type": "AAAA"
  },
  {
    "comment": null,
    "content": "100::",
    "name": "www.reformingthesoul.com",
    "proxied": true,
    "tags": [],
    "ttl": 1,
    "type": "AAAA"
  }
]
```

## Relevant Worker routes

API success: **True**

```json
[]
```

## Relevant Worker custom domains

API success: **True**

```json
[
  {
    "environment": "production",
    "hostname": "reformingthesoul.com",
    "service": "rts-website",
    "zone_name": "reformingthesoul.com"
  },
  {
    "environment": "production",
    "hostname": "www.reformingthesoul.com",
    "service": "rts-website",
    "zone_name": "reformingthesoul.com"
  }
]
```

## Relevant Workers

API success: **True**

```json
[
  {
    "compatibility_date": "2026-08-23",
    "created_on": "2026-08-24T04:00:49.792981Z",
    "handlers": [
      "fetch"
    ],
    "id": "reforming-the-soul",
    "last_deployed_from": "",
    "modified_on": "2026-09-24T15:05:14.543203Z",
    "recent_deployments": [
      {
        "created_on": "2026-09-24T15:05:13.537188Z",
        "id": "623225f9-b5f3-4847-83b2-a336614039d4",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-08-28T01:44:35.830341Z",
        "id": "e87fa4a3-6963-4ddc-aeda-3fdf54b1363d",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-08-24T05:47:42.301201Z",
        "id": "03b388cb-1f91-42c2-8fc2-0c17def00eee",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-08-24T05:26:01.295319Z",
        "id": "7084ddbe-4e68-4717-aa99-021843e482b1",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-08-24T04:37:34.643336Z",
        "id": "61ccd390-f5db-4678-9c1a-c47d1f7291ae",
        "source": "wrangler",
        "strategy": "percentage"
      }
    ],
    "settings": {
      "bindings": [],
      "compatibility_date": "2026-08-23",
      "compatibility_flags": [],
      "logpush": false,
      "tail_consumers": [],
      "usage_model": "standard"
    },
    "usage_model": "standard"
  },
  {
    "compatibility_date": "2026-08-30",
    "created_on": "2026-09-23T20:21:32.428412Z",
    "handlers": [
      "fetch"
    ],
    "id": "reforming-the-soul-production",
    "last_deployed_from": "",
    "modified_on": "2026-09-23T20:22:08.959748Z",
    "recent_deployments": [
      {
        "created_on": "2026-09-23T20:22:08.428128Z",
        "id": "82752bed-5a12-44f9-8708-96db8edb7062",
        "source": "wrangler",
        "strategy": "percentage"
      }
    ],
    "settings": {
      "bindings": [],
      "compatibility_date": "2026-08-30",
      "compatibility_flags": [],
      "logpush": false,
      "tail_consumers": [],
      "usage_model": "standard"
    },
    "usage_model": "standard"
  },
  {
    "compatibility_date": "2026-08-30",
    "created_on": "2026-09-03T03:19:09.833768Z",
    "handlers": [
      "fetch"
    ],
    "id": "reforming-the-soul-review",
    "last_deployed_from": "",
    "modified_on": "2026-09-24T14:52:39.032329Z",
    "recent_deployments": [
      {
        "created_on": "2026-09-24T02:27:07.567245Z",
        "id": "6e9fc847-a09b-4c4b-baa4-cdc28f370806",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T02:25:54.101023Z",
        "id": "804d0e7e-6656-401f-9db8-0bebfd751e0d",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T02:03:22.219935Z",
        "id": "2f5f0575-c0a4-4969-a81e-9056b38515f6",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T01:26:38.461816Z",
        "id": "efd883ff-d18a-42b2-8494-b549229bec9d",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T01:20:02.217491Z",
        "id": "77a4b678-2452-4fe1-a6f6-c0eaee8d5e92",
        "source": "wrangler",
        "strategy": "percentage"
      }
    ],
    "settings": {
      "bindings": [],
      "compatibility_date": "2026-08-30",
      "compatibility_flags": [],
      "logpush": false,
      "tail_consumers": [],
      "usage_model": "standard"
    },
    "usage_model": "standard"
  },
  {
    "compatibility_date": "2026-08-30",
    "created_on": "2026-09-07T20:45:29.636885Z",
    "handlers": [
      "fetch"
    ],
    "id": "rts-editor-review",
    "last_deployed_from": "",
    "modified_on": "2026-09-07T20:58:01.428646Z",
    "recent_deployments": [
      {
        "created_on": "2026-09-07T20:58:00.28575Z",
        "id": "0c566133-324e-490b-92a1-e41e0c64ab3c",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-07T20:45:36.401375Z",
        "id": "8a53a77f-2b78-4bec-bac8-d423d3e891de",
        "source": "wrangler",
        "strategy": "percentage"
      }
    ],
    "settings": {
      "bindings": [],
      "compatibility_date": "2026-08-30",
      "compatibility_flags": [],
      "logpush": false,
      "tail_consumers": [],
      "usage_model": "standard"
    },
    "usage_model": "standard"
  },
  {
    "compatibility_date": "2026-09-19",
    "created_on": "2026-09-19T19:40:50.942557Z",
    "handlers": [
      "fetch"
    ],
    "id": "rts-overview-review",
    "last_deployed_from": "",
    "modified_on": "2026-09-19T19:41:29.943471Z",
    "recent_deployments": [
      {
        "created_on": "2026-09-19T19:40:54.566937Z",
        "id": "74417de9-0f7c-4546-a3d7-8584b63bb621",
        "source": "dash",
        "strategy": "percentage"
      }
    ],
    "settings": {
      "bindings": [],
      "compatibility_date": "2026-09-19",
      "compatibility_flags": [],
      "logpush": false,
      "tail_consumers": [],
      "usage_model": "standard"
    },
    "usage_model": "standard"
  },
  {
    "compatibility_date": "2026-09-07",
    "compatibility_flags": [
      "nodejs_compat"
    ],
    "created_on": "2026-09-07T20:10:50.616229Z",
    "handlers": [
      "fetch",
      "purgeExpiredData"
    ],
    "id": "rts-private-editor",
    "last_deployed_from": "wrangler",
    "modified_on": "2026-09-07T22:50:49.786994Z",
    "recent_deployments": [
      {
        "created_on": "2026-09-07T22:50:49.786994Z",
        "id": "6c8c29bf-2b38-40eb-97cb-5d231255ef15",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-07T22:50:47.123431Z",
        "id": "22d9193d-7254-4e30-b602-55ad2b9466bd",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-07T22:43:51.520655Z",
        "id": "94e545e6-a678-4637-9398-b6ede3c906e2",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-07T22:43:49.097756Z",
        "id": "c7be99e9-1155-4b0d-8fa8-d7313b17e0c0",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-07T22:43:31.704623Z",
        "id": "d234f44e-ef99-4885-928e-4e8d8ba0fba5",
        "source": "wrangler",
        "strategy": "percentage"
      }
    ],
    "settings": {
      "bindings": [
        {
          "name": "CHANGE_TOKEN_SECRET",
          "type": "secret_text"
        },
        {
          "name": "EDITOR_WRITES_ENABLED",
          "type": "plain_text"
        },
        {
          "name": "OAUTH_KV",
          "namespace_id": "b45f1f88045b4df38dd7d6bf792806cc",
          "type": "kv_namespace"
        },
        {
          "name": "OPENAI_API_KEY",
          "type": "secret_text"
        },
        {
          "name": "RTS_APP_ID",
          "type": "secret_text"
        },
        {
          "name": "RTS_APP_PRIVATE_KEY",
          "type": "secret_text"
        },
        {
          "name": "RTS_OAUTH_CLIENT_ID",
          "type": "secret_text"
        },
        {
          "name": "RTS_OAUTH_CLIENT_SECRET",
          "type": "secret_text"
        },
        {
          "name": "VISUAL_MODEL",
          "type": "plain_text"
        }
      ],
      "compatibility_date": "2026-09-07",
      "compatibility_flags": [
        "nodejs_compat"
      ],
      "logpush": false,
      "tail_consumers": [],
      "usage_model": "standard"
    },
    "usage_model": "standard"
  },
  {
    "compatibility_date": "2026-08-30",
    "created_on": "2026-09-23T19:21:09.03786Z",
    "handlers": [
      "fetch"
    ],
    "id": "rts-website",
    "last_deployed_from": "",
    "modified_on": "2026-09-24T13:24:28.831162Z",
    "recent_deployments": [
      {
        "created_on": "2026-09-24T13:24:27.522433Z",
        "id": "35235a84-71d3-497c-acdf-70bb2095200f",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T12:40:12.946881Z",
        "id": "40ef1d9d-76f6-4a93-88bf-2ee4eb9f3fb5",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T11:06:55.628495Z",
        "id": "556ef2dd-50f3-4321-b396-1666a8e266e5",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T03:30:14.743594Z",
        "id": "1c03b0ee-ad9a-4339-9bdf-344d497bf554",
        "source": "wrangler",
        "strategy": "percentage"
      },
      {
        "created_on": "2026-09-24T02:27:35.03508Z",
        "id": "e567029b-a903-46e2-9a4a-08990334173a",
        "source": "wrangler",
        "strategy": "percentage"
      }
    ],
    "settings": {
      "bindings": [],
      "compatibility_date": "2026-08-30",
      "compatibility_flags": [],
      "logpush": false,
      "tail_consumers": [],
      "usage_model": "standard"
    },
    "usage_model": "standard"
  }
]
```

## Relevant Pages projects

API success: **False**

```json
[]
```

Errors: `Invalid list options provided. Review the `page` or `per_page` parameter.`
