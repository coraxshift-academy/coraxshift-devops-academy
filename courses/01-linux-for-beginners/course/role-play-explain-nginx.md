# Role Play 2: Explain Nginx to a Shop Owner

**Linux for Beginners · Coraxshift DevOps Academy** · ⏱️ 15 minutes (after Class 3)

## Why we do this

Engineers spend a lot of time explaining technical things to people who aren't engineers: managers, clients, friends. If you can explain it simply, you truly understand it.

## Prerequisites

- [Class 3](class-3-processes-networking-scripting.md) Step 6 completed (you have served a web page with Nginx)

## The scenario

Ada runs a small finance shop called *Mini Finance* and wants a website. She asks you:

> "What is this Nginx thing? Why do we need it? Can you set it up?"

## Your job

Explain Nginx in **about 1 minute**, in plain words, with **no unexplained jargon**. Use the restaurant comparison:

- The **browser** is the customer at the table
- **Nginx** is the waiter
- The **web root** (`/var/www/html`) is the kitchen counter where the dishes (web pages) wait

## Example script (make it your own)

> "When you open a website, your browser asks for a page. Nginx is like a waiter. It takes that request, goes to the kitchen counter (a folder on the server called the web root), picks up the right page and brings it back to you. If the waiter isn't working, nobody gets served, so we check on him with `service nginx status`. Before we change anything about how he works, we run `nginx -t`, which is like checking the new menu for mistakes before handing it out. I've already set one up that serves a real game called 2048, so I can show you."

## Pass check

- ☐ You spoke for about 1 minute
- ☐ You explained every technical word you used
- ☐ Your partner could repeat the idea back in their own words
- ☐ You described the web root in plain words
- ☐ You mentioned testing before changing (`nginx -t`)

## 📤 Push to your portfolio

Write your 1-minute script in your portfolio, **in your own words**.

---

<table width="100%"><tr><td align="left">[⬅️ Assignment C](assignment-c-static-portfolio.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Role play: On-call ➡️](role-play-on-call.md)</td></tr></table>
