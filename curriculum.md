

# **CoraxShift Curriculum - 12 Weeks, One Real Project**

Project: CoraxReads, a sample bookstore app used throughout the course. You learn the pieces in stages and present your capstone in Week 12.

This is the complete course roadmap. Every week has an overview, three class guides, a practical assignment, troubleshooting notes, and a weekly quiz. Later-week activities are educational labs; they are not production infrastructure.

Start with the [Week 1 overview](modules/01-essentials/00-overview.md) or [Week 2 overview](modules/02-linux/00-overview.md), then follow the weekly links in the [README](README.md).

## **The project in one picture**

```text
Browser -> Web page -> Backend -> PostgreSQL
             shop       clerk      stock ledger
```

The analogy is only a way to remember the roles: the backend validates requests and applies rules; the database stores the bookstore's data.

## **Week 1: Essentials - Internet, Networking and Tools Basics**

Learn: What happens when you type a website. DNS, IP, port, HTTP, TCP, and what a server does.
Build: Set up VS Code and a terminal. Draw how a request travels from browser to server. Install later-week tools only when a lesson needs them.
Push: Your diagram + tool check list + project idea doc for CoraxReads.

## **Week 2: Linux for DevOps**

Learn: Files, permissions, users, processes, logs, basic networking commands. How to read a log and find the problem.
Build: Serve a simple CoraxReads practice page with Nginx in a Codespace. Manage it with commands, check logs, and learn safe file permissions.
Push: Screenshots of your commands + a short log troubleshooting note.

## **Week 3: Bash for DevOps**

Learn: Bash in plain words. Variables, if, loops, functions. How to automate boring work.
Build: Write a healthcheck script and a dated backup script for your project. Learn why safe automation validates inputs and never deletes unknown paths.
Push: Your scripts + how to run them + proof the backup can be restored.

## **Week 4: Git and GitHub**

Learn: Git workflow a real team uses. Branch, commit, merge, pull request, review, conflict.
Build: Put CoraxReads in Git properly. Create a dev branch, open a PR, fix a practice merge conflict, write a clean commit history.
Push: A clean repo with branches, PRs, and a good README.

## **Week 5: SDLC**

Learn: SDLC from idea to production. Plan, build, test, release, monitor. Where DevOps sits in it.
Build: Write the SDLC for CoraxReads. User stories, test plan, release plan, rollback plan.
Push: Your SDLC doc + release checklist.

## **Week 6: Terraform**

Learn: Infrastructure as Code. Provider, resource, state, variables, plan and apply. No cloud yet.
Build: Write Terraform that builds practice infrastructure locally with Docker. You learn the workflow without touching a cloud account.
Push: Your Terraform files + a note on what plan and apply did.

## **Week 7: Ansible**

Learn: Configuration as Code. Inventory, playbook, task, role. How to set up a server the same way every time.
Build: Write an Ansible playbook that sets up a fresh practice server: installs Docker, copies your app, and starts it.
Push: Your playbook + proof it ran on a fresh target.

## **Week 8: Docker**

Learn: Image, container, Dockerfile, volume, network, Compose. Why Docker fixes it works on my machine.
Build: Write a Dockerfile for CoraxReads. Run it with Compose with the app + PostgreSQL database.
Push: Dockerfile, docker-compose.yml, and how to run it.

## **Week 9: AWS Cloud Week**

Learn: Cloud computing in plain words: compute, storage, networking, and IAM. Learn what billing alerts do and why free-tier use can still cost money.
Build: Create ONE AWS account only. Set a billing alert before creating resources. Deploy a small CoraxReads practice page to an approved VM. Other cloud providers are comparison topics only; do not create extra accounts for this course.
Push: Your cloud setup doc + billing alert screenshot + your live app link + cost notes. Stop the server when you are done.

## **Week 10: Kubernetes**

Learn: Pod, Deployment, Service, ConfigMap, Secret, Ingress, scaling. Why teams use Kubernetes.
Build: Deploy CoraxReads to Kubernetes. First on kind locally, then to your AWS practice environment. Add a Service, Ingress, and scaling.
Push: Your Kubernetes manifests + how to check pods, services, and logs.

## **Week 11: Capstone Part 1 - Full Pipeline**

Learn: How the pieces connect. A reviewed change triggers CI, CI tests and builds Docker, and an approved deployment updates the practice environment.
Build: Connect your pipeline end to end. A reviewed merge starts deployment, a health check confirms success, and a documented rollback restores the previous version if needed.
Push: Your pipeline file + a run log that shows it worked.

## **Week 12: Capstone Part 2 - Demo, Docs, Portfolio**

Learn: How to present your work like a professional.
Build: Add monitoring, clean docs, architecture diagram, demo video, and portfolio README. Clean up cloud resources so you do not get charged.
Push: Final capstone repo + demo + portfolio README. This is what you show employers.
