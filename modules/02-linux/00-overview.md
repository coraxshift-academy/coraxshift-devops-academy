

# **Week 2: Linux for DevOps - Local, No Cloud Yet**

Time: 3 classes, 2 hours each, plus about 3.5 hours for three required assignments. Plan for about 9.5 hours this week. Quiz at end of Week 2.
Rule: No AWS, no EC2, and no cloud account this week. Codespaces is our temporary practice environment, not a production server.

## **Codespaces is a lab, not a cloud VM**

- A Codespace is a managed development environment; it is not the same as an EC2 virtual machine.
- Forwarding port 80 gives you a route to the app. It does not give the Codespace a public IP address or create a cloud security group.
- Keep forwarded ports **Private** for this lab. Make a port public only with instructor approval and only when you understand who can access it.
- `curl http://localhost` checks the web server from inside the Codespace. It is not the same as asking an external service for your public IP.

```text
Your browser -- private forwarded port --> Codespace port 80 -> Nginx
                                                           |-> React build
                                                           |-> static portfolio page
```

## **How Week 2 works**

Class 1: Linux intro + Setup + System control + File navigation + File System Hierarchy
Class 2: Text editors + Package manager + Sudo + Permissions + Users and Groups + Compression
Class 3: Processes + Networking + System Info + Shell Scripting + Project Finalization

The three assignments are required and build on one another: deploy the React storefront, investigate its operation and recover from safe test failures, then add a separate static portfolio page. Node.js is needed for Assignment 2A; use the version and setup guidance in [Getting Started](../../GETTING-STARTED.md).

## **Where to run commands**

In Codespaces, the provided terminal is Linux. This lab uses `service` to manage Nginx in its container:
- Start Nginx: sudo service nginx start
- Check Nginx: sudo service nginx status
- Test Nginx config: sudo nginx -t

Some Linux virtual machines use `systemctl` instead. Use the command taught for the environment you are in. If the command is unavailable, stop and ask for help rather than guessing.

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
2. A production build of CoraxReads served locally by Nginx
3. An operations report covering service health, logs, resources, and recovery
4. A separate static portfolio page served alongside CoraxReads
5. Your first shell script that checks your server

## **Pass check for Week 2**

- You can navigate, create, copy, move, delete files with Linux commands
- You can explain permissions with rwx in plain words
- You can build a React app and serve its static production files through Nginx
- You can open both Nginx sites through a privately forwarded Codespaces port
- You can check logs, disk, memory, listeners, and safely recover from a practice failure
- Your three assignment reports and evidence are in your own portfolio repository

## Lessons

- [Class 1: Linux, setup, and navigation](class-1-linux-intro-vm-setup-system.md)
- [Class 2: Editors, packages, permissions, and users](class-2-files-permissions-users.md)
- [Class 3: Processes, networking, and scripts](class-3-processes-networking-shell-scripting-project.md)
- [Week 2 required assignments](assignment-2.md): [2A React + Nginx](assignment-2a-react-nginx.md), [2B operations drill](assignment-2b-operations-drill.md), and [2C static portfolio site](assignment-2c-static-portfolio.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 2](quiz-week-2.md)
- [Role plays: explain Nginx](role-play-2.md) and [maintenance drill](role-play-3.md)

## Official reference

- [Ubuntu server documentation](https://ubuntu.com/server/docs)
- [Nginx beginner's guide](https://nginx.org/en/docs/beginners_guide.html)
