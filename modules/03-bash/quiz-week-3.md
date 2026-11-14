# Quiz Week 3: Bash for DevOps

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What does exit status 0 usually mean?
A. Success
B. The script was deleted
C. The computer restarted
D. The output is empty
Answer: A. Explanation: Zero conventionally means success; non-zero indicates an error or special condition.

Q2 - Choose ONE
Why quote `"$backup"`?
A. To keep spaces in the path together
B. To make the file executable
C. To hide errors
D. To compress the archive
Answer: A. Explanation: Quoting prevents spaces and wildcard characters in a path from being split or expanded unexpectedly.

Q3 - Choose ONE
What does `set -u` help detect?
A. Use of an unset variable
B. A full disk
C. A stopped service
D. A Git conflict
Answer: A. Explanation: `-u` makes Bash report references to unset variables instead of treating them as empty.

Q4 - Choose ONE
Which option makes curl fail for HTTP error statuses?
A. `--fail`
B. `--output`
C. `--silent`
D. `--location`
Answer: A. Explanation: `--fail` gives curl a non-zero status for HTTP 400 and 500 responses.

Q5 - Choose ONE
What does `tar -tzf archive.tar.gz` do?
A. Lists archive contents
B. Deletes the archive
C. Starts Nginx
D. Changes file permissions
Answer: A. Explanation: `t` lists, `z` handles gzip, and `f` names the archive file.

Q6 - Choose ONE
What should you do before restoring a backup?
A. Restore to a separate test directory and compare
B. Delete the original immediately
C. Make the archive executable
D. Rename the archive to `.sh`
Answer: A. Explanation: A separate restore test proves the backup is usable without risking the original.

Q7 - Choose ONE
What does `bash -n script.sh` do?
A. Checks syntax without executing
B. Runs as root
C. Prints environment secrets
D. Compresses the script
Answer: A. Explanation: The `-n` option parses the script but does not execute its commands.

Q8 - Choose ONE
Which is safest when accepting a path as an argument?
A. Quote the variable and validate the path
B. Pass it to `eval`
C. Append `*` to it
D. Run `rm -rf` first
Answer: A. Explanation: Quoting prevents splitting; validation ensures the script operates on the intended input.

Q9 - Choose ALL that apply
Which are useful script protections?
A. `set -euo pipefail`
B. Clear error messages to stderr
C. Hard-coded cloud keys
D. Quote variable expansions
Answers: A, B, D. Explanation: Strict mode, clear errors, and quoting reduce common failures; credentials must not be embedded.

Q10 - Choose ALL that apply
Which commands help verify a backup?
A. `tar -tzf`
B. Restore into a separate directory
C. Compare restored and source files
D. Delete the source first
Answers: A, B, C. Explanation: Listing, restoring, and comparing check that the archive contains usable data.

Q11 - Choose ALL that apply
Which statements about `$?` are true?
A. It is the previous command's status
B. Check it before another command changes it
C. It always contains the current directory
D. Zero usually means success
Answers: A, B, D. Explanation: `$?` is overwritten after each command, and zero usually signals success.

Q12 - Choose ALL that apply
Which are unsafe script practices?
A. Using `eval` with untrusted input
B. Quoting path variables
C. Deleting a broad wildcard path without review
D. Testing restore in a new directory
Answers: A, C. Explanation: Dynamic command construction and broad deletion can execute or remove unintended targets.

## Scoring

11 to 12: Pass, earn Week 3 badge. Below 11: review the explanations and retake once.
