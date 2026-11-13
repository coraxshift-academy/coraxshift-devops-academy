# Week 1, Class 1: How The Internet Really Works
Time: 2 hours - 30 mins learn, 60 mins do together, 30 mins questions and push

## Goal for this class
By the end, you can explain in your own words what happens when you type google.com and press enter, and you can prove it with 2 commands.

## Part 1: Where do we run commands?

We run commands in an app called a terminal. It is a black or white window where you type words and the computer answers you. You do not run them in your browser. You do not run them in Word.

If you use Windows:
1. Press the Windows key on your keyboard
2. Type Command Prompt
3. Click Command Prompt to open it
You will see a black window with a line like C:\Users\YourName>

If you use Mac:
1. Press Cmd + Space on your keyboard
2. Type Terminal
3. Press Enter to open it
You will see a white window with a line like yourname@Mac ~ %

If you use Linux:
1. Press Ctrl + Alt + T on your keyboard
2. A terminal window will open
You will see a line like yourname@laptop:~$

That line is called a prompt. It means the computer is waiting for you to type. Keep this window open for the whole class.

## Part 2: Definitions you need for this class

Read these first. We will use these words in every step.

Terminal: The app where you type commands. See Part 1.
Command: A typed instruction. Example: ping google.com is a command.
Internet: A network that connects computers around the world so they can talk to each other.
IP Address: The number address of a computer on the internet. Example: 8.8.8.8. Like a house address.
DNS: The phonebook of the internet. It turns a name like google.com into an IP address like 142.250.80.46.
Server: A computer that waits to answer requests. When you visit a website, a server sends you the website.
Ping: A command that sends a small test message to another computer and waits for a reply. It checks if that computer can be reached.
Nslookup: A command that asks your DNS server: What is the IP for this name?

Now you know where to type and what the words mean. Let us try it.

## Part 3: Do it together, step by step

### Step 1: Check if internet works, using an IP address

You are in your terminal. You should see your prompt.

Type this and press Enter:
ping 8.8.8.8

What it does:
Ping sends a small test message to 8.8.8.8, which is Google DNS, and waits for a reply. We use an IP address here, not a name, so we test internet only, not DNS.

Expected output, on Windows:
Reply from 8.8.8.8: bytes=32 time=25ms TTL=115
On Windows it stops by itself after 4 replies.

Expected output, on Mac or Linux:
64 bytes from 8.8.8.8: icmp_seq=1 ttl=115 time=25.123 ms
On Mac or Linux it keeps going. Press Ctrl + C on your keyboard to stop it.

What it means:
You got a reply. Internet works. Time is how long the reply took. Your time number will be different. That is okay. Time changes with your network.

If you see something else:
If you see Request timed out or Network is unreachable, your internet is off. Check your WiFi, then run the command again. Do not move to Step 2 until this works.

### Step 2: Check if names work, using DNS

You are still in your terminal.

Type this and press Enter:
ping google.com

What it does:
Ping first asks DNS to turn the name google.com into an IP address, then it sends the test message to that IP.

Expected output, on Windows:
Pinging google.com [142.250.80.46] with 32 bytes of data:
Reply from 142.250.80.46: bytes=32 time=24ms TTL=115
On Windows it stops by itself after 4 replies.

Expected output, on Mac or Linux:
PING google.com (142.250.80.46): 56 data bytes
64 bytes from 142.250.80.46: icmp_seq=0 ttl=115 time=24.123 ms
Press Ctrl + C to stop it.

What it means:
DNS worked. It turned google.com into 142.250.80.46. Your IP will be different. That is okay. Google has many IPs.

If you see something else:
If you see Ping request could not find host google.com or could not resolve host, DNS is broken, even if Step 1 worked. That is the key lesson: Internet can work, but DNS can fail. Write that down.

### Step 3: See DNS working, with nslookup

You are still in your terminal.

Type this and press Enter:
nslookup google.com

What it does:
Nslookup asks your DNS server directly: What is the IP for google.com?

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

## Part 4: Draw it and explain it

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

## Part 5: What to push to your portfolio

In your portfolio repo, in folder modules/01-essentials, push:
1. Your diagram, photo or drawing
2. Your 3-sentence explanation
3. A short note: What did ping to 8.8.8.8 show, and what did ping to google.com show? Were they the same or different?

## Pass check for Class 1
- You can open your terminal on Windows, Mac, or Linux
- You can run ping and nslookup and read the output
- You can explain the difference between ping to an IP and ping to a name
- Your diagram and explanation are in GitHub

If you cannot explain it, you have not passed Class 1 yet. That is okay. Read the definitions again and ask in Class 2.
