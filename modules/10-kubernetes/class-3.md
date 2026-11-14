# Class 3: Health, Rollout, and Cleanup

**Time:** 2 hours
**Run commands in:** the local cluster.

## Add health and resource settings

Add these fields to the container:

```yaml
          resources:
            requests:
              cpu: 50m
              memory: 64Mi
            limits:
              cpu: 250m
              memory: 128Mi
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 2
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 10
```

- Requests help the scheduler find capacity.
- Limits cap container resource use.
- Readiness decides when a Pod receives traffic.
- Liveness restarts a container that is stuck unhealthy.

Use values appropriate to the app; these small values are only a lab example.

## Roll out and roll back

```bash
kubectl apply -f deployment.yaml
kubectl rollout status deployment/coraxreads-web
kubectl rollout history deployment/coraxreads-web
kubectl rollout undo deployment/coraxreads-web
```

`rollout status` waits for the update, `history` shows revisions, and `undo` returns to the previous revision. Verify after rollback.

## Logs and cleanup

```bash
kubectl logs deployment/coraxreads-web
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml
kind delete cluster --name coraxreads
```

Logs explain container output. Delete commands remove the named lab objects; `kind delete cluster` removes the local cluster. Verify the cluster name before deleting.
