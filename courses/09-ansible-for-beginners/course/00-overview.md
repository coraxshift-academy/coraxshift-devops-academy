# Course Overview

**Ansible for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 👋 Welcome

Picture a café with twelve computers. A setting needs changing on every one. You could walk to each machine and change it by hand, twelve times, and hope you did not skip one or make a typo on number nine.

Or you could sit at **one control screen**, describe the change once, and have it applied to every machine, the same way, every time.

That is **Ansible**.

| In the café | In Ansible |
|---|---|
| The list of computers | The **inventory** |
| A group such as "customer PCs" | An inventory **group** |
| The instructions you write once | A **playbook** |
| One job in those instructions | A **task** |
| The tool that does the job (copy a file, start a service) | A **module** |
| "Only tell me if you actually changed something" | **Idempotency** |
| Walking round to check a machine | **Check mode** |
| Fixing one machine that went wrong | **`--limit`** |

```text
inventory (who) ─▶ playbook (what) ─▶ check ─▶ run ─▶ verify ─▶ repair what drifted
```

> 💡 **Ansible needs no software on the machines it manages.** It connects, does the work, and leaves. Real teams use it over SSH to manage servers. In this course your "machines" are three pretend workstations living in your Codespace. Nothing can break, nothing costs money, and the habits are identical to the real thing.

> 📖 **From my café:** In my café I managed more than twelve computers from a central control system, HandyCafe, which showed sessions and tracked usage from one screen. But I never relied on the screen alone. I also walked the floor, because a screen cannot tell you everything. Ansible works the same way: one place to give instructions to many machines, plus checks to see which one needs attention.

## 🎯 What you will be able to do

- Explain what Ansible is and why teams use it
- Write an **inventory** with groups
- Run quick **ad-hoc** commands on many machines at once
- Write and run a **playbook**
- Use **variables**, **templates** and **handlers**
- Explain **idempotency** and prove it
- **Preview** a run with check mode before changing anything
- Target **one machine** with `--limit`
- Find and repair a machine that has drifted

## 🗺️ How the course works

| Step | What you do | Time |
|---|---|---|
| 📝 Class 1 | Inventory and your first playbook | 2 h |
| 🧩 Class 2 | Variables, templates and handlers | 2 h |
| 🛡️ Class 3 | Preview, limit and repair | 2 h |
| 🏢 Assignment | Set up a small office | 2 to 3 h |
| 🎭 Role play | Explain it to a business owner | 15 min |
| 📝 Quiz | 12 questions, 90% earns the badge | 20 min |

Every step has five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, **If yours looks different**.

## ✅ Before you start

Take **Linux**, **Bash** and **Git and GitHub** first. You should be comfortable with folders, files, `cat`, `ls` and `git commit`. Terraform is helpful but not required.

## 🛡️ Ground rules

- Practise only in your own Codespace.
- Read a playbook before you run it.
- Use **check mode first**, then run for real.
- Never put passwords or keys in a playbook or in Git.

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-inventory-and-first-playbook.md)</td></tr></table>
