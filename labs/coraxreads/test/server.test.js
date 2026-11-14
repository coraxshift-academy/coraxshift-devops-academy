"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createApp } = require("../server");

async function startTestServer(pool, testContext) {
  const server = createApp(pool).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  testContext.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test("health endpoint reports ready when database responds", async (t) => {
  const pool = { query: async () => ({ rows: [{ "?column?": 1 }] }) };
  const baseUrl = await startTestServer(pool, t);

  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("health endpoint reports unavailable when database is down", async (t) => {
  const pool = { query: async () => { throw Object.assign(new Error("offline"), { code: "08006" }); } };
  const baseUrl = await startTestServer(pool, t);

  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "unavailable" });
});

test("book endpoint returns catalog rows", async (t) => {
  const books = [{ id: 1, title: "The Little Bookshop", author: "A. Reader", price_cents: 1299 }];
  const pool = { query: async () => ({ rows: books }) };
  const baseUrl = await startTestServer(pool, t);

  const response = await fetch(`${baseUrl}/api/books`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), books);
});
