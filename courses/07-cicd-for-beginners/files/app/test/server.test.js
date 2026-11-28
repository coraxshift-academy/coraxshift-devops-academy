// Two tests. If either fails, the pipeline must stop. That is the point of CI.
const test = require('node:test');
const assert = require('node:assert');
const handler = require('../server.js');

function fakeRes() {
  return {
    statusCode: 0,
    headers: {},
    body: '',
    writeHead(code, headers) { this.statusCode = code; Object.assign(this.headers, headers); },
    end(body) { this.body = body || ''; },
  };
}

test('health endpoint answers ok', () => {
  const res = fakeRes();
  handler({ url: '/health' }, res);
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(JSON.parse(res.body).status, 'ok');
});

test('home page answers text', () => {
  const res = fakeRes();
  handler({ url: '/' }, res);
  assert.strictEqual(res.statusCode, 200);
  assert.match(res.body, /pipeline demo/);
});
