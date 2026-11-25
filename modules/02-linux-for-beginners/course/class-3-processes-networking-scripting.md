# Class 3: Processes, Networking, Your First Script and Your First Web Page

**Linux for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to Class 3

You can find your way around and set things up. Today you learn to **keep a server healthy**: see what is running, stop a program safely, check the network, automate a health check with your first script, and serve your first web page. This is the class where it starts to feel like real engineering.

**By the end of this class you can:**

- List running programs (processes) and find one by name
- Start a practice process and stop it safely with `kill`
- Check network interfaces, internet access and listening ports
- Write and run a shell script
- Serve a web page with Nginx and open it in your browser

## Prerequisites

- [Class 2](class-2-files-permissions-users.md) completed, including **Nginx installed** (`nginx -v` prints a version)
- Your Codespace open with a terminal

## Step 0: Home base and start Nginx

**Why this matters:** Codespaces don't start Nginx for you. Like opening a shop in the morning, you unlock the door before customers arrive.

**Run it:**

```bash
cd /workspaces/linux-for-beginners
sudo service nginx start
sudo service nginx status
```

**What each command does:** `service nginx start` starts the Nginx web server. `service nginx status` asks whether it is running.

**What you should see:**

```text
 * Starting nginx nginx
   ...done.
 * nginx is running
```

**If yours looks different:**

- `nginx: unrecognized service`: Nginx isn't installed. Run `sudo apt update && sudo apt install -y nginx` (Class 2, Step 2).
- `Starting nginx ... fail`: run `sudo nginx -t` to find the problem (see [Troubleshooting](troubleshooting.md)).
- Remember: in Codespaces we use `service`, not `systemctl`.

## Step 1: See what is running

**Why this matters:** a **process** is a program running right now. If a server is a kitchen, processes are the cooks. When something is slow or broken, you first check who is in the kitchen.

**Run it:**

```bash
ps aux | head -n 5
pgrep -a nginx
top -b -n 1 | head -n 12
```

**What each command does:**

| Command | What it does |
|---|---|
| `ps aux` | Lists **every** process with its owner, ID and memory use |
| `\| head -n 5` | The `\|` (pipe) passes the output to `head`, which shows only the first 5 lines |
| `pgrep -a nginx` | Finds processes by name and shows their **PID** (process ID) and full command |
| `top -b -n 1 \| head -n 12` | A snapshot of the busiest processes. `-b` prints plain text, `-n 1` takes one snapshot instead of updating live. |

**What you should see** (trimmed):

```text
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.6  23044 13984 ?        Ss   22:13   0:00 /sbin/init
...
8208 nginx: master process /usr/sbin/nginx
8209 nginx: worker process
8210 nginx: worker process
top - 23:16:56 up  1:02,  0 user,  load average: 0.03, 0.01, 0.00
Tasks:  82 total,   2 running,  80 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1982.8 total,    377.1 free,    252.0 used,   1538.3 buff/cache
...
```

Nginx has one **master** (the head chef, running as `root`) and one or more **workers** (the cooks, running as `www-data`) that actually serve pages.

**If yours looks different:**

- Your PIDs and the number of workers will differ. That's normal.
- `pgrep -a nginx` prints nothing: Nginx isn't running. Go back to Step 0.
- If you ran `top` without `-b -n 1`, it keeps updating. Press **q** to quit.

## Step 2: Stop a process safely with kill (practice drill)

**Why this matters:** sometimes a program freezes or uses too much memory and you have to stop it. `kill` sends a polite "please stop" signal to one process. We practise on a harmless `sleep` process you start yourself, never on someone else's work.

**Run it** one line at a time:

```bash
sleep 300 &
pgrep -a sleep
```

Now copy the number (the PID) from the `pgrep` line and use it in place of `12345`:

```bash
kill 12345
pgrep -a sleep
```

**What each command does:**

| Command | What it does |
|---|---|
| `sleep 300 &` | Starts a program that does nothing for 300 seconds. `&` runs it **in the background**, so you get your prompt back. |
| `pgrep -a sleep` | Finds it and shows its PID |
| `kill <PID>` | Sends the *terminate* signal (SIGTERM) to that one process: "please finish up and stop" |
| `pgrep -a sleep` again | Checks it is gone. No output means nothing matched. |

**What you should see** (real terminal, your numbers will differ):

```text
$ sleep 300 &
[1] 8378
$ pgrep -a sleep
8378 sleep 300
$ kill 8378
$ pgrep -a sleep
[1]+  Terminated              sleep 300
```

`[1] 8378` means *background job number 1 has PID 8378*. `Terminated` confirms it stopped; it may appear straight after `kill` or after your next command. The final `pgrep` prints nothing because no `sleep` process is left.

**If yours looks different:**

- `kill: (12345) - No such process`: you typed the example number. Use the PID from **your** `pgrep` line.
- `Operation not permitted`: that process belongs to another user. Stop. Only kill processes you started.
- A process that ignores `kill` can be forced with `kill -9 <PID>`, but that gives it no chance to save its work. Use it only as a last resort, and never on unknown processes.

## Step 3: Check the network

