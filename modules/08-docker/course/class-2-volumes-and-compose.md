# Class 2: Volumes and Compose

**Docker for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Last class the visit count vanished when the container was removed. Today you keep it with a **volume**, then you run **two services together** with **Docker Compose**: your welcome board, and a front door (a web server) that sends visitors to it.

**By the end of this class you can:**

- Keep data safe with a **volume**
- Write a **Compose** file for two services
- Explain why services reach each other **by name**
- Read a **health check**
- Change a setting with a **`.env`** file

## Prerequisites

- Class 1 finished, with your `cafe-docker` folder and the `cafe-welcome:1.0` image

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/cafe-docker
docker image ls cafe-welcome
ls
```

**What you should see:** the image `cafe-welcome   1.0`, and `Dockerfile  app.py`.

**If yours looks different:** if the image is missing, rebuild it with `docker build -t cafe-welcome:1.0 .`.

## Step 1: Keep the data with a volume

**Why this matters:** a **volume** is a locker that lives **outside** the container. You can throw the container away and the locker stays.

**Run it:**

```bash
docker volume create visits
docker run -d --name welcome -p 8000:8000 -v visits:/data cafe-welcome:1.0
sleep 2
curl -s localhost:8000/
curl -s localhost:8000/
```

**What it does:** `-v visits:/data` connects the volume called `visits` to the folder `/data` inside the container. Our program saves its count in `/data`.

**What you should see:** `Visits so far: 1` then `Visits so far: 2`.

Now remove the container and start a new one:

```bash
docker rm -f welcome
docker run -d --name welcome -p 8000:8000 -v visits:/data cafe-welcome:1.0
sleep 2
curl -s localhost:8000/
```

**What you should see:** `Visits so far: 3`.

The count **survived**, because it lived in the volume, not in the container. 🎉

Clean up the container and the volume (we recreate it with Compose next):

```bash
docker rm -f welcome
docker volume rm visits
```

## Step 2: Why Compose?

**Why this matters:** typing long `docker run` commands for two or three services is slow and easy to get wrong. **Compose** lets you write the whole setup in **one file**, then start it with one command.

We will run two services:

```text
you ─▶ proxy (nginx, port 8080) ─▶ app (welcome board, port 8000, private) ─▶ volume
```

Only the proxy is open to the outside. The app stays private.

## Step 3: Write the proxy settings

**Run it:**

```bash
cat > nginx.conf <<'EOF'
server {
  listen 80;
  location / {
    proxy_pass http://app:8000;
    proxy_set_header Host $host;
  }
}
EOF
cat nginx.conf
```

**What it does:** it tells nginx to pass every request on to `http://app:8000`. Notice that it says **`app`**, a name, not an address.

## Step 4: Write the Compose file

**Run it:**

```bash
cat > compose.yaml <<'EOF'
services:
  app:
    build: .
    environment:
      CAFE_NAME: "Coraxshift Net Café"
    volumes:
      - visits:/data
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 5s
    restart: unless-stopped

  proxy:
    image: nginx:1.27-alpine
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      app:
        condition: service_healthy

volumes:
  visits:
EOF
docker compose config --quiet && echo "compose file is valid"
```

**What it does, line by line:**

- `services` lists the containers. Here: `app` and `proxy`.
- `build: .` builds the app image from your Dockerfile.
- `environment` passes a setting into the container.
- `volumes: visits:/data` uses the named volume. The `volumes:` list at the bottom declares it.
- `healthcheck` runs a small test every 10 seconds. It asks the app's `/health` address.
- `restart: unless-stopped` brings the container back if it crashes.
- The proxy publishes **8080:80**. The app publishes **nothing**.
- `./nginx.conf:...:ro` puts your settings file into the proxy, **read-only**.
- `depends_on` with `service_healthy` makes the proxy wait until the app is healthy.

> ⚠️ **YAML cares about spaces.** Use spaces, never tabs. Each level is indented by exactly two spaces.

**What you should see:** `compose file is valid`.

**If yours looks different:** an error naming a line number means the spacing is wrong there. Compare with the box above.

## Step 5: Start everything

**Run it:**

```bash
docker compose up -d --build
docker compose ps
```

