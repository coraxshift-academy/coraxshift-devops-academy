# Class 1: Your First Repository

**Git and GitHub for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your first class

Today you create a repository and save your work in it. You will learn the one idea that makes Git click: your work moves through **three areas**.

```text
 working folder  ──git add──▶  staging area  ──git commit──▶  history
 (you edit here)              (you choose here)              (saved for good)
```

**By the end of this class you can:**

- Tell Git who you are
- Create a repository and make commits
- Read `git status`, `git diff` and `git log`
- Explain the difference between *edited*, *staged* and *committed*
- Use `.gitignore` to keep files out of Git

## Prerequisites

- A GitHub account with access to this course repository
- A Codespace opened on this repository (see [Getting Started](../GETTING-STARTED.md))

## How every step works

Each step follows the same five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, and **If yours looks different**.

> 💡 **Your output will never match ours character for character.** Compare the *meaning*, not every letter.

## Step 0: Go to your practice area

**Why this matters:** we practise in a separate folder so practice never mixes with the course files.

**Run it:**

```bash
cd ~
mkdir -p practice
cd practice
pwd
```

**What it does:** `cd ~` goes to your home folder. `mkdir -p` makes the `practice` folder (and does not complain if it exists). `pwd` shows where you are.

**What you should see:**

```text
/home/codespace/practice
```

**If yours looks different:** the first part of the path may show another username. That is fine. It should end in `/practice`.

## Step 1: Tell Git who you are

**Why this matters:** every commit carries a name and email, like a signature on a page of the notebook.

**Run it** (replace the name and email with your own):

```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global --list
```

**What it does:** the first command checks Git is installed. The three `config` lines save your name, your email and the default branch name (`main`). The last line prints your settings.

**What you should see:** a line like `git version 2.x.x`, then a list that includes your `user.name`, `user.email` and `init.defaultbranch=main`.

**If yours looks different:** `command not found` means you are not in the Codespace terminal. Codespaces already has Git.

> 💡 **Privacy tip:** in GitHub **Settings → Emails**, tick *Keep my email addresses private* and use the `…@users.noreply.github.com` address it shows.

## Step 2: Create your first repository

**Why this matters:** a repository is just a folder that Git is watching.

**Run it:**

```bash
mkdir recipe-book
cd recipe-book
git init
ls -a
```

**What it does:** `git init` turns the folder into a repository by creating a hidden `.git` folder. That hidden folder is the notebook where Git keeps all your history. `ls -a` shows hidden files too.

**What you should see:**

```text
Initialized empty Git repository in /home/codespace/practice/recipe-book/.git/
.  ..  .git
```

**If yours looks different:** a `hint:` about branch names is only a reminder, not an error.

> ⚠️ **Never delete the `.git` folder.** It *is* your history.

## Step 3: Look before you leap with `git status`

**Why this matters:** `git status` is the command you will type most. It tells you where you are and what to do next.

**Run it:**

```bash
git status
```

**What you should see:**

```text
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

**What it does:** it reports the branch (`main`) and that nothing has been saved yet.

**If yours looks different:** `fatal: not a git repository` means you are outside the folder. Run `cd ~/practice/recipe-book`.

> 💡 Make it a habit: type `git status` before and after every other Git command.

## Step 4: Make a file, stage it, commit it

**Why this matters:** this is the heart of Git. You will do it hundreds of times.

**Run it:**

```bash
echo "# My Recipe Book" > README.md
git status
git add README.md
git status
git commit -m "Add README with the book title"
git status
```

**What it does:** `echo ... > README.md` creates the file. The first `status` shows it as **untracked** (Git sees it but is not watching it). `git add` moves it into the **staging area**. The second `status` shows it is ready to be committed. `git commit` saves a snapshot with your message. The last `status` shows a clean folder.

**What you should see (shortened):**

```text
Untracked files:
        README.md

Changes to be committed:
        new file:   README.md

[main (root-commit) 3f2a1bc] Add README with the book title
 1 file changed, 1 insertion(+)

