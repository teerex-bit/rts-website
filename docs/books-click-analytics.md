# Books click counts

The public Books page records clicks on the available PDF and Lulu buttons in the Cloudflare Workers Analytics Engine dataset `books_clicks`.

Events contain only the catalog book ID and action (`pdf` or `purchase`). They do not include visitor identifiers, IP addresses, or payment data. A click means the visitor selected the button; it does not prove a PDF finished downloading or a Lulu purchase completed.

Cloudflare creates the dataset automatically after the first event is written. Data retention is currently three months.

## Query the last 30 days

Create a Cloudflare API token with **Account Analytics Read** permission. Then run this query against the Analytics Engine SQL API, using the account ID and token from Cloudflare:

```sql
SELECT
  blob1 AS book_id,
  blob2 AS action,
  SUM(_sample_interval * double1) AS clicks
FROM books_clicks
WHERE timestamp >= NOW() - INTERVAL '30' DAY
GROUP BY book_id, action
ORDER BY clicks DESC
```

The returned rows separate PDF opens from Lulu product-page visits for each title.

Cloudflare documentation:
- [Workers Analytics Engine SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/)
- [Workers Analytics Engine pricing](https://developers.cloudflare.com/analytics/analytics-engine/pricing/)
