# Class 2: Variables, Templates and Handlers

**Ansible for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Last class every workstation got the same notice. Real machines are not identical: the front desk is not a customer PC. Today you give each group its own settings, build files from a **template**, and run a follow-up action **only when something actually changed**.

**By the end of this class you can:**

- Put settings in `group_vars` files
- Build a file from a **template**
- Use a **handler** that runs only after a change
- Prove that nothing changes when nothing needs to

## Prerequisites

- Class 1 finished, with your `cafe-ansible` folder

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/cafe-ansible
export PATH="$HOME/.local/bin:$PATH"
ansible cafe -m ping
ls
```

**What you should see:** three `SUCCESS` answers, then `ansible.cfg  inventory.ini  site.yml  workstations`.

**If yours looks different:** `No such file or directory` means Class 1 was not finished. Go back and complete it.

## Step 1: Give each group its own settings

**Why this matters:** settings that belong to a group should live **with that group**, not buried inside a playbook. Ansible reads any file in `group_vars/` named after a group, automatically.

**Run it:**

```bash
mkdir -p group_vars
cat > group_vars/cafe.yml <<'EOF'
---
cafe_name: "Coraxshift Net Café"
session_minutes: 60
EOF
cat > group_vars/front_desk.yml <<'EOF'
---
machine_role: "front desk"
session_minutes: 0
EOF
cat > group_vars/customer_pcs.yml <<'EOF'
---
machine_role: "customer PC"
EOF
ls group_vars
```

**What it does:**

- `cafe.yml` holds settings for **every** machine.
- `front_desk.yml` and `customer_pcs.yml` hold settings for one group each.
- The front desk overrides `session_minutes` with `0`, because staff do not buy sessions. The more specific group wins.

**What you should see:** `cafe.yml  customer_pcs.yml  front_desk.yml`

## Step 2: Write a template

**Why this matters:** a **template** is a file with blanks. Ansible fills the blanks with each machine's own values, so one template makes a different file for each machine.

**Run it:**

```bash
mkdir -p templates
cat > templates/welcome.txt.j2 <<'EOF'
Welcome to {{ cafe_name }}
This machine: {{ inventory_hostname }} ({{ machine_role }})
{% if session_minutes > 0 %}
Session length: {{ session_minutes }} minutes
{% else %}
Staff machine: no session limit
{% endif %}
EOF
cat templates/welcome.txt.j2
```

**What it does:** `{{ name }}` is a blank filled from a variable. The `{% if %}` part chooses between two lines, depending on the value.

**What you should see:** the same text printed back.

> 💡 The `.j2` ending means Jinja2, the template language Ansible uses. The file it produces does **not** have that ending.

## Step 3: Use the template, with a handler

**Why this matters:** a **handler** is a task that waits. It runs **only if** another task reports `changed`, and only once at the end. Imagine "restart the service" that should happen only when the config really changed.

**Run it:**

```bash
cat > site.yml <<'EOF'
---
- name: Set up the café workstations
  hosts: cafe
  vars:
    lab_root: "{{ playbook_dir }}/workstations"
  tasks:
    - name: Create the workstation folder
      ansible.builtin.file:
        path: "{{ lab_root }}/{{ inventory_hostname }}"
        state: directory
        mode: "0755"

    - name: Write the welcome notice from the template
      ansible.builtin.template:
        src: templates/welcome.txt.j2
        dest: "{{ lab_root }}/{{ inventory_hostname }}/welcome.txt"
        mode: "0644"
      notify: Announce the change

  handlers:
    - name: Announce the change
      ansible.builtin.debug:
        msg: "{{ inventory_hostname }}: the welcome notice was updated"
EOF
ansible-playbook site.yml --syntax-check
```

**What it does:**

- `template` replaces the old `copy` task.
- `notify` links the task to a handler **by name**. The names must match exactly.
- The handler here just prints a message. In real life it might restart a service.

**What you should see:** `playbook: site.yml`

## Step 4: Run it

**Run it:**

```bash
ansible-playbook site.yml
```

**What you should see (shortened):**

```text
TASK [Write the welcome notice from the template] ***
changed: [pc01]
changed: [pc02]
changed: [pc03]

RUNNING HANDLER [Announce the change] ***
ok: [pc01] => {
    "msg": "pc01: the welcome notice was updated"
}
...
PLAY RECAP ***
pc01   : ok=4  changed=1 ...
```

The old files had different content, so the template changed them, and the handler ran afterwards.

## Step 5: Look at the three different results

**Run it:**

```bash
cat workstations/pc01/welcome.txt
cat workstations/pc02/welcome.txt
```

**What you should see:**

```text
Welcome to Coraxshift Net Café
This machine: pc01 (front desk)

Staff machine: no session limit
```

```text
Welcome to Coraxshift Net Café
This machine: pc02 (customer PC)

Session length: 60 minutes
```

One template, different results, because each group has its own settings. A few blank lines in the output are normal.

## Step 6: Run it again and watch the handler stay silent

**Run it:**

```bash
ansible-playbook site.yml
```

**What you should see:** `changed=0` in the recap and **no** `RUNNING HANDLER` section.

Nothing changed, so the handler did not run. That is exactly the point: a service is restarted only when it needs to be, never "just in case".

## Step 7: Change one setting for the whole café

**Why this matters:** this is where Ansible pays for itself. One edit, every machine.

**Run it:**

```bash
sed -i 's/session_minutes: 60/session_minutes: 30/' group_vars/cafe.yml
ansible-playbook site.yml
cat workstations/pc03/welcome.txt
```

**What it does:** the `sed` line changes `60` to `30` in one file.

**What you should see:** `changed` for `pc02` and `pc03` only. `pc01` stays `ok`, because the front desk overrides the setting to `0`. Then `Session length: 30 minutes` for `pc03`.

Ansible changed only the machines that needed it. The front desk was left alone.

## Step 8: Override one machine

**Why this matters:** sometimes one machine is special. A setting can be tied to a single host in `host_vars/`.

**Run it:**

```bash
mkdir -p host_vars
cat > host_vars/pc03.yml <<'EOF'
---
machine_role: "customer PC (window seat)"
EOF
ansible-playbook site.yml
head -2 workstations/pc03/welcome.txt
```

**What you should see:** `changed` for `pc03` only, then `This machine: pc03 (customer PC (window seat))`.

**The order of priority, simplest to remember:** a setting on one **host** beats its **group**, which beats the group **`cafe`**, which beats a **default**.

## Step 9: Save your work

**Run it:**

```bash
git add site.yml group_vars host_vars templates
git commit -m "Add group variables, template and handler"
git status --short
```

**What you should see:** a commit message, then nothing.

## ✅ Recap

- `group_vars/<group>.yml` and `host_vars/<host>.yml` hold settings automatically.
- More specific settings win: host, then group, then `cafe`.
- A **template** turns one file with blanks into a different file per machine.
- A **handler** runs only when a task it is linked to reports `changed`.
- Re-running with nothing to change gives `changed=0` and no handler.
- Change a setting once, and Ansible updates only the machines that need it.

## 📤 Push to your portfolio

In your portfolio repository, create `ansible/class-2/` and add:

1. `site.yml`, `group_vars/`, `host_vars/` and `templates/`, built for **your own** group of machines, with at least two groups and one host override
2. A `notes.md` answering: *What is a handler and when does it run? Why do settings belong in `group_vars`?*

Next up: [Class 3: Preview, limit and repair](class-3-preview-limit-and-repair.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-inventory-and-first-playbook.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-preview-limit-and-repair.md)</td></tr></table>
