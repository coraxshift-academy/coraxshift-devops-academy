# Troubleshooting

**Git and GitHub for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Git on your computer

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `fatal: not a git repository` | You are outside the repository folder | `pwd`, then `cd ~/practice/recipe-book` |
| `Author identity unknown` | Name and email were not set | Run the two `git config --global` lines from Class 1, Step 1 |
| `nothing to commit, working tree clean` | Nothing has changed since the last commit | That is fine. Edit a file first |
| `nothing added to commit but untracked files present` | You forgot `git add` | `git add file`, then commit again |
| A file will not stop showing up | It was already tracked before `.gitignore` | Ask your instructor. Do not delete history yourself |
| A long screen with `:` at the bottom | Git is showing a pager | Press **q** |
| An editor opened when you committed | You left out `-m "message"` | In the editor type a message, save and close. Or press `Ctrl + C` and retry with `-m` |
| `error: pathspec ... did not match` | Misspelt file or branch name | `git status` or `git branch` to see the real name |
| `Your local changes would be overwritten` | Unsaved edits block a switch | Commit them first, or `git restore file` if you do not need them |

## Branches and conflicts

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `CONFLICT (content)` | Two branches changed the same line | Class 2, Step 5. Or `git merge --abort` to start over |
| `<<<<<<<` markers in a file | A conflict is waiting for you | Edit the file, delete the three marker lines, `git add`, `git commit` |
| `a branch named ... already exists` | You created it before | `git switch name` without `-c` |
| `Cannot delete branch ... not fully merged` | The branch has work `main` does not | Merge it first, or ask your instructor |
| You are in `detached HEAD` | You checked out a commit instead of a branch | `git switch main` |

## GitHub

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `gh auth login` says you are already logged in with a token | The Codespace token is set | `unset GITHUB_TOKEN`, then try again. Repeat in each new terminal |
| `403` or `Permission denied` when pushing | The Codespace is not signed in as you | `unset GITHUB_TOKEN`, `gh auth status`, then `gh auth login` |
| `Repository not found` | Wrong URL, or you are not signed in | `git remote -v`. Compare it with the address on GitHub |
| `remote origin already exists` | Origin was set before | `git remote set-url origin URL` |
| `rejected ... fetch first` | GitHub has commits you do not have | `git pull`. If it says conflict, use Class 2, Step 5 |
| No yellow banner for a pull request | The branch was not pushed | `git push -u origin branch-name`, or use **Pull requests → New pull request** |
| The Merge button is greyed out | A conflict or a required review | Read the message on the page. Ask your instructor |
| Git asks for a password | It is not signed in | Never type your password. Run `unset GITHUB_TOKEN` and `gh auth login` |

## 🆘 The panic button

If you are afraid you broke something, do these three things and stop:

1. `git status`
2. `git log --oneline -5`
3. Copy both outputs and send them to your instructor

Almost everything in Git can be recovered. The danger is **only** in panicking and running more commands.

## 🔖 Where to look next

- Git's own help: `git help commit` (press **q** to leave)
- The free [Pro Git book](https://git-scm.com/book/en/v2)
- [GitHub documentation](https://docs.github.com)
