# Ansible: the code for this course

Everything you need to finish the Ansible course is here: config, inventory, playbook, and a role with tasks, handlers, defaults and a template.

## Prerequisites

1. Ansible 2.15 or newer. Check with `ansible --version`.
2. On Windows use WSL2. On macOS `brew install ansible`. On Ubuntu `sudo apt install ansible`.
3. Nothing else. The local inventory needs no SSH and no server.

## Learning objectives

1. Run a playbook against your own machine without SSH.
2. Explain the difference between a play, a task and a role.
3. Use a template so one role can serve a different site name per host.
4. See a handler run only when something changed.
5. Run the same playbook twice and get `changed=0` the second time.

## Two ways to run this course

| | Local (free) | Server (real SSH) |
|---|---|---|
| Inventory | `[local] localhost ansible_connection=local` | uncomment `[web]` and put your server IP in |
| Needs SSH keys | no | yes |
| Cost | $0 | your server's cost |

Start local. Move to the `[web]` group only when the local run is boring.

## Step 1: Check the inventory

```bash
ansible-inventory --list
```

Expected output, shortened:

```json
{
    "_meta": { "hostvars": { "localhost": { "ansible_connection": "local" } } },
    "local": { "hosts": ["localhost"] }
}
```

## Step 2: Check the syntax before running anything

```bash
ansible-playbook site.yml --syntax-check
```

Expected output:

```text
playbook: site.yml
```

## Step 3: Run it

```bash
ansible-playbook site.yml
```

Expected output, shortened:

```text
PLAY [Set up a web server] *******************************************

TASK [nginx : Show which host we are configuring] ********************
ok: [localhost] => {
    "msg": "Configuring localhost"
}

TASK [nginx : Create the web root] ***********************************
changed: [localhost]

TASK [nginx : Copy the page] *****************************************
changed: [localhost]

RUNNING HANDLER [nginx : Reload nginx] *******************************
ok: [localhost]

PLAY RECAP ***********************************************************
localhost : ok=6 changed=2 unreachable=0 failed=0 skipped=0 rescued=0
```

## Step 4: Run it again. This is the important step.

```bash
ansible-playbook site.yml
```

Expected output, the line that matters:

```text
localhost : ok=6 changed=0 unreachable=0 failed=0 skipped=0 rescued=0
```

`changed=0` is idempotency. The playbook described the end state, not a list of steps to repeat blindly.

## Step 5: Prove the template used your variable

```bash
cat /var/www/coraxshift/index.html
```

Expected output:

```html
  <h1>Coraxshift Practice Site</h1>
  <p>Served by localhost, configured by Ansible.</p>
```

Change `site_name` in `group_vars/all.yml`, run the playbook again, and the page changes. `changed=1` that time, then back to `changed=0`.

## Step 6: Practise Vault

```bash
ansible-vault create secrets.yml
```

Type a password, add `db_password: "test123"`, save. Then:

```bash
ansible-vault view secrets.yml
```

Expected output:

```text
db_password: "test123"
```

`cat secrets.yml` shows encrypted text instead. That is the difference between a secret and a committed secret.

## Step 7: Clean up

```bash
sudo rm -rf /var/www/coraxshift
```

Expected output: nothing printed. Removing a folder quietly is normal.

## What you learned

1. `ansible.cfg` sets defaults once, so commands stay short.
2. The inventory says where, the playbook says what.
3. A role keeps tasks, handlers, defaults and templates together.
4. `changed=0` on the second run is the proof you wrote Ansible, not a script.
5. Vault encrypts values so a password never reaches git.
