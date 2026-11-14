# Quiz Week 6: Terraform

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What does a Terraform provider do?
A. Connects Terraform to an API or platform
B. Writes application tests
C. Replaces Git
D. Encrypts every source file
Answer: A. Explanation: Providers implement resources and data sources for a platform.

Q2 - Choose ONE
What does `terraform init` do?
A. Prepares the working directory and downloads providers
B. Deletes all resources
C. Starts a server
D. Creates a Git commit
Answer: A. Explanation: Init installs declared providers and sets up local working metadata.

Q3 - Choose ONE
Why run `terraform plan`?
A. Preview proposed changes
B. Skip state
C. Expose a port
D. Format HTML
Answer: A. Explanation: Plan compares configuration/state and previews actions before applying.

Q4 - Choose ONE
What does `terraform apply lab.tfplan` apply?
A. The saved plan file
B. Every file in the folder
C. A GitHub pull request
D. A database backup
Answer: A. Explanation: The command applies the reviewed plan named in the argument.

Q5 - Choose ONE
What does Terraform state do?
A. Maps configuration to managed resource identities
B. Stores all website images
C. Replaces firewall rules
D. Stores learner grades
Answer: A. Explanation: State tracks the resources Terraform manages.

Q6 - Choose ONE
What should you do if plan proposes an unexpected deletion?
A. Stop and investigate before applying
B. Apply immediately
C. Delete the state file
D. Hide the plan
Answer: A. Explanation: An unexpected deletion may indicate wrong workspace, state, or config.

Q7 - Choose ONE
What does `terraform fmt` do?
A. Formats Terraform files
B. Deploys a container
C. Creates credentials
D. Runs Nginx
Answer: A. Explanation: Fmt normalizes configuration formatting.

Q8 - Choose ONE
What is safest before destroying a lab?
A. Review the destroy plan and resource names
B. Delete all state
C. Run a wildcard Docker cleanup
D. Ignore the active workspace
Answer: A. Explanation: A reviewed plan limits accidental deletion to intended resources.

Q9 - Choose ALL that apply
Which artifacts should normally stay out of Git?
A. Terraform state
B. Saved plans
C. `.terraform/` directory
D. A sanitized README
Answers: A, B, C. Explanation: State/plans and provider cache can contain sensitive or generated data; docs can be committed after review.

Q10 - Choose ALL that apply
Which commands help review a Terraform lab?
A. `terraform validate`
B. `terraform plan`
C. `terraform state list`
D. `rm -rf ~`
Answers: A, B, C. Explanation: Validate, plan, and state listing are focused review tools; broad deletion is unsafe.

Q11 - Choose ALL that apply
What should be checked when Docker provider cannot connect?
A. Docker daemon availability
B. `docker version` server section
C. Whether the socket is exposed insecurely
D. Cloud root password in source
Answers: A, B, C. Explanation: Provider access depends on Docker daemon connectivity; never put root credentials in code.

Q12 - Choose ALL that apply
What are good infrastructure-as-code habits?
A. Review a plan before apply
B. Keep state protected
C. Investigate drift
D. Apply every plan without reading
Answers: A, B, C. Explanation: Plans, protected state, and drift review improve safety; blind applies do not.

## Scoring

11 to 12: Pass, earn Week 6 badge. Below 11: review the explanations and retake once.
