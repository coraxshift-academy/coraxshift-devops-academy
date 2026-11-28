// Three tests that need no dependencies. Run with: node --test tests/
import { test, before, after } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3457;
let child;

before(async () => {
  child = spawn('node', [path.join(__dirname, '..', 'api', 'server.js')], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore',
  });
  await new Promise((r) => setTimeout(r, 800));
});

after(() => child && child.kill());

test('GET /health returns 200 and status ok', async () => {
  const res = await fetch(`http://127.0.0.1:${PORT}/health`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.status, 'ok');
  assert.strictEqual(body.service, 'automarket-api');
});

test('GET /metrics exposes counters in Prometheus format', async () => {
  const res = await fetch(`http://127.0.0.1:${PORT}/metrics`);
  assert.strictEqual(res.status, 200);
  const text = await res.text();
  assert.match(text, /app_uptime_seconds \d+/);
  assert.match(text, /app_requests_total \d+/);
});

test('GET /api/cars filters by make', async () => {
  const all = await (await fetch(`http://127.0.0.1:${PORT}/api/cars`)).json();
  assert.strictEqual(all.length, 4);
  const tesla = await (await fetch(`http://127.0.0.1:${PORT}/api/cars?make=tesla`)).json();
  assert.strictEqual(tesla.length, 1);
  assert.strictEqual(tesla[0].model, 'Model 3');
});
