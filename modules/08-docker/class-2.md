# Class 2: Compose App and Database

**Time:** 2 hours
**Run commands in:** the folder with `compose.yaml`.

## Compose example

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \"$${POSTGRES_USER}\" -d \"$${POSTGRES_DB}\""]
      interval: 5s
      timeout: 3s
      retries: 10
volumes:
  db-data:
```

- Compose creates a private network; the app reaches the database by service name `db`.
- `ports` publishes only the app port to the host. The database has no host port mapping.
- `depends_on` waits for the database health check before starting the app.
- A named volume keeps database files when the container is recreated.
- `$$` defers variable expansion to the container shell.

Put local values in `.env`, add `.env` to `.gitignore`, and never commit real passwords. Use a unique random local password.

Start and inspect:

```bash
docker compose config
docker compose up --build -d
docker compose ps
docker compose logs --tail=50 app
```

`config` renders/validates Compose; `up` builds and starts services in the background; `ps` shows state; `logs` shows recent app output.
