# Class 8: Watching (CloudWatch)

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Running something you cannot see is like a shop with no windows. **CloudWatch** is AWS's set of windows and alarm bells. It collects **metrics** (numbers over time, like how busy a server is), lets you draw them as **graphs**, and rings an **alarm** when a number crosses a line you set.

> 📖 **From my café:** In the cafe I could see which machines were busy from the session monitor, and I could tell a machine was in trouble before the customer complained. Alarms do this for you at 3 in the morning, when you are asleep.

**By the end of this class you can:**

- Read a CPU graph for a server
- Create an **SNS topic** that emails you, and confirm the email works
- Create an **alarm** for high CPU and test it two ways
- Create a **billing alarm** that watches your spending
- Build a small **dashboard** and say what **logs** are for
- Remove all of it

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | Basic EC2 metrics (every 5 minutes) are free. The first 10 alarms and the first 3 dashboards (up to 50 metrics) are free each month. Email through SNS is free for small amounts. The test server is about 1 cent per hour. Today: **a few cents** |
| **If forgotten** | Alarms and dashboards beyond the free amount cost small amounts each month. A forgotten server costs about $8 to $10 a month |
| **Not enabled** | **Detailed monitoring** (every 1 minute) costs extra. Leave it **off** |
| **Tear down** | Step 10. Delete alarms, topic, dashboard, then the server, then the VPC |

## Prerequisites

- Classes 2 and 3 done and cleaned up

## Step 1: Launch a server to watch

**Do it:** launch an instance as in Class 3 Step 6: name `watch-test-1`, `t3.micro`, `shop-vpc`, public subnet 1, public IP enabled, tag `Project = coraxshift-lab`, and the security group named `watch-test-sg` with **HTTP 80** and **SSH 22** from Anywhere (lab-only, removed in Step 10). Under **Advanced details**, leave **Detailed CloudWatch monitoring** **unticked**. Rebuild the VPC first if you deleted it.

**What you should see:** a running instance. Write down its **instance ID** (like `i-0abc...`).

## Step 2: Read a graph

**Do it:** select the instance → **Monitoring** tab. Find **CPU utilization (%)**. Set the time range (top right) to **1 hour**.

**What you should see:** a small graph, mostly near 0% to 5%, with a point every 5 minutes.

**If yours looks different:** a brand-new server shows *No data available* for about 5 to 10 minutes. Wait, then refresh.

Now do the same in CloudWatch itself: search for **CloudWatch** → **Metrics → All metrics** → **EC2** → **Per-Instance Metrics**, tick `CPUUtilization` for your instance ID.

## Step 3: Make an SNS topic that emails you

**Why this matters:** an alarm needs somewhere to send its message. **SNS** (Simple Notification Service) is the post office. A **topic** is a mailing list, and you are its first subscriber.

**Do it:**

1. Search for **SNS** → **Topics** → **Create topic**. Type **Standard**. Name: `lab-alerts`. Tag `Project` = `coraxshift-lab`. **Create topic**.
2. On the topic page choose **Create subscription**. **Protocol:** **Email**. **Endpoint:** your email address. **Create subscription**.
3. Open your email, find a message from AWS Notifications, and click **Confirm subscription**.

**What you should see:** in SNS → **Subscriptions**, your subscription with status **Confirmed** (it says *Pending confirmation* until you click the link).

**If yours looks different:** check your spam folder. Until you confirm, **no** alarm email will arrive.

## Step 4: Create a CPU alarm

**Do it:** in CloudWatch → **Alarms → All alarms → Create alarm**:

1. **Select metric** → **EC2 → Per-Instance Metrics** → your instance, `CPUUtilization` → **Select metric**.
2. **Statistic:** Average. **Period:** 5 minutes.
3. **Conditions:** **Static**, **Greater than**, `70`.
4. **Additional configuration:** Datapoints to alarm `1 out of 1`. **Missing data treatment:** **Treat missing data as missing**.
5. **Next** → **Notification:** *In alarm* → **Select an existing SNS topic** → `lab-alerts`.
6. **Alarm name:** `watch-test-high-cpu`. Tag `Project` = `coraxshift-lab`. **Create alarm**.

**What it does:** every 5 minutes CloudWatch checks the average CPU. If it is above 70%, it emails you.

**What you should see:** the alarm listed. State: **Insufficient data** at first, then **OK**.

## Step 5: Test the alarm quickly (no waiting)

**Why this matters:** an alarm you have never tested is a hope, not a safety net.

**Do it:** in CloudShell:

```bash
aws cloudwatch set-alarm-state --alarm-name watch-test-high-cpu \
  --state-value ALARM --state-reason "Class 8 test"
```

**What it does:** pretends the alarm has fired, so you can see the email arrive without making the server work.

**What you should see:** within a minute or two, an email with the subject *ALARM: "watch-test-high-cpu"*. The alarm shows **In alarm** briefly, then returns to **OK** at its next real check.

## Step 6: Test the alarm for real

**Do it:** connect to the server (**EC2 → select → Connect → EC2 Instance Connect**) and make it work hard for a few minutes:

