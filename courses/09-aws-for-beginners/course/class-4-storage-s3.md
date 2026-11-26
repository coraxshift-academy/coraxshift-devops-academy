# Class 4: Storage (S3)

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

**S3** (Simple Storage Service) is a lockable storage room with unlimited shelves. You put files in (called **objects**) inside a box called a **bucket**. Nothing in S3 is a "server" you log into. You just put things in and take things out.

> 📖 **From my café:** In the cafe I kept customers' printouts and scanned documents on one computer. When that computer failed, so did access to the files. S3 stores each file in several places, so one machine failing does not lose it.

**By the end of this class you can:**

- Create a bucket and keep it **private**
- Upload, list, download and delete files from the console and the terminal
- Turn on **versioning** and explain why it matters
- Share one file safely for five minutes with a **presigned link**
- Set a **lifecycle rule** that deletes old files automatically
- Empty and delete a bucket, including its old versions

## 💰 Cost and teardown

| | |
|---|---|
| **Cost** | Storing a few tiny files costs well under one cent. Requests cost fractions of a cent |
| **If forgotten** | Almost nothing for tiny files. Large files add up, and **old versions keep costing** until deleted |
| **Tear down** | Step 10. Empty the bucket (including versions), then delete it |

## Prerequisites

- Class 1 done. No servers are needed today

## Step 1: Choose a bucket name

**Why this matters:** bucket names are **unique across all of AWS, for everyone**. If someone else has your name, you cannot use it.

**Do it:** in CloudShell, make a name that is probably yours alone:

```bash
export BUCKET="coraxshift-lab-$(date +%Y%m%d)-$RANDOM"
echo $BUCKET
```

**What it does:** joins a prefix, today's date and a random number. Write the name down. You will need it in later steps. If you open a new CloudShell tab, run `export BUCKET=...` again with the same value.

**What you should see:** something like `coraxshift-lab-20261126-18342`.

**If yours looks different:** names must be 3 to 63 characters, lower-case letters, numbers and hyphens only.

## Step 2: Create the bucket in the console

**Do it:**

1. Search for **S3** and click **Create bucket**.
2. **Bucket name:** paste your name. **Region:** US East (N. Virginia).
3. **Object Ownership:** keep **ACLs disabled (recommended)**.
4. **Block Public Access settings:** keep **Block all public access** **ticked**.
5. **Bucket Versioning:** choose **Enable**.
6. **Tags:** add Key `Project`, Value `coraxshift-lab`.
7. **Default encryption:** keep the default (server-side encryption with Amazon S3 managed keys).
8. Click **Create bucket**.

**What you should see:** your bucket listed, with the label *Objects can be public: No* or similar.

> 🔒 **Public buckets are one of the most common ways companies leak data.** Keep Block Public Access on. This course never needs a public bucket.

## Step 3: Upload a file

**Do it:** in CloudShell:

```bash
echo "Mama Ngozi's price list: rice 5kg, beans 2kg" > prices.txt
aws s3 cp prices.txt s3://$BUCKET/prices.txt
aws s3 ls s3://$BUCKET/
```

**What it does:** `cp` copies a file. `s3://bucket/key` is how you name something in S3. `ls` lists what is there.

**What you should see:**

```text
upload: ./prices.txt to s3://coraxshift-lab-.../prices.txt
2026-11-26 10:15:02         45 prices.txt
```

**If yours looks different:** `NoSuchBucket` means the name is wrong. Run `echo $BUCKET` and compare. `AccessDenied` means you are not signed in as your admin user.

## Step 4: Try to reach it from the web, and fail

**Why this matters:** private means private. You should see it blocked.

**Do it:** in the console, open the bucket → click `prices.txt` → copy the **Object URL** → paste it into a new browser tab.

**What you should see:** an **Access Denied** XML message.

**What it means:** you are signed in, but the web address on its own carries no sign-in, so S3 refuses. That is correct.

## Step 5: Share it safely with a presigned link

**Why this matters:** sometimes you must give one person one file for a short time, without making anything public.

**Do it:**

```bash
aws s3 presign s3://$BUCKET/prices.txt --expires-in 300
```

**What it does:** produces a long web address that carries a temporary signature. It stops working after **300 seconds**.

**What you should see:** a very long URL beginning `https://...s3...amazonaws.com/prices.txt?...`.

Copy it and open it in a browser tab. You should see your price list. Wait 5 minutes and refresh. You should see **Request has expired**.

> ⚠️ **Treat a presigned link like a password for that one file.** Do not post it publicly. Do not commit it to Git.

