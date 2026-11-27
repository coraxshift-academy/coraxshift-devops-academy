# Class 3: Continuous Delivery

**CI/CD for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to the last class

Checking code is half the job. The other half is **delivering** it: building the app into an image, testing the image itself, publishing it, and moving it through **staging** to **production**, with a human approving the last step. Then you meet a bad release, see the pipeline stop it, and **roll back**.

**By the end of this class you can:**

- Keep a value safe in a **secret**
- Create **environments** and require an **approval** before production
- Build, **smoke test** and publish a Docker image from a workflow
- Read a pipeline that pauses and wait for a person
- Watch the pipeline stop a bad release
- **Roll back** by reverting

## Prerequisites

- Classes 1 and 2 finished, with `main` protected and the `ship` helper saved

## Step 0: Return to your project

**Run it:**

```bash
cd ~/practice/cafe-cicd
. ~/.bashrc
git checkout main
git pull
type ship | head -1
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
gh api "repos/$REPO/branches/main/protection" --jq '.required_status_checks.contexts'
docker version --format 'docker server {{.Server.Version}}'
```

**What you should see:** `ship is a function`, `["test (3.11)","test (3.12)"]`, and a Docker version.

**If yours looks different:** if `ship` is missing, repeat Class 2, Step 9. If protection is missing, repeat Class 2, Step 6.

## Step 1: Store a secret

**Why this matters:** a pipeline sometimes needs a password or key. It must **never** be written in a file. GitHub keeps it as a **secret**, hands it to a run, and hides it in the logs.

**Run it:**

```bash
cd ~/practice/cafe-cicd
gh secret set CAFE_PASSCODE --body 'practice-value-123'
gh secret list
```

**What it does:** stores a secret named `CAFE_PASSCODE`. The value here is a **practice** value. For a real key you would paste it from a safe place and never type it into a file.

**What you should see:** a table with `CAFE_PASSCODE` and an updated time. Notice you can **list** secrets but you can **never read one back**.

## Step 2: Create two environments

**Why this matters:** an **environment** is a named place your app is delivered to, such as `staging` (a safe rehearsal) and `production` (the real thing). Production can require a **person's approval** before a run is allowed to continue.

**Run it:**

```bash
cd ~/practice/cafe-cicd
REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
MYID=$(gh api user --jq .id)
gh api -X PUT "repos/$REPO/environments/staging" --silent && echo "staging created"
gh api -X PUT "repos/$REPO/environments/production" --input - <<EOF
{ "reviewers": [ { "type": "User", "id": $MYID } ] }
EOF
gh api "repos/$REPO/environments" --jq '.environments[] | .name + "  protection rules: " + (.protection_rules | length | tostring)'
```

**What it does:** creates `staging`, then creates `production` with **you** as its required reviewer, then lists both.

**What you should see:** `staging created`, then `production  protection rules: 1` and `staging  protection rules: 0`.

**If yours looks different:** if you see `Upgrade to GitHub Pro` or `reviewers` is refused, your repository is private. Required reviewers are free only on **public** repositories. See Troubleshooting.

## Step 3: Package the app

**Why this matters:** to deliver the app we put it in a **Docker image**, using what you learned in the Docker course. We add a tiny web layer so the image has something to answer.

**Run it:**

