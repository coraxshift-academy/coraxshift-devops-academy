# Class 3: Conflict Resolution and Recovery

**Time:** 2 hours
**Run commands in:** your portfolio repository.

## Simulate a conflict safely

Use a throwaway folder or ask a partner to edit the same line in separate branches. A conflict means Git cannot decide which of two edits is intended.

```bash
git status
```

Open each conflicted file. Git marks the competing versions with `<<<<<<<`, `=======`, and `>>>>>>>`. Edit the file so it contains the intended final text and no markers remain, then run:

```bash
git diff --check
git diff
git add path/to/resolved-file
git commit -m "docs: resolve practice merge conflict"
```

`git diff --check` finds whitespace mistakes; review the final diff before staging. `git add` tells Git the conflict is resolved.

## Three ways to undo - choose carefully

- `git restore file` discards unstaged edits to a file. This can destroy work.
- `git revert <commit>` makes a new commit that reverses a previous commit. It is usually safest for shared history.
- `git reset` moves the current branch pointer and can rewrite local history. Do not use it to repair shared history without instructor guidance.

Before recovery, run `git status` and save a copy of important work outside the repository.

## Practice

Create a conflict in a throwaway file, resolve it, and explain which version you kept. Do not create a conflict in the course repository's real lesson files.
