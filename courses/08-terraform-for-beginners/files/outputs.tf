output "web_url" {
  description = "Open this address in your browser"
  value       = "http://localhost:${var.web_port}"
}

output "container_name" {
  description = "Name of the running container"
  value       = docker_container.web.name
}

output "network_name" {
  description = "Name of the network Terraform created"
  value       = docker_network.app.name
}
