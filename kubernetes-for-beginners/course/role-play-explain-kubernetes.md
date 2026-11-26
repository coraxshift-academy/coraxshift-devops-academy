# Role Play: Explain Kubernetes to a Business Owner

**Kubernetes for Beginners · Coraxshift DevOps Academy** · ⏱️ 15 minutes (after the assignment)

## 🎭 The scenario

A business owner runs an online shop. Last Friday the shop went down for two hours because one server failed, and nobody noticed until customers complained. Her developer says, "We should move to Kubernetes." She asks you:

> *"I keep hearing 'Kubernetes'. What does it actually do, and would it have stopped last Friday?"*

She is sharp but not technical. She will stop you at any jargon.

## 🎯 Your job

Explain Kubernetes in **about one minute**, in plain words, with **no unexplained jargon**. Answer her two questions:

1. What does Kubernetes do, in a way I can picture?
2. Would it have helped last Friday, and what does it **not** do?

## 💡 Ideas to build on

- You tell Kubernetes **what you want** ("keep three copies of my shop running"). It keeps reality matching that, all day, without being asked.
- If one copy fails, it **starts a replacement**. If the whole machine fails, it moves the work to another one.
- It can **add more copies** when busy and remove them when quiet.
- It can **update** the shop one copy at a time, so customers do not notice, and **go back** if the update is bad.
- It is not magic: it needs more than one machine to survive a machine failing, and the shop's own code must still be good. It also needs **monitoring**, so a person is told when something is wrong.

> 📖 **From my café:** In my café, a control screen showed me the sessions, but I still walked the floor, because noticing something unusual is only half the job: you must also act. Kubernetes does the acting part for you, automatically, and that is what you are really buying.

## 🧪 A starting script (say it in your own words)

> "Think of a manager who never sleeps. You tell her, 'I always want three seats serving customers.' If one seat breaks, she replaces it before anyone notices. If it gets busy, she opens more seats. If you want to change something, she does it one seat at a time so the shop never closes. That manager is Kubernetes. Last Friday it would very likely have replaced the failed server's work automatically, as long as you had more than one machine. What it does not do is write good software, or tell you in plain words that something is wrong. You still need monitoring for that."

Do **not** read it out. Say it in your own words.

## ✅ Pass check

- [ ] You spoke for about one minute
- [ ] You answered both of her questions
- [ ] You said honestly what Kubernetes does **not** do
- [ ] You used one everyday comparison
- [ ] You did not use "pod", "node" or "cluster" without explaining them
- [ ] The listener could repeat your explanation in her own words

## 📤 What to push

In your portfolio, create `kubernetes/role-play.md` with your one-minute explanation, in your own words.

---

<table width="100%"><tr><td align="left">[⬅️ Assignment](assignment-run-a-small-app.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Quiz ➡️](quiz.md)</td></tr></table>
