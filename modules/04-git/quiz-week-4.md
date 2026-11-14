# Quiz Week 4: Git and GitHub

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What does `git status` show?
A. Working tree and staging state
B. Internet speed
C. Installed packages
D. Server memory
Answer: A. Explanation: Status shows changed, staged, and untracked files plus branch information.

Q2 - Choose ONE
What does `git add` do?
A. Selects changes for the next commit
B. Publishes a website
C. Deletes history
D. Opens a pull request
Answer: A. Explanation: `git add` stages selected content; it does not commit or push it.

Q3 - Choose ONE
What does `git diff --cached` show?
A. Staged changes
B. Remote server logs
C. Only deleted branches
D. All file contents
Answer: A. Explanation: The cached (staged) diff previews what the next commit will include.

Q4 - Choose ONE
Why make a feature branch?
A. To isolate work for review
B. To encrypt files
C. To install GitHub
D. To hide a secret in history
Answer: A. Explanation: Branches let changes develop and be reviewed independently of the default branch.

Q5 - Choose ONE
Which undo operation is generally safest for shared history?
A. `git revert`
B. `git reset --hard`
C. Delete `.git`
D. Force-push
Answer: A. Explanation: Revert records a new commit that reverses an earlier change.

Q6 - Choose ONE
What is a pull request primarily for?
A. Review and discussion before merging changes
B. Downloading a password
C. Starting a Linux service
D. Compressing a folder
Answer: A. Explanation: A PR gives teammates a place to inspect and discuss a proposed change.

Q7 - Choose ONE
What should you review before committing?
A. `git diff --cached`
B. Browser cookies
C. DNS cache only
D. System uptime
Answer: A. Explanation: It shows the exact staged content that the commit will capture.

Q8 - Choose ONE
You staged the wrong file but want to keep its edits. What should you do?
A. `git restore --staged FILE`
B. `git restore FILE`
C. `rm -rf .git`
D. `git push --force`
Answer: A. Explanation: Restore staged removes it from the index while preserving working file content.

Q9 - Choose ALL that apply
Which commands inspect local Git state?
A. `git status`
B. `git log --oneline`
C. `git diff`
D. `ping`
Answers: A, B, C. Explanation: Status, log, and diff inspect repository state; ping tests network reachability.

Q10 - Choose ALL that apply
What should you do when resolving a text conflict?
A. Read both versions
B. Edit the intended final content
C. Remove conflict markers
D. Accept all changes without review
Answers: A, B, C. Explanation: A conflict needs a deliberate final result; blindly accepting can lose required work.

Q11 - Choose ALL that apply
Which are good commit practices?
A. Make a focused change
B. Use a clear message
C. Include credentials for convenience
D. Review staged content
Answers: A, B, D. Explanation: Focus and review improve collaboration; credentials do not belong in Git.

Q12 - Choose ALL that apply
A secret was pushed to a remote repository. Which actions are appropriate?
A. Revoke or rotate it immediately
B. Notify the repository owner
C. Assume deleting the visible line removes all copies
D. Follow incident cleanup guidance
Answers: A, B, D. Explanation: A published secret must be treated as compromised; history and clones can retain it.

## Scoring

11 to 12: Pass, earn Week 4 badge. Below 11: review the explanations and retake once.
