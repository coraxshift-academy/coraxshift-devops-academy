<div align="center">

![Coraxshift DevOps Academy: Training and Mentorship for Career-Switchers](assets/banner.jpg)

# Monitoring and Observability for Beginners

[![Course](https://img.shields.io/badge/course-Monitoring%20for%20Beginners-a3e635?style=for-the-badge&labelColor=0b1020)](GETTING-STARTED.md)
[![Level](https://img.shields.io/badge/level-complete%20beginner-38bdf8?style=for-the-badge&labelColor=0b1020)](course/00-overview.md)
[![Time](https://img.shields.io/badge/time-about%2011%20hours-f59e0b?style=for-the-badge&labelColor=0b1020)](#️-how-long-it-takes)
[![Cost](https://img.shields.io/badge/cost%20to%20practise-%240-22c55e?style=for-the-badge&labelColor=0b1020)](GETTING-STARTED.md)

> **The code for this course is in [`lab/`](lab). A full Prometheus, Grafana, Loki and Alertmanager stack that starts with one command.**
> Start with [`lab/README.md`](lab/README.md): prerequisites, learning objectives, both the local and the cloud way to run it, expected output for every step, and cleanup.


### 👋 See what your systems are doing, and hear about trouble before your users do.

**Coraxshift DevOps Academy** · *Learn. Build. Deploy. Grow.*

[🚀 Get started](GETTING-STARTED.md) · [📖 Course overview](course/00-overview.md) · [🆘 Troubleshooting](course/troubleshooting.md) · [🌐 Website](https://coraxshift-academy.github.io/)

</div>

---

## 🎯 What you will be able to do

| | |
|---|---|
| 📊 **Measure** | Explain metrics, and read a counter, a gauge and a histogram |
| 🔎 **Collect** | Run **Prometheus** and check it is scraping your app |
| 🧮 **Ask** | Write basic **PromQL** questions: rate, sum by, and the 95th percentile |
| 📈 **Show** | Read and build **Grafana** dashboards that answer one question each |
| 🔔 **Alert** | Write an alert rule, test it, and watch it reach **Alertmanager** |
| 📜 **Investigate** | Search logs with **Loki** and connect them to a graph |
| 🧹 **Clean up** | Stop the whole lab and prove nothing is left running |
| 💼 **Show off** | Put your dashboard, alert and runbook in your portfolio |

> [!NOTE]
> No cost and no powerful laptop. You practise in a free Codespace in your browser. You do **not** need to be a programmer, and nothing here touches the cloud. Take **Linux**, **Bash**, **Git and GitHub** and **Docker for Beginners** first.

## ⏱️ How long it takes

3 classes (2 hours each) + an assignment (3 hours) + a role play, a quiz and a recap = **about 11 hours in total**. Go at your own pace.

## 🗺️ Course map

| Step | What you do | Time |
|:--|:--|--:|
| 📘 Overview | [Welcome, goals, how the course works](course/00-overview.md) | 10 min |
| 📊 Class 1 | [Metrics and Prometheus](course/class-1-metrics-and-prometheus.md) | 2 h |
| 📈 Class 2 | [Dashboards with Grafana](course/class-2-dashboards-grafana.md) | 2 h |
| 🔔 Class 3 | [Alerts and logs](course/class-3-alerts-and-logs.md) | 2 h |
| 🧩 Assignment | [Monitor a change to the shop](course/assignment-monitor-a-change.md) | 3 h |
| 🎭 Role play | [Explain monitoring to a shop owner](course/role-play-explain-monitoring.md) | 15 min |
| 📝 Quiz | [12 questions, 90% earns the badge](course/quiz.md) | 20 min |
| 🏁 Finish | [Recap and what's next](course/recap-and-whats-next.md) | 10 min |
| 🆘 Stuck? | [Troubleshooting](course/troubleshooting.md) | any time |

> [!TIP]
> Work through the steps **in order**. Type the commands yourself instead of only reading them.

## 🛡️ Safety rules

- Practise only in your own Codespace.
- Keep forwarded ports **Private**.
- The Grafana password in the lab is for **practice only**. Never reuse it anywhere real.
- Never put passwords, tokens or keys inside a file, a commit or a screenshot.
- Save your own work in **your own repositories**, not in this course repository.

## 📁 What is in this repository

```text
README.md             you are here
GETTING-STARTED.md    open your Codespace and check your tools
assets/               banner and logo
course/               classes, assignment, role play, quiz, troubleshooting
lab/                  the practice shop and the monitoring stack (Docker Compose)
scripts/              monitoring-check.sh, a self-check of your lab
```

## 🙏 Open-source credits

[Prometheus](https://prometheus.io/), [Alertmanager](https://github.com/prometheus/alertmanager), [node_exporter](https://github.com/prometheus/node_exporter) (Apache 2.0), [Grafana](https://grafana.com/oss/grafana/) and [Loki](https://grafana.com/oss/loki/) (AGPLv3), and the Python [prometheus_client](https://github.com/prometheus/client_python). They run as downloaded Docker images and are not stored here.

<div align="center">

<img src="assets/logo.png" alt="Coraxshift DevOps Academy logo" width="110">

**Coraxshift DevOps Academy** · Learn. Build. Deploy. Grow.

Course material © 2026 Coraxshift DevOps Academy. For enrolled students only.

</div>
