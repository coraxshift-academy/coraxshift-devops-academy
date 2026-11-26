# Class 3: Real Operations Scripts

**Bash Scripting for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your third class

Now you use everything you have learned to build the scripts that DevOps engineers write every week: a **health check** that tells you if a website is up, a **backup** that never overwrites anything, a **restore test** that proves the backup is real, and a **log report** that turns a wall of text into a short summary. At the end you join them into one toolkit with one command.

**By the end of this class you can:**

- Write a health check that exits with the right code when a site is up or down
- Write a dated backup script that refuses to overwrite
- Prove a backup works by restoring it and comparing it with the original
- Summarise a web server log with a script
- Combine scripts into one tool with `case`
- Debug a script with `bash -n` and `bash -x`

## Prerequisites

- [Class 1](class-1-your-first-scripts.md) and [Class 2](class-2-decisions-loops-functions.md) completed
- Your Codespace open, and you are in home base: `cd /workspaces/bash-scripting-for-beginners`

## Step 1: Start a practice website

**Why this matters:** a health check needs something to check. We start a tiny website on your own Codespace, which you can switch off on purpose to see the check fail. This is safe, because it is your practice site and nobody else uses it.

**Run it:**

```bash
mkdir -p practice/site
echo "<h1>CoraxReads is open</h1>" > practice/site/index.html
python3 -m http.server 8080 --directory practice/site > practice/server.log 2>&1 &
echo $! > practice/server.pid
sleep 1
curl http://localhost:8080
```

**What it does:** `python3 -m http.server` starts a tiny web server on port `8080`. The `&` at the end runs it **in the background**, so you get your prompt back. `$!` is the process number of the thing you just started, and we save it in `practice/server.pid` so we can switch it off later.

**What you should see:**

```text
<h1>CoraxReads is open</h1>
```

**If yours looks different:**

| What you see | Most likely reason and fix |
|---|---|
| A pop-up says a port was forwarded | Fine. Keep it **Private**. Do not set it to Public |
| `Address already in use` in `practice/server.log` | An old server is still running. Run `pkill -f "http.server 8080"`, then start it again |
| `Failed to connect` | The server needs a second. Run the `curl` line again |

## Step 2: The health check

**Why this matters:** you cannot watch a website all day. A health check does the looking for you, and its **exit code** lets other tools react.

**Run it:**

```bash
cat > scripts/healthcheck.sh <<'EOF'
#!/usr/bin/env bash
# healthcheck.sh - checks that a web address answers, and says so clearly.
set -euo pipefail

url="${1:-http://localhost:8080}"

if status="$(curl --silent --show-error --fail --max-time 5 --output /dev/null --write-out '%{http_code}' "$url")"; then
  echo "HEALTHY: $url answered with status $status"
else
  echo "UNHEALTHY: $url did not answer correctly" >&2
  exit 1
fi
EOF
chmod +x scripts/healthcheck.sh
./scripts/healthcheck.sh
echo "exit code: $?"
```

**What it does:**

| Piece | Meaning |
|---|---|
| `curl` | Asks a web address for its page, like a browser without the picture |
| `--fail` | Treat an error page (such as 404 or 500) as a **failure**. Without it, `curl` calls an error page a success |
| `--silent --show-error` | No progress bar, but still show real errors |
| `--max-time 5` | Give up after 5 seconds, so a frozen site cannot freeze the check |
| `--output /dev/null` | Throw the page away. We only want the verdict |
| `--write-out '%{http_code}'` | Print the status number (200 means OK) |
| `if status="$(...)"; then` | Run the command. If it succeeded, take the first path |

**What you should see:**

```text
HEALTHY: http://localhost:8080 answered with status 200
exit code: 0
```

Now make it fail, two ways. First, a page that does not exist:

```bash
./scripts/healthcheck.sh http://localhost:8080/nothing-here
echo "exit code: $?"
```

