# Week 11: CI/CD and Observability

**Project:** CoraxReads
**Goal:** Automatically test changes, build a versioned container, and use signals to tell whether a release is healthy.

The course repository includes a working [CoraxReads CI workflow](../../.github/workflows/coraxreads-ci.yml) that students can inspect and adapt.

## What you will ship

- A pull-request workflow that runs tests and builds the app image.
- A documented deployment approval and rollback process.
- A small monitoring dashboard with an actionable alert.

## Three classes

1. **Continuous integration:** workflow triggers, checks, artifacts, and status.
2. **Continuous delivery:** image tags, environments, approvals, and rollback.
3. **Observability:** logs, metrics, dashboards, alerts, and incident notes.

```text
pull request -> tests -> build image -> approve -> deploy -> health check -> observe
```

CI checks whether a change is safe to merge. CD delivers a reviewed change. Observability explains how the running system behaves.

## Safety rules

- Start with pull-request tests; do not auto-deploy every branch.
- Use least-privilege identity and short-lived credentials such as OIDC where supported.
- Require approval for production deployment.
- Never print secrets into workflow logs.
- Do not enable a public dashboard without authentication and network restrictions.

## Lessons

- [Class 1: CI workflow](class-1.md)
- [Class 2: Delivery and rollback](class-2.md)
- [Class 3: Metrics, logs, and alerts](class-3.md)
- [Assignment 11](assignment-11.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 11](quiz-week-11.md)

## Official reference

- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [Prometheus documentation](https://prometheus.io/docs/introduction/overview/)
- [Grafana documentation](https://grafana.com/docs/grafana/latest/)
