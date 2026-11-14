# Class 2: Plan Before Apply

**Time:** 2 hours
**Run commands in:** the `terraform-lab/` directory.

Run:

```bash
terraform fmt
terraform init
terraform validate
terraform plan -out=lab.tfplan
```

- `fmt` formats Terraform files consistently.
- `init` downloads the declared provider and creates local working metadata.
- `validate` checks configuration structure and provider schemas.
- `plan` previews changes; `-out` saves the exact plan for review/application.

Read the plan. Check the names, ports, and actions. `+` means create, `~` means update, `-` means destroy. If Terraform proposes unexpected resources, stop and investigate.

Apply the reviewed plan:

```bash
terraform apply lab.tfplan
terraform output
curl --fail --show-error http://localhost:8080
```

- `apply lab.tfplan` applies the reviewed plan file.
- `output` prints declared outputs.
- `curl` verifies the web server answers.

Do not use `-auto-approve` in a learning or production workflow until a reviewed automation design explicitly permits it.