nothing to commit, working tree clean
```

Your commit code (`3f2a1bc`) will be different. That is normal.

**If yours looks different:** `Author identity unknown` means Step 1 was skipped. Run the `git config` lines from Step 1, then commit again.

> 💡 **Why a separate staging step?** Imagine you fixed a typo and also started a risky experiment. Staging lets you save only the typo fix and leave the experiment for later.

## Step 5: Write good commit messages

**Why this matters:** in six months your messages are the only way to remember what you did and why.

A good message finishes the sentence *"If applied, this commit will…"*

| ❌ Weak | ✅ Strong |
|---|---|
| `update` | `Add pancake recipe` |
| `fix stuff` | `Fix wrong oven temperature in bread recipe` |
| `asdf` | `Remove duplicate ingredient list` |

Keep the first line short (about 50 characters), start with a verb, and say what changed.

## Step 6: See what changed with `git diff`

**Why this matters:** before you save, you should know exactly what you are saving.

**Run it:**

```bash
printf "\nBy: Your Name\n" >> README.md
git diff
git add README.md
git diff
git diff --staged
```

**What it does:** `>>` adds a line to the end of the file. The first `git diff` shows your change before staging. After `git add`, plain `git diff` shows **nothing** (the change moved to staging), and `git diff --staged` shows what will go into the next commit.

**What you should see (first diff, shortened):**

```text
 # My Recipe Book
+
+By: Your Name
```

Lines starting with `+` were added. Lines starting with `-` were removed.

**If yours looks different:** if the second `git diff` still shows changes, you edited the file again after staging. That is allowed. Run `git add README.md` again.

Now commit it:

```bash
git commit -m "Add author line to README"
```

## Step 7: Build a little history

**Why this matters:** history only becomes useful when it has more than one entry.

**Run it:**

```bash
cat > pancakes.md <<'EOF'
# Pancakes

- 1 cup flour
- 1 egg
- 1 cup milk
EOF
git add pancakes.md
git commit -m "Add pancake recipe"
echo "- 1 pinch of salt" >> pancakes.md
git add pancakes.md
git commit -m "Add salt to pancakes"
```

**What it does:** the `cat > ... <<'EOF'` block writes a multi-line file in one go. Then you make two separate commits.

**What you should see:** two `[main ...]` lines, each with a different code.

**If yours looks different:** if the word `EOF` appears inside your file, the closing `EOF` was not on its own line. Delete the file and copy the whole box again.

## Step 8: Read your history with `git log`

**Why this matters:** the log is the story of your project.

**Run it:**

```bash
git log --oneline
git log --oneline --graph --decorate
git show HEAD
```

**What it does:** `git log --oneline` lists commits, newest first, one line each. `--graph --decorate` adds a drawing and shows where `main` and `HEAD` point. `git show HEAD` shows the latest commit in full. `HEAD` means *"where you are now"*.

**What you should see:**

```text
a91c0de (HEAD -> main) Add salt to pancakes
5be22f4 Add pancake recipe
7c01d38 Add author line to README
3f2a1bc Add README with the book title
```

Press **q** to leave a long screen.

**If yours looks different:** the codes will differ. The messages and their order should match what you did.

## Step 9: Keep files out with `.gitignore`

**Why this matters:** some files must never be saved: passwords, temporary files and big downloads. A `.gitignore` file lists patterns Git should pretend it cannot see.

**Run it:**

```bash
echo "SECRET_KEY=not-a-real-key" > .env
echo "temporary notes" > scratch.tmp
git status --short
printf ".env\n*.tmp\n" > .gitignore
git status --short
```

**What it does:** you create two files you would never want to share. The first `status` lists them as untracked (`??`). After you create `.gitignore`, the second `status` lists **only** `.gitignore`, because `.env` and `*.tmp` are now hidden from Git.

**What you should see:**

```text
?? .env
?? scratch.tmp
```

then

```text
?? .gitignore
```

**If yours looks different:** if `.env` still shows, check the spelling in `.gitignore` with `cat .gitignore`.

Commit it:

```bash
git add .gitignore
git commit -m "Add .gitignore for secrets and temp files"
```

> ⚠️ **Order matters.** `.gitignore` only stops Git from picking up *new* files. If a secret was already committed, ignoring it later does not remove it from history. Create `.gitignore` **first**, in every new project.

## ✅ Recap

- A repository is a folder Git is watching. `git init` starts one.
- Work moves: **edit → `git add` → `git commit`**.
- `git status` tells you where you are. `git diff` shows unstaged changes. `git diff --staged` shows what will be committed.
- `git log --oneline` reads your history. `HEAD` is "where you are now".
- Good commit messages start with a verb and say what changed.
- `.gitignore` keeps secrets and junk out. Create it first.

## 📤 Push to your portfolio

You create your portfolio repository on GitHub in Class 3, so for now keep your `recipe-book` folder. Inside it, write a short `notes.md` that answers, in your own words:

1. What is the difference between `git add` and `git commit`?
2. Why do we have a staging area?
3. Why should `.env` be in `.gitignore`?

Commit the file with a good message.

Next up: [Class 2: Branches and undo](class-2-branches-and-undo.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-branches-and-undo.md)</td></tr></table>
