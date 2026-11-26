#!/usr/bin/env bash
# Sends a few orders per second to the shop so your graphs have something to show.
# Usage: bash scripts/traffic.sh [seconds]   (default 120). Press Ctrl+C to stop early.
SECONDS_TO_RUN="${1:-120}"
END=$((SECONDS + SECONDS_TO_RUN))
echo "Sending orders to http://localhost:8000/order for ${SECONDS_TO_RUN}s ..."
while [ $SECONDS -lt $END ]; do
  curl -s -o /dev/null --max-time 3 localhost:8000/order &
  curl -s -o /dev/null --max-time 3 localhost:8000/ &
  sleep 0.3
done
wait
echo "Done."
