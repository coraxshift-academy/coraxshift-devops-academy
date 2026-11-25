# Class 2: Testing What You Build

**Software Delivery Lifecycle for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Last class you wrote a plan. Today you build the smallest possible version of it and **prove it works**. Testing is not about catching yourself being wrong. It is about knowing, without hope or guessing, that the thing does what you promised.

**By the end of this class you can:**

- Turn each acceptance criterion into a test case
- Run a tiny program and check its result
- Tell unit, integration and end-to-end tests apart
- Write a bug report someone else can act on

## Prerequisites

- Class 1 finished, with your `booknook` folder
- Codespace open

## Step 0: Return to your project

**Why this matters:** every command works on the folder you are standing in.

**Run it:**

```bash
cd ~/practice/booknook
git status
ls plan
```

**What you should see:** `nothing to commit, working tree clean`, and `story.md  tasks.md` in the list.

**If yours looks different:** `No such file or directory` means Class 1 was not finished. Go back and complete it.

## Step 1: Build the smallest version (tasks 1 and 2)

**Why this matters:** you need something to test. A tiny working version beats a big imaginary one.

**Run it:**

```bash
mkdir -p data
printf 'The Alchemist|4500\nThings Fall Apart|3800\nHalf of a Yellow Sun|5200\n' > data/books.txt
cat > list_books.sh <<'EOF'
#!/usr/bin/env bash
# Prints the books in the data file, one per line: title (price)
file="${1:-data/books.txt}"
while IFS='|' read -r title price; do
  echo "$title - NGN $price"
done < "$file"
EOF
chmod +x list_books.sh
./list_books.sh
```

**What it does:** you create a data file with three books. The script reads it line by line and prints each title with its price. `chmod +x` lets you run it as `./list_books.sh`.

**What you should see:**

```text
The Alchemist - NGN 4500
Things Fall Apart - NGN 3800
Half of a Yellow Sun - NGN 5200
```

**If yours looks different:** `Permission denied` means you skipped `chmod +x`. Run it. If the output is empty, check `cat data/books.txt`.

Save your work:

```bash
git add data list_books.sh
git commit -m "Add sample books and a simple list script"
```

## Step 2: Turn criteria into test cases

**Why this matters:** a test case is a criterion with the guesswork removed: where you start, what you do, what you expect.

**Run it:**

```bash
cat > plan/tests.md <<'EOF'
# Test cases

| # | Criterion | Starting state | Action | Expected result | Layer |
|---|-----------|----------------|--------|-----------------|-------|
| 1 | Shows books | data file has 3 books | run ./list_books.sh | 3 lines, each with title and price | Integration |
| 2 | Empty list | data file is empty | run ./list_books.sh | message "No books yet. Please check back soon." | Integration |
| 3 | Data missing | data file does not exist | run ./list_books.sh | friendly error, no technical detail, exit code 1 | Integration |
EOF
git add plan/tests.md
git commit -m "Add test cases for the book list"
```

**What you should see:** `1 file changed`.

## Step 3: Run test case 1 (the normal case)

**Run it:**

```bash
./list_books.sh | wc -l
```

**What it does:** `wc -l` counts lines. The `|` (pipe) hands the script's output to it.

**What you should see:**

```text
3
```

It passes: three books, three lines.

## Step 4: Run test case 2 (the empty case), and find a bug

**Run it:**

```bash
: > /tmp/empty.txt
./list_books.sh /tmp/empty.txt
echo "lines printed: $(./list_books.sh /tmp/empty.txt | wc -l)"
```

**What it does:** `: > file` makes an empty file. You run the script on it.

**What you should see:**

```text
lines printed: 0
```

The script prints **nothing**. Our criterion promised the message *"No books yet. Please check back soon."* **That is a bug.** Finding it now, on your own machine, is the whole point of testing.

## Step 5: Run test case 3 (the failure case), and find another bug

**Run it:**

```bash
./list_books.sh /tmp/does-not-exist.txt
echo "exit code: $?"
```

**What it does:** `$?` holds the exit code of the last command. `0` means success.

**What you should see (roughly):**

```text
./list_books.sh: line 6: /tmp/does-not-exist.txt: No such file or directory
exit code: 1
```

