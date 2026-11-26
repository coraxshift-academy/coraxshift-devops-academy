# Recap and What's Next

**CI/CD for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You built a pipeline from nothing: checks on every change, a locked `main`, an image built and smoke tested, a secret kept safe, a human approval before production, and a bad release stopped and rolled back. This is what teams get paid to run.

```text
push ─▶ pull request ─▶ checks ─▶ merge ─▶ test ─▶ build ─▶ smoke test ─▶ publish ─▶ staging ─▶ approval ─▶ production
```

> 📖 **From my café:** The best operation is the one where every change follows the same steps and a gate stops a problem early. You now know how to build those gates in software.

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Check I am signed in | `gh auth status` |
| Create and push a repository | `gh repo create NAME --public --source=. --push` |
| List runs | `gh run list --limit 5` |
| Follow a run | `gh run watch RUN_ID --exit-status` |
| See a run | `gh run view RUN_ID` |
| Read only the failure | `gh run view RUN_ID --log-failed` |
| Download artifacts | `gh run download RUN_ID` |
| Open a pull request | `gh pr create --fill` |
| Watch pull request checks | `gh pr checks --watch` |
| Merge | `gh pr merge --squash --delete-branch` |
| Undo a change safely | `git revert --no-edit HEAD` |
| Store a secret | `gh secret set NAME --body 'value'` |
| List secrets | `gh secret list` |

## 🛡️ Your four golden rules

1. **Every change goes through a pull request and green checks.**
2. **Never put a secret in a file.**
3. **Test the thing you deliver.**
4. **Roll back with a revert, through the same pipeline.**

## ➡️ What comes next

You can now build, check and deliver software. The next course is **Monitoring and Observability**: how to **see** what a running system is doing, notice abnormal behaviour, and be told when something is wrong, so you can take the right action.

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
