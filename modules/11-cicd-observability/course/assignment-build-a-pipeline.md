# Assignment: Build a Pipeline for Your Own App

**CI/CD for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

You built the pipeline for the café charge calculator. Now build one for **your own** small app: a **price or fee calculator** for a business of **your choice** (a salon, a tailor, a school, a delivery rider). It has a few functions, tests, a tiny web layer and a Docker image. Then you give it CI, protection, and CD with a production approval, break it on purpose, and roll back.

Use a **different** business, different prices and different names from the lesson, so the work is yours.

## ✅ Rules

1. Work in a **new** public repository. Do not reuse `cafe-cicd`.
2. **No secrets in any file.** Use GitHub secrets.
3. Use specific versions in `requirements.txt` and image tags tied to the commit.
4. Write every note in your own words. Do not copy an AI answer.

## Task 1: The app

1. Write `app.py` with at least **three** functions for your business, and at least **six** tests.
2. Run the tests and the linter locally. Both must pass.
3. Add `.gitignore` containing `.env` and your virtual environment **before** your first commit.

## Task 2: Continuous Integration

1. Write `ci.yml` that runs the linter and tests on every push to `main` and on every pull request.
2. Use a **matrix** of two Python versions, **caching**, and an **artifact** for the test report.
3. Set `permissions` to read-only.

## Task 3: Protect `main`

1. Protect `main`: pull request required, both test jobs required, rules apply to admins.
2. Prove it: show a **refused direct push**.
3. Show a pull request that is **red** and cannot be merged, then fix and merge it.

## Task 4: Package it

1. Add a small web layer with `/health` and one useful address.
2. Write a `Dockerfile` that runs as a **non-root** user and has a health check.
3. Build and run it locally. Show the answers with `curl`.

## Task 5: Continuous Delivery

1. Create `staging` and `production` environments. Production requires **your** approval.
2. Write `cd.yml` with jobs `test`, `build`, `deploy-staging`, `deploy-production`.
3. The build job tags the image with the **commit**, runs a **smoke test**, and pushes to GHCR.
4. Use **one secret** in the staging job. Prove the log shows it masked.
5. Approve production and show the finished run.

## Task 6: Break it and roll back

1. Make a change that passes the unit tests but fails the **smoke test**.
2. Show the delivery run stopped at `build`, with staging and production **skipped**.
3. Roll back with `git revert` through a pull request, and approve the new run.
4. In `failure-notes.md`, write: what you broke, which gate caught it, how you found the reason in the logs, and how you rolled back.

## 📦 What to hand in

Send your instructor:

1. The link to your repository (it shows the CI badge)
2. The output of `gh run list --workflow cd.yml --limit 5`, which must include a failure and a later success
3. A screenshot of the **Review deployments** box
4. `failure-notes.md`
5. A short reflection (five lines): *What is the difference between CI and CD? Why does production need an approval? Which gate saved you?*

## 🏁 Done checklist

- [ ] New public repository with `.env` ignored from the first commit
- [ ] Tests and linter pass locally
- [ ] CI with matrix, cache and artifact
- [ ] `main` protected, direct push refused
- [ ] A red pull request blocked, then fixed and merged
- [ ] Non-root Docker image with health check
- [ ] Environments created, production needs approval
- [ ] Image tagged with the commit and smoke tested
- [ ] A secret used and shown masked
- [ ] A bad release stopped by the smoke test
- [ ] Rolled back with `git revert`

<details>
<summary>Stuck on the bad release? Hint (try first!)</summary>

Change the **name of a field** in your web answer, for example `"price"` to `"cost"`. Your unit tests only test the functions, so they still pass. Your smoke test asks the real web address and compares the answer, so it fails. Make sure your smoke test checks an exact answer.

</details>

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-continuous-delivery.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-cicd.md)</td></tr></table>
