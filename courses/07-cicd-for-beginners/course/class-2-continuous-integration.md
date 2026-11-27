# Class 2: Continuous Integration

**CI/CD for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Last class you made a workflow that says hello. Today it does real work: on **every push and every pull request**, it checks the style and runs the tests, on **two Python versions**, and keeps a test report. Then you **lock the front door** so broken code cannot get into `main`.

**By the end of this class you can:**

- Write a CI workflow with a **matrix**, **caching** and an **artifact**
- Download a test report from a run
- See a pull request go **red** because of a bad change
- **Protect** `main` so only checked code can enter
- Fix a bad change and merge it safely

## Prerequisites

- Class 1 finished, with `~/practice/cafe-cicd` pushed to GitHub

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/cafe-cicd
git checkout main
git pull
gh auth status 2>&1 | head -2
git status --short
```

**What you should see:** `Already up to date.`, your GitHub login, and no changed files.

**If yours looks different:** if `git status --short` lists files, run `git stash` to put them aside, then continue.

## Step 1: Replace hello with real CI

**Why this matters:** **Continuous Integration** means every change is checked **automatically** before it joins the rest of the code. People forget to run tests. A pipeline never forgets.

**Run it:**

```bash
cd ~/practice/cafe-cicd
git rm -q .github/workflows/hello.yml
cat > .github/workflows/ci.yml <<'EOF'
name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        python-version: ["3.11", "3.12"]
    steps:
      - name: Get the code
        uses: actions/checkout@v4

      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
          cache: pip

      - name: Install requirements
        run: pip install -r requirements.txt

      - name: Check style
        run: flake8 --max-line-length=100 .

      - name: Run tests
        run: pytest -q --junitxml=test-results.xml

      - name: Keep the test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-${{ matrix.python-version }}
          path: test-results.xml
