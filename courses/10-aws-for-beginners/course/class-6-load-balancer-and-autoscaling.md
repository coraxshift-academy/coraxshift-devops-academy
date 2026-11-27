# Class 6: Load Balancer and Auto Scaling

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 3 hours

## 👋 Welcome

One server is a single point of failure: if it breaks or gets too busy, the shop closes. Today you build a shop with **two or more servers behind one front door**.

- A **load balancer** is the host at the gate who sends each customer to a free stall and stops sending anyone to a stall that is closed.
- **Auto Scaling** is the manager who keeps the right number of stalls open: it replaces one that breaks and opens more on busy days.

> 📖 **From my café:** On busy afternoons I would point customers to the free computers instead of letting a queue form at one machine. When a machine froze, I put an "out of order" sign on it and sent people elsewhere. That is exactly what a load balancer does with health checks.

**By the end of this class you can:**

- Explain a **launch template**, a **target group**, a **load balancer** and an **Auto Scaling group**
- Build them and open the shop through the load balancer's address
- Watch requests alternate between two servers
- Terminate a server and watch AWS replace it
- Tear everything down in the correct order

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | Application Load Balancer about 2 cents per hour (plus a small usage charge), two `t3.micro` servers about 1 cent each per hour, and public IPv4 addresses about half a cent per hour each. Together roughly **6 to 8 cents per hour. A 3 hour class is about 15 to 25 cents** |
| **If forgotten** | Roughly **$40 to $60 a month**. The load balancer alone is about $16 to $20 |
| **Tear down** | Step 12, **in the order written**: Auto Scaling group first, then the load balancer, target group, launch template, security groups, VPC |
| **Free allowance?** | Maybe. Check your Free Tier page. Plan as if it is not |

> 🕐 **Set a timer for 2 hours** on your phone when you start. This is the class where forgetting costs the most.

## Prerequisites

- Classes 2, 3 and 5 done and cleaned up

## Step 1: Have the VPC ready

**Do it:** open **VPC → Your VPCs**. If `shop-vpc` exists, continue. If not, rebuild it as in Class 3 (Steps 2, 3 and 5): `10.0.0.0/16`, 2 AZs, 2 public and 2 private subnets, **NAT gateways: None**, **VPC endpoints: None**, auto-assign public IP **on** for both public subnets.

**What you should see:** `shop-vpc` with two public subnets in different zones.

> 💡 **Why public subnets for our servers?** Servers in private subnets need a NAT gateway to download software, and a NAT gateway costs money every hour. For this lab we put the servers in the public subnets and lock them down with security groups instead. In a real company you would use private subnets plus a NAT gateway.

## Step 2: Two security groups, one trusting the other

**Why this matters:** the servers must accept web traffic **only from the load balancer**, not from anyone on the street.

**Do it:** **EC2 → Security groups → Create security group**, twice.

First, the load balancer's group:

| Setting | Value |
|---|---|
| Name | `alb-sg` |
| VPC | `shop-vpc` |
| Inbound rule | HTTP, port 80, Source **Anywhere-IPv4** |
| Tag | `Project` = `coraxshift-lab` |

Second, the servers' group:

| Setting | Value |
|---|---|
| Name | `asg-web-sg` |
| VPC | `shop-vpc` |
| Inbound rule | HTTP, port 80, Source **Custom**, then select **`alb-sg`** |
| Tag | `Project` = `coraxshift-lab` |

**What you should see:** `asg-web-sg` accepts port 80 only from `alb-sg`.

## Step 3: Create a launch template

**Why this matters:** a **launch template** is a saved recipe for a server: image, size, security group and startup script. Auto Scaling uses it to build identical servers.

**Do it:** **EC2 → Launch templates → Create launch template**:

| Setting | Value |
|---|---|
| Name | `shop-lt` |
| Description | `shop web server` |
| Tick | **Provide guidance to help me set up a template that I can use with EC2 Auto Scaling** |
| AMI | Amazon Linux 2023 |
| Instance type | `t3.micro` |
| Key pair | **Don't include in launch template** |
| Security groups | `asg-web-sg` (do **not** choose a subnet here) |
| Resource tags | `Project` = `coraxshift-lab` for **Instances** and **Volumes** |
| Advanced network → Auto-assign public IP | **Enable** |

