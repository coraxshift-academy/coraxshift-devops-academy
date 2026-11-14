# Week 2 Required Linux Assignments

Week 2 now has **three required, separate assignments**. They use Codespaces as a temporary Linux lab; AWS, EC2, public IPs, and public port forwarding are out of scope.

| Assignment | Practice | Time |
| --- | --- | ---: |
| [2A: Build and deploy CoraxReads with React and Nginx](assignment-2a-react-nginx.md) | Build a production bundle, serve it from Nginx, and verify it locally | 60 minutes |
| [2B: Production operations and recovery drill](assignment-2b-operations-drill.md) | Check service health, traffic, logs, resources, and recover from controlled failures | 90 minutes |
| [2C: Add a static portfolio page to Nginx](assignment-2c-static-portfolio.md) | Create a small HTML page and serve it beside the React app | 60 minutes |

**Expected assignment time: 3.5 hours**, in addition to the three two-hour classes. Plan for about 9.5 hours total this week. Save your write-up and sanitized evidence in your own portfolio repository, not in the course repository.

## Before starting

1. Complete the three Week 2 class guides.
2. Read the [Week 2 overview](00-overview.md) and [Getting Started tool/version guide](../../GETTING-STARTED.md).
3. Use a Codespace running Ubuntu 24.04 or the instructor-approved local Linux environment. The React assignment needs Node.js 22.x or newer; the operations assignments need Nginx.
4. Keep forwarded ports **Private**. Open the forwarded port only for your own browser check.
5. Use a display name or alias in the demo; never expose keys, tokens, passwords, cloud account details, or personal information you do not want to share.

## Evidence and reflection

For each assignment, record the commands you ran, the result, and what you learned in your own words. Screenshots are evidence, not a replacement for explaining the result. Publishing on LinkedIn is optional; a private portfolio entry is equally valid.

## Week 2 architecture

```text
React source --npm run build--> dist/ --copy--> /var/www/html/coraxreads/
                                                     |
Browser --private Codespaces port 80--> Nginx -------+

Static portfolio HTML -----------------> /var/www/html/portfolio/
```

In Week 3, you will turn selected manual checks into scripts. Do not copy Week 3 automation into these Week 2 assignments; first learn what the checks mean.
