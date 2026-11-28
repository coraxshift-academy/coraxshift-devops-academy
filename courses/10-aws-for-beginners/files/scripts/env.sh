# LocalStack accepts any credentials, because it is not AWS.
# These are fake on purpose. Never put real keys in a file like this.
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=eu-west-1
export ENDPOINT=http://localhost:4566
export BUCKET=coraxshift-lab
