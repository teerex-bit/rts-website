import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("public site requires browser revalidation for HTML and mutable assets", async () => {
  const headers = await readFile(new URL("../public/_headers", import.meta.url), "utf8");

  assert.match(headers, /\/\*\s+[\s\S]*Cache-Control: no-cache, max-age=0, must-revalidate/);
  assert.match(headers, /\/\*\.html\s+[\s\S]*Cache-Control: no-cache, max-age=0, must-revalidate/);
  assert.match(headers, /\/assets\/\*\s+[\s\S]*Cache-Control: no-cache, max-age=0, must-revalidate/);
  assert.match(headers, /\/become\/\*\.css\s+[\s\S]*Cache-Control: no-cache, max-age=0, must-revalidate/);
  assert.match(headers, /\/join\/\*\.css\s+[\s\S]*Cache-Control: no-cache, max-age=0, must-revalidate/);
  assert.match(headers, /\/see-clearly\/\*\.css\s+[\s\S]*Cache-Control: no-cache, max-age=0, must-revalidate/);
});