```text
curl: (22) The requested URL returned error: 404
UNHEALTHY: http://localhost:8080/nothing-here did not answer correctly
exit code: 1
```

Second, switch the website off, then check again:

```bash
kill "$(cat practice/server.pid)"
sleep 1
./scripts/healthcheck.sh
echo "exit code: $?"
```

```text
curl: (7) Failed to connect to localhost port 8080 after 0 ms: Could not connect to server
UNHEALTHY: http://localhost:8080 did not answer correctly
exit code: 1
```

**What it means:** your check says **healthy** with code `0` when the site works, and **unhealthy** with code `1` when it does not, for both a missing page and a site that is completely down. A check that you have seen fail is a check you can trust.

Switch the website back on, and check it recovers:

```bash
python3 -m http.server 8080 --directory practice/site > practice/server.log 2>&1 &
echo $! > practice/server.pid
sleep 1
./scripts/healthcheck.sh
```

**If yours looks different:** the exact wording of the `curl` lines can vary a little between versions. The words `UNHEALTHY` and exit code `1` are what matter. If the check says healthy when the server is off, an old server is still running: `pkill -f "http.server 8080"`.

## Step 3: A backup that never overwrites

**Why this matters:** a backup is your parachute. A bad backup script is worse than none, because you think you are safe. Ours will use a dated name, refuse to overwrite, and check what it made.

First, some data to protect:

```bash
mkdir -p practice/data
printf 'Things Fall Apart\nHalf of a Yellow Sun\nAmericanah\n' > practice/data/books.txt
printf 'Amaka\nTunde\nZainab\n' > practice/data/customers.txt
```

**Run it:**

```bash
cat > scripts/backup.sh <<'EOF'
#!/usr/bin/env bash
# backup.sh - makes a dated backup of a folder and proves it can be read.
set -euo pipefail

source_dir="${1:-}"
backup_dir="${2:-backups}"

if [[ -z "$source_dir" ]]; then
  echo "Usage: backup.sh <folder-to-back-up> [backup-folder]" >&2
  exit 2
fi

if [[ ! -d "$source_dir" ]]; then
  echo "ERROR: source folder not found: $source_dir" >&2
  exit 1
fi

mkdir -p "$backup_dir"

name="$(basename "$source_dir")"
stamp="$(date +%Y%m%d-%H%M%S)"
archive="$backup_dir/$name-$stamp.tar.gz"

if [[ -e "$archive" ]]; then
  echo "ERROR: $archive already exists. Not overwriting it." >&2
  exit 1
fi

echo "Backing up: $source_dir"
echo "Saving to:  $archive"

tar -czf "$archive" -C "$(dirname "$source_dir")" "$name"

count="$(tar -tzf "$archive" | wc -l)"
echo "DONE: $archive contains $count entries"
EOF
chmod +x scripts/backup.sh
./scripts/backup.sh practice/data
```

**What it does:**

| Piece | Meaning |
|---|---|
| `${2:-backups}` | The backup folder, or `backups` if none is given |
| `date +%Y%m%d-%H%M%S` | A timestamp like `20261125-093015`, so each backup has a **unique name** |
| `basename`, `dirname` | The last part of a path (`data`), and the folder around it (`practice`) |
| `[[ -e "$archive" ]]` | If that name **exists** already, refuse. Never overwrite |
| `tar -czf` | **C**reate a compressed (**z**ip) archive, named by **f**ile |
| `tar -tzf` | **T**ell me what is **in** the archive, without unpacking it |
| `wc -l` | Count lines, so we can count entries |

**What you should see:**

```text
Backing up: practice/data
Saving to:  backups/data-20261125-093015.tar.gz
DONE: backups/data-20261125-093015.tar.gz contains 3 entries
```

Your timestamp will be yours. Now look inside the backup without unpacking it:

```bash
ls backups
tar -tzf backups/data-*.tar.gz
```

```text
data-20261125-093015.tar.gz
data/
data/books.txt
data/customers.txt
```

