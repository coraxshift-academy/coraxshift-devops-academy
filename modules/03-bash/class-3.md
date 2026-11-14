# Class 3: Health Checks and Backups

**Time:** 2 hours
**Run commands in:** the Codespace that has the Week 2 Nginx lab.

## HTTP health check

Create `scripts/healthcheck.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

url="${1:-http://localhost}"
if curl --fail --silent --show-error --output /dev/null "$url"; then
  printf 'Healthy: %s\n' "$url"
else
  printf 'Unhealthy: %s\n' "$url" >&2
  exit 1
fi
```

- `curl` requests the URL.
- `--fail` returns failure for HTTP 400 or 500 responses.
- `--silent --show-error` suppresses progress but keeps error details.
- `--output /dev/null` discards the page body.
- `exit 1` tells a later automation step that the check failed.

Run it:

```bash
chmod +x scripts/healthcheck.sh
./scripts/healthcheck.sh
```

`chmod +x` adds execute permission. Expected result: `Healthy: http://localhost`.

## Dated backup

Create a backup of a small practice folder:

```bash
mkdir -p practice-data
printf 'sample book list\n' > practice-data/books.txt
backup="backups/coraxreads-$(date +%Y%m%d-%H%M%S).tar.gz"
mkdir -p backups
tar -czf "$backup" practice-data
tar -tzf "$backup"
```

- `date` creates a timestamp so backups have different names.
- `tar -czf` creates a gzip-compressed archive at the path in `$backup`.
- `tar -tzf` lists archive contents without extracting them.

Do not delete the source folder after making the backup. A backup is useful only if you can restore it. Test restore into a new folder with `tar -xzf "$backup" -C restore-test` after creating `restore-test`.

## Review

Explain what makes a health check fail, how a backup name avoids overwriting, and how you verified the archive.
