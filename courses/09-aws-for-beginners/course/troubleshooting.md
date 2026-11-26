# Troubleshooting

**AWS for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

> 🔴 **If something might be costing money and you cannot find it:** stop clicking, run `bash scripts/aws-cleanup-check.sh`, and send the output to your instructor.

## Account and sign-in

| What you see | Most likely reason | Safe next step |
|---|---|---|
| Account "not yet activated" | New accounts take a few minutes, sometimes longer | Wait, then try again. Check the email AWS sent |
| MFA codes rejected | Phone clock is wrong, or you used the same code twice | Set the phone clock to automatic, wait for a fresh code each time |
| `Arn` in `get-caller-identity` ends with `root` | You are signed in as root | Sign out and use your admin user |
| Cannot see Billing as the admin user | Billing access for IAM users is not turned on | Class 1, Step 5, done once as root |
| Budget shows $0.00 | Billing data is delayed | Check again tomorrow |
| CloudShell will not start | Wrong region, or a temporary problem | Check the region, then try again in a minute |

## Servers (EC2)

| What you see | Most likely reason | Safe next step |
|---|---|---|
| Website does not load | The page needs a minute, no HTTP rule, no public IP, or you typed `https://` | Wait a minute. Check the HTTP port 80 rule, the public IPv4 address and that you typed `http://` |
| Page worked, then stopped after a stop and start | The public IP changed | Copy the new address |
| Browser **Connect** fails | The SSH port 22 rule is missing. "My IP" does not work with the browser button, because it connects from AWS's own addresses | Add SSH from Anywhere for the lab only, and remove it afterwards |
| `vCPU limit` or "not eligible" | New account limits or a type not allowed | Choose `t3.micro` or the type marked free tier eligible, wait and retry |
| Security group will not delete | It is still attached to something | Terminate the instance or delete the load balancer first. Check **Network Interfaces** |
| `dnf: command not found` | The server is not Amazon Linux 2023 | Relaunch with Amazon Linux 2023 |
| User data did nothing | Script was pasted without the `#!/bin/bash` first line, or has typos | Read `/var/log/cloud-init-output.log` on the server: `sudo tail -50 /var/log/cloud-init-output.log` |

## Network (VPC)

| What you see | Most likely reason | Safe next step |
|---|---|---|
| Server in a public subnet unreachable | No route to the internet gateway, or no public IP | Check the route table has `0.0.0.0/0` to `igw-`, and the instance has a public IPv4 address |
| User data fails to download software | Private subnet with no NAT, or no public IP | Use the public subnet with a public IP for labs |
| Cannot delete a VPC | Something still lives in it | Check instances, load balancers and **Network Interfaces** |
| A **NAT gateway** appeared | The wizard default was left | Delete it, then release its Elastic IP. Check **Elastic IPs** |

## Storage and database

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `BucketAlreadyExists` | Names are unique worldwide | Choose a more unusual name |
| `AccessDenied` on your own file from a browser link | The link carries no sign-in, which is correct | Use `aws s3 presign` |
| Bucket will not delete | Old versions remain | Use **Empty** in the console, then delete |
| Cannot connect to the database | Security group, wrong endpoint, wrong password | `db-sg` must allow 3306 **from `app-sg`**; the server must wear `app-sg`; check the endpoint and password |
| Database creation takes ages | Normal for 5 to 10 minutes | Wait. Do not click create twice |
| Snapshot still there after deleting the database | Snapshots outlive the database | RDS → Snapshots → delete the ones you made |

## Load balancer, DNS, alarms

| What you see | Most likely reason | Safe next step |
|---|---|---|
| Targets stay **unhealthy** | Security group does not allow `alb-sg` to reach port 80, or the page has not been created yet | Check `asg-web-sg` rule. Wait 5 minutes. Confirm the servers have public IPs |
| Load balancer DNS name times out | `alb-sg` has no HTTP rule, or no public subnets | Check security group and subnet choice |
| `503` from the load balancer | No healthy servers yet | Wait for the targets to turn healthy |
| The Auto Scaling group keeps rebuilding servers | You terminated a server but the group wants 2 | That is correct. Delete the **group** to stop it |
| `getent hosts` prints nothing | Private zone not linked to the VPC, DNS settings off, or a typo | Check the zone type, its VPC list and the VPC DNS options |
| Alarm email never arrives | Subscription not confirmed, or wrong topic | Confirm the email link in SNS. Test with `set-alarm-state` |
| No **Billing** metrics | Billing alerts not enabled, or not in us-east-1 | Class 1, Step 8, then wait a day |

## 🆘 The panic button

If you are afraid you broke something or are being charged:

1. **Do not delete things you do not recognise.**
2. Run `bash scripts/aws-cleanup-check.sh` and read it. It only lists. It changes nothing.
3. Send the output, and a screenshot of **Billing → Charges by service** (account number cropped), to your instructor.
