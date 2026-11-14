# Week 7: Ansible Configuration Automation

**Project:** CoraxReads
**Goal:** Describe a repeatable web-server setup as an Ansible playbook and safely apply it to a lab machine.

## What you will ship

- An inventory for a practice Ubuntu target.
- A playbook that installs Nginx and deploys a static CoraxReads page.
- Evidence that a second run makes no unnecessary changes.

## Three classes

1. **Inventory and playbooks:** hosts, tasks, modules, and variables.
2. **Repeatability:** templates, handlers, idempotency, and privilege escalation.
3. **Safe execution:** syntax check, check mode, diff, and troubleshooting.

```text
inventory (where) + playbook (what) -> Ansible modules -> configured server
```

Ansible is an instruction runner, not a backup system. Use a disposable lab target, keep changes reviewed, and never run an unreviewed playbook against production.

## Lessons

- [Class 1: Inventory and first playbook](class-1.md)
- [Class 2: Idempotency and handlers](class-2.md)
- [Class 3: Preview and apply safely](class-3.md)
- [Assignment 7](assignment-7.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 7](quiz-week-7.md)

## Official reference

- [Ansible getting started](https://docs.ansible.com/ansible/latest/getting_started/index.html)
- [Ansible playbook guide](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html)
