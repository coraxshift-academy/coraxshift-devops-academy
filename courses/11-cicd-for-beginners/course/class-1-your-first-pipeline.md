# Class 1: Your First Pipeline

**CI/CD for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Today you create a repository, put a small app in it with tests, and build your first **GitHub Actions** workflow. You will watch it run, make it fail on purpose, and fix it.

The app is a **café charge calculator**: given a ticket length (30, 60, 120 minutes or a full day), it says what the customer pays. That is the job HandyCafe did for me. The prices are practice numbers.

**By the end of this class you can:**

- Check that GitHub works from your Codespace
- Create a repository and push code
- Run tests locally
- Write and read a workflow
- Watch a run and read its logs
- Find and fix a failing step

## Prerequisites

- Docker, Git and GitHub basics from the earlier courses
- A GitHub account and a signed-in Codespace

## Step 0: Check you are signed in to GitHub

**Why this matters:** the pipeline lives on GitHub, so your terminal must be allowed to talk to it.

**Run it:**

```bash
gh auth status
git --version
python3 --version
```

**What it does:** asks the GitHub tool (`gh`) who you are, and shows the Git and Python versions.

**What you should see:** `Logged in to github.com account YOUR-NAME`, a Git version and Python 3.10 or newer.

**If yours looks different:** if you see `You are not logged into any GitHub hosts`, run `gh auth login` and follow the questions: choose **GitHub.com**, **HTTPS**, and **Login with a web browser**. If the login does not stick, see [Troubleshooting](troubleshooting.md).

## Step 1: Create the project

**Run it:**

```bash
mkdir -p ~/practice/cafe-cicd
cd ~/practice/cafe-cicd
git init -b main
git config user.name >/dev/null || echo "Set your name first: git config --global user.name \"Your Name\""
```

**What it does:** makes a folder, turns it into a Git repository with `main` as the first branch, and warns you if Git does not know your name yet.

**What you should see:** `Initialized empty Git repository in ...`. If you see the warning, set your name and email as in the Git course.

## Step 2: Add the app

**Why this matters:** a pipeline needs something to check. This is a small function with the ticket prices.

**Run it:**

```bash
cd ~/practice/cafe-cicd
cat > cafe.py <<'EOF'
"""Café charge calculator: how much a customer pays for their browsing time."""

RATES = {30: 100, 60: 180, 120: 340, 1440: 1500}  # minutes -> price in naira


def price_for(minutes):
    """Return the price for a ticket of exactly 30, 60, 120 or 1440 minutes."""
    if minutes not in RATES:
        raise ValueError(f"No ticket for {minutes} minutes. Choose from {sorted(RATES)}")
    return RATES[minutes]


def total_for(tickets):
    """Return the total for a list of ticket lengths, e.g. [30, 60]."""
    return sum(price_for(m) for m in tickets)
EOF
python3 -c "from cafe import price_for; print(price_for(60))"
```

**What it does:** writes `cafe.py`, then asks it the price of a 60-minute ticket.

**What you should see:** `180`.

## Step 3: Add the tests

**Why this matters:** **tests** are questions with known answers. If the code ever gives a wrong answer, a test fails. That is the first gate of every pipeline.

**Run it:**

```bash
cd ~/practice/cafe-cicd
mkdir -p tests
cat > tests/test_cafe.py <<'EOF'
import pytest

from cafe import price_for, total_for


def test_thirty_minutes():
    assert price_for(30) == 100


def test_full_day():
    assert price_for(1440) == 1500


def test_unknown_ticket_is_refused():
    with pytest.raises(ValueError):
        price_for(45)


def test_total_adds_up():
    assert total_for([30, 60]) == 280


def test_empty_total_is_zero():
    assert total_for([]) == 0
EOF
printf 'pytest==8.3.3\nflake8==7.1.1\n' > requirements.txt
cat > .gitignore <<'EOF'
__pycache__/
*.pyc
.pytest_cache/
test-results.xml
.env
.venv/
EOF
python3 -m venv .venv
. .venv/bin/activate
pip install -q -r requirements.txt
python -m pytest -q
```

**What it does:**

- `test_cafe.py` holds five tests, such as "a 30-minute ticket costs 100" and "an unknown ticket is refused".
- `requirements.txt` lists the tools we use, with exact versions.
- `.gitignore` keeps junk, secrets and the virtual environment out of Git.
- A **virtual environment** (`.venv`) keeps those tools separate from the rest of your machine.
- `pytest` runs the tests.

**What you should see:** `5 passed`.

**If yours looks different:** `No module named pytest` means the virtual environment is not active. Run `. .venv/bin/activate` again. If a test fails, compare `cafe.py` with the box above.

## Step 4: Check the style

**Why this matters:** a **linter** reads the code and complains about untidy or suspicious things. It is the second gate.

**Run it:**

```bash
cd ~/practice/cafe-cicd
. .venv/bin/activate
python -m flake8 --max-line-length=100 . --exclude .venv && echo "style is clean"
```

**What you should see:** `style is clean`.

## Step 5: Your first commit

**Run it:**

```bash
cd ~/practice/cafe-cicd
git add .
git status --short
git commit -m "Add café charge calculator with tests"
```

**What you should see:** a list of files to be committed (not `.venv`), then a commit message.

## Step 6: Put it on GitHub

**Why this matters:** workflows run **on GitHub's computers**, so the code has to be on GitHub.

**Run it:**

```bash
cd ~/practice/cafe-cicd
gh repo create cafe-cicd --public --source=. --remote=origin --push
git remote -v
```

