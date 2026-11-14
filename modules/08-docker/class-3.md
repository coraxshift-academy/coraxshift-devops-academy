# Class 3: Verify, Secure, and Clean Up

**Time:** 2 hours
**Run commands in:** the Compose project directory.

## Verify the app and data

```bash
curl --fail --show-error http://localhost:3000/health
docker compose exec db pg_isready -U "$DB_USER" -d "$DB_NAME"
docker compose restart app
docker compose ps
```

- `curl --fail` checks HTTP success.
- `exec` runs a command inside an already-running service.
- `pg_isready` asks PostgreSQL whether it accepts connections.
- `restart` restarts only the named app service.

Add a sample book through the app or SQL, restart the database, and verify data still exists. Do not remove volumes during the persistence test.

## Security checklist

- Run the app as a non-root user.
- Keep the database off host-published ports unless a lesson specifically needs access.
- Do not bake `.env` into images.
- Use a maintained base image and update it deliberately.
- Do not use `privileged: true` to make permission problems disappear.

## Clean up

```bash
docker compose down
docker compose ps -a
```

`down` stops and removes Compose containers and network but keeps named volumes. Only after confirming the data is disposable may you remove the named volume with an explicit project-specific command. Volume deletion is irreversible.
