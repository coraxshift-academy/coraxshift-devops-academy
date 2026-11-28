// A tiny web server with no dependencies, so the image builds without a network install.
const http = require('node:http');

const PORT = process.env.PORT || 3000;
const startedAt = Date.now();

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', uptime_seconds: Math.round((Date.now() - startedAt) / 1000) }));
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Coraxshift</title></head>
<body><h1>It runs in a container.</h1><p>Built once, run anywhere.</p></body></html>`);
});

server.listen(PORT, () => console.log(`web listening on ${PORT}`));
