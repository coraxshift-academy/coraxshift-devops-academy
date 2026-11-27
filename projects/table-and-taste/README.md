# Table & Taste

**Built by Rukevwe Ubioworo** · Coraxshift DevOps Academy reference project

A restaurant ordering and table reservation app. This is the codebase students inherit in the Docker and CI/CD courses: it was written by someone else, it has no packaging and no safety net, and the job is to make it build, containerise, test and ship.

## What is in here

| Path | What it is |
|---|---|
| `src/` | The React app (pages, components, context) |
| `api/` | A small Node.js API: dish data, `/health` and `/metrics` |
| `tests/` | Three tests for the API, using Node's built-in test runner |
| `Dockerfile` | Builds the React app, then serves it with nginx |
| `Dockerfile.api` | Packages the API |
| `docker-compose.yml` | Runs both services together |
| `ci/github-actions.yml` | A pipeline you can copy to `.github/workflows/ci.yml` |

## Prerequisites

1. Node.js 22 or newer. Check with `node --version`.
2. Docker Desktop or Docker Engine. Check with `docker --version`.
3. Nothing else. No accounts, no cloud.

## Learning objectives

By the end of the Docker course you can:

1. Write a multi-stage Dockerfile that builds a frontend and serves it with nginx.
2. Explain why the build stage and the runtime stage are different images.
3. Run two services with Compose and prove one waits for the other to be healthy.
4. Add a health check and read it from `docker compose ps`.

## Step 1: Run the API locally

```bash
npm install
npm run api
```

Expected output:

```text
table-and-taste-api listening on 3000
```

In a second terminal, ask for its health:

```bash
curl http://localhost:3000/health
```

Expected output:

```json
{"status":"ok","service":"table-and-taste-api","uptime_seconds":7}
```

The uptime number will be different on your machine. That is normal.

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

## Step 3: Run the frontend

```bash
npm run dev
```

Expected output:

```text
  VITE v7  ready in 400 ms
  Local:   http://localhost:5173/
```

Open that address. The menu, cart and reservation pages should load.

## Step 4: Build and run with Docker Compose

```bash
docker compose up --build
```

Expected output, near the end:

```text
✔ Container table-and-taste-api-1  Healthy
✔ Container table-and-taste-web-1  Started
```

Check the health of both services:

```bash
docker compose ps
```

Expected output:

```text
NAME                       SERVICE   STATUS
table-and-taste-api-1      api       Up (healthy)
table-and-taste-web-1      web       Up
```

Open http://localhost:8080 for the site and http://localhost:3000/metrics for the metrics.

## Step 5: Clean up

Stop the containers and remove the images built in this lab:

```bash
docker compose down --rmi local
```

Expected output:

```text
✔ Container table-and-taste-web-1  Removed
✔ Container table-and-taste-api-1  Removed
```

## What you learned

1. `docker build` turns a Dockerfile into an image.
2. A multi-stage build keeps the compiler out of the final image, so it stays small.
3. `docker compose up` starts every service in the file, and `depends_on` with `condition: service_healthy` makes one wait for another.
4. `curl` proves a service answers, which is stronger evidence than a container saying "Up".
5. `/metrics` is what a monitoring system scrapes, so the app has to expose it.

## Cost

$0. Everything here runs on your own machine.

## Credit

Built by Rukevwe Ubioworo. Part of the paid Coraxshift course material, see the repository [LICENSE](../../LICENSE).
