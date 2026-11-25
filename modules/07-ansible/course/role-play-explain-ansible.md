# Role Play: Explain Ansible to a Business Owner

**Ansible for Beginners · Coraxshift DevOps Academy** · ⏱️ 15 minutes (after the assignment)

## 🎭 The scenario

A business owner has twelve computers across two rooms. Whenever something must change, such as a new notice, a setting or a software update, her IT helper walks to every computer. Last time he forgot two of them, and customers saw the old settings for a week. She asks you:

> *"My helper says he wants to use 'Ansible'. I just want every computer to be set up the same way without him forgetting any. What is it, and how do I know it did the job?"*

She is sharp but not technical. She will stop you at any jargon.

## 🎯 Your job

Explain Ansible in **about one minute**, in plain words, with **no unexplained jargon**. Answer her two questions:

1. What is it, and why is it better than walking from computer to computer?
2. How do we know it did the job, and what if one machine goes wrong?

## 💡 Ideas to build on

- Ansible is like **one control screen** for many computers. You write the instructions once, and it applies them to every machine.
- Because the instructions are written down, every machine gets the **same result**, and nobody can forget one.
- Before changing anything, it can **preview** what it would do.
- Running it again changes nothing if everything is already right.
- A **check** looks at every machine and reports which ones look abnormal. Only the broken one gets repaired.

> 📖 **From my café:** This is how I would put it: "In my café, the slow way to change something was to walk to every computer. The better way was one place that controlled them all, followed by a walk round to check. Ansible is that control screen for any number of computers, with the checking built in."

## 🧪 A starting script (say it in your own words)

> "Right now your helper walks to each computer, so something is always missed. Ansible is one control screen. He writes the instructions once, and it applies them to every computer in the same way. Before it changes anything it shows what it would do, so nothing surprises you. And afterwards it can check every machine and tell you which one looks wrong, so only that one needs fixing."

Do **not** read it out. Say it in your own words.

## ✅ Pass check

- [ ] You spoke for about one minute
- [ ] You answered both of her questions
- [ ] You did not use "inventory", "playbook" or "idempotent" without explaining them
- [ ] You used one everyday comparison
- [ ] The listener could repeat your explanation in her own words

## 📤 What to push

In your portfolio, create `ansible/role-play.md` with your one-minute explanation, in your own words.

---

<table width="100%"><tr><td align="left">[⬅️ Assignment](assignment-set-up-a-small-office.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Quiz ➡️](quiz.md)</td></tr></table>
