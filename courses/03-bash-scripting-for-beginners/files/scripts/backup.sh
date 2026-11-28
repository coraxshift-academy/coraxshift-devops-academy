#!/usr/bin/env bash
# Back up a folder into a dated archive, and refuse to run if the folder is missing.
set -euo pipefail

SOURCE="${1:-./data}"
DEST="${2:-./backups}"

if [ ! -d "$SOURCE" ]; then
  echo "ERROR: $SOURCE does not exist." >&2
  exit 1
fi

mkdir -p "$DEST"
STAMP=$(date +%Y-%m-%d-%H%M)
ARCHIVE="$DEST/backup-$STAMP.tar.gz"

tar -czf "$ARCHIVE" -C "$(dirname "$SOURCE")" "$(basename "$SOURCE")"
echo "Created $ARCHIVE"
echo "Size: $(du -h "$ARCHIVE" | cut -f1)"
