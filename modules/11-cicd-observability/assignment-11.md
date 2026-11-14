# Assignment 11: CI, Delivery, and Service Health

**Time:** 3-4 hours
**Submit in:** your portfolio repository and approved practice environment.

## Task 1 - Add CI

Create a GitHub Actions workflow for pull requests and pushes to the default branch. Run locked dependency installation, automated tests, and an image build. Give the workflow read-only permissions unless a specific job needs more.

## Task 2 - Prove it works

Open a pull request and capture a passing run. Then make a harmless test failure in a temporary branch, observe the red check, fix it, and verify green. Do not merge a failing change.

## Task 3 - Design safe delivery

Draw the path from merge to test deployment. State the artifact identifier, who approves production, which identity deploys, and how the previous version is restored. Do not add a cloud secret to the workflow.

## Task 4 - Build an observability view

Choose three signals: availability, error rate, and latency are a good start. Build a local or clearly labeled sample dashboard. Add a runbook link and one alert condition with a duration and owner.

## Task 5 - Test the response

Trigger a safe local failure, find its log, observe the health signal, and write the response steps. Restore the service and record recovery evidence.

## Submit

Workflow file, sanitized run link, delivery diagram, dashboard screenshot, alert/runbook, failure and recovery notes, and security review. Do not submit tokens or logs containing sensitive data.
