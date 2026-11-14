# Week 8 Troubleshooting

| Problem | Likely reason | Next step |
| --- | --- | --- |
| Docker daemon unavailable | Engine is stopped or Codespace lacks Docker access | Run `docker version`; start Docker Desktop/Engine or use a supported host. Do not expose the socket publicly. |
| `npm ci` fails | Missing or mismatched `package-lock.json` | Run `npm install` in the project, review the lockfile change, commit it, then rebuild. |
| Container exits immediately | Startup command failed or app listened on the wrong interface/port | Run `docker compose logs app`; confirm app listens on `0.0.0.0`, not only `127.0.0.1`. |
| App cannot resolve `db` | Wrong Compose service name or services not on same network | Check `docker compose ps` and `docker compose config`; use the service name as hostname. |
| Database connection refused at startup | Database is not ready | Use a health check and `depends_on` condition; app should retry transient startup failures. |
| `port is already allocated` | Host port already used | Identify the listener; change only the host side of the mapping, e.g. `"3001:3000"`. |
| Data disappeared | A volume was removed or a different project/volume was used | Inspect `docker volume ls` and Compose project name; do not prune volumes. |
| Secret appears in image | `.env` was in build context or copied | Stop sharing the image, rotate the secret, add `.env` to `.dockerignore`, rebuild. |

Useful checks: `docker compose ps -a`, `docker compose logs app`, `docker inspect CONTAINER`, `docker compose config`. Inspect output before sharing; it may include environment values.
