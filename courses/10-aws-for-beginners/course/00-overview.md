# Course Overview

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 15 minutes

## 👋 Welcome

Imagine you want to open a shop, but instead of buying a building, you **rent** a stall in a big market. You pay by the hour, you can rent a bigger stall when business is good, and you hand it back when you are done. The market owner looks after the electricity, the roof and the security guards.

**AWS (Amazon Web Services)** is that market, but for computers. Instead of buying servers and keeping them in a back room, you rent them by the hour, over the internet.

| In the market | In AWS |
|---|---|
| The market owner | **AWS** |
| Your stall | A server (**EC2**) |
| The market's fenced area with lanes and doors | Your private network (**VPC** and **subnets**) |
| A lockable storage room | File storage (**S3**) |
| The record book kept safe for you | A database (**RDS**) |
| A host at the gate who sends customers to free stalls | A **load balancer** |
| Opening more stalls on busy days | **Auto Scaling** |
| The signboard with your shop's name | **Route 53** |
| The CCTV and the till counter | **CloudWatch** |
| Your monthly bill | **Billing**, which we watch from day one |

```text
safe account ─▶ server ─▶ network ─▶ storage ─▶ database ─▶ balance + scale ─▶ names ─▶ watching ─▶ CLEAN UP
```

> 💡 **The most important skill in this course is not building. It is switching things off.** Anyone can start a server. A good cloud engineer can say, with proof, that nothing is still running.

## 🎯 What you will be able to do

- Open an AWS account that is safe from day one
- Explain the cloud in plain words
- Launch, reach and remove a server, a network, a bucket and a database
- Spread traffic over several servers that replace themselves when one fails
- Read a graph and set an alarm
- Estimate what a lab costs **before** you start it, and prove it was removed afterwards

## 💰 What does it cost?

These are **rough estimates** for `us-east-1` (N. Virginia) from AWS's public price pages as we know them. Prices change, so always check the price page and the **Billing** page in your own account. Costs assume you tear everything down in the same sitting.

| Class | What costs money | Roughly, if you tear down in 2 to 3 hours |
|---|---|---|
| 1 Account | Nothing | $0 |
| 2 EC2 | A small server and its disk | a few cents |
| 3 VPC | The network is free. A **NAT gateway** is not, so we never create one | a few cents |
| 4 S3 | A few small files | well under 1 cent |
| 5 RDS | A small database and its disk | about 5 to 10 cents |
| 6 Load balancer + Auto Scaling | A load balancer and 2 or 3 small servers | about 15 to 25 cents |
| 7 Route 53 | A hosted zone is billed monthly (about $0.50) | $0 to $0.50 |
| 8 CloudWatch | The first alarms and dashboards are free | $0 |
| 9 Clean-up | Nothing | $0 |

**If you forget to tear down**, roughly: a load balancer is about $16 to $20 a month, a small database about $15 to $25 a month, a NAT gateway about $32 a month plus data, and every public IPv4 address about $3.60 a month. That is why every class ends with a teardown and a check.

> [!IMPORTANT]
> Whether any of this is covered by the AWS free allowance depends on **when your account was created**. Rules changed in 2025. In Class 1 you read your own **Free Tier** page. Never plan around a free allowance you have not seen in your own account.

## 🗺️ How the course works

| Step | What you do | Time |
|---|---|---|
| 🔐 Class 1 | A safe account and billing alarms | 2.5 h |
| 🖥️ Class 2 | Your first server (EC2) | 2.5 h |
| 🌐 Class 3 | Your own network (VPC) | 2.5 h |
| 🗄️ Class 4 | Storage (S3) | 2 h |
| 🧮 Class 5 | A database (RDS) | 2.5 h |
| ⚖️ Class 6 | Load balancer and Auto Scaling | 3 h |
| 🧭 Class 7 | Names (Route 53) | 2 h |
| 👀 Class 8 | Watching (CloudWatch) | 2 h |
| 🧹 Class 9 | Cost control and the final clean-up | 2 h |
| 🧩 Assignment | Launch the shop site, then remove it | 3 h |
| 🎭 Role play, 📝 Quiz | Explain it; 12 questions, 90% earns the badge | 35 min |

Every step follows the same five parts: **Why this matters**, **Do it**, **What it does**, **What you should see**, **If yours looks different**. Every class starts with a **💰 cost and teardown box** and ends with a **🧹 teardown and check**.

> [!NOTE]
> **AWS changes its screens often.** If a button has moved or has a slightly different name, follow the *meaning* of the step. The commands and the ideas stay the same.

## ✅ Before you start

Take **Linux**, **Bash** and **Git and GitHub** first. **Terraform for Beginners** is recommended, because there you learned why describing a setup and cleaning it up matter.

## 🛡️ Ground rules

- Use one region: **us-east-1 (N. Virginia)**. Check the region name in the top-right corner of the console at the start of every class.
- Tag what you create: `Project = coraxshift-lab`.
- Never leave a lab running overnight.
- When something is unclear and costs money, **stop and ask** before you click.

---

<table width="100%"><tr><td align="left">[🏠 Course home](../README.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 1 ➡️](class-1-safe-account-and-billing.md)</td></tr></table>
