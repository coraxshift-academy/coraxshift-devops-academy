#!/usr/bin/env bash
# Upload the page, then prove it is there.
set -euo pipefail
source "$(dirname "$0")/env.sh"

SITE="$(dirname "$0")/../site/index.html"

aws --endpoint-url "$ENDPOINT" s3 cp "$SITE" "s3://$BUCKET/index.html"
echo
echo "Objects in the bucket:"
aws --endpoint-url "$ENDPOINT" s3 ls "s3://$BUCKET"
