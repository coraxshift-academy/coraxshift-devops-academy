# Class 1: Inventory and Your First Playbook

**Ansible for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Today you build the "control screen" for a pretend café of three workstations, and you give all three an instruction at once.

**By the end of this class you can:**

- Install Ansible and check it works
- Write an **inventory** with groups
- Run quick **ad-hoc** commands
- Write and run your first **playbook**
- Read the **PLAY RECAP**

## Prerequisites

- A Codespace open on this repository
- Linux, Bash and Git basics

## Step 0: Check whether Ansible is installed

**Why this matters:** you cannot use a tool that is not there.

**Run it:**

```bash
ansible --version
```

**What you should see:**

```text
ansible [core 2.x.x]
```

Any recent version is fine.

**If yours looks different:** `command not found` means it is not installed. Do Step 1.

## Step 1: Install Ansible (only if Step 0 failed)

**Run it:**

```bash
python3 -m pip install --user ansible-core
export PATH="$HOME/.local/bin:$PATH"
ansible --version | head -1
```

**What it does:** installs Ansible into your own account (no `sudo` needed) and adds its folder to your search path.

**What you should see:** a line starting with `ansible [core`.

**If yours looks different:** if `pip` complains about an "externally managed environment", run `sudo apt-get update && sudo apt-get install -y ansible` instead. The `export` line lasts only for this terminal, so run it again in any new one.

## Step 2: Make the lab folder

**Why this matters:** Ansible treats a folder as one project.

**Run it:**

```bash
cd ~
mkdir -p practice/cafe-ansible
cd practice/cafe-ansible
git init
pwd
```

**What you should see:**

```text
Initialized empty Git repository in /home/codespace/practice/cafe-ansible/.git/
/home/codespace/practice/cafe-ansible
```

## Step 3: Write the inventory

**Why this matters:** the **inventory** is the list of machines. Without it, Ansible has nobody to work on.

**Run it:**

```bash
cat > inventory.ini <<'EOF'
[front_desk]
pc01 ansible_connection=local

[customer_pcs]
pc02 ansible_connection=local
pc03 ansible_connection=local

[cafe:children]
front_desk
customer_pcs
EOF
cat inventory.ini
```

**What it does:**

- `[front_desk]` and `[customer_pcs]` are **groups**.
- `[cafe:children]` makes a bigger group, `cafe`, that contains both.
- `ansible_connection=local` means "do not connect over SSH, work on this same machine". It lets us practise safely with pretend machines.

**What you should see:** the same text printed back.

> 💡 **In real life** the line would hold a server address, such as `web1 ansible_host=203.0.113.10`. Everything else you learn here stays the same.

## Step 4: Create a settings file

**Why this matters:** so you do not have to type the inventory name every time.

**Run it:**

```bash
cat > ansible.cfg <<'EOF'
[defaults]
inventory = inventory.ini
interpreter_python = auto_silent
EOF
ansible-inventory --graph
```

**What you should see:**

```text
@all:
  |--@ungrouped:
  |--@cafe:
  |  |--@front_desk:
  |  |  |--pc01
  |  |--@customer_pcs:
  |  |  |--pc02
  |  |  |--pc03
```

That is the whole café on one screen.

**If yours looks different:** if you see `[WARNING]: No inventory was parsed`, you are in the wrong folder. Run `pwd` and `cd ~/practice/cafe-ansible`.

## Step 5: Say hello to every machine

**Why this matters:** an **ad-hoc command** runs one module on many machines, with no playbook. `ping` here is not the network ping. It checks that Ansible can reach the machine and run its tools.

**Run it:**

```bash
ansible cafe -m ping
```

**What it does:** `cafe` is the group, `-m ping` is the module.

**What you should see:**

```text
pc01 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
pc02 | SUCCESS => { ... }
pc03 | SUCCESS => { ... }
```

Three machines answered. They may appear in a different order each time, which is normal. Green or `SUCCESS` means it worked, and `"changed": false` means it touched nothing.

## Step 6: Target one group

**Run it:**

```bash
ansible customer_pcs -m ping
ansible pc01 -m ping
```

**What you should see:** only `pc02` and `pc03` for the first, and only `pc01` for the second. Choosing who is the first skill of Ansible.

## Step 7: Run a command everywhere

**Run it:**

```bash
ansible cafe -m command -a "whoami"
```

**What it does:** `-a` passes an argument to the module. The `command` module runs a program on each machine.

**What you should see:** `pc01 | CHANGED | rc=0 >>` followed by your username, then the same for `pc02` and `pc03`.

> 💡 All three show the same username because all three "machines" are really your Codespace. With real servers you would see each server's own answer.

> ⚠️ `command` always reports `CHANGED`, because Ansible cannot know whether a command changed anything. This is a good reason to prefer proper modules, which you meet next.