**Why this matters:** most "the website is down" problems are network problems. A **port** is a numbered door on a server: web traffic uses door **80**, secure web traffic uses **443**. These commands check the doors, the hallway and the street.

**Run it:**

```bash
ip a
ip route
ping -c 4 google.com
curl -I https://google.com
sudo ss -tulpn
curl -I http://localhost
```

**What each command does:**

| Command | What it does |
|---|---|
| `ip a` | Lists network interfaces (network cards) and their IP addresses. `lo` is the computer talking to itself. |
| `ip route` | Shows the *default route*: where traffic goes to reach the internet |
| `ping -c 4 google.com` | Sends 4 small test messages and waits for replies. `-c 4` means *count 4*. |
| `curl -I https://google.com` | Asks Google for just the response **headers** (`-I`). A second way to test internet access. |
| `sudo ss -tulpn` | Lists ports that are **l**istening: **t**CP, **u**DP, with the **p**rocess name, as **n**umbers |
| `curl -I http://localhost` | Asks your own Nginx for its headers. `localhost` means *this computer*. |

**What you should see** (trimmed):

```text
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
...
default via 169.254.0.22 dev eth0
...
4 packets transmitted, 4 received, 0% packet loss, time 3041ms
HTTP/2 301
location: https://www.google.com/
...
Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
tcp   LISTEN 0      511          0.0.0.0:80         0.0.0.0:*    users:(("nginx",pid=8210,fd=5),("nginx",pid=8209,fd=5),("nginx",pid=8208,fd=5))
tcp   LISTEN 0      511             [::]:80            [::]:*    users:(("nginx",pid=8210,fd=6),("nginx",pid=8209,fd=6),("nginx",pid=8208,fd=6))
...
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
Content-Type: text/html
...
```

The key line in `ss` is **`0.0.0.0:80 ... nginx`**: Nginx is listening on door 80. The key line from `curl` is **`200 OK`**: Nginx answered successfully.

**If yours looks different:**

- **`ping` shows `100% packet loss`.** ✅ That's normal in Codespaces: the network often blocks ping messages. Use `curl -I https://google.com` instead. Any `HTTP/...` reply (such as `301`) proves you have internet access.
- Your IP addresses and interface names (`eth0`, `ens5` and so on) will differ.
- `ss` shows other ports you don't recognise (Codespaces runs its own helpers). **Write them down; don't stop them.** A listener on port 22 may or may not appear. Codespaces doesn't need your own SSH server.
- `curl: (7) Failed to connect to localhost port 80`: Nginx isn't running. Go back to Step 0.

## Step 4: Check system information

**Why this matters:** when you report a problem, engineers ask "which server, which version, how full?" These commands are your server's ID card and health report.

**Run it:**

```bash
hostname
lsb_release -a
uptime
free -h
df -h /
sudo du -sh /var/* | sort -h
```

**What each command does:**

| Command | What it does |
|---|---|
| `hostname` | The computer's name |
| `lsb_release -a` | The Linux distribution and version |
| `uptime`, `free -h`, `df -h /` | Time on, memory, disk (from Class 1) |
| `sudo du -sh /var/* \| sort -h` | **D**isk **u**sage of each folder in `/var`, **s**ummarised and **h**uman-readable, then sorted smallest to largest |

**What you should see** (trimmed):

```text
Distributor ID: Ubuntu
Description:    Ubuntu 24.04.5 LTS
Release:        24.04
Codename:       noble
...
4.0K    /var/www
341K    /var/log
141M    /var/cache
204M    /var/lib
```

**If yours looks different:**

- `No LSB modules are available.` above the output is harmless.
- Your sizes will differ. On a real server, a huge `/var/log` is a warning sign: logs may need cleaning up.

## Step 5: Write your first shell script

**Why this matters:** a **shell script** is a recipe: a file of commands that runs top to bottom. Instead of typing five health checks every morning, you type one command. This is where automation begins.

**Run it:**

```bash
nano practice/lab/check.sh
```

Paste this inside nano, then save with **Ctrl + O**, **Enter**, **Ctrl + X**:

```bash
#!/bin/bash
echo "Checking my Linux server..."
uptime
free -h
df -h /
curl -I http://localhost
```

Now try to run it:

```bash
./practice/lab/check.sh
```

**🔧 Build, break, fix:** you should see an error:

```text
bash: ./practice/lab/check.sh: Permission denied
```

That's on purpose. New files are not runnable. Check the permissions, add e**x**ecute, and try again:

```bash
ls -l practice/lab/check.sh
chmod +x practice/lab/check.sh
ls -l practice/lab/check.sh
./practice/lab/check.sh
```

**What each command does:**

| Command or line | What it does |
|---|---|
| `#!/bin/bash` | The *shebang*: tells Linux to run this file with Bash |
| `echo "..."` | Prints a message |
| `chmod +x file` | Adds e**x**ecute permission so the file can be run |
| `./practice/lab/check.sh` | Runs the script. `./` means *starting from this folder*. |

**What you should see** (trimmed):

