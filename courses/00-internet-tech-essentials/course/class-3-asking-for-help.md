# Class 3: Asking for Help and Review

**Internet & Tech Essentials · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your last class

Knowing things is half the job. The other half is getting unstuck quickly, and explaining your work to people who are not technical. Today you learn a simple template for asking for help, review everything from the first two classes, and get ready for the assignment.

**By the end of this class you can:**

- Ask for help in a way that gets you answers fast
- Tell a good question from a bad one
- Explain the key ideas of the course without jargon
- Be ready to do the assignment, role play and quiz

## Prerequisites

- [Class 1](class-1-how-the-internet-works.md) and [Class 2](class-2-apps-tools-and-ai.md) completed

## Words for this class

| Word | Plain meaning |
|---|---|
| **Stakeholder** | A person who cares about the project but may not be technical, such as a shop owner |
| **Jargon** | Tech words that a non-technical person does not know, such as "IP address" |
| **Template** | A fixed shape you fill in every time |

## Part 1: How to ask a question that gets answered

**Why this matters:** nobody can help with "it's not working". People help quickly when you give them what they need. The same template works with a teacher, a colleague, a forum or an AI assistant.

**Fill this in every time:**

1. **What I was trying to do:**
2. **What I did:**
3. **What I expected:**
4. **What I saw instead** (copy the exact error):
5. **What I already tried:**

**A bad question:**

```text
My code is not working.
```

**A good question:**

```text
I was trying to open the terminal in VS Code and run dir.
I clicked Terminal, then New Terminal.
I expected to see my files.
I saw that the terminal did not open.
I already tried closing and reopening VS Code.
```

**Why it works:** the helper knows your goal, your steps, what should have happened and what you have already ruled out. They can start fixing straight away.

> 💡 **Copy the exact error message.** Do not retype it from memory, and do not describe it as "some red text". The exact words are the best clue.

### Practise it

Rewrite each bad question using the template. Invent the details, since this is practice.

1. "The internet is slow."
2. "My ping is broken."
3. "VS Code won't work."

## Part 2: Review

**Why this matters:** saying things out loud, to a person, shows you what you do not yet understand. If you can, do this with a partner. If not, say your answers out loud to yourself, or write them down.

Answer each question in your own words, without jargon. Then open the box to compare.

**1. What is DNS, in one sentence?**

<details>
<summary>Compare your answer</summary>

DNS is the internet's contacts list: it turns a name like `google.com` into the number address that computers use.

</details>

**2. What is the difference between `ping` to an IP and `ping` to a name?**

<details>
<summary>Compare your answer</summary>

`ping` to an IP address only tests the connection. `ping` to a name first asks DNS for the address, then tests the connection. So if the IP works and the name fails, DNS is the problem.

</details>

**3. What is the difference between two-tier and three-tier?**

<details>
<summary>Compare your answer</summary>

In two-tier, the frontend talks straight to the database. In three-tier, the frontend talks to the backend, and only the backend talks to the database. Three-tier is safer and easier to grow.

</details>

**4. Which DNS record connects a domain to an IPv4 address?**

<details>
<summary>Compare your answer</summary>

The **A record**.

</details>

**5. What is the first step when something breaks?**

<details>
<summary>Compare your answer</summary>

Reproduce it (make it happen again), then read the whole error message. Do not delete things or start changing settings at random.

</details>

## Part 3: What is next

Now do these, in this order:

1. The [assignment](assignment.md) (2 to 3 hours)
2. The [role play](role-play-explain-dns.md) (15 minutes)
3. The [quiz](quiz.md) (20 minutes)

## ✅ Recap

- Ask with the five-part template: what you tried, did, expected, saw (exact error), and already tried.
- Good questions are specific. Bad questions are vague.
- You can explain DNS, ping, three-tier apps and DNS records without jargon.

## 📤 Push to your portfolio

In your `my-devops-portfolio` repository, create `essentials/class-3.md` with your three rewritten questions and your answers to the five review questions.

Next up: the [assignment](assignment.md). You're doing great. 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Class 2](class-2-apps-tools-and-ai.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Assignment ➡️](assignment.md)</td></tr></table>
