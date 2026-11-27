# Class 3: Preview, Limit and Repair

**Ansible for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to the last class

Monitoring a system is not the same as managing it. You must **observe**, **recognise** abnormal behaviour, and **take the right action**. Today you do all three with Ansible: preview a change before it happens, check on the machines, and repair the one that has gone wrong without touching the rest.

**By the end of this class you can:**

- Preview a run with **check mode** and `--diff`
- Run against **one machine** with `--limit`
- Write a **health check** that notices a problem
- Read a failure, fix the cause, and repair only what is broken

## Prerequisites

- Classes 1 and 2 finished, with your `cafe-ansible` folder

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/cafe-ansible
export PATH="$HOME/.local/bin:$PATH"
ansible-playbook site.yml
```

**What you should see:** `changed=0` for every machine.

**If yours looks different:** if things change, your files were removed. That is fine. Read the output, and the run rebuilds them.

## Step 1: Preview before you change anything

**Why this matters:** you would not change twelve computers without looking first. **Check mode** shows what *would* change and changes nothing.

First make a small edit to the template:

```bash
sed -i 's/^Welcome to/Hello and welcome to/' templates/welcome.txt.j2
ansible-playbook site.yml --check --diff
```

**What it does:** `--check` is a dry run. `--diff` shows the exact lines that would change.

**What you should see (shortened):**

```text
TASK [Write the welcome notice from the template] ***
--- before: ./workstations/pc01/welcome.txt
+++ after: ./workstations/pc01/welcome.txt
@@ -1,4 +1,4 @@
-Welcome to Coraxshift Net Café
+Hello and welcome to Coraxshift Net Café
...
changed: [pc01]
```

Check that nothing really changed:

```bash
head -1 workstations/pc01/welcome.txt
```

**What you should see:** still `Welcome to Coraxshift Net Café`. The preview touched nothing. 🎉

Now apply for real:

```bash
ansible-playbook site.yml
head -1 workstations/pc01/welcome.txt
```

**What you should see:** `Hello and welcome to Coraxshift Net Café`.

> 💡 **Make this a habit:** check first, read the diff, then run.

## Step 2: Target one machine

**Why this matters:** when one machine has a problem, you do not want to touch the other eleven. `--limit` narrows the run.

**Run it:**

```bash
ansible-playbook site.yml --limit pc02 --list-hosts
```

**What you should see:**

```text
  play #1 (cafe): Set up the café workstations	TAGS: []
    pattern: ['cafe']
    hosts (1):
      pc02
```

`--list-hosts` shows who *would* be targeted, with no changes at all. Use it any time you are unsure.

You can limit to a group too:

```bash
ansible-playbook site.yml --limit customer_pcs --list-hosts
```

**What you should see:** `hosts (2):` with `pc02` and `pc03`.

## Step 3: Write a health check

**Why this matters:** this is the "observe" step. We write a second playbook that **only looks**. It changes nothing.

**Run it:**

```bash
cat > check.yml <<'EOF'
---
- name: Check the café workstations
  hosts: cafe
  vars:
    lab_root: "{{ playbook_dir }}/workstations"
  tasks:
    - name: Look for the welcome notice
      ansible.builtin.stat:
        path: "{{ lab_root }}/{{ inventory_hostname }}/welcome.txt"
      register: notice

    - name: Report a missing notice
      ansible.builtin.debug:
        msg: "ABNORMAL: {{ inventory_hostname }} has no welcome notice"
      when: not notice.stat.exists

    - name: Report a healthy machine
      ansible.builtin.debug:
        msg: "OK: {{ inventory_hostname }} looks normal"
      when: notice.stat.exists
