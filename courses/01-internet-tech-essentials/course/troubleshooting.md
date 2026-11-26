# Troubleshooting

**Internet & Tech Essentials · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Commands

| What you see | What it may mean | Try this |
|---|---|---|
| `ping` says the name could not be found or resolved | The name lookup (DNS) failed | Run `nslookup google.com`. Check your connection and any VPN |
| `ping` times out | Ping replies may be blocked, or the route is unavailable | Do not assume DNS failed. Try `nslookup`, and try opening a known website in your browser |
| `ping 8.8.8.8` works but `ping google.com` fails | The road works, **DNS is the problem** | Check your DNS settings. Ask your instructor. Do not change router settings unless you own the router |
| `nslookup` times out | Your DNS server is unreachable, or the network blocks it | Check Wi-Fi or VPN settings |
| `'ping' is not recognized` | You typed it somewhere that is not a terminal | Open Command Prompt (Windows) or Terminal (Mac or Linux) |
| `ping` never stops (Mac, Linux) | That is normal there | Press **Ctrl + C** |

## VS Code

| What you see | What it may mean | Try this |
|---|---|---|
| The terminal does not open | A startup problem | Use **Terminal → New Terminal** from the menu. Close and reopen VS Code |
| `ls` is not recognised (Windows) | `ls` is a Mac and Linux command | Use `dir` |
| `whoami` shows something different from what you expected | You are in a different account or session | Check which terminal and machine you opened. Do not share personal details publicly |
| The Codespace will not start | You may have used up your free hours | Check **Settings → Billing** on GitHub, or use desktop VS Code |

## Portfolio and GitHub

| What you see | What it may mean | Try this |
|---|---|---|
| You cannot find **Upload files** | You are not inside your repository | Open your `my-devops-portfolio` repository first |
| A folder is missing | A folder is created by typing its name with a `/` | Create a new file called `essentials/class-1.md` |
| A domain opens the wrong website | A cache, or a spelling mistake | Check the spelling and the DNS answer. DNS changes can take time. Do not edit records you do not own |

## Remember

- A reply to `ping` proves only that one destination answered. It does not prove every website works.
- Use more than one test, and say what each one does and does not prove.

## When you ask for help

Include these five things (see [Class 3](class-3-asking-for-help.md)):

1. What you were trying to do
2. What you did
3. What you expected
4. What you saw, with the **exact** error
5. What you already tried

Never include passwords, tokens or personal details.
