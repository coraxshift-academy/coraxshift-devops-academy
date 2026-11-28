# AutoMarket

**Built by Rukevwe Ubioworo** · Coraxshift DevOps Academy reference project

A car marketplace where you browse, filter and compare vehicles. Like Table & Taste, this is a codebase the student did not write, used for the assignments where the job is to make it build, containerise, test and ship.

## What is in here

| Path | What it is |
|---|---|
| `src/` | The React app (pages, components) |
| `api/` | A small Node.js API: car listings, `/health` and `/metrics` |
| `tests/` | Three tests for the API, using Node's built-in test runner |
| `Dockerfile` | Builds the React app, then serves it with nginx |
| `Dockerfile.api` | Packages the API |
| `docker-compose.yml` | Runs both services together on ports 8081 and 3001 |
| `ci/github-actions.yml` | A pipeline you can copy to `.github/workflows/ci.yml` |

## Prerequisites

1. Node.js 22 or newer. Check with `node --version`.
2. Docker Desktop or Docker Engine. Check with `docker --version`.
3. Nothing else. No accounts, no cloud.

## Learning objectives

By the end of the Docker and CI/CD courses you can:

1. Package a React app and a Node API as two separate images.
2. Run them together with Compose and prove the web service waits for the API to be healthy.
3. Add a filter to an existing API endpoint without breaking the tests.
4. Read `/metrics` and explain what a monitoring system would do with it.

## Step 1: Run the API locally

```bash
npm install
npm run api
```

Expected output:

```text
automarket-api listening on 3001
```

Ask for its health in a second terminal:

```bash
curl http://localhost:3001/health
```

Expected output:

```json
{"status":"ok","service":"automarket-api","uptime_seconds":4}
```

## Step 2: Run the tests

```bash
npm test
```

Expected output:

```text
# tests 3
# pass 3
# fail 0
```

## Step 3: Use the filter

```bash
curl "http://localhost:3001/api/cars?make=tesla"
```

Expected output:

```json
[{"id":2,"make":"Tesla","model":"Model 3","year":2023,"price":38900,"fuel":"electric","transmission":"automatic"}]
```

## Step 4: Run the frontend

```bash
npm run dev
```

Expected output:

```text
  VITE v7  ready in 380 ms
  Local:   http://localhost:5173/
```

## Step 5: Build and run with Docker Compose

```bash
docker compose up --build
```

Expected output, near the end:

```text
✔ Container automarket-api-1  Healthy
✔ Container automarket-web-1  Started
```

Check both services:

```bash
docker compose ps
```

Expected output:

```text
NAME                  SERVICE   STATUS
automarket-api-1      api       Up (healthy)
automarket-web-1      web       Up
```

The site runs on http://localhost:8081 and the metrics on http://localhost:3001/metrics.

## Step 6: Clean up

```bash
docker compose down --rmi local
```

Expected output:

```text
✔ Container automarket-web-1  Removed
✔ Container automarket-api-1  Removed
```

## What you learned

1. `docker build` turns a Dockerfile into an image, and each service gets its own.
2. `depends_on` with `condition: service_healthy` stops the web service starting before the API answers.
3. A query string filter is a server concern, so the test belongs in `tests/`, not in the browser.
4. `/health` proves a container is working, not just running.
5. `/metrics` is the contract between the app and the monitoring system.

## Cost

$0. Everything runs on your own machine.

## Credit

Built by Rukevwe Ubioworo. Part of the paid Coraxshift course material, see the repository [LICENSE](../../LICENSE).
