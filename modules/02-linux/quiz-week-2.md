

# **Quiz Week 2: Linux for DevOps**

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply.
Score 90 percent, 11 out of 12, earns Week 2 Badge. One retake if below.

## **Questions**

Q1 - Choose ONE
You run ls -l and see -rwxr-xr-x for a file. What does it mean?
A. Owner can read, write, run. Group and others can read and run.
B. Everyone can do everything.
C. No one can read it.
D. It is a folder.
Answer: A. Explanation: Correct is A because rwx is owner, r-x is group, r-x is others. B is wrong because 777 would be everyone can do everything. C is wrong because r means read is allowed. D is wrong because file starts with -, folder starts with d.

Q2 - Choose ONE
Which command shows your current folder?
A. pwd
B. ls
C. cd
D. whoami
Answer: A. Explanation: Correct is A because pwd prints working directory. B is wrong because ls lists files. C is wrong because cd changes folder. D is wrong because whoami shows username.

Q3 - Choose ONE
Which command installs Nginx on Ubuntu?
A. sudo apt install -y nginx
B. npm install nginx
C. pip install nginx
D. git clone nginx
Answer: A. Explanation: Correct is A because apt is Ubuntu package manager. B is wrong because npm is for Node packages. C is wrong because pip is for Python packages. D is wrong because git clone downloads code, does not install Nginx.

Q4 - Choose ONE
In Codespace, which command starts Nginx?
A. sudo service nginx start
B. sudo systemctl start nginx
C. sudo nginx -t
D. sudo apt update nginx
Answer: A. Explanation: Correct is A because Codespace container uses service, not systemctl. B is wrong because systemctl does not work in Codespace container. C is wrong because nginx -t only tests config, does not start. D is wrong because apt update only refreshes list.

Q5 - Choose ONE
Which chmod gives owner rwx, group r-x, others r-x?
A. chmod 755
B. chmod 644
C. chmod 777
D. chmod 600
Answer: A. Explanation: Correct is A because 7 is rwx, 5 is r-x, 5 is r-x. B is wrong because 644 is rw-, r--, r--. C is wrong because 777 is rwx for all, unsafe. D is wrong because 600 is rw- for owner only.

Q6 - Choose ONE
Which command shows running processes?
A. ps aux
B. ls -la
C. pwd
D. ip a
Answer: A. Explanation: Correct is A because ps lists processes. B is wrong because ls lists files. C is wrong because pwd shows folder. D is wrong because ip a shows network.

Q7 - Choose ONE
Which command shows listening ports?
A. ss -tuln
B. ls -la
C. free -h
D. df -h
Answer: A. Explanation: Correct is A because ss shows sockets. B is wrong because ls shows files. C is wrong because free shows memory. D is wrong because df shows disk.

Q8 - Choose ONE
Which is the correct first line of a bash script?
A. #!/bin/bash
B. #!bash
C. #bash
D. #!/bin/python
Answer: A. Explanation: Correct is A because it tells Linux to use bash. B is wrong because path is missing. C is wrong because it is just a comment. D is wrong because it would use Python, not bash.

Q9 - Choose ALL that apply
Which are true about Linux file system?
A. / is the root, top of everything
B. /etc holds config files
C. /var holds logs and websites
D. /home holds user folders
Answers: A, B, C, D. Explanation: All are true. A is true, / is root. B is true, /etc has Nginx config. C is true, /var/log and /var/www. D is true, /home has users.

Q10 - Choose ALL that apply
Which are true about Nginx config test?
A. sudo nginx -t tests syntax
B. If it says syntax is ok, config is valid
C. If you remove ; from try_files, nginx -t fails
D. You should restart Nginx without testing in production
Answers: A, B, C. Explanation: A is true, -t tests. B is true, ok means valid. C is true, missing ; is syntax error. D is false, you must test before restart in production.

Q11 - Choose ALL that apply
Which are true about logs?
A. /var/log/nginx/access.log shows requests
B. /var/log/nginx/error.log shows errors
C. journalctl -u nginx shows service logs in a VM
D. Empty error log means server is permanently perfect
Answers: A, B, C. Explanation: A is true, access log shows requests. B is true, error log shows errors. C is true, journalctl shows service logs. D is false, empty means no errors in that time period, not forever perfect.

Q12 - Choose ALL that apply
Which are true about permissions for /var/www/html?
A. chown -R www-data:www-data sets owner to Nginx user
B. chmod -R 755 gives owner rwx, group and others r-x
C. chmod 777 is safe for production
D. You should verify with ls -l after changing
Answers: A, B, D. Explanation: A is true, www-data is Nginx user. B is true, 755 is safe for web root. C is false, 777 lets everyone write, unsafe. D is true, always verify.

## **Scoring**

11 to 12: Pass, earn Week 2 Badge
Below 11: One retake allowed, review Class 1 and Class 2 first
