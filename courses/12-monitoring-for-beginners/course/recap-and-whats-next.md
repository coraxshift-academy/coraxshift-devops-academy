# Recap and What's Next

**Monitoring and Observability for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You can now collect metrics, ask questions with PromQL, build dashboards, write and test alerts, read logs, and shut the whole lab down cleanly.

```text
measure ─▶ collect ─▶ ask ─▶ show ─▶ alert ─▶ explain with logs ─▶ clean up
```

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Is everything up? | `up` |
| How fast is a counter growing? | `rate(name[1m])` |
| Split by a label | `sum by (label) (...)` |
| 95th percentile of timings | `histogram_quantile(0.95, sum by (le) (rate(name_bucket[1m])))` |
| Logs for one app | `{job="shop-app"}` |
| Only errors | `{job="shop-app", level="ERROR"}` |
| Lines containing a word | `{job="shop-app"} \|= "timeout"` |
| Count log lines by level | `sum by (level) (count_over_time({job="shop-app"}[5m]))` |
| Check alert rules | `promtool check rules file.yml` |
| Test alert rules | `promtool test rules tests.yml` |
| Start / stop the lab | `docker compose up -d --build` / `docker compose down -v` |

| Word | Plain meaning |
|---|---|
| **Metric** | A named number that changes over time |
| **Counter / gauge / histogram** | Only goes up / goes up and down / counts timings in buckets |
| **Target** | Something Prometheus visits |
| **PromQL** | The question language |
| **Dashboard** | A wall chart of panels, one question each |
| **Alert rule** | A condition plus a message |
| **Alertmanager** | Decides who hears about an alert, and how often |
| **Log** | A diary line of what happened |
| **Four golden signals** | Traffic, errors, latency, saturation |

## 🛡️ Your five golden rules

1. **Alert on what customers feel, and say what to do.**
2. **Test every alert.**
3. **One question per panel, with units, and a percentile instead of an average.**
4. **Metrics notice, logs explain.**
5. **Keep passwords and tokens out of files, screenshots and Git.**

## ➡️ What comes next

- **Monitor real servers:** add node exporter to a cloud server in the **AWS** course
- **Kubernetes:** monitor pods and clusters
- **Tracing:** follow one request through many services (the third pillar of observability, after metrics and logs)
- **On-call habits:** runbooks, severity levels and calm incident reviews

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just learned to see what a system is doing, and that is a skill every team needs.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
