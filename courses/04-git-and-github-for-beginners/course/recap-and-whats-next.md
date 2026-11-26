# Recap and What's Next

**Git and GitHub for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You started this course not knowing what a commit was. You now save work in clear steps, try ideas on branches, fix conflicts, undo mistakes safely, and share work through pull requests. That is the daily routine of working engineers.

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Start tracking a folder | `git init` |
| See where I am | `git status` |
| Choose what to save | `git add file` |
| Save a snapshot | `git commit -m "Clear message"` |
| See unstaged / staged changes | `git diff` / `git diff --staged` |
| Read history | `git log --oneline --graph --decorate` |
| Keep a file out of Git | add it to `.gitignore` |
| Make and enter a branch | `git switch -c name` |
| Move between branches | `git switch name` |
| Bring a branch in | `git merge name` |
| Cancel a messy merge | `git merge --abort` |
| Drop unsaved edits | `git restore file` |
| Safely undo a saved commit | `git revert --no-edit HEAD` |
| Connect to GitHub | `git remote add origin URL` |
| Upload / download | `git push` / `git pull` |
| Copy a repository | `git clone URL` |
| Check for secrets before pushing | `git ls-files` |

## 🛡️ Your three golden rules

1. **Never commit secrets.** Create `.gitignore` first.
2. **Never force-push shared work.**
3. **Small commits, clear messages, one idea per branch.**

## ➡️ What comes next

Your repository is now the place where everything else lives. The best next steps build on it: **automating work with a pipeline** that runs every time you push, and **packaging your projects in containers**.

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
