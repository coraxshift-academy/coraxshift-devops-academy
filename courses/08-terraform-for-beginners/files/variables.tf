variable "project_name" {
  description = "Name used for every resource this configuration creates"
  type        = string
  default     = "coraxshift"
}

variable "web_port" {
  description = "Port on your machine that the web container answers on"
  type        = number
  default     = 8080
}

variable "web_image" {
  description = "Container image to run"
  type        = string
  default     = "nginx:alpine"
}
