# Recap and What's Next

**Bash Scripting for Beginners · Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

## 🏅 You did it

If you finished the assignment, the role play and the quiz, you went from "I type commands" to "I write tools that run on their own". That is one of the most valuable skills in DevOps.

Scored 11 out of 12 or more in the [quiz](quiz.md)? Congratulations: you have earned the **Bash Scripting for Beginners** badge.

## What you can now do

- Write, run and debug Bash scripts
- Use variables, arguments, user input and exit codes
- Make scripts decide with `if` and `case`, and repeat with `for` and `while`
- Package work into functions, and send problems to stderr
- Build a health check that tells the truth, including when the site is down
- Build a backup that never overwrites, and **prove** it with a restore test
- Turn a log file into a report with pipes
- Combine scripts into one toolkit
- Explain automation to someone who has never written a script

## Your portfolio now has

- `bash/class-1/`, `bash/class-2/`, `bash/class-3/`
- `bash/assignment/` with your full toolkit, README and evidence
- `bash/role-play.md`

Keep it. A working toolkit with honest evidence is exactly what an employer wants to see.

> 📖 **From my café:** You have just taught your computer a routine. I want you to leave this course feeling "I can make my computer work for me". Keep your scripts small, readable and safe, and you will be trusted with bigger ones.

## 🧰 Your cheat sheet

| I want to... | Use |
|---|---|
| Start a script | `#!/usr/bin/env bash` then `set -euo pipefail` |
| Store a value | `name="value"` and use `"$name"` |
| Use what the user typed | `$1`, `$2`, `${1:-default}` |
| Ask a question | `read -r -p "Question? " answer` |
| Choose | `if [[ ... ]]; then ... fi`, `case ... esac` |
| Repeat | `for x in ...; do ... done`, `while read -r line; do ... done < file` |
| Reuse | `name() { ... }` |
| Report a problem | `echo "message" >&2` then `exit 1` |
| Check the last result | `echo $?` |
| Check the grammar | `bash -n script.sh` |
| Trace a script | `bash -x script.sh` |

## ➡️ What comes next

The best next steps build on what you just learned: put your scripts under version control with **Git and GitHub**, then run them automatically as part of a pipeline.

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
