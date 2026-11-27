# Class 3: Safe Images and Cleanup

**Docker for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to the last class

Your setup works. Now make it **safe**. Today you stop the app running as the all-powerful `root` user, check that no secret is baked into the image, label versions clearly, and clean up without deleting what you need.

**By the end of this class you can:**

- Check who a container runs as
- Build an image that runs as a **non-root** user
- Check that secrets are **not** inside an image
- Use clear version **tags**
- **Clean up** safely

## Prerequisites

- Classes 1 and 2 finished, with your `cafe-docker` folder

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/cafe-docker
docker compose up -d
sleep 8
docker compose ps
```

**What you should see:** `app` (healthy) and `proxy` both `Up`.

**If yours looks different:** if the build fails, check that you are in `~/practice/cafe-docker` and that `app.py` and `Dockerfile` exist.

## Step 1: Who is the app running as?

**Why this matters:** if someone breaks into a container running as root, they have far more power. Running as a normal user limits the damage.

**Run it:**

```bash
docker compose exec app whoami
```

**What you should see:** `root`.

That is the problem to fix. Our program does not need root at all.

## Step 2: Start fresh

**Why this matters:** the old volume was created while the app ran as root, so its files belong to root. A non-root user could not write to them. We remove the volume and start clean.

> ⚠️ `down -v` **deletes the volume and its data**. Here that is only a practice visit counter, so it is safe. Think before using `-v` on real data.

**Run it:**

```bash
docker compose down -v
docker volume ls --filter name=visits
```

**What you should see:** the second command shows an empty list.

## Step 3: Write a safer Dockerfile

**Run it:**

```bash
cat > Dockerfile <<'EOF'
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1

RUN useradd --create-home --uid 10001 appuser \
    && mkdir -p /data \
    && chown appuser:appuser /data

WORKDIR /app
COPY app.py .

USER appuser
EXPOSE 8000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["python", "app.py"]
EOF
cat Dockerfile
```

**What it does:**

- `useradd` creates a normal user called `appuser`.
- `mkdir -p /data` and `chown` make a folder for the visit count that `appuser` may write to.
- `USER appuser` means everything after this, including the running program, uses that user, not root.
- `HEALTHCHECK` now lives **inside the image**, so any container from it can report its health.

**What you should see:** the Dockerfile printed back.

## Step 4: Use a clear version tag

**Why this matters:** a tag like `latest` can silently change. A version such as `2.0` always means the same thing.

**Run it:**

```bash
sed -i 's/^    build: \.$/    build: .\n    image: cafe-welcome:2.0/' compose.yaml
docker compose config --quiet && echo "compose file is valid"
grep -n "image: cafe-welcome" compose.yaml
```

**What it does:** adds `image: cafe-welcome:2.0` next to `build`, so the image built from your Dockerfile is named and versioned.

**What you should see:** `compose file is valid`, then a line showing `image: cafe-welcome:2.0`.

## Step 5: Build and start

**Run it:**

```bash
docker compose up -d --build
sleep 10
docker compose ps
docker image ls cafe-welcome
```

**What you should see:** both services `Up`, the app `(healthy)`, and the images `cafe-welcome   2.0` and `cafe-welcome   1.0`.

## Step 6: Confirm it is no longer root

**Run it:**

```bash
docker compose exec app whoami
docker compose exec app id
curl -s localhost:8080/
curl -s localhost:8080/
```

**What you should see:**

```text
appuser
uid=10001(appuser) gid=10001(appuser) groups=10001(appuser)
Welcome to Nky Digital Café! Visits so far: 1
Welcome to Nky Digital Café! Visits so far: 2
```

The app now runs as `appuser`, and it can still save its count. (If you skipped Class 2's `.env` step, you will see `Coraxshift Net Café` instead.)

## Step 7: Check that no secret is inside the image

**Why this matters:** anything copied into an image can be read by anyone who has the image. Your `.env` file must never be in it.

**Run it:**

```bash
ls -a .env
docker run --rm cafe-welcome:2.0 ls -a /app
```

**What it does:** the first line shows your `.env` exists on **your** machine. The second lists everything inside the image's `/app` folder.

**What you should see:**

```text
.env
.
..
app.py
```

Only `app.py` is inside. The `.env` file is **not**, because `.dockerignore` keeps it out and we only copied `app.py`.

> ⚠️ **Never write a password in a Dockerfile** (`ENV PASSWORD=...`). It stays in the image history forever. Pass secrets at run time through `.env` or the platform's secret tools.

## Step 8: Read the health status

**Run it:**

```bash
docker inspect --format '{{.State.Health.Status}}' "$(docker compose ps -q app)"
```

**What it does:** asks Docker for the health result of the app's container.

**What you should see:** `healthy`.

## Step 9: See what Docker is using

**Why this matters:** images, containers and volumes take disk space. You should know what is there **before** deleting anything.

**Run it:**

```bash
docker system df
docker ps -a
docker volume ls
```

**What you should see:** a summary of images, containers and volumes, with sizes.

## Step 10: Save your work

**Run it:**

```bash
git add Dockerfile compose.yaml
git commit -m "Run as non-root, add health check and version tag"
git status --short
```

**What you should see:** a commit message, then nothing.

## Step 11: Clean up safely

**Why this matters:** a forgotten lab wastes space. But cleanup commands can delete data, so we remove **by name**, not "everything".

**Run it:**

```bash
docker compose down -v
docker image rm cafe-welcome:1.0 cafe-welcome:2.0
docker image rm cafe-docker-app || echo "already gone"
docker ps -a
docker image ls cafe-welcome
```

**What it does:** removes this project's containers, network and volume, then the images we built, **by name**. (`cafe-docker-app` is the image Compose built in Class 2, before we gave it a tag. If it is already gone, you will see `already gone`, which is fine.)

**What you should see:** `docker ps -a` shows nothing from this project, and `docker image ls cafe-welcome` shows an empty list.

Your **code** is safe in Git. Rebuild everything any time with `docker compose up -d --build`.

> ⚠️ **Be careful with `docker system prune -a --volumes`.** It deletes every unused image and volume on the machine, not just this lab. Read what it says it will remove before you type `y`. When unsure, remove by name.

## ✅ Recap

- Many containers run as **root** by default. Add a normal user and `USER` it.
- Check with `docker compose exec app whoami`.
- Put a **health check** in the image so every container can report its health.
- Use specific **tags** such as `2.0`. Avoid relying on `latest`.
- Keep `.env` and secrets **out** of images. Check with `ls` inside the image.
- `docker system df` shows what is using space before you delete.
- Clean up **by name**. Treat `prune` with respect.

## 📤 Push to your portfolio

In your portfolio repository, create `docker/class-3/` and add:

1. Your safer `Dockerfile` and updated `compose.yaml`
2. A `safety-notes.md` describing in your own words what you changed and why: the user, the health check, the tag, and how you proved no secret was inside
3. A `notes.md` answering: *Why not run as root? Why did we remove the volume before switching users? What does `down -v` do?*

Next up: [the Assignment](assignment-package-a-small-app.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-volumes-and-compose.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-package-a-small-app.md)</td></tr></table>
