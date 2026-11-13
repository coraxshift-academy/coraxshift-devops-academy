# Class 1: Internet, Networking, Domain and DNS
Time: 2 hours

## Where to run commands
We run commands in a terminal. 
It is a window where you type words and the computer answers. 
You do not run them in your browser.

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

## Definitions for this class
**Terminal:** The app where you type commands.

**Command:** A typed instruction. Example: ping google.com
**
Internet:** A network that connects computers around the world.

**IP Address:** The number address of a computer. Example: 8.8.8.8

**DNS:** The phonebook of the internet. It turns a name like google.com into an IP.

**Server:** A computer that waits to answer requests.

**Ping:** A command that sends a small test message and waits for a reply.

**Nslookup:** A command that asks your DNS server: What is the IP for this name?

**Domain:** A name you buy, like coraxshift.com.

## Step 1: Check internet with an IP
You are in your terminal. 

Type this 'ping 8.8.8.8' 

and press Enter



**What it does:** 

Sends a test message to 8.8.8.8, which is Google DNS. 
We use an IP, not a name, so we test internet only, not DNS.

**Expected output on Windows:**

Reply from 8.8.8.8: bytes=32 time=25ms TTL=115
On Windows it stops by itself after 4 replies.

**Expected output on Mac or Linux:**

64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=25.123 ms
On Mac or Linux it keeps going. Press Ctrl + C to stop it.

**What it means:**

You got a reply. Internet works. Your time number will be different. That is okay.

If you see Request timed out or Network is unreachable, your WiFi is off. Check WiFi, run again.

## Step 2: Check names with DNS

You are still in your terminal. 
Type: ping google.com

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

If you see could not find host or could not resolve host, DNS is broken, even if Step 1 worked. That is the key lesson.

## Step 3: See DNS working with nslookup

You are still in your terminal. 
Type: nslookup google.com

**What it does:** Asks your DNS server directly for the IP.

**Expected output:**
Server: 192.168.1.1
Address: 192.168.1.1#53
Non-authoritative answer:
Name: google.com
Addresses: 142.250.80.46

**What it means:** Your DNS server is at 192.168.1.1. Yours will be different. The answer shows IPs for google.com.

## Draw it
Draw 4 boxes: Browser -> DNS -> Server -> App
Under each, write one sentence in your own words.
Then write 3 sentences: What happens when you type google.com and press enter?

## Push
In your portfolio, in modules/01-essentials, push your diagram and your 3 sentences.
