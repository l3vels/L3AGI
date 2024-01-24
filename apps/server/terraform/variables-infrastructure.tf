variable "aws_default_region" {
  type        = string
  description = "The default region used in this module"
  default     = "us-east-1"
}
variable "product" {
  type        = string
  description = "The product name used in this module"
  default     = "l3vels"
}
variable "environment" {
  type        = string
  description = "The environment description to deploy in."
  default     = "dev"
}
variable "deployment_domain" {
  type        = string
  description = "The domain for the deployment"
  default     = "l3vels.xyz"
}
# variable "ci_job_token" {
#   type = string
#   description = "The CI job token"
# }

variable "task_desired_count" {
  type        = number
  description = "desired task count"
  default     = 1
}

variable "task_container_registry" {
  type = string
  default = "l3container.azurecr.io"
}
variable "task_container_name" {
  type = string
  default = "l3-api"
}
variable "task_container_version" {
  type        = string
  description = "The id or tag of the container versoin to deploy"
  default     = "latest"
}

variable "client_id" {
  description = "The Client ID of the Service Principal."
  type        = string
}

variable "client_secret" {
  description = "The Client Secret of the Service Principal."
  type        = string
  sensitive   = true
}

variable "subscription_id" {
  description = "The ID of the Subscription to use."
  type        = string
}

variable "tenant_id" {
  description = "The ID of the Tenant to which the Service Principal belongs."
  type        = string
}

variable "azure_acr_username" {
  description = "The Service Principal key."
  type        = string
  sensitive   = true
}

variable "azure_acr_password" {
  description = "The Client ID of the Service Principal."
  type        = string
  sensitive   = true
}

variable "github_personal_access_token" {
  description = "Github personal access token."
  type        = string
  sensitive   = true
}


