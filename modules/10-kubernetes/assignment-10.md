# Assignment 10: Run CoraxReads on Local Kubernetes

**Time:** 3-4 hours
**Submit in:** your portfolio repository. Do not create a paid managed cluster for this assignment.

## Task 1 - Create and check the cluster

Before starting, read the [Getting Started tool/version guide](../../GETTING-STARTED.md#install-tools-when-their-week-arrives). Verify Docker is running, install kind and `kubectl` for your OS, and keep the client within one Kubernetes minor version of the kind cluster.

Start Docker, create a `kind` cluster named `coraxreads`, then run `kubectl get nodes`. Save the output and explain what Ready means.

## Task 2 - Create desired-state files

Write YAML for a Deployment with two replicas and a Service selecting its Pods. Use consistent labels. Run `kubectl apply -f` on the files.

## Task 3 - Inspect and expose locally

Run `kubectl get deployments,pods,services,endpoints`, then `kubectl describe` the Deployment. Start port-forwarding and verify with `curl --fail http://localhost:8080`.

## Task 4 - Add reliability

Add readiness/liveness probes and resource requests/limits. Apply changes and run `kubectl rollout status`. Change the image to a deliberately invalid tag in the lab, inspect the rollout failure and events, restore the valid image, apply, and verify recovery.

## Task 5 - Explain and clean up

Submit an architecture diagram, YAML, command explanations, sanitized output for success and failure, and a cleanup checklist. Remove only your named resources and local `kind` cluster.

## Pass checklist

- Service endpoints select the expected Pods.
- Health checks pass.
- The bad image is diagnosed and corrected.
- No plaintext credentials are committed.
- Cleanup is verified.
