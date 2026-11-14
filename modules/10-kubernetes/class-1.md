# Class 1: Run a Workload

**Time:** 2 hours
**Run commands in:** a local `kind` cluster with Docker working.

## Objects as a restaurant

A Pod is one running instance, like a kitchen station. A Deployment is the manager that keeps the requested number of stations available. A Service is a stable address that directs requests to matching Pods.

Create a cluster:

```bash
kind create cluster --name coraxreads --wait 60s
kubectl cluster-info
kubectl get nodes
```

- `kind create cluster` runs Kubernetes nodes in local containers.
- `cluster-info` shows API access.
- `get nodes` confirms the cluster has a ready node.

Apply a Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: coraxreads-web
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: coraxreads-web
  template:
    metadata:
      labels:
        app: coraxreads-web
    spec:
      containers:
        - name: web
          image: nginx:alpine
          ports:
            - containerPort: 80
```

Save as `deployment.yaml`, then run `kubectl apply -f deployment.yaml`. `apply` asks the API server to converge the live object toward the YAML's desired state.

Check:

```bash
kubectl get deployments,pods
kubectl describe deployment coraxreads-web
```

`get` gives a summary; `describe` includes events and selector details.
