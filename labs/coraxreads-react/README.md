# CoraxReads React starter

This original React storefront is the build artifact for the Week 2 Nginx lab. It has no backend and stores no learner data.

## Build

Use Node.js 22.12 or newer and npm:

```bash
npm ci
npm run build
```

Vite writes the production files to `dist/`. The build is configured for Nginx to serve the app at `/coraxreads/`.

To preview the production build locally before copying it to Nginx:

```bash
npm run preview -- --host 0.0.0.0
```

For the full Codespaces deployment and recovery steps, follow [Week 2 Assignment 2A](../../modules/02-linux/assignment-2a-react-nginx.md).
