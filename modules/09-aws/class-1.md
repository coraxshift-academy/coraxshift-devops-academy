# Class 1: Account, Identity, and Budget

**Time:** 2 hours
**Run commands in:** AWS Console for account setup; no compute resources yet.

## Cloud is someone else's computer, with your bill

AWS provides services on demand. You still choose identity permissions, network access, and which resources run. The account owner is like the person who holds the building's master key; use a separate, least-privilege identity for normal work.

## Before creating compute

1. Sign in to the AWS account owner/root only for account-level tasks.
2. Enable multi-factor authentication (MFA) on the root user.
3. Do not create root access keys.
4. Use IAM Identity Center or an instructor-approved IAM identity for regular work.
5. Select the course region and record it in your private lab notes.
6. In Billing and Cost Management, create a monthly cost budget and email alert at a small amount chosen with the instructor.
7. Verify the alert recipient and note that alerts may be delayed and do not stop resources.

Do not post account IDs, billing screenshots with personal details, or credentials in a public portfolio.

## Practice without spending

Use the console to inspect IAM, VPC, and EC2 pages without pressing **Launch**. Identify:

- Who you are signed in as.
- Which region is selected.
- Which permissions the identity has.
- Where to find budgets and cost reports.

Ask for approval before any action that creates a paid resource.
