# Recap and What's Next

**Software Delivery Lifecycle for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You can now take an idea all the way to users: plan it, test it, release it and undo it if it goes wrong. That is exactly the habit that separates people who write code from engineers who **deliver** software.

```text
idea ─▶ plan ─▶ build ─▶ test ─▶ review ─▶ release ─▶ watch ─▶ improve
```

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Describe the need | `As a <who>, I want <what>, so that <why>.` |
| Say what "done" means | Given / When / Then criteria |
| Keep the job small | Write what is **out of scope** |
| Plan the work | Small tasks: what, where, finished when |
| Check a feature | A test case: start, action, expected |
| Run all tests | `./run_tests.sh` |
| Report a bug | Steps, expected, actual, evidence |
| Check for secrets | `git ls-files` |
| Mark a release | `git tag -a v0.1.0 -m "Message"` |
| List releases | `git tag` |
| Undo a bad release | `git revert --no-edit <commit>` |
| Set unsaved work aside | `git stash -q` then `git stash pop -q` |

## 🛡️ Your three golden rules

1. **Write down what "done" means before you build.**
2. **Test before release, and retest after every fix.**
3. **Plan the rollback before you need it.**

## ➡️ What comes next

You now understand how software travels from idea to users. The best next step is to **make that journey automatic**: infrastructure and pipelines that build, test and release for you, every time.

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
