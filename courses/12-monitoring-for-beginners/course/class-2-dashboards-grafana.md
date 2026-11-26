# Class 2: Dashboards with Grafana

**Monitoring and Observability for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Numbers in a table are hard to read at a glance. **Grafana** turns them into a wall chart: lines, dials and big numbers. Today you read a ready-made dashboard for the shop, learn how each panel is built, and build one of your own.

> 📖 **From my café:** In the cafe I did not read a list of tickets every minute. I looked at one screen that showed how many machines were busy. A good dashboard is that one screen: one look, and you know whether the shop is fine.

**By the end of this class you can:**

- Start Grafana and sign in safely
- Explain a **data source**
- Read each panel of the Shop overview dashboard and say what question it answers
- Write the 95th percentile (**p95**) latency query and say what it means
- Build your own dashboard with two panels
- Explain what makes a dashboard good

## 💰 Cost and cleanup

| | |
|---|---|
| **Cost** | $0. Grafana is one more container in your Codespace |
| **If forgotten** | It uses Codespace memory and free hours |
| **Clean up** | The last step: `docker compose down`, then check `docker compose ps` |

## Prerequisites

- Class 1 done and cleaned up

## Step 0: Start the lab again

**Why this matters:** you stopped it at the end of Class 1.

**Run it:**

```bash
cd /workspaces/monitoring-for-beginners/lab
docker compose up -d --build shop-app prometheus node-exporter grafana
docker compose ps
```

**What it does:** starts the Class 1 services plus Grafana. Grafana also starts **Loki** (the log store) because the dashboard has a logs panel. That panel stays empty until Class 3.

**What you should see:** `shop-app`, `node-exporter`, `prometheus`, `loki` and `grafana` all running.

**If yours looks different:** a slow first start is normal while images download. Wait a minute and run `docker compose ps` again.

## Step 1: Open Grafana

**Why this matters:** Grafana is a website. You sign in like anywhere else.

**Run it:** open the **Ports** tab, find port **3000**, and click the 🌐 icon. Sign in with:

- User: `admin`
- Password: `lab-only-change-me`

If Grafana asks you to change the password, choose **Skip** for this lab.

**What it does:** opens the Grafana home page.

**What you should see:** a home page with menu icons on the left (or a ☰ menu).

> 🔒 **That password is for this practice lab only.** It lives in `docker-compose.yml`. In real life you never keep a password in a file in Git, and you never reuse it.

**If yours looks different:** a "page not found" or blank page means Grafana is still starting. Wait 20 seconds and refresh. If the password is rejected, run `docker compose logs grafana | tail -20`.

## Step 2: See where the data comes from

**Why this matters:** Grafana does not store the numbers. It asks a **data source** for them. Ours is Prometheus.

**Run it:** open **Connections → Data sources** from the menu.

**What you should see:** two data sources, **Prometheus** (marked default) and **Loki**. They were created for you by files in `grafana/provisioning/`.

**Run it:**

```bash
cat grafana/provisioning/datasources/datasources.yml
```

**What you should see:** the Prometheus address `http://prometheus:9090`. Inside Docker, containers reach each other **by service name**, not `localhost`.

## Step 3: Send customers, then open the dashboard

**Run it:** in the terminal:

```bash
bash scripts/traffic.sh 180
```

While it runs, in Grafana open **Dashboards**, open the folder **Shop**, and click **Shop overview**.

**What you should see:** a dashboard with six panels that refresh every 5 seconds: **Orders per second**, **Order error ratio**, **Stock on the shelf**, **Order latency (95th percentile)**, **Server CPU used** and **Shop logs**.

**If yours looks different:** "No data" on every panel means Prometheus is not up or has no traffic yet. Check the time range in the top right (use **Last 15 minutes**), and run the traffic script. The **Shop logs** panel is expected to be empty until Class 3.

## Step 4: Read each panel

**Why this matters:** you should be able to say what question every panel answers.

Click the three dots on a panel, then **Edit** (or press `e` while hovering). Look at the **query** under the graph.

| Panel | Query | The question it answers |
|---|---|---|
| Orders per second | `sum by (status) (rate(shop_orders_total[1m]))` | How busy are we, and are orders succeeding? |
| Order error ratio | `shop:order_error_ratio:rate1m` | What share of orders is failing? |
| Stock on the shelf | `shop_stock_items` | Are we about to run out? |
| Order latency (p95) | `histogram_quantile(0.95, sum by (le) (rate(shop_request_seconds_bucket{route="/order"}[1m])))` | How slow is the slowest 5% of orders? |
| Server CPU used | `100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[1m])) * 100)` | Is the computer overworked? |
| Shop logs | `{job="shop-app"}` (Loki) | What did the shop write in its diary? |

