# Class 2: Plan, Apply, Change

**Terraform for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Last class you wrote a floor plan. Today you let Terraform **build** it, and you learn the most important habit in the whole tool: **read the plan before you apply it.**

> 💭 A builder who shows you the drawings before knocking down a wall is a builder you can trust.

**By the end of this class you can:**

- Run `terraform plan` and read it
- Apply a saved plan
- Use **variables** and **outputs**
- Tell **create** and **replace** apart in a plan
- Prove that running Terraform twice changes nothing the second time

## Prerequisites

- Class 1 finished, with your `noticeboard` folder

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/noticeboard
export PATH="$HOME/.local/bin:$PATH"
terraform version | head -1
ls -a
```

**What you should see:** a Terraform version, and `main.tf`, `.gitignore`, `.terraform` and `.terraform.lock.hcl` in the list.

**If yours looks different:** `No such file or directory` means Class 1 was not finished. Go back and complete it.

## Step 1: Add a variable

**Why this matters:** a **variable** is a blank you fill in. The same plan can then build a notice board for any shop without rewriting it.

**Run it:**

```bash
cat > variables.tf <<'EOF'
variable "shop_name" {
  description = "The name of the shop shown on the notice board"
  type        = string
  default     = "Mama Ngozi's Provisions"
}

variable "opening_hours" {
  description = "When the shop is open"
  type        = string
  default     = "Monday to Saturday, 8am to 6pm"
}
EOF
terraform fmt
```

**What it does:** you declare two variables, each with a description, a type and a default value. Putting variables in their own file is a habit that keeps projects tidy.

## Step 2: Use the variables, and add an output

**Why this matters:** a resource can use a variable with `var.name`. An **output** prints something useful when Terraform finishes.

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
  content  = "Welcome to ${var.shop_name}!\n"
}

resource "local_file" "hours" {
  filename = "${path.module}/site/hours.txt"
  content  = "Opening hours: ${var.opening_hours}\n"
}
EOF
cat > outputs.tf <<'EOF'
output "site_files" {
  description = "The files Terraform built"
  value       = [local_file.welcome.filename, local_file.hours.filename]
}
EOF
terraform fmt
terraform validate
```

**What it does:** `${var.shop_name}` drops the variable's value into the text. The output lists the two file names.

**What you should see:** `Success! The configuration is valid.`

## Step 3: Make a plan and read it

**Why this matters:** `plan` shows exactly what Terraform *would* do. Nothing is built yet. This is your chance to catch a mistake.

**Run it:**

```bash
terraform plan -out=notice.tfplan
```

**What it does:** compares what you want with what exists, prints the difference, and saves it to a file so what you approve is exactly what runs.

**What you should see (shortened):**

```text
Terraform will perform the following actions:

  # local_file.hours will be created
  + resource "local_file" "hours" {
      + content  = "Opening hours: Monday to Saturday, 8am to 6pm\n"
      + filename = "./site/hours.txt"
      ...
    }

  # local_file.welcome will be created
  + resource "local_file" "welcome" {
      ...
    }

Plan: 2 to add, 0 to change, 0 to destroy.
```

**How to read it:**

| Symbol | Meaning |
|:-:|---|
| `+` | will be **created** |
| `-` | will be **destroyed** |
| `~` | will be **updated in place** |
| `-/+` | will be **replaced** (destroyed, then created again) |

The last line is the summary. Always read it first. *"2 to add, 0 to change, 0 to destroy"* is exactly what we expected.

> ⚠️ **If the plan says something you did not expect, STOP.** Do not apply. Find out why first.

## Step 4: Apply the plan

**Run it:**

```bash
terraform apply notice.tfplan
```

**What it does:** carries out exactly the saved plan. Because it is a saved plan, it does not ask again.

**What you should see:**

```text
local_file.hours: Creating...
local_file.welcome: Creating...
...
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:

site_files = [
  "./site/welcome.txt",
  "./site/hours.txt",
]
```

## Step 5: Check that it really happened

**Why this matters:** "Apply complete" is Terraform's claim. Look with your own eyes.

**Run it:**

```bash
ls site
cat site/welcome.txt
cat site/hours.txt
terraform output
```

**What you should see:**

```text
hours.txt  welcome.txt
Welcome to Mama Ngozi's Provisions!
Opening hours: Monday to Saturday, 8am to 6pm
site_files = [ ... ]
```

You just built infrastructure from a written description. 🎉

## Step 6: Run it again and see nothing happen

**Why this matters:** a great property of Terraform is that if reality already matches your plan, it does **nothing**. You can run it a hundred times safely. This is called being **idempotent**.

**Run it:**

```bash
terraform plan
```

**What you should see:**

```text
No changes. Your infrastructure matches the configuration.
```

## Step 7: Change something and read the plan

**Why this matters:** real life is changes. We change the shop name through a variable, without touching `main.tf`.

**Run it:**

```bash
terraform plan -var="shop_name=Ngozi Fresh Market" -out=rename.tfplan
```

**What you should see (shortened):**

```text
  # local_file.welcome must be replaced
-/+ resource "local_file" "welcome" {
      ~ content              = <<-EOT # forces replacement
          - Welcome to Mama Ngozi's Provisions!
          + Welcome to Ngozi Fresh Market!
        EOT
      ~ id                   = "..." -> (known after apply)
      ...
    }

Plan: 1 to add, 0 to change, 1 to destroy.
```

**Read it carefully:**

- Only `welcome` changes. `hours` is untouched, so Terraform leaves it alone.
- `-/+` and `# forces replacement` mean this file will be deleted and created again. For a text file, that is harmless. For a **database or server**, a replacement can mean losing data. **That is exactly why we read plans.**

Apply it and check:

```bash
terraform apply rename.tfplan
cat site/welcome.txt
```

**What you should see:** `Welcome to Ngozi Fresh Market!`

## Step 8: Put the change in the file, not the command line

**Why this matters:** a `-var` on the command line is forgotten tomorrow. A value saved in a file is remembered, reviewed and shared. We store it in a **`terraform.tfvars`** file, which Terraform reads automatically.

**Run it:**

```bash
cat > terraform.tfvars <<'EOF'
shop_name = "Ngozi Fresh Market"
EOF
terraform plan
```

**What you should see:** `No changes. Your infrastructure matches the configuration.`

> ⚠️ A `.tfvars` file can hold secrets in real projects. Only commit it when it holds nothing private. Add `*.auto.tfvars` and any secret files to `.gitignore`.

Save your work:

```bash
git add main.tf variables.tf outputs.tf terraform.tfvars
git commit -m "Add variables, outputs and two files"
```

## ✅ Recap

- `plan` previews. `apply` builds. **Always read the plan.**
- Save the plan with `-out` and apply that exact file.
- `+` create, `-` destroy, `~` update, `-/+` replace.
- **Variables** make one configuration reusable. **Outputs** print results.
- Running Terraform twice changes nothing the second time.
- A replacement can be harmless for a file and dangerous for a database.

## 📤 Push to your portfolio

In your portfolio repository, create `terraform/class-2/` and add:

1. Your `variables.tf`, `main.tf`, `outputs.tf` and `terraform.tfvars`, built for **your own** shop or project, with at least three files
2. A `plan-notes.md` pasting the **summary line** of one plan and explaining it in your own words
3. A `notes.md` answering: *Why do we save the plan with `-out`? What does `-/+` mean and why does it matter?*

Next up: [Class 3: State, drift and destroy](class-3-state-drift-destroy.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-your-first-configuration.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-state-drift-destroy.md)</td></tr></table>
