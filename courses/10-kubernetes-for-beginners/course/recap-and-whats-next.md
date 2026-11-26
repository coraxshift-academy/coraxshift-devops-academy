# Recap and What's Next

**Kubernetes for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You built a practice cluster, ran an app on it, watched it heal itself, updated it without downtime, survived a bad update and rolled back. These are the everyday jobs of a real platform engineer.

```text
Deployment ─▶ ReplicaSet ─▶ Pods ◀─ Service ◀─ customers
      ▲                       ▲
   ConfigMap + Secret      Probes and limits
```

> 📖 **From my café:** Watching is not the same as managing. A good manager observes, recognises abnormal behaviour and takes the right action. You have now built the part that acts, and the next course teaches you to build the part that watches.

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Make a practice cluster | `kind create cluster --name NAME` |
| See nodes | `kubectl get nodes` |
| See pods | `kubectl get pods` |
| See several kinds at once | `kubectl get deployment,replicaset,pods` |
| Apply a file | `kubectl apply -f FILE.yaml` |
| Investigate | `kubectl describe pod NAME` |
| Read logs | `kubectl logs NAME` |
| Run a command inside | `kubectl exec NAME -- COMMAND` |
| Scale | `kubectl scale deployment NAME --replicas=N` |
| Watch an update | `kubectl rollout status deployment/NAME` |
| See revisions | `kubectl rollout history deployment/NAME` |
| Go back | `kubectl rollout undo deployment/NAME` |
| Open a tunnel | `kubectl port-forward service/NAME 8080:80` |
| Create a Secret | `kubectl create secret generic NAME --from-literal=KEY=value` |
| Delete a cluster | `kind delete cluster --name NAME` |

## 🛡️ Your four golden rules

1. **Keep your files in Git.** The file is the truth.
2. **Never commit secrets.**
3. **Use specific tags**, not `latest`.
4. **Read the Events** before you guess.

## ➡️ What comes next

You can now make a system act. The next course is **Monitoring and Observability**: how to see what a system is doing, notice abnormal behaviour, and be told when something is wrong, so a person can step in.

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