EOF
ansible-playbook check.yml
```

**What it does:**

- `stat` looks at a file without changing it.
- `register` saves the answer in a variable, `notice`.
- `when` makes a task run only if a condition is true.

**What you should see:**

```text
ok: [pc01] => { "msg": "OK: pc01 looks normal" }
ok: [pc02] => { "msg": "OK: pc02 looks normal" }
ok: [pc03] => { "msg": "OK: pc03 looks normal" }
```

You can also see `skipped` lines for the tasks whose condition was false. That is normal.

## Step 4: Cause a problem

**Why this matters:** you only learn repair by meeting a fault. We break one machine on purpose.

**Run it:**

```bash
rm workstations/pc02/welcome.txt
ansible-playbook check.yml
```

**What you should see:**

```text
ok: [pc01] => { "msg": "OK: pc01 looks normal" }
ok: [pc02] => { "msg": "ABNORMAL: pc02 has no welcome notice" }
ok: [pc03] => { "msg": "OK: pc03 looks normal" }
```

You **observed** the fault and **recognised** it. Now the third step: act.

## Step 5: Repair only that machine

**Run it:**

```bash
ansible-playbook site.yml --limit pc02 --check --diff
```

**What it does:** preview the repair for `pc02` only. You should see the file being created.

Now repair it:

```bash
ansible-playbook site.yml --limit pc02
ansible-playbook check.yml
```

**What you should see:** `changed=1` for `pc02` (in the first run), and then `OK` for all three machines in the second.

You fixed one machine and the others were never touched.

## Step 6: Meet a real failure

**Why this matters:** one day a task will fail. Reading the failure calmly is a core skill. We create a realistic one: someone moves a settings file by mistake.

**Run it:**

```bash
mv group_vars/front_desk.yml group_vars/front_desk.yml.off
ansible-playbook site.yml
```

**What it does:** the front desk's settings file is renamed, so Ansible no longer finds the settings for `pc01`.

**What you should see (shortened):**

```text
TASK [Write the welcome notice from the template] ***
fatal: [pc01]: FAILED! => {"changed": false, "msg": "Task failed: 'machine_role' is undefined"}
ok: [pc02]
ok: [pc03]

PLAY RECAP ***
pc01   : ok=2  changed=0 ... failed=1
pc02   : ok=3  changed=0 ... failed=0
pc03   : ok=3  changed=0 ... failed=0
```

**Read it carefully:**

- `fatal` names the **machine** and the **reason**: a setting is missing.
- `pc02` and `pc03` carried on normally. One failure did not stop the others.
- The recap shows `failed=1` for `pc01` only.

**If yours looks different:** the exact wording can differ between Ansible versions. What matters is that `pc01` is marked `FAILED` and the other two are not.

## Step 7: Fix the cause, then re-run

**Why this matters:** a failure usually has a cause outside the playbook. Fix the cause, then run again. Running the playbook harder would not help.

**Run it:**

```bash
mv group_vars/front_desk.yml.off group_vars/front_desk.yml
ansible-playbook site.yml --limit pc01
ansible-playbook check.yml
```

**What you should see:** `changed=0` and `failed=0` for `pc01` in the first run (the settings are back and the file was already right), then `OK` for all three machines.

## Step 8: Save your work

**Run it:**

```bash
git add check.yml templates
git commit -m "Add health check"
git status --short
```

**What you should see:** a commit message, then nothing.

## Step 9: Clean up

**Why this matters:** a lab you forget is clutter. In real life, you would never leave test changes on a live machine.

**Run it:**

```bash
rm -rf workstations
ls
```

**What you should see:** your code files and folders remain, and `workstations` is gone. You can rebuild the whole café any time with `ansible-playbook site.yml`.

## ✅ Recap

- **Check mode** (`--check`) previews and changes nothing. **`--diff`** shows the exact lines.
- **`--limit`** aims a run at one machine or group. **`--list-hosts`** shows who would be targeted.
- A **health check** only looks. It observes and reports abnormal behaviour.
- `stat`, `register` and `when` let a playbook notice a problem.
- A failure names the machine and the reason. One machine failing does not stop the rest.
- Fix the cause, then re-run only for the machine that needs it.

## 📤 Push to your portfolio

In your portfolio repository, create `ansible/class-3/` and add:

1. Your `check.yml`
2. A `repair-notes.md` describing in your own words: what you broke, what the health check said, and how you repaired only that machine
3. A `notes.md` answering: *Why check before you run? Why use `--limit` when repairing?*

Next up: [the Assignment](assignment-set-up-a-small-office.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-variables-templates-handlers.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-set-up-a-small-office.md)</td></tr></table>
