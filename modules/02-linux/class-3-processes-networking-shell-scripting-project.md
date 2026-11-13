

# **Class 3: Processes, Networking, System Info, Shell Scripting, Project**

Time: 2 hours

## **Where to run commands**

You are in Codespace terminal. You are already in Ubuntu.

## **Definitions for this class**

Process: A program running right now.
Port: A number door for network traffic. Example: 80 for HTTP, 22 for SSH.
Log: A file that records what happened. Example: /var/log/nginx/access.log
Shell Script: A file with Linux commands that run one after another.
Nginx: Web server that serves your website.
Web Root: Folder Nginx serves. /var/www/html

## **Step 1: Monitoring and controlling processes**

Type:
ps aux | head -n 20
ps aux | grep nginx | grep -v grep
top -b -n 1 | head -n 20

What it does:
ps aux: List processes
grep nginx: Filter only nginx lines
top: Show live processes, sorted by CPU. -b means batch, -n 1 means run once

To stop a process, you use kill with the PID. Do not kill random processes in Codespace. We only practice with nginx.
Type:
sudo service nginx start
ps aux | grep nginx

Expected output: You see nginx master and worker processes.

## **Step 2: Networking commands in Linux**

Type:
ip a
ip route
ping -c 4 google.com
sudo ss -tuln
curl -I http://localhost

What it does:
ip a: Shows network interfaces and IPs
ip route: Shows default gateway
ping -c 4: Send 4 test messages. -c means count
ss -tuln: Shows listening ports. t means TCP, u means UDP, l means listening, n means numbers
curl -I: Shows headers only, to check if site works

Expected output:
ip a shows your interfaces
ping shows 4 replies, 0 percent loss
ss shows port 80 listening
curl shows HTTP/1.1 200 OK

If curl shows 200 OK, Nginx is working.

## **Step 3: System Information Commands**

Type:
hostname
lsb_release -a
uptime
free -h
df -h
sudo du -sh /var/* | sort -h

What it does:
hostname: Computer name
lsb_release -a: Ubuntu version
uptime: How long server has been on
free -h: Memory
df -h: Disk
du -sh: Size of folders inside /var, sorted

Expected output: You see your hostname, Ubuntu 24.04, memory, disk, and /var folders sorted.

## **Step 4: Shell Scripting Introduction**

Type:
nano practice/week2/check.sh

Paste this inside nano, save with Ctrl + O, Enter, Ctrl + X:
#!/bin/bash
echo "Checking CoraxShift server..."
uptime
free -h
df -h
curl -I http://localhost

Then type:
chmod +x practice/week2/check.sh
./practice/week2/check.sh

What it does:
#!/bin/bash: Tells Linux this is a bash script
chmod +x: Make it runnable
./check.sh: Run it

Expected output: You see Checking..., uptime, memory, disk, and HTTP 200 OK.

## **Step 5: Project Finalization - Deploy CoraxReads locally**

Type:
sudo apt install -y nginx
sudo service nginx start
echo '<h1>CoraxReads</h1><h2>Deployed by: Your Full Name</h2><p>Date: DD-MM-YYYY</p>' | sudo tee /var/www/html/index.html
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
sudo nginx -t
sudo service nginx restart
curl http://localhost

What it does:
tee: Write to a file that needs sudo
nginx -t: Test Nginx config. Should say syntax is ok, test is successful
service nginx restart: Restart Nginx
curl: Fetch your site

Expected output:
nginx: syntax is ok
nginx: test is successful
Your CoraxReads HTML with your name

To see it in browser: In Codespace, click Ports tab at bottom, Forward a Port, type 80, click globe icon.

## **Push**

Push your check.sh script and your maintenance notes.
