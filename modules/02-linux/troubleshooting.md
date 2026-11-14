# Week 2 Troubleshooting

| What you see | Likely reason | Safe next step |
| --- | --- | --- |
| `apt` cannot download packages | Network/DNS issue or package mirror unavailable | Check connectivity and retry later; do not add an unknown repository. |
| `service nginx start` fails | Nginx is not installed or config has an error | Run `nginx -t`, then inspect `sudo service nginx status` and error logs. |
| `curl localhost` says connection refused | Nothing is listening on port 80 | Check service status and `sudo ss -tulpn`; start Nginx if it is your lab. |
| `curl` gives 403 | Directory index is missing or access is denied | Check `/var/www/html/index.html` exists and is readable; do not use mode 777. |
| Browser port does not open | Port was not forwarded, or is not visible to your account | Forward port 80 and keep it Private. Confirm `curl http://localhost` works inside the Codespace first. |
| `systemctl` fails in Codespaces | The container may not use systemd | Use the Week 2 `service` commands in Codespaces; use the VM-specific command only on a full VM. |
| Nginx syntax test fails | Typo, missing semicolon, or invalid directive | Read the file/line in the error, restore the last known-good config, run `nginx -t` again. |
| `ss` shows a port you do not recognize | Another lab or Codespaces service may be listening | Record it and ask before stopping anything. Do not kill unknown processes. |
| Page is missing after the drill | The backup folder was not restored | Stop editing, check `/var/www/html_backup`, and follow the restore steps. Never delete the only backup. |

## First-response sequence

```text
check service -> check listener -> check HTTP status -> read logs -> make one change -> verify again
```

Capture the exact error and command. Do not paste private access tokens, keys, or personal account information into a public issue or screenshot.
