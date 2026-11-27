# Quiz: CI/CD for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **CI/CD for Beginners badge**. Below that, you get one retake after reviewing Classes 2 and 3.

Every question comes from something you practised in this course. Answer all of them **before** you look at the answers.

## Questions

**Q1. Choose ONE.** What does Continuous Integration do?
- A. Checks every change automatically, for example style and tests
- B. Writes the code for you
- C. Replaces the need for tests
- D. Deletes old branches

**Q2. Choose ONE.** Where must a GitHub Actions workflow file live?
- A. `.github/workflows/`
- B. `workflows/`
- C. `src/`
- D. Anywhere in the repository

**Q3. Choose ONE.** What does `on: pull_request` mean?
- A. Run the workflow whenever a pull request is opened or updated
- B. Run it once a day
- C. Run it only on your own computer
- D. Run it when a secret changes

**Q4. Choose ONE.** What does a **matrix** do?
- A. Runs the same job several times with different values, such as Python versions
- B. Encrypts the workflow
- C. Makes jobs run slower
- D. Stores a secret

**Q5. Choose ONE.** A check is red, but `main` has no branch protection. What can happen?
- A. The change can still be merged
- B. GitHub always blocks the merge
- C. The repository is deleted
- D. The tests fix themselves

**Q6. Choose ONE.** Why tag an image with the commit?
- A. So every image can be traced to the exact code that made it
- B. Because Docker requires it
- C. To make the image smaller
- D. To hide the image

**Q7. Choose ONE.** What does `needs: build` on a job mean?
- A. The job only starts after `build` succeeds
- B. The job builds the image
- C. The job runs at the same time as `build`
- D. The job is optional

**Q8. Choose ONE.** What is the **fastest, safest** way to roll back a bad release in this course?
- A. `git revert` the bad change and send it through the same pipeline
- B. Edit the server by hand
- C. Delete the repository
- D. Turn off all checks

**Q9. Choose ALL that apply.** Which are true about secrets?
- A. You can list their names but cannot read a value back
- B. GitHub masks them in logs
- C. They belong in a committed file for convenience
- D. You should not print them on purpose

**Q10. Choose ALL that apply.** What does an **environment with required reviewers** give you?
- A. A pause before production until a person approves
- B. A separate named place you deliver to, such as staging or production
- C. Automatic bug fixing
- D. A record of who approved

**Q11. Choose ALL that apply.** Which are good habits for pipelines?
- A. Give workflows only the permissions they need
- B. Read the last lines of a failed step first
- C. Test the thing you deliver, not only the code
- D. Skip the checks when you are in a hurry

**Q12. Choose ALL that apply.** In the bad release, the unit tests passed but the delivery failed. Which are true?
- A. The smoke test caught a fault the unit tests did not cover
- B. The bad image was never published
- C. Staging and production were skipped
- D. The bad change was deployed to production anyway

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-cicd.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
