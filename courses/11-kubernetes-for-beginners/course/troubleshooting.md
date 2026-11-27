# Troubleshooting

**Kubernetes for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Tools and cluster

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `kubectl: command not found` or `kind: command not found` | Your new terminal does not know the tools folder | `export PATH="$HOME/.local/bin:$PATH"`, or repeat Class 1, Step 1 |
| `Cannot connect to the Docker daemon` | Docker is not running | Reopen the terminal or rebuild the Codespace, then `docker version` |
| `kind create cluster` fails or hangs | Not enough memory, or an old cluster is in the way | `kind get clusters`. If `cafe` is listed from a broken attempt: `kind delete cluster --name cafe`, then create it again. Use a Codespace with 4 GB or more |
| `The connection to the server localhost:8080 was refused` | `kubectl` has no cluster to talk to | `kubectl config use-context kind-cafe`. If the cluster is gone, `kind create cluster --name cafe` |
| `Unable to connect to the server` after a Codespace restart | The cluster stopped with the machine | `docker ps -a` to look, then recreate it with `kind create cluster --name cafe` and re-apply your files |

## Pods

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `ContainerCreating` for a while | The image is downloading | Wait a minute, then `kubectl describe pod NAME` |
| `ErrImagePull` or `ImagePullBackOff` | The image name or tag is wrong, or there is no internet | `kubectl describe pod NAME`, read the Events, fix the tag |
| `CrashLoopBackOff` | The program keeps crashing | `kubectl logs NAME` and `kubectl logs NAME --previous` |
| `Pending` | No room to run it | `kubectl describe pod NAME`, read the Events |
| `0/2` ready for a long time | A probe is failing | `kubectl describe pod NAME` and look at the probe lines and Events |
| `RESTARTS` keeps growing | The container keeps failing its liveness probe or crashing | `kubectl logs NAME --previous` |

## Files

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `error converting YAML to JSON` | A spacing problem | Two spaces per level, no tabs. Compare with the lesson |
| `unknown field` | A word is misspelt or at the wrong level | Compare spelling and indentation with the lesson |
| `no matches for kind` | `kind:` or `apiVersion:` is wrong | Copy them from the lesson |
| `secret "cafe-secret" not found`, pod stuck | You skipped the Secret step | Create it again from Class 2, Step 7 |
| `configmap "welcome-page" not found` | You skipped the ConfigMap step | `kubectl apply -f configmap.yaml` |

## Services

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `Could not resolve host: welcome` | The Service does not exist | `kubectl get service` |
| `ENDPOINTS` is `<none>` | The Service label does not match the pod label | Compare `selector` with the pod `labels` |
| `port-forward` says `address already in use` | Another tunnel is running | Stop it with Ctrl+C, or choose another port such as `8081:80` |

## 🆘 The panic button

If you are afraid you broke something:

1. Run `kubectl get pods` and `kubectl get events --sort-by=.lastTimestamp | tail -15`. They change nothing.
2. Read the last lines.
3. Send the output to your instructor.

You can always start fresh: `kind delete cluster --name cafe`, then `kind create cluster --name cafe`. Your files are safe in Git.
