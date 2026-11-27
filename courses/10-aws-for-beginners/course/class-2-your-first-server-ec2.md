# Class 2: Your First Server (EC2)

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2.5 hours

## 👋 Welcome

An **EC2 instance** is a computer you rent by the hour. Today you rent one, put a tiny website on it, look at it in your browser, and then hand it back. Our running example is a notice page for a shop called *Mama Ngozi's Provisions*.

> 📖 **From my café:** In my cybercafe I had 12 or more computers and I walked the floor checking them. A rented server is the same job, except the machine sits in someone else's building and you check it from your screen.

**By the end of this class you can:**

- Launch an EC2 instance and say what each setting means
- Explain a **security group** (the door rules)
- Reach your server in the browser and from a terminal
- Tell **stop** from **terminate**, and know which one stops the charges
- Remove everything and prove it is gone

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | A `t3.micro` server is roughly 1 cent per hour. Its small disk is a few cents per month. The public IPv4 address is roughly half a cent per hour. A 2 hour class costs **a few cents** |
| **If forgotten** | Roughly $8 to $10 a month for the server, disk and address together |
| **Tear down** | Step 11. **Terminate** the instance, then check the instance list and the volume list |
| **Free allowance?** | Maybe. Check your Free Tier page from Class 1. Plan as if it is not |

## Prerequisites

- Class 1 done: admin user with MFA, budgets, region `us-east-1`

## Step 0: Check where you are

**Why this matters:** most "where did my server go?" stories end with the wrong region.

**Do it:** look at the top-right of the console. It must say **N. Virginia**. Open **CloudShell** and run:

```bash
aws sts get-caller-identity --query Arn --output text
echo $AWS_REGION
```

**What you should see:** your user ARN ending in your admin user name, and `us-east-1`.

## Step 1: Start the launch screen

**Why this matters:** this one screen holds every decision. We go through it slowly.

**Do it:** search for **EC2**, open it, and click **Launch instance**.

**What you should see:** a form titled **Launch an instance**.

## Step 2: Name and tag it

**Do it:**

1. **Name:** `shop-web-1`.
2. Click **Add additional tags** → **Add new tag**: Key `Project`, Value `coraxshift-lab`. Resource types: tick **Instances** and **Volumes** if offered.

**What it does:** the name is a label for you. The tag lets you find everything later.

## Step 3: Choose the operating system (AMI)

**Why this matters:** an **AMI** (Amazon Machine Image) is a ready-made starting copy of a computer, like a new laptop that already has Windows installed.

**Do it:** under **Application and OS Images**, choose **Amazon Linux** and keep the default **Amazon Linux 2023 AMI** marked *Free tier eligible* if it shows.

**What you should see:** a selected AMI named *Amazon Linux 2023*, architecture **64-bit (x86)**.

## Step 4: Choose the size (instance type)

**Why this matters:** the type decides how powerful, and how expensive, the computer is. Bigger means more cost per hour.

**Do it:** choose **t3.micro** (or the type your screen marks **Free tier eligible**, such as `t2.micro`).

**What it does:** `t3.micro` has 2 small virtual CPUs and 1 GiB of memory. It is plenty for today.

> ⚠️ **Never pick a big type "just to see".** Larger types cost many times more per hour.

## Step 5: Skip the key pair for now

**Why this matters:** a **key pair** is a file that lets you log in from your own computer. We will log in from the browser instead, so we do not need one today.

**Do it:** under **Key pair (login)** choose **Proceed without a key pair**.

**If yours looks different:** if the console insists on a key pair, choose **Create new key pair**, name it `lab-key`, type **RSA**, format **.pem**, and keep the downloaded file private. Never commit it to Git.

## Step 6: Network settings and the security group

**Why this matters:** a **security group** is a list of doors and who may use them. By default every door is closed. You open only what you need.

**Do it:**

1. Click **Edit** next to **Network settings**.
2. Keep the default VPC and subnet. **Auto-assign public IP:** **Enable**.
3. **Firewall (security groups):** choose **Create security group**. Name: `shop-web-sg`. Description: `lab web server`.
4. Rule 1: **SSH**, TCP **22**, Source type **Anywhere**. (This is a lab-only shortcut so the browser Connect button works. You close it in Step 9.)
5. Click **Add security group rule**. Rule 2: **HTTP**, TCP **80**, Source **Anywhere**.

**What it does:** port 80 is the normal door for websites. Port 22 is the door for remote logins (SSH).

**What you should see:** two inbound rules, SSH and HTTP.

> ⚠️ **SSH open to the whole internet is a shortcut, not a habit.** In real work you restrict it. You will tighten it in Step 9.

## Step 7: Storage and startup script

**Why this matters:** the disk is where the computer keeps its files. The **user data** script runs once when the server first starts, so your website installs itself.

