# Linux for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**
*A complete course on its own. No other course needed.*

## 👋 Welcome

If you have never typed a command into a computer before, you are in exactly the right place.

Almost every server on the internet runs Linux: the websites you visit, the apps on your phone, the cloud itself. Learning Linux is like learning to drive before you go on a road trip. Everything else in DevOps (Docker, the cloud, automation) sits on top of it.

By the end of this course you will have run your own Linux server, installed real software on it, put a real game on the web, watched over it with a real monitoring tool, broken things on purpose and fixed them calmly. No cloud account, no costs and no powerful laptop needed. Everything runs in your web browser.

Take your time. Every step tells you what to type, what it does, what you should see, and what to do if yours looks different. Getting an error is not failing. It is how every engineer learns.

## Who this course is for

- Complete beginners who have never used Linux or a terminal
- Career changers moving into DevOps, cloud or software engineering
- Developers who use Linux every day but never learned what is going on underneath

## What you will be able to do by the end

1. Move around a Linux system and create, copy, move and delete files with confidence
2. Install software with `apt` and use `sudo` safely
3. Read and change file permissions and ownership (`chmod`, `chown`) and explain them in plain English
4. Find running programs, check what is listening on a port, and stop a program safely with `kill`
5. Serve a real open-source app (the **2048** game) with the **Nginx** web server
6. Run a real monitoring tool (**Uptime Kuma**) behind Nginx and read its logs
7. Break things on purpose in a safe way, then recover like an on-call engineer
8. Write your first shell script
9. Show all of this in your own portfolio

## How long it takes

| Part | Time |
|---|---|
| 3 classes (2 hours each) | 6 hours |
| 3 assignments (A, B, C) | about 4 hours |
| Quiz and recap | about 30 minutes |
| **Total** | **about 10.5 hours**, spread over a week |

Go at your own pace. Faster is not better. Understanding is better.

## Prerequisites

You need:

- A computer with a modern web browser (Chrome, Edge, Firefox or Safari)
- A free GitHub account, with access to this course repository
- A GitHub Codespaces allowance (free accounts include monthly hours; check yours under GitHub **Settings → Billing**)
- About 2 hours of focus per class

You do **not** need:

- Any Linux or coding experience
- A cloud account (AWS, Azure, GCP), a credit card or a powerful laptop
- To install anything on your own computer

Not sure how to open a Codespace? Read [Getting Started](../GETTING-STARTED.md) first.

## Your lab: a Codespace

A Codespace is a Linux computer that GitHub lends you, inside your browser. Think of it as a **practice kitchen**: you can cook, make a mess and clean up, and nobody's dinner is ruined. It is not a production server, and it is not a cloud virtual machine (like AWS EC2).

```text
Your browser --(Private forwarded port)--> Codespace
                                             |
                                             +-- port 80   Nginx --> /2048/       (the 2048 game)
                                             |                   --> /portfolio/  (your page)
                                             +-- port 8080 Nginx --> Uptime Kuma (port 3001, local only)
```

## How the course works

| Step | What you do | Real-world skill |
|---|---|---|
| [Class 1](class-1-linux-intro.md) | Meet Linux, check your system, move around, create files | Finding your way on any server |
| [Class 2](class-2-files-permissions-users.md) | Edit files, install software, permissions, ownership, users, archives | Setting a server up safely |
| [Class 3](class-3-processes-networking-scripting.md) | Processes, `kill`, ports, networking, your first script and web page | Keeping a server healthy |
| [Assignment A](assignment-a-2048-nginx.md) | Deploy the **2048** game with Nginx | Deploying a real app |
| [Assignment B](assignment-b-operations-drill.md) | Run **Uptime Kuma**, monitor 2048, break and fix things | Being on call |
| [Assignment C](assignment-c-static-portfolio.md) | Publish your own portfolio page | Showing your work |
| [Role plays](role-play-explain-nginx.md) | Explain Nginx and an on-call check out loud | Talking to non-engineers |
| [Quiz](quiz.md) | 12 questions, 90% earns your badge | Proving it to yourself |
| [Recap and what's next](recap-and-whats-next.md) | Look back, then step into Bash scripting | Keep growing |

Stuck at any point? Open [Troubleshooting](troubleshooting.md). It lists the most common surprises and how to get past them.

## Safety rules (read these once, follow them always)

These are the same habits professional engineers use on real servers.

1. **Keep forwarded ports Private.** Only you should be able to open your apps. Make a port public only if your instructor approves it.
2. **Never use `chmod 777`.** It lets everyone change everything. There is always a safer answer.
3. **Move, don't delete.** When you practise a failure, move files aside so you can put them back.
4. **Test before you restart.** Run `sudo nginx -t` before you apply any Nginx change.
5. **Never kill a process you don't recognise.** Only stop the ones you started in this course.
6. **No secrets in screenshots or Git.** No passwords, tokens, keys, email addresses or full legal names.

## Codespaces uses `service`, not `systemctl`

Many Linux servers manage programs with `systemctl`. Codespaces runs inside a container that usually has no `systemd`, so in this course we use `service`:

```bash
sudo service nginx start     # start Nginx
sudo service nginx status    # is it running?
sudo nginx -t                # test the configuration before applying it
```

On a full virtual machine later in the DevOps path, you will use `sudo systemctl start nginx` instead. Same idea, different tool.

## Words you will meet

Don't memorise these now. Come back whenever a word feels new.

| Word | Plain English | Analogy |
|---|---|---|
| Linux | The operating system most servers run | The engine under the bonnet |
| Ubuntu | A popular, beginner-friendly version of Linux | One car brand that uses that engine |
| Terminal | The window where you type commands | Texting the computer |
| Command | An instruction you type | A text message with one job |
| Directory | A folder | A drawer |
| Package manager (`apt`) | Installs and updates software | An app store for your server |
| `sudo` | Run one command as the administrator | Borrowing the manager's key for one door |
| Permission | Who can read, change or run a file | Who has which key |
| Process | A program running right now | A cook working in the kitchen |
| Port | A numbered door for network traffic | Flat numbers in one building |
| Nginx | A web server: it hands web pages to browsers | A waiter bringing dishes to tables |
| Reverse proxy | A server that passes requests on to another app | A receptionist who forwards your call |
| Web root | The folder Nginx serves pages from (`/var/www/html`) | The serving counter |
| Log | A file that records what happened | A diary |

## Pass check

You have finished the course when you can:

- Navigate the file system and create, copy, move and delete files
- Explain `rwx`, `755`, `644` and `chown` in plain words
- Find a process, check its port and stop it safely
- Serve 2048 through Nginx and open it through a Private forwarded port
- Run Uptime Kuma behind Nginx and use it to spot an outage
- Recover from the practice failures in Assignment B
- Show your three assignment reports and evidence in your own portfolio repository
- Score 11 out of 12 or more in the quiz

## Official references

- [Ubuntu Server documentation](https://ubuntu.com/server/docs)
- [Nginx beginner's guide](https://nginx.org/en/docs/beginners_guide.html)
- [2048 source code (MIT License)](https://github.com/gabrielecirulli/2048)
- [Uptime Kuma source code (MIT License)](https://github.com/louislam/uptime-kuma)

Ready? Let's start with [Class 1](class-1-linux-intro.md). 🚀

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-linux-intro.md)</td></tr></table>
