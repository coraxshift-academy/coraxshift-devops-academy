# Class 2: Branches, Merging and Undo

**Git and GitHub for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Last class you saved work. Today you learn the two superpowers that make Git worth learning: **branches** (try ideas without risk) and **undo** (fix mistakes without panic).

Picture a branch as a **photocopy of your recipe book**. You scribble on the copy freely. If you like the result, you merge it back into the original. If not, you throw the copy away and the original never knew.

```text
main      ●───●───●─────────●   (merge)
                   \       /
new-idea            ●───●─┘
```

**By the end of this class you can:**

- Create, switch and delete branches
- Merge a branch back into `main`
- Fix a merge conflict calmly
- Discard local edits with `git restore`
- Undo a saved commit safely with `git revert`
- Explain why `git reset --hard` is the dangerous one

## Prerequisites

- Class 1 finished, with your `recipe-book` repository

## Step 0: Return to your repository

**Why this matters:** every Git command works on the repository you are standing in.

**Run it:**

```bash
cd ~/practice/recipe-book
git status
git log --oneline
```

**What you should see:** `On branch main`, `nothing to commit, working tree clean`, and your list of commits from Class 1.

**If yours looks different:** `No such file or directory` means Class 1 was not finished. Go back and complete it first. If `git status` lists changes, run `git add -A` then `git commit -m "Save work from Class 1"`.

## Step 1: Create a branch and switch to it

**Why this matters:** you want to add a new recipe without touching the safe version on `main`.

**Run it:**

```bash
git switch -c add-soup
git branch
```

**What it does:** `git switch -c add-soup` creates a branch called `add-soup` and moves you onto it (`-c` means *create*). `git branch` lists branches; the `*` marks where you are.

**What you should see:**

```text
Switched to a new branch 'add-soup'
* add-soup
  main
```

**If yours looks different:** `fatal: a branch named 'add-soup' already exists` means you did this step before. Use `git switch add-soup` (no `-c`).

## Step 2: Work on the branch

**Run it:**

```bash
cat > soup.md <<'EOF'
# Tomato Soup

- 6 ripe tomatoes
- 1 onion
- 1 cup water
EOF
git add soup.md
git commit -m "Add tomato soup recipe"
ls
git switch main
ls
```

**What it does:** you add and commit a file on `add-soup`. Then you go back to `main` and list the files again.

**What you should see:** `soup.md` appears in the first `ls`, and **vanishes** in the second one.

**If yours looks different:** if `soup.md` is still there on `main`, run `git branch` and check which branch you are on.

> 💡 Your file is not gone. It lives safely on the `add-soup` branch. Git swaps the files in your folder to match the branch you are on.

## Step 3: Merge the branch

**Why this matters:** the idea is good, so bring it into `main`.

**Run it:**

```bash
git merge add-soup
git log --oneline --graph --decorate
```

**What it does:** you are on `main`, so `git merge add-soup` brings the soup commit in. Because `main` had no new work of its own, Git simply moves `main` forward. This is called a **fast-forward**.

**What you should see:**

```text
Updating 8e1d3a2..c5b7f90
Fast-forward
 soup.md | 5 +++++
```

**If yours looks different:** `Already up to date` means the merge already happened.

Clean up the finished branch:

```bash
git branch -d add-soup
```

## Step 4: Make a conflict on purpose (so it never scares you)

**Why this matters:** a **conflict** happens when two branches change the *same line* and Git cannot decide which one wins. It is not an error. It is Git asking you a question. Let us create one, safely.

**Run it:**

```bash
git switch -c sweet-version
sed -i 's/1 cup milk/1 cup coconut milk/' pancakes.md
git commit -am "Use coconut milk in pancakes"
git switch main
sed -i 's/1 cup milk/1 cup oat milk/' pancakes.md
git commit -am "Use oat milk in pancakes"
git merge sweet-version
```

**What it does:** on the branch you change the milk to coconut milk. On `main` you change the same line to oat milk. Merging now makes Git stop, because both changed the same line.

**What you should see:**

```text
Auto-merging pancakes.md
CONFLICT (content): Merge conflict in pancakes.md
Automatic merge failed; fix conflicts and then commit the result.
```

**If yours looks different:** if the merge succeeded without a conflict, the `sed` line did not change the file. Run `cat pancakes.md` and check that it contains `1 cup milk` before Step 4 starts.

## Step 5: Fix the conflict

**Run it:**

```bash
git status
cat pancakes.md
```

You will see something like this:

