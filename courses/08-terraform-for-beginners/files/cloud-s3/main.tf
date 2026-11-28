# Cloud path: the same ideas, pointed at AWS instead of Docker.
# Run this ONLY when you are ready to use your free tier.
# `terraform destroy` at the end of every session, or the bucket stays.

provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "site" {
  bucket = "${var.project_name}-site-${var.your_name}"
}

resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id

  versioning_configuration {
    status = "Enabled"
  }
}

output "bucket_name" {
  value = aws_s3_bucket.site.bucket
}
