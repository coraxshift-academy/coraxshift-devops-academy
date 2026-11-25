<div align="center">

![Linux for Beginners](assets/banner.svg)

[![Course](https://img.shields.io/badge/course-Linux%20for%20Beginners-a3e635?style=for-the-badge&labelColor=0b1020)](GETTING-STARTED.md)
[![Level](https://img.shields.io/badge/level-complete%20beginner-38bdf8?style=for-the-badge&labelColor=0b1020)](course/00-overview.md)
[![Time](https://img.shields.io/badge/time-about%2010.5%20hours-f59e0b?style=for-the-badge&labelColor=0b1020)](#-how-long-it-takes)
[![Cost](https://img.shields.io/badge/cloud%20cost-%240-22c55e?style=for-the-badge&labelColor=0b1020)](GETTING-STARTED.md)

### 👋 Never used Linux before? You are in exactly the right place.

**Coraxshift DevOps Academy** · *Learn. Build. Deploy. Grow.*

[🚀 Get started](GETTING-STARTED.md) · [📖 Course overview](course/00-overview.md) · [🆘 Troubleshooting](course/troubleshooting.md) · [🌐 Website](https://coraxshift-academy.github.io/)

</div>

---

## 🎯 What you will be able to do

| | |
|---|---|
| 🧭 **Navigate** | Find your way around a Linux server and manage files with confidence |
| 🔐 **Secure** | Install software and set permissions and ownership safely |
| 🔎 **Investigate** | Find running programs, check ports and stop a process safely |
| 🎮 **Deploy** | Put the open-source **[2048](https://github.com/gabrielecirulli/2048)** game on the web with **Nginx** |
| 📡 **Monitor** | Run **[Uptime Kuma](https://github.com/louislam/uptime-kuma)** behind Nginx and catch outages |
| 🛠️ **Recover** | Break things on purpose and fix them calmly, like an on-call engineer |
| 💼 **Show it** | Present all of it in your own portfolio |

> [!NOTE]
> No cloud account, no costs, no powerful laptop and no experience needed. Everything runs in your web browser.

## ⏱️ How long it takes

3 classes (2 hours each) + 3 assignments (about 4 hours) + a quiz = **about 10.5 hours in total**. Go at your own pace.

## 🗺️ Course map

| Step | What you do | Time |
|:--|:--|--:|
| 📘 Overview | [Welcome, goals, safety rules](course/00-overview.md) | 10 min |
| 🐧 Class 1 | [Meet Linux, check your system, find your way around](course/class-1-linux-intro.md) | 2 h |
| 🔑 Class 2 | [Editors, installing software, permissions, ownership, users, archives](course/class-2-files-permissions-users.md) | 2 h |
| ⚙️ Class 3 | [Processes, networking, your first script and web page](course/class-3-processes-networking-scripting.md) | 2 h |
| 🧩 Assignments | [Overview and architecture](course/assignments-overview.md) | 5 min |
| 🎮 Assignment A | [Deploy the 2048 game with Nginx](course/assignment-a-2048-nginx.md) | 60 min |
| 📡 Assignment B | [Operations and recovery drill with Uptime Kuma](course/assignment-b-operations-drill.md) | 105 min |
| 💼 Assignment C | [Your portfolio page](course/assignment-c-static-portfolio.md) | 60 min |
| 🎭 Role plays | [Explain Nginx](course/role-play-explain-nginx.md) · [On-call: "the site is slow"](course/role-play-on-call.md) | 30 min |
| 📝 Quiz | [12 questions, 90% earns the badge](course/quiz.md) | 20 min |
| 🏁 Finish | [Recap and what's next](course/recap-and-whats-next.md) | 10 min |
| 🆘 Stuck? | [Troubleshooting](course/troubleshooting.md) | any time |

> [!TIP]
> Work through the steps **in order**. Each class starts with `cd /workspaces/linux-for-beginners`, so every command runs from the same place.

## 🛡️ Safety rules

- Keep forwarded ports **Private** unless your instructor says otherwise.
- Never use `chmod 777`. Move files aside instead of deleting them. Test with `sudo nginx -t` before restarting.
- Never stop a process you do not recognise.
- Keep your email, full legal name, passwords, tokens and keys out of screenshots, demo apps and Git.
- Save your work in **your own portfolio repository**, not in this course repository.
- If a command fails, check [Troubleshooting](course/troubleshooting.md) first, then ask your instructor.

## 📁 What is in this repository

```text
README.md             you are here
GETTING-STARTED.md    open your Codespace and check your tools
course/               classes, assignments, role plays, quiz, troubleshooting, images
```

The open-source apps are downloaded during the assignments. They are not stored here.

## 🙏 Open-source credits

- [2048](https://github.com/gabrielecirulli/2048) by Gabriele Cirulli, MIT License
- [Uptime Kuma](https://github.com/louislam/uptime-kuma) by Louis Lam and contributors, MIT License (tested with version 2.5.12)
- [Nginx](https://nginx.org/), installed from Ubuntu's package repository

<div align="center">

**Coraxshift DevOps Academy** · Learn. Build. Deploy. Grow. 🐦‍⬛

Course material © 2026 Coraxshift DevOps Academy. For enrolled students only.

</div>
