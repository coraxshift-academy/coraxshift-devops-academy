# Class 1: A Safe Account and Billing Alarms

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2.5 hours

## 👋 Welcome

Before you rent a single computer, you lock the front door and put a smoke alarm on the wall. Today you open your AWS account, protect it, and set up alerts so a bill can never surprise you.

> 📖 **From my café:** When I ran my cybercafe, I used a ticket system (HandyCafe) that counted every customer's browsing time. I never had to guess who was using what, because the system told me. Your billing alerts do the same job: they tell you who is using what, and how much it costs.

**By the end of this class you can:**

- Create an AWS account and explain why the **root user** is not for daily use
- Turn on **MFA** (a second lock)
- Create an **admin user** for daily work
- Create **budgets** that email you before and when money is spent
- Read the **Free Tier** page for your own account
- Open **CloudShell** and run your first command

## 💰 Cost and teardown

| | |
|---|---|
| **Cost today** | $0. Creating an account, users and budgets is free. AWS may place a small temporary hold on your card to verify it |
| **What to remove at the end** | Nothing. These safety settings stay for the whole course |

## Prerequisites

- An email only you read, a phone, an authenticator app, and a payment card
- See [Getting Started](../GETTING-STARTED.md)

## How every step works

Each step has five parts: **Why this matters**, **Do it**, **What it does**, **What you should see**, and **If yours looks different**.

> 💡 **AWS moves buttons.** Follow the meaning if a label has changed.

## Step 1: Create the account

**Why this matters:** everything lives inside one account. It is the building you rent.

**Do it:**

1. Go to **aws.amazon.com** and click **Create an AWS Account**.
2. Enter your email, choose an account name (for example `nkydigitech-lab`), and verify the email code.
3. Choose a **strong, unique password**. Use a password manager if you can.
4. Choose the **Personal** account type, fill in your details, and add your card.
5. Verify your phone number, and choose the **Basic support, free** plan.
6. Sign in to the **console** (the website where you manage AWS).

**What it does:** creates your account and its first login, the **root user**. The root user can do **everything**, including closing the account and changing the card.

**What you should see:** the **Console Home** page. In the top-right corner you see your account name and a region name.

**If yours looks different:** a new account can take a few minutes to activate. If AWS says the account is not ready, wait, then try again. If you do not get the code, check the spam folder.

## Step 2: Protect the root user with MFA

**Why this matters:** a password alone can be stolen. **MFA** (multi-factor authentication) adds a second lock: a code from your phone. Root without MFA is the most dangerous thing in AWS.

**Do it:**

1. Click your account name (top right) → **Security credentials**.
2. Under **Multi-factor authentication (MFA)**, choose **Assign MFA device**.
3. Name it `root-phone`, choose **Authenticator app**, and click **Next**.
4. Scan the QR code with your authenticator app.
5. Type **two codes in a row** (wait for the code to change between them) and click **Add MFA**.

**What it does:** from now on, signing in as root needs your password **and** a six-digit code.

**What you should see:** the MFA device listed, with the type *Virtual*.

**If yours looks different:** if the two codes are rejected, check that the clock on your phone is set to automatic time. Wait for a fresh code for each box.

> 🚫 **Never create access keys for the root user.** You will not need them.

## Step 3: Make an admin user for daily work

**Why this matters:** you log in as root **once**, to build the safe setup. After that, you work as a normal admin user that can be switched off or limited. Think of root as the master key kept in the safe, and the admin user as your everyday key.

**Do it:**

1. In the search bar at the top, type **IAM** and open it (**IAM** means Identity and Access Management: who can do what).
2. Choose **User groups** → **Create group**. Name it `admins`. Under permissions, search for and tick **AdministratorAccess**. Click **Create user group**.
3. Choose **Users** → **Create user**. Name it `nkydigitech-admin` (use your own name). Tick **Provide user access to the AWS Management Console** and choose **I want to create an IAM user**. Choose a password and tick the box to make you change it at next sign-in only if someone else will use it, otherwise leave it off. Click **Next**.
4. On the permissions page choose **Add user to group**, tick `admins`, then **Next** and **Create user**.
5. On the last page, copy the **console sign-in URL**. It looks like `https://123456789012.signin.aws.amazon.com/console`. Save it in your password manager. (It contains your account number, so do not post it.)

**What it does:** a **group** holds permissions. A **user** is one person. Putting the user in the group gives them the group's permissions.

**What you should see:** the user `nkydigitech-admin` listed, in the group `admins`.

**If yours looks different:** newer accounts may show **IAM Identity Center** prompts. You can ignore those for this course. We keep it simple with an IAM user.

## Step 4: Put MFA on the admin user too

**Why this matters:** the admin user is powerful too. It needs the second lock.

**Do it:**

1. In IAM → **Users** → click your admin user → **Security credentials** tab.
2. Under **Multi-factor authentication (MFA)**, choose **Assign MFA device**, name it `admin-phone`, choose **Authenticator app**, and repeat the QR scan and two codes.

**What you should see:** the MFA device listed.

## Step 5: Let your admin user see billing

**Why this matters:** by default only root can see the bill. You want to watch it from your admin login, so root can stay locked away.

**Do it:**

1. Sign in as **root** one last time (you are probably still signed in). Click your account name → **Account**.
2. Scroll to **IAM user and role access to Billing information** and click **Edit**.
3. Tick **Activate IAM Access** and click **Update**.
4. Click your account name → **Sign out**.

