# Quiz Week 11: CI/CD and Observability

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What is the primary purpose of CI?
A. Automatically validate proposed changes
B. Replace all code review
C. Store cloud passwords in YAML
D. Delete failed branches
Answer: A. Explanation: CI runs repeatable checks so teams have early feedback on changes.

Q2 - Choose ONE
Why use `npm ci` in CI?
A. Reproducibly install from the lockfile
B. Update all dependencies unpredictably
C. Start a cloud VM
D. Write the README
Answer: A. Explanation: `npm ci` installs the locked dependency tree.

Q3 - Choose ONE
Why tag images with a commit SHA or digest?
A. Identify the exact artifact
B. Make it publicly accessible
C. Remove need for testing
D. Hide build logs
Answer: A. Explanation: Immutable identifiers make it possible to know exactly what was tested and deployed.

Q4 - Choose ONE
Why should production deployment require approval?
A. Add a deliberate control before a high-impact change
B. Make CI slower for no reason
C. Avoid health checks
D. Share root credentials
Answer: A. Explanation: Approval adds a human control for sensitive environments.

Q5 - Choose ONE
What does OIDC commonly provide in cloud deployment?
A. Short-lived federated identity instead of a stored long-lived key
B. A database schema
C. A Grafana chart
D. A container volume
Answer: A. Explanation: Federation can exchange workflow identity for scoped temporary credentials.

Q6 - Choose ONE
What does a metric show?
A. A numeric measurement over time
B. A full application source file
C. A Git conflict
D. A secret password
Answer: A. Explanation: Metrics are time-series measurements such as latency or request count.

Q7 - Choose ONE
What should a useful alert include?
A. Condition, duration, severity, owner, and action
B. A chart color only
C. Every log line
D. No runbook
Answer: A. Explanation: An actionable alert tells someone why it fired and what to do.

Q8 - Choose ONE
Which workflow should not receive production credentials?
A. Untrusted pull-request job
B. Protected deployment environment
C. Approved release job
D. A narrowly scoped deploy role
Answer: A. Explanation: Untrusted PR code could expose credentials, so it must not receive production access.

Q9 - Choose ALL that apply
What belongs in a CI pull-request job?
A. Tests
B. Static validation
C. Image build
D. Production root key
Answers: A, B, C. Explanation: CI can validate and build; root keys do not belong in workflow jobs.

Q10 - Choose ALL that apply
Which practices reduce workflow risk?
A. Minimal `permissions`
B. Pin actions to reviewed commit SHAs
C. Protect deployment environments
D. Print secrets to logs
Answers: A, B, C. Explanation: Least privilege, pinning, and approvals reduce supply-chain and deployment risks.

Q11 - Choose ALL that apply
Which observability signals are useful?
A. Metrics
B. Logs
C. Traces
D. Unlabeled screenshots only
Answers: A, B, C. Explanation: These signals provide quantitative, event, and request-flow evidence.

Q12 - Choose ALL that apply
What helps with a failed release?
A. Roll back to a known-good artifact
B. Check health after rollback
C. Record which artifact was deployed
D. Delete all logs
Answers: A, B, C. Explanation: Known-good rollback, verification, and artifact traceability support recovery.

## Scoring

11 to 12: Pass, earn Week 11 badge. Below 11: review the explanations and retake once.
