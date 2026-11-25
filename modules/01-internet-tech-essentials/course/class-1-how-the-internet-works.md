# Class 1: How the Internet Works

**Internet & Tech Essentials · Coraxshift DevOps Academy** · ⏱️ 2 hours

## 👋 Welcome to your first class

Today you will follow one simple action, typing `google.com` and pressing Enter, all the way from your computer to a server on the other side of the world and back. You will test each part yourself using three small commands. By the end, "the internet" will stop being one big mystery and become a handful of ideas you can explain.

**By the end of this class you can:**

- Open a terminal and recognise the prompt
- Explain packets, IP addresses, TCP/IP, HTTP and HTTPS in plain words
- Run `ping` and `nslookup` and read the answers
- Explain what DNS does and name the four common DNS records
- Tell the difference between "the internet is down" and "the name lookup failed"

## Prerequisites

- A computer with a web browser and an internet connection
- Nothing else. No tech experience needed.

## How every step works

Each step has five parts: **Why this matters**, **Run it**, **What it does**, **What you should see**, and **If yours looks different**.

> 💡 **Your output will never match ours character for character.** Compare the *meaning*, not every letter.

## Part 1: The big picture (read this first, no typing)

Imagine sending a parcel to a friend in another country.

| In the parcel world | On the internet |
|---|---|
| You write your friend's **name** on it | You type a **domain name**, like `google.com` |
| The post office looks up their **street address** | **DNS** looks up the **IP address** |
| The parcel is split into several boxes if it is big | Your data is split into **packets** |
| Each box may travel a different route | Packets can take **different routes** |
| Your friend checks all boxes arrived, in order | **TCP** checks that everything arrived, in order |
| The shop on the other end opens the parcel and answers | The **server** reads your request and sends the page back |

Here is the same journey in order, when you type `google.com` and press Enter:

1. Your browser asks **DNS**: "What is the IP address for `google.com`?"
2. DNS answers with a number address, for example `142.250.80.46`.
3. Your browser sends a request to that address, as small **packets**.
4. The packets cross many networks. Some may take different routes.
5. The **server** receives them, puts them back together and reads your request.
6. The server sends the web page back, as packets again.
7. Your browser puts them together and shows you the page.

All of that takes a fraction of a second.

### The words you need

| Word | Plain meaning |
|---|---|
| **Internet** | Millions of networks joined together so computers can talk |
| **IP address** | A number address for a device on a network, like a street address |
| **Packet** | A small piece of your data, with the "to" and "from" addresses on it |
| **Packet switching** | Sending data as packets that can each take their own route |
| **TCP** | The part that makes sure all packets arrive and are put back in order |
| **IP** | The part that puts the "to" and "from" address on each packet |
| **TCP/IP** | TCP and IP working together. The basic rules of the internet |
| **HTTP** | The language a browser and a server use to ask for and send pages |
| **HTTPS** | HTTP with a lock on it. The conversation is **encrypted**, so others cannot read it |
| **DNS** | The internet's contacts list. It turns names into IP addresses |
| **Domain** | A readable name you pick, such as `coraxreads.com` |
| **Server** | A computer or program that waits for requests and answers them |
| **Port** | A numbered "door" on a server. Websites normally use 80 (HTTP) and 443 (HTTPS) |

> 💡 **Why do we care about HTTPS?** Without it, anyone on the same network, for example the Wi-Fi in a cafe, could read what you send. That is why your browser shows **Not Secure** on sites that only use HTTP.

> 📖 **From my café:** In my café, every page a customer opened was a parcel on a journey: out of their computer, along the cable, through the router, onto the internet, and back. When something was not working, I learned to follow the parcel step by step: is the computer fine, is the cable in, is the router working, is the line up? Most problems are simple once you know where to look.

## Part 2: Open your terminal

**Why this matters:** a terminal is a window where you type an instruction and the computer answers. It is faster and more exact than clicking, and it is where DevOps work happens. Think of it as texting your computer.

You do **not** run these commands in your browser. Open the terminal for your computer:

**Windows**

1. Press the **Windows key**
2. Type `Command Prompt`
3. Click **Command Prompt**. You will see something like `C:\Users\YourName>`

**Mac**

1. Press **Cmd + Space**
2. Type `Terminal` and press **Enter**. You will see something like `yourname@Mac ~ %`

**Linux**

1. Press **Ctrl + Alt + T**. You will see something like `yourname@laptop:~$`

That line is called the **prompt**. It means the computer is waiting for you to type. After each command, press **Enter**.

## Step 1: Test the connection with an IP address

**Why this matters:** before testing names, test whether your computer can reach the internet at all. An IP address needs no name lookup, so this tests the road and nothing else.

**Run it:**

```text
ping 8.8.8.8
```

**What it does:** `ping` sends a tiny test message to `8.8.8.8` (a Google server) and waits for a reply, like knocking on a door and listening for "who's there?".

**What you should see:**

On Windows, it stops by itself after 4 replies:

```text
Reply from 8.8.8.8: bytes=32 time=25ms TTL=115
```

On Mac or Linux, it keeps going until you press **Ctrl + C**:

```text
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=25.123 ms
```

**What it means:** a reply means that destination answered you. Your `time` will be different. A smaller time means a faster connection.

