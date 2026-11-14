# Class 1: Git's Three Areas

**Time:** 2 hours
**Run commands in:** your portfolio repository terminal.

## Picture the workflow

```text
working files -> staging area -> commit history
   edit             select         save snapshot
```

Git does not automatically include every file in a commit. You choose what goes into the next snapshot.

## Inspect before changing

```bash
git status
git log --oneline -5
```

- `git status` shows branch name and changed/untracked files.
- `git log --oneline -5` shows the five latest commits in compact form.

Create and inspect a file:

```bash
printf 'CoraxReads lab notes\n' > week4-notes.txt
git diff -- week4-notes.txt
git status --short
```

`git diff` shows tracked-file edits. A new untracked file will not appear in ordinary `git diff`; `git status` reports it.

Stage one file and inspect the staged snapshot:

```bash
git add week4-notes.txt
git diff --cached
```

`git add` selects content for the next commit; `--cached` shows exactly what is staged.

Commit the change:

```bash
git commit -m "docs: add week 4 lab notes"
```

A commit is a named snapshot. Use a message that says what changed and why.

## Practice

Make a second edit after staging. Compare `git diff` and `git diff --cached`. Explain why the two outputs can differ.