```bash
cd ~/practice/cafe-cicd
git checkout -b add-web-and-image
cat > server.py <<'EOF'
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

from cafe import price_for


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, payload):
        data = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        url = urlparse(self.path)
        if url.path == "/health":
            self._send(200, {"status": "ok"})
        elif url.path == "/price":
            raw = parse_qs(url.query).get("minutes", [""])[0]
            if not raw.isdigit():
                self._send(400, {"error": "minutes must be a whole number"})
                return
            try:
                self._send(200, {"minutes": int(raw), "price": price_for(int(raw))})
            except ValueError as err:
                self._send(400, {"error": str(err)})
        else:
            self._send(404, {"error": "not found"})

    def log_message(self, fmt, *args):
        print(fmt % args, flush=True)


if __name__ == "__main__":
    print("Café pricing listening on port 8000", flush=True)
    HTTPServer(("0.0.0.0", 8000), Handler).serve_forever()
EOF
cat > Dockerfile <<'EOF'
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1

RUN useradd --create-home --uid 10001 appuser

WORKDIR /app
COPY cafe.py server.py ./

USER appuser
EXPOSE 8000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

CMD ["python", "server.py"]
EOF
cat > .dockerignore <<'EOF'
.git
.github
tests
__pycache__
*.pyc
test-results.xml
EOF
. .venv/bin/activate
python -m flake8 --max-line-length=100 . --exclude .venv && echo "style is clean"
```

**What it does:** adds `server.py` (a web server answering `/health` and `/price?minutes=60`), a `Dockerfile` that runs it as a **non-root** user with a health check, and a `.dockerignore`.

**What you should see:** `style is clean`.

## Step 4: Try the image yourself first

**Why this matters:** never ask a pipeline to do something you have not done by hand once.

**Run it:**

```bash
cd ~/practice/cafe-cicd
docker build -t cafe-pricing:local .
docker run -d --name smoke -p 8000:8000 cafe-pricing:local
sleep 3
curl -s localhost:8000/health; echo
curl -s "localhost:8000/price?minutes=60"; echo
curl -s "localhost:8000/price?minutes=45"; echo
docker rm -f smoke
```

**What it does:** builds the image, runs it, asks three questions, and removes the container.

**What you should see:**

```text
{"status": "ok"}
{"minutes": 60, "price": 180}
{"error": "No ticket for 45 minutes. Choose from [30, 60, 120, 1440]"}
```

**If yours looks different:** if `curl` says `Connection refused`, wait two seconds and try again. If port 8000 is busy, run `docker ps` and remove the old container.

## Step 5: Write the delivery workflow

**Run it:**

```bash
cd ~/practice/cafe-cicd
cat > .github/workflows/cd.yml <<'EOF'
name: CD

on:
  push:
    branches: [main]

permissions:
  contents: read
  packages: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - run: pip install -r requirements.txt
      - run: flake8 --max-line-length=100 .
      - run: pytest -q

  build:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      tag: ${{ steps.vars.outputs.tag }}
    steps:
      - uses: actions/checkout@v4

      - name: Work out the image tag
        id: vars
        run: |
          OWNER=$(echo "${{ github.repository_owner }}" | tr '[:upper:]' '[:lower:]')
          echo "tag=ghcr.io/${OWNER}/cafe-pricing:${GITHUB_SHA::7}" >> "$GITHUB_OUTPUT"

      - name: Build the image
        run: |
          docker build \
            --label "org.opencontainers.image.source=https://github.com/${{ github.repository }}" \
            -t "${{ steps.vars.outputs.tag }}" .

      - name: Smoke test the image
        run: |
          docker run -d --name smoke -p 8000:8000 "${{ steps.vars.outputs.tag }}"
          for i in 1 2 3 4 5 6 7 8 9 10; do
            curl -fs localhost:8000/health && break
            sleep 1
          done
          curl -fs "localhost:8000/health"
          test "$(curl -fs 'localhost:8000/price?minutes=60')" = '{"minutes": 60, "price": 180}'
          docker rm -f smoke

      - name: Log in to GitHub Container Registry
        run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u "${{ github.actor }}" --password-stdin

      - name: Push the image
        run: docker push "${{ steps.vars.outputs.tag }}"

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Pretend to deploy to staging
        env:
          CAFE_PASSCODE: ${{ secrets.CAFE_PASSCODE }}
        run: |
          test -n "$CAFE_PASSCODE" || { echo "The CAFE_PASSCODE secret is missing"; exit 1; }
          echo "The passcode is: $CAFE_PASSCODE"
          echo "Deploying ${{ needs.build.outputs.tag }} to STAGING"
          echo "Staging deployment finished."

  deploy-production:
    needs: [build, deploy-staging]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Pretend to deploy to production
        run: |
          echo "Deploying ${{ needs.build.outputs.tag }} to PRODUCTION"
          echo "Production deployment finished."
EOF
git add server.py Dockerfile .dockerignore .github/workflows/cd.yml
git commit -m "Add web layer, Dockerfile and delivery workflow"
echo "committed"
```