Now test the protections:

```bash
./scripts/backup.sh
./scripts/backup.sh nothing
./scripts/backup.sh practice/data && ./scripts/backup.sh practice/data
```

```text
Usage: backup.sh <folder-to-back-up> [backup-folder]
ERROR: source folder not found: nothing
Backing up: practice/data
...
ERROR: backups/data-20261125-093107.tar.gz already exists. Not overwriting it.
```

The last line appears when both runs land in the **same second**. The script protected the first backup instead of replacing it. If you were slower and got two backups, that is fine too, because both have unique names.

**If yours looks different:** `tar: Removing leading '/'` is a harmless notice that appears when you give an absolute path. If `ls backups` shows nothing, check that you ran the script from home base.

## Step 4: Prove the backup works

**Why this matters:** the most common backup disaster is a backup that nobody ever tested. **A backup you have not restored is only a hope.** This script restores into a *separate, temporary* folder and compares it with the original.

**Run it:**

```bash
cat > scripts/restore-test.sh <<'EOF'
#!/usr/bin/env bash
# restore-test.sh - restores a backup into a NEW folder and compares it with the original.
set -euo pipefail

archive="${1:-}"
original="${2:-}"

if [[ -z "$archive" || -z "$original" ]]; then
  echo "Usage: restore-test.sh <backup.tar.gz> <original-folder>" >&2
  exit 2
fi

test_dir="$(mktemp -d)"
tar -xzf "$archive" -C "$test_dir"

name="$(basename "$original")"
if diff -r "$original" "$test_dir/$name" > /dev/null; then
  echo "RESTORE OK: the backup matches the original"
else
  echo "RESTORE PROBLEM: the backup does not match the original" >&2
  echo "Restored copy kept for inspection in: $test_dir" >&2
  exit 1
fi
EOF
chmod +x scripts/restore-test.sh
latest="$(ls backups/data-*.tar.gz | tail -1)"
./scripts/restore-test.sh "$latest" practice/data
```

**What it does:** `mktemp -d` makes a brand-new empty temporary folder. `tar -xzf` **x**tracts the archive into it. `diff -r` compares two folders **r**ecursively. It prints nothing and succeeds when they match.

**What you should see:**

```text
RESTORE OK: the backup matches the original
```

Now prove the test can catch a problem. Change the original after the backup was made, and test again:

```bash
echo "A New Book" >> practice/data/books.txt
./scripts/restore-test.sh "$latest" practice/data
echo "exit code: $?"
```

```text
RESTORE PROBLEM: the backup does not match the original
Restored copy kept for inspection in: /tmp/tmp.Xk3PqR9wLd
exit code: 1
```

Put the file back as it was, so later steps match:

```bash
printf 'Things Fall Apart\nHalf of a Yellow Sun\nAmericanah\n' > practice/data/books.txt
./scripts/restore-test.sh "$latest" practice/data
```

**If yours looks different:** the temporary folder name after `/tmp/tmp.` will be random. If the first test says PROBLEM, you may have edited `practice/data` after making the backup. Make a new backup and test that one.

## Step 5: Turn a log into a report

**Why this matters:** when something breaks, the answer is usually in a log file, but a log has thousands of lines. A script can count and sort them in a second.

A **web server log** has one line per visit. Create a small sample:

```bash
cat > practice/access.log <<'EOF'
10.0.0.5 - - [25/Nov/2026:09:01:12 +0100] "GET / HTTP/1.1" 200 512
10.0.0.7 - - [25/Nov/2026:09:01:15 +0100] "GET /books HTTP/1.1" 200 2048
10.0.0.5 - - [25/Nov/2026:09:01:20 +0100] "GET /books/42 HTTP/1.1" 200 1024
10.0.0.9 - - [25/Nov/2026:09:02:03 +0100] "GET /cart HTTP/1.1" 500 128
10.0.0.7 - - [25/Nov/2026:09:02:10 +0100] "GET /old-page HTTP/1.1" 404 64
10.0.0.5 - - [25/Nov/2026:09:03:44 +0100] "POST /checkout HTTP/1.1" 500 128
10.0.0.8 - - [25/Nov/2026:09:04:01 +0100] "GET / HTTP/1.1" 200 512
10.0.0.9 - - [25/Nov/2026:09:04:30 +0100] "GET /books HTTP/1.1" 200 2048
EOF
```

