# Class 5: A Database (RDS)

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2.5 hours

## 👋 Welcome

A **database** is the shop's record book: customers, orders, stock. **RDS** (Relational Database Service) is a record book that AWS looks after for you: it installs the software, does the updates and can take backups. You only decide who may open it.

> 📖 **From my café:** In the cafe, the tickets and session records were the most valuable thing I had. If the record book was lost, I could not tell who owed what. That is why a database sits in the back room, locked, and only trusted machines get a key.

Today the key idea is **who can reach the database**. The answer is: **only your own web server, nobody else.**

**By the end of this class you can:**

- Build the network the database lives in (a **DB subnet group** over private subnets)
- Create a small MySQL database that has **no public address**
- Allow **only your web server** to reach it, using a security group rule
- Connect, create a table, add and read a row
- Delete the database without leaving a snapshot bill behind

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | A small `db.t3.micro` database is about 2 cents per hour (roughly 1.7 cents for the database plus its disk). A 2 to 3 hour class is **about 5 to 10 cents**. The test web server is about 1 cent per hour |
| **If forgotten** | Roughly **$15 to $25 a month**. A *stopped* RDS database is **started again automatically after 7 days**, so stopping it is not a safe way to park it |
| **Tear down** | Step 11. Delete the database **without** a final snapshot, then check for snapshots, then delete the VPC |
| **Free allowance?** | Maybe. Check your Free Tier page. Plan as if it is not |

> 🕐 **Time it.** Do this class in one sitting. Creating the database takes 5 to 10 minutes, and the teardown a few more.

## Prerequisites

- Classes 2 and 3 done. If you deleted your VPC at the end of Class 3, rebuild it first (Step 1)

## Step 1: Have the VPC ready

**Do it:** open **VPC → Your VPCs**. If `shop-vpc` is there, go to Step 2. If not, repeat Class 3, Steps 2, 3 and 5 (name `shop`, `10.0.0.0/16`, 2 AZs, 2 public, 2 private, **NAT gateways: None**, **VPC endpoints: None**, enable public IP on the public subnets).

**What you should see:** `shop-vpc` with four subnets.

## Step 2: Create two security groups

**Why this matters:** you will use **one security group as the key to another**. The database door will accept connections only from machines that wear the *app* badge.

**Do it:** open **EC2 → Security groups → Create security group** twice.

First group:

| Setting | Value |
|---|---|
| Name | `app-sg` |
| Description | `web server` |
| VPC | `shop-vpc` |
| Inbound rule 1 | HTTP, port 80, Source **Anywhere-IPv4** |
| Inbound rule 2 | SSH, port 22, Source **Anywhere-IPv4** (lab-only, removed in Step 11) |
| Tag | `Project` = `coraxshift-lab` |

Second group:

| Setting | Value |
|---|---|
| Name | `db-sg` |
| Description | `database` |
| VPC | `shop-vpc` |
| Inbound rule | Type **MYSQL/Aurora** (port 3306), Source: choose **Custom**, then click the box and **select `app-sg`** from the list |
| Tag | `Project` = `coraxshift-lab` |

**What you should see:** `db-sg` has one inbound rule whose Source shows `sg-...` (the ID of `app-sg`), **not** `0.0.0.0/0`.

> 🔒 **That one line is the whole security design.** A database open to `0.0.0.0/0` is how data gets stolen.

## Step 3: Create the DB subnet group

**Why this matters:** RDS needs to know which subnets it may use. It wants at least **two Availability Zones**.

**Do it:**

1. Search for **RDS** and open it. In the left menu choose **Subnet groups** → **Create DB subnet group**.
2. **Name:** `shop-db-subnets`. **Description:** `private subnets`. **VPC:** `shop-vpc`.
3. **Availability Zones:** tick **us-east-1a** and **us-east-1b**.
4. **Subnets:** choose the two **private** subnets (the ones whose names contain `private`). Check their CIDRs: the private ones start with `10.0.128` and above.
5. Click **Create**.

**What you should see:** the subnet group with status **Complete** and two subnets.

