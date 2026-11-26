# Class 7: Names (Route 53)

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Computers find each other by number (an **IP address**), but people remember names. **DNS** (the Domain Name System) is the phone book that turns a name like `www.mamangozi.com` into a number. **Route 53** is AWS's phone book service.

> 📖 **From my café:** Regular customers never asked for "computer at position 7". They asked for "the one near the window". A name is easier to remember than a number, and if I moved the machine, I only had to update the name, not retrain every customer.

Buying a real domain costs real money, and it is **not refundable**, so in this class we practise with a **private** phone book that only exists inside your own network. It teaches the same ideas for almost nothing.

**By the end of this class you can:**

- Explain a **domain**, a **hosted zone**, a **record**, a **record type** and a **TTL**
- Create a **private hosted zone** and a record
- Prove a name resolves inside your network
- Explain how a public domain would be pointed at a load balancer (without paying for one today)
- Delete the zone cleanly

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | A hosted zone is billed about **$0.50 per month**. AWS's pricing page says a zone deleted within 12 hours of creation is not charged for the month, but check the page. The test server is about 1 cent per hour. Today: **about 0 to 50 cents** |
| **If forgotten** | $0.50 a month for the zone, plus about $8 to $10 a month for a forgotten server |
| **Not covered** | **Registering a domain costs about $10 to $15 a year and is not refundable.** Do not buy one for this class |
| **Tear down** | Step 9. Delete the records, then the hosted zone, then the server, then the VPC |

## Prerequisites

- Classes 2 and 3 done and cleaned up

## Step 1: Learn the vocabulary (no clicking)

| Word | Plain meaning |
|---|---|
| **Domain** | The name you own, for example `mamangozi.com` |
| **Hosted zone** | The phone book page for one domain |
| **Record** | One line in the phone book: a name and where it points |
| **A record** | A name that points to an IPv4 address |
| **CNAME record** | A name that points to **another name** |
| **Alias record** | An AWS-only record that points a name at an AWS thing, such as a load balancer. Free to query |
| **NS record** | Says which servers hold the phone book for this domain |
| **TTL** | "Time to live": how many seconds others may remember the answer before asking again |

> 💡 **TTL in a sentence:** a long TTL (a day) is fast and cheap but slow to change. A short TTL (60 seconds) lets you change your mind quickly.

## Step 2: Have a VPC and a test server

**Do it:**

1. Make sure `shop-vpc` exists. If not, rebuild it (Class 3, Steps 2, 3 and 5) with **NAT gateways: None**. In **VPC → Your VPCs** select `shop-vpc` → **Actions → Edit VPC settings** and confirm **Enable DNS resolution** and **Enable DNS hostnames** are both ticked.
2. Launch an instance as in Class 3 Step 6: name `dns-test-1`, `t3.micro`, subnet `shop-subnet-public1-us-east-1a`, public IP enabled, tag `Project = coraxshift-lab`, same user data as Class 3. For the security group choose **Create security group** named `dns-test-sg` in `shop-vpc` with **HTTP 80 from Anywhere** and **SSH 22 from Anywhere** (lab-only, removed in Step 9).
3. When it is running, open its **Details** tab and write down its **Private IPv4 address** (like `10.0.12.34`).

**What you should see:** a running instance with a private address starting `10.0.`.

## Step 3: Create a private hosted zone

**Do it:**

1. Search for **Route 53** → **Hosted zones** → **Create hosted zone**.
2. **Domain name:** `shop.internal`. **Description:** `lab only`.
3. **Type:** **Private hosted zone**.
4. **VPCs to associate:** Region **US East (N. Virginia)**, VPC `shop-vpc`.
5. **Tags:** `Project` = `coraxshift-lab`. Click **Create hosted zone**.

**What it does:** creates a phone book that only machines inside `shop-vpc` can read. Nobody on the internet can see it.

**What you should see:** the zone `shop.internal`, type **Private**, with two records already inside it: **NS** and **SOA**. Leave those two alone.

## Step 4: Add a record

**Do it:** open the zone → **Create record**:

| Setting | Value |
|---|---|
| Record name | `www` |
| Record type | **A** |
| Value | your server's **Private IPv4 address** |
| TTL | `60` |
| Routing policy | **Simple routing** |

Click **Create records**.

**What you should see:** a record `www.shop.internal`, type A, with your private IP.

