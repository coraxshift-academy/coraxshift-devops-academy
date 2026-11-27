# Assignment C: Your Portfolio Page

**Linux for Beginners · Coraxshift DevOps Academy**

- ⏱️ **Time:** 60 minutes
- 📶 **Level:** Beginner
- 🖥️ **Where:** the same Codespace you used for Assignments A and B
- 📁 **Save your page and report in:** your own portfolio repository

## 🎯 The goal

You've deployed a game and operated a monitoring tool. Now you build something that is **yours**: a simple web page that tells the world what you learned and links to your work. You'll serve it with Nginx at `http://localhost/portfolio/`, right next to 2048, without disturbing it.

It's like adding a new shelf to a shop: the new shelf gets its own space, and everything already on display stays exactly where it is.

```text
http://localhost/2048/       -> /var/www/html/2048/        (Assignment A)
http://localhost/portfolio/  -> /var/www/html/portfolio/   (this assignment)
http://localhost:8080/       -> Nginx -> Uptime Kuma       (Assignment B)
```

## 💰 Cost and cleanup

| | |
|---|---|
| **Cost** | $0. A static page costs nothing to serve from your Codespace. |
| **Clean up** | Remove any test files you created outside your portfolio folder, then stop the Codespace. |

## Prerequisites

- [Assignment A](assignment-a-2048-nginx.md) completed (2048 served at `/2048/`)
- [Assignment B](assignment-b-operations-drill.md) completed (so you have something to write about)
- Your own **portfolio repository** on GitHub

## Where to write the page

Your page belongs in **your portfolio repository**, not in this course repository. Two options:

- **Option A (recommended):** clone your portfolio repo into the Codespace, for example `cd ~ && git clone https://github.com/<your-username>/<your-portfolio>.git`, and work inside it.
- **Option B:** work in a temporary folder (`~/portfolio-site`), then copy the finished `index.html` into your portfolio repo before you submit.

## Task 1: Write your page

**Why this matters:** a page you wrote yourself, explaining what you did, is the strongest evidence a hiring manager can see.

**Run it** (Option B shown; with Option A, run `mkdir` and `cd` inside your portfolio repo instead):

```bash
mkdir -p ~/portfolio-site
cd ~/portfolio-site
nano index.html
```

