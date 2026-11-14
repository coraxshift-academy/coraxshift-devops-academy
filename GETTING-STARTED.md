# Getting Started: Environment and Software Setup

Read this before Week 1. **Do not install every course tool on day one.** Add software only when a week needs it. This keeps the first steps small and avoids unnecessary downloads, administrator access, and surprise costs.

## Choose where you will work

### Recommended beginner path: browser + Codespaces

Use the repository Codespace for the Ubuntu/Linux lessons. You need a browser, a GitHub account with access to this private course, and an available Codespaces allowance. No local Python, Chocolatey, Docker Desktop, Terraform, or Ansible installation is needed just to begin.

Codespaces quotas and billing depend on the GitHub plan. Check your allowance before starting a long-running Codespace. Keep forwarded ports **Private**. Before Weeks 6, 8, and 10, run `docker version`; if the Docker server is unavailable in your Codespace, use the local Docker/WSL2 path or an instructor-provided lab.

### Optional local path

If you prefer to work on your computer, use the platform's official installer and keep Linux commands inside Ubuntu/WSL—not in Windows PowerShell. On Windows, the course's Linux labs need Ubuntu in WSL2 or a Linux Codespace. You do not need both a local toolchain and a Codespace.

## Week 1: install only the essentials

You need a current browser and access to GitHub. VS Code desktop and local Git are optional if you use the Codespaces editor and its terminal.

### Windows 10/11 PowerShell

WinGet is included with supported Windows versions through App Installer. In PowerShell, check it and install only Git and VS Code if you want them locally:

```powershell
winget --version
winget install --id Git.Git --exact
winget install --id Microsoft.VisualStudioCode --exact
git --version
code --version
```

