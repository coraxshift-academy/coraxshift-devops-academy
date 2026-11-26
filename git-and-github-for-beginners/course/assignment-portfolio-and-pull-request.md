# Assignment: Build Your Portfolio and Send a Pull Request

**Git and GitHub for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

Employers and clients rarely believe a CV alone. They believe **work they can see**. In this assignment you turn your practice into a real portfolio repository and prove you can work the way a team does: on a branch, with a pull request.

You will build it in your own words and your own style. You may look back at the classes, but do **not** copy the class examples word for word. Make the project yours.

## ✅ Rules

1. Work in your Codespace and your own repositories only.
2. **No secrets** in any file or commit: no passwords, tokens, keys or `.env` files.
3. Every change goes through a **branch and a pull request**. Do not commit straight to `main` after Task 1.
4. Write commit messages and descriptions in your own words. Do not copy an AI answer.
5. Never use `git push --force` or `git reset --hard`.

## 📋 What you need

- Your `recipe-book` repository from the classes, or a fresh project of your own choice
- Your `my-devops-portfolio` repository on GitHub, connected as `origin`

## Task 1: Set up the portfolio

In your portfolio repository, make sure the following exist on `main`:

1. A `README.md` with: who you are (two sentences), what you are learning, and a list of your projects with links
2. A `.gitignore` that covers at least `.env`, `*.tmp`, `*.log` and `.DS_Store`
3. A folder called `git-and-github/` that holds your class notes

Commit each item separately with a clear message.

## Task 2: A feature branch with three commits

Create a branch called `add-project-notes`. On it, make **three separate commits**, for example:

1. Add a `git-and-github/cheatsheet.md` with ten commands you use, each explained in one plain sentence
2. Add a `git-and-github/mistakes.md` describing one mistake you made in class and how you fixed it
3. Update the main README so it links to both files

Push the branch to GitHub.

## Task 3: A pull request

Open a pull request from `add-project-notes` into `main` with:

- A clear title
- A description of **what** you changed and **why** (three to five lines)
- At least one comment of your own on the **Files changed** tab

Merge it, delete the branch, and run `git switch main && git pull` on your computer.

## Task 4: A conflict, fixed

Make a conflict **on purpose** in your portfolio, as in Class 2:

1. Create a branch `edit-intro` and change the first sentence of the README
2. Switch to `main`, change **the same sentence** differently, and commit
3. Merge `edit-intro` into `main`, then fix the conflict and commit the result
4. In `git-and-github/mistakes.md`, write two lines about how you read the conflict markers

## Task 5: Review a classmate (or your instructor)

If you have a study partner, add them as a collaborator and review one of their pull requests with at least two thoughtful comments. If you work alone, send your instructor the link to your merged pull request.

## 📦 What to hand in

Send your instructor:

1. The link to your portfolio repository
2. The link to your merged pull request
3. The output of `git log --oneline --graph --decorate -15`

## 🏁 Done checklist

- [ ] README, `.gitignore` and `git-and-github/` exist on `main`
- [ ] The feature branch has three clear commits
- [ ] A pull request was opened, commented on and merged
- [ ] A conflict was created and fixed
- [ ] `git ls-files` shows no secrets
- [ ] All messages are in your own words

<details>
<summary>Stuck on the branch name or the conflict? Hint (try first!)</summary>

Use `git switch -c add-project-notes` to create the branch. For the conflict, you need two branches that change the same line. If the merge succeeds without a conflict, you changed different lines. Try again on one line.

</details>

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-github-and-teamwork.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-git.md)</td></tr></table>
