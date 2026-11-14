# Week 10: Kubernetes Fundamentals

**Project:** CoraxReads
**Goal:** Run a small application on local Kubernetes and understand how desired state, networking, and health checks fit together.

## What you will ship

- A local `kind` cluster.
- A namespace, Deployment, Service, and ConfigMap.
- A runbook for checking pods, logs, and rollout status.

## Three classes

1. **Cluster objects:** Pods, Deployments, labels, and namespaces.
2. **Networking and configuration:** Services, ConfigMaps, Secrets, and port-forwarding.
3. **Reliability:** probes, resource requests, rollout, rollback, and cleanup.

```text
kubectl desired state -> Deployment -> Pods -> Service -> local port-forward
```

This week uses a local cluster. A local `kind` cluster avoids managed-cluster costs. Kubernetes Secrets are base64-encoded by default, not automatically encrypted.

## Lessons

- [Class 1: Run a workload](class-1.md)
- [Class 2: Expose and configure it](class-2.md)
- [Class 3: Health, rollout, and cleanup](class-3.md)
- [Assignment 10](assignment-10.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 10](quiz-week-10.md)

## Official reference

- [Kubernetes concepts](https://kubernetes.io/docs/concepts/)
- [kind documentation](https://kind.sigs.k8s.io/docs/user/quick-start/)
