# Class 2: Editors, Installing Software, Permissions, Ownership, Users, Archives

**Linux for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Last class you learned to find your way around. Today you start *setting a server up*: writing files, installing real software, and deciding who is allowed to touch what. Permissions sound scary, but by the end of today `755` and `644` will read like plain English.

> 📖 **From my café:** My customers could use the browsers but not the settings, and only I held the admin password. Permissions on Linux are the same idea: who may read, who may change, who may run.

**By the end of this class you can:**

- Edit a file with `nano`
- Install software with `apt` and explain what `sudo` does
- Read permissions like `-rw-r--r--` and change them with `chmod`
- Change who owns a file with `chown`
- Check your user and groups
- Pack and unpack files with `tar` and `zip`

## 💰 Cost and cleanup

| | |
|---|---|
| **Cost** | $0. Installing Nginx and a few small tools from Ubuntu's free package repository costs nothing. |
| **If forgotten** | A running Codespace uses your free monthly hours. It stops itself after a period of no use, but stop it yourself when you finish |
| **Clean up** | Close the terminal, then in GitHub open **Codespaces** and choose **Stop codespace**. Your files in `practice/` stay for next time |

## Prerequisites

- [Class 1](class-1-linux-intro.md) completed (you should have a `practice/lab` folder with `hello.txt` in it)
- Your Codespace open with a terminal

## Step 0: Go to home base

**Why this matters:** starting from the same folder means every command below works exactly as written.

```bash
cd /workspaces/linux-for-beginners
ls practice/lab/
```

**What you should see:**

```text
hello.txt
```

**If yours looks different:** `No such file or directory` means the practice folder is missing (a new Codespace starts fresh). Recreate it:

```bash
mkdir -p practice/lab && echo "Hello Coraxshift" > practice/lab/hello.txt
```

## Step 1: Write a note with the nano editor

**Why this matters:** on servers there is no Word or Notepad. You edit settings in the terminal. `nano` is the friendliest terminal editor, like a pocket notebook.

**Run it:**

```bash
nano practice/lab/note.txt
```

The terminal turns into an editor. Type:

```text
This is my first Linux note
```

Then save and exit:

1. Press **Ctrl + O** (write **O**ut), then **Enter** to confirm the file name
2. Press **Ctrl + X** to exit

The shortcuts are listed at the bottom of the nano screen. `^` means the **Ctrl** key.

Now read your file back:

```bash
cat practice/lab/note.txt
```

**What each command does:** `nano file` opens (or creates) the file in the editor. `cat` prints it so you can check it saved.

**What you should see:**

```text
This is my first Linux note
```

**If yours looks different:**

- Empty output: you exited without saving. Open nano again, type the line, and press **Ctrl + O**, **Enter**, **Ctrl + X**.
- Stuck inside nano? **Ctrl + X** exits. If it asks *Save modified buffer?*, press **Y** then **Enter**.

## Step 2: Install software with apt and sudo

**Why this matters:** `apt` is your server's app store. `sudo` borrows the administrator's key for a single command, because installing software changes the whole system. Today you install **Nginx**, the web server you will use for the rest of the course.

**Run it:**

```bash
sudo apt update
sudo apt install -y nginx
nginx -v
ls /var/www/html
```

**What each command does:**

| Command | What it does |
|---|---|
| `sudo apt update` | Refreshes the list of available software (like refreshing the app store). It does not install anything. |
| `sudo apt install -y nginx` | Downloads and installs Nginx. `-y` answers *yes* to the "Do you want to continue?" question. |
| `nginx -v` | Prints the installed Nginx version |
| `ls /var/www/html` | Lists the **web root**, the folder Nginx serves pages from. Installing Nginx created it. |

**What you should see** (trimmed):

```text
Hit:1 http://security.ubuntu.com/ubuntu noble-security InRelease
...
Reading package lists... Done
...
The following NEW packages will be installed:
  nginx nginx-common
...
nginx version: nginx/1.24.0 (Ubuntu)
index.nginx-debian.html
```

**If yours looks different:**

- A newer Nginx version number is fine.
- `Could not get lock /var/lib/dpkg/lock`: another install is running (Codespaces sometimes updates itself just after opening). Wait a minute and try again.
- `Temporary failure resolving` or download errors: a network hiccup. Wait and rerun `sudo apt update`. Never add an unknown software source to fix it.
- A message about Nginx not starting is normal in some containers. You will start it yourself in Class 3.
- Don't run `sudo apt upgrade` in your Codespace. It is slow and not needed for this course.

