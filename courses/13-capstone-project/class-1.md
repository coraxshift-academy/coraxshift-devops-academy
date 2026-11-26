# Class 1: Assemble the Evidence

**Time:** 2 hours
**Tools:** your portfolio repository and project environment.

## One diagram, one source of truth

Draw the actual system, not the system you hoped to build. Include:

- Browser/user entry point.
- App and database.
- Network boundaries and allowed ports.
- CI workflow and deployment environment.
- Monitoring, logs, and backup location.

Use arrows to show traffic and label external dependencies. Never put credentials or sensitive addresses in the diagram.

## README order

1. What CoraxReads does.
2. Architecture picture.
3. Prerequisites and supported versions.
4. Local start and stop steps.
5. Test commands and expected results.
6. Deployment and rollback.
7. Monitoring and troubleshooting.
8. Cost and cleanup.
9. Known limitations and next improvements.

Every command should say where to run it and what success looks like. Test the instructions from a clean checkout if possible.

## Evidence

Use links to pull requests, CI runs, and sanitized screenshots. Explain what each screenshot proves. A screenshot is not a substitute for reproducible configuration.
