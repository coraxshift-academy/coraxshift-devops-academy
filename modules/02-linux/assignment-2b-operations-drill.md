# Assignment 2B: CoraxReads Operations and Recovery Drill

- **Time:** 90 minutes
- **Level:** Intermediate
- **Where:** The same Ubuntu Codespace used for Assignment 2A
- **Save your report and screenshots in:** your separate learner portfolio repository

## The scenario

CoraxReads is online, but a successful page load is only one part of operating a service. You are the on-call engineer. Check the local request path, service, logs, configuration, and available resources. Then safely test two failure-and-recovery procedures.

```text
Browser -> private port forward -> Nginx :80 -> /var/www/html/coraxreads/
                                      |             |
                                      +-> logs      +-> built React files
```

## Safety rules

- Run these commands only in your own disposable Codespace.
- Keep port 80 Private. Codespaces does not require your own SSH daemon on port 22.
- Do not stop or kill unknown processes, change a cloud firewall, or expose a public IP.
- The configuration failure uses a temporary test file. Do not restart the real Nginx service with a broken configuration.
- Restore the web folder immediately after the short missing-content test. Never delete the only copy.

## Task 1 - Check traffic and listeners

Open `http://localhost/coraxreads/` in your browser, then run:

```bash
ip a
ip route
sudo ss -ltnp '( sport = :80 )'
sudo service nginx status
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/coraxreads/
```

- `ip a` shows the Codespace network interfaces and assigned addresses.
- `ip route` shows how the container routes network traffic.
- `ss` filters listening TCP sockets to port 80 and shows the process when available.
- `service` checks that Nginx is active.
- `curl` makes a local request and should print `HTTP 200`.

**Write in your own words:** What output shows Nginx is listening on port 80? Is port 22 present? In Codespaces it is normal not to see an SSH listener; the editor connection is managed by the platform. Record any listener you do not recognize, and ask before stopping anything.

## Task 2 - Confirm service and configuration health

```bash
sudo nginx -t
sudo service nginx status
grep -nE 'root|try_files' /etc/nginx/sites-enabled/default
```

`nginx -t` validates the active configuration. `grep` prints only the lines that select the default site's web root or request fallback; it avoids dumping the entire server configuration.

**Expected result:** the configuration test succeeds, Nginx is active, and the site's root is under `/var/www/html`. A default Nginx config may not contain a `try_files` line; the React app is served as a static directory, so do not edit the config just to make this grep produce output.

**Write in your own words:** If a production Nginx restart failed, what would users experience? What would you inspect before making another change? For this lab, a safe first response is to read the error, restore a known-good configuration, run `nginx -t`, and only then restart.

## Task 3 - Generate a request and read the logs

```bash
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/coraxreads/
sudo tail -n 20 /var/log/nginx/access.log
sudo tail -n 20 /var/log/nginx/error.log
sudo journalctl -u nginx --no-pager -n 20
```

The `curl` request should print `HTTP 200`. The access log records requests; the error log records Nginx problems. `journalctl` may be unavailable or empty in a Codespace that does not use systemd; the service status and Nginx log files are the primary checks here.

**Write in your own words:**

1. Can you find your recent `GET /coraxreads/` request in the access log? What does that prove?
2. Did you find any recent error? If so, explain one line in plain language. If not, say only that no recent error was recorded during this check; do not claim the system can never fail.

## Task 4 - Review capacity signals

```bash
uptime
free -h
df -h /
sudo du -sh /var/log/nginx
```

`uptime` shows how long the container has run and a load average; `free -h` shows memory; `df -h /` shows filesystem use; `du` shows how much space the Nginx logs occupy.

Codespaces resource limits differ from production servers. Treat these numbers as a practice snapshot, not a capacity guarantee.

**Write in your own words:** Which reading deserves attention right now, and why? What might stop working if a real server's disk became full? Mention that logs and application writes can fail; avoid assuming the same threshold applies to every service.

## Task 5 - Simulate a syntax failure without breaking Nginx

First check that the temporary filenames are available:

```bash
if [ -e /tmp/nginx-lab.conf ] || [ -e /tmp/nginx-lab.conf.backup ]; then
  echo "Stop: a previous lab file exists; ask for help before continuing."
else
  echo "Temporary lab paths are clear."
fi
```

Continue only if the output says the paths are clear. Create a separate test configuration:

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
sudo cp -a /tmp/nginx-lab.conf /tmp/nginx-lab.conf.backup
sudo nginx -t -c /tmp/nginx-lab.conf
```

The first test should pass. Now edit only the temporary file:

```bash
sudo nano /tmp/nginx-lab.conf
```

Remove the semicolon from `listen 8081;`, save, and test again:

```bash
sudo nginx -t -c /tmp/nginx-lab.conf
```

The test should fail and identify the temporary file and line. Restore the known-good copy and confirm:

```bash
sudo cp -a /tmp/nginx-lab.conf.backup /tmp/nginx-lab.conf
sudo nginx -t -c /tmp/nginx-lab.conf
```

The test should pass again. `-c` tells Nginx to check the named temporary config; do **not** restart or reload the active service during this drill.

**Write in your own words:** What syntax error did you introduce? Why does testing a candidate config before applying it reduce risk?

## Task 6 - Simulate missing deployment files and recover

Check that the deployed site exists and the recovery name is unused:

```bash
test -d /var/www/html/coraxreads && echo "Deployed site exists"
test ! -e /var/www/html/coraxreads.offline && echo "Recovery name is available"
```

If either expected line is missing, stop and ask for help. Move the deployed folder aside; do not delete it:

```bash
sudo mv /var/www/html/coraxreads /var/www/html/coraxreads.offline
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/coraxreads/
```

The temporary request should return a non-200 status, usually `404`. Restore the original folder immediately and check again:

```bash
sudo mv /var/www/html/coraxreads.offline /var/www/html/coraxreads
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/coraxreads/
```

The final result should be `HTTP 200`. This drill moves only the dedicated React folder; it does not remove `/var/www/html` or the default site.

**Write in your own words:** What caused the temporary failure? Which command restored the files? In a production deployment, name one safeguard such as keeping a release copy, deploying to a new versioned folder, or having a tested rollback plan.

## Security and reliability notes

Add a short section to your report that explains:

- Why passwords, tokens, or private SSH keys must not be pasted into screenshots or Git.
- Why production servers should expose only the network ports their service needs.
- Why starting a service at boot matters on a persistent VM, while a Codespace is a temporary lab.
- Why teams stop or remove cloud resources they no longer need. This Week 2 lab creates no cloud resources.

## Submit

Include sanitized evidence of the listener/status, successful config test, recent access log entry, resource snapshot, failed-and-restored temporary config test, and missing-content failure/recovery. Add your written answers. Do not publish a public IP, account identifier, or credential.
