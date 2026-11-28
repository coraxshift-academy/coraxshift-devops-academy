# Terraform: the code for this course

Everything you need to finish the Terraform course is in this folder. Copy it into your own workspace, run it, and it works.

## Prerequisites

1. Terraform 1.6 or newer. Check with `terraform version`.
2. Docker Desktop or Docker Engine running. Check with `docker ps`.
3. For the cloud path only: an AWS account, with `aws configure` already done.

## Learning objectives

1. Read a Terraform configuration and name each block's job.
2. Separate variables, resources and outputs into their own files.
3. Run the four commands that matter: `init`, `plan`, `apply`, `destroy`.
4. Prove what Terraform created, then prove it removed it.

## Two ways to run this course

| | Local (free) | Cloud (your free tier) |
|---|---|---|
| Folder | this folder | `cloud-s3/` |
| Cost | $0 | pennies, if you destroy the same day |
| Command | `terraform apply` | `cd cloud-s3 && terraform apply` |

Start local. Do the cloud version only when the local one makes sense to you.

## Step 1: Copy the files and start Terraform

```bash
cp terraform.tfvars.example terraform.tfvars
terraform init
```

Expected output:

```text
Terraform has been successfully initialized!
```

## Step 2: See what Terraform would do

```bash
terraform plan
```

Expected output, near the end:

```text
Plan: 2 to add, 0 to change, 0 to destroy.
```

## Step 3: Create it

```bash
terraform apply
```

Type `yes` when asked. Expected output:

```text
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:

container_name = "coraxshift-web"
network_name   = "coraxshift-net"
web_url        = "http://localhost:8080"
```

Open http://localhost:8080. You should see the nginx welcome page.

## Step 4: Prove Terraform knows what it built

```bash
docker ps --filter name=coraxshift-web
```

Expected output:

```text
CONTAINER ID   IMAGE          ...   NAMES
a1b2c3d4e5f6   nginx:alpine   ...   coraxshift-web
```

## Step 5: Change one value and watch the plan

```bash
terraform apply -var="web_port=8090"
```

Expected output:

```text
Plan: 0 to add, 1 to change, 0 to destroy.
```

Terraform does not rebuild everything. It changes what you asked it to change. That is the whole point.

## Step 6: Clean up

```bash
terraform destroy
```

Expected output:

```text
Destroy complete! Resources: 2 destroyed.
```

Confirm nothing is left:

```bash
docker ps --filter name=coraxshift-web
```

Expected output:

```text
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

## What you learned

1. `versions.tf` pins the Terraform and provider versions, so the code behaves the same next year.
2. `variables.tf` holds the values you might change, so the resources stay readable.
3. `main.tf` describes the desired state. Terraform works out the steps.
4. `outputs.tf` prints what you need to use or verify afterwards.
5. `terraform plan` is the honest preview, and `terraform destroy` is how you stop paying.
