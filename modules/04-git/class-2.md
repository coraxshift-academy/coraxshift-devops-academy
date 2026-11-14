# Class 2: Branches and Pull Requests

**Time:** 2 hours
**Run commands in:** your portfolio repository.

## A branch is a safe work lane

```bash
git switch -c docs/week4-git-workflow
git branch --show-current
```

- `git switch -c` creates a branch and moves you onto it.
- `git branch --show-current` confirms which branch will receive new commits.

Edit one file, then review and commit:

```bash
git status
git diff
git add path/to/changed-file.md
git diff --cached
git commit -m "docs: explain pull request workflow"
```

Replace `path/to/changed-file.md` with the exact path shown by `git status`.

Publish the branch:

```bash
git push -u origin docs/week4-git-workflow
```

`-u` remembers the remote branch so later `git push` commands know where to send commits. On GitHub, open a pull request into the default branch. Explain the goal, the change, and how you tested it.

## Review as a teammate

Read the diff, ask questions about behavior, and check the tests. A review is about the change, not the person. Do not approve a change you have not read.

## Practice

Open a pull request with one small documentation improvement. Ask a classmate to leave one question and one suggestion. Respond, update the branch, and observe that the PR updates automatically.
