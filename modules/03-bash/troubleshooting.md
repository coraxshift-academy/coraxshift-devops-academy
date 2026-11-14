# Week 3 Troubleshooting

| What you see | Likely reason | Safe next step |
| --- | --- | --- |
| `Permission denied` | Script is not executable or parent directory is not accessible | Run `ls -l scripts/healthcheck.sh`; use `chmod +x` on the script, then run it with `bash` if needed. |
| `unbound variable` | `set -u` found a variable with no value | Check spelling and provide a default such as `${1:-http://localhost}`. |
| URL appears as multiple arguments | A path or URL was not quoted | Quote variable expansions: `"$url"`. |
| `curl` returns success for an error page | `--fail` was omitted | Add `--fail`; test with an HTTP error response. |
| Backup archive is empty | Wrong working directory or source path | Run `pwd` and `ls -la` on the source; create and list the archive again. |
| `tar` says file changed as we read it | Source was being edited during backup | Stop writes during the lab and make a new timestamped archive. |
| Backup would replace an earlier file | Timestamp granularity or fixed name | Include hours/minutes/seconds and check the destination before writing. |
| Script stopped without a clear message | A command failed under `set -e` | Run with `bash -x scripts/name.sh` to print each command; do not paste secret values from debug output. |

## Debugging commands

- `bash -n scripts/name.sh` checks shell syntax without running the script.
- `bash -x scripts/name.sh` traces commands as they run.
- `echo "$?"` prints the previous command's exit status.
- `file scripts/name.sh` shows the file type and may reveal Windows line endings.

If you see `^M` or a bad interpreter error, convert the file to Unix line endings in your editor and rerun `bash -n`.
