

# **Assignment 2: Deploy CoraxReads Locally with Nginx + Maintenance Drill**

Time: 120 to 180 minutes
Level: Beginner to Intermediate
Submit in: Your portfolio repo, in folder modules/02-linux/assignment-2
Rule: No AWS, no EC2. Use Codespaces as your server.

## **Overview**

You will deploy a site locally with Nginx, then act as on-call engineer and do a maintenance drill.

## **Scenario**

CoraxReads wants a site. You will deploy it in Codespace with Nginx, personalize it, then check health, logs, resources, and recover from two breaks.

## **Learning Outcomes**

1. Use Linux commands to navigate, create, and manage files
2. Explain permissions, users, and processes
3. Deploy a static site with Nginx locally
4. Check logs, resources, and ports
5. Break and fix Nginx safely, with test before restart

## **Rules**

1. Write in your own words.
2. All screenshots must show your own Codespace, your own username codespace, your own terminal.
3. Do not paste passwords, tokens, or keys.
4. Keep Tasks 1 to 8 in order.

## **Task 1 - Setup and Verify Linux**

Steps: Run cat /etc/os-release, whoami, pwd, hostname, uptime, free -h, df -h
What to submit: Screenshot 1 - Output of uptime, free -h, df -h

## **Task 2 - Install Nginx and Node**

Steps: sudo apt update -y, sudo apt install -y nginx nodejs npm, then nginx -v, node -v, npm -v, sudo service nginx start, sudo service nginx status, curl -I http://localhost
What to submit: Screenshot 2 - Output of curl -I http://localhost showing 200 OK, and nginx -v

## **Task 3 - Personalize CoraxReads**

Steps: Create index.html with your Full Name and Date. Use: echo '<h1>CoraxReads</h1><h2>Deployed by: Your Full Name</h2><p>Date: DD-MM-YYYY</p>' | sudo tee /var/www/html/index.html
What to submit: Screenshot 3 - Output of cat /var/www/html/index.html showing your name

## **Task 4 - Deploy with Correct Permissions**

Steps: sudo chown -R www-data:www-data /var/www/html, sudo chmod -R 755 /var/www/html, ls -l /var/www/html, sudo nginx -t, sudo service nginx restart, curl http://localhost
What to submit: Screenshot 4 - Output of ls -l /var/www/html and nginx -t showing syntax is ok

## **Task 5 - Networking and Service Check**

Steps: ip a, ip route, ping -c 4 google.com, sudo ss -tuln, sudo service nginx status
What to submit: Screenshot 5 - Output of sudo ss -tuln showing port 80, plus notes: What proves Nginx is listening on 80? What proves SSH is active on 22? Any unexpected ports?

## **Task 6 - Logs and Resources**

Steps: curl http://localhost, sudo tail -n 30 /var/log/nginx/access.log, sudo tail -n 30 /var/log/nginx/error.log, uptime, free -h, df -h, sudo du -sh /var/* | sort -h
What to submit: Screenshot 6 - Output of access.log and error.log, plus notes: Were there errors? If yes, explain 1 example. If no errors, what does that mean? Were your curl requests visible? Which resource looks most critical, CPU, memory, or disk, and why? What happens if disk becomes 100 percent full?

## **Task 7 - Break and Fix Drill 1 - Nginx Config**

Steps: sudo nano /etc/nginx/sites-available/default, remove ; from try_files $uri /index.html; line, run sudo nginx -t, see FAIL, re-add ;, run sudo nginx -t, see OK, sudo service nginx restart, curl -I http://localhost
What to submit: Screenshot 7 - Output of nginx -t FAIL, then OK, then curl 200 OK, plus notes: What caused failure? How did you fix? How to avoid in production?

## **Task 8 - Break and Fix Drill 2 - Missing Web Root**

Steps: sudo mv /var/www/html /var/www/html_backup, sudo mkdir -p /var/www/html, curl -I http://localhost, see fail, then sudo rm -rf /var/www/html, sudo mv /var/www/html_backup /var/www/html, sudo service nginx restart, curl -I http://localhost, see 200 OK
What to submit: Screenshot 8 - Output of curl fail, then curl 200 OK, plus notes: What caused break? How did you fix? How to prevent in production?

## **Task 9 - LinkedIn Post**

Steps: Write LinkedIn post with sections: Linux, Nginx Deploy, Logs, Resources, Break and Fix. Add 1 screenshot of localhost site and 1 of recovery. Add credit: P.S. This post is part of CoraxShift DevOps Academy - Week 2. Learn by building: https://github.com/coraxshift-academy
What to submit: Screenshot 9 - Published LinkedIn post plus URL.

## **Submission Checklist**

- Tasks 1 to 9 in order
- Screenshots 1 to 9, readable, with your username
- No secrets exposed
- All writing in your own words
- LinkedIn post with CoraxShift credit

## **Final Submission**

Submit your portfolio folder link for modules/02-linux/assignment-2 plus your LinkedIn post URL.
