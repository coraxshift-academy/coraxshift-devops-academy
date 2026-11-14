# Quiz Week 5: SDLC

12 questions, 20 minutes. 8 Choose ONE, 4 Choose ALL that apply. Pass: 11 out of 12.

## Questions

Q1 - Choose ONE
What makes acceptance criteria useful?
A. They describe observable results
B. They use the most technical words
C. They guarantee no bugs
D. They replace user needs
Answer: A. Explanation: Observable criteria can be tested and reviewed.

Q2 - Choose ONE
Which test checks one small function?
A. Unit test
B. End-to-end test
C. Capacity test
D. Manual deployment
Answer: A. Explanation: Unit tests focus on a small isolated piece of behavior.

Q3 - Choose ONE
What does an integration test check?
A. Parts working together
B. Only a function name
C. GitHub account billing
D. Laptop battery health
Answer: A. Explanation: Integration tests check boundaries such as app-to-database behavior.

Q4 - Choose ONE
Why have rollback steps?
A. To restore a known-good service if a release fails
B. To erase code review
C. To skip testing
D. To delete logs
Answer: A. Explanation: Rollback provides a practiced recovery path when a release causes problems.

Q5 - Choose ONE
What should a useful bug report include?
A. Reproduction steps and expected/actual results
B. A guess only
C. A password
D. No environment details
Answer: A. Explanation: Reproducible evidence helps another person isolate the fault.

Q6 - Choose ONE
What does `git tag -a` create?
A. An annotated named point in history
B. A cloud server
C. A database backup
D. A firewall rule
Answer: A. Explanation: A tag names a commit, often used to identify a release.

Q7 - Choose ONE
What is a release note for?
A. Summarizing user-visible changes
B. Storing API keys
C. Replacing tests
D. Hiding known risks
Answer: A. Explanation: Release notes communicate changes and relevant user actions.

Q8 - Choose ONE
Which is a better criterion than "search works well"?
A. Given matching books, search shows their titles
B. Search is modern
C. Search uses technology
D. Search is nice
Answer: A. Explanation: It describes a verifiable starting state and result.

Q9 - Choose ALL that apply
What belongs in a small feature plan?
A. Scope
B. Risks
C. Acceptance checks
D. A secret token
Answers: A, B, C. Explanation: Scope, risk, and checks guide work; secrets do not belong in planning artifacts.

Q10 - Choose ALL that apply
Which are useful test-case details?
A. Starting state
B. Action
C. Expected result
D. An unrelated opinion
Answers: A, B, C. Explanation: These three details make a test repeatable.

Q11 - Choose ALL that apply
What should happen before a release?
A. Review the diff
B. Check test results
C. Know the rollback path
D. Ignore configuration changes
Answers: A, B, C. Explanation: Review, tests, and recovery preparation reduce release risk.

Q12 - Choose ALL that apply
Why may rolling back code not be enough?
A. Data migrations may not be reversible
B. External side effects may have occurred
C. The previous app may expect an older schema
D. Git tags delete data automatically
Answers: A, B, C. Explanation: Data and external changes can outlive a code rollback; tags do not reverse them.

## Scoring

11 to 12: Pass, earn Week 5 badge. Below 11: review the explanations and retake once.
