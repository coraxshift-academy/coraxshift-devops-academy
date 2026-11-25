# Recap and What's Next

**Ansible for Beginners · Coraxshift DevOps Academy** · ⏱️ 10 minutes

## 🎉 Well done

You can now describe a group of machines, set them all up from one place, preview changes, find the one that went wrong and repair only that one. These are the same habits used to manage real servers.

```text
inventory ─▶ playbook ─▶ --check --diff ─▶ run ─▶ recap ─▶ health check ─▶ repair with --limit
```

## 🧭 Your cheat sheet

| I want to... | Use |
|---|---|
| Check my version | `ansible --version` |
| See my machines and groups | `ansible-inventory --graph` |
| Test that I can reach machines | `ansible cafe -m ping` |
| Check a playbook's spelling | `ansible-playbook site.yml --syntax-check` |
| Preview changes | `ansible-playbook site.yml --check --diff` |
| Run a playbook | `ansible-playbook site.yml` |
| Aim at one machine or group | `--limit pc02` or `--limit customer_pcs` |
| See who a run would target | `--list-hosts` |
| Settings for a group | `group_vars/<group>.yml` |
| Settings for one machine | `host_vars/<host>.yml` |
| Fill a file with variables | `ansible.builtin.template` |
| Run something only after a change | `notify` and a handler |
| Look without changing | `ansible.builtin.stat` with `register` and `when` |

## 🛡️ Your four golden rules

1. **Preview before you run.**
2. **Describe the result you want, not the steps.**
3. **Repair only what is broken.** Use `--limit`.
4. **Never put passwords in a playbook or in Git.**

## ➡️ What comes next

Your machines here were pretend, because the habits are identical to the real thing without any risk. The next steps are to **package software in containers** with Docker, and later to run Ansible over SSH against real servers in the cloud.

Ask your instructor about the next course.

> 📖 **From my café:** Managing many machines is not about working harder on each one. It is about describing what you want once, letting the tool apply it, and watching for the one that goes wrong. Monitoring a system is not the same as managing it: you must observe, recognise abnormal behaviour and take the right action.

## Thank you

Our mission at Coraxshift DevOps Academy is to make tech education **accessible, practical and enjoyable**. You just took another real step towards being a confident engineer.

**Learn. Build. Deploy. Grow.** 👋

---

<table width="100%"><tr><td align="left">[⬅️ Quiz](quiz.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[🏠 Course home](../README.md)</td></tr></table>
