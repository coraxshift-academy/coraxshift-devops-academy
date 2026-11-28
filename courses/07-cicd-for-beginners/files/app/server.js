// A tiny app with one endpoint, so the pipeline has something real to build and test.
const http = require('node:http');

const PORT = process.env.PORT || 3000;

function handler(req, res) {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('coraxshift pipeline demo');
}

if (require.main === module) {
  http.createServer(handler).listen(PORT, () => console.log(`listening on ${PORT}`));
}

module.exports = handler;
