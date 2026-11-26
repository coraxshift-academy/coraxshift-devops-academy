#!/usr/bin/env bash
# Monitoring and Observability for Beginners: self-check.
# Part 1 (always): checks the lab's config files are valid. Part 2 (only if the stack is running): checks it works.
# Run from the course folder in your Codespace:  bash scripts/monitoring-check.sh
# It only READS. It never starts, stops or deletes anything.
set -u
HERE="$(cd "$(dirname "$0")/.." && pwd)"; LAB="$HERE/lab"
pass=0; fail=0; skip=0
ok()   { echo "PASS  $1"; pass=$((pass+1)); }
bad()  { echo "FAIL  $1"; [ -n "${2:-}" ] && echo "      $2" | head -3; fail=$((fail+1)); }
skp()  { echo "SKIP  $1"; skip=$((skip+1)); }

echo "== Part 1: config files =="
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
cp -r "$LAB/prometheus/." "$TMP/"; sed -i 's#/etc/prometheus/rules/\*.yml#rules/*.yml#' "$TMP/prometheus.yml"
cp "$LAB/alertmanager/alertmanager.yml" "$TMP/alertmanager.yml"
if command -v promtool >/dev/null 2>&1; then
  PT() { (cd "$TMP" && promtool "$@"); }; AT() { (cd "$TMP" && amtool "$@"); }; MODE=native
elif command -v docker >/dev/null 2>&1; then
  PT() { docker run --rm -v "$TMP:/w" -w /w --entrypoint promtool prom/prometheus:v3.5.0 "$@"; }
  AT() { docker run --rm -v "$TMP:/w" -w /w --entrypoint amtool prom/alertmanager:v0.28.1 "$@"; }; MODE=docker
else MODE=none; fi
if [ "$MODE" = none ]; then skp "promtool not found and Docker not found: cannot check Prometheus files"
else
  out=$(PT check config prometheus.yml 2>&1) && ok "prometheus.yml is valid" || bad "prometheus.yml is NOT valid" "$out"
  out=$(PT check rules rules/alerts.yml 2>&1) && ok "alert rules are valid" || bad "alert rules are NOT valid" "$out"
  out=$(PT test rules tests/alerts_test.yml 2>&1) && ok "alert rule unit tests pass" || bad "alert rule unit tests FAILED" "$out"
  if command -v amtool >/dev/null 2>&1 || [ "$MODE" = docker ]; then
    out=$(AT check-config alertmanager.yml 2>&1) && ok "alertmanager.yml is valid" || bad "alertmanager.yml is NOT valid" "$out"
  else skp "amtool not found: alertmanager.yml not checked"; fi
fi
if command -v docker >/dev/null 2>&1; then
  out=$(cd "$LAB" && docker compose config -q 2>&1) && ok "docker-compose.yml is valid" || bad "docker-compose.yml is NOT valid" "$out"
else skp "Docker not found: docker-compose.yml not checked"; fi
python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$LAB/grafana/dashboards/shop-overview.json" 2>/dev/null \
  && ok "dashboard JSON is valid JSON" || bad "dashboard JSON is broken"
python3 -m py_compile "$LAB/app/app.py" "$LAB/alert-receiver/receiver.py" 2>/dev/null \
  && ok "Python files compile" || bad "a Python file has a syntax error"

echo; echo "== Part 2: the running stack (skipped if it is not running) =="
up() { curl -s -o /dev/null -m 3 -w '%{http_code}' "$1" 2>/dev/null; }
if [ "$(up localhost:9090/-/ready)" != "200" ]; then
  skp "Prometheus is not running on port 9090. Start the lab, then run this again."
else
  ok "Prometheus is ready (9090)"
  for pair in "shop app:8000/health" "node exporter:9100/metrics" "Alertmanager:9093/-/ready" "Grafana:3000/api/health" "Loki:3100/ready"; do
    name="${pair%%:*}"; url="${pair#*:}"
    [ "$(up "localhost:$url")" = "200" ] && ok "$name answers" || skp "$name is not running (it starts in a later class)"
  done
  targets=$(curl -s -m 5 localhost:9090/api/v1/targets 2>/dev/null | python3 -c "
import sys,json
d=json.load(sys.stdin)['data']['activeTargets']
print(' '.join(f\"{t['labels']['job']}={t['health']}\" for t in d))" 2>/dev/null)
  case "$targets" in *shop-app=up*) ok "Prometheus can scrape the shop app ($targets)";; *) bad "shop-app target is not up" "targets: $targets";; esac
  v=$(curl -s -m 5 -G localhost:9090/api/v1/query --data-urlencode 'query=sum(shop_orders_total)' 2>/dev/null \
      | python3 -c "import sys,json;r=json.load(sys.stdin)['data']['result'];print(r[0]['value'][1] if r else 'none')" 2>/dev/null)
  [ -n "$v" ] && [ "$v" != "none" ] && ok "shop_orders_total has data ($v orders so far)" || skp "no order data yet: run  bash lab/scripts/traffic.sh 30"
  if [ "$(up localhost:3000/api/health)" = "200" ]; then
    n=$(curl -s -m 5 -u admin:lab-only-change-me "localhost:3000/api/search?query=Shop%20overview" 2>/dev/null | python3 -c "import sys,json;print(len(json.load(sys.stdin)))" 2>/dev/null)
    [ "${n:-0}" -ge 1 ] 2>/dev/null && ok "Grafana has the 'Shop overview' dashboard" || bad "Grafana has no 'Shop overview' dashboard"
  fi
fi

echo; echo "RESULT: $pass passed, $fail failed, $skip skipped"
[ "$fail" -eq 0 ]
