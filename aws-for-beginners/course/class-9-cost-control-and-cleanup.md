# Class 9: Cost Control and the Final Clean-up

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

You have built servers, networks, storage, a database, a load balancer, a phone book and alarms. This class is about the skill that separates a careful engineer from an expensive one: **knowing what you are paying for, and proving you stopped it.**

> 📖 **From my café:** At the end of every day I walked the floor, switched off what was not needed, and counted the till. The cloud needs the same closing routine. Nobody is walking past a forgotten database at night. Only the bill does.

**By the end of this class you can:**

- Read the Billing pages and **Cost Explorer** to see what you spent and on what
- Name the **top ten surprise costs** for beginners
- Run a **tag-based sweep** and a **service-by-service sweep** to find leftovers
- Use the read-only `aws-cleanup-check.sh` script
- Write your own closing checklist

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | $0. Everything today is reading and checking |
| **Tear down** | This class **is** the teardown. If anything is found, remove it |

## Prerequisites

- Classes 1 to 8 done

## Step 1: See what you really spent

**Why this matters:** a number you have seen is worth more than a rule you have read.

**Do it:**

1. **Billing and Cost Management → Bills.** Choose the current month. Open **Charges by service**.
2. Open **Cost Explorer** (you may need to turn it on, and data can take up to a day to appear). Set **Group by: Service**.
3. Open **Budgets** and read your two budgets. Open **Free Tier** and note how much allowance or credit is left.

**What you should see:** a short list of services with small amounts. If a line is bigger than you expected, click it and ask: *what did I leave running?*

**If yours looks different:** a brand-new account may show nothing yet. Check again tomorrow. Billing data lags by many hours.

## Step 2: The ten surprise costs

| # | Surprise | Why it surprises people | The fix |
|---|---|---|---|
| 1 | **Load balancer left on** | Charged every hour, even with no visitors | Delete it first in your teardown |
| 2 | **RDS database left on** | Charged every hour, even idle. A *stopped* one restarts after 7 days | Delete labs, do not park them |
| 3 | **NAT gateway** | About $32 a month plus data, created by a wizard default | Choose **None** in the VPC wizard |
| 4 | **Public IPv4 addresses** | Every public IPv4 address is billed hourly, used or not | Release unused **Elastic IPs**, keep few public addresses |
| 5 | **Stopped servers** | The disk is still billed | **Terminate**, do not stop, when you are done |
| 6 | **Orphan disks and snapshots** | They outlive the server and keep billing | Check **Volumes** and **Snapshots** |
| 7 | **S3 versions** | Old versions are hidden but billed | Lifecycle rule, and use **Empty** before delete |
| 8 | **Another region** | You cannot see resources in a region you are not looking at | Always use `us-east-1` |
| 9 | **Logs kept forever** | Log storage grows quietly | Set **retention** |
| 10 | **A leaked key** | Someone mines crypto on your account | MFA, no root keys, never commit keys, alerts on |

## Step 3: Sweep by tag

**Why this matters:** you tagged everything with `Project = coraxshift-lab`. One command lists all tagged things at once.

**Do it:** in CloudShell:

```bash
aws resourcegroupstaggingapi get-resources --region us-east-1 \
  --tag-filters Key=Project,Values=coraxshift-lab \
  --query 'ResourceTagMappingList[].ResourceARN' --output text | tr '\t' '\n'
```

**What it does:** asks AWS for every resource carrying that tag in this region.

**What you should see:** ideally **nothing**. A resource you deleted can linger in this list for a short while, so if you see only terminated instances or things you have just deleted, wait a few minutes and run it again.

**If yours looks different:** each line is an **ARN**, a long ID naming one resource. Look at the part after the last colon to see what it is, such as `instance/i-0abc`, then find it in the console and remove it.

> ⚠️ **The tag sweep only finds what you tagged.** That is why we also sweep by service.

## Step 4: Sweep by service with the check script

