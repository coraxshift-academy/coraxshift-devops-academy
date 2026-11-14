

# **Class 1: Internet, Networking, Domain and DNS**

Time: 2 hours

## **Where to run commands**

We run commands in a terminal: a window where you type instructions and the computer answers. You do not run these commands in your browser.

If you use Windows:
1. Press Windows key
2. Type Command Prompt
3. Click Command Prompt to open it
You will see C:\Users\YourName>

If you use Mac:
1. Press Cmd + Space
2. Type Terminal
3. Press Enter
You will see yourname@Mac ~ %

If you use Linux:
1. Press Ctrl + Alt + T
You will see yourname@laptop:~$

That line is called a prompt. It means the computer is waiting for you to type.

## **Definitions for this class**

- **Terminal:** The app where you type commands.
- **Command:** A typed instruction, such as `ping google.com`.
- **Internet:** Networks that let computers communicate.
- **IP address:** A numeric address used to find a device on a network.
- **DNS:** Like a contacts list: it helps find the IP address for a name such as `google.com`.
- **Server:** A computer or program that waits for and answers requests.
- **Ping:** A basic test that sends a message and waits for a reply.
- **Nslookup:** A command that asks DNS for information about a name.
- **Domain:** A readable name, such as `coraxreads.com`.

## **Step 1: Check internet with an IP**

In your terminal, type this and press Enter:

```text
ping 8.8.8.8
```

**What it does:** Sends a small ICMP test message to the IP address `8.8.8.8`. Because this command uses an IP address directly, it does not need to look up a domain name first. A reply tests one network path; it does not prove that every internet service works.

**Expected output on Windows:**

Reply from 8.8.8.8: bytes=32 time=25ms TTL=115
On Windows it stops by itself after 4 replies.

**Expected output on Mac or Linux:**

64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=25.123 ms
On Mac or Linux it keeps going. Press Ctrl + C to stop it.

**What it means:** A reply means that this destination responded to the network test. Your time and address may differ. If there is no reply, ICMP may be blocked; use the other checks before deciding the internet is down.

If you see `Request timed out` or `Network is unreachable`, it does not automatically mean Wi-Fi is off. A network may block ping messages. Check your connection, then try the DNS and browser checks below.

## **Step 2: Check names with DNS**

You are still in your terminal. Type:

```text
ping google.com
```

**What it does:** 

First asks DNS to turn google.com into an IP, then pings that IP.

**Expected output on Windows:**

Pinging google.com [142.250.80.46] with 32 bytes of data:
Reply from 142.250.80.46: bytes=32 time=24ms TTL=115

**Expected output on Mac or Linux:**

PING google.com (142.250.80.46): 56 data bytes
64 bytes from 142.250.80.46: icmp_seq=0 ttl=115 time=24.123 ms
Press Ctrl + C to stop it.

**What it means:** 

DNS worked. It turned the name into 142.250.80.46. 
Your IP will be different. That is okay. Google has many IPs.

If you see `could not find host` or `could not resolve host`, the name lookup failed. If the name resolves but ping times out, the network may block ping replies; try opening a website in the browser or ask your instructor.

## **Step 3: See DNS working with nslookup**

You are still in your terminal. Type:

```text
nslookup google.com
```

**What it does:** Asks your DNS server directly for the IP.

**Expected output:**
Server: 192.168.1.1
Address: 192.168.1.1#53
Non-authoritative answer:
Name: google.com
Addresses: 142.250.80.46

**What it means:** `Server` is the DNS resolver that answered. Yours will be different. The answer shows IPs for `google.com`. Addresses can change and a domain can have several.

## **Draw it**

Draw 4 boxes: Browser -> DNS -> Server -> App
Under each, write one sentence in your own words.
Then write 3 sentences: What happens when you type google.com and press enter?

## **Push**

In your portfolio, in modules/01-essentials, push your diagram and your 3 sentences.
