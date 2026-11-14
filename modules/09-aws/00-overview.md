# Week 9: AWS Cloud Foundations

**Project:** CoraxReads
**Goal:** Understand cloud identity, networking, billing, and a small compute deployment without treating cloud as free or risk-free.

## What you will ship

- A cost budget and notification configured before resources.
- A documented, small EC2 lab deployment reachable only through the ports you intend.
- A teardown checklist with evidence that resources were removed.

## Three classes

1. **Cloud accounts, IAM, and cost controls.**
2. **VPC, security groups, and EC2 networking.**
3. **Deploy, observe, and clean up a practice web service.**

```text
Browser -> Internet gateway -> security group -> EC2 instance -> Docker app
```

## Important cost and access rules

- AWS usage can incur charges. Free-tier eligibility and prices vary by account, date, and region.
- A budget alert is a warning, not a guaranteed spending cap; notifications can be delayed.
- Enable MFA for the account owner. Do not use root credentials for daily work.
- Use one AWS account for the course. Never put access keys or private SSH keys in Git.
- Do not create resources until the instructor confirms your budget and cleanup plan.

## Lessons

- [Class 1: Account, identity, and budget](class-1.md)
- [Class 2: Network and compute](class-2.md)
- [Class 3: Deploy and tear down](class-3.md)
- [Assignment 9](assignment-9.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 9](quiz-week-9.md)

## Official reference

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)