Close and reopen PowerShell after installation if a command is not found. If WinGet is unavailable, use the official [Git downloads](https://git-scm.com/downloads) and [VS Code installer](https://code.visualstudio.com/download).

**Chocolatey is optional, not a course requirement.** Do not install a second package manager just for this course. Do not paste installation scripts from unverified websites into an administrator terminal.

### Ubuntu 24.04 LTS (local Linux or WSL2)

Run these commands in the Ubuntu terminal, not Windows PowerShell:

```bash
sudo apt update
sudo apt install -y git
git --version
```

VS Code desktop is optional. If Ubuntu has Snap installed, use the [official VS Code Linux instructions](https://code.visualstudio.com/docs/setup/linux); the Snap option is:

```bash
sudo snap install code --classic
code --version
```

For Windows users who choose local Linux labs, install WSL2 only when needed and follow Microsoft's current [WSL installation instructions](https://learn.microsoft.com/windows/wsl/install). It may require virtualization, administrator permission, and a restart. Using Codespaces avoids this local setup.

### macOS (optional local path)

Use the macOS Terminal. If Git is missing, run `xcode-select --install` and follow the Apple prompt to install the command-line tools. Install VS Code from the [official macOS download](https://code.visualstudio.com/download), then verify Git with `git --version`. For the course's Linux labs, use an Ubuntu environment or Codespaces rather than assuming macOS commands are identical.

### Identify your terminal

Run commands in the environment named by the lesson:

| Environment | Check your user and location | List files |
| --- | --- | --- |
| Windows PowerShell | `whoami` | `dir` |
| Ubuntu, WSL2, Linux, or Codespace | `whoami`, then `pwd` | `ls -la` |

`sudo apt ...` commands are for Ubuntu/Linux only. Do not paste them into PowerShell. A Codespace has a Linux terminal even when your personal computer runs Windows.

## Install tools when their week arrives

| Week | Tool and course version target | Install/use it when | Verify |
| --- | --- | --- | --- |
| 1 | Git 2.40 or newer; current stable VS Code if using desktop | Week 1, local path only. Codespaces already provides Git and a browser editor. | `git --version`; `code --version` |
| 2 | Ubuntu 24.04 LTS; Bash 5.x; Nginx from the Ubuntu package repository; Node.js 22.12 or newer and npm | Week 2 uses Nginx in the Linux lab and Node.js/npm to build the React starter in Assignment 2A. Codespaces usually provides Node.js; verify it before the assignment. | `cat /etc/os-release`; `bash --version`; `node --version`; `npm --version`; `nginx -v` |
| 3 | Ubuntu 24.04 LTS; Bash 5.x; Nginx from the Ubuntu package repository | Continue in the Linux lab. Install Nginx inside that disposable lab, not on Windows itself. | `cat /etc/os-release`; `bash --version`; `nginx -v` |
| 4–5 | Git from Week 1; no new software required | Continue in the same portfolio repository. | `git --version` |
| 6 | Terraform 1.17.x; Docker Engine with Compose; Docker provider `kreuzwerker/docker` 3.x | Before the local Terraform lab. The official Terraform installer showed 1.17.2 when this guide was reviewed; confirm the latest patch and record `terraform version`. | `terraform version`; `docker version`; `docker compose version` |
| 7 | Current supported Ansible release on a Linux control node; Python 3 on Linux control/managed nodes | Before the Ansible lab. Windows is not a native Ansible control node; use Ubuntu, WSL2, or a suitable Linux Codespace. Ubuntu 24.04 supplies Python 3 for the lab. | `ansible --version`; `python3 --version` |
| 8 | Node.js 22.x and its bundled npm; PostgreSQL 16.x container image | Reuse the Node.js setup for the CoraxReads backend/tests. The repository requires Node `>=22`, CI tests Node 22, and the Dockerfile uses `node:22-alpine`. PostgreSQL runs in Compose; do not install a separate database server. | `node --version`; `npm --version`; `docker compose version` |
| 9 | AWS Console in a browser; no AWS CLI required by this course assignment | Week 9 only, after instructor approval of the budget and cleanup plan. Do not create an account or resources early for practice. | Confirm account, region, MFA, and budget in the lesson checklist. |
| 10 | Docker; kind v0.33.x; `kubectl` within one Kubernetes minor version of the local cluster | Before the local Kubernetes lab. Match the `kubectl` client to the Kubernetes version used by kind; follow kind's supported node-image instructions. Do not create a paid cluster. | `kind version`; `kubectl version --client`; `kubectl get nodes` |
| 11–12 | Reuse the app, Docker, GitHub Actions, and local monitoring examples | The course uses GitHub-hosted CI and local container-based monitoring; do not install a cloud monitoring service for these lessons. | `npm test`; `docker compose ps`; inspect the workflow run |

Exact patch releases change. The targets above identify the tested or compatible release line, not a reason to upgrade mid-assignment. Version targets were reviewed on **14 November 2026**; check the linked official documentation at the start of each new cohort and record the actual version in your portfolio. Do not silently change the course's Node.js major, PostgreSQL image major, or Terraform provider major.

## Python and Chocolatey are not Week 1 requirements

- **Python:** Learners do not need to install Python for the current 12-week app exercises. Ansible uses Python on Linux nodes, which is provided by the Ubuntu lab. The repository's documentation-check script is for maintainers/CI, not a student assignment.
- **Chocolatey:** Optional Windows package manager only. WinGet or the official installers are sufficient for the optional Week 1 local setup.
- **Node.js:** Verify Node.js 22.12 or newer before Week 2 Assignment 2A, then reuse it in Week 8. The React starter uses npm and does not need a separate system-wide React installation.
- **Docker and Terraform:** Wait until Week 6. Docker is also used in Weeks 8 and 10.
- **Ansible:** Wait until Week 7 and use a Linux control node.
- **AWS:** Do not create an AWS account or resources before Week 9 and instructor approval.

## Tool installation references

- [VS Code downloads and setup](https://code.visualstudio.com/docs/setup/setup-overview)
- [WinGet documentation](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
- [Git downloads](https://git-scm.com/downloads)
- [Node.js downloads and archive](https://nodejs.org/en/download)
- [Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- [Docker Engine installation](https://docs.docker.com/engine/install/)
- [Terraform installation](https://developer.hashicorp.com/terraform/install)
- [Ansible installation and platform support](https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html)
- [kind quick start](https://kind.sigs.k8s.io/docs/user/quick-start/)
- [kubectl installation and version skew policy](https://kubernetes.io/docs/tasks/tools/)

## Before each assignment

1. Read that week's overview and all three class guides before the assignment.
2. Confirm you are in the intended environment and folder (`whoami`, `pwd`, and the tool's version check).
3. Use only the commands for that environment. If expected output differs, stop and use the week's troubleshooting guide.
4. Review the planned change before commands that install software, use `sudo`, create cloud resources, or delete data.
5. Keep credentials and `.env` files out of screenshots and Git.
