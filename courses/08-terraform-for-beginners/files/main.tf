# Local path: builds the same shape of infrastructure on your own machine.
# Nothing here costs money and nothing leaves your laptop.

provider "docker" {}

resource "docker_network" "app" {
  name = "${var.project_name}-net"
}

resource "docker_container" "web" {
  name  = "${var.project_name}-web"
  image = var.web_image

  ports {
    internal = 80
    external = var.web_port
  }

  networks_advanced {
    name = docker_network.app.name
  }
}
