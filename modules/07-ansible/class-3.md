# Class 3: Preview and Apply Safely

**Time:** 2 hours
**Run commands in:** your Ansible lab folder.

## Check syntax and target selection

```bash
ansible-inventory -i inventory.ini --list
ansible-playbook -i inventory.ini site.yml --syntax-check
```

- `ansible-inventory --list` displays the resolved hosts and groups.
- `--syntax-check` parses the playbook without applying tasks.

Preview where supported:

```bash
ansible-playbook -i inventory.ini site.yml --check --diff
```

- `--check` asks supported modules to predict changes.
- `--diff` shows file changes that modules can preview.

Check mode is not a perfect simulation. Some modules cannot predict results, so read output and review the playbook.

Apply to the lab:

```bash
ansible-playbook -i inventory.ini site.yml
```

On a remote host that requires a become password, add `--ask-become-pass`. Do not put that password in inventory or source code.

Run the playbook a second time. A stable host should report zero changed tasks for work that is already correct.
