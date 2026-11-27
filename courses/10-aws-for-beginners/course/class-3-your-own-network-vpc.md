# Class 3: Your Own Network (VPC and Subnets)

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2.5 hours

## 👋 Welcome

In Class 2 you used a network AWS had already made for you. Today you build your own. A **VPC** (Virtual Private Cloud) is your own fenced piece of the market. Inside it you mark out **subnets**: some face the street (public), some are back rooms with no street door (private).

> 📖 **From my café:** My cybercafe had a front area for customers and a back room for the router and the main computer. Customers could walk to the front desk. Nobody could walk to the back room. Public and private subnets are the same idea.

| In the building | In AWS |
|---|---|
| The whole fenced plot | **VPC** |
| A floor or section | **Subnet** |
| The front door to the street | **Internet gateway** |
| The signpost that says "to reach the street, use this door" | **Route table** |
| Two separate buildings far apart, so one fire cannot hit both | **Availability Zones (AZ)** |

**By the end of this class you can:**

- Explain a VPC, a subnet, an internet gateway and a route table
- Read a CIDR block such as `10.0.0.0/16`
- Build a VPC with public and private subnets across two Availability Zones
- Prove which subnet can reach the internet, and why
- Delete the whole VPC cleanly

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | The VPC, subnets, route tables and internet gateway are **free**. One tiny test server for under an hour is a cent or two |
| **The trap** | A **NAT gateway** (it lets private servers reach out) costs about **$0.045 per hour, around $32 a month, plus data**. The wizard offers to create one. **We choose "None" every time** |
| **If forgotten** | The free parts cost nothing. A forgotten NAT gateway or Elastic IP does |
| **Tear down** | Step 9. Terminate the test server, then delete the VPC |

## Prerequisites

- Class 2 done and cleaned up (the three check commands printed nothing)

## Step 1: Understand CIDR (no clicking yet)

**Why this matters:** every network needs a range of addresses, written as a **CIDR block**.

A CIDR block looks like `10.0.0.0/16`. The part after the slash says how many addresses you get:

| CIDR | Addresses | Use it for |
|---|---|---|
| `/16` | 65,536 | A whole VPC |
| `/24` | 256 | One subnet |
| `/28` | 16 | The smallest AWS allows |

AWS keeps **5 addresses** in every subnet for itself, so a `/24` gives you **251** to use.

**Do it:** in CloudShell, work it out yourself:

```bash
python3 - <<'EOF'
import ipaddress
vpc = ipaddress.ip_network("10.0.0.0/16")
print("VPC addresses:", vpc.num_addresses)
for cidr in ["10.0.0.0/24", "10.0.1.0/24", "10.0.128.0/24", "10.0.129.0/24"]:
    n = ipaddress.ip_network(cidr)
    print(cidr, "inside the VPC:", n.subnet_of(vpc), "usable in AWS:", n.num_addresses - 5)
EOF
```

**What you should see:**

```text
VPC addresses: 65536
10.0.0.0/24 inside the VPC: True usable in AWS: 251
10.0.1.0/24 inside the VPC: True usable in AWS: 251
10.0.128.0/24 inside the VPC: True usable in AWS: 251
10.0.129.0/24 inside the VPC: True usable in AWS: 251
```

## Step 2: Open the VPC wizard

**Why this matters:** the wizard builds the VPC, the subnets, the gateway and the routes in one go. We still read every piece afterwards.

**Do it:** search for **VPC**, open it, choose **Your VPCs** → **Create VPC**, and choose **VPC and more**.

## Step 3: Fill in the wizard

**Do it:** set these, and leave everything else at its default:

| Setting | Value |
|---|---|
| Name tag auto-generation | tick, and type `shop` |
| IPv4 CIDR block | `10.0.0.0/16` |
| IPv6 CIDR block | No IPv6 |
| Tenancy | Default |
| Number of Availability Zones | **2** |
| Number of public subnets | **2** |
| Number of private subnets | **2** |
| NAT gateways | **None** |
| VPC endpoints | **None** |
| DNS options | keep both **Enable DNS hostnames** and **Enable DNS resolution** ticked |

Open **Additional tags** and add Key `Project`, Value `coraxshift-lab`.

**What it does:** the preview on the right draws your network: two public subnets (one per AZ), two private subnets, one route table for public, route tables for private, and an internet gateway.

**What you should see:** a diagram with `shop-vpc`, subnets such as `shop-subnet-public1-us-east-1a`, and **no NAT gateway** box.

> ⚠️ **Check the NAT gateway line twice.** It must say **None**.

Click **Create VPC**. Wait until every step says a green tick, then **View VPC**.

## Step 4: Read what you built

**Why this matters:** you should know what each piece does, not just that it exists.

**Do it:**

1. Open **Subnets**. Filter by `shop`. You should see four. Note each one's **CIDR** and **Availability Zone**.
2. Open **Route tables** → the one named `shop-rtb-public`. Click the **Routes** tab.
3. Open the `shop-rtb-private1-...` table and read its **Routes** tab.
4. Open **Internet gateways** and find `shop-igw`, state **Attached**.

**What you should see:**

| Route table | Destination | Target |
|---|---|---|
| Public | `10.0.0.0/16` | `local` |
| Public | `0.0.0.0/0` | `igw-...` (the internet gateway) |
| Private | `10.0.0.0/16` | `local` **only** |

**What it means:** `local` means "anything inside the VPC can talk to each other". `0.0.0.0/0` means "everywhere else", and the target `igw-...` is the street door. A **public subnet** is simply a subnet whose route table sends `0.0.0.0/0` to the internet gateway. The private route table has **no** street door.