**If yours looks different:** if you cannot find the private subnets, go to **VPC → Subnets** and note their IDs and zones, then return.

## Step 4: Create the database

**Do it:** in RDS choose **Databases → Create database**, then set:

| Setting | Value |
|---|---|
| Creation method | **Standard create** |
| Engine | **MySQL** |
| Templates | **Free tier** if offered, otherwise **Dev/Test** |
| Availability and durability | **Single-AZ DB instance** (or "Single DB instance") |
| DB instance identifier | `shop-db` |
| Master username | `admin` |
| Credentials management | **Self managed**, then enter a strong password and write it down in your password manager |
| Instance configuration | **db.t3.micro** (or the smallest burstable `db.t4g.micro`) |
| Storage type and size | **General Purpose SSD (gp3)**, **20 GiB** |
| Storage autoscaling | **Untick** Enable storage autoscaling |
| Compute resource | **Don't connect to an EC2 compute resource** |
| VPC | `shop-vpc` |
| DB subnet group | `shop-db-subnets` |
| **Public access** | **No** |
| VPC security group | **Choose existing**, remove `default`, choose `db-sg` |
| Availability Zone | No preference |
| Monitoring | **Untick** Enhanced Monitoring and Performance Insights if shown (they can cost extra) |
| Additional configuration → Initial database name | `shopdb` |
| Backup retention | **1 day** |
| Deletion protection | **Untick** (so you can delete it in the teardown) |
| Tags | `Project` = `coraxshift-lab` |

Look at the **Estimated monthly costs** box on the page and read it. Then click **Create database**.

**What it does:** AWS builds a MySQL server inside your private subnets, with no public address, reachable only from machines wearing `app-sg`.

**What you should see:** the database listed with status **Creating**. It becomes **Available** in about 5 to 10 minutes. While you wait, do Step 5.

**If yours looks different:** the instance sizes shown depend on the engine and template. Choose the **smallest** burstable one. If the **Free tier** template hides options, that is fine.

## Step 5: Launch the web server that will talk to it

**Do it:** **EC2 → Launch instance**, with:

- **Name:** `shop-app-1`, tag `Project` = `coraxshift-lab`
- **AMI:** Amazon Linux 2023. **Type:** `t3.micro`. **No key pair**
- **Network:** VPC `shop-vpc`, subnet `shop-subnet-public1-us-east-1a`, **Auto-assign public IP: Enable**
- **Security group:** **Select existing** → `app-sg`
- No user data needed

Launch it and wait for **2/2 checks passed**.

**What you should see:** a running instance in the public subnet.

## Step 6: Wait for the database, and find its address

**Do it:** go back to RDS → **Databases** → click `shop-db`. Wait for **Available**. In the **Connectivity & security** tab, find:

- **Endpoint:** a name like `shop-db.xxxxxxxx.us-east-1.rds.amazonaws.com`
- **Port:** `3306`
- **Publicly accessible:** **No**

**What you should see:** the endpoint, and *Publicly accessible: No*.

## Step 7: Prove the database is hidden from the world

**Why this matters:** a security claim needs a test.

**Do it:** open **CloudShell** and run, replacing `ENDPOINT` with your endpoint:

```bash
timeout 8 bash -c 'echo > /dev/tcp/ENDPOINT/3306' && echo "REACHABLE" || echo "NOT reachable (this is good)"
```

**What it does:** tries to open a connection to the database from CloudShell, which lives outside your VPC.

**What you should see:** `NOT reachable (this is good)`.

**If yours looks different:** `REACHABLE` means your database is exposed. Stop. Check **Public access** and the `db-sg` rule, and tell your instructor. Do not continue until it is fixed.

## Step 8: Connect from your web server

**Do it:**

1. **EC2** → select `shop-app-1` → **Connect** → **EC2 Instance Connect** → **Connect**.
2. In the terminal that opens, install the MySQL client:

```bash
sudo dnf install -y mariadb105
mysql --version
```

3. Connect (replace `ENDPOINT`). It asks for your password and **does not show it as you type**:

