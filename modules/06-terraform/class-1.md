# Class 1: Terraform and Providers

**Time:** 2 hours
**Run commands in:** a new `terraform-lab/` folder with Docker available.

## What Terraform does

Terraform reads desired infrastructure from `.tf` files, asks a provider to compare that intent with the current environment, then proposes changes.

```text
you describe the destination -> Terraform previews the route -> you approve the change
```

Create the folder and configuration:

```bash
mkdir -p terraform-lab
cd terraform-lab
```

In `main.tf`, put:

```hcl
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "web" {
  name         = "nginx:alpine"
  keep_locally = true
}

resource "docker_container" "web" {
  name  = "coraxreads-terraform-lab"
  image = docker_image.web.image_id

  ports {
    internal = 80
    external = 8080
  }
}

output "local_url" {
  value = "http://localhost:8080"
}
```

- `required_providers` declares which plugin Terraform needs.
- `provider "docker"` configures the Docker connection using its defaults.
- `resource` describes a managed image and container.
- `ports` maps host port 8080 to container port 80.
- `output` prints a helpful URL after apply.

Review every resource before applying. This example only runs a local container.
