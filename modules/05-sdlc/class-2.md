# Class 2: Test the Behavior

**Time:** 2 hours
**Run commands in:** your project terminal.

## Think in layers

- **Unit test:** one small function, such as formatting a price.
- **Integration test:** two parts working together, such as app and database.
- **End-to-end test:** a user flow through the running system.

Tests answer different questions. A green unit test does not prove a real deployment works.

## Turn acceptance criteria into checks

For each criterion write: starting state, action, expected result. Example:

```text
Given no books exist
When the visitor opens the catalog
Then the page says "No books yet"
```

For a running service, a basic request check is:

```bash
curl --fail --silent --show-error http://localhost:3000/health
```

- `curl` sends an HTTP request.
- `--fail` returns failure for HTTP error status codes.
- `--silent --show-error` hides progress but keeps errors.

Use the port your app actually listens on. Do not copy the example port without checking the app configuration.

## Bug reports

Record: environment, exact steps, expected result, actual result, logs, and the smallest safe reproduction. Remove tokens, customer data, and private URLs before sharing.

## Practice

Write one test case for a normal response, one for empty data, and one for the data store being unavailable. Mark which layer each test exercises.
