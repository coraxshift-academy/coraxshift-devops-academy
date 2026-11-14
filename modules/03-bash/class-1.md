# Class 1: Bash Building Blocks

**Time:** 2 hours
**Run commands in:** your Codespace terminal, inside your portfolio repository.

## A script is a saved recipe

An ingredient name in a recipe is like a variable; a step that depends on what you find is like an `if`. Bash runs these instructions in order.

Create a practice folder and file:

```bash
mkdir -p scripts
printf 'CoraxReads practice\n' > README-lab.txt
cat README-lab.txt
```

- `mkdir -p scripts` creates the directory and does not complain if it already exists.
- `printf` writes predictable text to a file. `>` replaces the file; `>>` appends.
- `cat` prints a file so you can verify what was written.

Create `scripts/hello.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

name="${1:-learner}"
printf 'Hello, %s. Welcome to CoraxReads.\n' "$name"
```

- The first line asks the environment to find Bash.
- `set -euo pipefail` stops on command errors, unset variables, and failed commands inside pipelines.
- `${1:-learner}` uses the first argument, or `learner` if none was supplied.
- Quotes around `"$name"` keep spaces together as one value.

Run and compare:

```bash
bash scripts/hello.sh "A learner"
```

Expected output: `Hello, A learner. Welcome to CoraxReads.`

## Exit codes

Every command returns a status: `0` usually means success, and non-zero means something went wrong.

```bash
echo $?
```

`$?` is the previous command's status. Check it immediately; the next command replaces it.

## Practice

Change the script to accept a bookstore name as argument two. Test it with both arguments and with no arguments. Do not use `eval` to build commands from user input.
