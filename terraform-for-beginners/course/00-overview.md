# Course Overview

**Terraform for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 👋 Welcome

Imagine you run a restaurant and you set up every table by hand, from memory, each morning. One day a new helper sets them differently. Another day you forget the forks. Now imagine instead you have **a written floor plan**, and anyone can follow it and get exactly the same room every time.

That floor plan is **Infrastructure as Code**, and **Terraform** is the tool that reads it and builds the room for you.

| In the restaurant | In Terraform |
|---|---|
| The written floor plan | Your **configuration** (`.tf` files) |
| The manager who reads it | **Terraform** |
| "Here is what I will change" | **`terraform plan`** |
| "Go ahead" | **`terraform apply`** |
| The notebook of what is already set up | **State** |
| Someone moves a table by hand | **Drift** |
| Clearing the room at night | **`terraform destroy`** |

```text
write ─▶ plan (preview) ─▶ apply (change) ─▶ check ─▶ destroy the practice lab
```

> 💡 **Terraform builds anything with an API: servers, networks, databases, even files.** In this course you practise on plain files in your Codespace. It costs nothing, nothing can go wrong in the cloud, and the habits are identical to the real thing. Cloud comes later in the **AWS** course.

## 🎯 What you will be able to do

- Explain Infrastructure as Code in plain words
- Write a Terraform configuration and run `init`, `fmt`, `validate`
- Read a plan and tell **create, update and replace** apart
- Use **variables** and **outputs**
- Explain what **state** is and why it must never be committed
- Spot **drift** and fix it the safe way
- Destroy a lab and prove it is gone

## 🗺️ How the course works

| Step | What you do | Time |
|---|---|---|
| 📝 Class 1 | Your first configuration | 2 h |
| 🔍 Class 2 | Plan, apply, change | 2 h |
| 🧹 Class 3 | State, drift and destroy | 2 h |
| 🧩 Assignment | Build a small website folder from code | 2 to 3 h |
| 🎭 Role play | Explain it to a shop owner | 15 min |
| 📝 Quiz | 12 questions, 90% earns the badge | 20 min |

Every step follows the same five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, **If yours looks different**.

## ✅ Before you start

Take **Linux**, **Bash** and **Git and GitHub** first. You should be comfortable with folders, files, `cat`, and `git commit`.

## 🛡️ Ground rules

- Practise only in your own Codespace.
- Never commit state files, saved plans, the `.terraform` folder, or anything secret.
- Always read the plan before you apply it.

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-your-first-configuration.md)</td></tr></table>
