# Troubleshooting

**Ansible for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Install and setup

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `ansible: command not found` | Not installed, or not on your path | Redo Class 1, Step 1, then `export PATH="$HOME/.local/bin:$PATH"`. Do this in every new terminal |
| `externally-managed-environment` when installing | The system protects its own Python | Use `sudo apt-get update && sudo apt-get install -y ansible` |
| `No inventory was parsed` | You are in the wrong folder | `pwd`, then `cd ~/practice/cafe-ansible` |
| `Could not match supplied host pattern` | The group or machine name is misspelled | Run `ansible-inventory --graph` and copy the name |

## Writing and running

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `YAML syntax error` or `mapping values are not allowed here` | Wrong spacing in the playbook | Use two spaces per level and never tabs. Compare with the lesson box |
| `'machine_role' is undefined` | A settings file is missing or misspelled | Check the file name in `group_vars/` matches the group name exactly |
| `Could not find or access 'templates/...'` | Template file missing or you are in the wrong folder | Check `ls templates` and `pwd` |
| Handler did not run | No task linked to it changed, or the names differ | The `notify` and the handler `name` must match exactly |
| `[WARNING]: Platform linux ... discovered interpreter` | Ansible chose Python automatically | Check `ansible.cfg` has `interpreter_python = auto_silent` |
| A file contains the word `EOF` | The closing `EOF` was not on its own line | Delete the file and copy the whole command box again |
| Second run still shows `changed` | A task is not idempotent, such as `command` | Prefer a proper module over `command` |

## Git

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `workstations/` shows in `git status` | Missing line in `.gitignore` | Add `workstations/` and do not commit it |
| `Author identity unknown` | Name and email not set | Use the `git config --global` lines from the Git course |

## 🆘 The panic button

If you are afraid you broke something:

1. Run `ansible-playbook site.yml --check --diff` and read it. It changes nothing.
2. Run `ansible-playbook check.yml`. It only looks.
3. Send both outputs to your instructor.

Check mode is always safe to run.
