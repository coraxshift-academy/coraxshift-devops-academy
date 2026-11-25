# Troubleshooting

**CI/CD for Beginners · Coraxshift DevOps Academy**

Something not working? Good. That is part of learning. Find what you see in the first column.

## Signing in and creating the repository

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `You are not logged into any GitHub hosts` | `gh` is not signed in | `gh auth login`, choose GitHub.com, HTTPS, web browser |
| Login works but `gh repo create` is refused | The Codespace token is limited to one repository | Run `unset GITHUB_TOKEN` then `gh auth login` again and choose a browser login. Or create the empty repository on github.com and run `git remote add origin URL` then `git push -u origin main` |
| `Name already exists on this account` | You already have a repository with that name | Pick another name, such as `cafe-cicd-2`, and use it everywhere |
| `Author identity unknown` | Git does not know your name | Use the `git config --global` lines from the Git course |

## Running workflows

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `gh run list` shows nothing | The run has not started yet, or the workflow file is in the wrong folder | Wait 15 seconds. Check the file is in `.github/workflows/` and ends in `.yml` |
| Actions tab says workflows are disabled | GitHub pauses workflows on new forks and some accounts | Click **I understand my workflows, go ahead and enable them** |
| Workflow does not appear at all | A YAML spacing mistake | Open the Actions tab. A broken file shows an error banner naming the line |
| `Invalid workflow file` | Spacing or a misspelt word | Two spaces per level, no tabs. Compare with the lesson |
| `gh run watch` asks you to choose a run | You did not pass a run number | Use the `RUN=$(...)` line from the lesson |
| `Process completed with exit code 1` | A step failed | `gh run view RUN --log-failed` and read the last lines |

## Pull requests and protection

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `Upgrade to GitHub Pro or make this repository public` | The repository is private | Make it public in **Settings, General, Danger Zone**. It holds nothing secret |
| `gh pr checks` says `no checks reported` | The checks have not started | Wait 15 seconds, then try again |
| Required checks never turn green | The names in the protection rule do not match the job names | Job names must be exactly `test (3.11)` and `test (3.12)` |
| You are locked out of `main` | The protection is working | Always go through a pull request. Use `ship` |
| `ship` does nothing after the push | A pull request already exists for this branch | Use `gh pr checks --watch` then `gh pr merge --squash --delete-branch` |

## Delivery

| What you see | Most likely reason | Safe next step |
|---|---|---|
| `build` fails at the push step with `permission denied` or `403` | The package is not allowed to be written by this repository | Check the workflow has `packages: write`. On the package page, open **Package settings** and add your repository under **Manage Actions access** with the **Write** role |
| `The CAFE_PASSCODE secret is missing` | You skipped Step 1 | Run `gh secret set CAFE_PASSCODE --body 'practice-value-123'` |
| No **Review deployments** box appears | The `production` environment has no required reviewer | Repeat Class 3, Step 2 and check the rule count is 1 |
| Environment reviewers refused | The repository is private | Required reviewers are free only on public repositories |
| `docker: command not found` in your Codespace | Docker is not available there | See the Docker course troubleshooting |
| Smoke test fails on a good commit | The server did not start in time | Read the log of the **Smoke test** step. Increase the wait loop |

## 🆘 The panic button

If you are afraid you broke something:

1. Run `git status` and `gh run list --limit 5`. They change nothing.
2. Read the last lines of the failed step.
3. Send the output to your instructor.

Your files are safe in Git. You can always create a new repository and start again.
