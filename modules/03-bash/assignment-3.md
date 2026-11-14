# Assignment 3: Automate a Small CoraxReads Operation

**Time:** 2-3 hours
**Submit in:** your portfolio repo, `modules/03-bash/assignment-3/`.

## Goal

Deliver a health check and backup script that a teammate can run without guessing. The scripts must explain failures and must not silently overwrite data.

## Task 1 - Plan the scripts

1. Write down the directory you will back up and the local URL you will check.
2. Run `pwd` and `ls -la` to verify your location and current files.
3. Create `scripts/` if needed with `mkdir -p scripts`.

`ls -la` lists visible and hidden files with details. Do not run a script from a directory you did not intend to change.

## Task 2 - Build the health check

1. Create `scripts/healthcheck.sh` using the Class 3 example.
2. Add a useful error message to stderr.
3. Make it executable with `chmod +x scripts/healthcheck.sh`.
4. Run it against Nginx: `./scripts/healthcheck.sh http://localhost`.
5. Stop Nginx with `sudo service nginx stop`; run the check and record the non-zero exit; restart it with `sudo service nginx start`; run the check again.

This deliberate stop is limited to your practice server. Do not run it on a shared or production server.

## Task 3 - Build and test a backup

1. Create two sample files under `practice-data/`.
2. Create a timestamped archive under `backups/` using `tar -czf`.
3. List the archive using `tar -tzf`.
4. Restore to a new directory and use `diff -r practice-data restore-test/practice-data` to compare them.

`diff -r` compares directory contents recursively; no output means the files match.

## Task 4 - Explain and submit

Submit both scripts, a README with run commands and expected results, and a short note explaining one failure you caused and how you verified recovery. Remove personal data and secrets before pushing.

## Pass checklist

- Health check returns success for a healthy site and failure for a stopped site.
- Backup names are unique.
- Restore test matches the source.
- Scripts quote paths and do not contain credentials or destructive wildcard deletion.
