# Class 1: Your First Configuration

**Terraform for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Today you install Terraform, write your first configuration, and learn the three commands every Terraform user runs first. Our running example is a **shop notice board**: a small folder of text files for a shop called *Mama Ngozi's Provisions*. Terraform will build it from a description.

**By the end of this class you can:**

- Say what Infrastructure as Code is
- Install Terraform and check it works
- Write a configuration with a **provider** and a **resource**
- Run `terraform init`, `fmt` and `validate`

## Prerequisites

- A Codespace open on this repository
- Linux, Bash and Git basics

## How every step works

Each step has five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, and **If yours looks different**.

> 💡 **Your output will not match ours letter for letter.** Compare the *meaning*.

## Step 0: Check whether Terraform is installed

**Why this matters:** you cannot use a tool that is not there.

**Run it:**

```bash
terraform version
```

**What it does:** asks Terraform to print its version.

**What you should see:**

```text
Terraform v1.9.8
on linux_amd64
```

Any version `1.5` or newer is fine.

**If yours looks different:** `command not found` means it is not installed. Do Step 1. If a version prints, skip to Step 2.

## Step 1: Install Terraform (only if Step 0 failed)

**Why this matters:** Terraform is one small program. We download it from HashiCorp, its maker.

**Run it:**

```bash
cd /tmp
curl -sSL -o terraform.zip https://releases.hashicorp.com/terraform/1.9.8/terraform_1.9.8_linux_amd64.zip
unzip -o terraform.zip
mkdir -p ~/.local/bin
mv terraform ~/.local/bin/
export PATH="$HOME/.local/bin:$PATH"
terraform version
cd ~
```

**What it does:** downloads a zip, unpacks it, moves the program into a personal `bin` folder, and adds that folder to your search path.

**What you should see:** `Terraform v1.9.8`.

**If yours looks different:** if `unzip` is not found, run `sudo apt-get install -y unzip` and repeat. The `export` line lasts only for this terminal. In a new terminal, run it again.

## Step 2: Make the lab folder

**Why this matters:** Terraform treats **one folder** as one project. Keep each project in its own folder.

**Run it:**

```bash
cd ~
mkdir -p practice/noticeboard
cd practice/noticeboard
git init
pwd
```

**What you should see:**

```text
Initialized empty Git repository in /home/codespace/practice/noticeboard/.git/
/home/codespace/practice/noticeboard
```

## Step 3: Write your first configuration

**Why this matters:** this file *is* the floor plan. It says what you want, not how to build it.

A Terraform file has two main building blocks:

- A **provider** is a plugin that knows how to talk to one kind of thing (a cloud, a service, or here, your local files).
- A **resource** is one thing you want to exist.

**Run it:**

```bash
cat > main.tf <<'EOF'
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

resource "local_file" "welcome" {
  filename = "${path.module}/site/welcome.txt"
  content  = "Welcome to Mama Ngozi's Provisions!\n"
}
EOF
cat main.tf
```

**What it does:** the `terraform` block says "I need the `local` provider". The `resource` block says "there should be a file called `welcome.txt` with this text". `path.module` means "this folder".

**What you should see:** the same text printed back.

**If yours looks different:** if the word `EOF` appears in the file, the closing `EOF` was not on its own line. Delete `main.tf` and copy the whole box again.

> 💡 **Read a resource like a sentence.** `resource "local_file" "welcome"` means: a thing of type `local_file`, which I will call `welcome`.

## Step 4: Format it

**Why this matters:** neat files are easier to read and review. Terraform tidies them for you.

**Run it:**

```bash
terraform fmt
```

**What it does:** rewrites the file with standard spacing. It prints the names of any files it changed.

**What you should see:** nothing, or `main.tf`. Both are fine.

## Step 5: Initialise

**Why this matters:** Terraform downloads the provider plugins your file asked for. Until you run `init`, it cannot do anything.

**Run it:**

```bash
terraform init
```

**What you should see:**

```text
Initializing provider plugins...
- Finding hashicorp/local versions matching "~> 2.5"...
- Installing hashicorp/local v2.5.x...
Terraform has been successfully initialized!
```

**If yours looks different:** `Failed to query available provider packages` means no internet. Check your connection and run it again.

`init` also created a hidden folder `.terraform` and a file `.terraform.lock.hcl`. We will deal with those properly in Class 3.

## Step 6: Validate

**Why this matters:** catch typing mistakes *before* anything is built.

**Run it:**

```bash
terraform validate
```

**What you should see:**

```text
Success! The configuration is valid.
```

## Step 7: Break it on purpose, then fix it

**Why this matters:** reading a Terraform error without panic is a core skill. We make a small mistake so you meet one safely.

**Run it:**

```bash
sed -i 's/content  =/contents =/' main.tf
terraform validate
```

**What it does:** the `sed` line misspells `content` as `contents`.

**What you should see (roughly):**

```text
Error: Unsupported argument
  on main.tf line 12, in resource "local_file" "welcome":
  12:   contents = "Welcome to Mama Ngozi's Provisions!\n"
An argument named "contents" is not expected here.
```

Terraform tells you the **file**, the **line** and the **problem**. Now fix it:

```bash
sed -i 's/contents =/content  =/' main.tf
terraform validate
```

**What you should see:** `Success! The configuration is valid.`

## Step 8: Save to Git (without junk)

**Why this matters:** some files Terraform creates must **never** go into Git. We create the `.gitignore` before the first commit.

**Run it:**

```bash
cat > .gitignore <<'EOF'
.terraform/
*.tfstate
*.tfstate.*
*.tfplan
crash.log
site/
EOF
git add main.tf .terraform.lock.hcl .gitignore
git commit -m "Add first Terraform configuration"
git status --short
```

**What it does:** the `.gitignore` lists files to leave out. We commit the config and the lock file (the lock file is safe and useful: it pins provider versions).

**What you should see:** a commit message, then nothing from `git status --short`.

**If yours looks different:** if Git asks who you are, set your name and email as in the Git course.

## ✅ Recap

- **Infrastructure as Code** means describing what you want in files, instead of clicking and remembering.
- A **provider** is a plugin. A **resource** is one thing you want.
- `terraform init` downloads providers, `fmt` tidies, `validate` checks.
- Terraform errors name the file, line and problem.
- Create `.gitignore` **before** your first commit.

## 📤 Push to your portfolio

In your portfolio repository, create `terraform/class-1/` and add:

1. Your `main.tf` and `.gitignore`, changed to use **your own** shop or project name
2. A `notes.md` answering: *What is a provider? What is a resource? Why does `.gitignore` matter?*

Next up: [Class 2: Plan, apply, change](class-2-plan-apply-change.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-plan-apply-change.md)</td></tr></table>
