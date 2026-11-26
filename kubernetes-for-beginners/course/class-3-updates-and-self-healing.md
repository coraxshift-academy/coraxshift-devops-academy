# Class 3: Updates and Self-Healing

**Kubernetes for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to the last class

This is where Kubernetes earns its keep. You will watch it **heal** itself, teach it to **check** that an app is really working, **update** without downtime, survive a **bad update**, and **roll back**.

**By the end of this class you can:**

- Watch Kubernetes replace a deleted or crashed pod
- Add **probes** and **resource limits**
- Update an app with no downtime
- Recognise a bad update and **roll back**
- Clean up completely

## Prerequisites

- Classes 1 and 2 finished, with the `cafe` cluster running

## Step 0: Return to your project

**Run it:**

```bash
export PATH="$HOME/.local/bin:$PATH"
cd ~/practice/k8s-cafe
kubectl config use-context kind-cafe
kubectl get deployment,service,configmap welcome welcome-page
```

**What you should see:** `welcome` Deployment at `2/2`, the `welcome` Service, and the `welcome-page` ConfigMap.

**If yours looks different:** if things are missing, re-apply your files: `kubectl apply -f configmap.yaml -f deployment.yaml -f service.yaml` (and recreate the Secret from Class 2, Step 7).

## Step 1: Self-healing, part one: a deleted pod

**Why this matters:** this is the manager from the café story, at work.

**Run it:**

```bash
kubectl get pods -l app=welcome
POD=$(kubectl get pods -l app=welcome -o jsonpath='{.items[0].metadata.name}')
echo "Deleting $POD"
kubectl delete pod "$POD"
kubectl get pods -l app=welcome
```

**What it does:** deletes one pod on purpose, then looks straight away.

**What you should see:** `pod "..." deleted`, then **two** pods again: one old, and one **new** with an `AGE` of a few seconds (it may show `ContainerCreating`).

Kubernetes noticed that reality (one pod) did not match what you asked for (two), and fixed it.

## Step 2: Self-healing, part two: a crashed app

**Run it:**

```bash
POD=$(kubectl get pods -l app=welcome -o jsonpath='{.items[0].metadata.name}')
kubectl exec "$POD" -- nginx -s stop
sleep 8
kubectl get pods -l app=welcome
```

**What it does:** stops the nginx program **inside** a pod, like a real crash.

**What you should see:** the pod is still there, but its `RESTARTS` column shows `1`. Kubernetes restarted the container for you.

## Step 3: Add probes (checking the manager's checks)

**Why this matters:** a program can be running but **not working**. **Probes** let Kubernetes ask.

- **Readiness probe:** *"Are you ready to receive customers?"* If not, the Service stops sending traffic there.
- **Liveness probe:** *"Are you still alive?"* If not, Kubernetes restarts the container.

**Resource limits** stop one app from eating all the computer's memory.

**Run it:**

```bash
cat > deployment.yaml <<'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: welcome
  labels:
    app: welcome
spec:
  replicas: 2
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 1
  selector:
    matchLabels:
      app: welcome
  template:
    metadata:
      labels:
        app: welcome
    spec:
      containers:
        - name: web
          image: nginx:1.26-alpine
          ports:
            - containerPort: 80
          env:
            - name: CAFE_PASSCODE
              valueFrom:
                secretKeyRef:
                  name: cafe-secret
                  key: CAFE_PASSCODE
          volumeMounts:
            - name: page
              mountPath: /usr/share/nginx/html
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
          resources:
            requests:
              cpu: 50m
              memory: 32Mi
            limits:
              cpu: 200m
              memory: 64Mi
      volumes:
        - name: page
          configMap:
            name: welcome-page
EOF
kubectl apply -f deployment.yaml
kubectl rollout status deployment/welcome --timeout=120s
kubectl get pods -l app=welcome
```

**What it does:**

- `strategy` with `maxUnavailable: 0` means: **never** take a working pod away before a new one is ready. `maxSurge: 1` allows one extra pod during an update.
- The two probes ask the web server for its home page.
- `requests` is what the app is promised. `limits` is the most it may use. `50m` means 5% of a CPU, `32Mi` means 32 megabytes.

**What you should see:** `successfully rolled out` and two pods `1/1 Running`.

## Step 4: Read the probes

**Run it:**

```bash
POD=$(kubectl get pods -l app=welcome -o jsonpath='{.items[0].metadata.name}')
kubectl describe pod "$POD" | grep -E "Liveness|Readiness|Limits|Requests" 
```

**What you should see:** lines for `Liveness`, `Readiness`, and the limits and requests you set.

## Step 5: An update with no downtime

**Why this matters:** customers should not notice you improved the app.

