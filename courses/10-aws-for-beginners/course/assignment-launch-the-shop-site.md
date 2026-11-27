# Assignment: Launch the Shop Site, Then Remove It

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 3 hours

## 🎯 The brief

*Mama Ngozi's Provisions* wants a small website that does not go down when one server fails. You will build it from the pieces you have practised, show that it works, write down what it costs, and then **remove everything and prove it**.

This is a **portfolio piece**. A hiring manager should be able to read your folder and understand what you built, why, and what it cost.

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | About the same as Class 6 plus a little: roughly **20 to 40 cents** if you finish in 3 hours |
| **If forgotten** | $40 to $60 a month |
| **Tear down** | Part 6 below. Set a timer for 3 hours when you begin |

## What to build

Use **us-east-1** and tag everything `Project = coraxshift-lab`.

**Part 1: Safety first (5 minutes).** Confirm you are signed in as your admin user (not root), with MFA, and that both budgets exist. Take a screenshot with the account number cropped.

**Part 2: The network.** Build `shop-vpc` with `10.0.0.0/16`, two public and two private subnets across two zones, **NAT gateways: None**.

**Part 3: The site.** Create a security group pair (`alb-sg` and `asg-web-sg`), a launch template, a target group, an Application Load Balancer and an Auto Scaling group with **minimum 1, desired 2, maximum 3**. Change the page so it shows **your own shop or project name** and the **instance ID**.

**Part 4: Storage and alarm.**

- Create a **private**, **versioned** S3 bucket. Upload an image or text file for the shop. Share it once with a **presigned link** that lasts 5 minutes.
- Create an SNS topic, confirm your email, and create a **CPU alarm** for one of your servers. Test it with `set-alarm-state` and keep the alert email.

**Part 5: Prove it works.**

1. Show the load balancer address answering with **two different instance IDs**.
2. Terminate one server and show the Auto Scaling **Activity** tab replacing it.

**Part 6: Remove it and prove it.** Follow Class 6 and Class 8 teardown orders. Empty and delete the bucket. Run `bash aws-cleanup-check.sh` until it says nothing found.

> 🎯 **Not included on purpose:** the database and Route 53. You practised those separately. You may add them for extra credit, but do not let them push you past 3 hours.

## 📦 What to push

In your portfolio, create `aws/assignment/` with:

| File | What it holds |
|---|---|
| `README.md` | What you built, in plain words, for a shop owner. Then a short technical section |
| `diagram.png` or `diagram.md` | A diagram: internet, load balancer, two servers, two zones, bucket, alarm |
| `user-data.sh` | Your startup script |
| `cost-report.md` | **Estimated** cost before you started, and the **actual** cost from Billing the next day. Explain any difference |
| `cleanup-proof.md` | The final output of `aws-cleanup-check.sh`, pasted as text |
| `screenshots/` | Two instance IDs, the Activity tab, the alert email, the empty cleanup result. **Crop the account number and email** |
| `lessons.md` | Three things that went wrong or surprised you, and what you did |

> 🔒 **Check before you commit:** no account numbers, no emails, no presigned links, no keys, no passwords. Search your folder for `AKIA`, `@`, and `amazonaws.com/` before you push.

## ✅ How it is marked

| | Check |
|---|---|
| 🔐 | Admin user with MFA, budgets exist, nothing done as root |
| 🌐 | VPC with public and private subnets, **no NAT gateway** |
| ⚖️ | Load balancer shows two different servers, and a terminated one is replaced |
| 🗄️ | Bucket is private and versioned, and you used a presigned link (not a public bucket) |
| 👀 | Alarm tested and the email received |
| 💰 | Cost estimate **before**, actual **after**, and an honest explanation |
| 🧹 | `cleanup-proof.md` shows nothing left |
| 🗣️ | README understood by a non-technical reader |

## 🧯 If you get stuck

Open [Troubleshooting](troubleshooting.md). If something is costing money and you cannot find it, **stop, run the check script, and send the output to your instructor**. Do not guess.

---

<table width="100%"><tr><td align="left">[⬅️ Class 9](class-9-cost-control-and-cleanup.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-the-cloud.md)</td></tr></table>
