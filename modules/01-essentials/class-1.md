# Week 1: Essentials - Internet, Networking and Tools Basics
Time: 3 classes, 2 hours each. Quiz at end of Week 1.

## How Week 1 works
Class 1: Welcome + Internet + Domain and DNS
Class 2: App Architecture + VS Code + AI + Troubleshooting + Asking Questions
Class 3: Review + Role Play + Assignment + Quiz

## Part 1: Introduction - Welcome to CoraxShift
What CoraxShift is. Build, break, fix, ship. One project from Week 1 to Week 12. Portfolio from Week 1.

## Part 2: How to get most of CoraxShift
1. Come to all 3 classes per week
2. Do the lab, do not just watch
3. Push every week to your portfolio
4. Take the weekly quiz. 90% earns the badge.
5. If it breaks, write what broke. That is learning.

## Part 3: Internet and Networking
Definitions first: Terminal, Command, Internet, IP Address, DNS, Server, Ping, Nslookup.
Where to run: Windows - Command Prompt. Mac - Terminal with Cmd + Space. Linux - Ctrl + Alt + T.
Steps: ping 8.8.8.8, ping google.com, nslookup google.com. Each step shows what the command does, expected output, what it means, and what to do if it is different.

## Part 4: App Architecture and Stack
CoraxShift Tasks architecture in plain words:
Frontend: What the user sees. HTML.
Backend: What does the work. Node.js + 【entity-Express¦canonical_name=Express】.
How they talk: Frontend sends a request, backend sends back data.
You will build this app in Week 1 and keep it to Week 12.

## Part 5: Domain and DNS
Domain: The name you buy, like coraxshift.com. DNS: The phonebook that turns that name into an IP.
DNS records in plain words:
A record: Name points to IP.
CNAME record: Name points to another name.
You will use nslookup to see this working.

## Part 6: Visual Studio Code Editor
VS Code is where we write code.
Steps: Open VS Code. Open Folder. Open Terminal inside VS Code with Ctrl + ` . Install 2 extensions only: Git and Docker. No extra extensions to confuse you.
You will write all your code in VS Code from now on.

## Part 7: How to use ChatGPT and AI tools
AI is an assistant, not an answer machine.
Rules:
1. Never paste passwords, keys, or secrets into AI.
2. Ask with context: What you did, what you expected, what you saw.
3. Verify every AI answer by running it and reading the output.
4. If AI is wrong, say so and fix it. That is learning.
Example good prompt: I ran ping google.com and got could not resolve host, but ping 8.8.8.8 works. What is most likely broken and how do I check?

## Part 8: Troubleshooting like a Pro with AI tools
5 steps, every time:
1. Reproduce: Can you make the error happen again?
2. Read: Read the error message fully, not just the first line.
3. Isolate: What changed last? What step broke?
4. Ask: Search or ask AI with full context.
5. Fix and document: Fix it, then write what broke and how you fixed it in your README.

## Part 9: Guidelines for asking questions effectively
Use this template every time:
1. What I was trying to do:
2. What I did:
3. What I expected:
4. What I saw instead, copy the exact error:
5. What I already tried:
If you ask like this, you will get help fast. If you ask My code is not working, no one can help you.

## Quiz 1: Knowledge Test - Week 1
12 questions, 20 minutes, at end of Class 3.
8 Choose ONE, 4 Choose ALL that apply.
Technical Standard: No ABC questions. Every question is scenario, output, or fix based. Every question comes from a lab we did this week. Every explanation explains why the correct answer is correct AND why each wrong answer is wrong.
90% and above, 11 out of 12, earns Week 1 Badge.

## Role Play 1: Explaining Technical Concepts to a Non-Technical Stakeholder
Scenario: A shop owner wants a website for her shop. She asks: What is DNS? Why do I need a domain?
Your job: Explain DNS in 1 minute, in plain words, no jargon, using the phonebook example. No saying IP address without explaining it.
Pass: She can repeat it back in her own words.

## Assignment 1: Basic Understanding of Internet, Networking and Tools Basics
In your portfolio repo, in modules/01-essentials, push:
1. Your internet diagram: Browser -> DNS -> Server -> App, with one sentence under each box
2. Your VS Code setup screenshot + list of tools installed with --version
3. Your CoraxShift Tasks project folder started, with README
4. Your answer: What happens when you type google.com and press enter, in 3 sentences
5. One troubleshooting note: One thing that broke this week and how you fixed it
