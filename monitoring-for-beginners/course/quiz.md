# Quiz: Monitoring and Observability for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **Monitoring and Observability badge**. Below that, you get one retake after reviewing the classes you missed.

Answer all of them **before** you look at the answers.

## Questions

**Q1. Choose ONE.** What is a metric?
- A. A sentence the app writes when something happens
- B. A named number that changes over time
- C. A password for Grafana
- D. A picture of a server

**Q2. Choose ONE.** `shop_orders_total` only ever goes up. Which type is it?
- A. Gauge
- B. Counter
- C. Histogram
- D. Label

**Q3. Choose ONE.** How does Prometheus get the shop's numbers?
- A. The shop pushes them every second
- B. Prometheus visits the shop's `/metrics` page on a schedule
- C. You type them in by hand
- D. Grafana sends them

**Q4. Choose ONE.** Which query shows how fast orders are arriving per second, averaged over the last minute?
- A. `shop_orders_total`
- B. `rate(shop_orders_total[1m])`
- C. `up`
- D. `shop_stock_items`

**Q5. Choose ONE.** Why do we look at the 95th percentile (p95) of latency and not only the average?
- A. An average can hide a group of customers who wait far too long
- B. p95 is always smaller than the average
- C. Averages cannot be calculated
- D. p95 is required by Grafana

**Q6. Choose ONE.** In the alert rule, what does `for: 30s` do?
- A. Deletes the alert after 30 seconds
- B. The condition must stay true for 30 seconds before the alert fires
- C. Sends 30 messages
- D. Checks the alert every 30 days

**Q7. Choose ONE.** What is Alertmanager's job?
- A. Collecting metrics from apps
- B. Drawing dashboards
- C. Deciding who is told about an alert, grouping and repeating it sensibly
- D. Storing logs

**Q8. Choose ONE.** The alert says orders are failing. Where do you look to find out **why**?
- A. The logs, for example `{job="shop-app", level="ERROR"}`
- B. The Grafana password file
- C. Nowhere. The alert is enough
- D. The Docker version

**Q9. Choose ALL that apply.** Which are good habits for alerts?
- A. Alert on symptoms customers feel, such as errors or the shop being down
- B. Make sure every alert tells the reader what to check first
- C. Alert on every metric that changes, to be safe
- D. Test the rule, for example with `promtool test rules`

**Q10. Choose ALL that apply.** Which belong to the four golden signals?
- A. Traffic
- B. Errors
- C. Latency
- D. Saturation

**Q11. Choose ALL that apply.** Which are good dashboard habits?
- A. One question per panel, with the question as the title
- B. Always set units
- C. Fill the screen with 40 panels so nothing is missed
- D. Show what customers feel (errors, slowness) before internal details

**Q12. Choose ALL that apply.** Which of these should stay out of Git, files shared with others, and screenshots?
- A. Passwords and tokens
- B. Your Codespace address
- C. The text of an alert rule
- D. The Grafana password, even though it is lab-only (do not reuse it elsewhere)

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-monitoring.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
