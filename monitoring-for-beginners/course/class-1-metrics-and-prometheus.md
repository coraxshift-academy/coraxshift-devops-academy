# Class 1: Metrics and Prometheus

**Monitoring and Observability for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Today you start a small web shop, *Mama Ngozi's Provisions*, that counts what it does. Then you start **Prometheus**, a tool that visits the shop every few seconds, writes the numbers down, and lets you ask questions about them.

> 📖 **From my café:** HandyCafe gave every customer a ticket with the time they had used. I could look at the screen and say "machine 7 has been busy for two hours". That is a **metric**: a number that changes over time and has a name. Prometheus is the screen that keeps all those numbers.

**By the end of this class you can:**

- Say what a metric is, and tell a **counter**, a **gauge** and a **histogram** apart
- Start the lab with Docker Compose
- Read the shop's `/metrics` page
- Check that Prometheus is collecting (targets, `up`)
- Ask three PromQL questions: a total, a **rate**, and a grouped sum

## 💰 Cost and cleanup

| | |
|---|---|
| **Cost** | $0. Three small containers in your free Codespace |
| **If forgotten** | They keep using Codespace memory and your free hours |
| **Clean up** | The last step: `docker compose down`, then check with `docker compose ps` |

## Prerequisites

- A Codespace open on this repository
- Linux, Bash, Git and Docker basics

## How every step works

Each step has five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, and **If yours looks different**.

> 💡 **Your numbers will not match ours.** Counts, times and ports differ from computer to computer. Compare the *meaning*.

## Step 0: Go to home base and check Docker

**Why this matters:** every command in this course runs from the same folder.

**Run it:**

```bash
cd /workspaces/monitoring-for-beginners/lab
pwd
docker --version
docker compose version
```

**What it does:** moves you into the `lab` folder and prints the Docker versions.

**What you should see:** `/workspaces/monitoring-for-beginners/lab`, then two version lines.

**If yours looks different:** `docker: command not found` means the Codespace has no Docker. See [Troubleshooting](troubleshooting.md).

## Step 1: Meet the lab

**Why this matters:** you should know what is in the lab before you start it.

**Run it:**

```bash
ls
cat docker-compose.yml | grep -E "^  [a-z-]+:$"
```

**What it does:** lists the lab files, then prints the names of the services defined in `docker-compose.yml`.

**What you should see:** folders `app`, `prometheus`, `alertmanager`, `grafana`, `loki` and others, and a service list such as `shop-app`, `node-exporter`, `prometheus`, `alertmanager`, `alert-receiver`, `loki`, `promtail`, `grafana`.

| Service | What it is | Used from |
|---|---|---|
| `shop-app` | The little shop that counts what it does | Class 1 |
| `node-exporter` | Reports how the computer itself is doing (CPU, memory, disk) | Class 1 |
| `prometheus` | Collects and stores the numbers | Class 1 |
| `grafana` | Draws dashboards | Class 2 |
| `alertmanager`, `alert-receiver` | Sends alerts, and a pretend phone that shows them | Class 3 |
| `loki`, `promtail` | Stores and collects logs | Class 3 |

## Step 2: Read how the shop measures itself

**Why this matters:** a number only exists if the program writes it. This is how.

**Run it:**

```bash
grep -n "Counter(\|Gauge(\|Histogram(" app/app.py
```

**What it does:** finds the lines where the shop creates its metrics.

**What you should see:**

```text
14:ORDERS = Counter("shop_orders_total", "Orders received, by result", ["status"])
15:LATENCY = Histogram("shop_request_seconds", "How long requests take", ["route"],
17:STOCK = Gauge("shop_stock_items", "Items left on the shelf")
18:BROKEN = Gauge("shop_broken", "1 when the shop is in 'broken' mode, else 0")
```

(Your line numbers may differ a little.)

**What it means:**

| Type | Plain meaning | Example here |
|---|---|---|
| **Counter** | A number that only goes **up** (it resets only if the program restarts). Like the odometer of a car | `shop_orders_total` |
| **Gauge** | A number that goes **up and down**. Like a fuel gauge | `shop_stock_items` |
| **Histogram** | Counts how many things fell into each size bucket, such as "under 0.1 seconds". Used for timings | `shop_request_seconds` |

A **label** such as `status="ok"` is a tag that splits one metric into several lines.

## Step 3: Start the shop, Prometheus and the computer reporter

**Why this matters:** this is your first running monitoring stack.

**Run it:**

```bash
docker compose up -d --build shop-app prometheus node-exporter
docker compose ps
```

**What it does:** builds the shop image, then starts three services in the background (`-d`). `ps` lists them.

**What you should see:** the first run downloads images and may take a few minutes. Then three services with state `running` (or `Up`).

**If yours looks different:** an `Exited` service means something failed. Read its log with `docker compose logs shop-app` (change the name). A port error such as "address already in use" means another program uses that port; see [Troubleshooting](troubleshooting.md).

## Step 4: Look at the shop's metrics page

**Why this matters:** `/metrics` is the page Prometheus reads. Reading it yourself removes the mystery.

**Run it:**

```bash
curl -s localhost:8000/metrics | grep -E "^shop_"
```

**What it does:** fetches the metrics page and shows only lines that start with `shop_`.

**What you should see:** lines like these (numbers will differ):

