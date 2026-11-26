# Quiz: Bash Scripting for Beginners

**Coraxshift DevOps Academy · Learn. Build. Deploy. Grow.**

🏅 **12 questions, about 20 minutes.** 8 are *Choose ONE*, 4 are *Choose ALL that apply*.
Score **90% (11 out of 12) or more** to earn your **Bash Scripting for Beginners badge**. Below that, you get one retake after reviewing Class 1 and Class 2.

Every question comes from something you practised in this course. Answer all of them **before** you look at the answers. Each explanation says why the right answer is right *and* why the others are wrong, and that is where most of the learning happens.

## Questions

**Q1. Choose ONE.** What does exit status 0 usually mean?
- A. Success
- B. The script was deleted
- C. The computer restarted
- D. The output is empty

**Q2. Choose ONE.** Why quote `"$backup"`?
- A. To keep spaces in the path together
- B. To make the file executable
- C. To hide errors
- D. To compress the archive

**Q3. Choose ONE.** What does `set -u` help detect?
- A. Use of an unset variable
- B. A full disk
- C. A stopped service
- D. A Git conflict

**Q4. Choose ONE.** Which option makes curl fail for HTTP error statuses?
- A. `--fail`
- B. `--output`
- C. `--silent`
- D. `--location`

**Q5. Choose ONE.** What does `tar -tzf archive.tar.gz` do?
- A. Lists archive contents
- B. Deletes the archive
- C. Starts Nginx
- D. Changes file permissions

**Q6. Choose ONE.** What should you do before restoring a backup?
- A. Restore to a separate test directory and compare
- B. Delete the original immediately
- C. Make the archive executable
- D. Rename the archive to `.sh`

**Q7. Choose ONE.** What does `bash -n script.sh` do?
- A. Checks syntax without executing
- B. Runs as root
- C. Prints environment secrets
- D. Compresses the script

**Q8. Choose ONE.** Which is safest when accepting a path as an argument?
- A. Quote the variable and validate the path
- B. Pass it to `eval`
- C. Append `*` to it
- D. Run `rm -rf` first

**Q9. Choose ALL that apply.** Which are useful script protections?
- A. `set -euo pipefail`
- B. Clear error messages to stderr
- C. Hard-coded cloud keys
- D. Quote variable expansions

**Q10. Choose ALL that apply.** Which commands help verify a backup?
- A. `tar -tzf`
- B. Restore into a separate directory
- C. Compare restored and source files
- D. Delete the source first

**Q11. Choose ALL that apply.** Which statements about `$?` are true?
- A. It is the previous command's status
- B. Check it before another command changes it
- C. It always contains the current directory
- D. Zero usually means success

**Q12. Choose ALL that apply.** Which are unsafe script practices?
- A. Using `eval` with untrusted input
- B. Quoting path variables
- C. Deleting a broad wildcard path without review
- D. Testing restore in a new directory

---

## Your answers

Write your answers (for example `Q1: A`) and send them to your instructor. You will get your score and the full explanations back, so you can review each one.

---

<table width="100%"><tr><td align="left">[⬅️ Role play](role-play-explain-automation.md)</td><td align="center"><a href="troubleshooting.md">🆘 Stuck?</a></td><td align="right">[Recap ➡️](recap-and-whats-next.md)</td></tr></table>
