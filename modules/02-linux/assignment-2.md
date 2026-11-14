

# **Assignment 2: Deploy CoraxReads Locally with Nginx + Maintenance Drill**

Time: 120 to 180 minutes
Level: Beginner to Intermediate
Submit in: Your portfolio repo, in folder modules/02-linux/assignment-2
Rule: No AWS and no EC2. Use Codespaces as a temporary practice environment, not as a production server.

## **Overview**

You will serve a practice page locally with Nginx, then act as an on-call engineer and do a maintenance drill.

## **Scenario**

CoraxReads wants a site. You will serve a practice page in a Codespace with Nginx, personalize it, check health, logs, and resources, then recover from two safe practice failures.

## **Learning Outcomes**

1. Use Linux commands to navigate, create, and manage files
2. Explain permissions, users, and processes
3. Deploy a static site with Nginx locally
4. Check logs, resources, and ports
5. Break and fix Nginx safely, with test before restart

## **Rules**

1. Write in your own words.
2. Screenshots should show the relevant Codespace and terminal output. Use a display name; do not expose personal information you do not want to share.
3. Do not paste passwords, tokens, or keys.
4. Keep Tasks 1 to 9 in order.

## **Task 1 - Setup and Verify Linux**

Steps: Run cat /etc/os-release, whoami, pwd, hostname, uptime, free -h, df -h
What to submit: Screenshot 1 - Output of uptime, free -h, df -h

## **Task 2 - Install Nginx**

Steps: Run `sudo apt update`, then `sudo apt install -y nginx`. Check the version with `nginx -v`, start it with `sudo service nginx start`, check it with `sudo service nginx status`, and test the page with `curl -I http://localhost`.
What to submit: Screenshot 2 - Output of `curl -I http://localhost` showing a successful response, and the Nginx version.

## **Task 3 - Personalize CoraxReads**

Steps: Create `index.html` with CoraxReads and a display name (a first name or chosen name is fine). For example:

```bash
echo '<h1>CoraxReads</h1><h2>Made by: Your Display Name</h2><p>Date: DD-MM-YYYY</p>' | sudo tee /var/www/html/index.html
```

What to submit: Screenshot 3 - Output of `cat /var/www/html/index.html`. Do not include personal details you do not want to share.

## **Task 4 - Deploy with Correct Permissions**

Steps: Keep the practice page owned by the administrator. Set directory permissions with `sudo chmod 755 /var/www/html` and page permissions with `sudo chmod 644 /var/www/html/index.html`. Check with `ls -l /var/www/html`, test with `sudo nginx -t`, and only if the test succeeds, run `sudo service nginx restart`. Verify with `curl http://localhost`.
What to submit: Screenshot 4 - Output of `ls -l /var/www/html` and `sudo nginx -t` showing the syntax test succeeded.

## **Task 5 - Networking and Service Check**

Steps: Run `ip a`, `ip route`, `ping -c 4 google.com`, `sudo ss -tulpn`, and `sudo service nginx status`.
What to submit: Screenshot 5 - Output of `sudo ss -tulpn` and notes: Which process is listening on port 80? Is anything listening on port 22? In Codespaces, do not expect an SSH server on port 22; the VS Code connection does not require one. Note any listener you do not recognize and ask before stopping it.

## **Task 6 - Logs and Resources**

Steps: curl http://localhost, sudo tail -n 30 /var/log/nginx/access.log, sudo tail -n 30 /var/log/nginx/error.log, uptime, free -h, df -h, sudo du -sh /var/* | sort -h
What to submit: Screenshot 6 - Output of access.log and error.log, plus notes: Were there errors? If yes, explain 1 example. If no errors, what does that mean? Were your curl requests visible? Which resource looks most critical, CPU, memory, or disk, and why? What happens if disk becomes 100 percent full?

## **Task 7 - Break and Fix Drill 1 - Nginx Config**

This drill uses a temporary test file so you do not break the real Nginx site.

1. Create the test configuration:

```bash
sudo tee /tmp/nginx-lab.conf >/dev/null <<'EOF'
events {}
http {
  server {
    listen 8081;
    location / { return 200 "Lab OK\n"; }
  }
}
EOF
```

2. Save a backup with `sudo cp /tmp/nginx-lab.conf /tmp/nginx-lab.conf.backup`.
3. Test it with `sudo nginx -t -c /tmp/nginx-lab.conf`. It should pass.
4. Open the temporary file with `sudo nano /tmp/nginx-lab.conf` and remove the semicolon after `listen 8081`.
5. Test again. It should fail. Restore the known-good copy with `sudo cp /tmp/nginx-lab.conf.backup /tmp/nginx-lab.conf`, then test again. It should pass.

Do not restart Nginx during this drill; you are only testing a temporary file.

What to submit: Screenshot 7 - The failed test and the passing test after restoring the backup, plus notes: What caused the failure? Why is testing before applying a change safer?

## **Task 8 - Break and Fix Drill 2 - Missing Web Root**

Use an empty Codespace lab. Before starting, check that `/var/www/html` exists and `/var/www/html_backup` does not. If the backup path already exists, stop and ask for help.

1. Move the web root aside: `sudo mv /var/www/html /var/www/html_backup`.
2. Create an empty web root: `sudo mkdir /var/www/html`.
3. Show the HTTP status: `curl -s -o /dev/null -w 'HTTP %{http_code}\n' http://localhost`. An HTTP error status is expected; `curl` itself may still exit successfully.
4. Restore the original folder safely: `sudo rmdir /var/www/html` (this only removes an empty directory), then `sudo mv /var/www/html_backup /var/www/html`.
5. Verify the page with `curl -I http://localhost`.

Do not use `rm -rf` for this exercise. Restore the original folder immediately.

What to submit: Screenshot 8 - The HTTP status before and after restoring the web root, plus notes: What caused the error? How did you restore the site safely?

## **Task 9 - Share Your Learning**

Steps: Write a short reflection with sections: Linux, Nginx Deploy, Logs, Resources, Break and Fix. You may publish it on LinkedIn or keep it in your private portfolio. Add one sanitized screenshot of the localhost site and one of recovery. If publishing publicly, add this credit: P.S. This post is part of CoraxShift DevOps Academy - Week 2. Learn by building: https://github.com/coraxshift-academy
What to submit: Your reflection; include the LinkedIn URL only if you choose to publish publicly.

## **Submission Checklist**

- Tasks 1 to 9 in order
- Screenshots 1 to 8 as required by the tasks, readable and sanitized
- No passwords, tokens, keys, or personal information you do not want to publish
- All writing in your own words
- Public LinkedIn post and CoraxShift credit only if you choose to publish publicly

## **Final Submission**

Submit your portfolio folder link for modules/02-linux/assignment-2. Include a LinkedIn post URL only if you chose to publish publicly.
