# Quiz Week 8: Docker and Compose

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What is a Docker image?
A. A packaged template used to create containers
B. A running process only
C. A Git branch
D. A database backup
Answer: A. Explanation: An image contains filesystem layers and metadata used to start containers.

Q2 - Choose ONE
What does `EXPOSE 3000` do?
A. Documents the container port; it does not publish it
B. Opens the host firewall automatically
C. Starts PostgreSQL
D. Makes the app root
Answer: A. Explanation: Host publication requires a runtime or Compose port mapping.

Q3 - Choose ONE
Why use `npm ci` in a build?
A. Install versions from the lockfile reproducibly
B. Update every dependency freely
C. Start the server
D. Expose port 3000
Answer: A. Explanation: `npm ci` uses the lockfile and is designed for clean automated installs.

Q4 - Choose ONE
How should a Compose app reach the database?
A. By the database service name on the Compose network
B. By guessing its public IP
C. Through the user's browser
D. By embedding a password in source
Answer: A. Explanation: Compose service discovery resolves the service name on its private network.

Q5 - Choose ONE
What does a named volume provide?
A. Persistent storage beyond container recreation
B. Public internet access
C. A Git tag
D. An image build cache only
Answer: A. Explanation: A volume stores data independently of a container's writable layer.

Q6 - Choose ONE
What does `docker compose down` normally preserve?
A. Named volumes, unless `--volumes` is used
B. Every container
C. All host processes
D. Image tags in Git
Answer: A. Explanation: Down removes services/network but preserves named volumes by default.

Q7 - Choose ONE
Why run the app as a non-root user?
A. Reduce impact if the app is compromised
B. Make the image larger
C. Skip tests
D. Expose the database
Answer: A. Explanation: Least privilege limits what a compromised process can change.

Q8 - Choose ONE
What does `docker compose logs app` show?
A. Output from the app service
B. Terraform state
C. Git history
D. Cloud billing only
Answer: A. Explanation: Compose logs displays output emitted by the selected service.

Q9 - Choose ALL that apply
Which belong in `.dockerignore`?
A. `.env`
B. `.git`
C. local `node_modules`
D. public README
Answers: A, B, C. Explanation: Excluding local secrets, Git metadata, and installed modules reduces risk and build context.

Q10 - Choose ALL that apply
Which are good database container practices?
A. Keep DB on private Compose network
B. Use a named data volume
C. Publish its port to everyone by default
D. Add readiness health checking
Answers: A, B, D. Explanation: Private access, persistence, and readiness checks improve the lab; public DB exposure is unsafe.

Q11 - Choose ALL that apply
What helps investigate an exiting container?
A. `docker compose logs`
B. `docker compose ps -a`
C. `docker inspect`
D. Delete volumes immediately
Answers: A, B, C. Explanation: Logs, state, and inspection provide evidence; deleting volumes risks data loss.

Q12 - Choose ALL that apply
Which are unsafe?
A. Baking `.env` into the image
B. Running as root without need
C. Using `privileged: true` as a shortcut
D. Reviewing Compose config
Answers: A, B, C. Explanation: These increase credential exposure or container privileges; review is good practice.

## Scoring

11 to 12: Pass, earn Week 8 badge. Below 11: review the explanations and retake once.
