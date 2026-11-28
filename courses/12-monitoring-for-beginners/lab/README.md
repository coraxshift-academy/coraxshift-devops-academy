# Monitoring: the code for this course

A complete local monitoring stack: Prometheus for metrics, Grafana for dashboards, Loki for logs, Alertmanager for alerts. Everything runs in Docker on your machine and costs nothing.

## Prerequisites

1. Docker Desktop or Docker Engine. Check with `docker --version`.
2. Docker Compose v2. Check with `docker compose version`.
3. At least 4GB of free memory, because four services run at once.

## Learning objectives

1. Bring up a full observability stack with one command.
2. Read a PromQL query and explain what it returns.
3. Open a provisioned Grafana dashboard without clicking through setup screens.
4. Fire an alert on purpose and see it reach Alertmanager.
5. Read logs in Loki and connect a log line to a metric spike.

## What is in this folder

| Path | What it is |
|---|---|
| `docker-compose.yml` | Prometheus, Grafana, Loki, Alertmanager, and the app they watch |
| `prometheus/prometheus.yml` | What Prometheus scrapes, and how often |
| `prometheus/rules/alerts.yml` | The alert rules |
| `prometheus/tests/alerts_test.yml` | Unit tests for the alert rules |
| `grafana/provisioning/` | Datasources and dashboard provisioning, so Grafana arrives ready |
| `grafana/dashboards/shop-overview.json` | The dashboard itself |
| `loki/loki.yml` | Log storage config |
| `alertmanager/alertmanager.yml` | Where alerts go |

## Step 1: Start the stack

```bash
docker compose up -d
```

Expected output:

```text
✔ Container lab-prometheus-1    Started
✔ Container lab-grafana-1       Started
✔ Container lab-loki-1          Started
✔ Container lab-alertmanager-1  Started
```

## Step 2: Check every service is up

```bash
docker compose ps
```

Expected output:

```text
NAME                    SERVICE       STATUS
lab-prometheus-1        prometheus    Up
lab-grafana-1           grafana       Up
lab-loki-1              loki          Up
lab-alertmanager-1      alertmanager  Up
```

## Step 3: Prove Prometheus is scraping

Open http://localhost:9090/targets. Expected result: every target shows `UP` in green.

From the command line:

```bash
curl -s "http://localhost:9090/api/v1/query?query=up" | head -c 200
```

Expected output starts with:

```json
{"status":"success","data":{"resultType":"vector","result":[
```

## Step 4: Open the dashboard

Open http://localhost:3000 and log in with the credentials in `docker-compose.yml` (`admin` / `admin` on first run).

Expected result: **Shop Overview** appears under Dashboards without you adding a datasource. Provisioning did that.

## Step 5: Fire an alert on purpose

```bash
docker compose stop app
```

Wait about a minute, then open http://localhost:9093. Expected result: an alert named after the "target down" rule, in firing state.

Start it again and the alert resolves:

```bash
docker compose start app
```

## Step 6: Clean up

```bash
docker compose down -v
```

Expected output:

```text
✔ Container lab-prometheus-1  Removed
✔ Container lab-grafana-1     Removed
✔ Container lab-loki-1        Removed
✔ Container lab-alertmanager-1 Removed
✔ Volume lab-prometheus-data  Removed
```

The `-v` matters. Without it the volumes stay and take up disk.

## What you learned

1. Prometheus pulls metrics on a timer; nothing pushes unless you add a pushgateway.
2. Provisioning beats clicking: a datasource defined in a file survives a rebuild.
3. An alert is a rule plus a duration, so a one-second blip does not wake anyone.
4. Loki stores logs by label, which is why the query looks like a filter, not a search.
5. `down -v` is the difference between stopping and actually cleaning up.
