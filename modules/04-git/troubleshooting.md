# Week 4 Troubleshooting

| Problem | Check | Safe fix |
| --- | --- | --- |
| `nothing to commit` | Run `git status` and `git diff` | Confirm you edited and saved the file; untracked files need `git add`. |
| Wrong files staged | Run `git diff --cached` | Before commit, unstage with `git restore --staged path`; the file contents remain. |
| Push rejected | Run `git status -sb` and inspect the remote/branch | Fetch and integrate the shared branch using the team workflow; do not force-push shared branches. |
| `src refspec ... does not match` | Run `git branch --show-current` | Check spelling and ensure the branch has a commit. |
| Merge conflict | Run `git status` and open each conflicted file | Edit to the intended result, remove markers, `git diff --check`, stage resolved files, then commit/continue as instructed. |
| Accidentally committed a secret | Stop pushing and tell the instructor/owner | Revoke/rotate the credential immediately. Removing it from the latest commit does not erase it from history or copies. |

## Useful commands

- `git diff --cached` reviews the next commit.
- `git restore --staged FILE` unstages a file without discarding its edits.
- `git revert COMMIT` creates a new undo commit.
- `git remote -v` shows where fetch and push go.

Never run `git push --force` on a shared branch to make a rejection disappear.
