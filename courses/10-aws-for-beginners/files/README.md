# AWS: the code for this course

Every command in the AWS classes is here as a script you can run. The same scripts work against LocalStack on your laptop (free) and against your real AWS account (a few cents, if you clean up).

## Prerequisites

1. AWS CLI v2. Check with `aws --version`.
2. Docker running. Check with `docker ps`.
3. For the cloud path only: an AWS account and `aws configure` already done.

## Learning objectives

1. Run AWS commands against a local fake of AWS, so mistakes cost nothing.
2. Create a bucket, upload an object, read it back, then remove it.
3. Explain what `--endpoint-url` changes and why it is the whole trick.
4. Read a bill-relevant habit: every lab ends with a teardown.

## Two ways to run this course

| | LocalStack (free) | Real AWS (your account) |
|---|---|---|
| Endpoint | `http://localhost:4566` | none, the CLI uses AWS |
| Credentials | fake, `test` / `test` | your real keys from `aws configure` |
| Cost | $0 | pennies, but only if you clean up |
| Command | `source scripts/env.sh` then the script | `unset ENDPOINT` and use the same commands without `--endpoint-url` |

Start with LocalStack. Only move to real AWS when the local run is boring.

## Step 1: Start LocalStack

```bash
docker compose -f docker-compose.localstack.yml up -d
```

Expected output:

```text
✔ Container files-localstack-1  Started
```

## Step 2: Check the CLI and the endpoint

```bash
chmod +x scripts/*.sh
./scripts/00-check.sh
```

Expected output:

```text
AWS CLI version:
aws-cli/2.17.0 Python/3.11 Linux exe/x86_64

Is LocalStack up?
If you saw no error above, LocalStack is ready.
```

## Step 3: Create the bucket

```bash
./scripts/01-create-bucket.sh
```

Expected output:

```text
make_bucket: coraxshift-lab
Bucket coraxshift-lab created.
```

## Step 4: Upload the page

```bash
./scripts/02-upload-site.sh
```

Expected output:

```text
upload: ../site/index.html to s3://coraxshift-lab/index.html

Objects in the bucket:
2026-11-28 07:10:11       189 index.html
```

## Step 5: Read it back

```bash
./scripts/03-read-it-back.sh
```

Expected output: the HTML of the page, printed in your terminal.

## Step 6: Clean up

```bash
./scripts/04-cleanup.sh
```

Expected output:

```text
delete: s3://coraxshift-lab/index.html
Bucket removed and LocalStack stopped.
```

## The cloud path

When you are ready to use your own account, run the same commands without `--endpoint-url`, using real credentials from `aws configure`. Then delete the bucket the same day:

```bash
aws s3 rb s3://YOUR-UNIQUE-BUCKET-NAME --force
```

An empty bucket still counts as a resource. Delete it, do not just empty it.

## What you learned

1. `--endpoint-url` points the same CLI at a different server. That is all LocalStack is.
2. Fake credentials work locally because nothing is checking them.
3. `aws s3 cp` uploads and downloads; `-` as the destination prints to the screen.
4. `s3 rb --force` removes a bucket and its objects, which is how you stop a bill.
5. Practising on a fake first is cheaper than learning on a real bill.
