variable "unique_id" {
  type        = string
  description = "The unique id for the deployment"
  default = "dashboard"
}
variable "product" {
  type        = string
  description = "The product being deployed"
  default = "L3vels UI"
}
variable "deployment_domain" {
  type        = string
  description = "The apex domain name for the deployment"
  default     = "l3vels.xyz"
}
variable "zone_id" {
  type        = string
  description = "Hosted zone id for the deployment domain"
  default     = "Z05700231L5IKHCADKDVM"
}
variable "environment" {
  type        = string
  description = "The environment description to deploy in."
  default     = "dev"
}
variable "aws_default_region" {
  type        = string
  description = "The default AWS region used in this repo"
  default     = "us-east-1"
}
variable "alternate_interface_url" {
  description = "Alternate interface URLs"
  type        = list(string)
  default     = []
}