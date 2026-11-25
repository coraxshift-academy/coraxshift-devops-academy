# Quiz: Docker for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **Docker for Beginners badge**. Below that, you get one retake after reviewing Classes 2 and 3.

Every question comes from something you practised in this course. Answer all of them **before** you look at the answers.

## Questions

**Q1. Choose ONE.** What is a Docker image?
- A. A running program
- B. A packaged, ready-to-use copy of a program and what it needs
- C. A screenshot
- D. A type of volume

**Q2. Choose ONE.** What is a container?
- A. A running copy made from an image
- B. A file that lists passwords
- C. A kind of Dockerfile
- D. A registry

**Q3. Choose ONE.** What is a Dockerfile?
- A. The recipe that describes how to build an image
- B. A log file
- C. A list of running containers
- D. A password store

**Q4. Choose ONE.** What does `-p 8080:80` do in `docker run`?
- A. Connects port 8080 on your machine to port 80 inside the container
- B. Runs the container for 8080 seconds
- C. Limits it to 80 users
- D. Names the container

**Q5. Choose ONE.** You remove a container that saved data inside itself, with no volume. What happens to the data?
- A. It is kept forever
- B. It is lost with the container
- C. It moves to Docker Hub
- D. It is saved in the image

**Q6. Choose ONE.** In Compose, how does the proxy reach the app?
- A. By the app's service name on a private network
- B. By guessing an IP address
- C. By restarting the app
- D. By publishing every port

**Q7. Choose ONE.** What does `docker compose down` do to a named volume?
- A. Deletes it
- B. Keeps it
- C. Moves it to another machine
- D. Encrypts it

**Q8. Choose ONE.** Why add `USER appuser` to a Dockerfile?
- A. So the program runs as a normal user, not root, limiting damage if it is broken into
- B. To make the image smaller
- C. To make it start faster
- D. To publish a port

**Q9. Choose ALL that apply.** Which belong in a `.dockerignore`?
- A. `.git`
- B. `.env`
- C. `app.py`, the program itself
- D. Log files

**Q10. Choose ALL that apply.** Which are good habits for tags?
- A. Use a specific version such as `2.0`
- B. Rely on `latest` for everything
- C. Name the images you build
- D. Know which version is running

**Q11. Choose ALL that apply.** A health check helps you to:
- A. Know when a service is really ready
- B. Make a dependent service wait for it
- C. See `healthy` or `unhealthy` in `docker compose ps`
- D. Fix the program automatically

**Q12. Choose ALL that apply.** Which are safe cleanup habits?
- A. Look at `docker system df` first
- B. Remove containers, volumes and images by name
- C. Run `docker system prune -a --volumes` without reading what it will remove
- D. Think before using `down -v` on real data

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-docker.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