**What it does:** saves your files. We do not push yet. First, read the workflow.

## Step 6: Read the pipeline

**Why this matters:** this is a real delivery pipeline. Read each job.

- **`test`** runs the style and tests again. CD does not trust that CI ran. A bad commit must never get published.
- **`build`** `needs: test`, so it only starts if `test` passed.
  - It works out an image **tag** from the commit: the first seven letters of the commit ID. Every image can be traced to the exact code that made it.
  - It builds the image and adds a **label** that connects the image to this repository.
  - The **smoke test** starts the image and checks `/health` and one real price. This is the gate that tests the **thing you are delivering**, not just the code.
  - Only then does it log in to GitHub's container registry (**GHCR**) with the built-in `GITHUB_TOKEN`, and push the image.
  - `outputs` passes the tag on to the later jobs.
- **`deploy-staging`** `needs: build` and uses `environment: staging`. It also uses your **secret**. We do not really have a server, so this step prints what it would do.
- **`deploy-production`** `needs: [build, deploy-staging]` and uses `environment: production`. Because that environment requires a reviewer, **the run pauses here until you approve**.

```text
test ─▶ build (smoke test, push) ─▶ staging ─▶ [ you approve ] ─▶ production
```

## Step 7: Ship it

**Run it:**

```bash
cd ~/practice/cafe-cicd
ship
```

**What it does:** pushes the branch, opens a pull request, waits for the CI checks to go green, merges, and returns you to `main`. The merge to `main` is the **trigger** for the delivery workflow.

**What you should see:** a PR link, checks passing, the merge, and `main` updated.

## Step 8: Watch it pause at production

**Run it:**

```bash
cd ~/practice/cafe-cicd
sleep 20
RUN=$(gh run list --workflow cd.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run list --workflow cd.yml --limit 1
gh run view "$RUN"
```

**What you should see:** a run with status `waiting` or `in_progress`. The job list shows `test` ✓, `build` ✓ (after a minute or two), `deploy-staging` ✓, and `deploy-production` **waiting**.

Open the run on GitHub: **Actions**, then **CD**, then the latest run. You will see a yellow box saying **Review deployments**.

**If yours looks different:** if `build` fails at the push step with a permission error, see Troubleshooting. If `deploy-staging` fails with `The CAFE_PASSCODE secret is missing`, repeat Step 1.

## Step 9: Approve production

**Why this matters:** this is the human gate. A person looks at what is about to go live, and decides.

**Do it:** on the run page, click **Review deployments**, tick **production**, and click **Approve and deploy**.

Then watch it finish:

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --workflow cd.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" --exit-status
```

**What you should see:** every job with a ✓.

Now check the secret stayed hidden:

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --workflow cd.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$RUN" --log | grep -E "The passcode is|Deploying"
```

**What you should see:** `The passcode is: ***` and two `Deploying ghcr.io/.../cafe-pricing:xxxxxxx to ...` lines (STAGING and PRODUCTION).

The workflow printed the secret, and GitHub **masked** it. Never rely on this: do not print secrets on purpose.

## Step 10: Find your published image

**Do it:** on GitHub, open your **profile**, click the **Packages** tab, and open `cafe-pricing`. You will see the image and its tag, which matches the first seven letters of your commit. Compare it with:

```bash
cd ~/practice/cafe-cicd
git rev-parse --short=7 HEAD
```

**What you should see:** the package page lists a tag equal to a commit from your history. That tag tells you exactly which code is inside.

## Step 11: A bad release

**Why this matters:** one day a change will pass the unit tests and still be wrong. See which gate catches it.

