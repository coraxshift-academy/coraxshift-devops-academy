# Week 1 Troubleshooting

| What you see | What it may mean | Try this |
| --- | --- | --- |
| `ping` says name cannot be resolved | DNS lookup failed | Run `nslookup google.com`; check the network connection and DNS resolver. |
| `ping` times out | ICMP replies may be blocked, or the route is unavailable | Do not assume DNS failed; compare `nslookup` and opening a known website in the browser. |
| `nslookup` times out | Resolver is unreachable or the network blocks DNS | Check Wi-Fi/VPN settings and ask the instructor; do not change router settings without permission. |
| `whoami` output differs | You are in a different account/session | Check which terminal and machine you opened; do not share personal identifiers publicly. |
| VS Code terminal does not open | Terminal profile or workspace startup problem | Use Terminal > New Terminal; reload VS Code and inspect the terminal selector. |
| Domain opens the wrong website | DNS record/cache or browser cache differs | Verify the domain spelling and DNS answer; DNS updates may take time. Do not edit records unless you own them. |

`ping` tests whether a host responds to ICMP; it does not prove that a website or every internet service works. Use multiple checks and explain what each one does and does not prove.
