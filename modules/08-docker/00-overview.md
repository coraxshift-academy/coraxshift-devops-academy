# Week 8: Docker and Compose

**Project:** CoraxReads
**Goal:** Build a small application image and run the app with PostgreSQL using Docker Compose.

## What you will ship

- A Dockerfile for the CoraxReads app.
- A Compose file for app + database.
- A health check and evidence that database data survives a container restart.

## Three classes

1. **Images and containers:** build context, layers, ports, and logs.
2. **Compose and networking:** app, database, service names, volumes, health.
3. **Safe images:** non-root users, secrets, tags, and cleanup.

```text
Browser -> app container -> private Compose network -> PostgreSQL container
                                  |
                            named data volume
```

## Before you start

- Install Docker Engine and the Compose plugin.
- Use the course [CoraxReads starter app](../../labs/coraxreads/README.md); it includes `/health`, `/api/books`, tests, Dockerfile, and Compose.
- Store local credentials in an ignored `.env` file; commit only a placeholder `.env.example`.

## Lessons

- [Class 1: Build an image](class-1.md)
- [Class 2: Compose app and database](class-2.md)
- [Class 3: Verify, secure, and clean up](class-3.md)
- [Assignment 8](assignment-8.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 8](quiz-week-8.md)

## Official reference

- [Docker Get Started](https://docs.docker.com/get-started/)
- [Docker Compose documentation](https://docs.docker.com/compose/)
