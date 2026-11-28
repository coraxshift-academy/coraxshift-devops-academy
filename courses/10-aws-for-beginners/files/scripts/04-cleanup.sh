#!/usr/bin/env bash
# Remove everything this lab created, so nothing is left behind.
set -euo pipefail
source "$(dirname "$0")/env.sh"

aws --endpoint-url "$ENDPOINT" s3 rb "s3://$BUCKET" --force
docker compose -f "$(dirname "$0")/../docker-compose.localstack.yml" down -v
echo "Bucket removed and LocalStack stopped."
