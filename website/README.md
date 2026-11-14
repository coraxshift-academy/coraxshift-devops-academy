# CoraxShift learning portal (public preview)

This is a static course preview. The repository and this Pages site are currently public, so all lesson files, quiz questions, answers, and explanations are accessible. This preview does not require sign-in, enforce week-by-week access, or verify assignment completion. Do not use its local progress as proof of course completion, and do not enter or publish personal student information.

## Preview in the repository Codespace

From the repository root:

```bash
node scripts/build-website-index.mjs
python3 -m http.server 8080
```

Open `http://localhost:8080/website/` in the preview browser. If Codespaces asks about port visibility, keep port 8080 **Private**. Stop the server with `Ctrl+C`.

The eventual student portal is planned to use invite-only sign-in and server-verified progress. Until that replacement is configured and tested, treat this site and repository as fully public.

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