```text
# Pancakes

- 1 cup flour
- 1 egg
<<<<<<< HEAD
- 1 cup oat milk
=======
- 1 cup coconut milk
>>>>>>> sweet-version
- 1 pinch of salt
```

**How to read it:**

| Marker | Meaning |
|---|---|
| `<<<<<<< HEAD` | Start. The lines below are **your current branch** (`main`) |
| `=======` | The divider |
| `>>>>>>> sweet-version` | End. The lines above are from **the branch you are merging** |

**Your job:** decide what the final line should be, then delete the three marker lines. Let us keep both ideas. In the editor (open `pancakes.md` in the Codespace), make that part look like this:

```text
- 1 cup oat milk or coconut milk
```

**Save the file**, then finish the merge:

```bash
grep -n '<<<<<<<\|>>>>>>>\|=======' pancakes.md || echo "no markers left"
git add pancakes.md
git commit -m "Merge sweet-version: allow oat or coconut milk"
git log --oneline --graph --decorate -6
```

**What it does:** the `grep` line checks that no marker lines are left. `git add` tells Git "this file is now resolved". `git commit` completes the merge.

**What you should see:** `no markers left`, then a graph that splits and joins back together.

**If yours looks different:** if `grep` prints lines, a marker is still in the file. Remove it and run the `grep` again. If you panic, run `git merge --abort` to go back to before the merge, then try again.

> 💡 **Conflict rule of thumb:** stay calm, read both sides, pick the right result, delete the markers, `git add`, `git commit`. You can always `git merge --abort`.

## Step 6: Undo 1: discard edits you have not saved

**Why this matters:** you edited a file, and now you regret it.

**Run it:**

```bash
echo "oops, a mistake" >> README.md
git status --short
git restore README.md
git status --short
cat README.md
```

**What it does:** `git restore README.md` puts the file back exactly as it was in the last commit.

**What you should see:** ` M README.md` before, nothing after, and no `oops` line in the file.

> ⚠️ **`restore` cannot be undone.** The unsaved edits are gone for good, because they were never committed. Use it only when you are sure.

**If yours looks different:** if the mistake line is still there, check that the file name is spelled correctly.

## Step 7: Undo 2: reverse a saved commit, safely

**Why this matters:** you committed something wrong. `git revert` makes a **new commit that does the opposite**, so history stays honest.

**Run it:**

```bash
echo "- 1 spoon of chilli" >> soup.md
git commit -am "Add chilli to soup"
git log --oneline -3
git revert --no-edit HEAD
git log --oneline -4
cat soup.md
```

**What it does:** you make a commit you do not want, then revert it. `HEAD` means the latest commit. `--no-edit` accepts Git's own message.

**What you should see:**

```text
f2c9a10 Revert "Add chilli to soup"
b81e4d7 Add chilli to soup
```

and a `soup.md` without the chilli line.

**If yours looks different:** a conflict during a revert is handled exactly like Step 5.

## Step 8: Undo 3: the dangerous one

**Why this matters:** you will meet `git reset --hard` in tutorials. You need to know why you should be careful.

| Command | What it does | Safe? |
|---|---|---|
| `git restore file` | Throws away unsaved edits to a file | ⚠️ Unsaved work is lost |
| `git revert commit` | Adds a new commit that undoes an old one | ✅ Safe. History is kept |
| `git reset --hard commit` | Moves the branch back and **deletes** later work | 🚫 Dangerous. Never use it on shared work |

**Rule for this course:** do not run `git reset --hard`. If you ever think you need it, ask your instructor first.

> 💡 **Safety net:** `git reflog` lists where `HEAD` has been recently. Even after a mistake, it often shows the commit code you can return to. Try it now: `git reflog | head -5`.

## ✅ Recap

- A **branch** is a safe copy to work on. `git switch -c name` makes one. `git switch name` moves between them.
- `git merge name` brings a branch into the one you are on. If both changed the same line, you get a **conflict**.
- To fix a conflict: read both sides, edit, delete the markers, `git add`, `git commit`. `git merge --abort` cancels.
- `git restore file` drops unsaved edits. `git revert commit` safely undoes a saved one. Avoid `git reset --hard`.

## 📤 Push to your portfolio

Add a file `class-2-notes.md` to your `recipe-book` repository answering in your own words:

1. What is a branch, in one everyday sentence?
2. What does a merge conflict mean, and is it an error?
3. When would you choose `revert` instead of `restore`?

Commit it with a good message.

Next up: [Class 3: GitHub and teamwork](class-3-github-and-teamwork.md). Nearly there. 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-your-first-repository.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-github-and-teamwork.md)</td></tr></table>
