variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "project_name" {
  type    = string
  default = "coraxshift"
}

variable "your_name" {
  description = "Bucket names must be globally unique, so put your name here"
  type        = string
}
