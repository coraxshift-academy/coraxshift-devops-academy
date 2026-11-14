# Curated open-source project references

CoraxReads is the course's shared, beginner-friendly project. These upstream repositories are optional examples and extension ideas—not extra required installations. Their project pages and declared licenses were checked when this list was prepared; upstream projects can change, so learners must re-check the repository, license, release/activity, and instructions before using a version.

Do not copy source into a portfolio, run unknown scripts with administrator privileges, or deploy a project to a cloud account just because it is linked here. Read the license, pin a release or commit for repeatable work, use disposable local environments, and follow the course's cloud cost/cleanup approvals.

| Week | CoraxReads practice | Optional upstream project | Declared license | Learner-safe use |
| --- | --- | --- | --- | --- |
| 1 — Essentials | Draw the browser → service → database path. | [GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github) | MIT | Follow its guided GitHub practice; do not copy its course text into your portfolio. |
| 2 — Linux | Serve the practice page with Nginx and read its logs. | [NGINX](https://github.com/nginx/nginx) | BSD-2-Clause | Use the official package/container in the local lab; change only your own configuration. |
| 3 — Bash | Write a health check and a backup that can be restored. | [ShellCheck](https://github.com/koalaman/shellcheck) | GPL-3.0 | Run the linter on your own scripts and review each finding; it does not make a script safe automatically. |
| 4 — Git | Create a branch, review a change, and practice a conflict. | [GitHub Skills: Introduction to GitHub](https://github.com/skills/introduction-to-github) | MIT | Use the guided exercise in a disposable practice repository. |
| 5 — SDLC | Add a feature issue, test plan, release notes, and rollback steps. | [OpenSSF Scorecard](https://github.com/ossf/scorecard) | Apache-2.0 | Compare public project health signals as discussion prompts; scores are not a guarantee of safety. |
| 6 — Terraform | Describe local Docker resources and review a plan before applying. | [HashiCorp Terraform Guides](https://github.com/hashicorp/terraform-guides) | MPL-2.0 | Read examples and run only a reviewed, local lab; never apply copied cloud configuration. |
| 7 — Ansible | Configure a disposable local or instructor-provided target. | [Ansible for DevOps](https://github.com/geerlingguy/ansible-for-devops) | MIT | Treat it as a reference book; inspect version requirements and playbook targets before running. |
| 8 — Docker | Containerize CoraxReads and keep the database private. | [Docker Awesome Compose](https://github.com/docker/awesome-compose) | CC0-1.0 | Adapt one small Compose pattern after reading its services and port/volume settings. |
| 9 — AWS | Learn IAM, networking, cost controls, and teardown. | [AWS CDK Examples](https://github.com/aws-samples/aws-cdk-examples) | Apache-2.0 | Architecture/code reading only unless the instructor approves cost, identity, and cleanup plans. |
| 10 — Kubernetes | Run CoraxReads on a local Kubernetes cluster. | [Kubernetes Examples](https://github.com/kubernetes/examples) | Apache-2.0 | Begin with one local example; verify image sources, permissions, and resource limits. |
| 11 — CI/CD + observability | Test, release, and observe a change to CoraxReads. | [Prometheus](https://github.com/prometheus/prometheus) | Apache-2.0 | Start with a local metrics demo; do not expose monitoring endpoints publicly. |
| 12 — Capstone | Present and explain the app you built throughout the course. | [CoraxReads teaching app](labs/coraxreads/README.md) | No standalone license stated | This is the private course starter, not a production service or a third-party project. |

These are curated starting points, not endorsements or security guarantees. Third-party projects may have transitive dependencies, changing defaults, or their own data and cost requirements.
