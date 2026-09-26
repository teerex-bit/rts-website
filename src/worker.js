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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
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
    if (!env.BOOK_CLICKS) return response("Analytics unavailable", 503);

    try {
      env.BOOK_CLICKS.writeDataPoint({
        blobs: [event.bookId, event.action],
        doubles: [1],
        indexes: [event.bookId],
      });
    } catch {
      console.error("Books click analytics write failed");
      return response("Analytics unavailable", 503);
    }
    return response(null, 204);
  },
};
