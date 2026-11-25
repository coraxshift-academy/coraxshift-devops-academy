# Class 3: Release and Rollback

**Software Delivery Lifecycle for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to the last class

Your feature is planned, built and tested. Now it meets real users. This is the moment professionals are most careful, because a release that cannot be undone is a gamble. Today you learn to release calmly, and to **go back** when something goes wrong.

> 💭 Pilots use checklists even after 10,000 flights. Not because they forget how to fly, but because the cost of forgetting one step is high.

**By the end of this class you can:**

- Save your tests as one command anyone can run
- Use a **release checklist**
- Mark a release with a **Git tag** and write a **release note**
- Notice a bad release and **roll back** safely
- Write a rollback plan

## Prerequisites

- Classes 1 and 2 finished, with your `booknook` folder

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/booknook
git status
git log --oneline | head -3
```

**What you should see:** a clean working tree, and your latest commit `Fix empty list message and friendly missing-file error` or later.

**If yours looks different:** if you see uncommitted changes, run `git add -A` then `git commit -m "Save work from Class 2"`.

## Step 1: Make your tests one command

**Why this matters:** tests you must remember to run are tests you will skip. Put them in one script so anyone can run them in a second.

**Run it:**

```bash
cat > run_tests.sh <<'EOF'
#!/usr/bin/env bash
# Runs the three BookNook test cases. Exit code 0 means all passed.
fail=0
check() {  # check "name" "expected" "actual"
  if [[ "$2" == "$3" ]]; then echo "PASS  $1"; else echo "FAIL  $1 (expected '$2', got '$3')"; fail=1; fi
}

: > /tmp/booknook-empty.txt

check "1 shows three books"   "3" "$(./list_books.sh | wc -l | tr -d ' ')"
check "2 empty list message"  "No books yet. Please check back soon." "$(./list_books.sh /tmp/booknook-empty.txt)"
./list_books.sh /tmp/booknook-missing.txt > /dev/null 2>&1
check "3 missing data exits 1" "1" "$?"

if [[ $fail -eq 0 ]]; then echo "ALL TESTS PASSED"; else echo "SOME TESTS FAILED"; fi
exit $fail
EOF
chmod +x run_tests.sh
./run_tests.sh
echo "exit code: $?"
```

**What it does:** the script runs each test and prints `PASS` or `FAIL`. The `check` function compares what we expected with what we got. The exit code is `0` only if every test passed.

**What you should see:**

```text
PASS  1 shows three books
PASS  2 empty list message
PASS  3 missing data exits 1
ALL TESTS PASSED
exit code: 0
```

**If yours looks different:** a `FAIL` line tells you which test failed and why. Compare your `list_books.sh` with Class 2, Step 7.

```bash
git add run_tests.sh
git commit -m "Add one-command test script"
```

## Step 2: Use a release checklist

**Why this matters:** a checklist turns "I think it is ready" into "I checked".

**Run it:**

```bash
cat > plan/release-checklist.md <<'EOF'
# Release checklist

- [ ] The change is linked to its story (plan/story.md)
- [ ] All tests pass (./run_tests.sh)
- [ ] A second person reviewed the change
- [ ] No passwords, keys or private data are in the files (git ls-files)
- [ ] The release note is written
- [ ] The previous good version is known (its tag)
- [ ] The rollback steps are written down
- [ ] After release: we looked at the result and it is healthy
EOF
git add plan/release-checklist.md
git commit -m "Add release checklist"
```

**What you should see:** `1 file changed`.

## Step 3: Tick the boxes, then tag the release

**Why this matters:** a **tag** is a permanent label on one exact moment in your history. If something breaks, you know precisely which version was the good one.

**Run it:**

```bash
./run_tests.sh && echo "tests ok, safe to tag"
git ls-files
git tag -a v0.1.0 -m "BookNook first release: book list"
git tag
git show v0.1.0 --stat | head -8
```

**What it does:** the `&&` means "only continue if the tests passed". `git ls-files` lists every file Git tracks, so you can check for secrets. `git tag -a` creates a labelled release marker. `git show` displays it.

**What you should see:**

```text
tests ok, safe to tag
...
v0.1.0
tag v0.1.0
Tagger: Your Name <you@example.com>
BookNook first release: book list
```

**If yours looks different:** `tag 'v0.1.0' already exists` means you tagged before. That is fine.

> 💡 **Version numbers.** `v0.1.0` reads as `major.minor.patch`. A bug fix bumps the last number (`v0.1.1`), a new feature bumps the middle (`v0.2.0`), a big breaking change bumps the first (`v1.0.0`).

## Step 4: Write the release note

**Why this matters:** users and teammates want to know what changed, in plain words, and whether they need to do anything.

**Run it:**

```bash
cat > RELEASE-NOTES.md <<'EOF'
# Release notes

## v0.1.0

**New**
- Shoppers can see the list of books with prices.

**Good to know**
- If there are no books, a friendly message is shown.
- If the data cannot be loaded, a friendly error is shown.

