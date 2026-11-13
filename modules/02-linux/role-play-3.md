# Role Play 3: Production Maintenance Drill - On-Call Engineer
Time: 15 minutes in Class 3

## Scenario
Your CoraxReads site is live in Codespace. Your manager calls: Site is slow. What do you check first?

## Your job
Explain in 1 minute what you check, in order, in plain words.

## Example script in your own words
First I check if Nginx is running with service nginx status. Then I check logs with tail -n 30 /var/log/nginx/error.log to see errors. Then I check resources with free -h and df -h to see if memory or disk is full. Then I check if port 80 is listening with ss -tuln. If I find a break, I fix it, test with nginx -t, restart, and check with curl -I http://localhost.

## Pass check
- You listed checks in order
- You used plain words for logs, memory, disk, port
- You mentioned test before restart
- You mentioned verify after fix

## What to push
Write your drill script in your portfolio.
