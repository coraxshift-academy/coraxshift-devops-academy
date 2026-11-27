# Week 12 Troubleshooting

| Problem | What to check | Next step |
| --- | --- | --- |
| Reviewer cannot start the app | Missing prerequisite, environment variable, or startup command | Test from a clean checkout; list exact versions and provide `.env.example` with placeholders. |
| Diagram does not match implementation | It describes a planned rather than current system | Update it to the deployed components and label planned items as planned. |
| CI evidence is missing | Wrong branch/run link or retention/access issue | Link the workflow run and explain which job validates each property. |
| Dashboard has no useful signal | It shows infrastructure noise without user impact | Start from availability, error rate, latency, and data-store health. |
| Rollback is not possible | Artifact or previous config was not retained | Preserve immutable artifacts and document restore steps before deployment. |
| Cloud bill continues after VM stop | Disks, snapshots, addresses, or other resources remain | Inventory by region and resource type; remove only identified lab resources. |
| Demo fails live | Network or external dependency is unavailable | Have sanitized screenshots/log evidence and describe the failure truthfully; do not claim success without proof. |

If cleanup could affect a shared account or another learner, stop and ask the account owner before deleting anything.
