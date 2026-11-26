# Class 2: Decisions, Loops and Functions

**Bash Scripting for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your second class

In Class 1 your scripts followed a straight line. Today they learn to **think**: to choose between two paths, to repeat a job for many items, and to package a job into a named helper. You also learn the safety habits that separate a script you can trust from one that causes accidents.

**By the end of this class you can:**

- Explain what `set -euo pipefail` protects you from, and see it work
- Make a script decide with `if`, `elif`, `else` and `case`
- Repeat work with `for` and `while` loops
- Write functions, and send errors to the right place
- Check input before acting on it

## Prerequisites

- [Class 1](class-1-your-first-scripts.md) completed
- Your Codespace open, and you are in home base: `cd /workspaces/bash-scripting-for-beginners`

## Step 1: The safety switch: why scripts need `set -euo pipefail`

**Why this matters:** by default Bash is *too forgiving*. If a command fails, it carries on to the next one. If you misspell a variable, it quietly treats it as empty. That is how scripts delete the wrong folder. The safety switch makes Bash stop and tell you instead.

**Run it:** first a script *without* the switch, with a typo (`foldr` instead of `folder`):

```bash
cat > scripts/typo-demo.sh <<'EOF'
#!/usr/bin/env bash
# NO safety switch on purpose, to show the danger.
folder="reports"
echo "Would delete: /tmp/$foldr/old-files"
EOF
bash scripts/typo-demo.sh
```

```text
Would delete: /tmp//old-files
```

Look carefully: because of the typo, the empty variable made the path `/tmp//old-files`, and Bash did not warn us. Imagine that line said `rm -r /tmp/$foldr/`. Now the same script **with** the switch:

```bash
cat > scripts/typo-safe.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

folder="reports"
echo "Would delete: /tmp/$foldr/old-files"
EOF
bash scripts/typo-safe.sh
echo "exit code: $?"
```

**What you should see:**

```text
scripts/typo-safe.sh: line 5: foldr: unbound variable
exit code: 1
```

**What it does:** the safety switch is three protections in one:

| Part | What it does | Plain meaning |
|---|---|---|
| `set -e` | Stop when a command fails | "If something breaks, stop. Do not carry on" |
| `set -u` | Stop on an unset variable | "A typo is an error, not an empty value" |
| `set -o pipefail` | Count a failure anywhere in a chain of commands (`a \| b \| c`) | "A broken link breaks the whole chain" |

**If yours looks different:** the line number may differ if you changed the script. The words `unbound variable` and the non-zero exit code are what matter.

> 💡 **From now on, every script you write starts with `#!/usr/bin/env bash` and `set -euo pipefail`.**

## Step 2: Making decisions with `if`

**Why this matters:** a script that cannot check things cannot protect itself. Is the file there? Is the disk full? Did the user give an input?

**Run it:**

```bash
cat > scripts/check-file.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

file="${1:-}"

if [[ -z "$file" ]]; then
  echo "Usage: check-file.sh <file>" >&2
  exit 2
elif [[ -f "$file" ]]; then
  echo "Found: $file"
elif [[ -d "$file" ]]; then
  echo "That is a folder, not a file: $file" >&2
  exit 1
else
  echo "Missing: $file" >&2
  exit 1
fi
EOF
printf 'Things Fall Apart\nHalf of a Yellow Sun\nAmericanah\n' > practice/books.txt
bash scripts/check-file.sh
bash scripts/check-file.sh practice/books.txt
bash scripts/check-file.sh practice
bash scripts/check-file.sh nope.txt
```

**What it does:**

| Piece | Meaning |
|---|---|
| `if [[ ... ]]; then ... elif ... else ... fi` | "If this, do that. Otherwise if this... Otherwise..." (`fi` closes it) |
| `[[ -z "$file" ]]` | True when the text is **z**ero length (empty) |
| `[[ -f "$file" ]]` | True when it is a regular **f**ile |
| `[[ -d "$file" ]]` | True when it is a **d**irectory (folder) |
| `>&2` | Send this message to the **error channel** (see Step 5) |
| `exit 2` / `exit 1` | Stop, and leave an exit code behind |

**What you should see:**

```text
Usage: check-file.sh <file>
Found: practice/books.txt
That is a folder, not a file: practice
Missing: nope.txt
```

**If yours looks different:** `[[: not found` means you ran the script with `sh` instead of `bash`. Always use `bash scripts/name.sh` or `./scripts/name.sh`.

### Comparing numbers

**Why this matters:** many real checks are about numbers: disk space, how many errors, how long something took.

