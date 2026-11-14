# Learner Portfolio Guide

Your course repo is the lesson book. Your portfolio repo is your own work. Do not edit the course files to submit assignments.

## Suggested portfolio layout

```text
coraxreads-portfolio/
├── README.md
├── architecture/
│   └── request-flow.png
├── modules/
│   ├── 01-essentials/
│   ├── 02-linux/
│   ├── 03-bash/
│   └── ...
└── .gitignore
```

Create folders as you reach each week. Keep notes, diagrams, scripts, test evidence, and runbooks in the matching week folder. Avoid committing screenshots that reveal personal details.

## Weekly submission checklist

For each assignment:

1. Read the overview and all three class guides.
2. Read the assignment once before running commands.
3. Check the **where to run commands** instructions.
4. Copy commands carefully; replace example names/ports only when the guide says to.
5. After each step, compare your output with the expected result.
6. If it differs, stop and use the week's troubleshooting guide before trying random fixes.
7. Save a short reflection: what worked, what broke, how you verified the repair.
8. Review `git status` and `git diff` before committing.
9. Remove secrets and personal information before pushing.
10. Submit the portfolio link and any requested pull-request or demo link.

## Explain commands in plain words

Use this pattern in your notes:

```text
Command:
Where I ran it:
What it does:
Why I ran it:
Expected result:
What I saw:
What I did if it failed:
```

Do not submit a command list without explaining why the command is safe and relevant.

## Protect your work

- Never commit `.env`, passwords, API keys, access tokens, private keys, or cloud credentials.
- A private repository is not a secret manager.
- Use a display name and blur usernames, account IDs, email addresses, private IPs, browser tabs, and billing details if you do not want them public.
- If you accidentally publish a credential, treat it as compromised: revoke/rotate it and tell the account owner. Deleting the line is not enough.
- Never run destructive commands on a shared or production environment.

## Official documentation

Each week's overview links to official documentation. Use it to confirm current tool behavior and versions; the course examples are practice starting points, not substitutes for current vendor guidance.
