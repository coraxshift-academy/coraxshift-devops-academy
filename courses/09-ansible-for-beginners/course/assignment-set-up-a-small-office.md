# Assignment: Set Up a Small Office with Ansible

**Ansible for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

A small business has **five computers**: two for staff, two for the shop floor, and one for the manager. Each machine needs a **notice file** and a **settings file**, with different values by role. Instead of building them by hand, you will describe them in Ansible, preview, run, change one setting for everyone, break something, and repair only that machine.

Choose **your own** business, not the café. Change the names, the roles and the text so the work is yours.

## ✅ Rules

1. Work in your Codespace only. Use `ansible_connection=local` for every machine.
2. **Preview with `--check --diff` before every real run.**
3. **No secrets** in any file.
4. Never commit the generated `workstations/` folder.
5. Write every note in your own words. Do not copy an AI answer.

## Task 1: Set up

1. Create a new project folder and run `git init`.
2. Create `.gitignore` listing your generated folder and `*.retry`.
3. Create `ansible.cfg` and `inventory.ini` with **five** machines in **three groups**, plus a parent group that contains them all.
4. Run `ansible-inventory --graph` and `ansible all -m ping`. Save the output in `notes.md`.

## Task 2: Describe the machines

Create a playbook that, for every machine:

1. Creates a folder named after the machine
2. Writes a **notice** file from a **template**
3. Writes a **settings** file from a second template

Each template must use at least one variable. Put group settings in `group_vars/` and **one** override in `host_vars/`.

## Task 3: Add a handler

Link the notice task to a **handler** that prints a message. Run twice and note in `notes.md` when the handler ran and when it did not, and why.

## Task 4: Preview, run, repeat

1. Run with `--check --diff` and read it.
2. Run for real. Paste the PLAY RECAP into your notes.
3. Run again. Explain why `changed=0`.

## Task 5: One change for everyone

Change **one** value in a `group_vars` file. Preview it, run it, and write down which machines changed and which did not, and **why**.

## Task 6: Health check

Write `check.yml` that only **looks** at the machines. It must report **OK** or **ABNORMAL** for each one. It must not change anything.

## Task 7: Break one, repair one

1. Delete the notice file on **one** machine.
2. Run `check.yml` and copy its output.
3. Preview the repair with `--limit` and `--check --diff`.
4. Repair only that machine and run `check.yml` again.

## Task 8: Read a failure

Cause one failure on purpose (for example, rename a settings file). Copy the `fatal` line. Write in `repair-notes.md`:

- Which machine failed and why
- Whether the other machines carried on
- How you fixed the cause

## 📦 What to hand in

Send your instructor:

1. The link to your portfolio folder (playbook, templates, variables, `check.yml`, `.gitignore`, notes)
2. The output of `git ls-files`
3. A short reflection (five lines): *What does "idempotent" mean in your own words? Why check before you run?*

## 🏁 Done checklist

- [ ] Five machines in three groups with a parent group
- [ ] Two templates, group variables, and one host override
- [ ] A handler that runs only after a change
- [ ] A preview read before every real run
- [ ] A second run showing `changed=0`
- [ ] One value changed for everyone, with the explanation
- [ ] A health check that changes nothing
- [ ] One machine broken, found, and repaired with `--limit`
- [ ] One failure read and explained
- [ ] `git ls-files` shows no generated folder

<details>
<summary>Stuck on the failure? Hint (try first!)</summary>

Rename a `group_vars` file with `mv`, then run the playbook. The machines in that group fail with an "undefined" message. Rename it back and run again for only those machines with `--limit`.

</details>

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-preview-limit-and-repair.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-ansible.md)</td></tr></table>
