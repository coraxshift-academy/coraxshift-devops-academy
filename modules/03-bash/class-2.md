# Class 2: Safe Automation

**Time:** 2 hours
**Run commands in:** your portfolio repository terminal.

## Conditions and functions

```bash
#!/usr/bin/env bash
set -euo pipefail

check_file() {
  local file="$1"
  if [[ -f "$file" ]]; then
    printf 'Found: %s\n' "$file"
  else
    printf 'Missing file: %s\n' "$file" >&2
    return 1
  fi
}

check_file "README-lab.txt"
```

- `function_name() { ... }` groups reusable commands.
- `local` limits a variable to the function.
- `[[ -f ... ]]` checks for a regular file.
- `>&2` sends the error message to stderr, separate from normal output.
- `return 1` marks the function as failed.

## Loops

```bash
for file in README.md curriculum.md; do
  printf '%s has ' "$file"
  wc -l < "$file"
done
```

`for` repeats a block for each item; `wc -l` counts lines; `<` sends a file to a command as input.

## Safe file changes

Before changing a file, inspect it with `ls -l path` and `cat path`. Use a new, exact output path for generated files. Do not use `rm -rf` in a beginner script. Prefer moving a known file to a dated backup, then verify the backup exists before proceeding.

Never turn a variable into a command using `eval`. Never paste secrets into a script or commit `.env` files.

## Practice

Write a script that accepts a source directory and a backup directory. Check that the source exists, refuse to overwrite a backup directory, and print the exact paths before copying. Use `cp -a "$source" "$backup"` to preserve file metadata.

`cp -a` copies a directory tree and preserves attributes. Quoting each variable protects paths containing spaces.
