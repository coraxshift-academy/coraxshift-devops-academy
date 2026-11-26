# Linux for Beginners: Assignments Overview

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

## 🎯 What you will achieve

In the classes you practised on small examples. Now you run **real open-source software that real people use**, the same way engineers do at work:

1. **Deploy** a real game to the web
2. **Operate** a real monitoring tool, watch over your game, break things on purpose and recover
3. **Show** your work on your own portfolio page

When you finish, you can honestly say: *"I deployed and operated open-source apps on a Linux server with Nginx, and I practised incident recovery."* That sentence belongs on a CV.

## The three assignments

| Assignment | What you build | Real open-source app | Time |
|---|---|---|---:|
| [A: Deploy the 2048 game with Nginx](assignment-a-2048-nginx.md) | Clone a real project and serve it from its own Nginx folder | **2048** by Gabriele Cirulli ([MIT License](https://github.com/gabrielecirulli/2048/blob/master/LICENSE.txt)) | 60 min |
| [B: Operations and recovery drill](assignment-b-operations-drill.md) | Run a monitoring tool behind Nginx, watch 2048, then break and fix things safely | **Uptime Kuma** by Louis Lam ([MIT License](https://github.com/louislam/uptime-kuma/blob/master/LICENSE)) | 105 min |
| [C: Your portfolio page](assignment-c-static-portfolio.md) | Write and serve your own page that links to your work | Your own HTML | 60 min |

**Expected assignment time: about 4 hours.** Do them in order: each one builds on the last.

### Why these apps?

- **2048** is pure HTML, CSS and JavaScript with no build step, so you focus on Linux and Nginx, not on programming tools. And you can *play* it to prove it works.
- **Uptime Kuma** is a popular self-hosted monitoring tool. It runs as a long-lived process on a port, writes logs, stores data on disk and sits behind Nginx: everything an on-call engineer checks. It can also watch your 2048 site and tell you when it goes down.

Both use the MIT License, which allows anyone to use, copy and run them, as long as the license notice stays with the code.

## Prerequisites

- All three classes completed ([Class 1](class-1-linux-intro.md), [Class 2](class-2-files-permissions-users.md), [Class 3](class-3-processes-networking-scripting.md))
- A Codespace on this repository running Ubuntu (Nginx installed in Class 2)
- **Node.js 20.4 or newer** for Assignment B only (`node --version` to check; see [Getting Started](../GETTING-STARTED.md))
- About 1 GB of free disk space (`df -h /`). Uptime Kuma and its packages use about 300 MB.
- A separate portfolio repository on GitHub for your reports and screenshots

## Architecture: what you are building

```text
                                  Your Codespace (Ubuntu)
                       +-------------------------------------------------+
Your browser           |                                                 |
   |                   |   Nginx on port 80                              |
   +--Private port 80--+-->   /2048/       -> /var/www/html/2048/        |
   |                   |      /portfolio/  -> /var/www/html/portfolio/   |
   |                   |                                                 |
   +--Private port 8080+-->Nginx on port 8080 (reverse proxy)            |
                       |        |                                        |
                       |        +--> Uptime Kuma on 127.0.0.1:3001       |
                       |                 |                               |
                       |                 +-- checks http://localhost/2048/ every 20 s
                       +-------------------------------------------------+
```

In plain English: **Nginx is the front door.** It serves the 2048 game and your portfolio directly, and it passes visitors on port 8080 through to Uptime Kuma, which only listens on the inside (127.0.0.1). Uptime Kuma, in turn, keeps knocking on the 2048 door to check it is still open.

## House rules

1. Keep every forwarded port **Private**.
2. Use a nickname or alias in demos and screenshots. No email addresses, full legal names, passwords, tokens or keys.
3. Save reports, screenshots and your page in **your own portfolio repository**, not in this course repository.
4. If a step's output looks very different from the sample, stop and check [Troubleshooting](troubleshooting.md) before trying random fixes.

## Evidence and reflection

For each assignment, record:

- The commands you ran and the key result (copied text or screenshots)
- What you learned, **in your own words**. Screenshots prove you did it; your explanation proves you understood it.

Posting on LinkedIn is optional. A private portfolio entry counts just as much.

## Coming back later? Restart your lab

Codespaces stop when you're idle, and stopped programs don't restart on their own. When you come back:

```bash
cd /workspaces/linux-for-beginners
sudo service nginx start
cd ~/apps/uptime-kuma && nohup node server/server.js --host=127.0.0.1 > ~/uptime-kuma.log 2>&1 &
cd /workspaces/linux-for-beginners
```

The third line only applies once you have installed Uptime Kuma in B. Your files (2048, Uptime Kuma's data and your portfolio page) are kept while the Codespace exists.

## After the assignments

Take the [quiz](quiz.md), then read the [recap and what's next](recap-and-whats-next.md). In the next course, **Bash scripting**, you will turn the manual checks you did here into scripts that run for you. Learn the checks by hand first; automate them next.

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-processes-networking-scripting.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment A ➡️](assignment-a-2048-nginx.md)</td></tr></table>
