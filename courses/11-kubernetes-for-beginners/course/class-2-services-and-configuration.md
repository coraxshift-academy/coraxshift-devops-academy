# Class 2: Services and Configuration

**Kubernetes for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome back

Your two pods are running, but nobody can reach them reliably: pods come and go, and each new pod gets a new address. Today you add a **reception desk** (a Service), a **notice board** (a ConfigMap) and a **locked drawer** (a Secret). You also learn to **scale**.

**By the end of this class you can:**

- Reach an app through a **Service**
- Explain why we use a Service, not a pod's address
- Put settings in a **ConfigMap** and a **Secret**
- **Scale** up and down

## Prerequisites

- Class 1 finished, with the `cafe` cluster still running and your `~/practice/k8s-cafe` folder

## Step 0: Return to your project

**Run it:**

```bash
export PATH="$HOME/.local/bin:$PATH"
cd ~/practice/k8s-cafe
kubectl config use-context kind-cafe
kubectl get deployment welcome
```

**What you should see:** `Switched to context "kind-cafe".` and `welcome   2/2`.

**If yours looks different:** if the cluster is gone (for example the Codespace restarted), run `kind create cluster --name cafe`, then `kubectl apply -f deployment.yaml`.

## Step 1: Why pods need a Service

**Run it:**

```bash
kubectl get pods -o wide
```

**What you should see:** two pods, each with its own `IP` address.

If a pod dies, its replacement gets a **different** address. Anything that remembered the old one is now lost. A **Service** gives a **steady name and address**, and it sends customers to whichever pods are healthy, like a reception desk.

## Step 2: Write a Service

**Run it:**

```bash
cat > service.yaml <<'EOF'
apiVersion: v1
kind: Service
metadata:
  name: welcome
spec:
  selector:
    app: welcome
  ports:
    - port: 80
      targetPort: 80
EOF
kubectl apply -f service.yaml
kubectl get service welcome
kubectl get endpoints welcome
```

**What it does:**

- `selector: app: welcome` means *send customers to any pod with this tag*. It is the same tag as in the Deployment.
- `port: 80` is the door customers knock on. `targetPort: 80` is the door on the pod.
- `endpoints` lists the pods the Service is currently sending to.

**What you should see:** a Service with a `CLUSTER-IP`, and `ENDPOINTS` showing **two** pod addresses.

## Step 3: Reach it by name

**Why this matters:** inside the cluster, apps find each other by the Service **name**.

**Run it:**

```bash
kubectl run tester --rm -i --restart=Never --image=curlimages/curl:8.10.1 -- curl -s http://welcome | head -4
```

**What it does:** starts a short-lived pod, asks `http://welcome` by name, prints the first lines, then deletes itself (`--rm`).

**What you should see:**

```text
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
```

**If yours looks different:** if you see `Could not resolve host`, check the Service exists with `kubectl get service welcome`.

## Step 4: See it in your browser

**Run it:**

```bash
kubectl port-forward service/welcome 8080:80
```

**What it does:** opens a tunnel from port 8080 in your Codespace to the Service. This command keeps running.

Open the **Ports** tab in your Codespace and open port **8080**, or open a **second terminal** and run `curl -s localhost:8080 | head -4`.

**What you should see:** the *Welcome to nginx!* page.

Press **Ctrl+C** in the first terminal to stop the tunnel.

## Step 5: Scale up and down

**Run it:**

```bash
kubectl scale deployment welcome --replicas=4
kubectl rollout status deployment/welcome --timeout=120s
kubectl get pods
kubectl get endpoints welcome
```

**What it does:** asks for four copies. Kubernetes creates two more, and the Service starts sending to them too.

**What you should see:** four pods `Running`, and four addresses in `ENDPOINTS`.

Now go back to two:

```bash
kubectl scale deployment welcome --replicas=2
kubectl get pods
```

**What you should see:** two pods remain. Extra ones show `Terminating` for a moment.

> 💡 `kubectl scale` changes the live cluster but **not your file**. The file still says `replicas: 2`. The file is the source of truth: for lasting changes, edit the file and `apply` it.

## Step 6: A ConfigMap (the notice board)

**Why this matters:** settings that change should not be baked into the app. A **ConfigMap** holds plain settings and files. We use it to replace the nginx page with a café page.

**Run it:**

