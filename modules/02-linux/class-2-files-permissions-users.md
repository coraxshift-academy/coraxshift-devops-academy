

# **Class 2: Editors, Package Manager, Sudo, Permissions, Users, Compression**

Time: 2 hours

## **Where to run commands**

You are in Codespace terminal. You are already in Ubuntu.

## **Definitions for this class**

Editor: An app to write files. In Linux we use nano.
Package manager: Tool to install software. On Ubuntu it is apt.
Sudo: Run as admin. Example: sudo apt update
Permission: Who can read (r), write (w), run (x) a file.
Owner: The user who owns the file.
Group: A set of users who share permissions.
Compression: Making files smaller to store or send. Example: tar, gzip, zip.

## **Step 1: Text editor nano**

Type:
nano practice/week2/note.txt

What it does: Opens nano editor.
Type: This is my first Linux note
Save: Press Ctrl + O, press Enter, press Ctrl + X to exit.
Then type:
cat practice/week2/note.txt

Expected output: You see your note.

## **Step 2: Package manager and sudo**

Type:
sudo apt update -y
sudo apt install -y nginx
nginx -v

What it does:
apt update: Refresh list of software
apt install: Install software. -y means yes, do not ask again
nginx -v: Shows Nginx version

Expected output: The Nginx version is shown. Your version may be different. That is okay. We install only what this week's lab needs; Node.js comes later in the course. Do not run apt upgrade -y in Codespace unless you need it, it takes long.

## **Step 3: File and Directory Permissions**

Type:
ls -l practice/week2/note.txt
chmod 644 practice/week2/note.txt
ls -l practice/week2/note.txt

What it does:
ls -l: Shows permissions like -rw-r--r--
chmod: Change permissions

Plain words for -rwxr-xr-x:
First letter: - means file, d means folder
Next 3: Owner can read, write, run. rwx
Next 3: Group can read and run, not write. r-x
Last 3: Others can read and run, not write. r-x

chmod 755 means: Owner rwx, Group r-x, Others r-x. Common for directories that people need to enter and list.
chmod 644 means: Owner rw-, Group r--, Others r--. Common for files that need to be read but not run.
chmod 777 means everyone can do everything. Do not use it in production. It is unsafe.

For this static practice page, keep the files owned by the administrator and let Nginx read them:
sudo chmod 755 /var/www/html
sudo chmod 644 /var/www/html/index.html
Nginx needs to read the page; it does not need permission to change it. Avoid making the web server the owner of files it only serves.

## **Step 4: Managing users and groups**

Type:
whoami
id
groups
cat /etc/passwd | grep codespace

What it does:
id: Shows your user id and groups
groups: Shows groups you belong to
cat /etc/passwd: Shows users on the system

Expected output: You see codespace user, with groups. Do not create a new user in Codespace unless you need to, your Codespace user is enough for Week 2. In a real VM, you would use sudo adduser newname to create a user.

## **Step 5: Compression and Archive**

Type:
cd practice/week2
tar -czf notes.tar.gz note.txt hello.txt
ls -lh
tar -tzf notes.tar.gz
mkdir -p extract && tar -xzf notes.tar.gz -C extract
ls extract/
cd ../..

What it does:
tar -czf: Create a compressed archive. c means create, z means gzip, f means file
tar -tzf: List what is inside, without extracting
tar -xzf: Extract. x means extract

Expected output: You see notes.tar.gz, smaller than the files. Extract folder has your files.

For zip:
sudo apt install -y unzip zip
zip notes.zip practice/week2/note.txt
unzip -l notes.zip

## **Push**

Push your notes: Explain 755 vs 644 in your own words, and what chown does.
