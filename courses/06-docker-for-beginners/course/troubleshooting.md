# Troubleshooting

**Docker for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Docker itself

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `Cannot connect to the Docker daemon` | Docker is not running | In a Codespace, reopen the terminal, or rebuild the container from the Codespace menu. Then run `docker version` again |
| `docker: command not found` | Docker is not installed in this environment | Use a Codespace that has Docker, then try again |
| `permission denied ... docker.sock` | Your user is not allowed to use Docker | In a Codespace this is rare. Ask your instructor |
| `compose is not a docker command` | Old Docker without the Compose plugin | Use `docker compose` (two words). Ask your instructor if it still fails |

## Building and running

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `failed to read dockerfile` | You are in the wrong folder | `pwd`, then `cd ~/practice/cafe-docker` |
| `port is already allocated` | Something is already using that port | `docker ps` to find it, then `docker rm -f NAME` |
| `container name ... is already in use` | An old container has that name | `docker rm -f NAME` |
| Container exits straight away | The program crashed | `docker logs NAME` and read the last lines |
| `curl: (7) Failed to connect` | Container not ready yet or the port is not published | Wait a few seconds, then check `docker ps` for the port |
| `curl: (56)` or an empty reply | The service is starting | Wait five seconds and try again |
| A file contains the word `EOF` | The closing `EOF` was not on its own line | Delete the file and copy the whole box again |

## Compose

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `yaml: ... mapping values are not allowed` | Wrong spacing in `compose.yaml` | Use two spaces per level and never tabs. Compare with the lesson |
| `app` stays `starting` | The health check has not passed yet | Wait 10 to 20 seconds, then `docker compose logs app` |
| Proxy shows `502 Bad Gateway` | The proxy cannot reach the app by name | Check the name in `nginx.conf` matches the service name, then `docker compose logs proxy` |
| `permission denied` writing to `/data` after Class 3 | The old volume belongs to root | `docker compose down -v`, then `docker compose up -d --build` |
| The visit count restarted | The volume was removed, for example with `down -v` | That is expected after `-v` |

## Git

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `.env` shows in `git status` | Missing `.gitignore` line | Add `.env` and do **not** commit it |
| `Author identity unknown` | Name and email not set | Use the `git config --global` lines from the Git course |

## 🆘 The panic button

If you are afraid you broke something:

1. Run `docker ps -a` and `docker compose ps` and read them. They change nothing.
2. Run `docker compose logs` and read the last lines.
3. Send the output to your instructor.

Do **not** run `docker system prune -a --volumes` to "fix" a problem. It can delete far more than you intend.
