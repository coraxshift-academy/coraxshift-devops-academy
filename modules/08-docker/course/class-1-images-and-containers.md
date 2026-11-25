# Class 1: Images and Containers

**Docker for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Today you run your first containers, then you package a tiny program of your own: a **welcome board** for the café that counts visitors.

**By the end of this class you can:**

- Check that Docker works
- Run, list, stop and remove a container
- Publish a port and read logs
- Write a **Dockerfile**, build an **image** and run it

## Prerequisites

- A Codespace open on this repository
- Linux, Bash and Git basics

## Step 0: Check Docker

**Why this matters:** you cannot use a tool that is not there.

**Run it:**

```bash
docker version --format 'client {{.Client.Version}} / server {{.Server.Version}}'
docker compose version
```

**What it does:** asks Docker for its version, and for the version of Compose (you meet it in Class 2).

**What you should see:**

```text
client 2x.x.x / server 2x.x.x
Docker Compose version v2.x.x
```

**If yours looks different:** if you see `Cannot connect to the Docker daemon`, Docker is not running. See [Troubleshooting](troubleshooting.md). If the **server** part is missing, the same applies.

## Step 1: Run your first container

**Why this matters:** `hello-world` is a tiny test image that proves everything works end to end.

**Run it:**

```bash
docker run --rm hello-world
```

**What it does:** Docker looks for the image on your machine, does not find it, **pulls** it from Docker Hub, creates a container, runs it, and `--rm` removes the container afterwards.

**What you should see:** a download, then:

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

## Step 2: Run a web server

**Why this matters:** a container runs in its own little world. To reach it, you must **publish a port**.

**Run it:**

```bash
docker run -d --name board-test -p 8080:80 nginx:1.27-alpine
docker ps
```

**What it does:**

- `-d` runs it in the background.
- `--name` gives it a name you can remember.
- `-p 8080:80` connects **your** port 8080 to port 80 **inside** the container.
- `nginx:1.27-alpine` is the image: a small web server, with a **tag** (`1.27-alpine`) that names the exact version.

**What you should see:** a `docker ps` table with `board-test`, status `Up`, and `0.0.0.0:8080->80/tcp`.

Now visit it:

```bash
curl -s localhost:8080 | head -5
```

**What you should see:**

```text
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
```

## Step 3: Look inside

**Run it:**

```bash
docker logs board-test
docker exec board-test whoami
docker exec board-test ls /usr/share/nginx/html
```

**What it does:**

- `logs` prints what the container wrote.
- `exec` runs a command **inside** the running container.

**What you should see:** a log line showing your `curl` request, then `root`, then `50x.html  index.html`.

> 💡 Many containers run as **root** by default. In Class 3 you fix that for your own image.

## Step 4: Stop and remove

**Why this matters:** containers are disposable. That is the whole idea.

**Run it:**

```bash
docker stop board-test
docker ps -a --filter name=board-test
docker rm board-test
docker ps -a --filter name=board-test
```

**What you should see:** after `stop`, the container is listed as `Exited`. After `rm`, the list is empty.

| Command | What it does |
|---|---|
| `docker stop` | stops it, but keeps it |
| `docker rm` | deletes the stopped container |
| `docker run --rm` | deletes it automatically when it stops |

## Step 5: Write your own program

**Why this matters:** now we package something that is yours. It is a tiny welcome board that counts visits.

**Run it:**

```bash
cd ~
mkdir -p practice/cafe-docker
cd practice/cafe-docker
git init
cat > app.py <<'EOF'
import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

COUNT_FILE = os.environ.get("COUNT_FILE", "/data/visits.txt")
CAFE_NAME = os.environ.get("CAFE_NAME", "Coraxshift Net Café")


def read_count():
    try:
        with open(COUNT_FILE) as f:
            return int(f.read().strip() or 0)
    except (FileNotFoundError, ValueError):
        return 0


def write_count(n):
    os.makedirs(os.path.dirname(COUNT_FILE), exist_ok=True)
    with open(COUNT_FILE, "w") as f:
        f.write(str(n))


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype="application/json"):
        data = body.encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/health":
            self._send(200, json.dumps({"status": "ok"}))
        elif self.path == "/":
            n = read_count() + 1
            write_count(n)
            self._send(200, f"Welcome to {CAFE_NAME}! Visits so far: {n}\n",
                       "text/plain; charset=utf-8")
        else:
            self._send(404, json.dumps({"error": "not found"}))

    def log_message(self, fmt, *args):
        print(fmt % args, flush=True)


if __name__ == "__main__":
    print("Welcome board listening on port 8000", flush=True)
    HTTPServer(("0.0.0.0", 8000), Handler).serve_forever()
EOF
python3 -m py_compile app.py && echo "app.py is valid"
```