```bash
for i in 1 2; do (yes > /dev/null &) ; done
```

**What it does:** starts two endless loops that each use a CPU. `yes` just prints "y" forever and throws it away.

Wait 6 to 10 minutes, watching **Monitoring → CPU utilization**.

**What you should see:** the graph climbs. On a `t3.micro`, 2 loops usually push it well above 70%, then the alarm emails you again.

Now **stop the load**:

```bash
pkill yes
```

**What you should see:** a prompt back with no output. The CPU graph falls over the next 10 minutes.

**If yours looks different:** a burstable server may spend its credits and slow down, so the graph does not reach 70%. If so, use the quick test in Step 5 as your proof, and say so in your notes.

## Step 7: A billing alarm

**Why this matters:** this watches your **money**, not your servers. It is your second smoke alarm after the Class 1 budgets.

> ⚠️ Billing metrics live in **us-east-1** only, which is where we already are. You also needed **Receive CloudWatch billing alerts** ticked in Class 1, Step 8.

**Do it:** CloudWatch → **Alarms → Create alarm** → **Select metric** → **Billing → Total Estimated Charge** → tick **USD** → **Select metric**.

1. **Statistic:** Maximum. **Period:** 6 hours.
2. **Conditions:** Static, Greater than, `5` (that is five dollars).
3. **Notification:** SNS topic `lab-alerts`.
4. **Alarm name:** `billing-over-5-dollars`. Tag `Project` = `coraxshift-lab`. **Create alarm**.

**What you should see:** the alarm listed, probably **Insufficient data** or **OK**. A new account has little billing data yet.

**If yours looks different:** if **Billing** is not in the metrics list, billing alerts are not on yet, or you are not in us-east-1. Fix Class 1, Step 8, wait a day, and try again. This alarm is **optional if the budgets from Class 1 work**, but practise it once.

## Step 8: Build a dashboard

**Do it:** CloudWatch → **Dashboards → Create dashboard**. Name it `shop-dashboard`. Add a **Line** widget → **Metrics** → EC2 → Per-Instance Metrics → `CPUUtilization` for your instance. Add a second widget with `NetworkIn`. **Save dashboard**.

**What you should see:** two graphs on one page.

## Step 9: Logs (read and understand)

**Why this matters:** metrics tell you *how much*. **Logs** tell you *what happened*: "customer 42 got an error at 10:03".

**Do it:** open CloudWatch → **Logs → Log groups**. You will probably see nothing, or only AWS-made groups. That is expected: servers do not send logs until you install and configure the **CloudWatch agent**. Read this and understand it:

- A **log group** holds the logs for one application.
- A **log stream** is one source inside it, such as one server.
- **Retention** controls how long logs are kept. The default is **forever**, and logs are billed by how much you store.

> 💡 **Habit:** whenever you create a log group, set a **retention** of 7 or 14 days.

## Step 10: 🧹 Teardown and check

**Do it:**

1. In the server terminal, run `pkill yes` if you have not. Close it.
2. **CloudWatch → Alarms:** select `watch-test-high-cpu` and `billing-over-5-dollars` → **Actions → Delete**.
3. **CloudWatch → Dashboards:** select `shop-dashboard` → **Delete**.
4. **SNS → Subscriptions:** delete your email subscription. **SNS → Topics:** delete `lab-alerts`.
5. **EC2:** terminate `watch-test-1`, wait for **Terminated**, delete `watch-test-sg`.
6. Delete the VPC.

Then in CloudShell:

```bash
aws cloudwatch describe-alarms --query 'MetricAlarms[].AlarmName' --output text
aws cloudwatch list-dashboards --query 'DashboardEntries[].DashboardName' --output text
aws sns list-topics --query 'Topics[].TopicArn' --output text
aws logs describe-log-groups --query 'logGroups[].logGroupName' --output text
aws ec2 describe-instances \
  --query 'Reservations[].Instances[?State.Name!=`terminated`].[InstanceId,State.Name]' --output text
```

**What you should see:** nothing printed. (A log group made by AWS, or a topic you did not create, is not yours to delete.)

> 💡 **Keep the billing alarm?** It is free to keep and useful. If you keep it, keep its SNS topic and subscription too, and write that in your notes. Then those two items will show up in the check above on purpose.

## ✅ Recap

- **Metrics** are numbers over time, **graphs** draw them, **alarms** ring a bell.
- An alarm needs somewhere to send its message: an **SNS topic** with a **confirmed** subscription.
- **Test** every alarm. `set-alarm-state` is the quick test.
- A **billing alarm** watches your spending.
- **Logs** say what happened. Set a **retention** so they do not pile up.

## 📤 Push to your portfolio

In `aws/class-8/` add:

1. `notes.md`: *What is a metric? What is an alarm? Why did you test it? What is the difference between a metric and a log?*
2. A screenshot of the alarm email (hide your address) and of the CPU graph
3. A screenshot of your dashboard

Next up: [Class 9: Cost control and the final clean-up](class-9-cost-control-and-cleanup.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 7](class-7-names-route-53.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 9 ➡️](class-9-cost-control-and-cleanup.md)</td></tr></table>
