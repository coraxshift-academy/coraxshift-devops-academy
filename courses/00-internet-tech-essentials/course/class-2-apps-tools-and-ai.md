# Class 2: Apps, VS Code, Using AI Well and Troubleshooting

**Internet & Tech Essentials · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your second class

In Class 1 you followed a request to a server. Today you look at what is *inside* that server's world: how an app is built. Then you set up the editor engineers use every day, learn how to use an AI assistant without being fooled by it, and learn the 5-step method for fixing anything that breaks.

**By the end of this class you can:**

- Explain frontend, backend and database in plain words
- Say the difference between a two-tier and a three-tier app, and draw both
- Open VS Code, open its terminal and run your first commands in it
- Write a good prompt for an AI assistant, and check what it tells you
- Use the 5-step method to troubleshoot, and write a troubleshooting note

## Prerequisites

- [Class 1](class-1-how-the-internet-works.md) completed
- A way to open VS Code: the free online editor or the desktop app (see [Getting Started](../GETTING-STARTED.md))

## Part 1: How an app is built (read, then draw)

**Why this matters:** when something breaks, the first question is "which part?". Knowing the parts lets you answer it.

Think of an online bookstore, which we will call **CoraxReads**. It has three jobs:

| Part | Job | Bookstore comparison | Example technologies |
|---|---|---|---|
| **Frontend** | What the user sees and clicks | The shop window | HTML, CSS, JavaScript, React |
| **Backend** | Checks requests and does the work | The clerk who checks your order | Node.js, Python, Java |
| **Database** | Stores the data | The stock ledger | PostgreSQL, MySQL, MongoDB |

A request goes through them in order, and the answer comes back the same way:

```text
Browser → Frontend (shop window) → Backend (clerk) → Database (stock ledger)
```

### Two-tier or three-tier?

**Two-tier:** the frontend talks **straight to the database**. It is simple, but it is hard to grow and hard to keep safe, because the browser reaches the data directly.

**Three-tier:** the frontend talks to the **backend**, and **only the backend** talks to the database. The clerk checks every order before the ledger is touched. This is easier to grow and safer, and it is how most real apps are built.

| | Two-tier | Three-tier |
|---|---|---|
| Parts | Frontend + Database | Frontend + Backend + Database |
| Who talks to the database | The frontend | Only the backend |
| Where the rules live | Mixed into the frontend | In the backend |
| Easy to grow | No | Yes |

> 💡 **A rule to remember:** the browser should talk to the backend. It should never connect straight to the database.

## Part 2: VS Code, your workspace

**Why this matters:** VS Code is the editor most engineers use. It has a terminal built in, so you write files and run commands in one window.

**Run it (steps):**

1. Open VS Code (the desktop app, or your Codespace in the browser).
2. Click **File → Open Folder** and open any folder. (In a Codespace you are already in one.)
3. Pick a theme you like: **File → Preferences → Theme → Color Theme**. (On a Mac it is under **Code → Settings → Theme**.)
4. Open the built-in terminal: **Terminal → New Terminal**, or press **Ctrl + `** (the key above Tab).
5. In that terminal, type the commands for your system:

| Your system | Type these, one at a time |
|---|---|
| Windows (desktop VS Code) | `whoami`, then `dir` |
| Mac or Linux | `whoami`, then `pwd`, then `ls` |
| Codespace | `whoami`, then `pwd`, then `ls` |

**What each command does:**

| Command | What it does |
|---|---|
| `whoami` | Shows your username |
| `pwd` | Shows the folder you are in (Mac, Linux, Codespace) |
| `ls` | Lists the files in the folder (Mac, Linux, Codespace) |
| `dir` | Lists the files in the folder (Windows) |

**What you should see:** your username, and the list of files in your folder. That proves it is *your* environment.

**If yours looks different:**

| What you see | Most likely reason and fix |
|---|---|
| The terminal does not open | Try **Terminal → New Terminal** from the menu. If nothing happens, close and reopen VS Code |
| `ls` is not recognised on Windows | You are in Windows PowerShell or Command Prompt. Use `dir` instead |
| An empty list | The folder is empty. That is fine |

> 💡 Take a screenshot that shows the editor, your theme and the terminal output. You need it for the assignment.

## Part 3: Using an AI assistant well

**Why this matters:** AI is a very fast helper that is sometimes wrong. If you know how to ask and how to check, it makes you better. If you trust it blindly, it makes you worse.

**Four rules:**

1. **Never paste passwords, keys or secrets** into an AI tool.
2. **Give context.** Say what you did, what you expected and what you saw.
3. **Check every answer.** Run it and read the result. Do not just copy it.
4. **If it is wrong, say so**, and ask again with what you found.

**A bad prompt:**

```text
My code is not working. Fix it.
```

**A good prompt:**

```text
I ran ping google.com and got "could not resolve host", but ping 8.8.8.8 works.
What is most likely broken and how do I check it? Explain to a beginner.
```

**Why the second one works:** it says what you ran, what you saw, what already works, and the level of explanation you want.

**Try it:** ask your AI assistant to explain TCP/IP to a beginner using one real-life example, like a letter or a phone call. Then check: is there a simple definition, and does the example make sense? Write down one thing you learned.

> 💡 If you do not have access to an AI assistant, ask your instructor to demonstrate it.

## Part 4: Troubleshooting like a professional

**Why this matters:** things will break. Engineers are not people whose things never break. They are people who have a method.

**Five steps, every time:**

| Step | What you do | Example |
|---|---|---|
| 1. **Reproduce** | Make the problem happen again | Run `ping google.com` again. Same error? |
| 2. **Read** | Read the **whole** error message, not just the first line | "could not resolve host" |
| 3. **Isolate** | What changed last? Which step broke? | `ping 8.8.8.8` works, so it is the name step |
| 4. **Ask** | Search or ask AI **with full context** | Use the good prompt above |
| 5. **Fix and write it down** | Fix it, then record what broke and how you fixed it | A note in your portfolio |

**Your turn:** write one troubleshooting note about something that has broken for you before, on a phone, computer, app or Wi-Fi. Use the five steps.

## ✅ Recap

- **Frontend** shows, **backend** works, **database** stores.
- **Three-tier** is safer and easier to grow: the browser talks to the backend, and only the backend talks to the database.
- VS Code has a built-in terminal. `whoami`, `pwd`, `ls` and `dir` tell you who and where you are.
- Good AI use: context in, checking out, never any secrets.
- Troubleshoot in five steps: **Reproduce, Read, Isolate, Ask, Fix and write it down.**

## 📤 Push to your portfolio

In your `my-devops-portfolio` repository, create `essentials/class-2.md` with:

1. Your short notes on frontend, backend and database
2. Your AI prompt, and one thing you learned from the answer
3. Your troubleshooting note

Then add your two diagrams (two-tier and three-tier), and your VS Code screenshot, with **Add file → Upload files**. Blur your username if you do not want it public.

Next up: [Class 3: Asking for help](class-3-asking-for-help.md). You're doing great. 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 1](class-1-how-the-internet-works.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 3 ➡️](class-3-asking-for-help.md)</td></tr></table>