EOF
git add .github/workflows/ci.yml
git commit -m "Replace hello workflow with CI"
git push
```

**What it does:** removes the hello workflow and adds `ci.yml`. This one push goes straight to `main` because we have not locked it yet.

**What you should see:** a push message ending with `main -> main`.

## Step 2: Understand each part

**Why this matters:** you will write workflows like this for years. Read it slowly once.

- `on: push: branches: [main]` and `on: pull_request` mean: *run when `main` changes, and whenever a pull request is opened or updated.*
- `permissions: contents: read` means: *this workflow may only read the code.* Give a workflow the **least** power it needs.
- `strategy: matrix: python-version: ["3.11", "3.12"]` means: *run this job twice, once per version.* You get two jobs from one description.
- `fail-fast: false` means: *if one version fails, still finish the other, so you see the whole picture.*
- `uses: actions/checkout@v4` borrows a ready-made **action** that downloads your code onto the runner.
- `uses: actions/setup-python@v5` with `cache: pip` installs Python and **remembers** downloaded packages, so the next run is faster.
- `flake8` is the style gate. `pytest` is the test gate.
- `if: always()` means: *do this step even if an earlier step failed.* We want the test report most when tests fail.
- `upload-artifact` keeps the report so you can download it after the run. This is an **artifact**.

## Step 3: Watch it run

**Run it:**

```bash
cd ~/practice/cafe-cicd
sleep 12
RUN=$(gh run list --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" --exit-status
gh run view "$RUN"
```

**What you should see:** two jobs, `test (3.11)` and `test (3.12)`, both with a ✓, and two artifacts listed at the bottom.

**If yours looks different:** if `gh run list` shows nothing, wait a little longer. If a job fails, run `gh run view "$RUN" --log-failed | tail -15` and read it.

## Step 4: Download the test report

**Run it:**

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
rm -rf /tmp/report && mkdir -p /tmp/report
gh run download "$RUN" --dir /tmp/report
ls /tmp/report
head -c 300 /tmp/report/test-results-3.12/test-results.xml; echo
```

**What it does:** downloads the artifacts the run saved and shows the start of one report.

**What you should see:** two folders (`test-results-3.11`, `test-results-3.12`) and a line beginning `<?xml` that mentions `tests="5"`.

## Step 5: A bad change arrives

**Why this matters:** now see CI do its real job. A teammate (you, pretending) changes a price and **forgets to run the tests**.

**Run it:**

```bash
cd ~/practice/cafe-cicd
git checkout -b change-prices
sed -i 's/30: 100,/30: 90,/' cafe.py
grep -n "RATES" cafe.py
. .venv/bin/activate
python -m pytest -q 2>&1 | tail -4
```

**What it does:** makes a new branch, changes the 30-minute price from 100 to 90, and runs the tests locally so you can see them fail.

**What you should see:** `RATES = {30: 90, ...}` and `2 failed, 3 passed`. The tests know the old price, so they complain.

Now push it anyway, as a person who forgot would:

```bash
cd ~/practice/cafe-cicd
git add cafe.py
git commit -m "Change 30-minute price to 90"
git push -u origin change-prices
gh pr create --title "Change 30-minute price" --body "Practice change"
sleep 15
gh pr checks --watch --interval 10 || echo "Checks failed, as planned"
```

**What it does:** pushes the branch and opens a **pull request** (a request to merge it into `main`). The CI workflow starts by itself.

**What you should see:** a PR link, then both checks failing, then `Checks failed, as planned`. On GitHub the pull request shows **red crosses** next to `test (3.11)` and `test (3.12)`.

CI caught what a person forgot.

## Step 6: Lock the front door

**Why this matters:** a red check is only a warning unless something **stops** the merge. **Branch protection** is the lock. We set three rules on `main`:

1. Changes must come through a **pull request**.
2. Both **test** jobs must pass.
3. The rules apply to **everyone, including you**.

**Run it:**

```bash
cd ~/practice/cafe-cicd
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
echo "Protecting main in $REPO"
gh api -X PUT "repos/$REPO/branches/main/protection" --input - <<'EOF'
{
  "required_status_checks": { "strict": false, "contexts": ["test (3.11)", "test (3.12)"] },
  "enforce_admins": true,
  "required_pull_request_reviews": { "required_approving_review_count": 0 },
  "restrictions": null
}
EOF
gh api "repos/$REPO/branches/main/protection" --jq '.required_status_checks.contexts'
```

**What it does:** sends the rules to GitHub. The last line reads them back.

**What you should see:** `["test (3.11)","test (3.12)"]`.

**If yours looks different:** if you see `Upgrade to GitHub Pro or make this repository public` your repository is private. Make it public in **Settings, General, Danger Zone** (it holds nothing secret), or see Troubleshooting. If you see `Branch not found`, you have not pushed `main` yet.

## Step 7: Try to break the lock

**Why this matters:** never trust a lock you have not tried.

**Run it:**

```bash
cd ~/practice/cafe-cicd
git checkout main
git commit --allow-empty -m "Try to push straight to main"
git push || echo "Direct push refused, as planned"
git reset --hard origin/main
git status --short
git log --oneline | head -2
```

**What it does:** makes an empty commit on `main` and tries to push it. It will be refused. Then `git reset --hard origin/main` throws away **only that practice commit**.

**What you should see:** a message mentioning `protected branch` or `Changes must be made through a pull request`, then `Direct push refused, as planned`, then your log without the practice commit.

> ⚠️ `git reset --hard` deletes uncommitted work and local commits. Here it is safe because we just made a throwaway commit. Think before using it anywhere else.

Now try to merge the **red** pull request:

```bash
cd ~/practice/cafe-cicd
gh pr merge change-prices --squash || echo "Merge refused, as planned"
```

**What you should see:** a refusal that mentions the pull request is **not mergeable** or the **base branch policy**, then `Merge refused, as planned`.

The lock holds, even for you.

## Step 8: Fix it and merge safely

**Run it:**

```bash
cd ~/practice/cafe-cicd
git checkout change-prices
git revert --no-edit HEAD
git push
sleep 15
gh pr checks --watch --interval 10
```

**What it does:** undoes the bad price change on the branch. The pull request updates, and CI runs again.

**What you should see:** both checks passing, with a final summary of `All checks were successful`.

Merge it and come back to `main`:

```bash
cd ~/practice/cafe-cicd
gh pr merge change-prices --squash --delete-branch
git checkout main
git pull
git log --oneline | head -3
```

**What you should see:** the merge succeeds this time, and `main` has a new commit.

## Step 9: A shortcut for the future

**Why this matters:** from now on, every change goes branch, push, pull request, wait for green, merge. This function does the whole walk and **stops if any check is red**.

**Run it:**

```bash
cat >> ~/.bashrc <<'EOF'

ship() {
  git push -u origin HEAD \
    && gh pr create --fill \
    && sleep 15 \
    && gh pr checks --watch --interval 10 \
    && gh pr merge --squash --delete-branch \
    && git checkout main \
    && git pull
}
EOF
. ~/.bashrc
type ship | head -1
```

**What it does:** saves a small helper called `ship` in your shell settings.

**What you should see:** `ship is a function`.

Use it to add a status badge to your README:

```bash
cd ~/practice/cafe-cicd
git checkout -b add-badge
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
cat > README.md <<EOF
# Café charge calculator

![CI](https://github.com/$REPO/actions/workflows/ci.yml/badge.svg)

A practice app for the Coraxshift DevOps Academy CI/CD course.
EOF
git add README.md
git commit -m "Add README with CI badge"
ship
```

**What you should see:** a pull request link, the checks passing, the merge, and you back on `main`.

Open your repository on GitHub. The README now shows a **CI badge** that turns green or red with your latest result.

## ✅ Recap

- **CI** checks every change automatically, on every push and pull request.
- A **matrix** runs the same job on several versions.
- **Caching** makes runs faster. An **artifact** keeps a file from a run.
- `permissions` gives a workflow the least power it needs.
- A red check is a warning. **Branch protection** makes it a lock.
- You tried the lock, and it held.
- `ship` walks a change through a pull request and stops on red.

## 📤 Push to your portfolio

In your portfolio repository, create `cicd/class-2/` and add:

1. Your `ci.yml`, changed to also test a **third** Python version of your choice
2. A `notes.md` answering: *What does a matrix do? Why did the pull request go red? What does branch protection add that a red check alone does not?*

Next up: [Class 3: Continuous Delivery](class-3-continuous-delivery.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-your-first-pipeline.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-continuous-delivery.md)</td></tr></table>
