# Troubleshooting

**Monitoring and Observability for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column. The best first move for any service is to read its log: `docker compose logs <service> | tail -30`.

## Docker and the lab

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `docker: command not found` | Your Codespace has no Docker | Create a new Codespace from the repository's default setup. Ask your instructor if it still fails |
| `docker compose` says no configuration file | You are in the wrong folder | `cd /workspaces/monitoring-for-beginners/lab` |
| `port is already allocated` or `address already in use` | An old container or program uses that port | `docker ps` to find it. If it is from this lab, run `docker compose down`. Do not stop containers you do not recognise |
| First start is very slow | Images are downloading | Wait a few minutes |
| A service keeps restarting | A config error, or too little memory | `docker compose logs <service> \| tail -30`. If the Codespace is short of memory, start fewer services (see below) |
| The Codespace feels slow | Eight containers on a small machine | Start only what the class needs, for example `docker compose up -d shop-app prometheus node-exporter`. Or rebuild the Codespace on a 4-core machine |
| `shop-app` fails to build | No internet, or a typo in your edit | Read the build output. If you edited `app.py`, check indentation |

## Prometheus

| What you see | Most likely reason | Safe next step |
|---|---|---|
| A target is **DOWN** | The app is not running, or the address is wrong | Check `docker compose ps`. Check the name in `prometheus.yml` matches the service name |
| No data in a query | No traffic, or the window is too short | Run `bash scripts/traffic.sh 60`, then widen the graph time range |
| The `rate(...)` graph is flat zero | No orders in the last minute | Send traffic |
| Alerts page is empty | The rules file did not load | `docker compose logs prometheus \| tail`. Run `docker run ... promtool check rules` from Class 3 |
| `promtool` says `FAILED` on a rule | A typo in the rules file | The error shows the line. Compare with the lesson, check indentation (spaces, not tabs) |
| After editing a rule, nothing changes | Prometheus has not reloaded it | `docker compose restart prometheus` |

## Grafana

| What you see | Most likely reason | Safe next step |
|---|---|---|
| Blank page | Grafana still starting | Wait 20 seconds and refresh |
| Password rejected | Typo, or you changed it earlier | Use `admin` / `lab-only-change-me`. If it still fails, `docker compose down -v` and start again (this resets Grafana) |
| Panels say **No data** | Wrong time range, or no traffic | Set **Last 15 minutes** and run the traffic script |
| **Shop logs** panel is empty in Class 2 | Log shipping starts in Class 3 | Expected |
| Cannot save the Shop overview dashboard | It is provisioned from a file | Build your own dashboard, as in Class 2 |
| Data source error `connection refused` | Prometheus or Loki is not running | `docker compose ps`, then start it |

## Alerts and logs

| What you see | Most likely reason | Safe next step |
|---|---|---|
| Alert stays **pending** | The `for:` time has not passed | Wait, and keep traffic flowing |
| Alert fires but no message in the receiver | Alertmanager's `group_wait`, or the receiver is not running | Wait 35 seconds. `docker compose ps`. `docker compose logs alertmanager \| tail` |
| No `ALERT RESOLVED` | The one-minute rate has not dropped yet | Send healthy traffic for another minute |
| The error ratio panel says **No data** | No orders in the window | Send traffic |
| Loki shows **No logs** | `promtail` is not shipping, or no log file | `docker compose logs promtail \| tail`. `ls -la logs`. Send traffic so the shop writes lines |
| `level="ERROR"` finds nothing | You have not broken the shop yet | `curl -s localhost:8000/break`, then send traffic |

## The panic button

If you are unsure what is running:

1. `docker compose ps` shows this lab's services.
2. `docker compose down -v` removes them all, including stored data. It is safe: the lab can always be started again.
3. `docker ps -a` shows everything on the machine. Do not remove containers you do not recognise.
