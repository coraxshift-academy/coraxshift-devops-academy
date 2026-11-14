# Class 2: Expose and Configure It

**Time:** 2 hours
**Run commands in:** the local cluster.

## Stable in-cluster access

Create `service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: coraxreads-web
spec:
  selector:
    app: coraxreads-web
  ports:
    - port: 80
      targetPort: 80
```

The Service selector matches Pod labels. `port` is the Service port; `targetPort` is the container port.

Apply and inspect:

```bash
kubectl apply -f service.yaml
kubectl get service,endpoints
kubectl port-forward service/coraxreads-web 8080:80
```

Keep the last command running; in another terminal open `http://localhost:8080`. `port-forward` creates a local tunnel; it does not make the app public.

## Non-secret configuration

A ConfigMap stores non-sensitive configuration. Never put passwords in a ConfigMap. A Kubernetes Secret is also not a secure vault by default; access is controlled by RBAC and encryption-at-rest configuration.

For this lab, keep app settings in ConfigMaps and do not create real credentials. In production, use an approved secret manager and narrowly scoped service accounts.

## Practice

Change the Deployment replica count from two to three. Apply it and watch `kubectl get pods -w`. Explain what changed and how the Service finds the new Pod.
