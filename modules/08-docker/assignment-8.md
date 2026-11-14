# Assignment 8: Containerize CoraxReads

**Time:** 3-4 hours
**Submit in:** your portfolio repository.

## Task 1 - Prepare the app

Use the course starter in `labs/coraxreads/` as your reference. Copy it into your portfolio repository or fork the course repository for the lab. Read `labs/coraxreads/README.md`. Run `npm ci` and `npm test`; confirm the health endpoint and catalog behavior in the source. Keep `.env` local and untracked.

## Task 2 - Write the Dockerfile

Review the starter `Dockerfile`, adapt it only if your app differs, and explain each instruction. Confirm the app uses the non-root `node` user.

## Task 3 - Write Compose

Review and run the starter `compose.yaml`. Identify the `app` and `db` services, private database network, named data volume, and health check. Set local values in `.env` using `.env.example`; do not commit `.env`.

## Task 4 - Build and test

Run:

```bash
docker compose config
docker compose up --build -d
docker compose ps
curl --fail --show-error http://localhost:3000/health
docker compose logs --tail=50
```

Explain what each command verifies. Change port 3000 if your app uses another port.

## Task 5 - Prove persistence and clean up

Create sample data. Run `docker compose down`, start again, and verify data remains. Then clean up containers. Keep the volume until the instructor confirms the evidence is complete; delete it only if the data is disposable.

## Submit

Dockerfile, `.dockerignore`, `compose.yaml`, `.env.example` with placeholders, run instructions, test evidence, persistence evidence, and one troubleshooting note. Never submit `.env`.