```text
-rw-rw-r-- 1 codespace codespace 95 Nov 19 23:17 practice/lab/check.sh
-rwxrwxr-x 1 codespace codespace 95 Nov 19 23:17 practice/lab/check.sh
Checking my Linux server...
 23:17:19 up  1:03,  0 user,  load average: 0.02, 0.01, 0.00
               total        used        free      shared  buff/cache   available
Mem:           1.9Gi       263Mi       365Mi       1.1Mi       1.5Gi       1.7Gi
...
Filesystem      Size  Used Avail Use% Mounted on
-                38G  7.9G   30G  22% /
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
...
```

Notice the `x` letters that appeared in `-rwxrwxr-x`. That's the change you made.

**If yours looks different:**

- `No such file or directory` when running: you are not in the course folder. Run `cd /workspaces/linux-for-beginners`.
- `curl: (7) Failed to connect`: Nginx is stopped. Run `sudo service nginx start`.
- Strange characters or `command not found` on the first line: the shebang must be the very first line, exactly `#!/bin/bash`.

## Step 6: Serve your first web page

**Why this matters:** this is the moment Linux becomes the internet. Nginx is a waiter: a browser asks for a page, and Nginx fetches it from the **web root** (`/var/www/html`) and serves it.

**Run it** (replace `Your Display Name` with a nickname you're happy to show):

```bash
ls -l /var/www/html
echo '<h1>Hello from my Linux server</h1><p>Made by: Your Display Name</p>' | sudo tee /var/www/html/index.html
sudo chmod 755 /var/www/html
sudo chmod 644 /var/www/html/index.html
ls -l /var/www/html
sudo nginx -t
sudo service nginx restart
curl http://localhost
```

**What each command does:**

| Command | What it does |
|---|---|
| `ls -l /var/www/html` | Shows what is in the web root before you change it |
| `echo '...' \| sudo tee file` | Writes your HTML into a file that needs admin rights. `tee` writes what it receives into the file and also prints it. |
| `sudo chmod 755 /var/www/html` | Makes sure everyone, including Nginx, can enter the folder |
| `sudo chmod 644 .../index.html` | Makes sure everyone can read the page, and only root can change it |
| `sudo nginx -t` | **Tests** Nginx's settings. Always test before you restart. |
| `sudo service nginx restart` | Restarts Nginx |
| `curl http://localhost` | Fetches your page, like a browser would |

**What you should see:**

```text
-rw-r--r-- 1 root root 615 Nov 19 23:16 index.nginx-debian.html
<h1>Hello from my Linux server</h1><p>Made by: Your Display Name</p>
-rw-r--r-- 1 root root  65 Nov 19 23:17 index.html
-rw-r--r-- 1 root root 615 Nov 19 23:16 index.nginx-debian.html
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
 * Restarting nginx nginx
   ...done.
<h1>Hello from my Linux server</h1><p>Made by: Your Display Name</p>
```

The `chmod` commands didn't change anything this time, because Ubuntu already set the safe defaults (`755` folder, `644` file). Running them confirms it. Nginx picks `index.html` before the default `index.nginx-debian.html` page, so your page is shown instead.

**See it in your browser:**

1. Open the **Ports** tab at the bottom of VS Code.
2. If port **80** isn't listed, click **Forward a Port** and type `80`.
3. Check that its **Visibility** says **Private**. (Right-click → Port Visibility → Private.)
4. Hover over the **Forwarded Address** and click the 🌐 globe icon.

Your page opens in a new tab. 🎉 That address is a private tunnel to your Codespace. It is not a public IP address and not a cloud firewall.

**If yours looks different:**

- You still see *Welcome to nginx!*: refresh the browser, or check `ls -l /var/www/html` shows `index.html`.
- `403 Forbidden`: check permissions with `namei -l /var/www/html/index.html`. Every folder needs `x` for others and the file needs `r`. Never use `777`.
- `nginx: [emerg] ...` from `nginx -t`: read the file and line number in the message, then see [Troubleshooting](troubleshooting.md).
- The browser asks you to sign in to GitHub: that's the Private port protecting your page. Sign in with the same account.

## ✅ Recap

- A **process** is a running program. `ps aux`, `pgrep -a <name>` and `top` show them.
- `kill <PID>` politely stops one process. Only kill processes you started.
- `ip a`, `ip route`, `curl -I` and `ss -tulpn` check the network. Ping may be blocked in Codespaces; curl is your backup.
- A shell script starts with `#!/bin/bash` and needs `chmod +x` to run.
- Nginx serves files from `/var/www/html`. Always `sudo nginx -t` before restarting.

## 📤 Push to your portfolio

In your portfolio repository, add:

1. Your `check.sh` script
2. A short note: what does `kill` do, and why should you never kill a process you don't recognise?
3. A screenshot of your web page in the browser (no private details in it)

## Role plays (15 minutes each)

Practise explaining what you did, out loud:

- [Role play 2: Explain Nginx to a shop owner](role-play-explain-nginx.md)
- [Role play 3: On-call engineer: "the site is slow"](role-play-on-call.md)

You've finished all three classes. 👏 Next: the [assignments](assignments-overview.md), where you deploy real open-source software.

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-files-permissions-users.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignments overview ➡️](assignments-overview.md)</td></tr></table>
