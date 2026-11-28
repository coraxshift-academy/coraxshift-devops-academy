// AutoMarket API
// Plain Node.js (ES modules), no dependencies. Serves car listings, a health check and Prometheus metrics.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const startedAt = Date.now();
let requestCount = 0;

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) });
  res.end(payload);
}

function readCars() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'cars.json'), 'utf8'));
}

const server = http.createServer((req, res) => {
  requestCount += 1;
  const url = req.url.split('?')[0];

  if (url === '/health') {
    return sendJson(res, 200, {
      status: 'ok',
      service: 'automarket-api',
      uptime_seconds: Math.round((Date.now() - startedAt) / 1000),
    });
  }

  if (url === '/metrics') {
    const body = [
      '# HELP app_requests_total Total HTTP requests served',
      '# TYPE app_requests_total counter',
      `app_requests_total ${requestCount}`,
      '# HELP app_uptime_seconds Seconds since the service started',
      '# TYPE app_uptime_seconds gauge',
      `app_uptime_seconds ${Math.round((Date.now() - startedAt) / 1000)}`,
      '',
    ].join('\n');
    res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4' });
    return res.end(body);
  }

  if (url === '/api/cars') {
    try {
      const cars = readCars();
      const make = new URL(req.url, 'http://localhost').searchParams.get('make');
      return sendJson(res, 200, make ? cars.filter((c) => c.make.toLowerCase() === make.toLowerCase()) : cars);
    } catch {
      return sendJson(res, 500, { error: 'could not read car data' });
    }
  }

  return sendJson(res, 404, { error: 'not found' });
});

server.listen(PORT, () => console.log(`automarket-api listening on ${PORT}`));

export default server;