Paste this starter page into nano. Then make it yours: change the display name (an alias is fine) and rewrite the bullet points in your own words.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Linux Learning Shelf</title>
    <style>
      body { background: #f7f4ed; color: #293d34; font: 1rem/1.6 system-ui, sans-serif; margin: 0; }
      main { margin: 3rem auto; max-width: 46rem; padding: 2rem; }
      section { background: white; border-radius: 1rem; margin-top: 1.5rem; padding: 1.5rem; }
      a { color: #245c46; }
    </style>
  </head>
  <body>
    <main>
      <p>Coraxshift DevOps Academy / Linux for Beginners</p>
      <h1>My Linux Learning Shelf</h1>
      <p>Made by: Your display name</p>
      <section>
        <h2>What I built</h2>
        <ul>
          <li>Deployed the open-source <a href="/2048/">2048 game</a> with Nginx on Ubuntu.</li>
          <li>Ran <a href="https://github.com/louislam/uptime-kuma">Uptime Kuma</a> behind an Nginx reverse proxy and used it to monitor my 2048 site.</li>
          <li>Practised recovering from a missing deployment, a crashed process and a broken config.</li>
        </ul>
      </section>
      <section>
        <h2>What I learned</h2>
        <p>Write two or three sentences in your own words.</p>
      </section>
      <p>Learn. Build. Deploy. Grow.</p>
    </main>
  </body>
</html>
```

Save (**Ctrl + O**, **Enter**, **Ctrl + X**), then check it:

```bash
cat index.html | head -n 5
```

**What each command does:** `mkdir -p` creates the folder, `nano` writes the file, `cat ... | head -n 5` shows the first 5 lines so you know it saved.

**What you should see:**

```text
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
```

**About the links:** `/2048/` is a *relative* link: it works because the game lives on the same server and port. Uptime Kuma lives on a different port (8080), and every Codespace's address is different, so we link to its project page instead. Add your Uptime Kuma screenshots to your portfolio repo to show it running.

**If yours looks different:** an empty result means the file didn't save. Open it with nano again and save with **Ctrl + O**.

## Task 2: Deploy it to its own Nginx folder

**Why this matters:** you're repeating the safe deployment pattern from A: own folder, read-only for Nginx, test first. Repetition is how it becomes second nature.

**Run it** from the folder that contains your `index.html`:

```bash
sudo install -d -m 755 /var/www/html/portfolio
sudo cp index.html /var/www/html/portfolio/index.html
ls -lah /var/www/html/portfolio/
sudo nginx -t
```

**What each command does:**

| Command | What it does |
|---|---|
| `sudo install -d -m 755 /var/www/html/portfolio` | Creates the page's own folder, readable by everyone |
| `sudo cp index.html /var/www/html/portfolio/index.html` | Copies your page in |
| `ls -lah /var/www/html/portfolio/` | Confirms it's there with `-rw-r--r--` permissions |
| `sudo nginx -t` | Confirms Nginx's settings are still valid |

**What you should see:**

```text
total 4.0K
drwxr-xr-x 2 root root   60 Nov 19 23:23 .
drwxr-xr-x 4 root root  128 Nov 19 23:23 ..
-rw-r--r-- 1 root root 1.6K Nov 19 23:23 index.html
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**If yours looks different:** `cp: cannot stat 'index.html'` means you're in a different folder. `cd` to where you saved the page and try again.

## Task 3: Prove every site still works

**Why this matters:** a good engineer checks they didn't break anything else while adding something new.

**Run it:**

```bash
curl -sS -o /dev/null -w 'Portfolio HTTP %{http_code}\n' http://localhost/portfolio/
curl -sS -o /dev/null -w '2048 HTTP %{http_code}\n' http://localhost/2048/
curl -sS -o /dev/null -w 'Uptime Kuma HTTP %{http_code}\n' http://localhost:8080/
ls /var/www/html
```

**What each command does:** each `curl` prints the status code for one site; `ls` shows each app sitting in its own folder in the web root.

**What you should see:**

```text
Portfolio HTTP 200
2048 HTTP 200
Uptime Kuma HTTP 302
2048  index.html  index.nginx-debian.html  portfolio
```

`302` for Uptime Kuma is healthy: it's redirecting you to its dashboard (or login page). If Uptime Kuma is stopped you'll see `502`; start it again with the commands in [Assignment B, Task 3](assignment-b-operations-drill.md#task-3-start-uptime-kuma-as-a-background-process) if you want it running.

Now open your forwarded **port 80** address in the browser and visit **`/portfolio/`**. Click your 2048 link to check it works. Keep the port Private.

**If yours looks different:**

| You see | Likely reason | Safe next step |
|---|---|---|
| Portfolio `404` | Wrong folder or file name | `ls -lah /var/www/html/portfolio/` should show `index.html` |
| Portfolio `403` | A folder or file isn't readable | `namei -l /var/www/html/portfolio/index.html`. Never use `chmod 777`. |
| 2048 stopped working | Something replaced or moved its folder | Keep each site in its own folder; never replace `/var/www/html` itself. Redo A Task 3 if needed. |
| `nginx -t` fails | A typo in an Nginx config file | Read the file and line in the message. Don't restart until it passes. |

## 📤 Submit and reflect

In your portfolio repository, save:

1. Your `index.html`
2. A screenshot of your page in the browser (no private details)
3. The output of Task 3
4. Answers in your own words:
   - Which folder does Nginx serve your page from?
   - How did you prove 2048 and Uptime Kuma still worked after adding your page?
   - What's the difference between serving your single HTML file, the 2048 game, and Uptime Kuma?

Posting on social media is optional. If you do post, check your screenshot has no personal details or secrets.

## ✅ Recap

- Each site gets its **own folder**, so adding one never breaks another.
- Static pages (your page and 2048) are files Nginx reads directly. Uptime Kuma is a **running app** Nginx forwards visitors to.
- Check *every* site after a change, not just the new one.

🎉 **You've finished all three assignments.** Next: the [quiz](quiz.md), then your [recap and what's next](recap-and-whats-next.md).

---

<table width="100%"><tr><td align="left">[⬅️ Assignment B](assignment-b-operations-drill.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play: Nginx ➡️](role-play-explain-nginx.md)</td></tr></table>
