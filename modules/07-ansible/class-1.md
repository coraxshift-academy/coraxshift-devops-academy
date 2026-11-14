# Class 1: Inventory and First Playbook

**Time:** 2 hours
**Run commands in:** an Ubuntu lab machine where you have permission to use `sudo`.

## Inventory: where Ansible works

Create `inventory.ini`:

```ini
[web]
localhost ansible_connection=local
```

An inventory names hosts and groups. `ansible_connection=local` runs modules on the same machine; it does not connect through SSH.

Create `site.yml`:

```yaml
---
- name: Configure the CoraxReads practice web page
  hosts: web
  become: true
  tasks:
    - name: Install Nginx
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: true

    - name: Create the practice page
      ansible.builtin.copy:
        dest: /var/www/html/index.html
        content: "<h1>CoraxReads</h1><p>Practice catalog</p>\n"
        owner: root
        group: root
        mode: "0644"

    - name: Ensure Nginx is running
      ansible.builtin.service:
        name: nginx
        state: started
```

- `hosts` selects inventory members.
- `become: true` requests elevated privileges for system changes.
- `apt` declares the desired package state rather than a shell command.
- `copy` writes the exact page and sets owner/mode.
- `service` asks the platform's service manager to keep Nginx running.

The `ansible.builtin` prefix identifies modules included with Ansible.

## Inspect before execution

`site.yml` is YAML: indentation matters. Use spaces, not tabs. Review the playbook before running it because tasks can change the target.