```bash
cat > configmap.yaml <<'EOF'
apiVersion: v1
kind: ConfigMap
metadata:
  name: welcome-page
data:
  index.html: |
    <html>
      <body>
        <h1>Welcome to the Coraxshift Net Café</h1>
        <p>Served by Kubernetes.</p>
      </body>
    </html>
EOF
kubectl apply -f configmap.yaml
kubectl get configmap welcome-page
```

**What you should see:** `configmap/welcome-page created`, then a row with `DATA 1`.

## Step 7: A Secret (the locked drawer)

**Why this matters:** passwords and keys must not sit in files you commit. We create the Secret **straight from the terminal**, so the value never goes into a file.

**Run it:**

```bash
kubectl create secret generic cafe-secret --from-literal=CAFE_PASSCODE='practice-value-123'
kubectl get secret cafe-secret
kubectl get secret cafe-secret -o jsonpath='{.data.CAFE_PASSCODE}'; echo
kubectl get secret cafe-secret -o jsonpath='{.data.CAFE_PASSCODE}' | base64 -d; echo
```

**What it does:** creates the Secret, then shows what is stored, then decodes it.

**What you should see:** `secret/cafe-secret created`; a strange-looking text (`cHJhY3RpY2Ut...`); then `practice-value-123`.

> ⚠️ **Base64 is not encryption.** It is just a different way of writing text, and anyone allowed to read the Secret can decode it. That is why access to Secrets must be limited, and why you never commit one to Git.

## Step 8: Use both in the Deployment

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
      volumes:
        - name: page
          configMap:
            name: welcome-page
EOF
kubectl apply -f deployment.yaml
kubectl rollout status deployment/welcome --timeout=120s
```

**What it does:**

- `env` gives the container a setting named `CAFE_PASSCODE`, taken from the Secret.
- `volumes` makes the ConfigMap available as files, and `volumeMounts` places them where nginx looks for its web page.
- Because the pod's blueprint changed, Kubernetes **replaces the pods one at a time**.

**What you should see:** `deployment "welcome" successfully rolled out`.

## Step 9: Check that it worked

**Run it:**

```bash
kubectl run tester --rm -i --restart=Never --image=curlimages/curl:8.10.1 -- curl -s http://welcome
POD=$(kubectl get pods -l app=welcome -o jsonpath='{.items[0].metadata.name}')
kubectl exec "$POD" -- printenv CAFE_PASSCODE
```

**What you should see:** the café page (`Welcome to the Coraxshift Net Café`), then `practice-value-123`.

**If yours looks different:** if you still see the nginx page, wait ten seconds for the old pods to finish being replaced, then try again.

## Step 10: Change the notice board

**Why this matters:** you can change a setting without touching the app's image.

**Run it:**

```bash
sed -i 's/Served by Kubernetes\./Served by Kubernetes, version two./' configmap.yaml
kubectl apply -f configmap.yaml
kubectl rollout restart deployment/welcome
kubectl rollout status deployment/welcome --timeout=120s
kubectl run tester --rm -i --restart=Never --image=curlimages/curl:8.10.1 -- curl -s http://welcome
```

**What it does:** updates the ConfigMap, then restarts the pods so they pick it up.

**What you should see:** the page now says `Served by Kubernetes, version two.`

## Step 11: Save your work (without the secret)

**Run it:**

```bash
git add deployment.yaml service.yaml configmap.yaml
git commit -m "Add Service, ConfigMap and Secret reference"
git status --short
```

**What you should see:** a commit message, then nothing.

Notice there is **no secret file**. The Secret exists only in the cluster.

## ✅ Recap

- A **Service** gives a steady name and address and sends customers to healthy pods.
- Apps find each other by Service name.
- `kubectl scale` changes the count. The file stays the source of truth.
- A **ConfigMap** holds plain settings and files. A **Secret** holds sensitive values.
- Base64 is **not** encryption. Never commit secrets.
- Changing the blueprint replaces pods one at a time.

## 📤 Push to your portfolio

In your portfolio repository, create `kubernetes/class-2/` and add:

1. Your `deployment.yaml`, `service.yaml` and `configmap.yaml`, with **your own** page text
2. A `notes.md` answering: *Why a Service and not a pod's address? What is the difference between a ConfigMap and a Secret? Why is a Secret not hidden by base64?*

Next up: [Class 3: Updates and self-healing](class-3-updates-and-self-healing.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-cluster-pods-deployments.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-updates-and-self-healing.md)</td></tr></table>
