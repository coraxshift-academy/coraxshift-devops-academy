# Week 7 Troubleshooting

| Problem | Likely reason | Safe next step |
| --- | --- | --- |
| `ansible-playbook: command not found` | Ansible is not installed or PATH is stale | Check `ansible --version`; install it in the chosen lab environment. |
| `could not match supplied host pattern` | Inventory path/group name is wrong | Run `ansible-inventory -i inventory.ini --list`; compare the group to `hosts:`. |
| YAML syntax error | Indentation, colon, or quote error | Read the reported line and check surrounding indentation; run `--syntax-check`. |
| Permission denied | `become` missing or target user lacks sudo | Confirm target and privilege policy; use `--ask-become-pass` if required. Never add passwords to YAML. |
| Service task fails in a container | Container has no compatible init/service manager | Use a proper Ubuntu VM for service-management practice; do not install systemd blindly into the container. |
| Every rerun reports changes | Task is not idempotent or output changes each run | Prefer declarative modules; remove timestamps/random content from managed files. |
| Check mode says no change but real run changes | Module does not fully support check mode | Treat check mode as a hint; inspect module docs and review/apply only in the lab. |

Use `-vv` for extra task-level detail. Avoid `-vvvv` when output could expose connection details or sensitive values.
