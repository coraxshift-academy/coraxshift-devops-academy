

# **Class 1: Linux Intro, Setup, System Control, File Navigation**

Time: 2 hours

## **Where to run commands**

You are in Codespace terminal. You are already in Ubuntu. Do not open another terminal.

## **Definitions for this class**

OS: Operating System, the main software that runs your computer.
Linux: An OS used for most servers.
Ubuntu: A version of Linux.
Distribution: A version of Linux. Ubuntu is one distribution.
Terminal: Where you type Linux commands.
Prompt: The line waiting for you to type. Example: codespace@...
Directory: Another word for folder.
Home: Your main folder. In Codespace it is /home/codespace

## **Step 1: Check your Linux**

Type:
cat /etc/os-release
whoami
pwd
hostname

What it does:
cat /etc/os-release: Shows your Linux version
whoami: Shows your Linux username. In Codespace it is codespace
pwd: Shows your current folder
hostname: Shows your computer name

Expected output:
PRETTY_NAME="Ubuntu 24.04.5 LTS"
codespace
/workspaces/coraxshift-devops-academy
Your version numbers may be slightly different. That is okay.

## **Step 2: System control commands**

Type:
uptime
free -h
df -h

What it does:
uptime: How long the server has been on, and load
free -h: Memory, in human numbers. h means human
df -h: Disk space, in human numbers

Expected output:
uptime shows 1 hour, load average numbers
free -h shows total, used, free, available
df -h shows Size, Used, Avail, Use percent

What it means: Your server has memory and disk. If disk is 100 percent full, logs stop, apps fail.

## **Step 3: File navigation commands**

You are still in terminal. Type one by one:
ls
ls -la
pwd
mkdir -p practice/week2
cd practice/week2
pwd
cd ..
ls

What it does:
ls: List files
ls -la: List all files, with details, including hidden files
mkdir -p: Make folder, p means make parent folders too
cd: Change directory. cd .. means go up one level

Expected output: You see your folders. After mkdir and cd, pwd shows .../practice/week2. After cd .., pwd shows .../practice

## **Step 4: File System Hierarchy**

Type:
ls /
ls /var
ls /var/www

What it does: Shows the top folders of Linux.

Plain words:
- / : The root, the top of everything
- /home : Where users live
- /etc : Where config files live. Example: /etc/nginx/sites-available/default
- /var : Where logs and websites live. Example: /var/log/nginx, /var/www/html
- /tmp : Temporary files

## **Step 5: Create and read a file**

Type:
echo "Hello CoraxShift" > practice/week2/hello.txt
cat practice/week2/hello.txt
cp practice/week2/hello.txt practice/week2/hello-copy.txt
mv practice/week2/hello-copy.txt practice/week2/hello-moved.txt
ls practice/week2/
rm practice/week2/hello-moved.txt
ls practice/week2/

What it does:
echo > : Write text into a file
cat: Read a file
cp: Copy a file
mv: Move or rename a file
rm: Delete a file

Expected output: After cat, you see Hello CoraxShift. After ls, you see the files. After rm, the moved file is gone.

## **Push**

Push your notes: What is Linux, what is your Ubuntu version, and what did ls / show?
