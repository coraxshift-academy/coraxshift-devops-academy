# Class 1: From Idea to Plan

**Software Delivery Lifecycle for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your first class

Most failed projects do not fail because of bad code. They fail because nobody agreed on **what** was being built. Today you learn to turn a vague wish into a plan anyone can build and check.

Our running example is **BookNook**, a small online bookshop. The owner says:

> *"I want a good website where people can see my books."*

That sentence is a wish, not a plan. Let us fix it.

**By the end of this class you can:**

- Write a **user story**
- Write **acceptance criteria** that a person can check
- Set **scope** (in, out) and name **risks**
- Break a feature into small tasks
- Keep your plan in a Git repository

## Prerequisites

- A GitHub account with access to this course repository
- A Codespace opened on this repository (see [Getting Started](../GETTING-STARTED.md))
- Git basics from the Git and GitHub course

## How every step works

Each step follows the same five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, and **If yours looks different**.

> 💡 **Your output will never match ours character for character.** Compare the *meaning*, not every letter.

## Step 0: Make your project folder

**Why this matters:** plans are files. Files belong in a repository, so every change to the plan is saved and reviewable.

**Run it:**

```bash
cd ~
mkdir -p practice/booknook
cd practice/booknook
git init
mkdir plan
pwd
```

**What it does:** you create a folder for the BookNook project, start Git in it, and add a `plan` folder.

**What you should see:**

```text
Initialized empty Git repository in /home/codespace/practice/booknook/.git/
/home/codespace/practice/booknook
```

**If yours looks different:** if Git says it needs your name and email, run the `git config --global` lines from Class 1 of the Git course.

## Step 1: Start with a person and a problem

**Why this matters:** software exists to help a *person* with a *problem*. If you cannot name both, you are not ready to build.

A **user story** has one shape:

```text
As a <who>, I want <what>, so that <why>.
```

Our wish becomes:

> As a **book lover**, I want to **see the list of books for sale**, so that **I can decide what to buy**.

| ❌ Weak | ✅ Strong |
|---|---|
| Build a good website | As a shopper, I want to see books with prices, so that I can decide what to buy |
| Make it fast | As a shopper on a phone, I want the book list to appear in under 3 seconds, so that I do not give up |
| Add search | As a shopper, I want to type a title, so that I can find one book quickly |

**Run it:**

```bash
cat > plan/story.md <<'EOF'
# Feature: Book list

As a book lover, I want to see the list of books for sale,
so that I can decide what to buy.
EOF
cat plan/story.md
```

**What it does:** the `cat > ... <<'EOF'` block saves your story in a file. The last line prints it.

**What you should see:** the three lines of your story.

**If yours looks different:** if the word `EOF` appears in the file, the closing `EOF` was not on its own line. Delete the file and copy the whole box again.

## Step 2: Write acceptance criteria

**Why this matters:** "done" means different things to different people. **Acceptance criteria** are statements anyone can check, so there is no argument later.

A good criterion uses **Given / When / Then**:

```text
Given <the starting situation>
When  <something happens>
Then  <what you can see>
```

Three rules for good criteria:

1. A person can check it by **looking**, not by guessing.
2. It describes **what happens**, not how the code works.
3. It covers the **normal** case, the **empty** case and the **failure** case.

**Run it:**

```bash
cat >> plan/story.md <<'EOF'

## Acceptance criteria

1. Given the shop has books, when I open the book list,
   then I see each book's title and price.
2. Given the shop has no books, when I open the book list,
   then I see the message "No books yet. Please check back soon."
3. Given the book data cannot be loaded, when I open the book list,
   then I see a friendly error and no technical details or passwords.
EOF
cat plan/story.md
```

**What it does:** `>>` adds to the end of the file.

**What you should see:** your story followed by three numbered criteria.

**If yours looks different:** if the first lines were erased, you used `>` instead of `>>`. Redo Step 1, then this step.

> 💡 **The "so what?" test:** read each criterion and ask "could two different people disagree on whether this is true?" If yes, make it more specific.

## Step 3: Decide what is in, and what is out

**Why this matters:** every feature tries to grow. **Scope** is your fence. Without it, a two-day job becomes a two-month job.

**Run it:**

```bash
cat >> plan/story.md <<'EOF'

## Scope

- In scope: showing the books that already exist
- Out of scope: buying, payment, user accounts, search

## Risks

- The list may be empty
- A book may have a missing or invalid price
- The data source may be unavailable

## People

- Builder: (your name)
- Reviewer: (a friend or your instructor)
EOF
git add plan/story.md
git commit -m "Add book list story, criteria, scope and risks"
git log --oneline
```

**What it does:** you add scope, risks and people, then save the plan in Git.

**What you should see:**

```text
[main (root-commit) 2b9d4c1] Add book list story, criteria, scope and risks
...
2b9d4c1 Add book list story, criteria, scope and risks
```

**If yours looks different:** the code will differ. If `git commit` complains about identity, set your name and email first.

> 💡 **Out of scope is a gift.** Writing "payment is out of scope" protects you from a surprise at the end.

## Step 4: Break the work into small tasks

**Why this matters:** a big task hides problems. A small task can be built, checked and reviewed in an hour or two.

A good task has: **what changes**, **where**, and **how we know it is finished**.

**Run it:**

```bash
cat > plan/tasks.md <<'EOF'
# Tasks for the book list

| # | Task | Where | Finished when |
|---|------|-------|---------------|
| 1 | Add three sample books | data/books.txt | The file has three lines |
| 2 | Show the list | list_books.sh | Running it prints each title and price |
| 3 | Handle an empty list | list_books.sh | It prints the "No books yet" message |
| 4 | Handle a missing file | list_books.sh | It prints a friendly error and exits with an error code |
| 5 | Write the test checklist | plan/tests.md | Each criterion has a check |
EOF
git add plan/tasks.md
git commit -m "Add task breakdown for the book list"
```

**What you should see:** `1 file changed`.

**If yours looks different:** if Git says `nothing to commit`, the file already exists with the same content. That is fine.

## Step 5: Draw the flow

**Why this matters:** a picture shows how the parts connect, and where it can break.

```text
Shopper ──▶ Book list page ──▶ Book data ──▶ Book list page ──▶ Shopper
 (asks)        (app)         (data file)      (shows result)
```

Each arrow is a place where something can fail. That is where your risks come from.

## Step 6: Review your own plan

**Why this matters:** a plan that has never been challenged usually has holes.

Check these with a pen:

- [ ] Can a stranger understand the story?
- [ ] Is every criterion checkable by looking?
- [ ] Do we have a normal, an empty and a failure case?
- [ ] Is something clearly out of scope?
- [ ] Is every task small and finishable?

## ✅ Recap

- A **user story** names a person, a want and a reason.
- **Acceptance criteria** use Given / When / Then and can be checked by looking.
- **Scope** says what is in and out. **Risks** say what could go wrong.
- Small tasks are safer than large ones.
- Plans are files, so keep them in Git.

## 📤 Push to your portfolio

In your portfolio repository (not this course repository), create a folder `sdlc/class-1/` and add:

1. Your `story.md` and `tasks.md`, changed to **your own** feature idea (a small one, for example "show opening hours" or "list today's specials")
2. A short `notes.md` answering: *Why do we write acceptance criteria before building? What does "out of scope" protect us from?*

Next up: [Class 2: Testing what you build](class-2-testing-what-you-build.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-testing-what-you-build.md)</td></tr></table>
