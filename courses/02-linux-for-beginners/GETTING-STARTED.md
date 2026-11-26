<div align="center">

# 🚀 Getting Started

**Linux for Beginners** · Coraxshift DevOps Academy

</div>

Welcome! This page gets your practice computer ready. The short version: **open a Codespace on this repository and you are ready for Class 1.** Nothing to install on your own computer.

## ✅ What you need

- A modern web browser (Chrome, Edge, Firefox or Safari)
- A free GitHub account that has been **invited to this course repository**
- A GitHub Codespaces allowance (free accounts include monthly hours; check yours under GitHub **Settings → Billing**)
- About 2 hours of focus per class

You do **not** need Linux or coding experience, a cloud account, a credit card or a powerful laptop.

## 🖥️ Step 1: Open your Codespace

1. Go to this repository on GitHub (**coraxshift-academy/coraxshift-devops-academy**) and sign in.
2. Click the green **Code** button, open the **Codespaces** tab, then click **Create codespace on main**.
3. Wait a minute or two. A VS Code editor opens in your browser with a terminal at the bottom.
4. In the terminal, run `pwd`. You should see `/workspaces/coraxshift-devops-academy`.

> [!TIP]
> Next time, reopen the same Codespace from [github.com/codespaces](https://github.com/codespaces) instead of creating a new one, so your work is still there.

## 🔍 Step 2: Check your tools

Run these in the Codespace terminal:

```bash
cat /etc/os-release
bash --version
git --version
node --version
npm --version
```

You should see Ubuntu 24.04, Bash 5.x and Git. **Node.js 20.4 or newer** is needed for Assignment B only (Uptime Kuma). Codespaces usually provides it. If yours is older or missing, [Troubleshooting](course/troubleshooting.md) shows the fix.

> [!WARNING]
> Do not install Ubuntu's `nodejs` apt package. It is Node.js 18, which is too old for Uptime Kuma.

## 🧭 Which terminal am I in?

| Environment | Check your user and location | List files |
| --- | --- | --- |
| Codespace, Ubuntu, WSL2 or Linux | `whoami`, then `pwd` | `ls -la` |
| Windows PowerShell | `whoami` | `dir` |

`sudo apt ...` commands are for the Linux terminal only. Never paste them into PowerShell. A Codespace has a Linux terminal even when your own computer runs Windows.

## 🔒 Safety first

- Keep forwarded ports **Private**.
- Keep credentials and `.env` files out of screenshots and Git.
- Review the command before you run anything that installs software, uses `sudo` or deletes data.

## ➡️ Ready?

Read the [course overview](course/00-overview.md), then start [Class 1](course/class-1-linux-intro.md).

If anything goes wrong, open [Troubleshooting](course/troubleshooting.md) first.