**Do it:** if you have the course repository in CloudShell, or if you paste the script from the course's `scripts/` folder, run it. To get the script into CloudShell: click **Actions → Upload file** in CloudShell and choose `aws-cleanup-check.sh` from your computer. Then:

```bash
less aws-cleanup-check.sh
bash aws-cleanup-check.sh
```

**What it does:** `less` lets you **read the script first** (press **q** to leave). Reading before running is a habit. The script only **lists** things. It deletes and changes nothing. It checks servers, disks, snapshots, Elastic IPs, NAT gateways, load balancers, target groups, Auto Scaling groups, launch templates, databases, snapshots, buckets, hosted zones, alarms, dashboards, topics, extra VPCs and tagged resources.

**What you should see:** a line for each area: `OK` or `LEFTOVER`, and a final `RESULT:` line.

**If yours looks different:** `CHECK FAILED` means that one check could not run (for example, a permission problem). That is **not** a clean result. Read the line. `LEFTOVER` with a bucket you do not recognise is not yours to delete, ask first. If you deliberately kept the billing alarm and its topic (Class 8), they will show up, and that is fine.

## Step 5: Other regions

**Why this matters:** the script checks one region. A mistake in another region would hide there.

**Do it:** in the console, click the region name and open **Billing → Bills → Charges by service → expand a service**. The bill is broken down **by region**. Look for any region other than N. Virginia with a charge.

**What you should see:** only `US East (N. Virginia)` (and a line called *Global* for S3 or Route 53).

**If yours looks different:** a charge in another region means something was created there. Switch to that region in the console, find it, delete it, and write down how it happened.

## Step 6: Look at who is using your account

**Do it:** **IAM → Users**. You should see only your admin user. **IAM → Users → your admin user → Security credentials**. Look at **Access keys**.

**What you should see:** no access keys at all. You used CloudShell, which needs none. Root should also have none (Account menu → **Security credentials**).

**What it means:** access keys are passwords that never ask for MFA. A key leaked in a public repository is found by bots within minutes. If you have any you do not need, **Deactivate**, then **Delete** them.

## Step 7: Write your closing routine

**Do it:** create `aws-closing-checklist.md` in your portfolio and fill in your own version of:

```text
Before I stop for the day:
[ ] Region is us-east-1
[ ] Run: bash aws-cleanup-check.sh   -> RESULT says nothing found
[ ] Billing page: nothing unexpected under Charges by service
[ ] Budgets: no alert emails I have not read
[ ] Nothing I created is left that I do not understand
```

**What it does:** turns a one-off class into a daily habit.

## Step 8: 🧹 Final teardown and check

**Do it:** apply the checklist. Remove everything it finds that is yours. Run the script until the `RESULT` line says nothing found. Keep: your admin user with MFA, your budgets, and (optionally) the billing alarm and its SNS topic.

**What you should see:** `RESULT: nothing found in the areas checked.` (or only the items you knowingly kept).

> 🕐 **Tomorrow's check:** open Billing again the next day. Charges appear with a delay. A leftover you missed today will show tomorrow.

## ✅ Recap

- **Billing** and **Cost Explorer** show what you spent and on what.
- The expensive surprises are **load balancers, databases, NAT gateways, public IPs, forgotten disks and other regions**.
- Sweep **by tag** and **by service**. Neither alone is enough.
- A budget alerts you. **You** stop the spending.
- Reading a script before you run it is a habit worth keeping.

## 📤 Push to your portfolio

In `aws/class-9/` add:

1. `aws-closing-checklist.md`, in your own words
2. A screenshot of the script's final `RESULT` line and of **Charges by service** (account number cropped)
3. `notes.md`: *What are three costs that surprised you? How would you explain them to a friend starting out?*

Next up: [Assignment: Launch the shop site](assignment-launch-the-shop-site.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 8](class-8-watching-cloudwatch.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-launch-the-shop-site.md)</td></tr></table>
