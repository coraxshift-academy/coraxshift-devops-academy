# Week 6 Troubleshooting

| Problem | Likely reason | Safe next step |
| --- | --- | --- |
| `terraform: command not found` | Terraform CLI is missing or not on PATH | Follow the official install instructions for your OS, reopen the terminal, then check `terraform version`. |
| Docker provider cannot connect | Docker daemon is stopped or socket is unavailable | Run `docker version`; start Docker Engine or use a supported local VM. Do not expose the Docker socket over an unauthenticated network. |
| `terraform init` fails | Network/provider registry access or configuration typo | Read the first provider error, check the `source` and version constraint, retry after network recovery. |
| Plan wants to destroy unexpected resources | Wrong directory/workspace/state or changed configuration | Stop. Check `pwd`, `terraform workspace show`, state list, and plan. Do not apply. |
| Port 8080 already allocated | Another local service uses the port | Find the listener with `docker ps` or `ss -tulpn`; choose a free host port and re-plan. |
| `terraform destroy` cannot find a resource | State and actual resources differ | Inspect `terraform state list` and `docker ps -a`; do not delete state to make the error disappear. |

Never commit Terraform state or a saved plan. A plan can contain values that should not be public even when they are marked sensitive.