## Step 5: Enable public IPs for the public subnets

**Why this matters:** a server in a public subnet also needs a public address to be reachable.

**Do it:** in **Subnets**, select `shop-subnet-public1-us-east-1a` → **Actions** → **Edit subnet settings** → tick **Enable auto-assign public IPv4 address** → **Save**. Repeat for `shop-subnet-public2-us-east-1b`.

**What you should see:** the setting shows **Yes** in the subnet's details.

## Step 6: Launch a test server in the public subnet

**Do it:** go to **EC2 → Launch instance** and use the same settings as Class 2 (Amazon Linux 2023, `t3.micro`, tag `Project = coraxshift-lab`, proceed without key pair) but change **Network settings**:

1. **VPC:** `shop-vpc`. **Subnet:** `shop-subnet-public1-us-east-1a`. **Auto-assign public IP:** Enable.
2. **Create security group** named `shop-vpc-web-sg`, one rule only: **HTTP** port 80 from **Anywhere**.
3. Name it `vpc-test-1`. Add the same user data as Class 2:

```bash
#!/bin/bash
dnf install -y httpd
echo "<h1>Mama Ngozi's Provisions</h1><p>Inside my own VPC</p>" > /var/www/html/index.html
systemctl enable --now httpd
```

Launch it and wait for **2/2 checks passed**.

**What you should see:** opening `http://<public IP>` shows the heading and *Inside my own VPC*.

**If yours looks different:** if the page does not load, check in this order: (1) the subnet's route table has `0.0.0.0/0` to the internet gateway, (2) the security group has the HTTP rule, (3) the instance has a public IPv4 address, (4) you typed `http://`.

## Step 7: Prove the private subnet has no street door

**Why this matters:** a diagram is a claim. A test is proof.

**Do it:** launch a **second** instance the same way, but choose the subnet `shop-subnet-private1-us-east-1a`, **Auto-assign public IP: Disable**, security group `shop-vpc-web-sg`, name `vpc-private-test`, and **leave out** the user data (it could not download anything anyway).

**What you should see:** the instance runs but has **no public IPv4 address**. Nothing on the internet can reach it, and it cannot reach out either.

**What it means:** this is exactly where a database should live: reachable by your own servers, invisible to the street. In real projects a **NAT gateway** lets private servers reach out for updates. It costs money every hour, so we do not build one in this course.

## Step 8: Look at it from the command line

**Do it:** in CloudShell:

```bash
aws ec2 describe-vpcs --filters Name=tag:Project,Values=coraxshift-lab \
  --query 'Vpcs[].[VpcId,CidrBlock]' --output text
aws ec2 describe-subnets --filters Name=tag:Project,Values=coraxshift-lab \
  --query 'Subnets[].[SubnetId,CidrBlock,AvailabilityZone,MapPublicIpOnLaunch]' --output text
```

**What you should see:** one VPC with `10.0.0.0/16`, and four subnets with their CIDRs. The two public ones show `True` for the last column only if you completed Step 5.

**If yours looks different:** if nothing prints, the VPC tag was not added. Filter on the name instead, or add the tag in the console (VPC → select → **Tags**).

## Step 9: 🧹 Teardown and check

**Order matters.** Remove what lives inside before the container.

1. **EC2 → Instances:** terminate `vpc-test-1` and `vpc-private-test`. Wait for **Terminated**.
2. **VPC → Your VPCs:** select `shop-vpc` → **Actions** → **Delete VPC**. The confirmation lists the subnets, route tables and internet gateway it will also delete. Type `delete` and confirm.
3. **EC2 → Security groups:** delete `shop-vpc-web-sg` if it is still listed (deleting the VPC usually removes it).

Then in CloudShell:

```bash
aws ec2 describe-instances \
  --query 'Reservations[].Instances[?State.Name!=`terminated`].[InstanceId,State.Name]' --output text
aws ec2 describe-volumes --query 'Volumes[].[VolumeId]' --output text
aws ec2 describe-nat-gateways --filter Name=state,Values=pending,available \
  --query 'NatGateways[].NatGatewayId' --output text
aws ec2 describe-vpcs --filters Name=tag:Project,Values=coraxshift-lab --query 'Vpcs[].VpcId' --output text
```

**What you should see:** nothing printed by any command.

**If yours looks different:** "The vpc has dependencies and cannot be deleted" means something still lives inside: an instance, a network interface, or a load balancer. Find it under **EC2 → Network Interfaces** and remove its owner first.

> 💡 **Keep the VPC for Classes 5 and 6?** It costs nothing, so you may. But if you do, say so in your notes, and still check for NAT gateways. If you delete it, you rebuild it in 5 minutes with the same wizard values. Classes 5 and 6 tell you when to do that.

## ✅ Recap

- A **VPC** is your own private network. A **subnet** is a section of it in one Availability Zone.
- **CIDR** `/16` is a big range and `/24` is a small one. AWS keeps 5 addresses per subnet.
- A subnet is **public** only because its route table points `0.0.0.0/0` to an **internet gateway**.
- A **private** subnet has no such route, so nothing from the street can reach it.
- Choose **NAT gateways: None**, or it costs money every hour.
- Delete servers first, then the VPC.

## 📤 Push to your portfolio

In `aws/class-3/` add:

1. `notes.md`: *What makes a subnet public? What is a route table? Why use two Availability Zones?*
2. A hand-drawn or typed diagram of your VPC with its four subnets and CIDRs
3. Screenshots of the two route tables and of the empty check commands

Next up: [Class 4: Storage (S3)](class-4-storage-s3.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-your-first-server-ec2.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 4 ➡️](class-4-storage-s3.md)</td></tr></table>
