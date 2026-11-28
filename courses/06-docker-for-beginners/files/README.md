# Docker: the code for this course

A real app, a real Dockerfile, a real compose file. Copy the folder, run two commands, see it work.

## Prerequisites

1. Docker Desktop or Docker Engine. Check with `docker --version`.
2. Nothing else. The app has no dependencies to install.

## Learning objectives

1. Build an image from a Dockerfile and read what each line does.
2. Use a multi-stage build so the final image stays small.
3. Publish a port and reach the app from your browser.
4. Add a health check and read it with `docker ps`.
5. Run the same thing with Compose and understand what Compose adds.

## Step 1: Build the image

```bash
cd app
docker build -t coraxshift-web:1.0 .
```

Expected output, near the end:

```text
 => exporting to image
 => => naming to docker.io/library/coraxshift-web:1.0
```

## Step 2: See the image

```bash
docker images coraxshift-web
```

Expected output:

```text
REPOSITORY        TAG    IMAGE ID       CREATED         SIZE
coraxshift-web    1.0    9f2c1a7b3d11   10 seconds ago  About 140MB
```

## Step 3: Run it

```bash
docker run -d --name web -p 8080:3000 coraxshift-web:1.0
```

Expected output: a long container ID, then your prompt returns.

## Step 4: Prove it is alive

```bash
curl http://localhost:8080/health
```

Expected output:

```json
{"status":"ok","uptime_seconds":4}
```

## Step 5: Check the health status Docker records

```bash
docker ps --filter name=web
```

Expected output:

```text
CONTAINER ID   IMAGE                STATUS                    NAMES
9f2c1a7b3d11   coraxshift-web:1.0   Up 20 seconds (healthy)   web
```

## Step 6: Run the same thing with Compose

```bash
docker rm -f web
docker compose up -d
docker compose ps
```

Expected output:

```text
NAME                SERVICE   STATUS
files-web-1         web       Up (healthy)
```

## Step 7: Clean up

```bash
docker compose down --rmi local
docker image prune -f
```

Expected output:

```text
✔ Container files-web-1  Removed
✔ Image files-web        Removed
```

## What you learned

1. `FROM` chooses the starting image; the last `FROM` is what ships.
2. `COPY --from=build` carries only the files you need, not the whole build.
3. `EXPOSE` documents the port; `-p` actually publishes it.
4. `HEALTHCHECK` is the difference between "running" and "working".
5. Compose is the same image with the flags written down in a file.