The exit code is right, but the message is a **technical error**, not the friendly one we promised. Two bugs found, zero users harmed.

## Step 6: Write a bug report

**Why this matters:** a bug report is how you hand a problem to somebody else. If it is vague, nobody can fix it.

A good report has: **title**, **environment**, **steps**, **expected**, **actual**, and **evidence**.

**Run it:**

```bash
mkdir -p bugs
cat > bugs/bug-1-empty-list.md <<'EOF'
# Bug 1: Empty book list prints nothing

**Environment:** Codespace, Ubuntu, Bash 5, list_books.sh at commit (see git log)

## Steps
1. Create an empty data file: `: > /tmp/empty.txt`
2. Run `./list_books.sh /tmp/empty.txt`

## Expected
The message "No books yet. Please check back soon."

## Actual
Nothing is printed.

## Evidence
`./list_books.sh /tmp/empty.txt | wc -l` prints `0`

## Related criterion
Criterion 2 in plan/story.md
EOF
git add bugs
git commit -m "Report bug: empty list prints nothing"
```

**What you should see:** `1 file changed`.

> ⚠️ **Never put passwords, tokens or customer details in a bug report.** Reports get shared.

## Step 7: Fix both bugs

**Run it:**

```bash
cat > list_books.sh <<'EOF'
#!/usr/bin/env bash
# Prints the books in the data file, one per line: title - price
file="${1:-data/books.txt}"

if [[ ! -f "$file" ]]; then
  echo "Sorry, the book list is not available right now. Please try again later." >&2
  exit 1
fi

if [[ ! -s "$file" ]]; then
  echo "No books yet. Please check back soon."
  exit 0
fi

while IFS='|' read -r title price; do
  echo "$title - NGN $price"
done < "$file"
EOF
git add list_books.sh
git commit -m "Fix empty list message and friendly missing-file error"
```

**What it does:** `-f` checks the file exists. `-s` checks it is not empty. `>&2` sends the error to the error channel, the proper place for problems. Notice that the user never sees a path or a technical message.

## Step 8: Run all three tests again (this is called a "retest")

**Run it:**

```bash
echo "--- Test 1"; ./list_books.sh | wc -l
echo "--- Test 2"; ./list_books.sh /tmp/empty.txt
echo "--- Test 3"; ./list_books.sh /tmp/does-not-exist.txt; echo "exit code: $?"
```

**What you should see:**

```text
--- Test 1
3
--- Test 2
No books yet. Please check back soon.
--- Test 3
Sorry, the book list is not available right now. Please try again later.
exit code: 1
```

**If yours looks different:** if test 3 shows `No such file or directory`, the file edit did not save. Run `cat list_books.sh` and compare it with Step 7.

> 💡 **Always retest after a fix.** A fix can quietly break something that used to work.

## Step 9: Understand the three layers of tests

**Why this matters:** different tests answer different questions.

| Layer | Plain meaning | Bakery example | Our example |
|---|---|---|---|
| **Unit test** | One small piece on its own | Does the oven reach 180°C? | Does the price line print correctly? |
| **Integration test** | Two pieces working together | Does the dough rise in that oven? | Does the script read the data file? |
| **End-to-end test** | The whole journey, as a customer sees it | Order, bake, box and deliver a cake | A shopper opens the page and sees the books |

A green unit test does **not** prove the whole system works. That is why we need all three layers.

## ✅ Recap

- A **test case** is: starting state, action, expected result.
- Write test cases from the acceptance criteria, including **normal, empty and failure** cases.
- Tests found two bugs before any user did.
- A good **bug report** has steps, expected, actual and evidence, with no secrets.
- **Retest** after every fix.
- **Unit, integration and end-to-end** tests answer different questions.

## 📤 Push to your portfolio

In your portfolio repository, create `sdlc/class-2/` and add:

1. Your `tests.md` for **your own** feature from Class 1, with one normal, one empty and one failure case
2. One bug report, real or practised
3. A `notes.md` answering: *Why did we write the tests before running them? What is the difference between a unit and an end-to-end test?*

Next up: [Class 3: Release and rollback](class-3-release-and-rollback.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-from-idea-to-plan.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-release-and-rollback.md)</td></tr></table>
