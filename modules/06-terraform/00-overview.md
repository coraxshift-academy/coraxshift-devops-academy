# Week 6: Terraform Fundamentals

**Project:** CoraxReads
**Goal:** Describe local infrastructure in code, review a plan, and clean it up safely.

## What you will ship

- Terraform configuration for a local Nginx container.
- A saved plan and notes explaining what Terraform will create.
- Evidence that the container responds and was destroyed afterward.

## Three classes

1. **Infrastructure as code:** providers, resources, and configuration.
2. **State and review:** init, validate, plan, apply, outputs, and drift.
3. **Safe lifecycle:** variables, destroy, state safety, and cost/security boundaries.

```text
configuration -> plan (preview) -> apply (change) -> observe -> destroy lab
```

Terraform state maps the code to real resources. Treat it as sensitive operational data; do not commit state files.

## Prerequisites

- Docker Engine available in your local lab environment.
- Terraform CLI installed.
- Do not configure cloud providers this week. Keep the exercise local.

## Lessons

- [Class 1: Terraform and providers](class-1.md)
- [Class 2: Plan before apply](class-2.md)
- [Class 3: State and cleanup](class-3.md)
- [Assignment 6](assignment-6.md)
- [Troubleshooting](troubleshooting.md)
- [Quiz Week 6](quiz-week-6.md)

## Official reference

- [Terraform documentation](https://developer.hashicorp.com/terraform/docs)
- [Terraform Docker provider](https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs)
