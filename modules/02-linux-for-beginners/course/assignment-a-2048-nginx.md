# Assignment A: Deploy the 2048 Game with Nginx

**Linux for Beginners · Coraxshift DevOps Academy**

- ⏱️ **Time:** 60 minutes
- 📶 **Level:** Beginner
- 🖥️ **Where:** your Ubuntu Codespace. No cloud account, no public IP.
- 📁 **Save your report and screenshots in:** your own portfolio repository

## 🎯 The goal

You will take **2048**, a real open-source game played by millions of people, download its source code from GitHub, and put it on your own Nginx web server at `http://localhost/2048/`. Then you will play it in your browser through a Private forwarded port.

Think of it like opening a small arcade: you fetch the game cabinet (clone the code), put it in its own room (a dedicated folder), check the doors work (test with `curl`), then open for your first player: you.

```text
GitHub (2048 source) --git clone--> ~/apps/2048 --copy the game files--> /var/www/html/2048/ --Nginx--> your browser
```

**About the app:** [2048](https://github.com/gabrielecirulli/2048) was created by Gabriele Cirulli and is released under the **MIT License**, which allows anyone to use, copy and run it as long as the license notice stays with it. It is plain HTML, CSS and JavaScript, so there is nothing to compile: Nginx can serve it as it is.

## Prerequisites

- [Classes 1–3](00-overview.md) completed
- Nginx installed (Class 2) and the Ports tab used once (Class 3, Step 6)
- `git` available (it comes with every Codespace)

## What you will practise

- Downloading a real project with `git clone`
- Deploying only the files a browser needs into a dedicated web folder
- Keeping private project files (like `.git`) **out** of the web server
- Testing with `nginx -t` and `curl` before opening a browser

## Task 1: Check your lab

**Why this matters:** a pilot runs a checklist before take-off. You check your tools before you deploy.

**Run it:**

```bash
cd /workspaces/linux-for-beginners
cat /etc/os-release | head -n 1
nginx -v
git --version
sudo service nginx start
sudo service nginx status
```

**What each command does:**

| Command | What it does |
|---|---|
| `cat /etc/os-release \| head -n 1` | Shows just the first line: your Ubuntu version |
| `nginx -v` | Confirms Nginx is installed |
| `git --version` | Confirms Git is installed |
| `sudo service nginx start` | Starts Nginx (safe to run even if it's already running) |
| `sudo service nginx status` | Confirms it is running |

**What you should see:**

```text
PRETTY_NAME="Ubuntu 24.04.5 LTS"
nginx version: nginx/1.24.0 (Ubuntu)
git version 2.43.0
 * Starting nginx nginx
   ...done.
 * nginx is running
```

**If yours looks different:**

- A newer Git or Nginx version is fine.
- `nginx: command not found`: install it with `sudo apt update && sudo apt install -y nginx`.
- `Starting nginx ... fail`: run `sudo nginx -t` and read the error (see [Troubleshooting](troubleshooting.md)).

## Task 2: Download the 2048 source code

**Why this matters:** `git clone` is how engineers get a copy of any project's code. We keep apps in our own `~/apps` folder, outside the course repository, so the course stays clean, just as you'd keep your groceries out of the shop's stockroom.

**Run it:**

```bash
mkdir -p ~/apps
cd ~/apps
git clone https://github.com/gabrielecirulli/2048.git
cd ~/apps/2048
ls
head -n 3 LICENSE.txt
```

**What each command does:**

| Command | What it does |
|---|---|
| `mkdir -p ~/apps` | Creates an `apps` folder in your home folder. `~` is short for your home folder (`/home/codespace`). |
| `git clone <url>` | Downloads the whole project, including its history, into a new `2048` folder |
| `ls` | Lists the project's files |
| `head -n 3 LICENSE.txt` | Shows the first 3 lines of the license |

**What you should see:**

```text
Cloning into '2048'...
remote: Enumerating objects: 1318, done.
remote: Total 1318 (delta 0), reused 0 (delta 0), pack-reused 1318 (from 1)
Receiving objects: 100% (1318/1318), 624.25 KiB | 29.73 MiB/s, done.
Resolving deltas: 100% (767/767), done.
CONTRIBUTING.md  LICENSE.txt  README.md  Rakefile  favicon.ico  index.html  js  meta  style
The MIT License (MIT)

Copyright (c) 2014 Gabriele Cirulli
```

**What the files are:**

| File or folder | What it is | Does the browser need it? |
|---|---|---|
| `index.html` | The game page | ✅ Yes |
| `style/` | Colours, layout and fonts (CSS) | ✅ Yes |
| `js/` | The game logic (JavaScript) | ✅ Yes |
| `meta/`, `favicon.ico` | Icons | ✅ Yes |
| `LICENSE.txt` | The MIT license | ✅ Keep it with the game (the license asks for this) |
| `README.md`, `CONTRIBUTING.md`, `Rakefile` | Notes and tools for developers | ❌ No |
| `.git/` (hidden) | The project's full history and settings | ❌ **Never put this on a web server** |

**If yours looks different:**

- Numbers and download speed will differ.
- `fatal: destination path '2048' already exists`: you cloned it before. That's fine; carry on with `cd ~/apps/2048`.
- `Could not resolve host: github.com`: a network hiccup. Wait a minute and retry.

## Task 3: Deploy the game into its own Nginx folder

**Why this matters:** each app gets its own folder (its own room) so deploying one app never breaks another. And we copy **only** the files the browser needs. Copying the `.git` folder to a web server is a real-world security mistake: it can leak a project's entire history.

**Run it:**

```bash
sudo install -d -m 755 /var/www/html/2048
cd ~/apps/2048
sudo cp -r index.html favicon.ico js style meta LICENSE.txt /var/www/html/2048/
ls -lah /var/www/html/2048/
```

**What each command does:**

| Command | What it does |
|---|---|
| `sudo install -d -m 755 /var/www/html/2048` | Creates the folder (`-d`) with permissions `755` (`-m`): everyone can enter and read, only root can change it |
| `sudo cp -r <files> /var/www/html/2048/` | Copies the listed files and folders. `-r` (*recursive*) copies folders and everything inside them. |
| `ls -lah /var/www/html/2048/` | Lists the deployed files, including hidden ones, with readable sizes |

**What you should see:**

```text
total 24K
drwxr-xr-x 5 root root  128 Nov 19 23:17 .
drwxr-xr-x 3 root root  128 Nov 19 23:17 ..
-rw-r--r-- 1 root root 1.1K Nov 19 23:17 LICENSE.txt
-rw-r--r-- 1 root root 4.2K Nov 19 23:17 favicon.ico
-rw-r--r-- 1 root root 3.9K Nov 19 23:17 index.html
drwxr-xr-x 2 root root 4.0K Nov 19 23:17 js
drwxr-xr-x 2 root root 4.0K Nov 19 23:17 meta
drwxr-xr-x 3 root root  128 Nov 19 23:17 style
```

Notice: files are `-rw-r--r--` (`644`), folders are `drwxr-xr-x` (`755`), owner is `root`, and there is **no `.git`**. That's exactly what a safe deployment looks like.

**If yours looks different:**

- `cp: cannot stat 'index.html': No such file or directory`: you're not in `~/apps/2048`. Run `cd ~/apps/2048` and try again.
- You see a `.git` folder: you copied the whole project. Remove only that copy with `sudo rm -r /var/www/html/2048/.git` and double-check the path before pressing Enter.
- Don't use `chmod -R 777` to "fix" anything. Nginx only needs to *read* these files.

## Task 4: Test before you open the browser

**Why this matters:** engineers test from the server first. If `curl` works but the browser doesn't, you know the problem is the forwarded port, not Nginx. It halves the search.

**Run it:**

```bash
sudo nginx -t
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/2048/
curl -s http://localhost/2048/ | grep -o '<title>.*</title>'
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/2048/js/application.js
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/2048/.git/config
```

**What each command does:**

| Command | What it does |
|---|---|
| `sudo nginx -t` | Tests Nginx's configuration (it doesn't restart anything) |
| `curl -sS -o /dev/null -w 'HTTP %{http_code}\n' <url>` | Requests the page, throws the body away (`-o /dev/null`) and prints only the status code. `-sS` hides the progress bar but still shows errors. |
| `curl -s <url> \| grep -o '<title>.*</title>'` | Fetches the page and picks out its title |
| `.../js/application.js` | Checks a game file loads too, not just the page |
| `.../.git/config` | Proves the private `.git` folder is **not** on the web server |

**What you should see:**

```text
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
HTTP 200
<title>2048</title>
HTTP 200
HTTP 404
```

**`200` means OK. `404` means Not Found**, which is exactly what you want for `.git`. ✅

**If yours looks different:**

| You see | Likely reason | Safe next step |
|---|---|---|
| `HTTP 404` for `/2048/` | Files are in the wrong folder or the URL is misspelled | `ls -lah /var/www/html/2048/` should list `index.html` |
| `HTTP 403` | A folder or file isn't readable | `namei -l /var/www/html/2048/index.html` and check every line has `r` (and `x` for folders) for others. Never `777`. |
| `curl: (7) Failed to connect` | Nginx is stopped | `sudo service nginx start` |
| `HTTP 200` for `.git/config` | The `.git` folder was copied | See Task 3, "If yours looks different" |

## Task 5: Play it in your browser 🎮

**Why this matters:** this is the moment a real user would see your work.

1. Open the **Ports** tab in VS Code.
2. Make sure port **80** is forwarded and its **Visibility** is **Private**.
3. Open the forwarded address (🌐 icon), then add **`/2048/`** to the end of the address and press Enter. Keep the slash at the end.
4. Use your **arrow keys** to play. Join the numbers and aim for the 2048 tile!

**What you should see:**

![The 2048 game running from /var/www/html/2048 on Nginx, with a few tiles merged and the score at 16](images/2048-deployed.png)

*(Real screenshot from our test lab. Your tiles and score will be different.)*

**If yours looks different:**

- The page has no colours or the tiles don't move: the `style/` or `js/` folder is missing. Rerun Task 3, then refresh.
- The address changed (for example to one containing `localhost`) or won't load: you probably typed `/2048` without the final slash, so Nginx tried to redirect you. Go back to the forwarded address and add `/2048/` with the slash.
- `curl` works but the browser doesn't: check port 80 is still forwarded and Private.
- Don't make the port Public, open port 22 or look up a public IP for this exercise.

## 📤 Submit

In your portfolio repository, add a short report with:

1. Your Nginx and Git version outputs (Task 1)
2. The `ls -lah /var/www/html/2048/` output (Task 3)
3. The output of Task 4, showing `HTTP 200` for the game and `HTTP 404` for `.git/config`
4. A screenshot of 2048 running in your browser (no private details visible)
5. In your own words:
   - Where did Nginx find the game files?
   - Why did you copy only some files instead of the whole project?
   - How did you prove the deployment worked *before* opening the browser?

## ✅ Recap

- `git clone` downloads a project. Keep apps in your own folder (`~/apps`), not in the web root.
- Deploy **only** what the browser needs, into the app's **own** folder under `/var/www/html`.
- Never publish `.git`. Check it returns `404`.
- Test with `nginx -t` and `curl` first; open the browser second.

Next: [Assignment B: Operations and recovery drill with Uptime Kuma](assignment-b-operations-drill.md). Your 2048 game is about to get a bodyguard. 🛡️

---

<table width="100%"><tr><td align="left">[⬅️ Assignments overview](assignments-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment B ➡️](assignment-b-operations-drill.md)</td></tr></table>
