# Assignment 6: Provision a Local CoraxReads Web Container

**Time:** 2-3 hours
**Submit in:** your portfolio repo, `modules/06-terraform/assignment-6/`.

## Task 1 - Prepare safely

Read the [Getting Started tool/version guide](../../GETTING-STARTED.md#install-tools-when-their-week-arrives) and use only a disposable local lab. If Docker or Terraform is missing, install it using the linked official instructions before continuing; do not switch to a cloud provider.

1. Confirm Docker works with `docker version`.
2. Confirm Terraform is installed with `terraform version`.
3. Create a clean folder and put the Class 1 configuration in `main.tf`.
4. Add `.terraform/`, `*.tfstate*`, `*.tfplan`, and `crash.log` to `.gitignore`.

`docker version` shows client and server information; if no server section appears, Docker Engine is not reachable.

## Task 2 - Validate and plan

Run `terraform fmt`, `terraform init`, `terraform validate`, and `terraform plan -out=lab.tfplan`. Explain the purpose of each command in your notes. Save a sanitized plan excerpt; do not upload state.

## Task 3 - Apply and verify

Read the plan. Confirm only one Nginx image and one named container are involved. Run `terraform apply lab.tfplan`, then `terraform output` and `curl --fail http://localhost:8080`.

## Task 4 - Change and review

Change host port 8080 to 8081. Format and plan again. Predict whether the container will be replaced or updated based on the plan. Apply only after review, then verify port 8081.

## Task 5 - Destroy and verify

Run `terraform plan -destroy`; confirm it refers only to the lab resource. Run `terraform destroy`, then `docker ps -a` to verify cleanup.

## Submit

Terraform files, `.gitignore`, a plan summary, command explanations, HTTP check evidence, cleanup evidence, and one troubleshooting note. Exclude state, plans, credentials, and `.terraform/`.