**Run it:**

```bash
cat > scripts/log-report.sh <<'EOF'
#!/usr/bin/env bash
# log-report.sh - summarises a web server log.
set -euo pipefail

log="${1:-}"

if [[ -z "$log" || ! -f "$log" ]]; then
  echo "Usage: log-report.sh <logfile>" >&2
  exit 2
fi

total="$(wc -l < "$log")"
errors="$(grep -c ' 500 ' "$log" || true)"

echo "Log report for: $log"
echo "Total requests:  $total"
echo "Server errors:   $errors"
echo
echo "Requests by status code:"
awk '{print $(NF-1)}' "$log" | sort | uniq -c | sort -rn
echo
echo "Busiest visitors:"
awk '{print $1}' "$log" | sort | uniq -c | sort -rn | head -3
EOF
chmod +x scripts/log-report.sh
./scripts/log-report.sh practice/access.log
```

**What it does:**

| Piece | Meaning |
|---|---|
| `grep -c ' 500 '` | Count lines that contain ` 500 ` (a server error) |
| `\|\| true` | If `grep` finds **zero** matches it exits with code 1. This stops the safety switch from treating "no errors" as a failure |
| `awk '{print $(NF-1)}'` | Print the second-to-last word on each line (the status code) |
| `sort \| uniq -c` | Sort, then count how many times each value repeats |
| `sort -rn` | Sort by number, biggest first |
| `head -3` | Keep the top three |

The `|` symbol is a **pipe**: the output of one command becomes the input of the next, like an assembly line.

**What you should see:**

```text
Log report for: practice/access.log
Total requests:  8
Server errors:   2

Requests by status code:
      5 200
      2 500
      1 404

Busiest visitors:
      3 10.0.0.5
      2 10.0.0.9
      2 10.0.0.7
```

The order of visitors that tie (here `10.0.0.9` and `10.0.0.7`, both with 2) can differ on your machine.

**If yours looks different:** if `Server errors` shows `0`, check that you copied the whole log file.

## Step 6: One front door: your toolkit

**Why this matters:** three scripts are three things to remember. One command with sub-commands, like `git` or `docker`, is much friendlier.

**Run it:**

```bash
cat > scripts/ops.sh <<'EOF'
#!/usr/bin/env bash
# ops.sh - one front door for the CoraxReads operations toolkit.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
command="${1:-help}"
shift || true

usage() {
  cat <<'TEXT'
CoraxReads operations toolkit

Usage: ops.sh <command> [arguments]

Commands:
  health [url]            check that the website answers
  backup <folder>         make a dated backup of a folder
  logs <logfile>          summarise a web server log
  help                    show this message
TEXT
}

case "$command" in
  health) "$here/healthcheck.sh" "$@" ;;
  backup) "$here/backup.sh" "$@" ;;
  logs)   "$here/log-report.sh" "$@" ;;
  help)   usage ;;
  *)
    echo "Unknown command: $command" >&2
    usage >&2
    exit 2
    ;;
esac
EOF
chmod +x scripts/ops.sh
./scripts/ops.sh
./scripts/ops.sh health
./scripts/ops.sh logs practice/access.log | head -4
./scripts/ops.sh dance
echo "exit code: $?"
```

**What it does:** `here` finds the folder the script lives in, so `ops.sh` can find its sister scripts from anywhere. `shift` removes the first argument (`health`, `backup` or `logs`) so the rest can be passed on. `"$@"` passes along every remaining argument with quoting intact. `cat <<'TEXT' ... TEXT` prints a block of text.