Open **Advanced details**, scroll to **User data**, and paste:

```bash
#!/bin/bash
dnf install -y httpd
TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
ID=$(curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)
echo "<h1>Mama Ngozi's Provisions</h1><p>Served by: $ID</p>" > /var/www/html/index.html
systemctl enable --now httpd
```

**What it does:** the server installs Apache, asks AWS "what is my own ID?" (that address `169.254.169.254` is a special one only the server itself can reach), and writes the ID into the page. That way you can *see* which server answered.

Click **Create launch template**.

**What you should see:** `shop-lt` listed.

## Step 4: Create the target group

**Why this matters:** a **target group** is the list of servers the load balancer sends customers to. It also knows how to check that each one is healthy.

**Do it:** **EC2 → Target groups → Create target group**:

| Setting | Value |
|---|---|
| Target type | **Instances** |
| Name | `shop-tg` |
| Protocol and port | HTTP, 80 |
| VPC | `shop-vpc` |
| Health check path | `/` |
| Tags | `Project` = `coraxshift-lab` |

Click **Next**. On the **Register targets** page, **do not select any**, and click **Create target group**.

**What you should see:** `shop-tg` listed with *0 targets*. Auto Scaling will fill it.

## Step 5: Create the load balancer

**Do it:** **EC2 → Load balancers → Create load balancer → Application Load Balancer → Create**:

| Setting | Value |
|---|---|
| Name | `shop-alb` |
| Scheme | **Internet-facing** |
| IP address type | IPv4 |
| VPC | `shop-vpc` |
| Mappings | Tick **both** zones and choose the **public** subnet in each |
| Security groups | **Remove `default`**, choose `alb-sg` |
| Listener | HTTP, 80, Default action: forward to `shop-tg` |
| Tags | `Project` = `coraxshift-lab` |

Click **Create load balancer**.

**What you should see:** `shop-alb` with state **Provisioning**, then **Active** after a few minutes. Copy its **DNS name** (like `shop-alb-123456.us-east-1.elb.amazonaws.com`).

**If yours looks different:** if you can only tick one zone, you picked a private subnet or two subnets in the same zone. Choose one public subnet per zone.

## Step 6: Create the Auto Scaling group

**Do it:** **EC2 → Auto Scaling groups → Create Auto Scaling group**:

1. **Name:** `shop-asg`. **Launch template:** `shop-lt`. **Next**.
2. **VPC:** `shop-vpc`. **Availability Zones and subnets:** choose the **two public** subnets. **Next**.
3. **Load balancing:** choose **Attach to an existing load balancer** → **Choose from your load balancer target groups** → `shop-tg`. **Health checks:** tick **Turn on Elastic Load Balancing health checks**. **Next**.
4. **Group size:** Desired capacity `2`, Minimum `1`, Maximum `3`.
5. **Scaling policies:** choose **Target tracking scaling policy**, metric **Average CPU utilization**, target value `50`.
6. Skip notifications. **Tags:** `Project` = `coraxshift-lab`, tick **Tag new instances**. **Create Auto Scaling group**.

**What it does:** AWS now keeps **2 servers** running, may add a third if average CPU stays above 50%, and replaces any that fail health checks.

**What you should see:** `shop-asg` with *Desired 2*. Under **EC2 → Instances**, two new instances appear within a minute.

## Step 7: Wait for healthy

**Do it:** **EC2 → Target groups → `shop-tg` → Targets** tab. Wait, and refresh, until both targets show **healthy** (about 3 to 5 minutes).

**What you should see:** two targets, status **healthy**.

**If yours looks different:** *initial* is normal for a couple of minutes. **unhealthy** after 6 minutes: check that `asg-web-sg` allows port 80 from `alb-sg`, and that the servers got public IPs (needed to download Apache). See [Troubleshooting](troubleshooting.md).

## Step 8: Open the shop through the load balancer

**Do it:** paste the load balancer's DNS name into a browser as `http://...`. Refresh many times. Or in CloudShell:

