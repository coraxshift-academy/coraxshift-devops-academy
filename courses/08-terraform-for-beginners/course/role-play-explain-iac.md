# Role Play: Explain Infrastructure as Code to a Shop Owner

**Terraform for Beginners · Coraxshift DevOps Academy** · ⏱️ 15 minutes (after the assignment)

## 🎭 The scenario

A shop owner has three branches. Each time she opens a new branch, her IT helper sets up the computers, the Wi-Fi and the till by hand from memory. Branch two had no backup. Branch three had the wrong settings and nobody knows why. Last month the helper was ill and nothing could be fixed.

She asks you:

> *"My helper says he wants to 'write the setup as code'. Why would I pay for that? And what is this 'plan' he keeps talking about before he changes anything?"*

She is sharp, but she is not technical. She will stop you at any jargon.

## 🎯 Your job

Explain **Infrastructure as Code** in **about one minute**, in plain words, with **no unexplained jargon**. Make sure you answer her two questions:

1. Why write the setup as code?
2. What is a "plan", and why does it matter?

## 💡 Ideas to build on

- Writing the setup as code is like a **recipe**. Anyone can follow it and get the same dish, even when the usual cook is ill.
- Each new branch is built **from the same recipe**, so branch three matches branch one.
- A **plan** is the builder showing you the drawings **before** knocking down a wall. You see what will change, and you can say "stop".
- If something breaks, the recipe is still there, so you can rebuild.

> 📖 **From my café:** This is how I would put it: "Setting up twelve computers by hand means twelve chances for one to come out different. Writing the setup as code means every machine is built from the same recipe. Before any change, Terraform shows a plan, like a builder showing the drawings before touching the wall."

## 🧪 A starting script (say it in your own words)

> "Right now your setup lives in one person's head. If he is away, nobody knows how it was built. Writing it as code is like writing a recipe: anyone can follow it and get the same result, so every new branch is built the same way. And before any change, the tool shows a plan: exactly what it will add, change or remove. It is like the builder showing you the drawings before touching the wall. You see it, you approve it, and only then does anything happen."

Do **not** read it out. Say it in your own words.

## ✅ Pass check

- [ ] You spoke for about one minute
- [ ] You answered both of her questions
- [ ] You did not use "infrastructure", "provision" or "state" without explaining them
- [ ] You used one everyday comparison
- [ ] The listener could repeat your explanation in her own words

## 📤 What to push

In your portfolio, create `terraform/role-play.md` with your one-minute explanation, in your own words.

---

<table width="100%"><tr><td align="left">[⬅️ Assignment](assignment-build-a-small-site-with-code.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Quiz ➡️](quiz.md)</td></tr></table>
