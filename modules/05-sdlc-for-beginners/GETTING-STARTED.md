<div align="center">

# 🚀 Getting Started

**Software Delivery Lifecycle for Beginners** · Coraxshift DevOps Academy

</div>

Welcome! This page gets your practice computer ready. The short version: **open a Codespace on this repository and you are ready for Class 1.** Nothing to install on your own computer.

## ✅ What you need

- A modern web browser (Chrome, Edge, Firefox or Safari)
- A free GitHub account that has been **invited to this course repository**
- A GitHub Codespaces allowance (free accounts include monthly hours; check yours under GitHub **Settings → Billing**)
- Basic Git skills from the **Git and GitHub for Beginners** course
- About 2 hours of focus per class

You do **not** need coding experience, a cloud account, a credit card or a powerful laptop.

## 🖥️ Step 1: Open your Codespace

1. Go to this repository on GitHub (**coraxshift-academy/software-delivery-lifecycle-for-beginners**) and sign in.
2. Click the green **Code** button, open the **Codespaces** tab, then click **Create codespace on main**.
3. Wait a minute or two. A VS Code editor opens in your browser with a terminal at the bottom.
4. In the terminal, run `pwd`. You should see `/workspaces/software-delivery-lifecycle-for-beginners`.

> [!TIP]
> Next time, reopen the same Codespace from [github.com/codespaces](https://github.com/codespaces) instead of creating a new one, so your work is still there.

## 🔍 Step 2: Check your tools

Run these in the Codespace terminal:

```bash
git --version
bash --version | head -1
```

You should see a Git version and a Bash version starting with `5`. Codespaces has both. If one is missing, [Troubleshooting](course/troubleshooting.md) shows the fix.

## 🧭 Which terminal am I in?

This course uses the **Linux terminal in your Codespace**. Even if your own computer runs Windows, the Codespace is a Linux computer, so the commands work the same for everyone.

Do **not** paste these commands into Windows PowerShell or Command Prompt. They will not work there.

## 💼 Your portfolio

Use the `my-devops-portfolio` repository you created in the Git course. Your class notes and assignment go in an `sdlc/` folder there. Keep it **Private** until you have checked that it holds nothing personal.

You will **not** put your work in this course repository.

## 🔒 Safety first

- Keep forwarded ports **Private**.
- Keep passwords, tokens and `.env` files out of scripts, screenshots and Git.
- Read a command before you run anything that installs software, uses `sudo` or deletes data.

## ➡️ Ready?

Read the [course overview](course/00-overview.md), then start [Class 1](course/class-1-from-idea-to-plan.md).

If anything goes wrong, open [Troubleshooting](course/troubleshooting.md) first.
