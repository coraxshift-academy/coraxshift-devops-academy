# CoraxShift DevOps Academy

> Learn by building. Break it. Fix it. Ship it.

**12-week roadmap** | **3 classes / week** | **2 hours / class** | **1 learning project** | **12 badges**

> **Course status:** All 12 weeks have an overview, three class guides, a practical assignment, troubleshooting notes, and a weekly quiz. A local-first learning portal and CoraxReads teaching app make it easier to explore and practice the course.

See the [full curriculum](curriculum.md) for the week-by-week roadmap.
New learners should also read the [portfolio submission guide](PORTFOLIO-GUIDE.md).
Preview the [CoraxShift learning portal](website/README.md), browse the [curated open-source project references](OPEN-SOURCE-PROJECTS.md), and compare the [AWS, Azure, and Google Cloud architecture diagrams](CLOUD-ARCHITECTURES.md).

## **What is CoraxShift?**

CoraxShift is a portfolio-based DevOps academy. You do not just watch. You build, you break, you fix, you ship.

One project from Week 1 to Week 12. One portfolio that proves what you can do.

## **Who is this for?**

- Beginners with no tech background
- Career changers who want proof, not just certificates
- Students who want to explain what they built in plain words
- Anyone who wants to learn DevOps by doing, not by memorizing

No experience needed. We start from zero and explain every command.

## **What you will build**

**CoraxReads** - a sample bookstore project used to learn DevOps one step at a time.

- Week 1: Understand how a browser finds and talks to a website
- Week 2: Serve a simple practice page with Nginx in a Codespace
- Weeks 3-8: Learn scripting, Git, delivery planning, Terraform, Ansible, and Docker
- Week 9: Learn the cloud using one AWS account and a billing alert
- Weeks 10-12: Learn Kubernetes, monitoring, CI/CD, and present the capstone

Your portfolio starts in Week 1. Every week you push.

## **How it works**

- **3 classes per week, 2 hours each**
- **Every class:** Where to run commands, what each command does, expected output, what you should see after
- **Every week:** Hands-on project, push to portfolio, pass checklist
- **Every week:** Quiz at end of Class 3, 12 questions, 20 minutes
- **Every week:** 90 percent earns the weekly badge

## **12-Week Curriculum**

| Week | Focus | What you ship |
| --- | --- | --- |
| [1. Essentials](modules/01-essentials/00-overview.md) | Internet, networking, tools | Internet diagram, workstation check, project explanation |
| [2. Linux](modules/02-linux/00-overview.md) | Linux, Nginx, operations | Local practice page, health-check script, maintenance notes |
| [3. Bash](modules/03-bash/00-overview.md) | Shell automation | Health check and verified backup scripts |
| [4. Git](modules/04-git/00-overview.md) | GitHub collaboration | Reviewed pull request and conflict-resolution evidence |
| [5. SDLC](modules/05-sdlc/00-overview.md) | Plan, test, release | Feature issue, test plan, release and rollback notes |
| [6. Terraform](modules/06-terraform/00-overview.md) | Infrastructure as code | Local Docker infrastructure, reviewed plan, cleanup proof |
| [7. Ansible](modules/07-ansible/00-overview.md) | Configuration automation | Repeatable Nginx playbook and idempotency evidence |
| [8. Docker](modules/08-docker/00-overview.md) | Containers and Compose | App + database stack with persistent data |
| [9. AWS](modules/09-aws/00-overview.md) | Cloud foundations | Cost guardrails, small approved deployment, teardown |
| [10. Kubernetes](modules/10-kubernetes/00-overview.md) | Local orchestration | Local cluster, workload, Service, probes, runbook |
| [11. CI/CD + observability](modules/11-cicd-observability/00-overview.md) | Delivery and operations | CI workflow, dashboard, alert, recovery notes |
| [12. Capstone](modules/12-capstone/00-overview.md) | Integration and presentation | Demonstrable system, documentation, recovery, reflection |

## **How the project fits together**

We start with a simple page, then add the parts a real application needs. Think of it like a bookstore: the page is the shop window, the backend is the clerk handling requests, and the database is the stock ledger.

```text
Browser
   |
   v
Web page (HTML, CSS, JavaScript)
   |
   v
Backend (Node.js + Express)
   |
   v
Database (PostgreSQL)
```

In Week 2, the practice page is served by Nginx on your Codespace. That is a local learning exercise, not the finished cloud architecture.
The response travels back along the same path to the browser.

## **Quiz and Badge**

- **Quiz:** Per week, not per class. 12 questions per week: 8 single-answer, 4 multiple-answer
- **Style:** Technical, not ABC. Scenario, output, and fix based, from that week's lab
- **Pass:** 11 out of 12, 90 percent, earns the weekly badge
- **If below 90 percent:** Review, retake once
- **Total:** 12 badges. Each badge goes in your portfolio README

## **What you need**

- A laptop
- A GitHub account
- 5 to 7 hours per week
- Codespaces as a practice environment until Week 9

No cloud account until Week 9. In Weeks 6 to 8, practice Terraform, Ansible, and Docker locally. In Week 9, use one AWS account, set a billing alert before creating resources, and remove resources when you finish. Week 10 uses local Kubernetes. AWS billing alerts are not spending caps, so follow the cleanup checklist and review current pricing.

## **Example stack for CoraxReads**

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Database:** PostgreSQL

## **What we promise**

We promise skills and proof. A portfolio you can show, a demo you can explain, and badges you earned by passing technical quizzes.

We do not promise a job. No academy can promise that. What we promise is that you will finish with work you can defend in an interview.

## **How to start**

1. Open this private repo in Codespaces and preview the [learning portal](website/README.md).
2. Open the [Week 1 overview](modules/01-essentials/00-overview.md).
3. Start Class 1, do the lab, and push your work to your separate portfolio repo.
4. Share your Week 1 assignment only after checking it contains no credentials or private course material.

The lessons live here. Your own exercises, screenshots, and portfolio work belong in your separate portfolio repository. Never put passwords, API keys, or cloud credentials in either repository.

## **For students**

This repo is private because students pay for it. Your portfolio repo is public. That is where you show your work.

Build. Break. Fix. Ship. Welcome to CoraxShift.
