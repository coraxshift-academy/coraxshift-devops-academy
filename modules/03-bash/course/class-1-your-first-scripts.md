# Class 1: Your First Scripts

**Bash Scripting for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your first class

Today you will write your first real scripts. You will learn the four building blocks every script uses: **variables** (labelled boxes), **arguments** (things you hand to a script), **user input** (questions a script asks), and **exit codes** (how a script says "it worked" or "it failed"). By the end, a script will feel less like code and more like a recipe you wrote yourself.

**By the end of this class you can:**

- Open your Codespace terminal and go to "home base"
- Store and print values with variables, and use quotes correctly
- Write a script, make it executable and run it
- Give a script arguments and set a default when none is given
- Ask the user a question from a script
- Read and use exit codes

## Prerequisites

- A GitHub account with access to this course repository
- A Codespace opened on this repository (see [Getting Started](../GETTING-STARTED.md))
- Nothing else. No coding experience needed.

## How every step works

Each step follows the same five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, and **If yours looks different**.

> 💡 **Your output will never match ours character for character.** Compare the *meaning*, not every letter.

## Step 0: Open your terminal and go "home base"

**Why this matters:** every class starts from the same folder, so the commands work the same for everyone. Think of it as the classroom door: we all walk in through it.

In your Codespace, open the terminal (menu **☰ → Terminal → New Terminal**, or press **Ctrl + `**). You will see a **prompt**, the line waiting for you to type:

```text
@your-github-name ➜ /workspaces/bash-scripting-for-beginners (main) $
```

**Run it:**

```bash
cd /workspaces/bash-scripting-for-beginners
mkdir -p scripts practice
pwd
```

**What it does:** `cd` means *change directory* (move into a folder). `mkdir -p` makes folders, and does not complain if they already exist. `pwd` prints where you are.

**What you should see:**

```text
/workspaces/bash-scripting-for-beginners
```

**If yours looks different:** `No such file or directory` means your Codespace was opened on a different repository. Close it and open a Codespace from the **bash-scripting-for-beginners** repository.

> 💡 Lost at any time? `cd /workspaces/bash-scripting-for-beginners` always brings you back.

## Step 1: Check your Bash

**Why this matters:** a script is only useful if the program that reads it is there. Bash is the reader.

**Run it:**

```bash
bash --version | head -1
echo "$SHELL"
```

**What it does:** the first command asks Bash for its version (`head -1` keeps just the first line). The second prints which shell your terminal uses.

**What you should see:**

```text
GNU bash, version 5.2.37(1)-release (x86_64-pc-linux-gnu)
/bin/bash
```

**If yours looks different:** any version starting with `5` is fine. If `$SHELL` shows `/bin/zsh`, you are using another shell. That is fine too, because the scripts you write use their own first line to say they want Bash.

## Step 2: Variables, the labelled boxes

**Why this matters:** a script that repeats a name or path in ten places is painful to change. Put it in a labelled box once, and use the label everywhere.

**Run it:**

```bash
name="Amaka"
echo "Hello, $name"
echo 'Hello, $name'
```

**What it does:** `name="Amaka"` puts the word *Amaka* in a box labelled `name`. **No spaces around the `=`.** `$name` means "open the box and use what is inside". Double quotes let Bash open the box. Single quotes do not.

**What you should see:**

```text
Hello, Amaka
Hello, $name
```

**If yours looks different:** if you see `name: command not found`, you probably put spaces around the `=`. It must be `name="Amaka"` with nothing around the equals sign.

## Step 3: Quotes protect your values

**Why this matters:** this one habit prevents most Bash accidents. A space inside a value, without quotes, makes Bash think there are *several* values.

**Run it:**

```bash
file="my book list.txt"
touch "$file"
ls -l $file
```

**What it does:** the name `my book list.txt` has spaces. In the last line there are **no quotes** around `$file`, so Bash splits it into three words: `my`, `book` and `list.txt`.

**What you should see:**

```text
ls: cannot access 'my': No such file or directory
ls: cannot access 'book': No such file or directory
ls: cannot access 'list.txt': No such file or directory
```

Now do it correctly, with quotes:

```bash
ls -l "$file"
```

```text
-rw-r--r-- 1 codespace codespace 0 Nov 25 09:00 my book list.txt
```

Clean up, again with quotes:

```bash
rm "$file"
```

**What it does:** the quotes keep the three words together as **one** name. `rm` deletes that one file. No message means success.

> 💡 **The rule for this whole course:** write `"$variable"` with double quotes, every time, unless you have a reason not to. Imagine what would have happened if the unquoted version had been `rm $file`.

**If yours looks different:** the date, time and `codespace` username will differ. The first output, with the three errors, is the important one. If it did not fail, check that you left the quotes off `$file` in the `ls -l $file` line.

## Step 4: Your first script

**Why this matters:** a script is just the commands you would type, saved in a file, so you can run them again and again.

**Run it:** this copies a whole script into a file in one go. Everything between the two `EOF` lines is saved.

```bash
cat > scripts/hello.sh <<'EOF'
#!/usr/bin/env bash
# hello.sh - greets someone by name
set -euo pipefail

name="${1:-friend}"
echo "Hello, $name! Welcome to CoraxReads."
EOF
```

**What it does:** it creates `scripts/hello.sh`. Here is each line:

| Line | Meaning |
|---|---|
| `#!/usr/bin/env bash` | "This script is for Bash." Always the first line |
| `# hello.sh - ...` | A **comment**. Bash ignores it. Notes for humans |
| `set -euo pipefail` | The safety switch. It stops the script when something goes wrong. You will see why in Class 2 |
| `name="${1:-friend}"` | Use the first thing the user gives (`$1`), or the word `friend` if they gave nothing |
| `echo "..."` | Print a line |

**What you should see:** nothing at all. In Linux, **no message usually means success**. Check the file was created:

```bash
cat scripts/hello.sh
```

**If yours looks different:** if you see the file but the last lines are missing, the `EOF` line was probably not on its own. Run the command again, and copy the whole box.

## Step 5: Run it, and make it executable

**Why this matters:** running a script is how you get the work done. Making it "executable" lets you run it like a program.

**Run it:**

```bash
bash scripts/hello.sh
bash scripts/hello.sh "Amaka Obi"
```

**What you should see:**

```text
Hello, friend! Welcome to CoraxReads.
Hello, Amaka Obi! Welcome to CoraxReads.
```

The first time there was nothing after the script name, so it used the default, `friend`. The second time, `"Amaka Obi"` became `$1`.

Now make it executable and run it directly:

```bash
chmod +x scripts/hello.sh
./scripts/hello.sh Ada
ls -l scripts/hello.sh
```

```text
Hello, Ada! Welcome to CoraxReads.
-rwxr-xr-x 1 codespace codespace 139 Nov 25 09:05 scripts/hello.sh
```

**What it does:** `chmod +x` adds the permission to **execute** (the `x` in `-rwxr-xr-x`). `./` means "the script in this folder".

**If yours looks different:**

| What you see | Most likely reason and fix |
|---|---|
| `Permission denied` | You skipped `chmod +x`. Run it, or use `bash scripts/hello.sh` |
| `No such file or directory` | You are in the wrong folder. Run `cd /workspaces/bash-scripting-for-beginners` |

## Step 6: Arguments: handing things to a script

**Why this matters:** a script that always does the same thing is limited. Arguments let the same script work on different names, files or addresses.

**Run it:**

```bash
cat > scripts/args-demo.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

echo "Script name:   $0"
echo "First word:    ${1:-<none>}"
echo "Second word:   ${2:-<none>}"
echo "How many:      $#"
echo "All of them:   $*"
EOF
bash scripts/args-demo.sh apple banana cherry
bash scripts/args-demo.sh
```

**What it does:**

| Symbol | Meaning |
|---|---|
| `$0` | The name of the script itself |
| `$1`, `$2` | The first and second thing you typed after the script name |
| `$#` | How many things you typed |
| `$*` | All of them together |
| `${1:-<none>}` | `$1`, or `<none>` if it is empty |

**What you should see:**

```text
Script name:   scripts/args-demo.sh
First word:    apple
Second word:   banana
How many:      3
All of them:   apple banana cherry
Script name:   scripts/args-demo.sh
First word:    <none>
Second word:   <none>
How many:      0
All of them:   
```

**If yours looks different:** `unbound variable` means you removed the `:-<none>` part. That part gives each variable a fallback, so the strict safety switch has nothing to complain about.

## Step 7: Exit codes: how a script says "it worked"

**Why this matters:** other programs, and your future automation, do not read your messages. They read one small number the script leaves behind. This is how a health check can tell a robot "the site is down".

**Run it:**

```bash
ls /
echo "exit code: $?"
ls /nonexistent
echo "exit code: $?"
```

**What it does:** `$?` holds the **exit code** of the command that just ran. **`0` means success. Anything else means something went wrong.** Check it straight away: the next command replaces it.

**What you should see:**

```text
bin   boot  dev  etc  home  lib  ...
exit code: 0
ls: cannot access '/nonexistent': No such file or directory
exit code: 2
```

Now make a script that fails on purpose:

```bash
cat > scripts/exit-demo.sh <<'EOF'
#!/usr/bin/env bash
echo "About to fail on purpose..."
exit 3
EOF
bash scripts/exit-demo.sh
echo "exit code: $?"
```

```text
About to fail on purpose...
exit code: 3
```

**What it does:** `exit 3` stops the script and sets its exit code to 3. You choose the number. Convention: `0` success, `1` a general failure, `2` the user used it wrongly.

**If yours looks different:** the list of folders after `ls /` will differ. The exit codes `0`, `2` and `3` are what matter.

## Step 8: Asking the user a question

**Why this matters:** some scripts need an answer from a person before they continue, such as a name or a yes/no.

**Run it:**

```bash
cat > scripts/ask.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

read -r -p "What is your name? " name
read -r -p "Which book are you reading? " book
echo "Nice, $name. Enjoy \"$book\"!"
EOF
bash scripts/ask.sh
```

The script now waits for you. Type a name, press **Enter**, type a book title, press **Enter**.

**What it does:** `read` waits for you to type, and saves your answer in a variable. `-p` shows the question. `-r` stops Bash from treating backslashes in your answer as special.

**What you should see:**

```text
What is your name? Amaka
Which book are you reading? Things Fall Apart
Nice, Amaka. Enjoy "Things Fall Apart"!
```

**If yours looks different:** your answers will be what you typed. If the script seems frozen, it is waiting for you. Type your answer and press Enter.

## 🧪 Practice

Change `hello.sh` so it takes a **bookstore name** as the second argument and prints:

```text
Hello, Amaka! Welcome to Corax Books.
```

Use the default `CoraxReads` when no second argument is given. Test it with no arguments, one argument and two arguments. Never build a command from what the user typed using `eval`.

<details>
<summary>Hint (try first!)</summary>

Add a line `shop="${2:-CoraxReads}"` and use `$shop` in the `echo` line.

</details>

## ✅ Recap

- A **script** is saved commands. Start it with `#!/usr/bin/env bash`, and add `set -euo pipefail`.
- A **variable** is a labelled box: `name="Amaka"`, used as `"$name"`. **Always quote it.**
- **Arguments** are `$1`, `$2`, `$#`. Use `${1:-default}` for a fallback.
- `read -r -p "Question? " answer` asks the user something.
- **Exit codes**: `0` is success, anything else is failure. `$?` shows the last one, and `exit N` sets one.
- `chmod +x` lets you run a script as `./script.sh`.

## 📤 Push to your portfolio

In your own portfolio repository (not this course repo), create a folder `bash/class-1/` and add:

1. Your improved `hello.sh`
2. A short `notes.md` answering: *What is a script? What does `set -euo pipefail` do (as far as you know yet)? What does exit code `0` mean?*

Next up: [Class 2: Decisions, loops and functions](class-2-decisions-loops-functions.md). You're doing great. 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-decisions-loops-functions.md)</td></tr></table>
