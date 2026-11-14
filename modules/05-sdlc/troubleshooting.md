# Week 5 Troubleshooting

| Problem | Why it happens | What to do |
| --- | --- | --- |
| Acceptance criterion says "works well" | It is subjective and cannot be tested | Name the input, action, and visible expected result. |
| Test passes but user flow fails | The test checks a different layer or misses wiring/configuration | Trace the request end to end; add an integration or user-flow test. |
| Test depends on data from a previous run | Test state is not isolated | Create known test data before each run and clean up only that test data. |
| Bug cannot be reproduced | Steps or environment details are missing | Capture exact inputs, versions, expected/actual result, and sanitized logs. |
| Rollback restores app but not data | A schema/data change was not backward-compatible | Plan database migrations and compatibility before deployment; ask for review. |

When a test fails, preserve the first useful error. Do not make several speculative changes before recording what happened.
