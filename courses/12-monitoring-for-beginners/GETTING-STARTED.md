<div align="center">

# 🚀 Getting Started

**Monitoring and Observability for Beginners** · Coraxshift DevOps Academy

</div>

Welcome! This page gets your practice computer ready. The short version: **open a Codespace on this repository and you are ready for Class 1.** Nothing to install on your own computer.

## ✅ What you need

- A modern web browser (Chrome, Edge, Firefox or Safari)
- A free GitHub account that has been **invited to this course repository**
- A GitHub Codespaces allowance (free accounts include monthly hours; check yours under GitHub **Settings → Billing**)
- Skills from the **Linux**, **Bash**, **Git and GitHub** and **Docker for Beginners** courses
- About 2 hours of focus per class

You do **not** need coding experience, a cloud account or a credit card.

> [!IMPORTANT]
> This lab runs several containers at once. A **4-core** Codespace is more comfortable than a 2-core one. When you create the Codespace, click the **⋯** next to **Create codespace on main**, choose **Configure and create codespace**, and pick the 4-core machine if your allowance allows it. If things feel slow, [Troubleshooting](course/troubleshooting.md) shows how to run fewer containers.

## 🖥️ Step 1: Open your Codespace

1. Go to this repository on GitHub (**coraxshift-academy/coraxshift-devops-academy**) and sign in.
2. Click the green **Code** button, open the **Codespaces** tab, then click **Create codespace on main**.
3. Wait a minute or two. A VS Code editor opens in your browser with a terminal at the bottom.
4. In the terminal, run `pwd`. You should see `/workspaces/monitoring-for-beginners`.

> [!TIP]
> Next time, reopen the same Codespace from [github.com/codespaces](https://github.com/codespaces) so your work is still there.

## 🔍 Step 2: Check your tools

```bash
git --version
docker --version
docker compose version
curl --version | head -1
```

You should see a version for each. If Docker is missing, [Troubleshooting](course/troubleshooting.md) shows the fix.

## 🧭 Which terminal am I in?

This course uses the **Linux terminal in your Codespace**. Do **not** paste these commands into Windows PowerShell or Command Prompt.

## 🌐 How you will see the web pages

The lab starts websites inside your Codespace (Prometheus, Grafana and others). Open the **Ports** tab at the bottom of VS Code, find the port (for example `9090`), and click the 🌐 globe icon next to it. Keep every port **Private**.

## 💼 Your portfolio

Use the `my-devops-portfolio` repository you created in the Git course. Your class notes and assignment go in a `monitoring/` folder there. Keep it **Private** until you have checked that it holds nothing personal.

## 🔒 Safety first

- Keep forwarded ports **Private**.
- Keep passwords, tokens and `.env` files out of scripts, screenshots and Git.
- Read a command before you run anything that deletes data.

## ➡️ Ready?

Read the [course overview](course/00-overview.md), then start [Class 1](course/class-1-metrics-and-prometheus.md).

If anything goes wrong, open [Troubleshooting](course/troubleshooting.md) first.
