# Class 2: Network and Compute

**Time:** 2 hours
**Tools:** AWS Console. Create resources only after budget and instructor approval.

## Network: the building and its doors

A VPC is your private network space. A subnet is a smaller network segment. A route table decides where traffic can go. A security group is a stateful firewall attached to a network interface.

For a beginner lab, use the account's default VPC only if the instructor confirms it is suitable. Do not change shared VPC settings.

## Security group rules

Use only the inbound traffic your exercise needs:

- HTTP TCP 80 from `0.0.0.0/0` only when intentionally showing a public practice page.
- SSH TCP 22 only from your current public IP, never from `0.0.0.0/0`.
- Do not open database ports publicly.

An EC2 instance is a virtual computer. Its public IPv4 address may change after stop/start unless a paid static address is allocated; avoid allocating one for this lab.

## Select compute carefully

Choose an instructor-approved, smallest suitable instance type and a supported Linux image. Pricing and free eligibility change; read the current estimate in the console before launch. Tag resources with an owner and purpose, for example `Project=CoraxReadsLab`.

Do not create a Kubernetes cluster in this week. Managed clusters have additional costs.
