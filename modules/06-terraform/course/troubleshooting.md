# Troubleshooting

**Terraform for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Install and setup

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `terraform: command not found` | Not installed, or not on your path | Redo Class 1, Step 1, then `export PATH="$HOME/.local/bin:$PATH"`. Do this in every new terminal |
| `unzip: command not found` | Unzip missing | `sudo apt-get install -y unzip` |
| `Failed to query available provider packages` | No internet, or a typo in the provider name | Check your connection and `source = "hashicorp/local"`, then `terraform init` |
| `No configuration files` | You are in the wrong folder | `pwd`, then `cd ~/practice/noticeboard` |

## Writing and running

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `Error: Unsupported argument` | A misspelled word | Read the line number Terraform shows and compare |
| `Error: Missing required argument` | A needed setting is missing | Read the error. It names the missing argument |
| `Reference to undeclared input variable` | A variable is used but not declared | Check `variables.tf` for the name |
| `Error: Inconsistent dependency lock file` | Providers changed since `init` | Run `terraform init` again |
| A file contains the word `EOF` | The closing `EOF` was not on its own line | Delete the file and copy the whole command box again |
| Plan wants to create things you already built | The `site` folder or state was removed | Read the plan, then apply to rebuild |
| `Error acquiring the state lock` | Another Terraform run is still going | Wait, or close the other terminal. Do not delete files to force it |
| A long screen with `:` at the bottom | A pager is open | Press **q** |

## Git

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `terraform.tfstate` shows in `git status` | Missing line in `.gitignore` | Add `*.tfstate` and `*.tfstate.*`, and do **not** commit it |
| `Author identity unknown` | Name and email not set | Use the `git config --global` lines from the Git course |

## 🆘 The panic button

If you are afraid you broke something:

1. **Do not delete state files or edit them.**
2. Run `terraform plan` and read it.
3. Send the plan output to your instructor.

A plan changes nothing, so it is always safe to run.
