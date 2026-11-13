

# **Week 2: Linux for DevOps - Local, No Cloud Yet**

Time: 3 classes, 2 hours each. Quiz at end of Week 2.
Rule: No AWS, no EC2, no cloud. We use Codespaces as our server until Week 9.

## **Decision: Codespaces replaces AWS for Week 2**

- EC2 instance = Your Codespace
- Public IP = Ports tab in Codespace, GitHub gives you a link
- Security Group = You do not need it. Just forward port 80 in Ports tab
- curl ifconfig.me = You use curl http://localhost inside Codespace

## **How Week 2 works**

Class 1: Linux intro + Setup + System control + File navigation + File System Hierarchy
Class 2: Text editors + Package manager + Sudo + Permissions + Users and Groups + Compression
Class 3: Processes + Networking + System Info + Shell Scripting + Project Finalization

## **Where to run commands**

In Codespace, you are already in Ubuntu. Your terminal at the bottom is Linux.
In Codespace, use service, not systemctl. Codespace container does not use systemctl.
- Start Nginx: sudo service nginx start
- Check Nginx: sudo service nginx status
- Test Nginx config: sudo nginx -t

In a full VM like WSL or Multipass, you can use systemctl. We show both, so no one is confused.

## **Definitions for Week 2**

Linux: The operating system we use for servers.
Ubuntu: A version of Linux, beginner friendly.
Terminal: Where you type Linux commands.
Package manager: Tool to install software. On Ubuntu it is apt.
Sudo: Run a command as admin. Example: sudo apt update
Permission: Who can read, write, or run a file.
Process: A program running right now.
Shell Script: A file with Linux commands that run one after another.
Nginx: A web server that serves your website.
Web Root: The folder Nginx serves. On Ubuntu it is /var/www/html

## **What you will build this week**

1. Your local Ubuntu lab, verified
2. Your CoraxReads site deployed locally with Nginx, at localhost
3. Your maintenance drill report: logs, resources, recovery
4. Your first shell script that checks your server

## **Pass check for Week 2**

- You can navigate, create, copy, move, delete files with Linux commands
- You can explain permissions with rwx in plain words
- You can deploy a site locally with Nginx and open it in your browser via Ports tab
- You can check logs, check disk, check memory, and recover Nginx after a break
- Your assignment folder is on GitHub
