# Class 3: GitHub and Teamwork

**Git and GitHub for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to the last class

So far everything lived on your own computer. Today you put it on **GitHub**, so it is backed up, shareable and visible to employers. You will also learn the way real teams work: nobody changes `main` directly. They propose a change, someone reviews it, then it is merged. That proposal is called a **pull request**.

```text
 your computer                      GitHub
 ┌─────────────┐   git push    ┌──────────────┐
 │ local repo  │ ────────────▶ │ remote repo  │
 │             │ ◀──────────── │  (origin)    │
 └─────────────┘   git pull    └──────────────┘
```

> 💭 **Git** is the notebook. **GitHub** is the shelf where you keep a copy of it, and where people can read it and leave comments.

**By the end of this class you can:**

- Create a repository on GitHub and connect your local one to it
- Push your work and pull other people's changes
- Open, review and merge a pull request
- Write a README that makes a repository look professional
- Clone a repository and explain what a remote is

## Prerequisites

- Classes 1 and 2 finished, with your `recipe-book` repository
- A GitHub account

## Step 0: Return to your repository

**Run it:**

```bash
cd ~/practice/recipe-book
git status
git branch
```

**What you should see:** `On branch main` and a clean working tree.

**If yours looks different:** if you are on another branch, run `git switch main`. If there are unsaved changes, commit them first.

## Step 1: Create an empty repository on GitHub

**Why this matters:** you need a place on GitHub for your work to go.

