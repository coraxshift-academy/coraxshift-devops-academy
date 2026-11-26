# Quiz: AWS for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **AWS for Beginners badge**. Below that, you get one retake after reviewing the classes you missed.

Every question comes from something you practised in this course. Answer all of them **before** you look at the answers.

## Questions

**Q1. Choose ONE.** What is the best way to use the AWS root user?
- A. Use it every day because it is the most powerful
- B. Protect it with MFA, then use an admin user for daily work
- C. Create access keys for it so scripts can use it
- D. Share it with your team so everyone can fix problems

**Q2. Choose ONE.** You set a budget of $10 and an alert at 85%. What does the alert do?
- A. Stops all your servers when you reach $8.50
- B. Sends you a warning. It does not stop anything
- C. Blocks your card
- D. Deletes your newest resources

**Q3. Choose ONE.** What makes a subnet "public"?
- A. Its name contains the word public
- B. Its route table sends `0.0.0.0/0` to an internet gateway
- C. It has more than 100 addresses
- D. It is in the first Availability Zone

**Q4. Choose ONE.** You **stop** an EC2 instance instead of terminating it. What happens to the cost?
- A. All charges stop
- B. You still pay for its disk, and the server is not deleted
- C. The charges double
- D. AWS deletes the disk after one hour

**Q5. Choose ONE.** What is the safest way to let your web server reach your database?
- A. Open the database port to `0.0.0.0/0`
- B. Make the database public and use a strong password
- C. Allow the database's port only from the web server's security group, with Public access set to No
- D. Put the database password in the web page

**Q6. Choose ONE.** What does a load balancer do with a server that fails its health check?
- A. Keeps sending it half the visitors
- B. Stops sending visitors to it
- C. Deletes the load balancer
- D. Changes the website text

**Q7. Choose ONE.** What does an alias record in Route 53 do?
- A. Points a name at an AWS resource such as a load balancer
- B. Registers a domain for free
- C. Encrypts your website
- D. Shuts down a server

**Q8. Choose ONE.** In which order should you tear down the Class 6 site?
- A. VPC, security groups, load balancer, servers
- B. Load balancer, VPC, Auto Scaling group
- C. Auto Scaling group, load balancer, target group, launch template, security groups, VPC
- D. It does not matter

**Q9. Choose ALL that apply.** Which of these can quietly cost money after you think you finished?
- A. A load balancer you forgot to delete
- B. A NAT gateway the wizard created
- C. A stopped server's disk
- D. A deleted file that was never in a bucket

**Q10. Choose ALL that apply.** Which are good S3 habits?
- A. Keep **Block all public access** on
- B. Share a single file briefly with a presigned link
- C. Make the bucket public so it is easier to test
- D. Add a lifecycle rule so old versions are removed

**Q11. Choose ALL that apply.** Which of these should never go into a Git repository?
- A. Your AWS access keys
- B. A presigned link that has not expired
- C. Your database password
- D. A diagram of your network with no secrets in it

**Q12. Choose ALL that apply.** An alarm email never arrives. Which are sensible things to check?
- A. Whether the SNS email subscription was **confirmed**
- B. Whether the alarm uses the right SNS topic
- C. Whether you tested the alarm with `set-alarm-state`
- D. Whether you have the correct region selected

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-the-cloud.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