**Do it:**

1. Under **Configure storage** keep **8 GiB gp3**. Do not add more.
2. Open **Advanced details**, scroll to the bottom to **User data**, and paste:

```bash
#!/bin/bash
dnf install -y httpd
echo "<h1>Mama Ngozi's Provisions</h1><p>Server: shop-web-1</p>" > /var/www/html/index.html
systemctl enable --now httpd
```

**What it does:** `dnf` installs software on Amazon Linux. `httpd` is the Apache web server. The `echo` line writes the home page. `systemctl enable --now` starts the server now and after every reboot.

## Step 8: Launch

**Do it:** look at the **Summary** panel on the right. Confirm: 1 instance, type `t3.micro`, and the tags. Click **Launch instance**.

**What you should see:** *Successfully initiated launch of instance*, with an instance ID like `i-0abc123...`. Click it, then wait until **Instance state** says **Running** and **Status check** shows **2/2 checks passed** (about 2 to 3 minutes).

**If yours looks different:** a message about a *vCPU limit* or the account not being verified means the account is still activating, or the type is not allowed. Wait and retry, or see [Troubleshooting](troubleshooting.md).

## Step 9: See your website, then tighten the door

**Do it:**

1. Select the instance and copy its **Public IPv4 address** from the **Details** tab.
2. Open a new browser tab and go to `http://` followed by that address. Type **http**, not https.

**What you should see:** the heading *Mama Ngozi's Provisions*.

**If yours looks different:** the page needs about a minute after "running" for the script to finish. If it never loads, check that the HTTP rule exists, that you typed `http://`, and that the public IP is shown. A **Public IPv4 address** that changed after a stop and start is normal.

Now connect inside the server:

1. Select the instance → **Connect** → **EC2 Instance Connect** tab → **Connect**.
2. In the terminal that opens, run:

```bash
hostname
cat /var/www/html/index.html
systemctl status httpd --no-pager | head -5
```

**What you should see:** a hostname like `ip-172-31-...`, your HTML, and `active (running)`.

Close the browser terminal. Now **close the SSH door**:

1. Instance → **Security** tab → click the security group → **Edit inbound rules**.
2. **Delete** the SSH rule. Click **Save rules**.

**What you should see:** only the HTTP rule remains. The website still works.

## Step 10: Stop versus terminate

**Why this matters:** this is the most expensive misunderstanding for beginners.

| Action | What happens | Charges |
|---|---|---|
| **Stop** | The computer is switched off. The disk is kept | You still pay for the **disk**. The public IP changes when you start again |
| **Terminate** | The computer and its disk are **deleted** | Charges stop |
| **Reboot** | Restarts it | Normal charges |

**Do it:** select the instance → **Instance state** → **Stop instance** → confirm. Wait until **Stopped**. Then **Start instance** again and note that the **public IP changed**. Stop is for a lunch break. Terminate is for going home.

## Step 11: 🧹 Teardown and check

**Do it:**

1. Select `shop-web-1` → **Instance state** → **Terminate (delete) instance** → confirm.
2. Wait until the state says **Terminated**. (It stays visible for about an hour, and that is fine.)
3. Open **EC2 → Volumes**. The list should be empty.
4. Open **EC2 → Security groups**. Delete `shop-web-sg` (you cannot delete the one named `default`).

Then in CloudShell run:

```bash
aws ec2 describe-instances \
  --query 'Reservations[].Instances[?State.Name!=`terminated`].[InstanceId,State.Name]' \
  --output text
aws ec2 describe-volumes --query 'Volumes[].[VolumeId,State]' --output text
aws ec2 describe-addresses --query 'Addresses[].[PublicIp]' --output text
```

**What you should see:** all three commands print **nothing**. Empty output is the goal.

**If yours looks different:** an instance still listed as `running` or `stopped` is still costing you. Terminate it. A volume still listed? Select it in **EC2 → Volumes**, then **Actions → Delete volume**. A security group that will not delete is still attached to something. Find and remove that first.

## ✅ Recap

- An **EC2 instance** is a rented computer. Its **type** sets power and price.
- A **security group** is a list of open doors. Open only what you need.
- **User data** runs once at first start.
- **Stop** keeps the disk (and its cost). **Terminate** deletes everything.
- A class is not finished until the **check commands print nothing**.

## 📤 Push to your portfolio

In `aws/class-2/` add:

1. `notes.md` answering: *What is an AMI? What is a security group? What is the difference between stop and terminate?*
2. Your user data script as `user-data.sh`
3. A screenshot of your website in the browser, with the IP address cropped, and a screenshot of the three empty check commands

Next up: [Class 3: Your own network](class-3-your-own-network-vpc.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-safe-account-and-billing.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-your-own-network-vpc.md)</td></tr></table>