**What you should see:**

```text
CoraxReads operations toolkit

Usage: ops.sh <command> [arguments]

Commands:
  health [url]            check that the website answers
  backup <folder>         make a dated backup of a folder
  logs <logfile>          summarise a web server log
  help                    show this message
HEALTHY: http://localhost:8080 answered with status 200
Log report for: practice/access.log
Total requests:  8
Server errors:   2

Unknown command: dance
CoraxReads operations toolkit
...
exit code: 2
```

**If yours looks different:** if `health` says UNHEALTHY, your practice website is off. Start it again with the commands at the end of Step 2.

## Step 7: When a script breaks: debugging

**Why this matters:** every script you ever write will break at some point. Two switches show you why.

**Run it:** first, `bash -n` **checks the grammar without running anything**. Break a script on purpose:

```bash
cat > scripts/broken.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

if [[ -f "x" ]]; then
  echo "yes"
EOF
bash -n scripts/broken.sh
echo "exit code: $?"
```

```text
scripts/broken.sh: line 6: syntax error: unexpected end of file
exit code: 2
```

Bash is telling you the `if` was never closed with `fi`. Second, `bash -x` **prints every command as it runs**, with a `+` in front:

```bash
bash -x scripts/check-file.sh practice/books.txt
```

```text
+ set -euo pipefail
+ file=practice/books.txt
+ [[ -z practice/books.txt ]]
+ [[ -f practice/books.txt ]]
+ echo 'Found: practice/books.txt'
Found: practice/books.txt
```

Third, a sneaky one. A script saved with Windows-style line endings can fail with strange errors such as `bad interpreter` or `^M`. Check a file's type with `file`, and repair it:

```bash
file scripts/ops.sh
```

```text
scripts/ops.sh: Bourne-Again shell script, ASCII text executable
```

If that line also said `with CRLF line terminators`, fix it with:

```bash
sed -i 's/\r$//' scripts/ops.sh
```

**What it means:** read `bash -x` output from the top, and the last `+` line before the failure is the command that broke. Never paste passwords or tokens when sharing debug output, because `-x` prints the values of variables.

**If yours looks different:** your `bash -x` output may start with a few extra `+` lines about your environment. Ignore those.

## 🧹 Tidy up

Switch off your practice website when you are done:

```bash
kill "$(cat practice/server.pid)"
```

## 🧪 Practice

Add a new command to `ops.sh` called `disk`, which runs your `disk-check.sh` from Class 2. Update the `usage` text and test the command, plus the "unknown command" path.

<details>
<summary>Hint (try first!)</summary>

Copy the `health)` line in the `case`, change the name and the script. Add a `disk` line to the help text too.

</details>

## ✅ Recap

- A **health check** uses `curl --fail`, a timeout, clear messages, and exit codes `0` (healthy) and `1` (unhealthy). **Test the failure path** on purpose.
- A **backup** uses a dated name, checks the source, refuses to overwrite and verifies what it made with `tar -tzf`.
- A **restore test** extracts into a separate temporary folder and compares with `diff -r`. **Untested backups are only hopes.**
- `grep`, `awk`, `sort`, `uniq -c` and pipes (`|`) turn logs into answers.
- `case` plus `"$@"` makes one tool with many commands.
- Debug with `bash -n` (grammar), `bash -x` (trace) and `file` (line endings). `-x` can reveal secrets, so share it carefully.

## 📤 Push to your portfolio

In your own portfolio repository, create `bash/class-3/` and add:

1. `healthcheck.sh`, `backup.sh`, `restore-test.sh`, `log-report.sh` and `ops.sh` (**not** the `practice/` or `backups/` folders)
2. A `notes.md` with the output of one healthy and one unhealthy health check

Next up: the [assignment](assignment-ops-toolkit.md). You're doing great. 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-decisions-loops-functions.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-ops-toolkit.md)</td></tr></table>
