# Assignment: Package a Small App with Docker

**Docker for Beginners · Coraxshift DevOps Academy** · ⏱️ 2 to 3 hours · Level: beginner

## 🎯 What this is

You have packaged the café welcome board. Now package **your own** small app: a "notice board" for a business of **your choice** (a salon, a shop, a school, a church group). It shows a welcome message, counts visits, and has a health address. You will build the image, keep the count safe with a volume, put a front door in front of it with Compose, run it as a safe user, and clean up.

Use a **different** business, different words and a different port from the lesson, so the work is yours.

## ✅ Rules

1. Work in your Codespace only.
2. **No secrets** in any image or in Git. Keep `.env` out of Git.
3. Use **specific tags**, never rely on `latest`.
4. Write every note in your own words. Do not copy an AI answer.

## Task 1: Set up

1. Create a new project folder and run `git init`.
2. Create `.gitignore` containing `.env` **first**.
3. Copy the lesson's `app.py` into it and change the business name, the welcome words and the default name.

## Task 2: Build the image

1. Write a `Dockerfile` that runs as a **non-root** user and has a `HEALTHCHECK`.
2. Write a `.dockerignore` that keeps `.git`, `.env` and logs out.
3. Build with a clear tag, for example `mynotice:1.0`.
4. Run it, visit it with `curl`, and read its `/health` address.

## Task 3: Prove it is safe

1. Show who it runs as, with `whoami` inside the container.
2. Show that `.env` is **not** inside the image, by listing the folder.
3. Save both outputs in `notes.md`.

## Task 4: Keep the data

Add a **volume** for the visit count. Prove the count survives when the container is removed and recreated. Write down the numbers you saw.

## Task 5: Add a front door with Compose

1. Write `compose.yaml` with two services: your app and an nginx proxy.
2. Publish **only** the proxy's port. Prove the app's own port is closed.
3. Add a health check and make the proxy wait for it.
4. Run `docker compose config --quiet` before you start it.

## Task 6: Change a setting

Put the business name in `.env`. Add `.env.example`. Change the name, run `docker compose up -d`, and show the new name in the reply. Note what Compose did.

## Task 7: Read a failure

Cause **one** problem on purpose, for example a typo in the proxy's `proxy_pass` name. Copy the error or the symptom. In `failure-notes.md`, write: what you broke, what you saw, how you found the cause with `docker compose logs`, and how you fixed it.

## Task 8: Clean up

Remove the containers, the volume and your images **by name**. Show `docker ps -a` and `docker image ls` afterwards.

## 📦 What to hand in

Send your instructor:

1. The link to your portfolio folder (`app.py`, `Dockerfile`, `.dockerignore`, `compose.yaml`, `nginx.conf`, `.env.example`, `.gitignore`, notes)
2. The output of `git ls-files`, which must **not** list `.env`
3. A short reflection (five lines): *What is the difference between an image and a container? Why did you run as a non-root user?*

## 🏁 Done checklist

- [ ] `.gitignore` with `.env` created before the first commit
- [ ] Image built with a specific tag
- [ ] Non-root user shown with `whoami`
- [ ] `.env` proven absent from the image
- [ ] Visit count survives a container being recreated
- [ ] Compose file with two services and a proxy
- [ ] Only the proxy port open, app port proven closed
- [ ] Setting changed through `.env`
- [ ] One failure caused, read and fixed
- [ ] Everything cleaned up by name

<details>
<summary>Stuck on the failure? Hint (try first!)</summary>

Change `proxy_pass http://app:8000;` to `http://aap:8000;`, then run `docker compose up -d`. Visit the proxy and look at `docker compose logs proxy`. The log names the host it could not find. Fix the spelling and restart the proxy.

</details>

---

<table width="100%"><tr><td align="left">[⬅️ Class 3](class-3-safe-images-and-cleanup.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play ➡️](role-play-explain-docker.md)</td></tr></table>
