# Week 1, Class 1: How The Internet Really Works
Time: 2 hours - 30 mins learn, 60 mins do together, 30 mins questions and push

## Goal for this class
By the end, you can explain in your own words what happens when you type google.com and press enter, and you can prove it with 2 commands.

## What we are doing
We are checking how your computer finds a website. Not theory only. You will run the commands and read the output yourself.

## Step 1: Check if internet works, using an IP address

Command:
ping 8.8.8.8

What it does:
Ping sends a small message to 8.8.8.8, which is Google DNS, and waits for a reply. It tests if internet works, without using a name.

Expected output, on Windows:
Reply from 8.8.8.8: bytes=32 time=25ms TTL=115

Expected output, on Mac or Linux:
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=25.123 ms

What it means:
You got a reply. Internet works. Your time number will be different. That is okay. Time changes with your network.

If you see something else:
If you see Request timed out or Network is unreachable, your internet is off or blocked. Check WiFi, then run it again. Do not move to Step 2 until this works.

## Step 2: Check if names work, using DNS

Command:
ping google.com

What it does:
Ping tries to turn the name google.com into an IP address first, using DNS, then it sends the message.

Expected output, on Windows:
Pinging google.com [142.250.80.46] with 32 bytes of data:
Reply from 142.250.80.46: bytes=32 time=24ms TTL=115

Expected output, on Mac or Linux:
PING google.com (142.250.80.46): 56 data bytes
64 bytes from 142.250.80.46: icmp_seq=0 ttl=115 time=24.123 ms

What it means:
DNS worked. It turned google.com into 142.250.80.46. Your IP will be different. That is okay. Google has many IPs.

If you see something else:
If you see Ping request could not find host google.com or could not resolve host, DNS is broken, even if Step 1 worked. That is the key lesson: Internet can work, but DNS can fail. Write that down.

## Step 3: See DNS working, with nslookup

Command:
nslookup google.com

What it does:
Nslookup asks your DNS server: What is the IP for google.com?

Expected output:
Server:  192.168.1.1
Address: 192.168.1.1#53

Non-authoritative answer:
Name:    google.com
Addresses:  142.250.80.46
          142.250.80.47

What it means:
Your DNS server is at 192.168.1.1. Yours will be different. The answer shows the IPs for google.com. This is the phonebook working.

If you see something else:
If you see server can't find google.com, your DNS server is not answering. Try again, or check your network settings. Do not guess.

## Step 4: Draw it and explain it

Do this in your notebook, then push it to 【entity-GitHub¦canonical_name=GitHub】.

Draw 4 boxes:
Browser -> DNS -> Server -> App

Under each box, write one sentence in your own words:
1. Browser: I type a name.
2. DNS: It finds the IP for that name.
3. Server: It receives my request at that IP.
4. App: It sends back the website.

Then write 3 sentences:
What happens when you type google.com and press enter?

## What to push to your portfolio
In your portfolio repo, in folder modules/01-essentials, push:
1. Your diagram, photo or drawing
2. Your 3-sentence explanation
3. A short note: What did ping to 8.8.8.8 show, and what did ping to google.com show? Were they the same or different?

## Pass check for Class 1
- You can run ping and nslookup and read the output
- You can explain the difference between ping to an IP and ping to a name
- Your diagram and explanation are in 【entity-GitHub¦canonical_name=GitHub】

If you cannot explain it, you have not passed Class 1 yet. That is okay. Read the explanations again and ask in Class 2.
