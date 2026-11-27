# Recap and What's Next

**AWS for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You can now open an AWS account safely, build a small network, servers, storage and a database, put a load balancer in front of servers that replace themselves, name things, watch them, and, most importantly, **switch it all off and prove it**.

```text
safe account ─▶ server ─▶ network ─▶ storage ─▶ database ─▶ balance + scale ─▶ names ─▶ watching ─▶ CLEAN UP
```

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Know who I am signed in as | `aws sts get-caller-identity` |
| List running servers | `aws ec2 describe-instances --query 'Reservations[].Instances[].[InstanceId,State.Name]' --output text` |
| Copy a file into S3 | `aws s3 cp file.txt s3://BUCKET/file.txt` |
| Share one file for 5 minutes | `aws s3 presign s3://BUCKET/file.txt --expires-in 300` |
| Test an alarm | `aws cloudwatch set-alarm-state --alarm-name NAME --state-value ALARM --state-reason "test"` |
| List things I tagged | `aws resourcegroupstaggingapi get-resources --tag-filters Key=Project,Values=coraxshift-lab` |
| Check for leftovers | `bash scripts/aws-cleanup-check.sh` |

| Word | Plain meaning |
|---|---|
| **IAM** | Who may do what |
| **MFA** | A second lock: a code on your phone |
| **EC2** | A rented computer |
| **Security group** | The list of open doors |
| **VPC / subnet** | Your fenced plot / a section of it |
| **S3** | A lockable storage room |
| **RDS** | A managed database |
| **ALB / Auto Scaling** | The host at the gate / the manager of how many stalls are open |
| **Route 53** | The phone book |
| **CloudWatch** | The windows and the alarm bells |

## 🛡️ Your five golden rules

1. **Never use the root user for daily work. MFA on everything.**
2. **A budget warns you. You switch things off.**
3. **Know what a lab costs before you start it.**
4. **Tear down in order, and prove it with the check.**
5. **Keep keys, passwords and links out of Git.**

## ➡️ What comes next

You can now build things by hand. Next you will make them **repeatable** and **watched**:

- **Terraform on AWS:** describe the same VPC, servers and load balancer in code, so rebuilding and removing takes one command
- **Monitoring and Observability:** Prometheus and Grafana, to see how your systems behave over time
- **CI/CD on AWS:** deploy your site automatically when you push code

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
