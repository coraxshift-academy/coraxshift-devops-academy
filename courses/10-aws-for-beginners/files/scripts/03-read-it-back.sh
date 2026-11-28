#!/usr/bin/env bash
# Download the object again and show what came back.
set -euo pipefail
source "$(dirname "$0")/env.sh"

aws --endpoint-url "$ENDPOINT" s3 cp "s3://$BUCKET/index.html" -
