# Course Overview

**CI/CD for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 👋 Welcome

Every customer in my café went through the same steps: pay, get a ticket, enter it at a seat, and only then did the session start. Same steps, same order, every time, with a check at each gate.

A software **pipeline** is exactly that. Every time someone changes the code, the same steps run automatically, in the same order, and each step is a gate. If a gate fails, the change does not go further.

- **CI (Continuous Integration):** every change is **checked** automatically: style, tests, build.
- **CD (Continuous Delivery/Deployment):** every change that passes is **packaged and delivered** automatically, with a human approval where it matters.

```text
You push code ─▶ check style ─▶ run tests ─▶ build image ─▶ smoke test ─▶ publish ─▶ staging ─▶ (approval) ─▶ production
```

| In the café | In a pipeline |
|---|---|
| The same steps for every customer | A **workflow** that runs on every change |
| One step in the process | A **step** |
| A group of steps done at one desk | A **job** |
| A gate that stops you if something is wrong | A failing step (a **red** build) |
| The manager signing off a big decision | An **environment approval** |
| A locked drawer for keys | A **secret** |
| Going back to yesterday's setup | A **rollback** |

> 📖 **From my café:** In my café, whenever I noticed something unusual, such as a missing browsing timer or a workstation behaving abnormally, I investigated and took action before it hurt the business. A red build is the same signal: something is unusual, so look now, while it is small and cheap to fix. Monitoring a system is not the same as managing it. A pipeline is how you manage change safely.

## 🎯 What you will be able to do

- Explain CI and CD in plain words
- Write a **GitHub Actions** workflow
- Run tests and style checks automatically on every push and pull request
- Test on more than one Python version with a **matrix**
- Keep a test report with an **artifact**
- Protect your `main` branch so broken code cannot get in
- Build a Docker image, **smoke test** it and publish it to a registry
- Use **secrets** and **environments**, with an approval before production
- Read a failed run, find the cause and **roll back**

## 🗺️ How the course works

| Step | What you do | Time |
|---|---|---|
| 🚦 Class 1 | Your first pipeline | 2 h |
| ✅ Class 2 | Continuous Integration | 2 h |
| 📦 Class 3 | Continuous Delivery | 2 h |
| 🏗️ Assignment | Build a pipeline for your own app | 2 to 3 h |
| 🎭 Role play | Explain it to a business owner | 15 min |
| 📝 Quiz | 12 questions, 90% earns the badge | 20 min |

Every step has five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, **If yours looks different**.

## ✅ Before you start

Take **Linux**, **Git and GitHub** and **Docker** first. You need a **GitHub account** and your Codespace signed in to GitHub (you did this in the Git course). Class 1, Step 0 checks it.

## 🛡️ Ground rules

- Practise only in the repository you create for this course.
- Never put a real password or key in a file. Use **secrets**.
- Prices in the practice app are made-up practice numbers.
- Read a failed run before you change anything.

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-your-first-pipeline.md)</td></tr></table>
