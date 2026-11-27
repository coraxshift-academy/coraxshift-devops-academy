# Class 2: Rehearse an Incident

**Time:** 2 hours
**Rule:** Rehearse only in a local/disposable environment you own.

## Incident scenario

The app's health endpoint returns an error after a deployment. You are on call.

Use this order:

1. **Protect users:** decide whether to pause rollout or roll back.
2. **Observe:** inspect health, recent deployment, metrics, and logs.
3. **Hypothesize:** state one likely cause and evidence for it.
4. **Recover:** use a reviewed rollback or fix in the lab.
5. **Verify:** check health and a user-facing request.
6. **Learn:** write a short timeline and one prevention action.

## Communication template

```text
Impact:
Started:
Evidence:
Action taken:
Current status:
Next update:
```

Keep communication factual. Do not blame a person. Do not include passwords, tokens, customer data, or sensitive account details.

## Cost cleanup drill

List every resource you created in the course, identify its owner/environment, and check its final state. A stopped resource may still cost money (for example storage). Verify each service's resource inventory and billing, not only the VM state.
