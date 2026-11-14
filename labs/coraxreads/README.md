# CoraxReads Teaching App

This small bookstore app is a course lab. It is not production-ready and must not be used for real customer data.

## What is inside

- `server.js`: Express API, database-backed health check, and book catalog endpoint.
- `public/index.html`: responsive bookstore storefront with a searchable, database-backed catalog.
- `db/init.sql`: sample PostgreSQL schema and data.
- `Dockerfile` and `compose.yaml`: local app + database environment.
- `test/server.test.js`: API tests that do not require a live database.

## Run locally with Docker Compose

From this directory:

```bash
cp .env.example .env
```

Edit `.env` and replace the example password with a unique local-only value. Never commit `.env`.

```bash
docker compose config
docker compose up --build -d
docker compose ps
curl --fail --show-error http://localhost:3000/health
curl --fail --show-error http://localhost:3000/api/books
```

- `config` checks the Compose file and resolves its variables.
- `up --build -d` builds and starts the services in the background.
- `ps` shows service state and health.
- `curl` checks readiness and retrieves the catalog.

Open `http://localhost:3000` in a browser. The app port is bound to the local machine only; the database port is not published to the host.

## Run tests

```bash
npm ci
npm test
```

The test suite uses a fake database client to test API behavior without database setup.

## Stop and reset

```bash
docker compose down
```

This stops and removes the containers but keeps the database volume. To reset disposable sample data, inspect `docker volume ls` and remove only the project-specific `postgres-data` volume after verifying that it contains no data you need.

The sample environment is for local learning only. Use managed secrets, authentication, rate limiting, database migrations, backups, TLS, and security review before designing a production service.
