# Class 1: Cluster, Pods and Deployments

**Kubernetes for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome

Today you build a small practice cluster and run your first app on it. You will meet the two things you will use most: **pods** and **Deployments**.

**By the end of this class you can:**

- Install `kubectl` and `kind`, and start a practice cluster
- Read what is running with `kubectl get`
- Run an app as a **Deployment**
- Explain a pod, and why we use a Deployment instead

## Prerequisites

- Docker working in your Codespace (`docker version`)
- A Codespace with 4 GB of memory or more

## Step 0: Check your tools

**Why this matters:** `kubectl` is the remote control for Kubernetes. `kind` ("Kubernetes in Docker") makes a practice cluster inside Docker.

**Run it:**

```bash
docker version --format 'docker server {{.Server.Version}}'
kubectl version --client 2>&1 | head -1
kind version 2>&1 | head -1
```

**What it does:** asks each tool for its version.

**What you should see:** a Docker version. `kubectl` and `kind` may say `command not found`. That is fine, we install them next.

## Step 1: Install kind and kubectl

**Run it:**

```bash
mkdir -p ~/.local/bin
export PATH="$HOME/.local/bin:$PATH"
ARCH=$(uname -m); [ "$ARCH" = "x86_64" ] && ARCH=amd64; [ "$ARCH" = "aarch64" ] && ARCH=arm64
command -v kind >/dev/null || { curl -fsSLo ~/.local/bin/kind "https://kind.sigs.k8s.io/dl/v0.24.0/kind-linux-$ARCH" && chmod +x ~/.local/bin/kind; }
command -v kubectl >/dev/null || { curl -fsSLo ~/.local/bin/kubectl "https://dl.k8s.io/release/v1.31.0/bin/linux/$ARCH/kubectl" && chmod +x ~/.local/bin/kubectl; }
kind version
kubectl version --client
```

**What it does:** makes a personal `bin` folder, then downloads each tool only if it is missing, and makes it runnable. The `ARCH` lines pick the right download for your machine.

**What you should see:** `kind v0.24.0 ...` and `Client Version: v1.31.0` (or a newer `kubectl` if one was already installed).

**If yours looks different:** if a tool is still `command not found` in a **new** terminal, run `export PATH="$HOME/.local/bin:$PATH"` again. See [Troubleshooting](troubleshooting.md).

## Step 2: Create your practice cluster

**Why this matters:** you need somewhere safe to learn, where mistakes cost nothing.

**Run it:**

```bash
kind create cluster --name cafe
```

**What it does:** starts a node (a container pretending to be a computer) and installs Kubernetes on it. It takes one to three minutes the first time.

**What you should see:** steps ending with `Set kubectl context to "kind-cafe"` and `Thanks for using kind! 😊`.

**If yours looks different:** an error about memory or Docker means Docker is not running or the Codespace is too small. See Troubleshooting.

## Step 3: Check the cluster

**Run it:**

```bash
kubectl cluster-info --context kind-cafe
kubectl get nodes
```

**What it does:** asks the cluster to introduce itself and list its computers (nodes).

**What you should see:**

```text
Kubernetes control plane is running at https://127.0.0.1:...
NAME                 STATUS   ROLES           AGE   VERSION
cafe-control-plane   Ready    control-plane   1m    v1.3x.x
```

`Ready` means the node is working.

## Step 4: Look around

**Why this matters:** Kubernetes uses **namespaces** to keep things tidy, like rooms in a building. Everything we create goes in a room called `default`.

**Run it:**

```bash
kubectl get namespaces
kubectl get pods
kubectl get pods -A | head -8
```

**What it does:** lists the rooms, the pods in `default` (none yet), and the pods in **all** rooms (`-A`). The `head` shows only the first few lines.

**What you should see:** rooms such as `default` and `kube-system`; `No resources found in default namespace.`; then system pods (`coredns`, `etcd`, `kube-apiserver` ...) in `kube-system`. Those run Kubernetes itself.

## Step 5: Run a single pod

**Why this matters:** a **pod** is the smallest thing Kubernetes runs. It wraps one or more containers. Run one by hand to see what it is.

**Run it:**

```bash
kubectl run welcome --image=nginx:1.27-alpine
kubectl get pods
kubectl wait --for=condition=Ready pod/welcome --timeout=90s
kubectl get pods -o wide
```

