#!/usr/bin/env bash
# Summarise a log file: total lines, errors, warnings, top 5 error messages.
set -euo pipefail

LOG="${1:-}"

if [ -z "$LOG" ]; then
  echo "Usage: $0 <logfile>" >&2
  exit 2
fi

if [ ! -f "$LOG" ]; then
  echo "ERROR: $LOG not found." >&2
  exit 1
fi

total=$(wc -l < "$LOG")
errors=$(grep -c -i "error" "$LOG" || true)
warnings=$(grep -c -i "warn" "$LOG" || true)

echo "File: $LOG"
echo "Lines: $total"
echo "Errors: $errors"
echo "Warnings: $warnings"
echo
echo "Top 5 error lines:"
grep -i "error" "$LOG" | sed 's/[0-9]\{2,\}/N/g' | sort | uniq -c | sort -rn | head -5 || echo "none"