**What it does:** builds the image, creates the network and the volume, and starts both services in the right order.

**What you should see:** a table with `app` (status `Up ... (healthy)`) and `proxy` (status `Up`, port `0.0.0.0:8080->80/tcp`).

**If yours looks different:** if `app` says `starting`, wait ten seconds and run `docker compose ps` again.

## Step 6: Visit through the front door

**Run it:**

```bash
curl -s localhost:8080/
curl -s localhost:8080/
```

**What you should see:** `Visits so far: 1` and `Visits so far: 2`.

Your request went to the proxy, the proxy passed it to the app, and the answer came back.

## Step 7: Prove the app is private

**Run it:**

```bash
curl -s --max-time 3 localhost:8000/ || echo "port 8000 is closed, as intended"
```

**What you should see:** `port 8000 is closed, as intended`.

Only the proxy is reachable from outside. This is a common safety pattern.

## Step 8: Services find each other by name

**Why this matters:** Compose gives every service its own name on a private network. That is why `proxy_pass http://app:8000` works.

**Run it:**

```bash
docker compose exec proxy wget -qO- http://app:8000/health
```

**What it does:** runs a command **inside the proxy** that asks the app by name.

**What you should see:** `{"status": "ok"}`.

## Step 9: The data survives a restart

**Run it:**

```bash
docker compose restart app
sleep 5
curl -s localhost:8080/
docker compose down
docker compose up -d
sleep 8
curl -s localhost:8080/
```

**What it does:** restarts one service, then takes the whole setup down and back up.

**What you should see:** `Visits so far: 3`, then `Visits so far: 4`.

`down` removes the containers and the network, but **not** the volume. Your data is safe.

## Step 10: Read the logs

**Run it:**

```bash
docker compose logs app
```

**What you should see:** `Welcome board listening on port 8000` and a line for each request.

## Step 11: Change a setting with `.env`

**Why this matters:** settings that change between machines belong in a **`.env` file**, not in the Compose file. Compose reads `.env` automatically. Never commit a real `.env` that holds secrets.

**Run it:**

```bash
cat > .env <<'EOF'
CAFE_NAME=Nky Digital Café
EOF
sed -i 's/CAFE_NAME: "Coraxshift Net Café"/CAFE_NAME: "${CAFE_NAME:-Coraxshift Net Café}"/' compose.yaml
docker compose up -d
sleep 8
curl -s localhost:8080/
```

**What it does:** the `sed` line changes the Compose file to read `CAFE_NAME` from `.env`, with a default if it is missing. Compose then re-creates only the service whose settings changed.

**What you should see:** `Welcome to Nky Digital Café! Visits so far: 5`.

Notice the count carried on from before, because the volume stayed.

## Step 12: Save your work

**Why this matters:** `.env` stays out of Git. We commit a safe example instead.

**Run it:**

```bash
cat > .gitignore <<'EOF'
.env
EOF
cat > .env.example <<'EOF'
CAFE_NAME=Your Café Name
EOF
git add compose.yaml nginx.conf .env.example .gitignore
git commit -m "Add Compose setup with proxy and volume"
git status --short
```

**What you should see:** a commit message, then nothing.

## ✅ Recap

- A **volume** keeps data outside the container. Removing the container does not remove it.
- **Compose** describes several services in one file and starts them with `docker compose up -d`.
- Services reach each other **by name** on a private network.
- Publish only what must be reachable. Keep the rest private.
- A **health check** lets Compose know when a service is really ready.
- `docker compose down` keeps volumes. `docker compose down -v` deletes them too.
- Put settings in `.env`, and commit only a safe `.env.example`.

## 📤 Push to your portfolio

In your portfolio repository, create `docker/class-2/` and add:

1. Your `compose.yaml`, `nginx.conf`, `.env.example` and `.gitignore`, built for **your own** small app
2. A `notes.md` answering: *What is a volume and why did the count survive? Why does the proxy say `app` and not an address? Why is `.env` not committed?*

Next up: [Class 3: Safe images and cleanup](class-3-safe-images-and-cleanup.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-images-and-containers.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-safe-images-and-cleanup.md)</td></tr></table>
