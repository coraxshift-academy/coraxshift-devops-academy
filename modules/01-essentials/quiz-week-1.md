

# **Quiz Week 1: Knowledge Test**

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply.
Score 90 percent, 11 out of 12, earns Week 1 Badge. One retake if below.

## **Rules**

Do not look at answers before you try. Every question is from a lab we did this week.

## **Questions**

Q1 - Choose ONE
You run ping 8.8.8.8 and get replies. You run ping google.com and get could not resolve host. What is most likely broken?
A. Internet cable
B. DNS
C. VS Code
D. Your browser cache
Answer: B. Explanation: Correct is B because ping to IP works, so internet works. Ping to name fails, so the name to IP step, which is DNS, is broken. A is wrong because internet works for the IP. C is wrong because VS Code is not used for ping. D is wrong because browser cache does not affect ping.

Q2 - Choose ONE
You run nslookup google.com and see Server 192.168.1.1, Name google.com, Addresses 142.250.80.46. What did nslookup do?
A. It turned the name into an IP by asking DNS
B. It installed Google
C. It checked your VS Code theme
D. It changed your IP address
Answer: A. Explanation: Correct is A because nslookup asks DNS for the IP. B is wrong because it does not install anything. C is wrong because theme is not related. D is wrong because it does not change your IP.

Q3 - Choose ONE
CoraxReads domain is coraxreads.com and server IP is 102.130.45.78. Which DNS record connects them?
A. A record
B. CNAME record
C. MX record
D. TXT record
Answer: A. Explanation: Correct is A because A record maps a domain to an IPv4 address. B is wrong because CNAME maps a name to another name, not to an IPv4. C is wrong because MX is for mail. D is wrong because TXT is for text notes, not for IP mapping.

Q4 - Choose ONE
In a three-tier app, where does the business logic live?
A. Frontend
B. Backend
C. Database
D. Browser cache
Answer: B. Explanation: Correct is B because Backend does the work. A is wrong because Frontend only shows the UI. C is wrong because Database only stores data. D is wrong because cache only stores copies.

Q5 - Choose ONE
A user sees Not Secure in the browser when opening a site. What is most likely missing?
A. HTTPS
B. DNS
C. VS Code
D. A domain
Answer: A. Explanation: Correct is A because HTTPS is the secure version of HTTP. B is wrong because if DNS was missing, the site would not load at all. C is wrong because VS Code is not used by the visitor. D is wrong because the user already typed a domain to reach the site.

Q6 - Choose ONE
In VS Code terminal on Windows, which command lists files in the current folder?
A. dir
B. ls
C. pwd
D. whoami
Answer: A. Explanation: Correct is A because dir lists files on Windows. B is wrong because ls is for Mac or Linux. C is wrong because pwd shows the folder path, not the files. D is wrong because whoami shows your username.

Q7 - Choose ONE
Which ChatGPT prompt is best for learning?
A. My code is not working. Fix it.
B. I ran ping google.com and got could not resolve host, but ping 8.8.8.8 works. What is most likely broken and how do I check it? Explain to a beginner.
C. Tell me everything about networking.
D. Give me the answer.
Answer: B. Explanation: Correct is B because it has context, what you did, what you saw, what you tried, and asks for a beginner explanation. A is wrong because it has no context. C is wrong because it is too broad. D is wrong because it has no context and does not help you learn.

Q8 - Choose ONE
You change one line and get an error. What is the first step?
A. Read the full error message
B. Delete the whole project
C. Ask AI with no context
D. Reinstall VS Code
Answer: A. Explanation: Correct is A because the error message tells you what broke. B is wrong because you lose your work. C is wrong because AI cannot help without context. D is wrong because reinstalling does not fix a one-line error.

Q9 - Choose ALL that apply
Which are true about packet switching?
A. Packets can take different routes to the destination
B. Packets are reassembled at the destination
C. All packets always take the same route
D. If one packet is lost, the whole internet fails
Answers: A, B. Explanation: A is true because packets can travel by different paths. B is true because they are put back in order at the end. C is false because routes can differ. D is false because TCP can resend a lost packet.

Q10 - Choose ALL that apply
Which are true about TCP/IP?
A. TCP breaks data into packets
B. IP addresses each packet
C. TCP makes sure packets arrive in order
D. HTTP is the same thing as TCP
Answers: A, B, C. Explanation: A is true, TCP splits data. B is true, IP handles addresses. C is true, TCP handles order and resend. D is false, HTTP is the web protocol that uses TCP/IP, not the same as TCP.

Q11 - Choose ALL that apply
Which are good questions?
A. I was trying to run dir in VS Code terminal. I clicked Terminal, then New Terminal. I expected to see my files. I saw no terminal. I tried reopening VS Code.
B. My code is not working.
C. I was trying to ping google.com. I ran ping 8.8.8.8 and it worked. I expected ping google.com to work. I saw could not resolve host. I tried checking WiFi.
D. Fix this.
Answers: A, C. Explanation: A is good because it has all 5 parts of the template. C is good because it has context and what was tried. B is bad because it has no detail. D is bad because it has no context.

Q12 - Choose ALL that apply
Which are true about three-tier architecture?
A. Frontend shows the UI
B. Backend does the work
C. Database stores the data
D. Frontend talks directly to Database in three-tier
Answers: A, B, C. Explanation: A is true, Frontend is the UI. B is true, Backend is the logic. C is true, Database stores data. D is false, in three-tier Frontend talks to Backend, Backend talks to Database. Direct Frontend to Database is two-tier.

## **Scoring**

11 to 12: Pass, earn Week 1 Badge
Below 11: One retake allowed, review Class 1 and Class 2 first
