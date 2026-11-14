# Quiz Week 7: Ansible

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What does an Ansible inventory describe?
A. Hosts and groups to manage
B. Git commit messages
C. Database rows
D. Browser history
Answer: A. Explanation: Inventory identifies the target machines and groupings.

Q2 - Choose ONE
What does `become: true` request?
A. Privilege escalation for tasks
B. A new Git branch
C. Public port forwarding
D. A container image
Answer: A. Explanation: Become asks Ansible to run tasks with elevated privileges where configured.

Q3 - Choose ONE
What is idempotency?
A. Re-running desired-state automation does not keep changing a correct target
B. A task runs forever
C. A password is encrypted
D. A server has no logs
Answer: A. Explanation: Idempotent tasks converge the target and are stable on repeat runs.

Q4 - Choose ONE
What does `--syntax-check` do?
A. Parses the playbook without applying tasks
B. Starts all services
C. Installs every package
D. Commits YAML
Answer: A. Explanation: Syntax check validates playbook structure without applying it.

Q5 - Choose ONE
Why use a handler?
A. Run a service action only after a related task changes
B. Store a password
C. Open a browser
D. Delete inventory
Answer: A. Explanation: A handler is notified by changed tasks and runs at the appropriate time.

Q6 - Choose ONE
What does `--check --diff` provide?
A. A preview of supported changes
B. A guaranteed perfect simulation
C. A cloud bill
D. A secret scan only
Answer: A. Explanation: Check mode previews supported tasks, but it is not complete simulation.

Q7 - Choose ONE
What does `ansible.builtin.copy` do?
A. Copies content or a file to a target
B. Creates a GitHub PR
C. Restarts the laptop
D. Encrypts Terraform state
Answer: A. Explanation: The copy module manages file content on a target.

Q8 - Choose ONE
Where should a become password go?
A. Prompt/approved secret mechanism, not committed YAML
B. Public inventory
C. Git commit message
D. HTML source
Answer: A. Explanation: Credentials must not be stored in tracked plain text.

Q9 - Choose ALL that apply
What helps make playbooks safer?
A. Review the inventory target
B. Run syntax check
C. Use check mode where supported
D. Apply to production first
Answers: A, B, C. Explanation: Target confirmation and previews reduce risk; production is not a practice target.

Q10 - Choose ALL that apply
Which are true about modules?
A. `apt` manages packages
B. `service` manages services
C. `template` renders variables into files
D. Shell is always better than modules
Answers: A, B, C. Explanation: Built-in modules model common desired state; shell is not always idempotent.

Q11 - Choose ALL that apply
What should a learner do after the first apply?
A. Verify the service response
B. Inspect managed file permissions
C. Run again and inspect changed count
D. Assume success without checking
Answers: A, B, C. Explanation: Verification and a second run test both outcome and idempotency.

Q12 - Choose ALL that apply
Which values should not be committed?
A. SSH private keys
B. Plain-text passwords
C. Public non-sensitive task names
D. Cloud credentials
Answers: A, B, D. Explanation: Private credentials must be protected; task names are not secrets.

## Scoring

11 to 12: Pass, earn Week 7 badge. Below 11: review the explanations and retake once.
