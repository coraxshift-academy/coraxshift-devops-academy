# Week 10 Troubleshooting

| Problem | Likely reason | Safe next step |
| --- | --- | --- |
| `kubectl` cannot connect | Cluster is stopped or wrong context selected | Run `kubectl config current-context` and `kind get clusters`; select only the intended local context. |
| Pod is `ImagePullBackOff` | Image/tag unavailable or registry blocked | Run `kubectl describe pod`; check Events and image spelling. |
| Pod is `CrashLoopBackOff` | Process exits repeatedly | Run `kubectl logs POD --previous` and inspect startup configuration. |
| Service has no endpoints | Selector does not match Pod labels or Pods are not Ready | Compare Service selector with Pod labels; inspect readiness probe and Pod status. |
| Port-forward connection refused | Wrong service/port or no ready endpoint | Check `kubectl get svc,endpoints,pods`; use matching service and target port. |
| `kubectl apply` rejects YAML | Indentation/schema/field issue | Read the exact line and resource kind; check API structure and reapply. |
| Pod never Ready | Probe path/port wrong or app not listening | Inspect logs and events; verify the app binds to the expected container port. |

`kubectl describe` and Events are often the fastest first evidence. Do not delete the whole cluster to fix a single object until you have captured diagnostics.
