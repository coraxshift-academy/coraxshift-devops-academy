# Course Overview

**Docker for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 👋 Welcome

Imagine a café where every computer is set up slightly differently: different software, different settings. A customer at seat 3 has a great experience. At seat 9, the same website misbehaves. Nobody knows why.

Now imagine every seat is set up **from the same sealed package**, so every one behaves identically.

That is **Docker**. It packs a program together with everything it needs, so it runs the same way on your laptop, on a friend's laptop and on a server.

| In the café | In Docker |
|---|---|
| The sealed, ready-to-use package | An **image** |
| One seat running that package | A **container** |
| The written recipe for the package | A **Dockerfile** |
| The shop that stores packages | A **registry** (Docker Hub) |
| A door on a seat that customers can use | A published **port** |
| A locker that keeps your things when a seat is wiped | A **volume** |
| One sheet that lists all the seats and how they connect | **Docker Compose** |

```text
Dockerfile (recipe) ─▶ image (package) ─▶ container (running copy) ─▶ volume keeps the data
```

> 📖 **From my café:** In my café, every customer computer had to give the same experience, whichever seat they sat at. I formatted systems and fixed everyday computer problems, and I learned that consistency matters more than clever tricks. Docker gives programs that consistency: the same package, the same behaviour, everywhere.

## 🎯 What you will be able to do

- Explain an image and a container in plain words
- Run, stop and remove a container
- Publish a port and read a container's logs
- Write a **Dockerfile** and build an image
- Keep data safe with a **volume**
- Run two services together with **Docker Compose**
- Make an image safer: **non-root user**, no secrets, clear tags
- Clean up without deleting things you need

## 🗺️ How the course works

| Step | What you do | Time |
|---|---|---|
| 📦 Class 1 | Images and containers | 2 h |
| 🧩 Class 2 | Volumes and Compose | 2 h |
| 🛡️ Class 3 | Safe images and cleanup | 2 h |
| 🏗️ Assignment | Package a small app | 2 to 3 h |
| 🎭 Role play | Explain it to a business owner | 15 min |
| 📝 Quiz | 12 questions, 90% earns the badge | 20 min |

Every step has five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, **If yours looks different**.

## ✅ Before you start

Take **Linux**, **Bash** and **Git and GitHub** first. You should be comfortable with folders, files, `cat` and `git commit`. Docker is already installed in your Codespace.

## 🛡️ Ground rules

- Practise only in your own Codespace.
- Read a command before you run it, especially anything that deletes.
- Never put passwords or keys inside an image or in Git.
- Clean up your containers when you finish.

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-images-and-containers.md)</td></tr></table>