**What it does:** creates a pod called `welcome` from the nginx image, waits until it is ready, and shows it with extra detail (`-o wide`), including its internal address.

**What you should see:** `pod/welcome created`, `pod/welcome condition met`, and a row with `welcome   1/1   Running`.

**If yours looks different:** `ContainerCreating` is normal for a few seconds while the image downloads. `ImagePullBackOff` means the image could not be downloaded; see Troubleshooting.

## Step 6: Describe and read logs

**Run it:**

```bash
kubectl describe pod welcome | head -25
kubectl logs welcome
```

**What it does:** `describe` shows the full story of the pod. `logs` prints what the program wrote.

**What you should see:** the pod's name, node and image, and below it an `Events:` list ending in `Started container welcome`.

> 💡 When something goes wrong, `describe` and its **Events** list are the first place to look.

## Step 7: Watch why a bare pod is not enough

**Why this matters:** you will see for yourself why we never run important things as a bare pod.

**Run it:**

```bash
kubectl delete pod welcome
kubectl get pods
```

**What you should see:** `pod "welcome" deleted`, then `No resources found in default namespace.`

The pod is **gone for good**. Nobody replaces it. We need a manager.

## Step 8: Write a Deployment

**Why this matters:** a **Deployment** says *"keep this many copies running, always"*. It is the manager from the café story.

**Run it:**

```bash
mkdir -p ~/practice/k8s-cafe
cd ~/practice/k8s-cafe
git init
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
EOF
cat deployment.yaml
```

**What it does, piece by piece:**

- `kind: Deployment` is the type of thing we are describing.
- `replicas: 2` means: keep **two** copies running.
- `selector` and `labels` are name tags. The Deployment manages every pod tagged `app: welcome`.
- `template` is the blueprint for each pod.
- `image: nginx:1.26-alpine` is the container to run. Note the exact **version tag**.

> ⚠️ **YAML cares about spaces.** Two spaces per level, never tabs. `- name` starts a list item.

**What you should see:** the file printed back.

## Step 9: Apply it

**Run it:**

```bash
kubectl apply -f deployment.yaml
kubectl get deployments
kubectl rollout status deployment/welcome --timeout=120s
kubectl get pods
```

**What it does:** `apply` hands your description to Kubernetes. `rollout status` waits until it is finished.

**What you should see:**

```text
deployment.apps/welcome created
deployment "welcome" successfully rolled out
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
welcome   2/2     2            2           20s
```

and two pods named like `welcome-xxxxxxxxxx-yyyyy`, both `Running`.

**If yours looks different:** if `READY` is `0/2`, wait ten seconds and run `kubectl get pods` again. An error naming a line number means a spacing mistake in the YAML.

## Step 10: Meet the layers

**Run it:**

```bash
kubectl get deployment,replicaset,pods
```

**What it does:** shows three layers at once.

**What you should see:** one Deployment, one **ReplicaSet** (the layer that actually counts copies), and two pods.

```text
Deployment ─▶ ReplicaSet ─▶ Pods
(what you want)  (keeps the count)  (the running copies)
```

You talk to the Deployment. It looks after the rest.

## Step 11: Save your work

**Run it:**

```bash
git add deployment.yaml
git commit -m "Add welcome Deployment"
git status --short
```

**What you should see:** a commit message, then nothing.

**If yours looks different:** if Git asks who you are, set your name and email as in the Git course.

## ✅ Recap

- `kubectl` controls the cluster. `kind` makes a practice cluster.
- A **pod** is the smallest unit. A bare pod that dies is **not** replaced.
- A **Deployment** keeps the number of copies you asked for.
- Deployment ▶ ReplicaSet ▶ Pods.
- `kubectl get`, `describe` and `logs` are how you look and investigate.
- `kubectl apply -f file.yaml` says: *make reality match this file*.

Leave your cluster running. We use it in Class 2.

## 📤 Push to your portfolio

In your portfolio repository, create `kubernetes/class-1/` and add:

1. Your `deployment.yaml`, changed to use **your own** app name and label
2. A `notes.md` answering: *What is a pod? Why is a Deployment better than a bare pod? What do `replicas: 2` and the `selector` do?*

Next up: [Class 2: Services and configuration](class-2-services-and-configuration.md). 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-services-and-configuration.md)</td></tr></table>