## Step 3: Read and change permissions

**Why this matters:** permissions decide who can **r**ead, **w**rite (change) or e**x**ecute (run) a file. Think of a shared office: everyone can read the noticeboard, only the manager can change it.

**Run it:**

```bash
ls -l practice/lab/note.txt
chmod 600 practice/lab/note.txt
ls -l practice/lab/note.txt
chmod 644 practice/lab/note.txt
ls -l practice/lab/note.txt
```

**What each command does:** `ls -l` shows the permissions at the start of the line. `chmod` (*change mode*) changes them. `600` means *only me*; `644` means *I can change it, everyone can read it*.

**What you should see:**

```text
-rw-rw-r-- 1 codespace codespace 28 Nov 19 23:16 practice/lab/note.txt
-rw------- 1 codespace codespace 28 Nov 19 23:16 practice/lab/note.txt
-rw-r--r-- 1 codespace codespace 28 Nov 19 23:16 practice/lab/note.txt
```

**How to read `-rw-r--r--`:**

```text
 -    rw-    r--    r--
 |     |      |      |
type owner  group  others
```

| Part | Meaning |
|---|---|
| First character | `-` is a file, `d` is a directory (folder) |
| Next 3 | What the **owner** can do |
| Next 3 | What the **group** can do |
| Last 3 | What **everyone else** can do |

**The numbers are just a shortcut.** Add up: **r = 4, w = 2, x = 1**.

| Number | Letters | Meaning | Typical use |
|---|---|---|---|
| `7` | `rwx` | read, write, run | Owner of a script or folder |
| `6` | `rw-` | read, write | Owner of a normal file |
| `5` | `r-x` | read, run | Others entering a folder |
| `4` | `r--` | read only | Others reading a web page |
| `0` | `---` | nothing | Private files |

So:

- **`644`** = owner `rw-`, group `r--`, others `r--`. Normal files such as web pages.
- **`755`** = owner `rwx`, group `r-x`, others `r-x`. Folders and scripts. (For a folder, `x` means *allowed to enter it*.)
- **`600`** = owner `rw-`, nobody else anything. Private files such as keys.
- **`777`** = everyone can do everything. ⛔ **Never use it.** It is like leaving your front door open with a sign saying "help yourself".

**If yours looks different:**

- Your first line may already show `-rw-r--r--`. Different systems start with slightly different defaults. That's fine; the last two lines should match.
- `Operation not permitted`: you are changing a file you don't own. Check the owner with `ls -l`.

## Step 4: Change who owns a file with chown

**Why this matters:** every file has an **owner** and a **group**. Permissions only make sense once you know who the owner is. `chown` (*change owner*) hands a file to someone else, like handing over the keys to a flat.

**Run it:**

```bash
sudo touch /tmp/owner-demo.txt
ls -l /tmp/owner-demo.txt
sudo chown codespace:codespace /tmp/owner-demo.txt
ls -l /tmp/owner-demo.txt
rm /tmp/owner-demo.txt
```

**What each command does:**

| Command | What it does |
|---|---|
| `sudo touch /tmp/owner-demo.txt` | Creates an empty file **as the administrator (root)**, so root owns it |
| `ls -l` | Shows owner and group in the 3rd and 4th columns |
| `sudo chown codespace:codespace file` | Makes `codespace` the owner and `codespace` the group. The pattern is `owner:group`. |
| `rm` | Tidies up. You can delete it now because you own it. |

**What you should see:**

```text
-rw-r--r-- 1 root root 0 Nov 19 23:16 /tmp/owner-demo.txt
-rw-r--r-- 1 codespace codespace 0 Nov 19 23:16 /tmp/owner-demo.txt
```

**If yours looks different:**

- `invalid user: 'codespace:codespace'`: your username is different. Run `whoami` and use that name instead.
- **Safety rule:** only `chown` files you created for practice. Changing owners in system folders like `/etc` or `/usr` can break your system.

> 💡 **Real-world note:** website files under `/var/www/html` stay owned by `root`. Nginx only needs to *read* them, so it doesn't need to own them. Giving a web server ownership of files it only serves is a common security mistake.

## Step 5: Check your user and groups

**Why this matters:** a **group** is a team of users who share permissions, like a team key that opens the meeting room. Checking your user and groups is the first thing to do when you see "Permission denied".

**Run it:**

```bash
whoami
id
groups
grep codespace /etc/passwd
```

**What each command does:**

