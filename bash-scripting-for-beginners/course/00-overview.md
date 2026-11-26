# Bash Scripting for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**
*A complete course on its own. No other course needed.*

## 👋 Welcome

Think about a task you do again and again. Maybe you copy the same files every Friday, or check every morning that a website is still open. Doing it by hand is slow, and when you are tired, you make mistakes.

A **script** is a saved list of instructions. You write it once, and the computer does the job the same way every time, in a second, without getting tired. **Bash** is the language most Linux servers understand, so it is the first automation skill every DevOps engineer learns.

> 📖 **From my café:** In my café I used HandyCafe to monitor the workstations, but I also walked the floor, checking machine after machine. When a computer behaved abnormally, I investigated and sometimes had to shut it down and restart it. Checking twelve machines by hand, again and again, is exactly the kind of job a script was made for. That is why we learn Bash: to make the computer do the repeating for you.

You do not need to be a "coder". If you can follow a recipe, you can write a script. Every step tells you what to type, what it does, what you should see, and what to do if yours looks different.

## Who this course is for

- Complete beginners who are curious about automation
- Career changers moving into DevOps, cloud or IT support
- Anyone who has used a terminal a little and wants to make it work for them

## What you will be able to do by the end

1. Write and run your own Bash scripts
2. Use variables, arguments and user input, and quote them correctly
3. Make scripts decide (`if`, `case`) and repeat (`for`, `while`)
4. Organise a script into functions
5. Make scripts stop safely, refuse to overwrite data and never delete by accident
6. Write a health check that tells you if a website is up
7. Write a dated backup script and a restore test that proves the backup works
8. Turn a messy log file into a short report
9. Debug a failing script with `bash -n` and `bash -x`
10. Explain why automation matters to someone who is not technical

## How long it takes

| Part | Time |
|---|---|
| 3 classes (2 hours each) | 6 hours |
| Assignment (build your toolkit) | 2 to 3 hours |
| Role play, quiz and recap | about 45 minutes |
| **Total** | **about 10 hours**, spread over a few days |

Go at your own pace. Understanding is better than speed.

## Prerequisites

- A free GitHub account with access to this course repository
- A Codespace opened on this repository (see [Getting Started](../GETTING-STARTED.md))
- Comfort opening a terminal and typing a command. If you have not done that before, work through the free beginner class first.

## What you will build

By the end you will have your own **CoraxReads operations toolkit**, a small set of scripts behind one command:

```text
./scripts/ops.sh health     →  is the website up?
./scripts/ops.sh backup     →  make a dated, verified backup
./scripts/ops.sh logs       →  summarise the server log
```

CoraxReads is a small, imaginary online bookstore we use as the practice project.

## How the course works

| Part | What it is | Why it helps |
|---|---|---|
| Classes | Step-by-step guided practice | You learn by doing |
| Assignment | Build your own toolkit | Proves you can do it without help |
| Role play | Explain automation to a shop owner | If you can explain it simply, you know it |
| Quiz | 12 questions | Shows what to revisit |

Every step follows the same five parts, so you always know what is coming:

1. **Why this matters**: one sentence and an everyday comparison
2. **Run it**: what to type
3. **What it does**
4. **What you should see**
5. **If yours looks different**: the most likely reason and the fix

> 💡 **Your output will never match ours character for character.** Times, dates and numbers change from computer to computer. Compare the *meaning*, not every letter.

## Safety rules

1. **Read a script before you run it**, especially if it uses `sudo`, changes files or deletes anything.
2. **Only run the lesson commands** on your own practice Codespace, never on a shared or real server.
3. **Never put passwords, tokens or keys** in a script, a screenshot or Git.
4. **Never use `eval`** with text a user typed, and never run a broad `rm -rf`.
5. **Save your own work in your portfolio repository**, not in this course repository.

## Pass check

You are ready to move on when you can:

- Write a script, make it executable and run it
- Say what an exit code of `0` and a non-zero code mean
- Explain why `"$variable"` is written with quotes
- Show a health check that succeeds for a running site and fails for a stopped one
- Show a backup that you restored and compared with the original
- Score 11 out of 12 or more in the quiz

## Start here

Open [Class 1: Your first scripts](class-1-your-first-scripts.md).

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-your-first-scripts.md)</td></tr></table>
