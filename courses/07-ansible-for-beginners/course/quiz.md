# Quiz: Ansible for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **Ansible for Beginners badge**. Below that, you get one retake after reviewing Classes 2 and 3.

Every question comes from something you practised in this course. Answer all of them **before** you look at the answers.

## Questions

**Q1. Choose ONE.** What is Ansible mainly used for?
- A. Drawing network diagrams
- B. Describing and applying the same setup to many machines from one place
- C. Writing websites
- D. Storing passwords

**Q2. Choose ONE.** What is an inventory?
- A. A list of the machines Ansible works on, with their groups
- B. A list of tasks
- C. A kind of template
- D. A log file

**Q3. Choose ONE.** What is a playbook?
- A. A file that lists machines
- B. Instructions written once, made of plays and tasks, that Ansible carries out
- C. A password store
- D. A type of module

**Q4. Choose ONE.** What is a module?
- A. A group of machines
- B. The tool a task uses to do one job, such as `copy` or `file`
- C. A handler
- D. A variable file

**Q5. Choose ONE.** You run the same playbook twice and the second recap says `changed=0`. What does that tell you?
- A. It failed silently
- B. The machines already matched the description, so nothing needed to change
- C. The inventory is empty
- D. Ansible lost the connection

**Q6. Choose ONE.** When does a handler run?
- A. Every time the playbook runs
- B. Only when a task linked to it reports `changed`
- C. Before the first task
- D. Only when something fails

**Q7. Choose ONE.** What does `ansible-playbook site.yml --check --diff` do?
- A. Applies the changes and deletes the old files
- B. Shows exactly what would change, without changing anything
- C. Checks your internet connection
- D. Reinstalls Ansible

**Q8. Choose ONE.** You want to run a playbook on `pc02` only. What do you add?
- A. `--limit pc02`
- B. `--only-one`
- C. `--stop`
- D. `--debug pc02`

**Q9. Choose ALL that apply.** Which are good habits before a real run?
- A. Preview with `--check --diff`
- B. Read the PLAY RECAP afterwards
- C. Use `--limit` when only one machine needs a repair
- D. Put passwords inside the playbook so they are easy to find

**Q10. Choose ALL that apply.** In the PLAY RECAP, which results need your attention?
- A. `failed=1`
- B. `unreachable=1`
- C. `ok=3`
- D. `changed=0` on a second run

**Q11. Choose ALL that apply.** A health check playbook that only observes should:
- A. Use modules such as `stat` that look without changing
- B. Report which machines look abnormal
- C. Delete files it does not recognise
- D. Change nothing on the machines

**Q12. Choose ALL that apply.** One machine fails while the others succeed. Sensible steps are:
- A. Read the `fatal` message for the machine and the reason
- B. Fix the cause, such as a missing settings file
- C. Re-run for only that machine with `--limit`
- D. Run the whole playbook again with more force and hope

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-ansible.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
