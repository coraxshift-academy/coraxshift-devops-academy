# CI/CD: the code for this course

A working app with tests, plus the two workflow files the course walks through. Copy them into your repository and the pipeline runs.

## Prerequisites

1. A GitHub account and a repository you can push to.
2. Node.js 22 to run the app locally. Check with `node --version`.
3. Docker, if you want to build the image locally. Not required: GitHub builds it for you.

## Learning objectives

1. Run the tests locally before letting a pipeline run them.
2. Read a workflow file and say which line makes it run on a pull request.
3. Explain why CI must stop on a failing test, and prove it by breaking one.
4. Tag an image with the commit SHA, so every deployment is traceable.
5. Explain the difference between CI and CD in one sentence each.

## Step 1: Run the tests locally

```bash
cd app
npm install
npm test
```

Expected output:

```text
# tests 2
# pass 2
# fail 0
```

## Step 2: Break a test on purpose

Change `'ok'` to `'fine'` in `test/server.test.js`, then run:

```bash
npm test
```

Expected output:

```text
# tests 2
# pass 1
# fail 1
```

Put it back. That failure is what a pipeline must refuse to ignore.

## Step 3: Turn on CI

```bash
mkdir -p ../.github/workflows
cp ../ci/ci.yml ../.github/workflows/ci.yml
```

Commit, push, and open a pull request. Expected result on the pull request page:

```text
✓ CI / test (pull_request)  Successful in 42s
```

## Step 4: Prove the pipeline blocks a bad change

Push a commit that breaks the test again. Expected result:

```text
✗ CI / test (pull_request)  Failing after 35s
```

The merge button is now blocked. That is the whole value of CI.

## Step 5: Turn on CD

```bash
cp ../ci/cd.yml ../.github/workflows/cd.yml
```

Merge a green pull request. Expected result in the Actions tab:

```text
✓ CD / build-and-push  Successful in 1m 10s
```

Then look at your repository's Packages tab. The image is there, tagged with the commit SHA.

## Step 6: Clean up

Delete the two workflow files and the package:

```bash
rm ../.github/workflows/ci.yml ../.github/workflows/cd.yml
```

Expected result: the Actions tab shows no further runs. Delete the package from the Packages tab if you do not want to keep it.

## What you learned

1. `on:` decides when a pipeline runs. `pull_request` is the CI trigger that matters.
2. A failing test stops the job, and a stopped job blocks the merge.
3. Tagging with `${{ github.sha }}` means you can always say exactly what is deployed.
4. `GITHUB_TOKEN` and `packages: write` are what let the pipeline push an image.
5. CI answers "is this safe to merge", CD answers "is this shipped".
