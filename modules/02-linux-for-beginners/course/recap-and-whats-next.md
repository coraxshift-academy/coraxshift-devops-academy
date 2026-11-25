# Recap and What's Next

**Linux for Beginners · Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

## 🎉 Look how far you've come

A week ago, the terminal may have looked like a blank, blinking mystery. Now you have:

- ✅ Moved around a Linux server and managed files with confidence
- ✅ Installed real software with `apt` and used `sudo` responsibly
- ✅ Read and set permissions and ownership (`chmod`, `chown`) and know why `777` is never the answer
- ✅ Found processes, checked ports and stopped a program safely with `kill`
- ✅ Deployed a real open-source game, **2048**, with Nginx
- ✅ Run a real monitoring tool, **Uptime Kuma**, behind an Nginx reverse proxy
- ✅ Broken things on purpose and recovered like an on-call engineer
- ✅ Written your first shell script
- ✅ Built a portfolio that proves all of it

That's not "beginner stuff". These are the skills engineers use every single day.

## The whole course on one page

| Skill | Commands to remember |
|---|---|
| Where am I? | `whoami`, `pwd`, `hostname`, `cat /etc/os-release` |
| Moving around | `ls -la`, `cd`, `mkdir -p` |
| Files | `cat`, `cp`, `mv`, `rm`, `nano` |
| Health | `uptime`, `free -h`, `df -h /`, `du -sh` |
| Installing | `sudo apt update`, `sudo apt install -y <name>` |
| Permissions | `ls -l`, `chmod 644`, `chmod 755`, `chmod +x`, `chown owner:group` |
| Users | `id`, `groups` |
| Archives | `tar -czf`, `tar -tzf`, `tar -xzf`, `zip`, `unzip -l` |
| Processes | `ps aux`, `pgrep -a <name>`, `top -b -n 1`, `kill <PID>` |
| Network | `ip a`, `ip route`, `curl -I`, `sudo ss -tulpn` |
| Nginx | `sudo service nginx start/status/reload/restart`, `sudo nginx -t` |
| Logs | `sudo tail -n 20 /var/log/nginx/access.log`, `.../error.log` |

## The habits that matter most

1. **Check before you change.** Who am I, where am I, is it running?
2. **Test before you apply.** `nginx -t` before every reload.
3. **Move, don't delete.** Keep a way back.
4. **One change at a time,** then verify.
5. **Read the logs.** The answer is usually written down.
6. **Keep secrets secret.** No passwords, tokens or keys in screenshots or Git.

## Your badge

Scored 11 or more in the [quiz](quiz.md)? Congratulations: you've earned the **Linux for Beginners** badge. 🏅 Add it to your portfolio with a link to your three assignment reports.

## 🚀 What's next: Bash scripting

In this course you typed checks by hand, again and again: is Nginx running? Is port 8080 listening? Does 2048 return `200`? That repetition was on purpose. Now you understand what each check *means*.

In the next course, **Bash Scripting**, you will teach the computer to do those checks for you:

- Turn your `check.sh` into a proper health-check tool with **variables**, **if statements** and **loops**
- Make a script that checks 2048, your portfolio and Uptime Kuma, and prints ✅ or ❌ for each
- Back up your sites automatically with `tar`
- Schedule scripts to run on their own

Think of it like this: in Linux for Beginners you learned to cook. In Bash, you'll write the recipes down so anyone (or anything) can cook them.

**Before you start Bash:**

- Keep your portfolio repository: you'll build on it
- Keep your `check.sh` script: it's your starting point
- You can delete this Codespace when you're done (from github.com/codespaces). Your evidence lives in your portfolio repo, not here.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**, and we measure success by how many people become confident engineers. You just took a real step towards being one of them.

**Learn. Build. Deploy. Grow.** See you in Bash. 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
