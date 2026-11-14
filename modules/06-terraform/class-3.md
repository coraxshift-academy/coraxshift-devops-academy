# Class 3: State, Drift, and Cleanup

**Time:** 2 hours
**Run commands in:** `terraform-lab/`.

## State is a map

Terraform state records the resource identities it manages and links them to configuration. It is not a cache to casually delete. Never commit `terraform.tfstate`, saved plans, or files under `.terraform/`.

Inspect:

```bash
terraform state list
terraform show
```

- `state list` names resources tracked in state.
- `show` describes the current tracked resources.

If someone changes infrastructure outside Terraform, the actual environment can drift from the code. A new `terraform plan` helps identify differences. Do not run `terraform refresh` or edit state by hand to hide drift.

## Destroy only the lab

First verify the directory and workspace:

```bash
pwd
terraform workspace show
terraform plan -destroy
```

`pwd` confirms location; `workspace show` identifies the active workspace; `plan -destroy` previews deletions. Read the plan and confirm it names only `coraxreads-terraform-lab`.

Then clean up:

```bash
terraform destroy
```

Review the prompt before confirming. Verify the container is gone with `docker ps -a`.

## Practice

Change the external port to 8081, format, validate, and plan. Explain the planned change before applying it.
