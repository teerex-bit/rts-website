import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import worker from "../src/worker.js";

const catalogPath = fileURLToPath(new URL("../public/books/catalog.json", import.meta.url));
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const endpoint = "https://reformingthesoul.com/api/books/click";

function makeEnv(writeDataPoint = () => {}) {
  return {
    ASSETS: { fetch: async request => new Response(`asset:${new URL(request.url).pathname}`) },
    BOOK_CLICKS: { writeDataPoint },
  };
}

function eventRequest(event) {
  return new Request(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
}

test("catalog contains 26 distinct active books", () => {
  assert.equal(catalog.length, 26);
  assert.equal(new Set(catalog.map(book => book.id)).size, 26);
});

for (const book of catalog) {
  for (const action of ["pdf", "purchase"]) {
    test(`records ${action} clicks for ${book.id}`, async () => {
      const points = [];
      const response = await worker.fetch(
        eventRequest({ bookId: book.id, action }),
        makeEnv(point => points.push(point)),
      );
      assert.equal(response.status, 204);
      assert.deepEqual(points, [{
        blobs: [book.id, action],
        doubles: [1],
        indexes: [book.id],
      }]);
    });
  }
}

test("rejects non-POST requests on the event endpoint", async () => {
  const response = await worker.fetch(new Request(endpoint), makeEnv());
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "POST");
});

test("rejects unknown books and actions without recording events", async () => {
  let writes = 0;
  const env = makeEnv(() => writes++);
  for (const body of [
    { bookId: "not-a-book", action: "pdf" },
    { bookId: catalog[0].id, action: "checkout" },
  ]) {
    const response = await worker.fetch(eventRequest(body), env);
    assert.equal(response.status, 400);
  }
  assert.equal(writes, 0);
});

test("rejects malformed and oversized payloads", async () => {
  const malformed = await worker.fetch(new Request(endpoint, {
    method: "POST",
    body: "{",
  }), makeEnv());
  assert.equal(malformed.status, 400);

  const oversized = await worker.fetch(new Request(endpoint, {
    method: "POST",
    body: "x".repeat(300),
  }), makeEnv());
  assert.equal(oversized.status, 413);
});

test("keeps static assets on the asset binding", async () => {
  const response = await worker.fetch(new Request("https://reformingthesoul.com/books/"), makeEnv());
  assert.equal(await response.text(), "asset:/books/");
});

test("accepts an event when analytics is not configured", async () => {
  const env = makeEnv();
  delete env.BOOK_CLICKS;
  const response = await worker.fetch(
    eventRequest({ bookId: catalog[0].id, action: "pdf" }),
    env,
  );
  assert.equal(response.status, 204);
});

test("accepts an event if analytics cannot record it", async () => {
  const response = await worker.fetch(
    eventRequest({ bookId: catalog[0].id, action: "pdf" }),
    makeEnv(() => { throw new Error("binding failure"); }),
  );
  assert.equal(response.status, 204);
});
