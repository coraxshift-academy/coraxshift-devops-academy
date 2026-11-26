#!/usr/bin/env bash
# AWS for Beginners - Coraxshift DevOps Academy
# READ-ONLY clean-up check. It only LISTS things. It never deletes or changes anything.
# Run it in AWS CloudShell:  bash scripts/aws-cleanup-check.sh [region]
# Prints OK for each area with nothing left, and LEFTOVER with the names if something is still there.
# Exit code 0 = nothing found in the areas checked, 1 = something is left, 2 = a check itself failed.
set -u
REGION="${1:-us-east-1}"
left=0
failed=0

check() {
  # $1 = label, rest = the aws command (must print one item per line, or nothing)
  label="$1"; shift
  if ! out="$("$@" 2>&1)"; then
    echo "CHECK FAILED  $label"
    echo "              $out" | head -3
    failed=1
    return
  fi
  out="$(printf '%s' "$out" | sed '/^$/d;/^None$/d')"
  if [ -z "$out" ]; then
    echo "OK            $label"
  else
    echo "LEFTOVER      $label"
    printf '%s\n' "$out" | sed 's/^/              /'
    left=1
  fi
}

echo "Region checked: $REGION   (this script does not look in other regions)"
echo
check "EC2 instances (not terminated)" aws ec2 describe-instances --region "$REGION" \
  --query 'Reservations[].Instances[?State.Name!=`terminated`].[InstanceId,State.Name]' --output text
check "EBS volumes" aws ec2 describe-volumes --region "$REGION" --query 'Volumes[].[VolumeId,State,Size]' --output text
check "EBS snapshots you own" aws ec2 describe-snapshots --region "$REGION" --owner-ids self --query 'Snapshots[].SnapshotId' --output text
check "Elastic IP addresses" aws ec2 describe-addresses --region "$REGION" --query 'Addresses[].[PublicIp,AllocationId]' --output text
check "NAT gateways (pending/available)" aws ec2 describe-nat-gateways --region "$REGION" \
  --filter Name=state,Values=pending,available --query 'NatGateways[].NatGatewayId' --output text
check "Load balancers" aws elbv2 describe-load-balancers --region "$REGION" --query 'LoadBalancers[].LoadBalancerName' --output text
check "Target groups" aws elbv2 describe-target-groups --region "$REGION" --query 'TargetGroups[].TargetGroupName' --output text
check "Auto Scaling groups" aws autoscaling describe-auto-scaling-groups --region "$REGION" --query 'AutoScalingGroups[].AutoScalingGroupName' --output text
check "Launch templates" aws ec2 describe-launch-templates --region "$REGION" --query 'LaunchTemplates[].LaunchTemplateName' --output text
check "RDS databases" aws rds describe-db-instances --region "$REGION" --query 'DBInstances[].[DBInstanceIdentifier,DBInstanceStatus]' --output text
check "RDS snapshots (manual)" aws rds describe-db-snapshots --region "$REGION" --snapshot-type manual --query 'DBSnapshots[].DBSnapshotIdentifier' --output text
check "S3 buckets (all regions, S3 is global)" aws s3api list-buckets --query 'Buckets[].Name' --output text
check "Route 53 hosted zones (global)" aws route53 list-hosted-zones --query 'HostedZones[].Name' --output text
check "CloudWatch alarms" aws cloudwatch describe-alarms --region "$REGION" --query 'MetricAlarms[].AlarmName' --output text
check "CloudWatch dashboards" aws cloudwatch list-dashboards --region "$REGION" --query 'DashboardEntries[].DashboardName' --output text
check "SNS topics" aws sns list-topics --region "$REGION" --query 'Topics[].TopicArn' --output text
check "VPCs that are not the default" aws ec2 describe-vpcs --region "$REGION" \
  --filters Name=is-default,Values=false --query 'Vpcs[].[VpcId,CidrBlock]' --output text
check "Resources still tagged Project=coraxshift-lab" aws resourcegroupstaggingapi get-resources --region "$REGION" \
  --tag-filters Key=Project,Values=coraxshift-lab --query 'ResourceTagMappingList[].ResourceARN' --output text

echo
if [ "$failed" -eq 1 ]; then
  echo "RESULT: at least one check could not run. Read the CHECK FAILED lines. This is NOT a clean result."
  exit 2
elif [ "$left" -eq 1 ]; then
  echo "RESULT: things are left. Anything marked LEFTOVER that is yours may still be costing money."
  echo "        Items you did not create (for example a bucket from another project) are not yours to delete: ask first."
  exit 1
else
  echo "RESULT: nothing found in the areas checked."
  echo "        This does NOT cover other regions, other AWS services, or domains you registered. Check Billing too."
  exit 0
fi