**What it does:** creates a **public** repository called `cafe-cicd` on your account, connects it, and pushes your code. It is public because it holds nothing secret, and it unlocks a feature we use in Class 3.

**What you should see:** a link such as `https://github.com/YOUR-NAME/cafe-cicd`, and two `origin` lines.

**If yours looks different:** if `gh repo create` is refused, see Troubleshooting. If it says the name already exists, pick a new one such as `cafe-cicd-2` and use it throughout.

## Step 7: Write your first workflow

**Why this matters:** a **workflow** is a recipe file that GitHub reads from a special folder: `.github/workflows/`.

**Run it:**

```bash
cd ~/practice/cafe-cicd
mkdir -p .github/workflows
cat > .github/workflows/hello.yml <<'EOF'
name: Hello

on:
  push:

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello
        run: echo "Hello from the Coraxshift Net Café pipeline!"
      - name: Show where I am running
        run: |
          echo "Machine: $(uname -a)"
          echo "Who started me: $GITHUB_ACTOR"
          echo "Commit: $GITHUB_SHA"
EOF
cat .github/workflows/hello.yml
```

**What it does, piece by piece:**

- `name` is the label you see on GitHub.
- `on: push` means: *run every time someone pushes*.
- `jobs` lists the jobs. We have one, called `say-hello`.
- `runs-on: ubuntu-latest` means: *use a fresh Linux computer that GitHub lends you*.
- `steps` are the steps, run in order. Each `run` is a command, exactly like you would type.
- `$GITHUB_ACTOR` and `$GITHUB_SHA` are facts GitHub gives every run: who started it, and the exact commit.

> ⚠️ **YAML cares about spaces.** Two spaces per level, never tabs. A `-` starts a list item.

**What you should see:** the file printed back.

## Step 8: Push and watch it run

**Run it:**

```bash
cd ~/practice/cafe-cicd
git add .github/workflows/hello.yml
git commit -m "Add hello workflow"
git push
sleep 10
gh run list --limit 3
```

**What it does:** pushing is the **trigger**. GitHub sees the push, finds the workflow, and starts a run.

**What you should see:** a table with a `Hello` row, status `in_progress` or `completed`, and your commit message.

Now watch it finish:

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" --exit-status
```

**What it does:** finds the newest run and follows it until it ends. `--exit-status` makes the command fail if the run fails.

**What you should see:** the steps ticking off, then `✓ main Hello ...`.

You can also open your repository on GitHub and click the **Actions** tab. A **green tick** means every step passed.

**If yours looks different:** if `gh run list` is empty, wait ten more seconds and try again. If the Actions tab says workflows are disabled, click **I understand my workflows, go ahead and enable them**.

## Step 9: Read the logs

**Run it:**

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$RUN" --log | grep -E "Hello from|Machine:|Who started|Commit:"
```

**What it does:** prints the log and keeps only the lines we care about.

**What you should see:** your messages, including `Hello from the Coraxshift Net Café pipeline!` and `Who started me: YOUR-NAME`.

The machine line shows a Linux computer that is **not yours**. It exists only for this run and is thrown away afterwards.

## Step 10: Make it fail on purpose

**Why this matters:** you will see a red build many times in your career. The first one should be **yours**, on purpose, so it is not frightening.

**Run it:**

```bash
cd ~/practice/cafe-cicd
cat >> .github/workflows/hello.yml <<'EOF'
      - name: A step that will fail
        run: |
          echo "About to run a command that does not exist"
          this-command-does-not-exist
EOF
git add .github/workflows/hello.yml
git commit -m "Break the workflow on purpose"
git push
sleep 10
RUN=$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" --exit-status || echo "The run failed, as planned"
```

**What it does:** adds a step that runs a command that does not exist.

**What you should see:** a failing step, then `The run failed, as planned`. On GitHub the run shows a **red cross**.

## Step 11: Find the cause

**Run it:**

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$RUN" --log-failed | tail -8
```

**What it does:** prints only the log of the failing step.

**What you should see:** the line `this-command-does-not-exist: command not found` and `Process completed with exit code 127`.

**How to read a failure:** open the failed step, read the **last lines**, find the first thing that looks like an error, and ask: *what did the command try to do, and why could it not?* Here it could not find a command.

## Step 12: Fix it

**Run it:**

```bash
cd ~/practice/cafe-cicd
git revert --no-edit HEAD
git push
sleep 10
RUN=$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" --exit-status
```

**What it does:** `git revert` makes a **new** commit that undoes the broken one. History stays honest, and nothing is erased.

**What you should see:** a new run that ends in success, with a green tick on GitHub.

## Step 13: Look back

**Run it:**

```bash
cd ~/practice/cafe-cicd
git log --oneline | head -6
gh run list --limit 5
```

**What you should see:** your commits, including the break and its revert, and your runs: success, failure, success.

## ✅ Recap

- **CI/CD** means checks and delivery happen automatically on every change.
- A **workflow** is a YAML file in `.github/workflows/`.
- `on:` is the **trigger**, `jobs` hold **steps**, and each step runs a command.
- A run happens on a fresh computer that GitHub lends you.
- **Green** means every step passed. **Red** means a step failed, and the logs say why.
- `gh run list`, `watch` and `view --log-failed` are your eyes on the pipeline.
- `git revert` is the safe way to undo a bad change.

## 📤 Push to your portfolio

In your portfolio repository, create `cicd/class-1/` and add:

1. Your `hello.yml`, changed to print **your own** message
2. A `notes.md` answering: *What is a workflow, a job and a step? What started the run? How did you find out why the failed run failed?*

Next up: [Class 2: Continuous Integration](class-2-continuous-integration.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-continuous-integration.md)</td></tr></table>
