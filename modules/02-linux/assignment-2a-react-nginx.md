# Assignment 2A: Build and Deploy CoraxReads with React and Nginx

- **Time:** 60 minutes
- **Level:** Beginner to intermediate
- **Where:** Ubuntu Codespace; no AWS, EC2, public IP, or cloud account
- **Save your report and screenshots in:** your separate learner portfolio repository

## The scenario

CoraxReads has a small React storefront. Your task is to turn its source code into browser-ready files, place those files in a dedicated Nginx folder, and verify the site from inside your Codespace. Think of the React source as a recipe and the `dist/` folder as the packed order that Nginx can hand to a browser.

```text
src/App.jsx + CSS -- Vite build --> dist/ -- Nginx --> browser
```

## What you will practice

- Check the Node.js and npm versions needed by the starter project.
- Build a React app for production rather than serving its source files.
- Deploy into a dedicated web-root subfolder without replacing Nginx's other files.
- Verify the HTTP response and the rendered page.

## Task 1 - Check the lab and personalize the demo

From the course repository root, run:

```bash
cat /etc/os-release
node --version
npm --version
nginx -v
```

`node --version` prints the JavaScript runtime version; `npm --version` prints the package manager version. Use Node.js 22.12 or newer, which meets the Vite version's runtime requirement. `nginx -v` prints Nginx's installed version. If a command is missing, use the [Getting Started guide](../../GETTING-STARTED.md) or ask your instructor; do not add an unverified package source.

Open the starter:

```bash
cd labs/coraxreads-react
nano src/App.jsx
```

Find `const displayName = "Your display name";` and replace only the value with a nickname or alias you are comfortable showing in a screenshot. Save with **Ctrl+O**, press **Enter**, then exit with **Ctrl+X**. Do not put an email address, full legal name, or other private details in the demo.

## Task 2 - Install the locked project dependencies and build

```bash
npm ci
npm run build
ls -lah dist/
```

- `npm ci` installs the exact dependency versions recorded in `package-lock.json`; it does not change the lock file.
- `npm run build` runs Vite and writes optimized static files into `dist/`.
- `ls -lah dist/` lists the generated files, including `index.html` and an `assets/` directory.

**Expected result:** the build completes without errors and `dist/` contains the production page and JavaScript/CSS assets. Build output should name the `dist/` folder. Asset hashes and exact sizes vary.

If `npm ci` reports a Node engine/version problem, stop and check `node --version`; do not delete the lock file or switch to `npm install` as a workaround.

## Task 3 - Start Nginx and deploy to its own subfolder

Return to the course repository root if you changed directories:

```bash
cd ../..
sudo service nginx start
sudo service nginx status
```

`service nginx start` starts the lab web server. `status` should report `active (running)`. Codespaces containers may not run `systemd`, so use `service` rather than `systemctl`.

Create a separate target folder and copy the build:

```bash
sudo install -d -m 755 /var/www/html/coraxreads
sudo cp -r labs/coraxreads-react/dist/. /var/www/html/coraxreads/
ls -lah /var/www/html/coraxreads/
```

`install -d` creates the directory with readable/traversable permissions. `cp -r` copies the production output, not the React source. This avoids clearing or replacing `/var/www/html` or Nginx's default files. Nginx only needs read access to these static files; do not use `chmod -R 755` or `chmod 777`.

Check the existing Nginx configuration before testing the site:

```bash
sudo nginx -t
```

**Expected result:** Nginx says the configuration syntax is okay and the test is successful. This command checks configuration; it does not restart the service.

## Task 4 - Verify the response and browser rendering

From the Codespace terminal:

```bash
curl -sS -o /dev/null -w 'HTTP %{http_code}\n' http://localhost/coraxreads/
curl -I http://localhost/coraxreads/
```

The first command hides the page body and prints its HTTP status; the expected result is `HTTP 200`. The second prints response headers; look for `HTTP/1.1 200 OK` (the HTTP version may differ).

Then open the **Ports** tab in Codespaces, forward port **80** if it is not already forwarded, and open the forwarded address in your browser. Keep the port visibility **Private**. Confirm that the CoraxReads page appears and that your chosen display name is visible.

The browser route is a private forwarded port, not a public IP address. Do not run `curl ifconfig.me`, open port 22, or create a cloud security group for this exercise.

## Submit

In your portfolio entry, include:

- The Node.js, npm, and Nginx version outputs.
- A screenshot of `npm run build` and `ls -lah dist/`.
- A screenshot or copied output showing `HTTP 200`.
- A sanitized browser screenshot of the CoraxReads page with your chosen display name.
- In your own words: what did Vite put in `dist/`, where did Nginx find it, and how did you prove the deployment worked?

## Troubleshooting

| Symptom | Check | Safe next step |
| --- | --- | --- |
| `node` or `npm` is not found | Run `node --version` and `npm --version` | Follow the Node.js timing in [Getting Started](../../GETTING-STARTED.md); do not install a second package manager. |
| Build fails with an engine message | Check the Node.js version and read the first error | Use Node.js 22.12 or a newer supported release, then rerun `npm ci`. |
| HTTP `404` | Check `ls -lah /var/www/html/coraxreads/` and the URL spelling | Copy the contents of `dist/` into the exact `/coraxreads/` path. |
| HTTP `403` | Check directory traversal and file read permissions with `namei -l /var/www/html/coraxreads/index.html` | Restore normal directory/file read permissions; never use mode `777`. |
| `curl` works but the browser does not | Check that port 80 is forwarded and remains Private | Open the forwarded port address from the Ports tab; do not substitute a public IP. |
| Browser shows a blank page | Inspect the browser developer console and confirm the built asset paths start with `/coraxreads/` | Rebuild from the starter project and recopy `dist/`; the Vite base path is configured for this subfolder. |
