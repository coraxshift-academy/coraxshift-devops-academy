# Quiz: Linux for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **Linux for Beginners badge**. Below that, you get one retake after reviewing the classes.

Answer every question **before** you look at the answers. Each explanation says why the right answer is right *and* why the others are wrong. That's where most of the learning happens.

## Questions

**Q1. Choose ONE.** You run `ls -l` and see `-rwxr-xr-x` for a file. What does it mean?

- A. Owner can read, write and run. Group and others can read and run.
- B. Everyone can do everything.
- C. No one can read it.
- D. It is a folder.

**Q2. Choose ONE.** Which command shows the folder you are in right now?

- A. `pwd`
- B. `ls`
- C. `cd`
- D. `whoami`

**Q3. Choose ONE.** Which command installs Nginx on Ubuntu?

- A. `sudo apt install -y nginx`
- B. `npm install nginx`
- C. `pip install nginx`
- D. `git clone nginx`

**Q4. Choose ONE.** In a Codespace, which command starts Nginx?

- A. `sudo service nginx start`
- B. `sudo systemctl start nginx`
- C. `sudo nginx -t`
- D. `sudo apt update nginx`

**Q5. Choose ONE.** You created `/tmp/report.txt` with `sudo`, so `root` owns it. Which command makes the `codespace` user its owner and group?

- A. `sudo chown codespace:codespace /tmp/report.txt`
- B. `sudo chmod 755 /tmp/report.txt`
- C. `sudo chmod 777 /tmp/report.txt`
- D. `chown root /tmp/report.txt`

**Q6. Choose ONE.** You started `sleep 300 &` for practice and `pgrep -a sleep` shows `4321 sleep 300`. What is the safe way to stop it?

- A. `kill 4321`
- B. `kill -9 1`
- C. `sudo rm /usr/bin/sleep`
- D. `sudo service sleep stop`

**Q7. Choose ONE.** Which command shows listening ports and the process using each one?

- A. `sudo ss -tulpn`
- B. `ls -la`
- C. `free -h`
- D. `df -h /`

**Q8. Choose ONE.** In Assignment A, why do we copy only `index.html`, `favicon.ico`, `js`, `style`, `meta` and `LICENSE.txt` into `/var/www/html/2048/`, and not the whole cloned project?

- A. To keep private project files such as the `.git` history off the web server, while still serving everything the browser needs
- B. Because Nginx can only serve six items per folder
- C. Because copying `.git` would make the game run faster
- D. Because `cp` cannot copy folders

**Q9. Choose ALL that apply.** Which are true about the Linux file system?

- A. `/` is the root, the top of everything
- B. `/etc` holds configuration files
- C. `/var` holds logs and websites
- D. `/home` holds users' folders

**Q10. Choose ALL that apply.** Which are true about testing Nginx configuration?

- A. `sudo nginx -t` tests the configuration syntax
- B. If it says *syntax is ok* and *test is successful*, the config passed the test
- C. If you remove the semicolon from `listen 8081;` in the temporary lab config, `nginx -t` fails
- D. On a production server you should reload Nginx first and test afterwards

**Q11. Choose ALL that apply.** In Assignment B, Nginx on port 8080 forwards visitors to Uptime Kuma on `127.0.0.1:3001`. Which are true?

- A. This makes Nginx a *reverse proxy* for Uptime Kuma
- B. If the Uptime Kuma process is stopped, a request to port 8080 returns `502 Bad Gateway`
- C. Listening on `127.0.0.1` means Uptime Kuma only accepts connections from inside the machine, so visitors come through Nginx
- D. Stopping Uptime Kuma with `kill` deletes your monitors

**Q12. Choose ALL that apply.** During the missing-files drill you move `/var/www/html/2048` to `/var/www/html/2048.offline`. Which are true?

- A. `curl` to `http://localhost/2048/` returns `404` while the folder is moved
- B. Your Uptime Kuma monitor for 2048 turns **Down** within about one check interval
- C. Moving the folder (instead of deleting it) means you can restore it with one `mv` command
- D. You should delete `2048.offline` before restoring, to save disk space

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play: On-call](role-play-on-call.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
