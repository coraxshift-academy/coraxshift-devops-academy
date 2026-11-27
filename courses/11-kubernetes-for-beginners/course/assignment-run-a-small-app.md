# Assignment: Run a Small App on Kubernetes

**Kubernetes for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

You have run the café welcome page. Now run **your own** small web page for a business of **your choice** (a salon, a shop, a school, a church group). You will describe it in files, run it with a Service, give it a ConfigMap and a Secret, prove it heals, update it, break it on purpose, roll back, and clean up.

Use a **different** business, name, page text and labels from the lesson, so the work is yours.

## ✅ Rules

1. Work on your own practice cluster only.
2. **No secrets in Git.** Create the Secret from the terminal.
3. Use **specific image tags**, never `latest`.
4. Write every note in your own words. Do not copy an AI answer.

## Task 1: Set up

1. Create a new cluster: `kind create cluster --name myapp`.
2. Create a project folder and run `git init`.
3. Check with `kubectl get nodes`.

## Task 2: Deployment and Service

1. Write `deployment.yaml` for `nginx:1.26-alpine` with **3 replicas**, your own labels and **both probes**.
2. Add **resource requests and limits**.
3. Write `service.yaml` and prove you can reach it **by name** from a tester pod.

## Task 3: Your own page and a Secret

1. Put your own page in a **ConfigMap** and mount it.
2. Create a Secret from the terminal. Pass it to the pod as an environment variable.
3. Show it inside the pod with `printenv`.
4. Run `git ls-files` and prove no secret value is in your repository.

## Task 4: Prove self-healing

Delete one pod. Show `kubectl get pods` before and after. Write what Kubernetes did, and why, in your own words.

## Task 5: Update with no downtime

Change the image to `nginx:1.27-alpine` **in the file** and apply it. Show the rollout and the revision history.

## Task 6: Break it and read the failure

1. Run `kubectl set image` with an image tag that does not exist.
2. Show that your old pods keep running and the site still answers.
3. Copy the error from `kubectl describe pod`.
4. In `failure-notes.md`, write: what you broke, what you saw, where you found the cause, and how you fixed it with `rollout undo`.

## Task 7: Clean up

Delete your objects by name, the Secret, and the cluster. Show `kind get clusters`.

## 📦 What to hand in

Send your instructor:

1. The link to your portfolio folder (`deployment.yaml`, `service.yaml`, `configmap.yaml`, notes, `failure-notes.md`)
2. The output of `git ls-files`, which must **not** list a Secret
3. A short reflection (five lines): *What does Kubernetes do that Docker alone does not? Why is the file in Git the source of truth?*

## 🏁 Done checklist

- [ ] Cluster created and checked
- [ ] Deployment with 3 replicas, probes and limits
- [ ] Service reached by name
- [ ] Your own page through a ConfigMap
- [ ] Secret created from the terminal, not in Git
- [ ] Self-healing shown
- [ ] Update applied from the file
- [ ] Bad update caused, read and rolled back
- [ ] Everything cleaned up

<details>
<summary>Stuck on the bad update? Hint (try first!)</summary>

Run `kubectl set image deployment/NAME web=nginx:9.9.9-nope`, wait 20 seconds, then `kubectl get pods`. The new pod shows `ImagePullBackOff`. Run `kubectl describe pod` on it and read the last lines. Fix it with `kubectl rollout undo deployment/NAME`.

</details>

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-updates-and-self-healing.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-kubernetes.md)</td></tr></table>
