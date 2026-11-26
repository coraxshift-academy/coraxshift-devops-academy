"""Mama Ngozi's Provisions: a tiny shop web app that exposes metrics and writes JSON logs.
Routes:  /          home page
         /order     place an order (sometimes slow, fails when the shop is 'broken')
         /health    simple health check
         /break     make 60% of orders fail (to practise alerts)
         /fix       go back to normal
         /metrics   Prometheus metrics
"""
import json, os, random, sys, threading, time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from prometheus_client import CONTENT_TYPE_LATEST, Counter, Gauge, Histogram, generate_latest

LOG_FILE = os.environ.get("LOG_FILE", "")
ORDERS = Counter("shop_orders_total", "Orders received, by result", ["status"])
LATENCY = Histogram("shop_request_seconds", "How long requests take", ["route"],
                    buckets=(0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5))
STOCK = Gauge("shop_stock_items", "Items left on the shelf")
BROKEN = Gauge("shop_broken", "1 when the shop is in 'broken' mode, else 0")
STOCK.set(100)
BROKEN.set(0)
ORDERS.labels("ok")      # create both series at 0 so graphs and ratios work from the start
ORDERS.labels("failed")
state = {"broken": False}
lock = threading.Lock()


def log(level, msg, **fields):
    line = json.dumps({"ts": time.strftime("%Y-%m-%dT%H:%M:%S"), "level": level, "msg": msg, **fields})
    print(line, flush=True)
    if LOG_FILE:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")


class Handler(BaseHTTPRequestHandler):
    def reply(self, code, body, ctype="text/plain; charset=utf-8"):
        data = body if isinstance(body, bytes) else body.encode()
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        start = time.time()
        path = self.path.split("?")[0]
        if path == "/metrics":
            return self.reply(200, generate_latest(), CONTENT_TYPE_LATEST)
        if path == "/health":
            return self.reply(200, "ok\n")
        if path == "/":
            self.reply(200, "<h1>Mama Ngozi's Provisions</h1><p>Open for orders at /order</p>", "text/html; charset=utf-8")
            LATENCY.labels("/").observe(time.time() - start)
            return
        if path == "/break":
            state["broken"] = True; BROKEN.set(1)
            log("WARN", "shop switched to broken mode")
            return self.reply(200, "shop is now BROKEN (60% of orders fail)\n")
        if path == "/fix":
            state["broken"] = False; BROKEN.set(0)
            log("INFO", "shop back to normal")
            return self.reply(200, "shop is back to normal\n")
        if path == "/order":
            time.sleep(random.uniform(0.01, 0.12) + (random.uniform(0.3, 0.9) if random.random() < 0.05 else 0))
            fail = state["broken"] and random.random() < 0.6
            if fail:
                ORDERS.labels("failed").inc()
                log("ERROR", "order failed", route="/order", reason="payment service timeout")
                code, out = 500, "order failed\n"
            else:
                with lock:
                    STOCK.dec()
                    if STOCK._value.get() < 10:
                        STOCK.set(100)
                        log("INFO", "restocked shelf", items=100)
                ORDERS.labels("ok").inc()
                log("INFO", "order placed", route="/order")
                code, out = 200, "order placed\n"
            LATENCY.labels("/order").observe(time.time() - start)
            return self.reply(code, out)
        self.reply(404, "not found\n")

    def log_message(self, *args):
        pass


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "8000"))
    log("INFO", "shop starting", port=port)
    ThreadingHTTPServer(("0.0.0.0", port), Handler).serve_forever()
