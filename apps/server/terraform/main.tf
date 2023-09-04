locals {
  subdomain = "api-ai-${var.environment}"
}
resource "azurerm_resource_group" "l3_resource_group" {
  name     = "l3-k8s_group"
  location = "East US"
}


module "backend" {
  source = "git::https://github.com/l3vels/l3-infrastructure.git//service/azure"
  unique_id          = local.subdomain
   // azure_location     = var.azure_location

  client_id                 =  var.client_id
  client_secret             = var.client_secret
  subscription_id           = var.subscription_id
  tenant_id                 = var.tenant_id
  azure_acr_username        = var.azure_acr_username
  azure_acr_password        = var.azure_acr_password

  // Other variables based on your Azure AKS configuration
  task_container_registry         = var.task_container_registry 
  task_container_name             = var.task_container_name
  task_container_version          = var.task_container_version
  task_container_port             = 4002
  host_header = ["${local.subdomain}.${var.deployment_domain}"]
  task_container_env_vars = local.task_container_env_vars
  task_desired_count  = var.task_desired_count
  environment = var.environment
  tags = {}
  kubernetes_secret_config_map_data = {
    NODE_ENV                 = var.NODE_ENV
  } 
  kubernetes_secret_name_data = {
    OPENAI_API_KEY                 = var.OPENAI_API_KEY

    DB_NAME                        = var.DB_NAME
    DB_HOST                        = var.DB_HOST
    DB_PORT                        = var.DB_PORT
    DB_USER                        = var.DB_USER
    DB_PASS                        = var.DB_PASS
    AZURE_PUBSUB_CONNECTION_STRING = var.AZURE_PUBSUB_CONNECTION_STRING
    AZURE_PUBSUB_HUB_NAME          = var.AZURE_PUBSUB_HUB_NAME
    ZEP_API_URL                    = var.ZEP_API_URL
    ZEP_API_KEY                    = var.ZEP_API_KEY
    SERPAPI_API_KEY                = var.SERPAPI_API_KEY
    LANGCHAIN_TRACING_V2           = var.LANGCHAIN_TRACING_V2
    LANGCHAIN_ENDPOINT             = var.LANGCHAIN_ENDPOINT
    LANGCHAIN_API_KEY              = var.LANGCHAIN_API_KEY
    LANGCHAIN_PROJECT              = var.LANGCHAIN_PROJECT
  }
}
