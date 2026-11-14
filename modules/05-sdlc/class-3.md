# Class 3: Release and Learn

**Time:** 2 hours
**Tools:** Git, GitHub, and your release checklist.

## Release checklist

1. Link the change to its issue.
2. Review the diff and test results.
3. Confirm required configuration is documented and secrets are not in Git.
4. Record the version and user-visible changes.
5. Deploy to a test environment, then check health.
6. Know how to restore the previous version.
7. Watch logs and metrics after release.

## Versioning and notes

A release note tells users what changed and anything they need to do. A version such as `v1.2.0` communicates a named release. In this course, use Git tags for milestones:

```bash
git tag -a v0.1.0 -m "CoraxReads first practice release"
git show v0.1.0
```

- `git tag -a` creates an annotated release marker.
- `git show` inspects the tag and its commit.

Do not tag a release until the reviewed change is committed and tested.

## Rollback is a plan, not a button

Write down the previous known-good version, who can approve rollback, what command or workflow restores it, and how to verify service health afterward. A database change may not be reversible just by switching application versions.

## Practice

Make a release checklist for the catalog feature. Add one monitoring signal and one rollback risk.
