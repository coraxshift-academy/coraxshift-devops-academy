# Class 2: App Architecture, VS Code, AI, Troubleshooting
Time: 2 hours

## Where to run commands
You will run commands in two places today:
1. In your normal terminal, like in Class 1
2. Inside VS Code, in its integrated terminal. That is a terminal inside VS Code.

## Definitions for this class
Frontend: What the user sees. Example: HTML page.

Backend: What does the work. Example: Node.js code that answers requests.

Database: Where data is stored. Example: PostgreSQL.

Architecture: How the parts are arranged and how they talk.

VS Code: The editor where we write code.

Integrated Terminal: A terminal inside VS Code. Shortcut: Ctrl + ` on Windows, Mac, Linux.

Prompt: A typed instruction to AI. A good prompt has context.

Troubleshooting: Finding what broke, fixing it, and writing it down.

## Part 1: App Architecture and Stack
CoraxReads architecture in plain words:
Frontend sends a request. Backend does the work. Database stores the data. Backend sends the answer back to Frontend.

Two-tier: Frontend + Database. Frontend talks straight to Database. Simple, but hard to grow.
Three-tier: Frontend + Backend + Database. Frontend talks to Backend, Backend talks to Database. Easier to grow and secure. This is what we use in CoraxShift.

Example stack for CoraxReads:

**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js + Express

**Database:** PostgreSQL

## Part 2: VS Code Editor
Steps:
1. Open VS Code
2. Click File, then Open Folder. Open your portfolio folder.
3. Pick a theme you like: File, Preferences, Theme, Color Theme
4. Open integrated terminal: Top menu, Terminal, then New Terminal
5. In that terminal, run for your system:
If you use Windows: whoami, then dir
If you use Mac or Linux: whoami, then pwd, then ls

What it does:
whoami: Shows your username
pwd: On Mac or Linux, shows your current folder
ls: On Mac or Linux, lists files in current folder
dir: On Windows, lists files in current folder

Expected output: You see your username and your files. That proves it is your environment.

## Part 3: How to use ChatGPT
AI is an assistant, not an answer machine.
Rules:
1. Never paste passwords, keys, or secrets into AI.
2. Ask with context: What you did, what you expected, what you saw.
3. Verify every AI answer by running it and reading the output.
4. If AI is wrong, say so and fix it.

Good prompt example:
I ran ping google.com and got could not resolve host, but ping 8.8.8.8 works. What is most likely broken and how do I check it? Explain to a beginner.

Bad prompt example:
My code is not working. Fix it.

## Part 4: Troubleshooting like a Pro with AI tools
5 steps, every time:
1. Reproduce: Can you make the error happen again?
2. Read: Read the full error message, not just the first line.
3. Isolate: What changed last? What step broke?
4. Ask: Search or ask AI with full context.
5. Fix and document: Fix it, then write what broke and how you fixed it.

Write one troubleshooting note today: One thing that broke and how you fixed it.
