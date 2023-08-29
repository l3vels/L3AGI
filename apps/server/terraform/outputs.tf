
output "task_container_version" {
  value = var.task_container_version
}

output "output_subdomain" {
  value = local.subdomain
  description = "output_subdomain"
}

output "output_environment" {
  value = var.environment
  description = "var.environment"
}