**If yours looks different:** `Request timed out` or `Network is unreachable` does not always mean your Wi-Fi is off. Some networks block ping on purpose. Check your connection, then move on to Step 2 and Step 3, and compare the results before you decide the internet is down.

## Step 2: Test a name (this uses DNS)

**Why this matters:** people use names, computers use numbers. If Step 1 works and this step fails, you have learned something useful: the road works, but the contacts list does not.

**Run it:**

```text
ping google.com
```

**What it does:** your computer first asks DNS for the IP address of `google.com`, then pings that address.

**What you should see:**

On Windows:

```text
Pinging google.com [142.250.80.46] with 32 bytes of data:
Reply from 142.250.80.46: bytes=32 time=24ms TTL=115
```

On Mac or Linux:

```text
PING google.com (142.250.80.46): 56 data bytes
64 bytes from 142.250.80.46: icmp_seq=0 ttl=115 time=24.123 ms
```

On Mac or Linux, press **Ctrl + C** to stop.

**What it means:** DNS worked. It turned `google.com` into a number address. **Your number will be different.** That is fine, because Google has many servers.

**If yours looks different:**

| What you see | Most likely reason |
|---|---|
| `could not find host` or `could not resolve host` | The name lookup failed. DNS is the problem |
| The name resolves but the pings time out | The network may block ping replies. Try opening a website in your browser |

## Step 3: Watch DNS answer with `nslookup`

**Why this matters:** `ping` hides the lookup inside. `nslookup` shows you the lookup on its own, so you can see exactly what DNS says.

**Run it:**

```text
nslookup google.com
```

**What it does:** it asks your DNS server directly for the IP address of `google.com`.

**What you should see:** something like this. Your numbers will be different:

```text
Server:   192.168.1.1
Address:  192.168.1.1#53

Non-authoritative answer:
Name:     google.com
Addresses: 142.250.80.46
```

**What it means:**

- `Server` is the DNS server that answered you. Yours will be different.
- `Name` is the name you asked about.
- `Addresses` is the number address DNS found. A name can have more than one.

**If yours looks different:** if `nslookup` times out, your DNS server may be unreachable or your network blocks it. Check Wi-Fi or VPN settings. Do not change router settings unless you own the router.

## Step 4: Put the two tests together

**Why this matters:** two simple tests tell you which part is broken. This is the beginning of troubleshooting, and you will use it for the rest of your career.

| `ping 8.8.8.8` | `ping google.com` | What it tells you |
|---|---|---|
| ✅ works | ✅ works | Everything is fine |
| ✅ works | ❌ fails | The road is fine. **DNS is the problem** |
| ❌ fails | ❌ fails | Check your connection first. (Remember some networks block ping) |

> 💡 A reply to `ping` only proves one thing: that one destination answered. It does not prove that every website works.

## Part 3: DNS records (read, no typing)

A domain has a small set of notes stored in DNS. These notes are called **records**. You only need four for now:

| Record | What it does | Everyday comparison |
|---|---|---|
| **A** | Connects a name to an IPv4 address (like `102.130.45.78`) | "This shop is at this street address" |
| **CNAME** | Connects a name to **another name** | "This shop is also known as that shop" |
| **MX** | Says where the domain's **email** goes | "Send letters to this post box" |
| **TXT** | Stores a text note, often used to prove you own the domain | "A signed note stuck on the door" |

Example: your friend owns `coraxreads.com` and the server's address is `102.130.45.78`. They add an **A record** that connects `coraxreads.com` to `102.130.45.78`.

> 💡 DNS only connects the name to the address. It does not choose the port. Port numbers such as 3000 are handled by the app or web server.

## Draw it

**Why this matters:** drawing a thing is the quickest way to find out whether you really understand it.

On paper, or with a free tool like [draw.io](https://app.diagrams.net/), draw four boxes:

```text
Browser  →  DNS  →  Server  →  App
```

Under each box, write one sentence in your own words. Then write three sentences answering: **What happens when you type `google.com` and press Enter?**

## ✅ Recap

- The internet is networks joined together. Data travels as **packets**, which can take different routes.
- **IP** addresses the packets, **TCP** makes sure they all arrive in order.
- **HTTP** is how browsers and servers talk. **HTTPS** is the same with encryption.
- **DNS** turns a name into an IP address.
- `ping 8.8.8.8` tests the road. `ping google.com` tests the road **and** DNS. `nslookup` shows DNS on its own.
- Records: **A** (name to IPv4), **CNAME** (name to name), **MX** (email), **TXT** (text note).

## 📤 Push to your portfolio

1. In your `my-devops-portfolio` repository, click **Add file → Create new file**.
2. Name it `essentials/class-1.md`. (Typing the `/` creates the folder.)
3. Paste your three sentences and one-line descriptions of your four boxes. Add a photo of your drawing if you like.
4. Click **Commit changes**.

Next up: [Class 2: Apps, VS Code, using AI well and troubleshooting](class-2-apps-tools-and-ai.md). You're doing great. 🎉

---

<table width="100%"><tr><td align="left">[⬅️ Overview](00-overview.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Class 2 ➡️](class-2-apps-tools-and-ai.md)</td></tr></table>
