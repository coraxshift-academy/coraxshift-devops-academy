# Assignment 7: Configure a Practice Web Server

**Time:** 2-3 hours
**Target:** An Ubuntu VM or a disposable Ubuntu Codespace where you have admin permission.

## Task 1 - Prepare the target

Run `whoami`, `cat /etc/os-release`, `ansible --version`, and `sudo service nginx status`. Confirm the OS, Ansible version, and target. If you are not sure which machine a command will affect, stop.

## Task 2 - Write the inventory and playbook

Use the Class 1 inventory. Create a playbook with tasks to:

1. Install Nginx using the package module.
2. Create `/var/www/html/index.html` owned by `root`, mode `0644`.
3. Ensure Nginx is started.

Explain each module and the desired state in a comment or README. Avoid shell/command modules when an Ansible module already exists.

## Task 3 - Preview and apply

Run inventory listing, syntax check, then `--check --diff`. Read the output. Apply only to the lab target.

## Task 4 - Verify and rerun

Run `curl -I http://localhost`, inspect `ls -l /var/www/html/index.html`, and run the playbook again. Explain why the second run should make no changes.

## Task 5 - Break and recover

Change the page text and run the playbook again. Confirm the page updates. Restore the original text and rerun. Do not remove system directories or test against production.

## Submit

Inventory, playbook, README with each command explained, sanitized first/second run output, HTTP check, and one troubleshooting note. Exclude SSH keys and credentials.
