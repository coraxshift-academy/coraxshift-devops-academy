# Role Play: Explain Docker to a Business Owner

**Docker for Beginners · Coraxshift DevOps Academy** · ⏱️ 15 minutes (after the assignment)

## 🎭 The scenario

A business owner has a booking app built by a freelancer. It worked perfectly on the freelancer's laptop. When it was moved to the real server, it broke. The freelancer says, "It works on my machine." The owner is frustrated and asks you:

> *"My developer keeps talking about 'Docker' and 'containers'. I just want the app to work the same everywhere. What is it, and will it stop this happening again?"*

She is sharp but not technical. She will stop you at any jargon.

## 🎯 Your job

Explain Docker in **about one minute**, in plain words, with **no unexplained jargon**. Answer her two questions:

1. What is Docker, in a way I can picture?
2. Will it stop "it works on my machine" from happening?

## 💡 Ideas to build on

- Docker packs the app **together with everything it needs**, like a sealed meal-kit, so it behaves the same wherever it is opened.
- The package is called an **image**. A running copy is a **container**. You can start or throw away as many copies as you like.
- The **same package** that worked for the developer is the one that runs on the server. So the surprise is gone.
- Data you must keep is stored separately (a **volume**), so throwing away a container does not lose it.
- It is not magic: the app must still be well made, and secrets must be kept out of the package.

> 📖 **From my café:** In my café, the best experience came from every computer being set up the same way. If one seat behaved differently, customers noticed straight away. Docker gives software that same consistency: the same package, the same behaviour, in every seat.

## 🧪 A starting script (say it in your own words)

> "Think of a meal-kit that has every ingredient and the recipe sealed in one box. Wherever you open it, you get the same dish. Docker does that for software. Your developer packs the app and everything it needs into one sealed package, and that same package runs on his laptop and on your server. So 'it works on my machine' stops being an excuse, because the machine is inside the package. Anything you must keep, like your bookings, is stored separately, so a fresh copy never loses it."

Do **not** read it out. Say it in your own words.

## ✅ Pass check

- [ ] You spoke for about one minute
- [ ] You answered both of her questions
- [ ] You did not use "image", "container" or "volume" without explaining them
- [ ] You used one everyday comparison
- [ ] The listener could repeat your explanation in her own words

## 📤 What to push

In your portfolio, create `docker/role-play.md` with your one-minute explanation, in your own words.

---

<table width="100%"><tr><td align="left">[⬅️ Assignment](assignment-package-a-small-app.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Quiz ➡️](quiz.md)</td></tr></table>
