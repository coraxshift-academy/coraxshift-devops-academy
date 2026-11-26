# Assignment: Monitor a Change to the Shop

**Monitoring and Observability for Beginners · Coraxshift DevOps Academy** · ⏱️ 3 hours

## 🎯 The brief

*Mama Ngozi's Provisions* now gives **refunds**. The owner says: *"If refunds suddenly jump, something is wrong with my stock or my suppliers. I want to know the same day."*

You will add a new metric to the shop, show it on a dashboard, write an alert for it, test the alert, write a short runbook, and clean up. This is a **portfolio piece**: someone should be able to read your folder and see how you think about monitoring.

## 💰 Cost and cleanup

| | |
|---|---|
| **Cost** | $0 (Codespace only) |
| **If forgotten** | Containers keep using Codespace memory and free hours |
| **Clean up** | Part 6 below: `docker compose down -v`, then check |

## What to do

Work in a **copy** of the lab so the course folder stays clean:

```bash
cd /workspaces/monitoring-for-beginners
cp -r lab ../refunds-lab
cd ../refunds-lab
pwd
```

You should see `/workspaces/refunds-lab`.

### Part 1: Add the metric (30 minutes)

Open `app/app.py` in VS Code and make **two edits**.

**Edit 1.** Directly below the line that creates `BROKEN`, add:

```python
REFUNDS = Counter("shop_refunds_total", "Refunds given")
```

**Edit 2.** Directly above the line `if path == "/order":` (inside `do_GET`), add:

```python
        if path == "/refund":
            REFUNDS.inc()
            log("INFO", "refund given", route="/refund")
            return self.reply(200, "refund given\n")
```

Keep the indentation exactly as shown (8 spaces for the `if`). Then rebuild and start the stack:

```bash
docker compose up -d --build
curl -s localhost:8000/refund
curl -s localhost:8000/metrics | grep "^shop_refunds_total"
```

**You should see:** `refund given`, then `shop_refunds_total 1.0`.

### Part 2: Show it (30 minutes)

In Grafana, create a dashboard named `Refunds` with **two panels**:

1. **Refunds per minute**: `increase(shop_refunds_total[1m])`
2. **Refunds as a share of orders**: `rate(shop_refunds_total[5m]) / sum(rate(shop_orders_total[5m]))`

Give each a **title that is a question**, a **unit**, and a sensible colour threshold. Send some traffic and refunds for the screenshot:

```bash
bash scripts/traffic.sh 60 &
for i in $(seq 1 40); do curl -s -o /dev/null localhost:8000/refund; sleep 1; done
wait
```

### Part 3: Alert on it (45 minutes)

Add a new rule to `prometheus/rules/alerts.yml`, inside the `shop-alerts` group, **indented to match the other rules**:

```yaml
      - alert: HighRefunds
        expr: increase(shop_refunds_total[1m]) > 20
        for: 10s
        labels:
          severity: warning
        annotations:
          summary: "More than 20 refunds in a minute"
```

Reload Prometheus and check:

```bash
docker run --rm -v "$PWD/prometheus:/p" -w /p --entrypoint promtool prom/prometheus:v3.5.0 check rules rules/alerts.yml
docker compose restart prometheus
```

**You should see:** `SUCCESS: 3 rules found` (or more), and the new alert **inactive** under **Alerts**.

### Part 4: Make it fire (30 minutes)

Run this and watch **Alerts** and the receiver log (`docker compose logs -f alert-receiver`):

```bash
for i in $(seq 1 60); do curl -s -o /dev/null localhost:8000/refund; sleep 0.5; done
```

**You should see:** `HighRefunds` goes pending then firing, and `ALERT FIRING: HighRefunds` appears in the receiver log. Stop sending refunds and wait for `ALERT RESOLVED`.

> 💡 **Bonus:** write a unit test for it in `prometheus/tests/alerts_test.yml` following the pattern of the other tests, and run `promtool test rules`.

### Part 5: Write the runbook (20 minutes)

Create `runbook-high-refunds.md` of about ten lines, for a tired person at 2 AM:

- **What this alert means** in one sentence
- **Is it real?** (which dashboard panel to open)
- **First three checks** (including the Loki query `{job="shop-app"} |= "refund"`)
- **Who to tell**, and **how to switch the alert off** if it is a false alarm

### Part 6: Clean up and prove it (10 minutes)

```bash
docker compose down -v
docker compose ps
docker ps -a
docker volume ls
rm -f logs/shop.log
```

You should see no containers or volumes from this lab.

## 📦 What to push

Copy your finished work into your portfolio in `monitoring/assignment/`:

| File | What it holds |
|---|---|
| `README.md` | What you built and why, in plain words for a shop owner, then a short technical section |
| `app.py` | Your changed app (or a `git diff` of your two edits) |
| `alerts.yml` | The rules file with `HighRefunds` |
| `runbook-high-refunds.md` | Your runbook |
| `screenshots/` | The Refunds dashboard, the alert **FIRING**, the receiver message, the Loki query, and the clean teardown |
| `lessons.md` | Three things that went wrong or surprised you, and what you did |

> 🔒 **Check before you commit:** no Codespace addresses, tokens, passwords or email addresses in screenshots or files. Do not commit `logs/*.log`.

## ✅ How it is marked

| | Check |
|---|---|
| 📊 | The new metric appears on `/metrics` and is a **counter** |
| 📈 | The dashboard answers a question per panel, with units |
| 🔔 | The alert fires and resolves, and you have evidence of both |
| 🧪 | The rules file passes `promtool check rules` |
| 📝 | The runbook is short and someone else could follow it |
| 🧹 | The teardown evidence shows nothing left |
| 🗣️ | The README is understood by a non-technical reader |

## 🧯 If you get stuck

Open [Troubleshooting](troubleshooting.md). If a service will not start, read its log first: `docker compose logs <name> | tail -30`.

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-alerts-and-logs.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-monitoring.md)</td></tr></table>
