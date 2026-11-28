# Kubernetes: the code for this course

Every manifest the course uses is here, plus a local cluster config so you never pay for a control plane.

## Prerequisites

1. Docker running.
2. `kind` installed (Kubernetes IN Docker). Check with `kind --version`.
3. `kubectl` installed. Check with `kubectl version --client`.

## Learning objectives

1. Create a local cluster and delete it when you finish.
2. Apply a Deployment and watch it reach two ready replicas.
3. Separate configuration from the image with a ConfigMap.
4. Prove a Service reaches your pods, and explain liveness versus readiness.
5. Roll out a change with zero downtime, then roll it back.

## Two ways to run this course

| | Local (free) | Cloud (paid) |
|---|---|---|
| Cluster | `kind` on your machine | EKS, AKS or GKE |
| Cost | $0 | real money per hour |
| Command | `kind create cluster` | your cloud's cluster command |

Everything below is the local path. The manifests are the same on a cloud cluster.

## Step 1: Create the cluster

```bash
kind create cluster --config kind-config.yaml --name corax
```

Expected output, near the end:

```text
Set kubectl context to "kind-corax"
```

## Step 2: Prove it exists

```bash
kubectl get nodes
```

Expected output:

```text
NAME                 STATUS   ROLES           AGE   VERSION
corax-control-plane  Ready    control-plane   60s   v1.31.0
corax-worker         Ready    <none>          45s   v1.31.0
corax-worker2        Ready    <none>          30s   v1.31.0
```

## Step 3: Apply everything at once

```bash
kubectl apply -k .
```

Expected output:

```text
namespace/coraxshift created
configmap/web-config created
deployment.apps/web created
service/web created
```

## Step 4: Watch it become ready

```bash
kubectl get pods -n coraxshift -w
```

Expected output after a few seconds:

```text
NAME                   READY   STATUS    RESTARTS   AGE
web-6d9f7c8b5d-4kx2p   1/1     Running   0          12s
web-6d9f7c8b5d-9mnpq   1/1     Running   0          12s
```

Press Ctrl+C to stop watching.

## Step 5: Reach the app

```bash
curl http://localhost:8080
```

Expected output: the nginx welcome page HTML.

## Step 6: Break it on purpose

```bash
kubectl set image deployment/web web=nginx:does-not-exist -n coraxshift
kubectl get pods -n coraxshift
```

Expected output:

```text
NAME                   READY   STATUS             RESTARTS   AGE
web-6d9f7c8b5d-4kx2p   1/1     Running            0          3m
web-7c4b9d6f5a-abcde   0/1     ImagePullBackOff   0          20s
```

The old pod keeps serving. That is `maxUnavailable: 0` doing its job.

## Step 7: Roll back

```bash
kubectl rollout undo deployment/web -n coraxshift
kubectl rollout status deployment/web -n coraxshift
```

Expected output:

```text
deployment "web" successfully rolled out
```

## Step 8: Clean up

```bash
kind delete cluster --name corax
```

Expected output:

```text
Deleting cluster "corax" ...
Deleted nodes: ["corax-worker" "corax-worker2" "corax-control-plane"]
```

## What you learned

1. A Deployment keeps the replica count you asked for and replaces pods that fail.
2. A ConfigMap holds settings so the image stays the same between environments.
3. Readiness decides if a pod gets traffic; liveness decides if it gets restarted.
4. `maxUnavailable: 0` is how you get a zero-downtime rollout.
5. `kind delete cluster` is the most important command in this course: it stops the bill.
