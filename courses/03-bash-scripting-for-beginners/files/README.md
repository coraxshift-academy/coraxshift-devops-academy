# Bash scripting: the code for this course

Three scripts that do real work, and a sample log to run them against. Copy the folder and run them.

## Prerequisites

1. Bash. On Windows use WSL2, on macOS it is already there, on Linux it is already there.
2. Nothing else. No packages to install.

## Learning objectives

1. Use `set -euo pipefail` and say what each part stops.
2. Take an argument, default it, and refuse to run when the input is wrong.
3. Use `if`, `exit` codes and `$?` so a script can be used inside another script.
4. Read a log with `grep`, `sort` and `uniq` instead of reading it with your eyes.
5. Use `date` and `tar` to make a dated backup.

## Step 1: Make them runnable

```bash
chmod +x scripts/*.sh
```

Expected output: nothing. That is normal: `chmod` is silent when it works.

## Step 2: Health check

```bash
./scripts/health-check.sh
```

Expected output:

```text
Disk used: 42%
Memory used: 31%
Load (1 min): 0.08
STATUS: healthy
```

The numbers will differ on your machine. `STATUS: healthy` and an exit code of 0 are what matter.

## Step 3: Prove the exit code

```bash
./scripts/health-check.sh; echo "exit code: $?"
```

Expected output ends with:

```text
exit code: 0
```

A script that returns 0 is a script another script can trust.

## Step 4: Summarise a log

```bash
./scripts/log-summary.sh sample/sample.log
```

Expected output:

```text
File: sample/sample.log
Lines: 8
Errors: 3
Warnings: 2

Top 5 error lines:
      3 ERROR failed to connect to database: timeout
```

## Step 5: Refuse bad input

```bash
./scripts/log-summary.sh missing.log; echo "exit code: $?"
```

Expected output:

```text
ERROR: missing.log not found.
exit code: 1
```

Bad input should fail loudly, not half-work.

## Step 6: Take a backup

```bash
mkdir -p data && echo "hello" > data/note.txt
./scripts/backup.sh ./data ./backups
```

Expected output:

```text
Created ./backups/backup-2026-11-28-0715.tar.gz
Size: 4.0K
```

## Step 7: Clean up

```bash
rm -rf backups data
```

Expected output: nothing printed.

## What you learned

1. `set -euo pipefail` makes a script stop on errors instead of pretending.
2. `${1:-default}` gives an argument a sensible default.
3. `exit 1` on bad input is how scripts talk to other scripts.
4. `grep -c` counts, `sort | uniq -c | sort -rn` ranks, and together they replace reading by eye.
5. `date +%Y-%m-%d` in a filename means you never overwrite yesterday's backup.
