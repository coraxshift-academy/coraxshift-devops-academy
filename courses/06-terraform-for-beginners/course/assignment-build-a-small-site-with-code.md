# Assignment: Build a Small Website Folder with Code

**Terraform for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

A friend wants a tiny website for their business: a home page, an about page and a contact page. Instead of creating the files by hand, you will **describe them in Terraform**, build them, change them, repair some drift, and clean up, with every step safe and reviewed.

Choose **your own** business or project. Do **not** reuse Mama Ngozi's shop. Change the names, the text and the file names so the work is yours.

## ✅ Rules

1. Work in your Codespace only. Everything stays on local files.
2. **Read the plan before every apply.** Paste each plan summary line into your notes.
3. **No secrets** in any file.
4. Never commit `*.tfstate`, `*.tfplan` or `.terraform/`.
5. Write every note in your own words. Do not copy an AI answer.

## Task 1: Set up

1. Create a new project folder and run `git init`.
2. Create `.gitignore` **first**, listing `.terraform/`, `*.tfstate`, `*.tfstate.*`, `*.tfplan`, `crash.log` and your output folder.
3. Create `main.tf` with the `local` provider.

## Task 2: Describe three pages

Create three `local_file` resources: `index.txt`, `about.txt` and `contact.txt` (use `.html` if you know it). Each must use at least one **variable** (business name, phone, opening hours, and so on). Put the variables in `variables.tf`.

## Task 3: Add an output

Create `outputs.tf` that prints the list of files built.

## Task 4: Plan, read, apply

1. Run `terraform fmt` and `terraform validate`.
2. Run `terraform plan -out=site.tfplan`. Write the summary line in `notes.md` and explain it.
3. Run `terraform apply site.tfplan`.
4. Prove it worked: `ls` and `cat` each file.
5. Run `terraform plan` again and write down what it says and **why**.

## Task 5: Make a change

Change **one variable** in `terraform.tfvars`. Run `terraform plan` and note which files will change, and whether each is created, updated or replaced. Apply after you have read it.

## Task 6: Cause and repair drift

1. Edit one of the files by hand.
2. Run `terraform plan`. Describe in `drift-notes.md` what Terraform noticed.
3. Decide: is the code right, or the hand edit? Write your reason in one sentence.
4. Repair it the right way, then confirm with a clean plan.

## Task 7: Clean up

1. Run `terraform plan -destroy` and check it names only your three files.
2. Run `terraform destroy` and type `yes`.
3. Prove the files are gone.

## Task 8: Check for secrets

Run `git ls-files` and `git status --short`. Confirm that no state file, plan file or `.terraform` folder is tracked.

## 📦 What to hand in

Send your instructor:

1. The link to your portfolio folder (code files, `.gitignore`, `notes.md`, `drift-notes.md`)
2. The output of `git ls-files`
3. A short reflection (five lines): *What surprised you in a plan? Why is reading the plan before applying so important?*

## 🏁 Done checklist

- [ ] `.gitignore` created before the first commit
- [ ] Three files described with at least one variable each
- [ ] An output block
- [ ] A saved plan, read and explained, then applied
- [ ] A second plan showing "No changes"
- [ ] A variable change planned and applied
- [ ] Drift caused, explained and repaired
- [ ] `terraform plan -destroy` read, then destroy run
- [ ] `git ls-files` shows no state, plan or `.terraform` files

<details>
<summary>Stuck on drift? Hint (try first!)</summary>

Edit a file with `echo "changed" > site/index.txt`. Then run `terraform plan` and read what it wants to do. The plan is your evidence. Applying puts the file back to what the code says.

</details>

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-state-drift-destroy.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-iac.md)</td></tr></table>
