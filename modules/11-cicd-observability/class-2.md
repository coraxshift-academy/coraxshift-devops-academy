# Class 2: Delivery and Rollback

**Time:** 2 hours
**Tools:** GitHub Actions, a container registry, and an approved test environment.

## Build once, promote the same artifact

Tag an image with an immutable identifier such as a commit SHA, not only `latest`. The image tested in CI should be the image promoted to the test environment.

## Separate checks from deployment

- Pull request: tests, static checks, image build.
- Merge to protected main: publish a versioned artifact.
- Test environment: deploy and run a health check.
- Production environment: require approval and use scoped identity.

Do not grant pull-request jobs access to production credentials. Prefer OIDC federation to long-lived cloud access keys. Restrict the role trust policy to the expected repository, branch/environment, and audience.

## Release controls

- Protect the default branch and require passing checks.
- Store deploy permissions in a protected environment.
- Keep secrets in the approved secret store, not in YAML.
- Record image digest, deployment time, approver, and health result.
- Roll back to the last known-good image and verify health.

## Practice

Draw the pipeline and mark which steps can run for every pull request and which require approval. Explain what happens if the new image fails its health check.
