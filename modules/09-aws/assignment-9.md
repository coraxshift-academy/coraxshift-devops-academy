# Assignment 9: Deploy a Small AWS Practice Site

**Time:** 3-4 hours, with instructor review before launch
**Never begin resource creation without an approved cost and teardown plan.**

## Task 1 - Set the guardrails

Enable MFA for the account owner, use an approved non-root identity, select the course region, create a cost budget with an email alert, and record your cleanup checklist. Ask the instructor to review before moving on.

## Task 2 - Plan the network access

Write down the exact inbound ports and source ranges. Limit SSH to your current IP or use Session Manager. If the site must be publicly visible, expose HTTP only for the exercise. Keep database/admin ports private.

## Task 3 - Launch and connect

Use an approved small instance type and Linux image. Add a purpose tag. Record the instance name and region in private notes. Connect using the approved method; if using SSH, keep the private key outside Git and set mode 400.

## Task 4 - Deploy and verify

Install Nginx using the Class 3 commands. Check service status and run `curl --fail http://localhost`. If approved, open the site using its public address. Capture a sanitized screenshot.

## Task 5 - Inspect and clean up

Record which security-group rule allowed the request. Stop and terminate resources as instructed. Check for leftover volumes, snapshots, load balancers, and public IP allocations. Include a checklist with each resource and its final state.

## Submit

Architecture diagram, sanitized security-group summary, budget-alert proof with personal information hidden, deployment verification, cost notes, teardown checklist, and troubleshooting reflection. Never submit keys, tokens, account credentials, or public screenshots of sensitive account details.
