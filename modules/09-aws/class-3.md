# Class 3: Deploy, Observe, and Tear Down

**Time:** 2 hours
**Tools:** AWS Console and an SSH client or instructor-approved connection method.

## Connect without exposing credentials

Use Session Manager or browser-based EC2 Instance Connect if enabled. If the lab uses SSH:

1. Store the downloaded private key outside your repository.
2. Restrict its file permission with `chmod 400 path/to/key.pem`.
3. Confirm the security group allows port 22 only from your current IP.
4. Use the correct image username (for Ubuntu images this is commonly `ubuntu`).
5. Never share the private key or paste it into a chat.

`chmod 400` makes the key readable only by its owner. SSH rejects keys with overly broad permissions.

## Install and serve a practice page

On the approved Ubuntu instance:

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx
sudo systemctl status nginx --no-pager
printf '<h1>CoraxReads practice site</h1>\n' | sudo tee /var/www/html/index.html
sudo chmod 644 /var/www/html/index.html
curl --fail --show-error http://localhost
```

- `apt update` refreshes package metadata.
- `apt install` installs Nginx.
- `systemctl enable --now` starts the service now and at boot.
- `status` checks the service state.
- `tee` writes the simple practice page with administrator permission.
- `chmod 644` gives the web server read access without making the page executable.
- `curl` checks the local HTTP response.

Use the public address in a browser only if port 80 is intentionally open. Never open an admin or database port to the internet.

## Teardown is part of the lab

1. Save evidence without exposing keys, account IDs, or private information.
2. Stop and then terminate the EC2 instance when instructed.
3. Check for unattached EBS volumes, snapshots, load balancers, public IP allocations, and other resources.
4. Confirm the instance is terminated and no lab resources remain.
5. Review the billing dashboard later; charges can post after resource deletion.
