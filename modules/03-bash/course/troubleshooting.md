# Troubleshooting

**Bash Scripting for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Scripts

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `Permission denied` | The script is not executable | Run `ls -l scripts/name.sh`, then `chmod +x scripts/name.sh`. Or run it with `bash scripts/name.sh` |
| `No such file or directory` for a script | You are in the wrong folder, or the name is wrong | Run `pwd`, then `cd /workspaces/bash-scripting-for-beginners`, then `ls scripts` |
| `unbound variable` | `set -u` found a variable that has no value | Check the spelling. Give it a default such as `${1:-default}` |
| `command not found` for a variable line | Spaces around the `=` | Write `name="value"` with no spaces |
| `[[: not found` | You ran the script with `sh` | Use `bash scripts/name.sh` or `./scripts/name.sh` |
| Names with spaces break | A variable was not quoted | Write `"$variable"` with double quotes |
| `syntax error: unexpected end of file` | An `if`, `case` or `{` was not closed | Run `bash -n scripts/name.sh`, and look for the missing `fi`, `esac` or `}` |
| `bad interpreter` or `^M` | The file has Windows line endings | Run `file scripts/name.sh`. If it says `CRLF`, run `sed -i 's/\r$//' scripts/name.sh` |
| The script stopped with no message | A command failed under `set -e` | Run `bash -x scripts/name.sh` and read the last `+` line |
| A `heredoc` file is cut short | The `EOF` line was not copied as its own line | Copy the whole command box again, from `cat >` to the last `EOF` |

## The health check

| What you see | Most likely reason | Safe next step |
|---|---|---|
| Says `UNHEALTHY` but the site should be up | Your practice website is switched off | Start it again with the commands from Class 3, Step 2 |
| Says `HEALTHY` when the site is off | An old server is still running | `pkill -f "http.server 8080"`, then check again |
| `Address already in use` in `practice/server.log` | Another server holds port 8080 | `pkill -f "http.server 8080"`, then start the site again |
| Check hangs | No timeout | Make sure `--max-time 5` is in the `curl` command |
| `curl` reports success for an error page | `--fail` is missing | Add `--fail` |
| A pop-up says a port was forwarded | Codespaces noticed your practice site | Fine. Keep it **Private** |

## Backups

| What you see | Most likely reason | Safe next step |
|---|---|---|
| The archive is empty or too small | Wrong folder, or wrong source path | Run `pwd` and `ls -la` on the source, then back up again |
| `tar: Removing leading '/'` | You gave an absolute path | Harmless notice |
| `tar: file changed as we read it` | Something was writing to the folder during the backup | Stop the writing, then make a new backup |
| `ERROR: ... already exists. Not overwriting it.` | Two backups in the same second | That is the protection working. Wait a second and run again |
| The restore test says `PROBLEM` | The original changed after the backup | Make a new backup and test that one |

## Tools

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `curl: command not found` | Tool missing | `sudo apt-get update && sudo apt-get install -y curl` (Codespace only) |
| `python3: command not found` | Tool missing | Check `python3 --version`. In a Codespace, use the default image |
| `sudo apt ...` fails in PowerShell | Wrong terminal | Those commands are for the Linux terminal in your Codespace, never PowerShell |

## Debugging commands

- `bash -n scripts/name.sh` checks grammar **without running** the script.
- `bash -x scripts/name.sh` shows every command as it runs. It can reveal secret values, so do not share the output if it contains any.
- `echo "$?"` prints the previous exit code.
- `file scripts/name.sh` shows the file type and line endings.

## When you ask for help

Include these five things:

1. What you were trying to do
2. What you did
3. What you expected
4. What you saw, with the **exact** error
5. What you already tried

Never include passwords, tokens or personal details.