```bash
cat > scripts/disk-check.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

limit="${1:-80}"
used="$(df --output=pcent / | tail -1 | tr -dc '0-9')"

echo "Disk used on /: ${used}% (warning above ${limit}%)"

if [[ "$used" -gt "$limit" ]]; then
  echo "WARNING: disk is getting full" >&2
  exit 1
else
  echo "OK: plenty of space"
fi
EOF
bash scripts/disk-check.sh
bash scripts/disk-check.sh 1
echo "exit code: $?"
```

**What it does:** `$(...)` runs a command and uses its output as a value. `-gt` means **g**reater **t**han (other number tests: `-lt` less than, `-eq` equal, `-ge` greater or equal). Passing `1` as the limit forces the warning, so you can see the failure path.

**What you should see** (your percentage will differ):

```text
Disk used on /: 13% (warning above 80%)
OK: plenty of space
Disk used on /: 13% (warning above 1%)
WARNING: disk is getting full
exit code: 1
```

> 💡 Always test the **failure** path on purpose. A check you have never seen fail is a check you cannot trust.

## Step 3: Choosing from a list with `case`

**Why this matters:** when a script has several commands (like `start`, `stop`, `status`), a long chain of `if` gets messy. `case` is a neat menu.

**Run it:**

```bash
cat > scripts/menu.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

action="${1:-help}"

case "$action" in
  hello)
    echo "Hello from CoraxReads!"
    ;;
  time)
    date "+It is %H:%M on %A"
    ;;
  help)
    echo "Usage: menu.sh hello|time|help"
    ;;
  *)
    echo "Unknown action: $action" >&2
    echo "Usage: menu.sh hello|time|help" >&2
    exit 2
    ;;
esac
EOF
bash scripts/menu.sh
bash scripts/menu.sh hello
bash scripts/menu.sh time
bash scripts/menu.sh dance
echo "exit code: $?"
```

**What it does:** `case ... in` compares `$action` with each pattern. `;;` ends each branch. `*)` matches **anything else**, so it is your safety net for wrong input. `esac` closes it (`case` backwards, like `fi`).

**What you should see:**

```text
Usage: menu.sh hello|time|help
Hello from CoraxReads!
It is 09:30 on Wednesday
Unknown action: dance
Usage: menu.sh hello|time|help
exit code: 2
```

**If yours looks different:** the time and day will be yours. If `dance` printed nothing, check that you kept the `*)` branch.

## Step 4: Repeating work with loops

**Why this matters:** loops are why scripts save time. Doing a job for 3 files is easy by hand. Doing it for 3,000 is what loops are for.

**Run it:** first create a small shelf of files to practise on:

```bash
mkdir -p practice/shelf
printf 'chapter one\n' > practice/shelf/novel.txt
printf 'poem one\n'    > practice/shelf/poetry.txt
printf 'essay one\n'   > practice/shelf/essays.txt
printf 'Things Fall Apart\nHalf of a Yellow Sun\nAmericanah\n' > practice/books.txt
```

```bash
cat > scripts/loops.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

echo "--- for loop over a list"
for fruit in mango pawpaw guava; do
  echo "I like $fruit"
done

echo "--- for loop over numbers"
for n in 1 2 3; do
  echo "Round $n"
done

echo "--- for loop over files"
for f in practice/shelf/*.txt; do
  echo "Found text file: $f"
done

echo "--- while loop reading a file line by line"
count=0
while IFS= read -r line; do
  count=$((count + 1))
  echo "Book $count: $line"
done < practice/books.txt
echo "Total books: $count"
EOF
bash scripts/loops.sh
```

**What it does:**

| Loop | Meaning |
|---|---|
| `for x in a b c; do ... done` | Do this once for each item in the list |
| `practice/shelf/*.txt` | A **wildcard**: it expands to every matching file name |
| `while read -r line; do ... done < file` | Read a file one line at a time, until the lines run out |
| `count=$((count + 1))` | Do arithmetic: add 1 to `count` |

**What you should see:**

```text
--- for loop over a list
I like mango
I like pawpaw
I like guava
--- for loop over numbers
Round 1
Round 2
Round 3
--- for loop over files
Found text file: practice/shelf/essays.txt
Found text file: practice/shelf/novel.txt
Found text file: practice/shelf/poetry.txt
--- while loop reading a file line by line
Book 1: Things Fall Apart
Book 2: Half of a Yellow Sun
Book 3: Americanah
Total books: 3
```

**If yours looks different:** files in a wildcard loop come out in alphabetical order. If you see `practice/shelf/*.txt` printed literally, the shelf folder is empty or in a different place. Run `ls practice/shelf`.

## Step 5: Functions, and the two output channels

**Why this matters:** when you copy the same lines into three places, you will one day fix one and forget the others. A **function** is a named helper you write once and use anywhere.