## Step 5: Prove the name works inside the network

**Do it:** connect to the instance (**EC2 → select it → Connect → EC2 Instance Connect → Connect**) and run:

```bash
getent hosts www.shop.internal
curl -s http://www.shop.internal
```

**What it does:** `getent hosts` asks the system's name lookup for the address. `curl` then fetches the web page using only the name.

**What you should see:**

```text
10.0.12.34      www.shop.internal
<h1>Mama Ngozi's Provisions</h1><p>Inside my own VPC</p>
```

(Your own private IP will differ.)

**If yours looks different:** nothing printed from `getent` means the name did not resolve. Check: the zone is **Private**; `shop-vpc` is in its **VPC** list (hosted zone → **Hosted zone details** → **Edit** → VPCs); DNS resolution and hostnames are on for the VPC; and you typed `www.shop.internal` exactly.

## Step 6: Prove the name is private

**Do it:** open **CloudShell** (which is *outside* your VPC) and run:

```bash
getent hosts www.shop.internal || echo "not found outside the VPC (this is good)"
```

**What you should see:** `not found outside the VPC (this is good)`.

## Step 7: Change your mind

**Do it:** in the zone, click the `www` record → **Edit record** and change the TTL to `300`. Save. Think: if you moved the server to a new address, how long might a customer keep the old answer?

**What you should see:** the record now shows TTL 300.

**What it means:** with TTL 300, visitors may use the old answer for up to 5 minutes after you change it. Lower the TTL **before** a planned move.

## Step 8: Read, do not build: how a public site would work

**Why this matters:** you should understand the real-world steps even though we do not pay for them.

1. You buy a domain, for example `mamangozi.com`, at a registrar (Route 53 or another company).
2. In Route 53 you create a **public hosted zone** for it. AWS gives you **four NS names**.
3. At your registrar you set the domain's name servers to those four names. This is the step people forget.
4. In the zone you create an **alias A record** named `www` that points to your **load balancer** (from Class 6). You do not need an IP address, because an alias follows the load balancer even when its addresses change.
5. Visitors type `www.mamangozi.com`, DNS answers with the load balancer, and the load balancer picks a healthy server.

> 💡 **If you already own a domain** and want to try this, ask your instructor first. A public hosted zone costs about $0.50 a month, the load balancer costs per hour, and some registrars charge to change name servers. This is **optional** and not needed for the assignment.

## Step 9: 🧹 Teardown and check

**Do it, in order:**

1. **Route 53 → Hosted zones** → open `shop.internal` → tick the `www` record → **Delete record**. (You cannot delete the NS and SOA records, and you do not need to.)
2. Go back to **Hosted zones**, select `shop.internal` → **Delete** → type `delete` → confirm.
3. **EC2**: terminate `dns-test-1`. Wait for **Terminated**.
4. Delete security group `dns-test-sg`.
5. Delete the VPC unless you are about to start Class 8 right now.

Then in CloudShell:

```bash
aws route53 list-hosted-zones --query 'HostedZones[].Name' --output text
aws ec2 describe-instances \
  --query 'Reservations[].Instances[?State.Name!=`terminated`].[InstanceId,State.Name]' --output text
```

**What you should see:** nothing printed.

**If yours looks different:** "The hosted zone contains records that are not required" means a record you created is still there. Delete it and retry. A zone you do not recognise is not yours to delete: ask first.

## ✅ Recap

- **DNS** is the internet's phone book. **Route 53** is AWS's version.
- A **hosted zone** is one domain's page. A **record** is one line. **A** points to an IP, **CNAME** to another name, **alias** to an AWS resource.
- **TTL** is how long answers are remembered.
- A **private** zone only works inside your VPC.
- Domain registration costs real money and is not refundable. Do not buy one casually.

## 📤 Push to your portfolio

In `aws/class-7/` add:

1. `notes.md`: *What is DNS? What is a hosted zone? What is TTL? Why is the private zone not visible from CloudShell?*
2. A screenshot of the record and of the `getent` result (private IPs are fine to show)
3. Your own 5-step explanation of how you would point `www.yourdomain.com` at a load balancer

Next up: [Class 8: Watching (CloudWatch)](class-8-watching-cloudwatch.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 6](class-6-load-balancer-and-autoscaling.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 8 ➡️](class-8-watching-cloudwatch.md)</td></tr></table>