```bash
LB=shop-alb-REPLACE-ME.us-east-1.elb.amazonaws.com
for i in 1 2 3 4 5 6; do curl -s http://$LB | grep Served; done
```

**What you should see:** *Served by:* followed by **two different instance IDs**, appearing in a mixed order.

## Step 9: Kill a server and watch AWS fix it

**Do it:** **EC2 → Instances**, select **one** of the two servers → **Instance state → Terminate**. Keep refreshing the shop page, and watch **Auto Scaling groups → shop-asg → Activity** tab.

**What you should see:** the shop keeps working (served by the survivor). Within a few minutes the Activity tab shows a **Launching a new EC2 instance** entry, and the group returns to 2 instances.

**What it means:** this is the heart of why companies use the cloud: **servers are replaceable**. You do not repair one. You let the group build another.

## Step 10: Look at scaling (optional, 10 minutes)

**Do it:** open **shop-asg → Automatic scaling** tab and read the policy. It says: keep average CPU near 50%. Scaling out (adding) is quick, scaling in (removing) is deliberately slow. We will not force a load test. Instead, read **Monitoring** to see CPU graphs, which you meet properly in Class 8.

## Step 11: Change the size by hand

**Do it:** in **shop-asg → Details → Group details → Edit**, set **Desired capacity** to `1`. Save. Watch one instance terminate. Set it back to `2` if you want to test again, otherwise leave it.

## Step 12: 🧹 Teardown and check

**Order matters.** If you delete the servers first, the group simply builds new ones.

1. **Auto Scaling groups:** select `shop-asg` → **Delete** → type `delete`. This terminates its servers. Wait until the group disappears and the instances show **Terminated**.
2. **Load balancers:** select `shop-alb` → **Actions → Delete load balancer** → confirm. Wait about a minute.
3. **Target groups:** delete `shop-tg`.
4. **Launch templates:** delete `shop-lt`.
5. **Security groups:** delete `asg-web-sg` first, then `alb-sg`.
6. **VPC:** delete `shop-vpc` unless you start Class 7 right now.

Then in CloudShell:

```bash
aws autoscaling describe-auto-scaling-groups --query 'AutoScalingGroups[].AutoScalingGroupName' --output text
aws elbv2 describe-load-balancers --query 'LoadBalancers[].LoadBalancerName' --output text
aws elbv2 describe-target-groups --query 'TargetGroups[].TargetGroupName' --output text
aws ec2 describe-instances \
  --query 'Reservations[].Instances[?State.Name!=`terminated`].[InstanceId,State.Name]' --output text
aws ec2 describe-launch-templates --query 'LaunchTemplates[].LaunchTemplateName' --output text
```

**What you should see:** nothing printed by any command.

**If yours looks different:** a load balancer that will not delete may still be linked to something. Check **Listeners** and any `deletion protection` setting. A security group that will not delete is still attached to an instance, or a network interface of the load balancer. Wait two minutes after the load balancer vanishes, then try again. Run `aws ec2 describe-network-interfaces --query 'NetworkInterfaces[].[NetworkInterfaceId,Description]' --output text` to see what is still holding it.

## ✅ Recap

- A **launch template** is a recipe for a server. An **Auto Scaling group** keeps the right number alive from that recipe.
- A **target group** is the list of servers, with health checks. A **load balancer** sends traffic to the healthy ones.
- The servers trust only the load balancer's **security group**.
- Servers are **replaceable**, not precious.
- Delete in the right order: group, load balancer, target group, template, security groups, VPC.

## 📤 Push to your portfolio

In `aws/class-6/` add:

1. `notes.md`: *What does a load balancer do? What is a health check? Why does Auto Scaling replace a server instead of repairing it?*
2. A screenshot of the shop page showing two different instance IDs, and one of the Auto Scaling **Activity** tab after you terminated a server
3. The `user-data.sh` script, and a diagram of the load balancer, two servers and the target group

Next up: [Class 7: Names (Route 53)](class-7-names-route-53.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 5](class-5-database-rds.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 7 ➡️](class-7-names-route-53.md)</td></tr></table>
