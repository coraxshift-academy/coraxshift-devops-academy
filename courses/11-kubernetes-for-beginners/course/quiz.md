# Quiz: Kubernetes for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **Kubernetes for Beginners badge**. Below that, you get one retake after reviewing Classes 2 and 3.

Every question comes from something you practised in this course. Answer all of them **before** you look at the answers.

## Questions

**Q1. Choose ONE.** What is a pod?
- A. The smallest unit Kubernetes runs, wrapping one or more containers
- B. A whole cluster
- C. A password store
- D. A type of Service

**Q2. Choose ONE.** You delete a bare pod that is not managed by a Deployment. What happens?
- A. Kubernetes recreates it
- B. It is gone, and nothing replaces it
- C. It moves to another namespace
- D. It becomes a ConfigMap

**Q3. Choose ONE.** What does a Deployment with `replicas: 3` do?
- A. Keeps three copies running, replacing any that fail
- B. Runs a pod three times, then stops
- C. Limits the app to three users
- D. Creates three clusters

**Q4. Choose ONE.** Why use a Service instead of a pod's own address?
- A. A pod's address changes when it is replaced, but a Service gives a steady name and address
- B. A Service is faster
- C. Pods do not have addresses
- D. A Service stores passwords

**Q5. Choose ONE.** Which object holds a **password**?
- A. A Secret
- B. A Service
- C. A ReplicaSet
- D. A namespace

**Q6. Choose ONE.** Is base64 the same as encryption?
- A. Yes, it hides the value completely
- B. No, it is only a different way of writing text, and anyone who can read the Secret can decode it
- C. Yes, but only for numbers
- D. It depends on the pod

**Q7. Choose ONE.** What does `kubectl apply -f file.yaml` mean?
- A. Make the cluster match what the file describes
- B. Delete the file
- C. Download the file
- D. Restart the cluster

**Q8. Choose ONE.** An update uses an image tag that does not exist, and the Deployment has `maxUnavailable: 0`. What happens?
- A. The old pods keep running while the new pod fails to start
- B. All pods are deleted immediately
- C. Kubernetes invents a working image
- D. The cluster is deleted

**Q9. Choose ALL that apply.** What does a **readiness** probe or a **liveness** probe do?
- A. Readiness decides whether traffic is sent to the pod
- B. Liveness decides whether the container is restarted
- C. Readiness decides whether the container is restarted
- D. Liveness decides whether traffic is sent

**Q10. Choose ALL that apply.** Where do you look to find out why a pod will not start?
- A. `kubectl describe pod`, especially the Events
- B. `kubectl logs`
- C. `kubectl get pods`, to see the status
- D. Guess and delete everything

**Q11. Choose ALL that apply.** Which are good habits?
- A. Keep your YAML files in Git as the source of truth
- B. Use specific image tags, not `latest`
- C. Commit a Secret with a real password to a public repository
- D. Set resource requests and limits

**Q12. Choose ALL that apply.** Which are true about rolling back?
- A. `kubectl rollout undo` returns to the previous revision
- B. `kubectl rollout history` lists the revisions
- C. A rollback changes your file in Git automatically
- D. A rollback is how you recover from a bad update

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-kubernetes.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
