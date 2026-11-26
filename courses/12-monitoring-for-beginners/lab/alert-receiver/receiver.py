"""A pretend 'phone': prints every alert Alertmanager sends, so you can see it arrive.
Run in the stack as the 'alert-receiver' service; read it with: docker compose logs -f alert-receiver"""
import json
from http.server import BaseHTTPRequestHandler, HTTPServer


class H(BaseHTTPRequestHandler):
    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        for a in body.get("alerts", []):
            print(f"ALERT {a['status'].upper()}: {a['labels'].get('alertname')} "
                  f"severity={a['labels'].get('severity')} :: {a['annotations'].get('summary', '')}", flush=True)
        self.send_response(200); self.end_headers()

    def log_message(self, *a):
        pass


HTTPServer(("0.0.0.0", 5001), H).serve_forever()
