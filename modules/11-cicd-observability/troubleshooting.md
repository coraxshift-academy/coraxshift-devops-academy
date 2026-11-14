# Week 11 Troubleshooting

| Problem | Likely reason | Safe next step |
| --- | --- | --- |
| Workflow does not start | Trigger/branch name mismatch or workflow file path wrong | Check `.github/workflows`, event type, default branch, and Actions settings. |
| `npm ci` fails | Lockfile is missing or out of sync | Run install locally, review and commit the lockfile, then retry. |
| Docker build works locally but not CI | Missing file in context, platform difference, or unpinned dependency | Inspect build logs and `.dockerignore`; reproduce from a clean checkout. |
| Secret is empty in a job | Secret not configured for repository/environment or job lacks permission | Verify protected secret scope and environment approval; never print it for debugging. |
| Deploy job runs on untrusted PR | Workflow permissions/conditions are too broad | Remove deployment credentials from PR jobs; restrict deployment to protected branches/environments. |
| Dashboard has no data | Exporter not running or scrape target wrong | Inspect Prometheus targets and service networking; verify `/metrics` from the monitor container. |
| Alert fires constantly | Threshold/window or query is wrong | Validate the query against a test signal, set a sensible duration, and document the expected action. |
| Alert is ignored | No owner or useful runbook | Assign an owner, reduce noise, and include exact first checks in the runbook. |

When an action fails, read the first failing step and relevant lines of log. Redact credentials and personally identifiable information before sharing output.