```bash
mysql -h ENDPOINT -u admin -p shopdb
```

**What you should see:** a prompt like `MySQL [shopdb]>`.

**If yours looks different:** `ERROR 2002/2003 Can't connect` or a hang usually means a security group problem: check that the instance wears `app-sg` and that `db-sg` allows port 3306 **from `app-sg`**. `Access denied` means the password is wrong. If `dnf` finds no `mariadb105`, run `dnf search mariadb` and install the client package it lists.

## Step 9: Use the record book

**Do it:** at the `MySQL [shopdb]>` prompt:

```sql
CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), town VARCHAR(50));
INSERT INTO customers (name, town) VALUES ('Mama Ngozi', 'Lagos');
SELECT * FROM customers;
EXIT;
```

**What it does:** creates a table (a sheet in the record book), adds a row, reads it back.

**What you should see:**

```text
+----+------------+-------+
| id | name       | town  |
+----+------------+-------+
|  1 | Mama Ngozi | Lagos |
+----+------------+-------+
```

**If yours looks different:** a typo in the SQL gives `ERROR 1064`. Check the quotes and the semicolon.

## Step 10: Look at backups (do not change anything)

**Do it:** in RDS → `shop-db` → **Maintenance & backups** tab. Read: backup retention (1 day), backup window, and note whether any snapshots exist.

**What it means:** RDS takes automatic backups. Snapshots **you** take, and final snapshots, **stay and cost money until you delete them**, even after the database is gone.

## Step 11: 🧹 Teardown and check

**Do it, in this order:**

1. Close the Instance Connect terminal. **EC2** → terminate `shop-app-1` and wait for **Terminated**.
2. **RDS → Databases** → select `shop-db` → **Actions** → **Delete**.
3. **Untick** *Create final snapshot*. **Untick** *Retain automated backups*. **Tick** the acknowledgement box. Type `delete me` and confirm.
4. Wait for the database to disappear from the list (a few minutes).
5. **RDS → Subnet groups:** delete `shop-db-subnets`.
6. **EC2 → Security groups:** delete `db-sg` first, then `app-sg`.
7. Delete the VPC (**VPC → Actions → Delete VPC**) unless you will do Class 6 right now.

Then in CloudShell:

```bash
aws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,DBInstanceStatus]' --output text
aws rds describe-db-snapshots --query 'DBSnapshots[].[DBSnapshotIdentifier,SnapshotType]' --output text
aws rds describe-db-subnet-groups --query 'DBSubnetGroups[].DBSubnetGroupName' --output text
aws ec2 describe-instances \
  --query 'Reservations[].Instances[?State.Name!=`terminated`].[InstanceId,State.Name]' --output text
```

**What you should see:** nothing printed. (A `default` subnet group may appear in the third command if AWS made one earlier. That is free and is not yours.)

**If yours looks different:** a snapshot listed means a charge. In RDS → **Snapshots**, select it and **Actions → Delete snapshot**. A database in `deleting` is fine, check again in a few minutes. If the subnet group will not delete, the database is not fully gone yet.

## ✅ Recap

- **RDS** is a managed database. You choose the engine, size and who can reach it.
- Put it in **private subnets**, with **Public access: No**.
- Allow it only from your **web server's security group**, not from the whole internet.
- A stopped database **restarts after 7 days**, so delete labs rather than park them.
- Snapshots survive deletion and cost money. Delete the ones you do not need.

## 📤 Push to your portfolio

In `aws/class-5/` add:

1. `notes.md`: *Why is Public access set to No? What does the db-sg rule say, in plain words? What survives after you delete a database?*
2. A screenshot of the `db-sg` inbound rule (source = a security group) and of the "NOT reachable" result
3. The SQL you ran, as `shop.sql`. **Never** include the password

Next up: [Class 6: Load balancer and Auto Scaling](class-6-load-balancer-and-autoscaling.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 4](class-4-storage-s3.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 6 ➡️](class-6-load-balancer-and-autoscaling.md)</td></tr></table>
