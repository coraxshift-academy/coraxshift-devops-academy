# Week 3: Bash for DevOps

**Project:** CoraxReads
**Goal:** Replace repeated, error-prone terminal work with small scripts that explain what they do and stop safely when something fails.

## What you will ship

- `scripts/healthcheck.sh` checks the local practice site.
- `scripts/backup.sh` creates a dated backup without overwriting the previous one.
- A README section that explains how to run each script and what success looks like.

## Before you start

- Finish the Week 2 Nginx lab, or use any local folder and HTTP endpoint.
- Open the terminal in your portfolio project.
- Run `pwd` to check where you are. `pwd` prints the current directory.

## Three classes

1. **Shell building blocks:** variables, quoting, input, and exit codes.
2. **Reusable automation:** functions, conditions, loops, and safe file handling.
3. **Operations scripts:** health checks, backups, logs, and troubleshooting.

```text
You -> script -> checks inputs -> does one job -> reports success or failure
```

Scripts are not magic. They are saved instructions. Read a script before running it, especially when it uses `sudo`, changes files, or deletes data.

## Completion check

- Scripts quote paths and fail on errors.
- A health check exits non-zero when its check fails.
- Backups have unique names and can be listed and restored.
- No script stores passwords, API keys, or cloud credentials.

## Lessons

- [Class 1: Bash building blocks](class-1.md)
- [Class 2: Safe automation](class-2.md)
- [Class 3: Health checks and backups](class-3.md)
- [Assignment 3](assignment-3.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 3](quiz-week-3.md)

## Official reference

- [GNU Bash manual](https://www.gnu.org/software/bash/manual/bash.html)
