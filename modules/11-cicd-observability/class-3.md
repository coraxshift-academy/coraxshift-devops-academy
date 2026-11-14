# Class 3: Metrics, Logs, and Alerts

**Time:** 2 hours
**Tools:** Your local lab app; Prometheus/Grafana may run locally in Docker.

## Three kinds of evidence

- **Metrics:** numbers over time, such as request count or latency.
- **Logs:** timestamped events that explain what a component did.
- **Traces:** a request's path across components.

Think of a shop: metrics say how many customers waited; logs record a specific order error; a trace follows one order from the counter to the stock room.

## Dashboard first

Choose a question before adding a chart:

- Is the service up?
- Are errors increasing?
- Is request latency getting worse?
- Is the database reachable?

A dashboard should answer operational questions, not just look busy. Label units, time range, and service.

## Alerts should lead to action

An alert needs a condition, duration, severity, owner, and runbook. Alert on user impact (for example sustained failed health checks), not every small CPU change. Test the alert safely in a local lab.

Never put credentials, personal information, or full request bodies in logs. Restrict dashboard access; dashboards can reveal operational details.

## Practice

Trigger one known test failure. Find it in logs, identify a metric that would reveal impact, and write one actionable alert plus the first two runbook steps.
