# Assignment 2C: Add a Static Portfolio Page to Nginx

- **Time:** 60 minutes
- **Level:** Beginner
- **Where:** The same Ubuntu Codespace used for Assignments 2A and 2B
- **Save your page and report in:** your separate learner portfolio repository

Keep your portfolio repository available in this Codespace and run Task 1 from its root; the page source must not be committed to the private course repository. If the portfolio repo is not checked out here, create the file in a temporary working folder and copy the finished `index.html` into your portfolio repo before submitting. Nginx remains in the same Codespace either way.

## The scenario

CoraxReads already has a React storefront. A teammate also needs a small static project page to show their learning notes. Add a plain HTML page to a separate Nginx path without overwriting the React site.

```text
http://localhost/coraxreads/ -> React production build
http://localhost/portfolio/  -> your static HTML page
```

This is like adding a new shelf to a bookstore: the new page gets its own folder, and the existing app stays where it is.

## Task 1 - Create an original HTML page

From your portfolio repository root, create this folder and file:

```bash
mkdir -p modules/02-linux/assignment-2c/site
cd modules/02-linux/assignment-2c/site
nano index.html
```

Paste this small, original page into `nano`. Replace the display name and learning goals with details you choose to share; an alias is fine.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My DevOps Learning Shelf</title>
    <style>
      body { background: #f7f4ed; color: #293d34; font: 1rem/1.6 system-ui, sans-serif; margin: 0; }
      main { margin: 3rem auto; max-width: 46rem; padding: 2rem; }
      section { background: white; border-radius: 1rem; margin-top: 1.5rem; padding: 1.5rem; }
      a { color: #245c46; }
    </style>
  </head>
  <body>
    <main>
      <p>CoraxShift DevOps Academy / Week 2</p>
      <h1>My DevOps Learning Shelf</h1>
      <p>Made by: Your display name</p>
      <section>
        <h2>What I practiced</h2>
        <ul>
          <li>Built a React storefront for production.</li>
          <li>Served files through Nginx in a Linux lab.</li>
          <li>Checked a request and recovered from a practice failure.</li>
        </ul>
      </section>
      <p><a href="/coraxreads/">Visit the CoraxReads storefront</a></p>
    </main>
  </body>
</html>
```

Save with **Ctrl+O**, press **Enter**, and exit with **Ctrl+X**. Check your edit:

```bash
cat index.html
```

This page uses only HTML and CSS in one file. It does not need Node.js, a database, a third-party template, or external images.

## Task 2 - Deploy to a separate Nginx path

From the folder containing `index.html`, run:

```bash
sudo install -d -m 755 /var/www/html/portfolio
sudo cp index.html /var/www/html/portfolio/index.html
ls -lah /var/www/html/portfolio/
sudo nginx -t
```

`install -d` creates `/var/www/html/portfolio`; `cp` places the page there; `ls` confirms the file exists; `nginx -t` checks the current server configuration. The React app remains in `/var/www/html/coraxreads/`.

Make local requests to both sites:

```bash
curl -sS -o /dev/null -w 'Portfolio HTTP %{http_code}\n' http://localhost/portfolio/
curl -sS -o /dev/null -w 'CoraxReads HTTP %{http_code}\n' http://localhost/coraxreads/
```

Both should print `HTTP 200`. Open the forwarded port 80 address in your browser and visit `/portfolio/`, then `/coraxreads/`. Keep the port Private.

## Task 3 - Submit and reflect

Save `index.html`, a short explanation, and sanitized screenshots in your portfolio repository. In your own words, answer:

1. Which folder does Nginx use for the static page?
2. How did you prove both paths still work after adding the page?
3. What is different about serving this single HTML file and serving the React build?

Public social-media posting is optional. Do not include personal data or secrets in a public screenshot.

## Troubleshooting

| Symptom | Check | Safe next step |
| --- | --- | --- |
| Portfolio URL gives `404` | Run `ls -lah /var/www/html/portfolio/` | Confirm the file is named `index.html` and is in the `/portfolio/` folder. |
| Portfolio URL gives `403` | Run `namei -l /var/www/html/portfolio/index.html` | Check that each directory can be traversed and the file can be read; do not use `chmod 777`. |
| React page stopped working | Test `curl -sS -o /dev/null -w '%{http_code}\n' http://localhost/coraxreads/` | Do not replace `/var/www/html`; keep the two sites in their separate subfolders. |
| Nginx config test fails | Read the exact file and line in the error message | Do not restart the service; restore a known-good config and ask for help if needed. |
