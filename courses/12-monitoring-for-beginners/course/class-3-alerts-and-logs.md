# Class 3: Alerts and Logs

**Monitoring and Observability for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Nobody watches a dashboard all night. Today you teach the system to **tell you** when something is wrong, and then to help you find out **why**. You will break the shop on purpose, watch an alert arrive, read the logs that explain it, fix the shop, and watch the alert clear.

> 📖 **From my café:** When a machine froze in my cybercafe, I did not find out from a graph. A customer waved at me. I wanted to know **before** the customer waved. After I found the machine, I looked at what it had been doing, because the cause was in its history. The alert is the wave, and the logs are the history.

**By the end of this class you can:**

- Read and explain an alert rule (`expr`, `for`, `labels`, `annotations`)
- Test alert rules **without** breaking anything
- Break the shop and watch **Prometheus → Alertmanager → receiver**
- Search logs in **Loki** with `level`, text and counts
- Use a metric to notice a problem and a log to explain it
- Remove the lab completely, including stored data

## 💰 Cost and cleanup

| | |
|---|---|
| **Cost** | $0. Seven or eight small containers in your free Codespace |
| **If forgotten** | They use Codespace memory and free hours. Stored data stays in Docker volumes |
| **Clean up** | The last step: `docker compose down -v` removes containers **and** stored data, then you check `docker ps -a` and `docker volume ls` |

## Prerequisites

- Classes 1 and 2 done and cleaned up
- A little more memory than before. If the Codespace feels slow, see [Troubleshooting](troubleshooting.md)

## Step 0: Start the whole lab

**Why this matters:** today uses every service.

**Run it:**

```bash
cd /workspaces/monitoring-for-beginners/lab
docker compose up -d --build
docker compose ps
```

**What it does:** starts all eight services in the background.

**What you should see:** `shop-app`, `node-exporter`, `prometheus`, `alertmanager`, `alert-receiver`, `loki`, `promtail` and `grafana`, all running.

**If yours looks different:** wait a minute and run `docker compose ps` again. If one keeps restarting, read its log, for example `docker compose logs loki | tail -20`.

## Step 1: Read an alert rule

**Why this matters:** an alert is just a PromQL question with a condition and a message.

**Run it:**

```bash
cat prometheus/rules/alerts.yml
```

**What you should see:** a file with two groups. Read the second one, **shop-alerts**:

```yaml
- alert: HighOrderErrors
  expr: shop:order_error_ratio:rate1m > 0.2
  for: 30s
  labels:
    severity: warning
  annotations:
    summary: "More than 20% of orders are failing"
```

| Part | Plain meaning |
|---|---|
| `alert` | The name |
| `expr` | The condition. When this is true, the alert is **pending** |
| `for: 30s` | It must stay true for 30 seconds before it **fires**. This stops one blip from waking you |
| `labels` | Tags for routing, such as `severity` |
| `annotations` | The message a person reads |

The first group holds the **recording rule** `shop:order_error_ratio:rate1m`: failed orders divided by all orders, over one minute. Recording rules save a calculation under a name.

## Step 2: Test the rules without breaking anything

**Why this matters:** you can test an alert on pretend data. No outage needed.

**Run it:**

```bash
docker run --rm -v "$PWD/prometheus:/p" -w /p/tests --entrypoint promtool prom/prometheus:v3.5.0 test rules alerts_test.yml
```

