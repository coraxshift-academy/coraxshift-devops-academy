# Assignment: Build Your Own Operations Toolkit

**Bash Scripting for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

Your teammate runs CoraxReads, a small online bookstore. Every day they check the site by hand and copy files "just in case". Your job is to hand them a **toolkit** they can run **without guessing**: it tells them clearly when something is wrong, and it never overwrites or deletes anything by accident.

You will build it from scratch, in your own words and your own style. You may look back at the classes, but do **not** simply paste the class scripts. Change names, messages and details so the toolkit is yours.

## ✅ Rules

1. **Every script starts with** `#!/usr/bin/env bash` **and** `set -euo pipefail`.
2. **Quote every variable**: `"$name"`.
3. **No `eval`, no `rm -rf`, no wildcard deletes, no passwords or keys.**
4. Problems go to **stderr** (`>&2`) with a clear message and a non-zero exit code.
5. Work in your Codespace on the practice site only. **Never** stop or change a shared or real server.
6. Write your explanations in your own words. Do not copy an AI answer.

## 📋 What you need

- Your Codespace, home base, and the practice website from Class 3
- Your portfolio repository (see [Getting Started](../GETTING-STARTED.md))

## Task 1: Plan it

Before you write anything, create `plan.md` and answer, in 3 to 6 short lines:

1. Which folder will you back up, and why is it worth backing up?
2. Which web address will you health-check?
3. What should each script do when something goes wrong?

## Task 2: A health check

Build `healthcheck.sh` that:

1. Takes a URL as an argument, with a sensible default
2. Uses a timeout, so it can never hang
3. Prints a clear `HEALTHY` or `UNHEALTHY` message
4. Exits `0` when healthy and `1` when not
5. Treats a 404 or 500 page as **unhealthy**

**Prove it:** run it four times and save the output: healthy, a missing page, the website switched off, and the website switched on again. Include the exit code each time.

## Task 3: A backup you can trust

Build `backup.sh` and `restore-test.sh` that:

1. Back up a folder to a **dated** archive in `backups/`
2. Refuse to run when the source folder is missing, with a usage message and exit code `2` for missing input
3. Refuse to overwrite an existing archive
4. List the archive contents after creating it
5. Restore into a **separate temporary folder** and compare with the original

**Prove it:** show a successful backup, then a restore test that passes. Then change one file in the original, run the restore test again, and show that it **fails** and says so.

## Task 4: A log report

Create a sample log of at least 12 lines (invent your own pages and addresses), and build `log-report.sh` that prints:

1. Total number of requests
2. Number of server errors (status `500`)
3. Requests by status code
4. The top 3 visitors

**Prove it:** save the output of one run.

## Task 5: One front door

Build `ops.sh` with sub-commands `health`, `backup`, `logs` and `help`. Use `case`. An unknown command must print the help text to stderr and exit with code `2`.

**Prove it:** save the output of `./scripts/ops.sh`, one real command, and one unknown command with its exit code.

## Task 6: Explain it and own a failure

Write `README.md` for your toolkit with:

1. What the toolkit does, in 2 or 3 sentences, for a non-technical reader
2. How to run each command, and what success looks like
3. **One failure you caused on purpose**, what the toolkit said, and how you confirmed you had recovered

## 📦 Submission checklist

- [ ] `plan.md`
- [ ] `healthcheck.sh`, `backup.sh`, `restore-test.sh`, `log-report.sh`, `ops.sh`
- [ ] `README.md` with run commands, expected results and your failure story
- [ ] `evidence.md` with the saved outputs from every "Prove it" step
- [ ] Every script starts with the shebang and `set -euo pipefail`
- [ ] Every variable is quoted
- [ ] No `eval`, `rm -rf`, wildcard deletes, passwords or keys anywhere
- [ ] `bash -n` passes on every script. Paste the result in `evidence.md`
- [ ] You did **not** upload `backups/`, `practice/` or any temporary folders

## 📤 Final submission

Put everything in `bash/assignment/` in your portfolio and send your instructor the link.

## 🎯 How you will be checked

| Check | What your instructor looks for |
|---|---|
| Health check | Healthy gives `0`, a missing page gives `1`, a stopped site gives `1`, and it has a timeout |
| Backup | Unique dated names, no overwriting, verified contents |
| Restore test | Passes on an untouched folder and **fails** after a change |
| Safety | Quoted variables, strict mode, no dangerous commands |
| Understanding | Your README makes sense to someone non-technical, and your failure story is honest |

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-real-operations-scripts.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-automation.md)</td></tr></table>