Press **Esc** to leave without changing anything.

**What it means:** panel 2 uses a **recording rule**, a calculation Prometheus saves under a name (`shop:order_error_ratio:rate1m`) so every dashboard and alert shares one definition. You will see it in Class 3.

## Step 5: Understand the p95 query

**Why this matters:** an **average** hides pain. If 95 orders take 0.05 seconds and 5 take 5 seconds, the average looks fine but 5 customers waited far too long. The **95th percentile (p95)** says "95% of requests were faster than this number".

**Run it:** in Prometheus (Ports tab, port **9090**), run:

```text
histogram_quantile(0.95, sum by (le) (rate(shop_request_seconds_bucket{route="/order"}[1m])))
```

**What it does:** a histogram counts requests per bucket (under 0.01 s, under 0.025 s, ...). `rate` turns the counts into rates, `sum by (le)` combines them, and `histogram_quantile(0.95, ...)` works out the 95th percentile from the buckets.

**What you should see:** a value between about 0.1 and 1 second while traffic runs. About 5% of the shop's orders are deliberately slow, so p95 sits near that edge.

**If yours looks different:** an empty result means no orders in the last minute. Run the traffic script.

## Step 6: Build your own dashboard

**Why this matters:** reading is not the same as doing.

**Run it:** in Grafana choose **Dashboards → New → New dashboard → Add visualization**. Choose the **Prometheus** data source.

1. In the query box (switch to **Code** mode if you see a builder), type `sum(rate(shop_orders_total[1m]))`. Press **Shift+Enter**.
2. On the right, set **Title** to `Orders per second` and **Unit** to `ops/sec` (search "ops").
3. Click **Back to dashboard**, then **Add → Visualization**. Query `shop_stock_items`. Set the visualization type to **Gauge**, **Min** 0, **Max** 100, **Title** `Stock on the shelf`.
4. Click **Save dashboard**. **Title:** `My shop board`. Save.

**What it does:** you made a dashboard with a line graph and a dial.

**What you should see:** both panels with live data, and your dashboard listed under **Dashboards**.

**If yours looks different:** Grafana's screens change between versions, so a button may have moved or been renamed. Follow the meaning. If the panel says **No data**, check the time range and that the traffic script is running.

> 💡 **Saving the provisioned Shop dashboard** is intentionally limited: it comes from a file. Your own dashboard is stored inside Grafana's data, which is why it disappears when you remove the lab with `down -v` in Class 3.

## Step 7: Explore without a dashboard

**Run it:** choose **Explore** from the menu, select **Prometheus**, and run `up`.

**What it does:** Explore is a scratch pad. Use it to try a query before you put it on a dashboard.

**What you should see:** a table or graph of the targets, each with value 1.

## Step 8: What makes a good dashboard

**Why this matters:** a dashboard with 40 panels is a wall of noise.

1. **One question per panel.** Give it a title that is that question.
2. **Show the user's pain first.** Errors, slowness and traffic come before CPU.
3. **Always set units** (seconds, percent, requests per second).
4. **Use colour sparingly.** Red means "act". If it is always red, nobody looks.
5. **Do not rely on averages.** Add a percentile.
6. **Keep it to one screen** for the main view.

Think of four questions that every service should answer, called the **four golden signals**: **traffic** (how busy), **errors** (how many fail), **latency** (how slow) and **saturation** (how full). Our dashboard covers all four: orders per second, error ratio, p95 latency and CPU.

## Step 9: 🧹 Clean up and check

**Run it:**

```bash
docker compose down
docker compose ps
```

**What you should see:** `docker compose ps` prints only a header line.

## ✅ Recap

- **Grafana** draws; it asks a **data source** (Prometheus) for the numbers.
- Containers reach each other **by service name** inside Docker.
- A panel is a **query** plus a **visualization**. Know the question each one answers.
- **p95** shows how bad the slowest customers' experience is. An **average** can hide it.
- A good dashboard: one question per panel, units, users' pain first, one screen.
- The **four golden signals**: traffic, errors, latency, saturation.

## 📤 Push to your portfolio

In `monitoring/class-2/` add:

1. `notes.md`: *What is a data source? What is p95 and why is it better than an average? What are the four golden signals?*
2. A screenshot of the Shop overview dashboard with traffic running, and one of `My shop board`
3. A short note saying which panel you think is **most useful to a shop owner**, and why

> 🔒 Crop out your Codespace address from the screenshots.

Next up: [Class 3: Alerts and logs](class-3-alerts-and-logs.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-metrics-and-prometheus.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-alerts-and-logs.md)</td></tr></table>
