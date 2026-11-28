#!/usr/bin/env bash
# Check the three things that break a small server: disk, memory, load.
set -uo pipefail

DISK_LIMIT=80
MEM_LIMIT=90
FAILED=0

disk=$(df -P / | awk 'NR==2 {gsub("%","",$5); print $5}')
echo "Disk used: ${disk}%"
if [ "$disk" -ge "$DISK_LIMIT" ]; then
  echo "WARN: disk above ${DISK_LIMIT}%"
  FAILED=1
fi

mem=$(free | awk '/^Mem:/ {printf "%.0f", $3/$2*100}')
echo "Memory used: ${mem}%"
if [ "$mem" -ge "$MEM_LIMIT" ]; then
  echo "WARN: memory above ${MEM_LIMIT}%"
  FAILED=1
fi

load=$(awk '{print $1}' /proc/loadavg)
echo "Load (1 min): ${load}"

if [ "$FAILED" -eq 0 ]; then
  echo "STATUS: healthy"
  exit 0
else
  echo "STATUS: attention needed"
  exit 1
fi