**What it does:** runs `promtool` (Prometheus's checker) inside a container. It feeds made-up numbers, such as "`up` was 1 and then went to 0", and checks that the right alerts fire.

**What you should see:**

```text
Unit Testing:  alerts_test.yml
  SUCCESS
```

**If yours looks different:** `FAILED` shows which test failed. Do not skip this. A rule you have never tested is a hope, not a safety net.

## Step 3: Check Prometheus loaded the rules

**Run it:** in Prometheus (Ports tab, port **9090**) open **Alerts** in the top menu.

**What you should see:** `ShopDown` and `HighOrderErrors`, both green and marked **inactive** (nothing wrong).

**If yours looks different:** no alerts listed means the rules file did not load. Check `docker compose logs prometheus | tail`.

## Step 4: Meet Alertmanager and the pretend phone

**Why this matters:** Prometheus decides **when** something is wrong. **Alertmanager** decides **who hears about it and how**: it groups, silences and repeats alerts.

**Run it:**

```bash
cat alertmanager/alertmanager.yml
```

**What you should see:** a `route` with `group_wait`, `group_interval`, `repeat_interval`, and a `receiver` called `phone` that sends to `http://alert-receiver:5001/`.

| Setting | Plain meaning |
|---|---|
| `group_by` | Bundle alerts with the same name into one message |
| `group_wait: 5s` | Wait a moment to see whether more alerts join |
| `repeat_interval: 1h` | Remind me once an hour, not every minute |
| `send_resolved: true` | Also tell me when it is fixed |

In real life the receiver is email, Slack or a paging service. Here it is a tiny program that **prints** the alert, so you can see it arrive.

**Run it:** in a **second terminal tab**, watch the pretend phone:

```bash
cd /workspaces/monitoring-for-beginners/lab
docker compose logs -f alert-receiver
```

Leave it open.

## Step 5: Break the shop on purpose

**Why this matters:** you must see an alert fire at least once, or you cannot trust it.

**Run it:** in your first terminal:

```bash
curl -s localhost:8000/break
bash scripts/traffic.sh 90
```

**What it does:** `/break` switches the shop to "broken" mode, where about 60% of orders fail. Then the traffic script sends orders.

**What you should see:** `shop is now BROKEN (60% of orders fail)`, then traffic runs. In Prometheus **Alerts**, `HighOrderErrors` turns **PENDING** (yellow), and after 30 seconds **FIRING** (red). In the receiver tab you see:

```text
ALERT FIRING: HighOrderErrors severity=warning :: More than 20% of orders are failing
```

**If yours looks different:** no alert after 2 minutes? Check that traffic is running (the ratio needs orders), that `shop_broken` is 1, and `docker compose logs alertmanager | tail`. Alertmanager can take up to about 35 seconds after the alert fires to send the message because of `group_wait`.

Also open Alertmanager (Ports tab, port **9093**).

**What you should see:** the alert listed as **active**.

## Step 6: Find out why, with logs

**Why this matters:** the alert says **what** is wrong. The logs say **why**.

**Run it:** in Grafana (Ports tab, port **3000**, `admin` / `lab-only-change-me`) choose **Explore**, select the **Loki** data source, switch to **Code** mode, and run each query one at a time (**Run query**). Set the time range to **Last 15 minutes**.

**Query 1: everything the shop wrote**

```text
{job="shop-app"}
```

**Query 2: only errors**

```text
{job="shop-app", level="ERROR"}
```

**Query 3: a word inside the message**

```text
{job="shop-app"} |= "timeout"
```

**Query 4: how many lines per level in the last 5 minutes**

```text
sum by (level) (count_over_time({job="shop-app"}[5m]))
```

**What you should see:** Query 2 shows lines like `{"ts": "...", "level": "ERROR", "msg": "order failed", "route": "/order", "reason": "payment service timeout"}`. Query 4 shows a high count for `ERROR` and `INFO`, and `WARN` of 1 (the line written when you called `/break`).

**What it means:**

- `{job="shop-app"}` is a **label selector**: it picks which logs to look at. Loki indexes only labels, not the text, which keeps it light.
- `|= "timeout"` filters the text.
- The `level` label comes from `promtail`, which read each JSON line and tagged it.
- The reason (`payment service timeout`) tells you where to look next.

**If yours looks different:** "No logs" means promtail is not shipping. Check `docker compose logs promtail | tail`, and that `lab/logs/shop.log` exists and is growing (`ls -la logs`).

## Step 7: See metrics and logs together

**Run it:** open **Dashboards → Shop → Shop overview** in Grafana. Keep traffic running if you can (`bash scripts/traffic.sh 60`).

**What you should see:** the error ratio stat in orange or red, the Orders per second graph showing a `failed` line, and the **Shop logs** panel filling with errors.

**What it means:** this is the investigation loop. **Notice** with a metric. **Narrow down** with the dashboard. **Explain** with logs.

## Step 8: Fix it and watch the alert clear

**Run it:**

```bash
curl -s localhost:8000/fix
bash scripts/traffic.sh 90
```

**What you should see:** `shop is back to normal`. The error ratio drops. The alert returns to inactive, and the receiver prints:

```text
ALERT RESOLVED: HighOrderErrors severity=warning :: More than 20% of orders are failing
```

**If yours looks different:** the resolved message can take a minute or two, because the one-minute rate has to fall below 20% first and Alertmanager waits for its `group_interval` (30 seconds).

## Step 9: Make the other alert fire (the shop disappears)

**Why this matters:** `HighOrderErrors` catches a shop that answers badly. `ShopDown` catches a shop that **does not answer at all**.

**Run it:**

```bash
docker compose stop shop-app
```

**What you should see:** after about 20 to 30 seconds, `ShopDown` fires in **Alerts**, and the receiver prints `ALERT FIRING: ShopDown severity=critical`. On the Prometheus **Targets** page, `shop-app` is **DOWN**.

**Run it:**

```bash
docker compose start shop-app
```

**What you should see:** the target turns UP again, and `ShopDown` resolves.

## Step 10: What makes a good alert

**Why this matters:** bad alerts make people stop looking, and then the real one is missed.

1. **Alert on symptoms users feel** (errors, slowness, shop down), not on every possible cause (CPU at 71%).
2. **Every alert needs an action.** If the person who gets it has nothing to do, delete or downgrade it.
3. **Use `for:`** so a one-second blip does not wake anyone.
4. **Write the message for a tired person at 2 AM.** Say what is wrong and where to look first.
5. **Test it** (you did, twice).
6. **Add a runbook** link or note: the first three things to check.

> 📝 **A tiny runbook for HighOrderErrors:** (1) Open Shop overview. Is the error ratio high? (2) In Loki: `{job="shop-app", level="ERROR"}`. What is the `reason`? (3) If the reason is a dependency (payment service), check that dependency. If the shop itself is faulty, restart it.

## Step 11: 🧹 Final teardown and check

**Run it:** first close the second terminal tab (Ctrl+C in the log follower), then:

```bash
docker compose down -v
docker compose ps
docker ps -a
docker volume ls
rm -f logs/shop.log
```

**What it does:** removes all containers, the network, and the stored data (`-v`). The last line removes the shop's log file.

**What you should see:** `docker compose ps` prints only a header. `docker ps -a` shows nothing from this lab. `docker volume ls` shows no volumes with `lab` in the name.

**If yours looks different:** a stray container can be removed with `docker rm -f <name>`. Do not remove containers you do not recognise from other work.

## ✅ Recap

- An **alert rule** is a PromQL condition with a `for:` time, `labels` and `annotations`.
- **Prometheus** decides when; **Alertmanager** decides who hears and how often.
- **Test** rules with `promtool test rules`, and once for real by breaking the thing.
- **Loki** stores logs. Select with labels, filter with `|=`, count with `count_over_time`.
- The loop: **notice** (metric), **narrow** (dashboard), **explain** (logs).
- Good alerts are about **symptoms**, have an **action**, and are **tested**.

## 📤 Push to your portfolio

In `monitoring/class-3/` add:

1. `notes.md`: *What does `for: 30s` do? What is the difference between Prometheus and Alertmanager? What is the difference between a metric and a log?*
2. A screenshot of `HighOrderErrors` **FIRING** and of the receiver printing the alert
3. A screenshot of the Loki query for `level="ERROR"` with the reason visible
4. Your own three-line **runbook** for `ShopDown`

> 🔒 Crop out your Codespace address from every screenshot.

Next up: [Assignment: Monitor a change to the shop](assignment-monitor-a-change.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-dashboards-grafana.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-monitor-a-change.md)</td></tr></table>
