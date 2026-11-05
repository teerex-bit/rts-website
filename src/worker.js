const CLICK_ENDPOINT = "/api/books/click";
const MAX_BODY_BYTES = 256;
const ALLOWED_ACTIONS = new Set(["pdf", "purchase"]);
const ALLOWED_BOOKS = new Set([
  "the-ache",
  "am-i-a-bad-god",
  "the-awakening",
  "god-s-will-my-way",
  "jesus-wants-to-kill-you",
  "the-journey-home",
  "the-path",
  "the-sanctification-cycle",
  "the-signposts-of-sin",
  "the-soldiers-path",
  "the-step",
  "surely-this-was",
  "thy-kingdom-come",
  "the-unseen-dominion",
  "de-moral-ized",
  "mis-align-ment",
  "pre-form-ing",
  "the-scandal-of-dominion",
  "the-scandal-of-peace",
  "the-scandal-of-love",
  "the-scandal-of-choice",
  "the-scandal-of-grace",
  "the-identity-trap",
  "the-what-if-trap",
  "the-pride-trap",
  "the-comparison-trap",
]);

function response(body, status, headers = {}) {
  return new Response(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

async function readSmallBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new RangeError("request body too large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}


const DASHBOARD_PATH = "/internal/deepdive-analytics";
const STAGES = ["start", "awaken", "see-clearly", "become", "join", "complete"];
function dashboardAuthorized(request, env) {
  const supplied = request.headers.get("Authorization") || "";
  if (!env.RTS_ANALYTICS_PASSWORD || !supplied.startsWith("Basic ")) return false;
  try {
    const decoded = atob(supplied.slice(6));
    const separator = decoded.indexOf(":");
    const user = decoded.slice(0, separator);
    const pass = decoded.slice(separator + 1);
    // Authentication is only enabled after the secret is configured.
    return separator >= 0 && user === "rts" && pass === env.RTS_ANALYTICS_PASSWORD;
  } catch { return false; }
}
function dashboardPage() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>RTS · Deep Dive engagement</title><style>
:root{color-scheme:light}body{font:16px/1.5 system-ui,-apple-system,sans-serif;background:#f7f6f2;color:#25342e;margin:0}
main{max-width:860px;margin:48px auto;padding:0 22px}h1{font-size:clamp(26px,4vw,38px);margin:0 0 6px}p{color:#526057}
header{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}select,button{font:inherit;padding:9px 12px;border:1px solid #bcc9c0;border-radius:8px;background:white;color:#25342e}
section{background:white;border:1px solid #e0e6df;border-radius:14px;padding:24px;margin-top:24px}
.stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.stat{background:#f7f9f6;border-radius:10px;padding:16px}.stat strong{display:block;font-size:32px}.stat span{font-size:14px;color:#526057}
.item{margin:17px 0}.line{display:flex;justify-content:space-between;gap:12px}.track{height:12px;background:#e9eee9;border-radius:8px;overflow:hidden;margin-top:7px}.fill{height:100%;background:#5e846e;border-radius:8px;width:0}
small{color:#64716a}#error{color:#9b352c}</style></head><body><main>
<header><div><h1>Deep Dive engagement</h1><p>Reforming the Soul · Anonymous milestone events</p></div>
<label>Period <select id="days"><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></label></header>
<section><div class="stats"><div class="stat"><strong id="started">—</strong><span>Starts recorded</span></div><div class="stat"><strong id="finished">—</strong><span>Completions recorded</span></div></div>
<h2>Journey milestones</h2><div id="stages">Loading…</div><p id="error" role="alert"></p>
<small>Counts are milestone events, not unique people. Tracking began in November 2026. Earlier activity is not included.</small></section>
</main><script>
const labels={"start":"Start","awaken":"Awaken","see-clearly":"See Clearly","become":"Become","join":"Join","complete":"Completion"};
async function load(){const root=document.getElementById("stages");root.textContent="Loading…";document.getElementById("error").textContent="";
try{const res=await fetch("/internal/deepdive-analytics/data?days="+document.getElementById("days").value,{cache:"no-store"});
if(!res.ok)throw Error("Data unavailable ("+res.status+"). Check analytics credentials.");
const data=await res.json();const counts=Object.fromEntries(data.rows.map(r=>[r.stage,Number(r.events)]));const base=counts.start||0;
document.getElementById("started").textContent=base.toLocaleString();document.getElementById("finished").textContent=(counts.complete||0).toLocaleString();
root.replaceChildren();Object.entries(labels).forEach(([key,label])=>{const n=counts[key]||0;const item=document.createElement("div");item.className="item";
const line=document.createElement("div");line.className="line";const name=document.createElement("span");name.textContent=label;const count=document.createElement("strong");count.textContent=n.toLocaleString();line.append(name,count);
const track=document.createElement("div");track.className="track";const fill=document.createElement("div");fill.className="fill";fill.style.width=(base?Math.min(100,100*n/base):0)+"%";track.append(fill);item.append(line,track);root.append(item);});
}catch(e){root.textContent="";document.getElementById("error").textContent=e.message;}}
document.getElementById("days").addEventListener("change",load);load();
</script></body></html>`;
}
async function dashboardData(request, env) {
  if (!env.CLOUDFLARE_ANALYTICS_TOKEN || !env.CLOUDFLARE_ACCOUNT_ID) {
    return response(JSON.stringify({ error: "Analytics credentials not configured" }), 503, { "Content-Type": "application/json" });
  }
  const days = new URL(request.url).searchParams.get("days") === "30" ? 30 : 7;
  const sql = `SELECT blob1 AS stage, COUNT() AS events FROM rts_deepdive_events WHERE timestamp >= NOW() - INTERVAL '${days}' DAY GROUP BY blob1`;
  try {
    const result = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/analytics_engine/sql`, {
      method: "POST", headers: { "Authorization": `Bearer ${env.CLOUDFLARE_ANALYTICS_TOKEN}`, "Content-Type": "text/plain" }, body: sql
    });
    if (!result.ok) return response(JSON.stringify({ error: "Analytics query failed" }), 502, { "Content-Type": "application/json" });
    const payload = await result.json();
    const rows = (Array.isArray(payload) ? payload : payload.data || payload.result?.data || [])
      .filter(row => STAGES.includes(row.stage)).map(row => ({ stage: row.stage, events: Number(row.events) || 0 }));
    return response(JSON.stringify({ rows }), 200, { "Content-Type": "application/json" });
  } catch {
    return response(JSON.stringify({ error: "Analytics query unavailable" }), 502, { "Content-Type": "application/json" });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === DASHBOARD_PATH || url.pathname === DASHBOARD_PATH + "/data") {
      if (!dashboardAuthorized(request, env)) return response("Authentication required", 401, { "WWW-Authenticate": 'Basic realm="RTS Analytics"', "Content-Type": "text/plain" });
      if (request.method !== "GET") return response("Method not allowed", 405, { Allow: "GET" });
      if (url.pathname.endsWith("/data")) return dashboardData(request, env);
      return response(dashboardPage(), 200, { "Content-Type": "text/html; charset=utf-8", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer", "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'" });
    }
    if (url.pathname === "/api/deepdive/event") {
      if (request.method !== "POST") return response("Method not allowed", 405, { Allow: "POST" });
      if (Number(request.headers.get("Content-Length") || 0) > MAX_BODY_BYTES) return response("Payload too large", 413);
      const origin = request.headers.get("Origin");
      if (origin && new URL(origin).host !== url.host) return response("Forbidden", 403);
      let event;
      try { event = JSON.parse(await readSmallBody(request)); }
      catch (error) { return response("Invalid event", error instanceof RangeError ? 413 : 400); }
      const stages = new Set(["start", "awaken", "see-clearly", "become", "join", "complete"]);
      if (!event || !stages.has(event.stage)) return response("Invalid stage", 400);
      if (env.DEEPDIVE_EVENTS) {
        try {
          env.DEEPDIVE_EVENTS.writeDataPoint({ blobs: [event.stage], doubles: [1], indexes: ["deepdive"] });
        } catch { console.error("Deep Dive analytics write failed"); }
      }
      return response(null, 204);
    }
    if (url.pathname !== CLICK_ENDPOINT) return env.ASSETS.fetch(request);
    if (request.method !== "POST") {
      return response("Method not allowed", 405, { Allow: "POST" });
    }
    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > MAX_BODY_BYTES) return response("Payload too large", 413);

    let event;
    try {
      event = JSON.parse(await readSmallBody(request));
    } catch (error) {
      if (error instanceof RangeError) return response("Payload too large", 413);
      return response("Invalid event", 400);
    }
    if (
      !event ||
      typeof event !== "object" ||
      !ALLOWED_BOOKS.has(event.bookId) ||
      !ALLOWED_ACTIONS.has(event.action)
    ) {
      return response("Invalid event", 400);
    }
    // Analytics are optional: book links must continue working when the
    // account has not enabled Analytics Engine or a write fails.
    if (!env.BOOK_CLICKS) return response(null, 204);

    try {
      env.BOOK_CLICKS.writeDataPoint({
        blobs: [event.bookId, event.action],
        doubles: [1],
        indexes: [event.bookId],
      });
    } catch {
      console.error("Books click analytics write failed");
      return response(null, 204);
    }
    return response(null, 204);
  },
};
