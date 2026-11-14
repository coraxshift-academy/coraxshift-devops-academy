# Week 12: CoraxReads Capstone

**Goal:** Demonstrate the full path from a code change to a secure, observable, recoverable service.

## Your final story

Show how a browser request reaches CoraxReads, how your code is tested, how the app is packaged and deployed, how you know it is healthy, and how you recover if it is not.

```text
Developer -> pull request -> CI tests -> image -> approved deploy
    -> app + database -> metrics/logs -> health check -> rollback if needed
```

## Required portfolio pieces

- Architecture diagram and README.
- Application and database run instructions.
- Infrastructure/configuration artifacts used in your project.
- CI run and deployment evidence.
- Monitoring dashboard, alert, and runbook.
- Security and cost checklist.
- Demo and reflection.

## Three classes

1. **Assemble:** architecture, deployment path, and operational documentation.
2. **Rehearse:** failure injection, incident communication, recovery, and cost cleanup.
3. **Present:** demo, peer review, and next-step plan.

## Lessons

- [Class 1: Assemble the evidence](class-1.md)
- [Class 2: Rehearse an incident](class-2.md)
- [Class 3: Demo and reflect](class-3.md)
- [Assignment 12](assignment-12.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 12](quiz-week-12.md)

## Official reference

- [Google SRE book: monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- [NIST incident response recommendations](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
