

# **CoraxShift Curriculum - 12 Weeks, One Real Project**

Project: CoraxShift Tasks. A task manager app. You build it in Week 1 and ship it in Week 12.

## **Week 1: Essentials - Internet, Networking and Tools Basics**

Learn: What happens when you type a website. DNS, IP, Port, HTTP, TCP, what a server does.
Build: Set up your workstation. Install Git, VS Code, Docker Desktop, Terraform, Ansible, kubectl. Draw how a request travels from browser to server.
Push: Your diagram + tool check list + project idea doc for CoraxShift Tasks.

## **Week 2: Linux for DevOps**

Learn: Files, permissions, users, processes, logs, basic networking commands. How to read a log and find the problem.
Build: Run CoraxShift Tasks on Linux. Manage it with commands. Check logs. Fix a broken permission.
Push: Screenshots of your commands + a short log troubleshooting note.

## **Week 3: Bash for DevOps**

Learn: Bash in plain words. Variables, if, loops, functions. How to automate boring work.
Build: 3 real scripts for your project - setup.sh installs what you need, backup.sh backs up your app, healthcheck.sh checks if your app is alive.
Push: Your 3 scripts + how to run them.

## **Week 4: Git and GitHub**

Learn: Git workflow a real team uses. Branch, commit, merge, pull request, review, conflict.
Build: Put CoraxShift Tasks in Git properly. Create a dev branch, open a PR, fix a real merge conflict, write a clean commit history.
Push: A clean repo with branches, PRs, and a good README.

## **Week 5: SDLC**

Learn: SDLC from idea to production. Plan, build, test, release, monitor. Where DevOps sits in it.
Build: Write the SDLC for CoraxShift Tasks. User stories, test plan, release plan, rollback plan.
Push: Your SDLC doc + release checklist.

## **Week 6: Terraform**

Learn: Infrastructure as Code. Provider, resource, state, variables, plan and apply. No cloud yet.
Build: Write Terraform that builds your infra locally with Docker. You learn the workflow without touching your free tier.
Push: Your Terraform files + a note on what plan and apply did.

## **Week 7: Ansible**

Learn: Configuration as Code. Inventory, playbook, task, role. How to set up a server the same way every time.
Build: Write an Ansible playbook that sets up a fresh server: installs Docker, copies your app, starts it.
Push: Your playbook + proof it ran on a fresh target.

## **Week 8: Docker**

Learn: Image, container, Dockerfile, volume, network, Compose. Why Docker fixes it works on my machine.
Build: Write a Dockerfile for CoraxShift Tasks. Run it with Compose with app + database.
Push: Dockerfile, docker-compose.yml, and how to run it.

## **Week 9: AWS / Azure / GCP - Cloud Week**

Learn: The 3 clouds in plain words. Compute, storage, network, IAM. How they are similar and how they differ. Free tier rules.
Build: Create ONE cloud account only. Pick AWS for the capstone. Set a billing alert. Create a VM, deploy your Docker app to it. Compare the same service in Azure and GCP in a table, without creating 3 accounts.
Push: Your cloud setup doc + billing alert screenshot + your live app link + cost notes. Stop the server when you are done.

## **Week 10: Kubernetes**

Learn: Pod, Deployment, Service, ConfigMap, Secret, Ingress, scaling. Why teams use Kubernetes.
Build: Deploy CoraxShift Tasks to Kubernetes. First on kind locally, then on your cloud. Add a Service, Ingress, and scaling.
Push: Your Kubernetes manifests + how to check pods, services, and logs.

## **Week 11: Capstone Part 1 - Full Pipeline**

Learn: How it all connects. Git push triggers CI, CI builds Docker, Terraform builds infra, Ansible configures, Kubernetes deploys.
Build: Connect your pipeline end to end. One push should deploy your app.
Push: Your pipeline file + a run log that shows it worked.

## **Week 12: Capstone Part 2 - Demo, Docs, Portfolio**

Learn: How to present your work like a professional.
Build: Add monitoring, clean docs, architecture diagram, demo video, and portfolio README. Clean up cloud resources so you do not get charged.
Push: Final capstone repo + demo + portfolio README. This is what you show employers.