The unit tests only test `cafe.py`. Let us break the **web layer**, which they do not touch: the answer will say `cost` instead of `price`.

**Run it:**

```bash
cd ~/practice/cafe-cicd
git checkout -b rename-field
sed -i 's/"price":/"cost":/' server.py
grep -n '"cost"' server.py
. .venv/bin/activate
python -m pytest -q 2>&1 | tail -1
git add server.py
git commit -m "Rename price field to cost"
ship
```

**What it does:** changes the answer's field name. The unit tests still pass (so CI is green and `ship` merges it), but the delivery workflow starts on `main`.

**What you should see:** `5 passed`, the checks passing, and the merge.

## Step 12: Watch the pipeline stop it

**Run it:**

```bash
cd ~/practice/cafe-cicd
sleep 90
RUN=$(gh run list --workflow cd.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" --exit-status || echo "The release was stopped, as planned"
gh run view "$RUN"
```

**What it does:** waits for the delivery run and shows its result.

**What you should see:** `test` ✓, then `build` ✗, and `deploy-staging` and `deploy-production` **skipped**. Then `The release was stopped, as planned`.

Find the reason:

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --workflow cd.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$RUN" --log-failed | tail -6
```

**What you should see:** the failing step is the **smoke test**, with a `curl` or `test` failure near the end.

The bad image was **never published** and **never deployed**. The smoke test caught what the unit tests missed.

## Step 13: Roll back

**Why this matters:** the fastest, safest rollback is to **undo the change in Git** and let the same pipeline deliver the previous behaviour. Nobody edits a server by hand.

**Run it:**

```bash
cd ~/practice/cafe-cicd
git checkout main
git pull
git checkout -b rollback-rename-field
git revert --no-edit HEAD
grep -n '"price":' server.py
ship
```

**What it does:** makes a new commit that reverses the bad one, and sends it through the normal door: pull request, checks, merge.

**What you should see:** the `"price":` line is back, the checks pass, and the merge succeeds.

Approve production again when the run pauses:

```bash
cd ~/practice/cafe-cicd
sleep 90
RUN=$(gh run list --workflow cd.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$RUN"
```

**Do it:** on the run page, click **Review deployments**, tick **production** and approve. Then:

```bash
cd ~/practice/cafe-cicd
RUN=$(gh run list --workflow cd.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RUN" --exit-status
gh run list --workflow cd.yml --limit 4
```

**What you should see:** a final success, and the history of delivery runs: success, **failure**, success.

## Step 14: Tidy up

**Run it:**

```bash
cd ~/practice/cafe-cicd
gh secret delete CAFE_PASSCODE
gh secret list
docker rmi cafe-pricing:local
git checkout main
git branch
```

**What it does:** removes the practice secret and the local image.

**What you should see:** an empty secret list, and `main` as your only branch.

Keep the repository. It is a ready-made portfolio piece. To remove the published image, open the package page on GitHub, then **Package settings**, then **Delete this package**.

## ✅ Recap

- **Continuous Delivery** builds, tests, publishes and delivers every change that passes.
- A **secret** is stored once, handed to a run, and hidden in logs. You can never read it back.
- An **environment** is a place you deliver to. Production can **require approval**.
- Tag images with the **commit**, so every image traces to its code.
- A **smoke test** checks the thing you deliver, not just the code.
- `needs` makes jobs run in order, and a failure **stops** everything after it.
- A **rollback** is a `git revert` through the same pipeline.

## 📤 Push to your portfolio

In your portfolio repository, create `cicd/class-3/` and add:

1. Your `cd.yml`
2. A `notes.md` answering: *Why do we tag images with the commit? What did the smoke test catch that the unit tests did not? Why is approval before production valuable? How did you roll back?*
3. The output of `gh run list --workflow cd.yml --limit 4`

Next up: [the Assignment](assignment-build-a-pipeline.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-continuous-integration.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-build-a-pipeline.md)</td></tr></table>
