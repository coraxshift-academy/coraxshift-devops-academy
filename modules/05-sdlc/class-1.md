# Class 1: Turn an Idea into a Testable Issue

**Time:** 2 hours
**Tools:** GitHub Issues or a Markdown file in your portfolio.

## Start with the person and problem

Weak request: "Build a good bookstore."

Clearer user story:

> As a visitor, I want to browse available books so that I can decide what to read.

Add acceptance criteria:

1. Given the catalog has books, when I open `/books`, each available book shows title and price.
2. Given the catalog is empty, the page explains that no books are available.
3. Given the service cannot reach its data store, it reports a helpful error without exposing credentials.

Acceptance criteria describe outcomes a person can verify. They are not a list of implementation details.

## Define a small scope

Write down:

- **In scope:** display books already in the catalog.
- **Out of scope:** checkout, payments, user accounts.
- **Risks:** empty catalog, database unavailable, invalid price.
- **Owner and reviewer:** who builds and who checks the work.

Draw a simple flow:

```text
Visitor -> Catalog page -> App request -> Book data -> Catalog page
```

Break the work into tasks that can each be reviewed, for example: add sample data, add catalog endpoint, render the list, test empty result.

## Practice

Write an issue for "show books by genre." Include one user story, at least three acceptance criteria, one out-of-scope item, and one risk.
