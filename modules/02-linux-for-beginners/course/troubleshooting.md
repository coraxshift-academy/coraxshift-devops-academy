# Troubleshooting: Linux for Beginners

**Stuck? That's normal.** Every engineer gets stuck many times a day. The skill isn't avoiding problems; it's working through them calmly. Find what you see in the tables below, then follow the safe next step.

## First-response routine

When something doesn't work, go through these in order. Change **one** thing at a time.

```text
1. Where am I?        whoami ; pwd
2. Is it running?     sudo service nginx status ; pgrep -a uptime-kuma
3. Is it listening?   sudo ss -ltnp
4. What do I get?     curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/2048/
5. What do logs say?  sudo tail -n 20 /var/log/nginx/error.log ; tail -n 20 ~/uptime-kuma.log
6. Make ONE change, then check again
```

## HTTP status codes in plain English

| Code | Meaning | Analogy |
|---|---|---|
| `200 OK` | Everything worked | The waiter brought your dish |
| `301` / `302` | Redirect: "go over there instead" | "Your table is upstairs" |
| `403 Forbidden` | The file is there, but Nginx isn't allowed to read it | The door is locked |
| `404 Not Found` | There is no file at that address | That dish isn't on the menu |
| `502 Bad Gateway` | Nginx is fine, but the app behind it isn't answering | The receptionist can't reach the office |

## Getting started and the terminal

| What you see | Likely reason | Safe next step |
|---|---|---|
| `No such file or directory` | You're in a different folder, or a typo | Run `pwd`. Go home base with `cd /workspaces/linux-for-beginners`. Check spelling and capital letters. |
| `command not found` | Typo, or the tool isn't installed | Check spelling. For Nginx: `sudo apt install -y nginx`. |
| `Permission denied` running a script | The script isn't executable | `chmod +x <script>` (Class 3, Step 5) |
| `Permission denied` on a system file | It needs admin rights | Add `sudo` only if the course step uses it. Don't `chmod` system files. |
| Stuck inside `nano` | You need the exit shortcut | **Ctrl + X**. If it asks to save, press **Y** then **Enter**. |
| Stuck inside `top` or a long output | It's still running | Press **q**, or **Ctrl + C** to stop a command. |
| My `practice` folder is gone | It's a new Codespace | Recreate it: `mkdir -p practice/lab` |

## Installing software

| What you see | Likely reason | Safe next step |
|---|---|---|
| `Could not get lock /var/lib/dpkg/lock` | Another install is running | Wait a minute and retry. Don't delete lock files. |
| `apt` can't download packages | Network or mirror hiccup | Retry `sudo apt update` later. Never add an unknown software source. |
| `node: command not found` or Node.js below 20.4 | Node.js missing or too old for Uptime Kuma | If `nvm --version` works, run `nvm install --lts`; otherwise ask your instructor. Don't use `sudo apt install nodejs` (Ubuntu 24.04 ships Node.js 18). |
| `npm warn deprecated ...` | Notes for the app's developers | Normal. Ignore them. |
| `npm warn EBADENGINE` | Node.js too old | Upgrade Node.js (above), then `npm run setup` again |

## Nginx

| What you see | Likely reason | Safe next step |
|---|---|---|
| `service nginx start` fails | A config error, or Nginx isn't installed | `sudo nginx -t`, read the file and line, fix, test again |
| `curl: (7) Failed to connect to localhost port 80` | Nginx isn't running | `sudo service nginx start` |
| `systemctl: command not found` or `System has not been booted with systemd` | Codespaces don't use systemd | Use `sudo service nginx ...` in this course |
| `nginx -t`: `directive ... is not terminated by ";"` | A missing semicolon | Check the line in the message **and the line above it** |
| `nginx -t`: `invalid number of arguments` | A missing `;` or an extra word on that line | Compare the line with the course file |
| `403 Forbidden` | A folder isn't enterable or a file isn't readable | `namei -l /var/www/html/<path>/index.html`: folders need `x`, files need `r` for others. **Never use `chmod 777`.** |
| `404 Not Found` | Wrong folder, file name or URL | `ls -lah /var/www/html/<folder>/`; check the URL ends with `/` (for example `/2048/`) |
| Still see *Welcome to nginx!* | Your `index.html` isn't in the web root, or the browser cached the old page | `ls -l /var/www/html`, then refresh the browser |

## 2048 (Assignment A)

| What you see | Likely reason | Safe next step |
|---|---|---|
| Page loads but has no colours, or tiles don't move | `style/` or `js/` wasn't copied | Redo A Task 3 from `~/apps/2048` |
| `.git/config` returns `200` | The whole project, including `.git`, was copied | `sudo rm -r /var/www/html/2048/.git` (double-check the path first) |
| Page is missing after the drill | The folder wasn't moved back | `ls /var/www/html`. If you see `2048.offline`, run `sudo mv /var/www/html/2048.offline /var/www/html/2048`. Never delete the `.offline` copy. |

## Uptime Kuma (Assignment B)

| What you see | Likely reason | Safe next step |
|---|---|---|
| `pgrep -a uptime-kuma` prints nothing | It isn't running (stopped, crashed, or the Codespace restarted) | Start it: `cd ~/apps/uptime-kuma && nohup node server/server.js --host=127.0.0.1 > ~/uptime-kuma.log 2>&1 &` |
| `502 Bad Gateway` on port 8080 | Uptime Kuma isn't running or is still starting | Wait 10 seconds; check `pgrep -a uptime-kuma` and `tail -n 20 ~/uptime-kuma.log` |
| `EADDRINUSE` in the log | Port 3001 is already used, usually by an earlier copy | `pgrep -a uptime-kuma`, then `kill <PID>` for that copy only |
| Dashboard spins or can't connect | WebSocket settings missing from the Nginx file | Compare with B Task 4, `sudo nginx -t`, `sudo service nginx reload` |
| Monitor shows `404` | Wrong URL | Use `http://localhost/2048/` with the final slash |
| Database setup screen appears again | The first setup didn't finish | Choose SQLite again and continue |

## Network and ports

| What you see | Likely reason | Safe next step |
|---|---|---|
| `ping` shows `100% packet loss` | Codespaces often block ping | ✅ Normal. Use `curl -I https://google.com`. Any `HTTP/...` reply means you're online. |
| Browser can't open the page, but `curl` works | The port isn't forwarded, or you opened the wrong one | **Ports** tab: forward 80 (or 8080), keep it **Private**, open the 🌐 address |
| Browser asks you to sign in to GitHub | Private ports require your GitHub login | Sign in with the same account. That's the protection working. |
| `ss` shows a port you don't recognise | Codespaces run their own helper programs | Write it down and ask. **Don't kill unknown processes.** |
| No listener on port 22 | Codespaces don't need your own SSH server | ✅ Normal |

## Coming back after a break

Codespaces stop when idle, and programs don't restart on their own. Run:

```bash
cd /workspaces/linux-for-beginners
sudo service nginx start
cd ~/apps/uptime-kuma && nohup node server/server.js --host=127.0.0.1 > ~/uptime-kuma.log 2>&1 &
cd /workspaces/linux-for-beginners
```

(The Uptime Kuma line only applies once you've installed it in B.)

## Asking for help

When you ask your instructor or classmates, include:

1. The exact command you ran
2. The exact error (copy the text, don't retype it)
3. What you expected to see
4. What you already tried

Never paste passwords, tokens, keys, email addresses or other private details into a question, issue or screenshot.
