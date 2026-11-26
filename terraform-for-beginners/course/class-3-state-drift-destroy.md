# Class 3: State, Drift and Destroy

**Terraform for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to the last class

Terraform keeps a notebook of everything it has built. Today you learn to read that notebook, what happens when someone changes things behind Terraform's back, and how to **clean up** without leaving anything behind.

**By the end of this class you can:**

- Explain what **state** is and why it is sensitive
- Use `state list` and `show`
- Spot **drift** and repair it
- Preview and run a **destroy**
- Check that your `.gitignore` keeps dangerous files out of Git

## Prerequisites

- Classes 1 and 2 finished, with your `noticeboard` folder and the two site files built

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/noticeboard
export PATH="$HOME/.local/bin:$PATH"
terraform plan
```

**What you should see:** `No changes. Your infrastructure matches the configuration.`

**If yours looks different:** if it wants to create things, your `site` folder was removed. Run `terraform apply` and read the plan first, then type `yes`.

## Step 1: Look at the notebook (state)

**Why this matters:** Terraform needs to remember what it built, otherwise it could not tell "create" from "already exists". That memory is the **state**.

**Run it:**

```bash
ls
terraform state list
```

**What it does:** `ls` shows a new file, `terraform.tfstate`. `state list` shows which resources Terraform is tracking.

**What you should see:**

```text
local_file.hours
local_file.welcome
```

## Step 2: Read one entry

**Run it:**

```bash
terraform state show local_file.welcome
```

**What you should see (shortened):**

```text
# local_file.welcome:
resource "local_file" "welcome" {
    content              = "Welcome to Ngozi Fresh Market!\n"
    filename             = "./site/welcome.txt"
    id                   = "..."
    ...
}
```

Terraform stores what it built **including every value you gave it**. In a real cloud project, that can include passwords and keys.

## Step 3: Why state must never go into Git

**Why this matters:** this is the most common beginner mistake, and the most costly.

> ⚠️ **State files can hold secrets in plain text, and they describe your whole setup. Never commit `terraform.tfstate`, saved plans (`*.tfplan`), or the `.terraform` folder. Never edit state by hand to "fix" something.**

Prove your `.gitignore` is protecting you:

**Run it:**

```bash
git status --short
git check-ignore -v terraform.tfstate notice.tfplan
```

**What you should see:**

```text
.gitignore:2:*.tfstate	terraform.tfstate
.gitignore:4:*.tfplan	notice.tfplan
```

Both files are ignored. `git status --short` shows nothing you should not commit.

**If yours looks different:** if `terraform.tfstate` appears under `git status`, your `.gitignore` is missing a line. Go back to Class 1, Step 8.

> 💡 **How do real teams share state?** They store it in a protected remote place (an encrypted cloud bucket with locking), never in Git. You will see that in the AWS course.

## Step 4: Cause drift on purpose

**Why this matters:** **drift** is when the real world no longer matches the code, usually because someone changed it by hand. We cause some safely.

**Run it:**

```bash
echo "Closed on Sundays and public holidays" > site/hours.txt
cat site/hours.txt
```

**What it does:** you overwrite the hours file outside Terraform, like a helpful colleague editing it by hand.

**What you should see:** `Closed on Sundays and public holidays`

## Step 5: Let Terraform find the drift

**Run it:**

```bash
terraform plan
```

**What you should see (shortened):**

```text
  # local_file.hours will be created
  + resource "local_file" "hours" {
      + content  = "Opening hours: Monday to Saturday, 8am to 6pm\n"
      + filename = "./site/hours.txt"
      ...
    }

Plan: 1 to add, 0 to change, 0 to destroy.
```

Terraform noticed the file no longer matches what it built, so it treats the old one as gone and proposes to build it again from the code. (Different providers describe drift differently. Always read the plan, not just the summary.)

**This raises a real question:** which one is right, the code or the hand edit? In a team, **talk to the person first**. If the manual change was the right one, change the **code** to match it. If the code is right, apply to repair the drift.

Here the code is right, so repair it:

```bash
terraform apply -auto-approve
cat site/hours.txt
```

**What you should see:** `Opening hours: Monday to Saturday, 8am to 6pm`

> ⚠️ `-auto-approve` skips the question. We use it here only because we just read the plan one step earlier. Do not make it a habit, and never use it in a production pipeline without a reviewed plan.

## Step 6: Another kind of drift: something deleted

**Run it:**

```bash
rm site/welcome.txt
terraform plan
```

**What you should see:**

```text
  # local_file.welcome will be created
...
Plan: 1 to add, 0 to change, 0 to destroy.
```

Terraform's notebook says the file should exist, reality says it does not, so it plans to create it again.

```bash
terraform apply -auto-approve
ls site
```

**What you should see:** `hours.txt  welcome.txt`

## Step 7: Save your code

**Run it:**

```bash
git status --short
git log --oneline | head -3
```

**What you should see:** nothing from `status` (everything is committed), and your Class 2 commit in the log.

## Step 8: Destroy the lab, safely

**Why this matters:** a practice lab you forget about is clutter. In the cloud, a forgotten lab **costs real money**. Cleaning up is part of the job, and `destroy` follows the same rule as `apply`: **preview first**.

**Run it:**

```bash
pwd
terraform plan -destroy
```

**What it does:** `pwd` confirms you are in the right project folder. `plan -destroy` shows what *would* be removed.

**What you should see (shortened):**

```text
  # local_file.hours will be destroyed
  # local_file.welcome will be destroyed
...
Plan: 0 to add, 0 to change, 2 to destroy.
```

**Check it:** are these exactly the two resources you expect, and nothing else? If yes, continue.

```bash
terraform destroy
```

**What it does:** Terraform shows the plan again and asks you to type `yes`. Read it, then type `yes`.

**What you should see:**

```text
Destroy complete! Resources: 2 destroyed.
```

## Step 9: Prove it is gone

**Run it:**

```bash
ls -A site
terraform state list
```

**What it does:** `ls -A` lists everything inside `site`, including hidden files. `state list` shows what Terraform still tracks.

**What you should see:** nothing from either command. The two files are gone, and Terraform tracks nothing.

Terraform removes what **it** created. The empty `site` folder it made along the way may remain. Remove it yourself if you like:

```bash
rmdir site
```

Your lab is clean. Your code is still safe in Git, so you can rebuild everything any time with `terraform apply`.

## ✅ Recap

- **State** is Terraform's notebook. It can hold secrets, so **never commit it** and never edit it by hand.
- **Drift** means reality no longer matches the code. `terraform plan` finds it.
- Decide which side is right: fix the code, or repair reality.
- `-auto-approve` skips the safety question. Use it rarely.
- **Preview before you destroy**, then check it afterwards.
- In the cloud, a forgotten lab costs money. Always clean up.

## 📤 Push to your portfolio

In your portfolio repository, create `terraform/class-3/` and add:

1. A `drift-notes.md` describing in your own words what drift you caused, what the plan showed, and how you repaired it
2. A copy of your `.gitignore`
3. A `notes.md` answering: *Why must state never go into Git? Why do we preview a destroy?*

Next up: [the Assignment](assignment-build-a-small-site-with-code.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-plan-apply-change.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-build-a-small-site-with-code.md)</td></tr></table>