Linux programs have two separate output channels: **stdout** (normal results) and **stderr** (problems). A script should say problems on stderr. That is what `>&2` does. Other programs can then tell results from problems.

**Run it:**

```bash
cat > scripts/functions.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

say() {
  local message="$1"
  echo "[info] $message"
}

fail() {
  local message="$1"
  echo "[error] $message" >&2
  exit 1
}

require_file() {
  local file="$1"
  if [[ ! -f "$file" ]]; then
    fail "Missing file: $file"
  fi
  say "Found $file"
}

require_file "practice/books.txt"
say "Counting books..."
echo "Books: $(wc -l < practice/books.txt)"
require_file "practice/nothing-here.txt"
say "This line is never reached"
EOF
bash scripts/functions.sh
echo "exit code: $?"
```

**What it does:**

| Piece | Meaning |
|---|---|
| `say() { ... }` | Defines a function called `say` |
| `local message="$1"` | A variable that lives only inside the function. `$1` here is the first thing handed to the function |
| `say "Found..."` | Calls (uses) the function |
| `[[ ! -f "$file" ]]` | `!` means NOT: "if the file is **not** a regular file" |
| `fail "..."` | Prints the problem to stderr and stops the whole script |

**What you should see:**

```text
[info] Found practice/books.txt
[info] Counting books...
Books: 3
[error] Missing file: practice/nothing-here.txt
exit code: 1
```

Notice that `This line is never reached` really is never reached: `fail` stopped the script. That is exactly what you want when something is wrong.

**If yours looks different:** if `[error] ...` appears in a different colour in your terminal, that is fine: many terminals colour stderr. If the script did not stop, check that `fail` contains `exit 1`.

## Step 6: Safe habits for scripts that touch files

**Why this matters:** a script runs fast and does not ask "are you sure?". Your habits are the only brakes.

Read the table. You will use every rule in Class 3.

| Do this | Not this | Why |
|---|---|---|
| Quote paths: `"$dir"` | `$dir` | Spaces in a name split it apart |
| Check the input exists first | Assume it is there | A typo should stop the script, not damage something |
| Print the exact paths before acting | Act silently | You can see a mistake before it happens |
| Write to a **new, dated** name | Overwrite a fixed name | No data is lost by accident |
| Refuse if the destination exists | Overwrite quietly | The second run cannot destroy the first |
| Move or copy, then verify | Delete first | Delete only after you have proof |
| Keep secrets in no script, ever | Put a password in a file | Scripts get shared and committed |

**Never do these in a script:**

- `eval` with text a user typed. It runs whatever they typed, including attacks.
- `rm -rf` with a variable in it, or any wildcard you have not looked at.
- Hard-coded passwords, tokens or keys.

> 💡 If you must delete something, delete **one exact, checked, quoted path** (like `rm "$file"`), never a pattern or a guess.

## 🧪 Practice

Write `scripts/safe-copy.sh` that takes a **source folder** and a **destination folder** as arguments and:

1. Shows a usage message and exits with code `2` if either argument is missing
2. Exits with code `1` and a message to stderr if the source does not exist
3. Exits with code `1` if the destination **already exists** (no overwriting)
4. Prints the exact source and destination, then copies with `cp -a "$source" "$destination"`
5. Prints `DONE` on success

Test **every** path: no arguments, a missing source, an existing destination, and a successful copy.

<details>
<summary>Hint (try first!)</summary>

Use `[[ -z "$1" ]]` style checks with `${1:-}`, `[[ ! -d "$source" ]]` and `[[ -e "$destination" ]]` (`-e` means "exists"). `cp -a` copies a folder with everything in it.

</details>

## ✅ Recap

- `set -euo pipefail` stops on errors, on typos in variable names, and on failures inside pipes.
- `if / elif / else / fi` decides. `[[ -f file ]]`, `[[ -d dir ]]`, `[[ -z "$x" ]]` and `-gt` are your tests.
- `case ... esac` is a menu. `*)` catches everything else.
- `for` repeats for each item. `while read` goes through a file line by line.
- A **function** is a reusable helper. `local` keeps its variables private.
- Problems go to stderr with `>&2`. Failures end with a non-zero `exit`.
- Safe scripts check first, print what they will do, never overwrite, and never `eval` or `rm -rf`.

## 📤 Push to your portfolio

In your own portfolio repository, create `bash/class-2/` and add:

1. Your `safe-copy.sh`
2. A `notes.md` with the output of your four test runs, and one sentence on what `set -u` saved you from

Next up: [Class 3: Real operations scripts](class-3-real-operations-scripts.md). You're doing great. 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-your-first-scripts.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-real-operations-scripts.md)</td></tr></table>
