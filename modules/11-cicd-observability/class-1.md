# Class 1: Continuous Integration

**Time:** 2 hours
**Run commands in:** your portfolio repository; workflow examples belong in `.github/workflows/`.

## Pipeline as an automated teammate

```text
change -> install locked dependencies -> tests -> build -> report status
```

A starter Node workflow:

```yaml
name: CoraxReads CI
on:
  pull_request:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
      - run: docker build -t coraxreads:${{ github.sha }} .
```

- `on` declares events that start the workflow.
- `permissions` grants only read access needed for checkout.
- `npm ci` installs locked dependencies reproducibly.
- `npm test` runs the project checks.
- `docker build` confirms an image can be created.

This starter uses major action tags for readability. In a real repository, pin third-party actions to reviewed full commit SHAs and update them deliberately.

Add the workflow to your app/portfolio repository and open a PR. Read the run log from the first failed step; do not paste tokens or secrets into logs.
