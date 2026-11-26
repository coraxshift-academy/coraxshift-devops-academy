# Course Overview

**Monitoring and Observability for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 👋 Welcome

Imagine you run a shop and you never look at the till, the shelves or the door. You only find out something is wrong when a customer shouts, or when you open the next morning and the stock is gone.

**Monitoring** is looking at the till, the shelves and the door on purpose, all day, and ringing a bell when something is off. **Observability** is being able to work out *why* it went wrong from what your system tells you.

| In the shop | In monitoring |
|---|---|
| A number you can read (how many customers came in) | A **metric** |
| The person who writes the numbers down every few seconds | **Prometheus** |
| The wall chart with lines and dials | **Grafana** |
| The bell that rings when the queue is too long | An **alert**, sent by **Alertmanager** |
| The diary of what happened ("10:03, till jammed") | **Logs**, searched with **Loki** |

```text
app ─▶ metrics ─▶ Prometheus ─▶ Grafana (see it) ─▶ Alertmanager (hear it)
 └──▶ logs ─▶ Loki ─▶ Grafana (explain it)
```

> 📖 **From my café:** In my cybercafe I ran 12 or more computers, and a system called HandyCafe showed me every session and how much time each customer had used. I also walked the floor to check the machines by hand. The system told me *what* was happening. The walk told me *why*. Metrics and logs are those two jobs.

## 🎯 What you will be able to do

- Explain metrics, logs and alerts in plain words
- Read counters, gauges and histograms
- Run Prometheus and check that it is collecting data
- Write simple PromQL questions
- Read and build Grafana dashboards
- Write an alert rule, test it, and see it arrive
- Search logs with Loki and link them to a graph
- Stop the whole lab and prove nothing is left

## 🗺️ How the course works

| Step | What you do | Time |
|---|---|---|
| 📊 Class 1 | Metrics and Prometheus | 2 h |
| 📈 Class 2 | Dashboards with Grafana | 2 h |
| 🔔 Class 3 | Alerts and logs | 2 h |
| 🧩 Assignment | Monitor a change to the shop | 3 h |
| 🎭 Role play | Explain monitoring to a shop owner | 15 min |
| 📝 Quiz | 12 questions, 90% earns the badge | 20 min |

Every step follows the same five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, **If yours looks different**.

## 💰 Cost and cleanup

| | |
|---|---|
| **Cost** | $0. Everything runs in your free Codespace. No cloud account is used |
| **If forgotten** | A running Codespace uses your free monthly hours. The lab stack uses memory while it runs |
| **Clean up** | At the end of every class run `docker compose down` (Class 3 also removes stored data with `-v`), then stop the Codespace |

## ✅ Before you start

Take **Linux**, **Bash**, **Git and GitHub** and **Docker for Beginners** first. You should be comfortable with the terminal, `curl`, and `docker compose up` and `down`.

## 🛡️ Ground rules

- Practise only in your own Codespace, and keep ports **Private**.
- The Grafana password (`lab-only-change-me`) is for the lab only.
- Alerts must be useful: if an alert does not tell someone what to do, it is noise.
- Always finish a class with the cleanup step.

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-metrics-and-prometheus.md)</td></tr></table>