1. Open [github.com/new](https://github.com/new) in your browser.
2. **Repository name:** `my-devops-portfolio`
3. **Description:** `My DevOps learning journey`
4. Choose **Private** for now.
5. **Do not** tick *Add a README*, *.gitignore* or *license*. Leave the repository empty.
6. Click **Create repository**.

**What you should see:** a page titled with your repository name and a box of setup commands.

**If yours looks different:** if the name is already taken, GitHub tells you. Choose a slightly different name.

## Step 2: Let your Codespace talk to your GitHub account

**Why this matters:** a Codespace is only allowed to push to the repository it was opened from. To push to **your own** repository, you sign in once.

**Run it:**

```bash
unset GITHUB_TOKEN
gh auth login
```

Answer the questions like this:

| Question | Choose |
|---|---|
| Where do you use GitHub? | **GitHub.com** |
| Preferred protocol | **HTTPS** |
| Authenticate Git with your GitHub credentials? | **Yes** |
| How would you like to authenticate? | **Login with a web browser** |

Copy the one-time code it shows, press **Enter**, open the link, paste the code and approve.

Then check:

```bash
gh auth status
```

**What it does:** `unset GITHUB_TOKEN` clears the limited token the Codespace gave you for this terminal. `gh auth login` signs in with your real account.

**What you should see:**

```text
✓ Logged in to github.com account your-username
```

**If yours looks different:** if `gh auth login` says you are already logged in through `GITHUB_TOKEN`, you skipped the `unset` line. Run it first. You need to run `unset GITHUB_TOKEN` again in every new terminal window.

> 🔒 **Safety:** never type your GitHub password into the terminal and never paste a token into a file.

## Step 3: Connect and push

**Why this matters:** `push` copies your commits from your computer to GitHub.

**Run it** (replace `your-username`):

```bash
git remote add origin https://github.com/your-username/my-devops-portfolio.git
git remote -v
git push -u origin main
```

**What it does:** `git remote add origin ...` gives the GitHub address a short nickname, **origin**. `git remote -v` lists your remotes. `git push -u origin main` sends the `main` branch, and `-u` remembers the link so later you can simply type `git push`.

**What you should see:**

```text
origin  https://github.com/your-username/my-devops-portfolio.git (fetch)
origin  https://github.com/your-username/my-devops-portfolio.git (push)
...
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

Now refresh your repository page on GitHub. Your files and commit history are there. 🎉

**If yours looks different:**

| Message | What to do |
|---|---|
| `remote origin already exists` | Run `git remote set-url origin https://github.com/your-username/my-devops-portfolio.git` |
| `Repository not found` or `403` | Check the spelling of your username and repository. Run `gh auth status` and `unset GITHUB_TOKEN` again |
| `rejected ... fetch first` | The GitHub repository was not empty. Ask your instructor before forcing anything |

## Step 4: Check that no secrets went up

**Why this matters:** you must never publish passwords. A quick check takes ten seconds.

**Run it:**

```bash
git ls-files
```

**What you should see:** only your recipe files, `README.md`, `.gitignore`, and your notes. You should **not** see `.env` or `scratch.tmp`.

**If yours looks different:** if `.env` is listed, a secret is on GitHub. Stop and tell your instructor. Treat that key as stolen and replace it. Deleting the file is not enough.

## Step 5: Make a professional README

**Why this matters:** the README is the front door of your repository. Employers read it before anything else.

**Run it:**

```bash
git switch -c improve-readme
cat > README.md <<'EOF'
# My Recipe Book

A small project where I practise Git and GitHub.

## What is inside

- `pancakes.md`: a pancake recipe with two milk options
- `soup.md`: a simple tomato soup

## What I learned

- Saving work in clear commits
- Using branches and fixing a merge conflict
- Sending changes for review with a pull request

By: Your Name
EOF
git add README.md
git commit -m "Improve README with project summary"
git push -u origin improve-readme
```

**What it does:** you work on a new branch, write a better README, commit it and push the **branch** (not `main`) to GitHub.

**What you should see:** GitHub prints a message that includes a link beginning `https://github.com/.../pull/new/improve-readme`.

**If yours looks different:** the link might not appear. That is fine, because you will open the pull request from the website.

## Step 6: Open a pull request

**Why this matters:** a pull request (PR) is a polite question: *"Here are my changes. Would you review them and add them to `main`?"* Teams use it so that no one's mistake lands in `main` unseen.

1. Open your repository on GitHub. A yellow banner says **improve-readme had recent pushes**. Click **Compare & pull request**.
2. **Title:** `Improve README with project summary`
3. **Description:** write two sentences: what you changed and why.
4. Click **Create pull request**.

**What you should see:** a page showing your title, the list of commits, and a **Files changed** tab with green lines for additions.

**If yours looks different:** no banner? Click the **Pull requests** tab, then **New pull request**, set **compare** to `improve-readme` and **base** to `main`.

## Step 7: Review and merge it

**Why this matters:** reviewing is half of teamwork, so practise it even on your own repository.

1. Open the **Files changed** tab. Hover on a line and click the blue **+** to leave a comment, for example: `Nice summary. Maybe add the date?`
2. Go back to the **Conversation** tab.
3. Click **Merge pull request**, then **Confirm merge**.
4. Click **Delete branch** when GitHub offers it.

**What you should see:** a purple **Merged** badge.

## Step 8: Pull the merged result to your computer

**Why this matters:** the merge happened on GitHub, so your computer is now one step behind. `pull` catches it up.

**Run it:**

```bash
git switch main
git pull
git log --oneline -3
git branch -d improve-readme
```

**What it does:** you return to `main`, `git pull` downloads the new merge, and you delete the finished branch.

**What you should see:** `Fast-forward`, then your README improvement in the log.

**If yours looks different:** `Already up to date` means the PR was not merged yet. Go back to Step 7.

## Step 9: Clone, the way a new teammate gets a project

**Why this matters:** `clone` is how you copy someone else's repository (or your own, on a new computer).

**Run it** (replace `your-username`):

```bash
cd ~/practice
git clone https://github.com/your-username/my-devops-portfolio.git portfolio-copy
cd portfolio-copy
git log --oneline -3
cd ~/practice/recipe-book
```

**What it does:** it downloads the whole repository with its full history into a new folder, and connects it to `origin` automatically.

**What you should see:** the same commits you pushed.

**If yours looks different:** if Git asks for a username and password, run `unset GITHUB_TOKEN` and `gh auth status` again.

## 🤝 Team habits worth keeping

| Habit | Why |
|---|---|
| Pull before you start work | You begin from the latest version |
| One small branch per idea | Easy to review and easy to undo |
| Small commits with clear messages | Others (and future you) understand them |
| Never push secrets | History is hard to clean |
| Never `git push --force` on shared work | It can erase a teammate's commits |

## ✅ Recap

- **GitHub** keeps a copy of your repo online. **origin** is the nickname for it.
- `git push` uploads commits. `git pull` downloads new ones. `git clone` copies a whole repo.
- Real teams work on a **branch**, open a **pull request**, get a **review**, then **merge**.
- Check `git ls-files` before you publish, so no secrets go up.

## 📤 Push to your portfolio

Add `class-3-notes.md` to `recipe-book` on a new branch, push it, and open a pull request. In your own words answer:

1. What is the difference between Git and GitHub?
2. What is a pull request and why do teams use it?
3. What does `origin` mean?

Next up: [the Assignment](assignment-portfolio-and-pull-request.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-branches-and-undo.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-portfolio-and-pull-request.md)</td></tr></table>
