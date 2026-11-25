# Role Play 3: On-Call Engineer: "The Site Is Slow"

**Linux for Beginners · Coraxshift DevOps Academy** · ⏱️ 15 minutes (after Class 3; revisit after Assignment B)

## Why we do this

When something breaks, people panic. The engineer who stays calm and checks things **in order** is the one everyone trusts. This role play builds that habit.

## Prerequisites

- [Class 3](class-3-processes-networking-scripting.md) completed
- Even better: [Assignment B](assignment-b-operations-drill.md) completed, so you've seen real failures and recoveries

## The scenario

Your 2048 game is running behind Nginx in your Codespace, and Uptime Kuma is watching it. Your manager calls:

> "Users say the game is slow, and the monitoring dashboard shows red. What do you check first?"

## Your job

In **about 1 minute**, explain what you check, **in order**, in plain words.

## Example script (make it your own)

> "First, I check whether Nginx is running with `service nginx status`, and whether Uptime Kuma is running with `pgrep -a uptime-kuma`. Then I check what is listening with `sudo ss -ltnp`: I expect Nginx on ports 80 and 8080, and Uptime Kuma on 3001. Next, I ask the site directly with `curl`: `200` is good, `404` means files are missing, `502` means the app behind Nginx isn't answering. Then I read the diaries: the Nginx error log and Uptime Kuma's log. I check memory and disk with `free -h` and `df -h /`, because a full disk breaks everything. When I find the cause, I make **one** change. If it's a config change, I test it with `nginx -t` before I reload. Finally, I check again with `curl` and the Uptime Kuma dashboard to prove it's fixed. I don't expect an SSH server on port 22 in Codespaces, and I never kill a process I don't recognise."

## Pass check

- ☐ You listed your checks in a sensible order (running → listening → response → logs → resources)
- ☐ You explained logs, memory, disk and ports in plain words
- ☐ You said what `200`, `404` and `502` mean
- ☐ You mentioned **testing before reloading**
- ☐ You mentioned **verifying after the fix**

## 📤 Push to your portfolio

Write your on-call script in your portfolio, in your own words.

---

<table width="100%"><tr><td align="left">[⬅️ Role play: Explain Nginx](role-play-explain-nginx.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Quiz ➡️](quiz.md)</td></tr></table>