**What it does:** the program answers three addresses: `/` (welcome and counts a visit), `/health` (says it is alive) and anything else (not found). The count is saved in a file.

You do not need to understand every line. Read it once and notice the two **settings** it takes from outside: `CAFE_NAME` and `COUNT_FILE`.

**What you should see:** `app.py is valid`.

**If yours looks different:** a `SyntaxError` means part of the box was missed when copying. Delete `app.py` and copy the whole box again.

## Step 6: Write the Dockerfile

**Why this matters:** the **Dockerfile** is the recipe for the image. Each line adds a layer.

**Run it:**

```bash
cat > Dockerfile <<'EOF'
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
EXPOSE 8000
CMD ["python", "app.py"]
EOF
cat > .dockerignore <<'EOF'
.git
.env
__pycache__
*.log
EOF
cat Dockerfile
```

**What it does:**

- `FROM` picks the starting image: Python, slim version.
- `WORKDIR` sets the working folder inside the image.
- `COPY app.py .` copies your program into the image.
- `EXPOSE 8000` **documents** the port. It does not publish it.
- `CMD` is what runs when a container starts.
- `.dockerignore` lists files to keep **out** of the image, such as `.git` and `.env` (which may hold secrets).

**What you should see:** the Dockerfile printed back.

## Step 7: Build the image

**Run it:**

```bash
docker build -t cafe-welcome:1.0 .
docker image ls cafe-welcome
```

**What it does:** `build` reads the Dockerfile and creates an image. `-t` gives it a name and a tag. The final `.` means "use this folder".

**What you should see:** build steps ending in `naming to docker.io/library/cafe-welcome:1.0`, then a table showing `cafe-welcome   1.0` and its size.

**If yours looks different:** `no such file or directory` for the Dockerfile means you are in the wrong folder. Run `pwd` and `cd ~/practice/cafe-docker`.

## Step 8: Run your image

**Run it:**

```bash
docker run -d --name welcome -p 8000:8000 cafe-welcome:1.0
sleep 2
curl -s localhost:8000/
curl -s localhost:8000/
curl -s localhost:8000/health
```

**What it does:** starts a container from **your** image and publishes port 8000.

**What you should see:**

```text
Welcome to Coraxshift Net Café! Visits so far: 1
Welcome to Coraxshift Net Café! Visits so far: 2
{"status": "ok"}
```

Read the logs:

```bash
docker logs welcome
```

**What you should see:** `Welcome board listening on port 8000` and a line for each request.

## Step 9: Meet the problem

**Why this matters:** containers are disposable, but your **data** might not be. Watch what happens to the visit count.

**Run it:**

```bash
docker rm -f welcome
docker run -d --name welcome -p 8000:8000 cafe-welcome:1.0
sleep 2
curl -s localhost:8000/
```

**What it does:** `rm -f` force-removes the running container, then we start a brand new one.

**What you should see:**

```text
Welcome to Coraxshift Net Café! Visits so far: 1
```

The count started again from **1**. The old container took its data with it. In Class 2 you fix this with a **volume**.

Clean up for now:

```bash
docker rm -f welcome
```

## Step 10: Save your work

**Run it:**

```bash
git add app.py Dockerfile .dockerignore
git commit -m "Add welcome board and Dockerfile"
git status --short
```

**What you should see:** a commit message, then nothing.

**If yours looks different:** if Git asks who you are, set your name and email as in the Git course.

## ✅ Recap

- An **image** is a package. A **container** is a running copy of it.
- `docker run` makes a container. `-d` backgrounds it, `-p` publishes a port, `--name` names it.
- `docker ps`, `logs`, `exec`, `stop`, `rm` let you see and control containers.
- A **Dockerfile** is the recipe: `FROM`, `WORKDIR`, `COPY`, `EXPOSE`, `CMD`.
- A **tag** names a version. Use a specific one, such as `1.0`.
- A **`.dockerignore`** keeps junk and secrets out of the image.
- Removing a container removes its data. Class 2 fixes that.

## 📤 Push to your portfolio

In your portfolio repository, create `docker/class-1/` and add:

1. Your `app.py`, `Dockerfile` and `.dockerignore`, changed to use **your own** welcome message
2. A `notes.md` answering: *What is the difference between an image and a container? What does `-p 8000:8000` do? Why did the visit count restart?*

Next up: [Class 2: Volumes and Compose](class-2-volumes-and-compose.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-volumes-and-compose.md)</td></tr></table>
