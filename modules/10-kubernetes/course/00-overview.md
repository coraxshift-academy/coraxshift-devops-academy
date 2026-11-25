# Course Overview

**Kubernetes for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 👋 Welcome

In Docker you ran a few containers on one machine, by hand. What happens when you have **many** containers, on **many** machines, and you cannot watch them all?

Imagine a café with twelve computers and a manager who never sleeps. You tell the manager: *"I always want three seats running the welcome board."* If a seat crashes, the manager replaces it. If it gets busy, the manager opens more. You never walk the floor to fix it yourself.

That manager is **Kubernetes**. You describe **what you want**. Kubernetes keeps reality matching it.

| In the café | In Kubernetes |
|---|---|
| The whole café | A **cluster** |
| One computer in the café | A **node** |
| One program running on a seat | A **pod** |
| "Always keep three seats running this" | A **Deployment** |
| The reception desk that sends customers to a free seat | A **Service** |
| A notice pinned up so every seat shows the same text | A **ConfigMap** |
| A locked drawer for keys and passwords | A **Secret** |
| The manager checking seats are really working | **Probes** |

```text
You write what you want ─▶ Kubernetes compares it with reality ─▶ Kubernetes fixes the difference
```

> 📖 **From my café:** In my café, a central control system showed me the sessions, but I never relied on the screen alone. I walked round, noticed anything unusual, and acted: restarting a machine or investigating a fault. Monitoring a system is not the same as managing it. Kubernetes is that watchful manager, built into software: it observes, recognises abnormal behaviour and takes the right action for you.

## 🎯 What you will be able to do

- Start a small practice cluster on your own machine
- Run an app as a **Deployment** and read its **pods**
- Reach it with a **Service**
- Give it settings with a **ConfigMap** and a **Secret**
- **Scale** it up and down
- Watch Kubernetes **heal** itself when a pod is deleted
- Add **probes** and **resource limits**
- **Update** without downtime, and **roll back** a bad update
- Clean up completely

## 🗺️ How the course works

| Step | What you do | Time |
|---|---|---|
| ☸️ Class 1 | Cluster, pods and Deployments | 2 h |
| 🔌 Class 2 | Services, ConfigMaps and Secrets | 2 h |
| 🛡️ Class 3 | Updates, rollbacks and self-healing | 2 h |
| 🏗️ Assignment | Run a small app | 2 to 3 h |
| 🎭 Role play | Explain it to a business owner | 15 min |
| 📝 Quiz | 12 questions, 90% earns the badge | 20 min |

Every step has five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, **If yours looks different**.

## ✅ Before you start

Take **Linux**, **Git and GitHub** and **Docker** first. You should be comfortable with `cat`, YAML spacing and `docker ps`.

You also need a **Codespace with at least 4 GB of memory**, since the practice cluster runs inside Docker.

## 🛡️ Ground rules

- Practise only on your own practice cluster.
- Read a command before you run it, especially `delete`.
- Never put real passwords in a file you commit. The Secret in this course is a practice value.
- Delete your cluster when you finish.

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-cluster-pods-deployments.md)</td></tr></table>
