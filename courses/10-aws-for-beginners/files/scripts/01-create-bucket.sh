#!/usr/bin/env bash
# Create the bucket. Against LocalStack this is free and instant.
set -euo pipefail
source "$(dirname "$0")/env.sh"

aws --endpoint-url "$ENDPOINT" s3 mb "s3://$BUCKET"
echo "Bucket $BUCKET created."
