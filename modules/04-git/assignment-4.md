# Assignment 4: Ship a Reviewed Change

**Time:** 2-3 hours
**Submit in:** your portfolio repository, `modules/04-git/assignment-4/`.

## Task 1 - Check the repository

Run `git status`, `git branch --show-current`, and `git log --oneline -5`.

- `status` shows work not committed.
- `branch --show-current` identifies your current work lane.
- `log` shows recent snapshots.

Write down the default branch and whether the working tree is clean. Do not continue if you have uncommitted changes you do not understand.

## Task 2 - Make a branch

Run `git switch -c docs/coraxreads-runbook`. Add a short `RUNBOOK.md` with how to start the current practice app, how to check it, and how to ask for help.

## Task 3 - Review and commit

Run `git status`, `git diff`, `git add RUNBOOK.md`, and `git diff --cached`. Confirm only your intended file is staged. Commit with a clear message.

## Task 4 - Open a pull request

Run `git push -u origin docs/coraxreads-runbook`. Open a PR, describe the change and verification, and request a review. Do not merge until the reviewer approves.

## Task 5 - Practice conflict and recovery

In a disposable file or toy repository, create a conflicting edit, resolve it, and record the resolution. Demonstrate `git revert` on a disposable commit. Do not use `reset --hard` on your portfolio.

## Submit

Provide the PR link, screenshots of the staged diff and review, the conflict explanation, and the final runbook.
