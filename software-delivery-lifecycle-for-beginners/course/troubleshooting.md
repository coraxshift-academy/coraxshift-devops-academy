# Troubleshooting

**Software Delivery Lifecycle for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Files and scripts

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `No such file or directory` | You are in the wrong folder | `pwd`, then `cd ~/practice/booknook` |
| `Permission denied` on a script | The script is not executable | `chmod +x list_books.sh run_tests.sh` |
| A file contains the word `EOF` | The closing `EOF` was not on its own line | Delete the file and copy the whole command box again |
| The first lines of a file disappeared | `>` was used instead of `>>` | `>` replaces a file, `>>` adds to it. Redo the earlier step, then this one |
| `list_books.sh` prints nothing | The data file is empty or missing | `cat data/books.txt` |
| Test 3 shows `No such file or directory` | The script edit from Class 2, Step 7 did not save | `cat list_books.sh` and compare it with Step 7 |
| `bad interpreter` or `^M` | Windows line endings | `sed -i 's/\r$//' list_books.sh run_tests.sh` |

## Git

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `Author identity unknown` | Name and email not set | Run the `git config --global` lines from the Git course, Class 1 |
| `nothing to commit, working tree clean` | Nothing changed | That is fine. Edit a file first |
| `tag 'v0.1.0' already exists` | You tagged before | Fine. Check with `git tag` |
| `git revert` says there is a conflict | Later changes touch the same lines | `git revert --abort`, then ask your instructor |
| `Your local changes would be overwritten` | Unsaved changes in the way | `git stash -q`, run the command, then `git stash pop -q` |
| Test 4 shows no `FAIL` line in Class 3, Step 6 | The test line was not added | `grep -n "price shows" run_tests.sh`. If nothing prints, ask your instructor |
| A long screen with `:` at the bottom | Git is showing a pager | Press **q** |

## 🆘 The panic button

If you are afraid you broke something:

1. `git status`
2. `git log --oneline -5`
3. Send both outputs to your instructor

Almost everything in Git can be recovered. The danger is in panicking and running more commands.
