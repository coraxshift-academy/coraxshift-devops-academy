# Quiz Week 9: AWS Cloud Foundations

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What does an AWS budget alert do?
A. Warns about estimated/actual spend; it is not a guaranteed cap
B. Automatically prevents all charges
C. Deletes resources
D. Replaces MFA
Answer: A. Explanation: Budgets notify; they do not reliably stop all usage.

Q2 - Choose ONE
Which identity should not be used for daily work?
A. Root account owner
B. Instructor-approved least-privilege identity
C. A role for one task
D. Federated course identity
Answer: A. Explanation: Root has broad account authority and should be reserved for account-level tasks.

Q3 - Choose ONE
What does MFA add?
A. A second proof of identity
B. A public IP
C. More disk space
D. A Git commit
Answer: A. Explanation: MFA requires an additional authentication factor.

Q4 - Choose ONE
What is a security group?
A. A stateful network firewall for a resource
B. A book catalog
C. A file archive
D. An SSH private key
Answer: A. Explanation: Security groups control allowed inbound and outbound traffic.

Q5 - Choose ONE
What is a safer SSH rule for a practice VM?
A. Port 22 only from your current IP
B. All ports from everywhere
C. Database port from everywhere
D. No rule review
Answer: A. Explanation: Narrow source ranges reduce exposure.

Q6 - Choose ONE
What does `chmod 400 key.pem` do?
A. Makes the key owner-readable only
B. Makes it public
C. Deletes the key
D. Starts SSH
Answer: A. Explanation: Mode 400 restricts read access to the owner.

Q7 - Choose ONE
What should happen before launching a resource?
A. Review cost, region, permissions, and cleanup plan
B. Assume free tier means free
C. Disable MFA
D. Open every inbound port
Answer: A. Explanation: Resource creation can incur cost and exposure, so plan first.

Q8 - Choose ONE
What happens to an instance's public IPv4 after stop/start?
A. It may change
B. It becomes a database password
C. It is always permanent
D. It is deleted from Git
Answer: A. Explanation: A dynamically assigned address may change; static allocation can add cost.

Q9 - Choose ALL that apply
What should be checked during cleanup?
A. EC2 instances
B. Unattached volumes and snapshots
C. Load balancers and public IP allocations
D. Only the browser tab
Answers: A, B, C. Explanation: Related resources can continue to incur cost after the VM is gone.

Q10 - Choose ALL that apply
Which are good account practices?
A. Enable root MFA
B. Avoid root access keys
C. Use least privilege for routine work
D. Commit keys to a private repo
Answers: A, B, C. Explanation: MFA and least privilege reduce risk; private repos do not make secrets safe.

Q11 - Choose ALL that apply
Which ports should not be exposed publicly by default?
A. PostgreSQL database port
B. Administrative interfaces
C. SSH from every IP
D. HTTP when intentionally serving a public page
Answers: A, B, C. Explanation: Databases/admin interfaces and unrestricted SSH should remain private; HTTP may be intentionally public.

Q12 - Choose ALL that apply
What is true about free-tier pricing?
A. Eligibility and limits can change
B. A budget alert is not a hard cap
C. Resources can incur charges outside eligible limits
D. All AWS services are always free
Answers: A, B, C. Explanation: Free-tier limits vary, alerts are delayed/not a stop control, and many services cost money.

## Scoring

11 to 12: Pass, earn Week 9 badge. Below 11: review the explanations and retake once.
