# Recap and What's Next

**Terraform for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You can now describe a setup in code, preview it, build it, change it, spot drift and clean it up. These are the same habits used to manage real cloud infrastructure.

```text
write ─▶ fmt ─▶ validate ─▶ plan ─▶ read ─▶ apply ─▶ check ─▶ destroy the lab
```

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Check my version | `terraform version` |
| Tidy my files | `terraform fmt` |
| Download providers | `terraform init` |
| Check for mistakes | `terraform validate` |
| Preview changes | `terraform plan` |
| Save a plan | `terraform plan -out=name.tfplan` |
| Build from a saved plan | `terraform apply name.tfplan` |
| Show outputs | `terraform output` |
| List what Terraform tracks | `terraform state list` |
| Look at one entry | `terraform state show <name>` |
| Preview a clean-up | `terraform plan -destroy` |
| Clean up | `terraform destroy` |
| Keep junk out of Git | `.gitignore` with `.terraform/`, `*.tfstate*`, `*.tfplan` |

## 🛡️ Your four golden rules

1. **Read the plan before you apply.**
2. **Never commit state, plans or the `.terraform` folder.**
3. **Never edit state by hand to hide a problem.**
4. **Preview, then destroy. Always clean up your lab.**

## ➡️ What comes next

You practised on local files because the habits are identical to the cloud, without any risk or cost. The next steps are to **configure servers automatically** with Ansible, and later to point Terraform at **AWS** to build real networks and servers.

Ask your instructor about the next course.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