**What you should see:** the setting shows *Activated*.

**If yours looks different:** search for "IAM user and role access to Billing" in the Account page if you cannot find it.

## Step 6: Sign in as your admin user

**Why this matters:** this is how you will sign in from now on.

**Do it:**

1. Open the **console sign-in URL** you saved in Step 3.
2. Sign in as **IAM user** with your admin user name, password and the MFA code.
3. In the top-right corner, click the region name and choose **US East (N. Virginia) us-east-1**.

**What you should see:** your user name (not "root") at the top right, and **N. Virginia** as the region.

> 🌍 **Why one region?** A region is a physical place with data centres. Things you create in one region are invisible from another. If you wander between regions you can leave things running that you cannot see. This course uses `us-east-1` only.

## Step 7: Create a budget that alerts you

**Why this matters:** this is your smoke alarm. A **budget** emails you when your spending reaches a limit you choose.

**Do it:**

1. Search for **Billing and Cost Management** and open it. In the left menu choose **Budgets** → **Create budget**.
2. Choose **Use a template (simplified)** → **Zero spend budget**. Name it `zero-spend`, enter your email, and click **Create budget**.
3. Click **Create budget** again → **Use a template** → **Monthly cost budget**. Name it `monthly-10-dollars`, set the amount to **10**, enter your email, and create it.

**What it does:** the zero-spend budget emails you as soon as you are charged more than a tiny amount. The monthly budget emails you at 85% and 100% of $10 (about $8.50 and $10).

**What you should see:** both budgets listed, each with a status.

**If yours looks different:** the budget list can take a few minutes to show spending. Do not worry that it shows $0.00 at first.

> ⚠️ **A budget only *warns* you. It does not stop anything.** If an alert arrives, you must go and switch things off. That is what the teardown steps are for.

## Step 8: Turn on free tier and billing alerts

**Why this matters:** AWS can also email you when you come close to a free allowance, and can send you billing alerts.

**Do it:**

1. In **Billing and Cost Management**, open **Billing preferences** (or **Billing → Preferences**).
2. Tick **Receive AWS Free Tier alerts** and **Receive CloudWatch billing alerts** if they appear. Enter your email and click **Update**.

**What you should see:** a green *Preferences updated* message.

**If yours looks different:** some accounts show these in slightly different places. Search the Billing page for "Free Tier" and "alerts".

## Step 9: Read your own Free Tier page

**Why this matters:** AWS has changed how its free allowance works. Some accounts get a fixed monthly free amount per service. Newer accounts get **credits** that run out or expire. You must know **which one you have**.

**Do it:**

1. In **Billing and Cost Management**, open **Free Tier** (or **Credits**) in the left menu.
2. Read the page. Write down in `notes.md`: how much free credit or allowance you have, and **when it expires**.

**What you should see:** a list of services and how much free use is left, or a credit balance with an end date.

**If yours looks different:** if the page is empty, your account is brand new. Check again tomorrow, and plan as if **nothing is free**.

## Step 10: Open CloudShell and run your first command

**Why this matters:** CloudShell is a free Linux terminal in your browser, already signed in as you. You will use it all course.

**Do it:**

1. Click the **terminal icon** (`>_`) in the top bar, or search for **CloudShell**. Wait for the prompt.
2. Run:

```bash
aws sts get-caller-identity
```

**What it does:** asks AWS "who am I?". `aws` is the AWS command line tool. `sts get-caller-identity` is the question.

**What you should see (roughly):**

```text
{
    "UserId": "AIDAEXAMPLE",
    "Account": "123456789012",
    "Arn": "arn:aws:iam::123456789012:user/nkydigitech-admin"
}
```

The `Arn` ends with your **user name**, not `root`. That proves you are using the safe login.

**If yours looks different:** if the `Arn` says `root`, sign out and use your admin user. If CloudShell will not start, check that you are in `us-east-1` and try again in a minute.

Now check your region:

```bash
aws configure get region || echo "no default region set"
echo $AWS_REGION
```

**What you should see:** `us-east-1` (CloudShell sets `AWS_REGION` to the region you are in).

## Step 11: Your tagging habit

**Why this matters:** a **tag** is a sticky label on a resource. If everything you create carries `Project = coraxshift-lab`, you can list it all later and be sure you removed everything.

**Do it:** from now on, every time you create something, add the tag **Key** `Project` and **Value** `coraxshift-lab` when the screen offers **Tags**. You will practise this in Class 2 and use it in Class 9.

## ✅ Recap

- The **root user** is for opening the account only. Lock it with MFA, then stay away.
- Do daily work as an **admin user**, with MFA.
- A **budget** warns you. **You** switch things off.
- Work in **one region**, and tag what you create.
- **CloudShell** is a free Linux terminal in your browser.

## 🧹 Teardown and check

Nothing to delete today. Check that you can:

- [ ] Sign in as your admin user with MFA
- [ ] See both budgets listed
- [ ] Say where your free allowance is written, and when it ends

## 📤 Push to your portfolio

In your portfolio repository create `aws/class-1/` with a `notes.md` answering:

1. What is the root user, and why do we not use it every day?
2. What is MFA?
3. What is the difference between a budget alert and a spending limit?
4. What does your Free Tier page say?

> 🔒 **Do not include** your account number, email, password or QR code. Crop screenshots.

Next up: [Class 2: Your first server](class-2-your-first-server-ec2.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-your-first-server-ec2.md)</td></tr></table>