## Step 8: Write your first playbook

**Why this matters:** ad-hoc commands are quick but forgettable. A **playbook** is the instructions written down, so anyone can run them again.

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

    - name: Write the welcome notice
      ansible.builtin.copy:
        dest: "{{ lab_root }}/{{ inventory_hostname }}/welcome.txt"
        content: "Welcome to the café!\n"
        mode: "0644"
EOF
cat site.yml
```

**What it does, line by line:**

- `---` marks the start of a YAML file.
- A **play** says *who* (`hosts: cafe`) will do *what*.
- `vars` holds a variable, `lab_root`: the folder where our pretend workstations live.
- Each item under `tasks` is one **task**: a name, then a **module** with its settings.
- `file` with `state: directory` means "make sure this folder exists".
- `copy` means "make sure this file exists with this content".
- `inventory_hostname` is built in. It becomes `pc01`, `pc02` or `pc03` for each machine in turn.

> ⚠️ **YAML cares about spaces.** Use spaces, never tabs. Each level is indented by exactly two spaces.

> 💡 **Notice the wording:** you do not say "run mkdir". You say *"make sure this folder exists"*. You describe the result you want, and Ansible works out the steps.

## Step 9: Check the syntax

**Why this matters:** catch typing mistakes before running anything.

**Run it:**

```bash
ansible-playbook site.yml --syntax-check
```

**What you should see:**

```text
playbook: site.yml
```

**If yours looks different:** an error naming a line number means the spacing is wrong there. Compare it with the box above, character by character.

## Step 10: Run it

**Run it:**

```bash
ansible-playbook site.yml
```

**What you should see (shortened):**

```text
PLAY [Set up the café workstations] ***

TASK [Gathering Facts] ***
ok: [pc01]
ok: [pc02]
ok: [pc03]

TASK [Create the workstation folder] ***
changed: [pc01]
changed: [pc02]
changed: [pc03]

TASK [Write the welcome notice] ***
changed: [pc01]
changed: [pc02]
changed: [pc03]

PLAY RECAP ***
pc01   : ok=3  changed=2  unreachable=0  failed=0  skipped=0  rescued=0  ignored=0
pc02   : ok=3  changed=2  unreachable=0  failed=0  skipped=0  rescued=0  ignored=0
pc03   : ok=3  changed=2  unreachable=0  failed=0  skipped=0  rescued=0  ignored=0
```

**How to read it:**

| Word | Meaning |
|---|---|
| `ok` | already correct, nothing to do |
| `changed` | Ansible made a change |
| `failed` | something went wrong on that machine |
| `unreachable` | Ansible could not connect |

The **PLAY RECAP** is the summary. Read it first, every time. You want `failed=0` and `unreachable=0`.

## Step 11: Check it really happened

**Why this matters:** "changed" is Ansible's claim. Look with your own eyes.

**Run it:**

```bash
ls workstations
cat workstations/pc01/welcome.txt
cat workstations/pc03/welcome.txt
```

**What you should see:**

```text
pc01  pc02  pc03
Welcome to the café!
Welcome to the café!
```

One playbook, three machines, identical results. 🎉

## Step 12: Run it a second time

**Run it:**

```bash
ansible-playbook site.yml
```

**What you should see:** `changed=0` for every machine in the recap, and `ok` on every task.

This is the most important idea in Ansible. The machines already match your description, so Ansible does **nothing**. You can run it a hundred times safely. It is called **idempotency**, and Class 2 builds on it.

## Step 13: Save your work

**Run it:**

```bash
cat > .gitignore <<'EOF'
workstations/
*.retry
EOF
git add inventory.ini ansible.cfg site.yml .gitignore
git commit -m "Add café inventory and first playbook"
git status --short
```

**What it does:** `workstations/` is generated output, so it stays out of Git. The code that creates it goes in.

**What you should see:** a commit message, then nothing from `git status --short`.

**If yours looks different:** if Git asks who you are, set your name and email as in the Git course.

## ✅ Recap

- The **inventory** lists the machines and groups them.
- An **ad-hoc command** runs one module on many machines.
- A **playbook** is instructions written once: plays, tasks and modules.
- You describe the **result you want**, not the steps.
- Read the **PLAY RECAP** first: `ok`, `changed`, `failed`, `unreachable`.
- Run it twice: the second run should change nothing.

## 📤 Push to your portfolio

In your portfolio repository, create `ansible/class-1/` and add:

1. `inventory.ini`, `ansible.cfg` and `site.yml`, changed to use **your own** workstation names and welcome text
2. A `notes.md` answering: *What is an inventory? What is a playbook? What does `changed=0` on the second run tell you?*

Next up: [Class 2: Variables, templates and handlers](class-2-variables-templates-handlers.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-variables-templates-handlers.md)</td></tr></table>