```text
shop_orders_total{status="ok"} 0.0
shop_orders_total{status="failed"} 0.0
shop_request_seconds_bucket{le="0.1",route="/order"} 0.0
shop_request_seconds_count{route="/order"} 0.0
shop_stock_items 100.0
shop_broken 0.0
```

**If yours looks different:** an empty result means the shop is not running. Check `docker compose ps`. You may also see lines ending in `_created`. They only record when a metric was created, so ignore them.

## Step 5: Give the shop some customers

**Why this matters:** a shop with no customers has flat graphs. The traffic script sends a few orders per second.

**Run it:**

```bash
bash scripts/traffic.sh 30
curl -s localhost:8000/metrics | grep -E "^shop_(orders_total|stock_items)"
```

**What it does:** sends orders for 30 seconds, then shows the counters again.

**What you should see:** `Sending orders ...`, `Done.`, then `shop_orders_total{status="ok"}` well above 0 (for example around 100) and `shop_stock_items` below 100.

**What it means:** the counter went **up**, and the gauge went **down**. The shelf is restocked automatically when it falls below 10.

## Step 6: See the shop in your browser

**Run it:** open the **Ports** tab, find port **8000**, and click the 🌐 icon.

**What you should see:** the heading *Mama Ngozi's Provisions*. Add `/metrics` to the address to see the raw page.

## Step 7: Open Prometheus and check its targets

**Why this matters:** Prometheus only knows what it has been told to visit. A **target** is one thing it visits. If a target is down, the graphs are blind.

**Run it:** in the **Ports** tab open port **9090**. In the top menu choose **Status → Target health** (older versions: **Status → Targets**).

**What it does:** shows every target and whether the last visit worked.

**What you should see:** three targets, `prometheus`, `shop-app` and `node`, each with state **UP**.

**If yours looks different:** a target in **DOWN** shows the error. Wait 10 seconds and refresh. If `shop-app` stays down, check `docker compose ps`.

## Step 8: Read the instructions Prometheus follows

**Run it:**

```bash
cat prometheus/prometheus.yml
```

**What you should see:** a file with `scrape_interval: 5s`, a `rule_files` section, an `alerting` section, and three jobs under `scrape_configs`.

**What it means:**

| Setting | Plain meaning |
|---|---|
| `scrape_interval: 5s` | Visit every target every 5 seconds. Real systems often use 15 to 60 seconds. We use 5 so labs feel quick |
| `job_name` | A group name, used in graphs |
| `targets` | The addresses to visit |
| `rule_files`, `alerting` | Used in Class 3 |

Prometheus **pulls** the numbers: it visits the app. The app does not push anything.

## Step 9: Ask your first questions (PromQL)

**Why this matters:** **PromQL** is the question language of Prometheus. Three questions cover most of what beginners need.

**Run it:** in Prometheus, click **Query** (or **Graph**) in the top menu. Send traffic in the terminal so there is something to see:

```bash
bash scripts/traffic.sh 120
```

While it runs, type each query into the box and press **Execute**, then try the **Graph** tab.

**Question 1: Is everything up?**

```text
up
```

**What you should see:** one line per target, each with value `1` (up) or `0` (down).

**Question 2: How many orders so far?**

```text
shop_orders_total
```

**What you should see:** two lines, `status="ok"` and `status="failed"`, with `failed` at 0.

**Question 3: How fast are orders arriving right now?**

```text
rate(shop_orders_total[1m])
```

**What you should see:** about 3 orders per second for `ok` and 0 for `failed` while the traffic script runs (your number depends on your machine).

**What it means:** a counter only goes up, so its total is hard to read. `rate(x[1m])` says "how fast did it grow per second over the last minute". The `[1m]` is the **window**.

Now group them:

```text
sum by (status) (rate(shop_orders_total[1m]))
```

**What it does:** adds up the rates and keeps one line per `status`.

And a gauge, which needs no `rate`:

```text
shop_stock_items
```

**What you should see:** a number between about 10 and 100.

## Step 10: See the computer itself

**Run it:**

```text
100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)
```

**What it does:** the reporter says how much time the CPUs spent idle. This turns it into "percent busy".

**What you should see:** a small number, for example 2 to 20.

## Step 11: 🧹 Clean up and check

**Run it:**

```bash
docker compose down
docker compose ps
```

**What it does:** stops and removes the containers and the lab network. Your files are untouched.

**What you should see:** `docker compose ps` prints only a header line (no services).

**If yours looks different:** to see everything on the computer, run `docker ps`. It should list nothing from this lab.

## ✅ Recap

- A **metric** is a named number that changes over time.
- **Counter** goes up, **gauge** goes up and down, **histogram** counts timings in buckets.
- **Prometheus** pulls from `/metrics` pages on a schedule.
- A **target** is something it visits. `up` is 1 when the visit worked.
- **PromQL** questions: a name, `rate(...[1m])`, and `sum by (label)`.

## 📤 Push to your portfolio

In your portfolio repository create `monitoring/class-1/` with:

1. `notes.md` answering: *What is a metric? What is the difference between a counter and a gauge? What does `rate(x[1m])` mean? What is a target?*
2. A screenshot of the Prometheus **Targets** page showing three UP targets
3. A screenshot of the graph of `sum by (status) (rate(shop_orders_total[1m]))`
4. The three PromQL questions you used, written in your own words

> 🔒 **Do not include** tokens, your Codespace URL, or your email in screenshots.

Next up: [Class 2: Dashboards with Grafana](class-2-dashboards-grafana.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-dashboards-grafana.md)</td></tr></table>
