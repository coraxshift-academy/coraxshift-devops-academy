# Week 9 Troubleshooting

| Problem | Likely reason | Safe next step |
| --- | --- | --- |
| SSH times out | Wrong address, no route, or port 22 not allowed from your IP | Confirm instance state/address/region; check the security-group source range. Do not open SSH to the whole internet. |
| SSH says key permissions are too open | Private key file is readable by others | Use `chmod 400 KEYFILE`; keep the key outside Git. |
| SSH permission denied | Wrong username/key/identity or key pair | Confirm image username and selected key. Do not share the private key to debug. |
| Website times out | Nginx stopped or port 80 not allowed | Check service locally with `systemctl status nginx`; inspect the security group only for intended HTTP access. |
| Website returns 403/404 | Wrong web-root content or permissions | Check Nginx logs and `/var/www/html`; grant read access without making files world-writable. |
| Budget email did not arrive | Alert threshold, recipient verification, or reporting delay | Verify budget configuration and email; remember a budget is not a hard cap. |
| Unexpected charge appears | Resource remains or delayed billing report | Inspect the regional resource inventory and billing details; terminate approved lab resources and notify the instructor. |

Never solve connectivity by opening all ports to `0.0.0.0/0`. Stop and ask for review if you cannot identify a resource or its cost.
