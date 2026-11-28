#!/usr/bin/env bash
# Confirm the AWS CLI is installed and LocalStack is answering.
set -euo pipefail
source "$(dirname "$0")/env.sh"

echo "AWS CLI version:"
aws --version

echo
echo "Is LocalStack up?"
aws --endpoint-url "$ENDPOINT" s3 ls
echo "If you saw no error above, LocalStack is ready."