**Run it:**

```bash
sed -i 's/nginx:1.26-alpine/nginx:1.27-alpine/' deployment.yaml
grep "image:" deployment.yaml
kubectl apply -f deployment.yaml
kubectl rollout status deployment/welcome --timeout=180s
kubectl get pods -l app=welcome
kubectl get deployment welcome -o jsonpath='{.spec.template.spec.containers[0].image}'; echo
```

**What it does:** edits the **file** to the new version, applies it, and waits. Kubernetes starts one new pod, waits until it is ready, removes one old pod, and repeats.

**What you should see:** `successfully rolled out`, two pods, and the image `nginx:1.27-alpine`.

## Step 6: See the history

**Run it:**

```bash
kubectl rollout history deployment/welcome
```

**What you should see:** a numbered list of revisions (for example `1`, `2`, `3`). Each change to the blueprint is one revision.

## Step 7: A bad update

**Why this matters:** one day an update **will** be bad. You need to see how Kubernetes protects you.

**Run it:**

```bash
kubectl set image deployment/welcome web=nginx:1.99.99-doesnotexist
sleep 20
kubectl get pods -l app=welcome
kubectl rollout status deployment/welcome --timeout=20s || echo "update is stuck, as expected"
```

**What it does:** points the Deployment at an image that does not exist.

**What you should see:** your **two old pods are still `Running`**, and one **new** pod shows `ErrImagePull` or `ImagePullBackOff`. Then `update is stuck, as expected`.

Because of `maxUnavailable: 0`, Kubernetes never removed a working pod. The café is **still open**. Check:

```bash
kubectl run tester --rm -i --restart=Never --image=curlimages/curl:8.10.1 -- curl -s -o /dev/null -w "%{http_code}\n" http://welcome
```

**What you should see:** `200`.

## Step 8: Find the cause

**Run it:**

```bash
BAD=$(kubectl get pods -l app=welcome | grep -E "ErrImagePull|ImagePullBackOff" | head -1 | cut -d' ' -f1)
kubectl describe pod "$BAD" | tail -8
```

**What you should see:** in the `Events` list, a message such as `Failed to pull image "nginx:1.99.99-doesnotexist"` and `not found`.

The reason is written down. **Always read the Events.**

## Step 9: Roll back

**Run it:**

```bash
kubectl rollout undo deployment/welcome
kubectl rollout status deployment/welcome --timeout=120s
kubectl get pods -l app=welcome
kubectl get deployment welcome -o jsonpath='{.spec.template.spec.containers[0].image}'; echo
```

**What it does:** returns to the previous working revision.

**What you should see:** `successfully rolled out`, two healthy pods, the broken one gone, and the image `nginx:1.27-alpine`.

> 💡 We broke the cluster with a command, not the file. Your `deployment.yaml` **never changed**, and it still says `1.27-alpine`. That is why the file in Git is the source of truth.

## Step 10: Save your work

**Run it:**

```bash
git add deployment.yaml
git commit -m "Add probes, limits and rolling update settings; update to nginx 1.27"
git status --short
```

**What you should see:** a commit message, then nothing.

## Step 11: Clean up completely

**Why this matters:** a forgotten cluster wastes memory and battery.

**Run it:**

```bash
kubectl delete -f service.yaml -f deployment.yaml -f configmap.yaml
kubectl delete secret cafe-secret
kubectl get all
kind delete cluster --name cafe
kind get clusters
```

**What it does:** removes your objects by name, then removes the whole practice cluster.

**What you should see:** the objects `deleted`; `kubectl get all` shows only the built-in `service/kubernetes`; then `Deleting cluster "cafe" ...` and `No kind clusters found.`

Your files are safe in Git. Rebuild everything any time with `kind create cluster --name cafe` and the `kubectl apply` lines.

## ✅ Recap

- A Deployment **replaces** deleted pods and **restarts** crashed containers.
- A **readiness** probe controls whether traffic is sent. A **liveness** probe controls whether a container is restarted.
- **Requests** and **limits** keep one app from taking everything.
- A rolling update with `maxUnavailable: 0` keeps the app up during an update.
- A bad update is stopped by the old pods staying in place. Read **Events** to find why.
- `kubectl rollout undo` goes back. Keep your **file in Git** as the source of truth.

## 📤 Push to your portfolio

In your portfolio repository, create `kubernetes/class-3/` and add:

1. Your final `deployment.yaml`
2. A `notes.md` answering: *What is the difference between readiness and liveness? Why did the café stay open during the bad update? What does `rollout undo` do?*

Next up: [the Assignment](assignment-run-a-small-app.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-services-and-configuration.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment-run-a-small-app.md)</td></tr></table>
