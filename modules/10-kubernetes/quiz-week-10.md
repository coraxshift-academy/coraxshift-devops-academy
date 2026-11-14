# Quiz Week 10: Kubernetes

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What does a Deployment maintain?
A. Desired Pod replicas and rollout
B. AWS billing
C. Git commits
D. DNS registration
Answer: A. Explanation: A Deployment manages replica sets and converges Pods toward desired state.

Q2 - Choose ONE
What does a Service provide?
A. Stable access to matching Pods
B. A container image build
C. A private SSH key
D. A Docker volume
Answer: A. Explanation: A Service selects Pods and provides a stable network endpoint.

Q3 - Choose ONE
What does a readiness probe control?
A. Whether a Pod should receive traffic
B. How Git tags are named
C. Cloud region selection
D. Docker image layers
Answer: A. Explanation: Readiness indicates whether the app is ready to serve requests.

Q4 - Choose ONE
What is `kubectl port-forward` for?
A. A local tunnel to a Kubernetes resource
B. Publicly opening every node port
C. Creating an AWS VPC
D. Saving a database backup
Answer: A. Explanation: Port-forward creates a local connection to a selected resource.

Q5 - Choose ONE
What does `kubectl rollout status` do?
A. Waits for rollout progress and reports status
B. Deletes old Git branches
C. Exposes a secret
D. Rebuilds the image
Answer: A. Explanation: It reports whether the Deployment rollout completes.

Q6 - Choose ONE
What do resource requests help Kubernetes do?
A. Schedule Pods based on needed capacity
B. Encrypt environment variables automatically
C. Create DNS records
D. Write application code
Answer: A. Explanation: Requests inform scheduling and resource placement.

Q7 - Choose ONE
What does a ConfigMap hold?
A. Non-sensitive configuration
B. Automatically encrypted credentials
C. Docker image layers
D. Git history
Answer: A. Explanation: ConfigMaps are for non-secret configuration; they are not secret stores.

Q8 - Choose ONE
What is the security status of base64 Kubernetes Secret data?
A. Encoded, not automatically encrypted
B. Publicly invisible forever
C. A password hash
D. Encrypted by definition
Answer: A. Explanation: Base64 is reversible encoding; use RBAC and approved encryption/secret management.

Q9 - Choose ALL that apply
Which commands help diagnose a Pod?
A. `kubectl describe pod`
B. `kubectl logs`
C. `kubectl get events`
D. `git tag`
Answers: A, B, C. Explanation: Describe, logs, and events show state and failure evidence.

Q10 - Choose ALL that apply
What should match for a Service to route to Pods?
A. Service selector labels
B. Pod labels
C. The app port/target port
D. The Git commit message
Answers: A, B, C. Explanation: Selectors identify Pods and ports determine traffic destination.

Q11 - Choose ALL that apply
What is useful for production workloads?
A. Readiness probe
B. Appropriate resource requests
C. Least-privilege service account
D. Run every container as privileged
Answers: A, B, C. Explanation: Health, capacity planning, and least privilege improve operations; privileged mode expands risk.

Q12 - Choose ALL that apply
What should be verified before deleting a cluster?
A. Current kubectl context
B. Cluster name
C. That the cluster is the disposable lab
D. Nothing; delete all contexts
Answers: A, B, C. Explanation: Confirm context and target so shared or production resources are not removed.

## Scoring

11 to 12: Pass, earn Week 10 badge. Below 11: review the explanations and retake once.
