# CoraxShift learning portal (private preview)

This is a static, local-first course portal. It does not need a cloud account, backend, database, or third-party JavaScript package. The lesson Markdown remains the source of truth; weekly quizzes are read from their lesson files.

## Preview in the repository Codespace

From the repository root:

```bash
node scripts/build-website-index.mjs
python3 -m http.server 8080
```

Open `http://localhost:8080/website/` in the preview browser. If Codespaces asks about port visibility, keep port 8080 **Private**. Stop the server with `Ctrl+C`.

The portal is designed for local/private preview. Do not publish this private, paid course repository or its lesson files to a public Pages site.

## Learner data and quizzes

- Quizzes use the existing `modules/*/quiz-week-*.md` answer keys and explanations.
- A nickname and quiz results are stored in the browser's local storage on that device only.
- “Export my progress” downloads a JSON copy. Anyone with access to the browser or exported file may see its contents.
- There is no sign-in, tracking, server-side score storage, or account synchronization.
- Clearing this browser's site data clears its saved progress. Export a copy first if you need to keep it.

Account-backed progress is intentionally not enabled. Adding it requires choosing an identity provider and designing access control, data retention, deletion, and privacy notices first.

## Update and verify

After changing course Markdown, regenerate the search index and run the focused checks from the repository root:

```bash
node scripts/build-website-index.mjs
node scripts/build-website-index.mjs --check
node --test scripts/test-website.mjs
python3 scripts/check_docs.py
```