## Step 6: See versioning in action

**Why this matters:** with versioning on, overwriting or deleting a file does not destroy the old one. It is your undo button.

**Do it:**

```bash
echo "Mama Ngozi's price list: rice 5kg, beans 2kg, garri 3kg" > prices.txt
aws s3 cp prices.txt s3://$BUCKET/prices.txt
aws s3api list-object-versions --bucket $BUCKET --prefix prices.txt \
  --query 'Versions[].[Key,VersionId,IsLatest]' --output text
```

**What you should see:** **two** lines for `prices.txt`, one marked `True` (the newest) and one `False` (the old one).

Now delete the file and look again:

```bash
aws s3 rm s3://$BUCKET/prices.txt
aws s3 ls s3://$BUCKET/
aws s3api list-object-versions --bucket $BUCKET --prefix prices.txt \
  --query '[Versions[].[VersionId,IsLatest], DeleteMarkers[].[VersionId,IsLatest]]' --output text
```

**What you should see:** `ls` prints nothing (the file looks gone), but the version list still shows both versions plus a **delete marker**. Nothing was truly lost.

## Step 7: A lifecycle rule to control cost

**Why this matters:** old versions pile up and cost money. A **lifecycle rule** deletes them automatically.

**Do it:**

1. Open the bucket → **Management** tab → **Create lifecycle rule**.
2. **Name:** `expire-old-versions`. **Scope:** **Apply to all objects in the bucket** and tick the warning box.
3. **Lifecycle rule actions:** tick **Permanently delete noncurrent versions of objects** and **Delete expired object delete markers or incomplete multipart uploads**.
4. **Days after objects become noncurrent:** `30`.
5. Click **Create rule**.

**What you should see:** the rule listed as **Enabled**.

## Step 8: A folder-like layout

**Why this matters:** S3 has no real folders. A name with slashes only *looks* like one. Knowing this stops confusion later.

**Do it:**

```bash
echo "logo placeholder" > logo.txt
aws s3 cp logo.txt s3://$BUCKET/images/logo.txt
aws s3 ls s3://$BUCKET/ --recursive
```

**What you should see:** a line for `images/logo.txt`. The "folder" `images/` is just part of the name.

## Step 9: Who can do what (a peek at policies)

**Why this matters:** later you will give a server permission to use S3 without any password. That permission is a **policy**: a short JSON document.

**Do it:** read this example. **Do not apply it.** It lets someone only **read** one bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::YOUR-BUCKET-NAME",
        "arn:aws:s3:::YOUR-BUCKET-NAME/*"
      ]
    }
  ]
}
```

**What it says:** *Allow* the actions *get an object* and *list the bucket*, on this bucket and everything inside. Nothing else is allowed. **Least privilege** means giving only the permission needed, no more.

## Step 10: 🧹 Teardown and check

**Why this matters:** with versioning on, a normal delete leaves old versions and markers behind, and the bucket will refuse to delete. The console **Empty** button clears them all.

**Do it:**

1. Open **S3** → select your bucket → click **Empty**. Type `permanently delete` and confirm.
2. Back in the bucket list, select it → **Delete** → type the bucket name → confirm.
3. In CloudShell remove the local test files:

```bash
rm -f prices.txt logo.txt
aws s3 ls
aws s3api list-buckets --query 'Buckets[].Name' --output text
```

**What you should see:** neither command lists your lab bucket. (They may list other buckets that are not yours to delete, such as ones AWS created. Leave those alone.)

**If yours looks different:** "The bucket you tried to delete is not empty" means versions remain. Use **Empty** in the console, not `aws s3 rm`.

## ✅ Recap

- An **S3 bucket** holds **objects**. Names are unique worldwide.
- Keep **Block Public Access** on. Use a **presigned link** to share one file briefly.
- **Versioning** keeps old copies, like an undo button, and the old copies cost money.
- A **lifecycle rule** deletes old things automatically.
- A **policy** says exactly who may do what. Give the least needed.
- **Empty** the bucket before you delete it.

## 📤 Push to your portfolio

In `aws/class-4/` add:

1. `notes.md`: *What is a bucket? Why keep it private? What does versioning protect against? What is a presigned link?*
2. A screenshot of **Access Denied** from Step 4 and of the version list from Step 6
3. Your own lifecycle rule written in plain words

Next up: [Class 5: A database (RDS)](class-5-database-rds.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-your-own-network-vpc.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 5 ➡️](class-5-database-rds.md)</td></tr></table>