| Command | What it does |
|---|---|
| `whoami` | Your username |
| `id` | Your user ID (uid), main group (gid) and all your groups |
| `groups` | Just the names of your groups |
| `grep codespace /etc/passwd` | Searches the list of users (`/etc/passwd`) for lines containing `codespace`. It holds no passwords, despite the name. |

**What you should see** (from our test lab):

```text
codespace
uid=1000(codespace) gid=1000(codespace) groups=1000(codespace)
codespace
codespace:x:1000:1000::/home/codespace:/bin/bash
```

**If yours looks different:** a real Codespace usually lists more groups (for example `sudo` or `docker`). That's normal. Don't create new users in your Codespace; on a real server you would use `sudo adduser <name>`.

## Step 6: Pack and unpack files with tar and zip

**Why this matters:** an archive bundles many files into one, like packing a suitcase. Compression squeezes it smaller, like vacuum-packing. Engineers use this for backups and moving files between servers.

**Run it:**

```bash
cd practice/lab
tar -czf notes.tar.gz note.txt hello.txt
ls -lh
tar -tzf notes.tar.gz
mkdir -p extract && tar -xzf notes.tar.gz -C extract
ls extract/
```

**What each command does:**

| Command | What it does |
|---|---|
| `tar -czf notes.tar.gz note.txt hello.txt` | **c**reate an archive, g**z**ip-compress it, save to the **f**ile `notes.tar.gz` |
| `ls -lh` | Lists files with **h**uman-readable sizes |
| `tar -tzf notes.tar.gz` | Lis**t**s what is inside without unpacking |
| `tar -xzf notes.tar.gz -C extract` | E**x**tracts into the `extract` folder (`-C` means *into this folder*) |

**What you should see:**

```text
total 5.0K
-rw-rw-r-- 1 codespace codespace  17 Nov 19 23:16 hello.txt
-rw-r--r-- 1 codespace codespace  28 Nov 19 23:16 note.txt
-rw-rw-r-- 1 codespace codespace 197 Nov 19 23:16 notes.tar.gz
note.txt
hello.txt
hello.txt  note.txt
```

😮 **Wait, the archive (197 bytes) is bigger than the two files (45 bytes)!** That's because every archive carries a small "label" (headers). For tiny files the label is bigger than the contents, like a huge box for one ring. Compression shines on big files. Try it:

```bash
seq 1 100000 > numbers.txt
tar -czf numbers.tar.gz numbers.txt
ls -lh numbers.txt numbers.tar.gz
```

`seq 1 100000` writes the numbers 1 to 100,000, one per line.

```text
-rw-rw-r-- 1 codespace codespace 211K Nov 19 23:16 numbers.tar.gz
-rw-rw-r-- 1 codespace codespace 576K Nov 19 23:16 numbers.txt
```

576K squeezed to 211K, about a third of the size. 🎉

Now try **zip**, the format Windows and macOS use, then go back to home base:

```bash
cd /workspaces/linux-for-beginners
sudo apt install -y zip unzip
zip practice/lab/notes.zip practice/lab/note.txt
unzip -l practice/lab/notes.zip
```

**What you should see** (trimmed):

```text
  adding: practice/lab/note.txt (stored 0%)
Archive:  practice/lab/notes.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
       28  2026-11-19 23:16   practice/lab/note.txt
---------                     -------
       28                     1 file
```

`stored 0%` means the file was too small to be worth compressing. `unzip -l` lists the contents without extracting.

**If yours looks different:** `zip is already the newest version` just means it was already installed. That's fine.

## ✅ Recap

- `nano` edits files: **Ctrl + O** saves, **Ctrl + X** exits.
- `sudo apt update` refreshes the app store, `sudo apt install -y <name>` installs.
- `rwx` = read, write, run, for **owner / group / others**. r=4, w=2, x=1.
- `644` for files people read, `755` for folders and scripts, `600` for private files, **never `777`**.
- `chown owner:group file` changes who owns a file.
- `tar -czf` packs, `tar -tzf` lists, `tar -xzf` unpacks. Compression helps big files, not tiny ones.

## 📤 Push to your portfolio

In your portfolio repository, answer in your own words:

1. What is the difference between `755` and `644`? When would you use each?
2. What does `chown` do? Give one example of when you would use it.
3. Why did the tiny archive end up bigger than the files inside it?

Next up: [Class 3: Processes, networking, scripts and your first web page](class-3-processes-networking-scripting.md). 💪

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-linux-intro.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-processes-networking-scripting.md)</td></tr></table>
