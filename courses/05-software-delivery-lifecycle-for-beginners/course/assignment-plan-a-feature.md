# Assignment: Plan a Feature from Idea to Rollback

**Software Delivery Lifecycle for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

A friend runs a small business and asks you to help with one new feature for their website or app. You will take it all the way: **plan it, build the smallest version, test it, release it and prepare to roll it back.**

Choose **your own** feature. It should be small enough to finish in one sitting. Ideas: *show opening hours*, *list today's specials*, *a price list page*, *a contact reminder*, *a list of upcoming classes*.

Do **not** reuse the BookNook example. Change the names, the data and the wording so the work is yours.

## ✅ Rules

1. Work in your Codespace and your own repository only.
2. **No secrets** in any file, issue or bug report: no passwords, tokens or customer data.
3. Write every document in your own words. Do not copy an AI answer.
4. Every script you write starts with `#!/usr/bin/env bash` and quotes its variables: `"$name"`.
5. Never use `git reset --hard` or `git push --force`.

## 📋 What you need

- Your Codespace and your portfolio repository
- Your notes from the three classes

## Task 1: Plan it

Create `plan/story.md` with:

1. A user story: *As a ___, I want ___, so that ___*
2. At least **three** acceptance criteria in Given / When / Then form: one normal, one empty, one failure
3. Scope: at least two things **in** and two things **out**
4. At least three risks
5. A builder and a reviewer

## Task 2: Break it down

Create `plan/tasks.md`. List **four to six** small tasks. Each one names **what changes**, **where**, and **how we know it is finished**. Add a simple flow picture using arrows.

## Task 3: Build the smallest version

Build a tiny working version, like `list_books.sh`. A short Bash script that reads a data file and prints a result is perfect. It must handle the normal, empty and failure cases from Task 1.

## Task 4: Test it

1. Create `plan/tests.md` with one test case per criterion. Mark each as unit, integration or end-to-end.
2. Create `run_tests.sh` that runs them and prints `PASS` or `FAIL`.
3. **Break something on purpose**, watch a test fail, and write a bug report in `bugs/` using the format from Class 2.
4. Fix it and run the tests again.

## Task 5: Release it

1. Create `plan/release-checklist.md` and tick every item.
2. Tag your release `v0.1.0` with `git tag -a`.
3. Write `RELEASE-NOTES.md` for it, in plain words, for a non-technical reader.

## Task 6: Make a bad release, then roll back

1. Make a small bad change, commit it and tag it `v0.2.0`.
2. Notice it, then roll it back with `git revert`.
3. Add a test that would have caught it, and tag the recovery `v0.2.1`.
4. Write `plan/rollback-plan.md` with: last known good version, who decides, signs of trouble, steps, and one warning about data changes.

## Task 7: Review

Ask a partner (or your instructor) to read your story and criteria and try to find anything unclear. Change at least one thing based on what they say, and write one line about it in your notes.

## 📦 What to hand in

Send your instructor:

1. The link to your portfolio folder on GitHub
2. The output of `git log --oneline --decorate` and `git tag`
3. A short reflection (five lines): *What risk did you find that you had not expected? What would you test differently next time?*

## 🏁 Done checklist

- [ ] Story with three criteria (normal, empty, failure)
- [ ] In scope, out of scope and risks written
- [ ] Four to six small tasks
- [ ] Working script that handles all three cases
- [ ] `run_tests.sh` with PASS/FAIL output
- [ ] One bug found, reported and fixed
- [ ] Release checklist, tag `v0.1.0`, release note
- [ ] A bad release rolled back, recovery tagged `v0.2.1`
- [ ] Rollback plan
- [ ] No secrets in any file (`git ls-files`)

<details>
<summary>Stuck on the bad release? Hint (try first!)</summary>

A bad release can be tiny: change a message, drop a currency sign, or reverse a sort order. Commit it, tag it, then use `git revert --no-edit HEAD`. If you have unsaved changes, `git stash -q` first and `git stash pop -q` after.

</details>

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-release-and-rollback.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-delivery.md)</td></tr></table>