**What you need to do:** nothing.
EOF
git add RELEASE-NOTES.md
git commit -m "Add release notes for v0.1.0"
```

## Step 5: Release number two, and a mistake

**Why this matters:** real releases go wrong, even careful ones. We will cause a small problem on purpose, so you meet it in a safe place.

You decide to show prices differently. A quick edit, no tests run (that is the mistake):

**Run it:**

```bash
sed -i 's/echo "\$title - NGN \$price"/echo "$title - $price"/' list_books.sh
git commit -am "Change price display"
git tag -a v0.2.0 -m "Release 0.2.0: new price display"
./list_books.sh | head -1
```

**What it does:** the `sed` line edits the script so it prints the price without `NGN`. You commit and tag it without running the tests.

**What you should see:**

```text
The Alchemist - 4500
```

The currency is gone. A shopper would not know whether `4500` means naira, dollars or kobo. 😬

## Step 6: Notice the problem, using your tests

**Run it:**

```bash
./run_tests.sh
```

Our simple tests do not check the price format, so they still pass. **A passing test only proves what you wrote it to prove.** Add a test for it:

```bash
sed -i '/^if \[\[ \$fail -eq 0/i check "4 price shows currency" "The Alchemist - NGN 4500" "$(./list_books.sh | head -1)"' run_tests.sh
./run_tests.sh
```

**What you should see:**

```text
PASS  1 shows three books
PASS  2 empty list message
PASS  3 missing data exits 1
FAIL  4 price shows currency (expected 'The Alchemist - NGN 4500', got 'The Alchemist - 4500')
SOME TESTS FAILED
```

**If yours looks different:** if there is no `FAIL` line for test 4, the edit did not apply. Run `grep -n "price shows" run_tests.sh`. If nothing prints, ask your instructor.

The new test catches the problem. Release `v0.2.0` is bad.

## Step 7: Roll back safely

**Why this matters:** when a release is bad, the first goal is not to find who made the mistake. It is to **restore service**. Fix the cause calmly afterwards.

First, see what the last good version was:

```bash
git tag
git log --oneline -5
```

Now undo the bad change with **revert**, which adds a new commit that cancels the old one and keeps history honest:

```bash
git stash -q
git revert --no-edit HEAD
git stash pop -q
./list_books.sh | head -1
```

**What it does:** `git stash` sets your unsaved test change aside, `git revert --no-edit HEAD` reverses the bad commit, and `git stash pop` brings your test change back. The `-q` flag keeps it quiet.

**What you should see:**

```text
The Alchemist - NGN 4500
```

The currency is back. Run the tests and tag the recovery:

```bash
./run_tests.sh
git add run_tests.sh
git commit -m "Add price format test"
git tag -a v0.2.1 -m "Roll back price display change, add price test"
git tag
```

**What you should see:** `ALL TESTS PASSED` (now four passes), then the tags `v0.1.0`, `v0.2.0`, `v0.2.1`.

**If yours looks different:** if `git revert` reports a conflict, follow the conflict steps from Class 2 of the Git course, or run `git revert --abort` and ask your instructor.

> ⚠️ **Why not `git reset --hard`?** It erases history. In a real team, others may already have your bad commit, and erasing it behind their backs creates chaos. Revert is honest and safe.

## Step 8: Write a rollback plan

**Why this matters:** under pressure at 2 a.m., nobody thinks clearly. A written plan does the thinking for you in advance.

**Run it:**

```bash
cat > plan/rollback-plan.md <<'EOF'
# Rollback plan

**Last known good version:** v0.1.0 (and v0.2.1 after the fix)

**Who can decide to roll back:** the owner or the person on call

**Signs we need to roll back:**
- The list shows wrong or missing prices
- Shoppers report errors
- Tests fail after a release

**Steps**
1. Find the bad commit: `git log --oneline`
2. Undo it: `git revert --no-edit <commit>`
3. Run the tests: `./run_tests.sh`
4. Tag the recovery release
5. Check the result by eye: `./list_books.sh | head -3`
6. Tell the team what happened

**Careful:** if a release also changed stored data (for example a database), rolling back the program does not roll back the data. Plan for that separately.
EOF
git add plan/rollback-plan.md
git commit -m "Add rollback plan"
```

## Step 9: Watch, then learn

**Why this matters:** a release is not finished when it goes out. It is finished when you have **looked at it working**.

After a release, ask:

- Is it healthy? (Does the list show correctly?)
- Is anyone reporting problems?
- What did we learn? What will we check next time?

Add one line to your notes about what you would test differently next time. That learning is what makes the next release safer.

## ✅ Recap

- Put the tests in **one command** and run it before every release.
- A **release checklist** replaces "I think it is ready" with "I checked".
- A **tag** labels an exact version. A **release note** explains it in plain words.
- When a release is bad, **restore service first** with `git revert`, then investigate.
- Never use `git reset --hard` on shared work.
- Write the **rollback plan before** you need it. A program rollback does not undo data changes.
- A passing test only proves what it was written to prove.

## 📤 Push to your portfolio

In your portfolio repository, create `sdlc/class-3/` and add:

1. Your `release-checklist.md`, `rollback-plan.md` and `RELEASE-NOTES.md`, adapted to **your own** feature
2. A `notes.md` answering: *Why do we revert instead of erasing history? What does a tag give us?*

Next up: [the Assignment](assignment-plan-a-feature.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-testing-what-you-build.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-plan-a-feature.md)</td></tr></table>
