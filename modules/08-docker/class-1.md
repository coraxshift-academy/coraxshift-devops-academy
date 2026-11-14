# Class 1: Build an Image

**Time:** 2 hours
**Run commands in:** the folder containing your app's `package.json`.

## Image versus container

An image is a packaged recipe; a container is a running copy. A Dockerfile describes how to build the image.

Example Node Dockerfile:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

- `FROM` selects a base image.
- `WORKDIR` sets the working folder inside the image.
- Copying manifests before source allows dependency layers to be reused.
- `npm ci` installs exactly what the lockfile records.
- `USER node` avoids running the app as root.
- `EXPOSE` documents the app's listening port; it does not publish that port.
- `CMD` is the default process when a container starts.

Create `.dockerignore` and exclude `node_modules`, `.git`, `.env`, logs, and local build output.

Build and inspect:

```bash
docker build -t coraxreads:dev .
docker image ls coraxreads
```

`docker build` creates an image from the current build context; `-t` gives it a local name. Review the build context so secrets are not copied into an image.
