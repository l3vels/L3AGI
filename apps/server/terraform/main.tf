locals {
  subdomain = "api-${var.environment}"
}
resource "azurerm_resource_group" "l3_resource_group" {
  name     = "l3-k8s_group"
  location = "East US"
}


module "backend" {
  source = "git@github.com:l3vels/l3-infra.git//service/azure"

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
  task_container_port             = 4000
  host_header = ["${local.subdomain}.${var.deployment_domain}"]
  task_container_env_vars = local.task_container_env_vars
  task_desired_count  = var.task_desired_count
  environment = var.environment
  tags = {}
  kubernetes_secret_config_map_data = {
    ENV                 = var.ENV
  } 
  kubernetes_secret_name_data = {
    OPENAI_API_KEY                 = var.OPENAI_API_KEY

    DB_NAME                        = var.DB_NAME
    DB_HOST                        = var.DB_HOST
    DB_PORT                        = var.DB_PORT
    DB_USER                        = var.DB_USER
    DB_PASS                        = var.DB_PASS
    SENTRY_DSN                     = var.SENTRY_DSN
    AZURE_PUBSUB_CONNECTION_STRING = var.AZURE_PUBSUB_CONNECTION_STRING
    AZURE_PUBSUB_HUB_NAME          = var.AZURE_PUBSUB_HUB_NAME
    ZEP_API_URL                    = var.ZEP_API_URL
    ZEP_API_KEY                    = var.ZEP_API_KEY
    SERPAPI_API_KEY                = var.SERPAPI_API_KEY
    LANGCHAIN_TRACING_V2           = var.LANGCHAIN_TRACING_V2
    LANGCHAIN_ENDPOINT             = var.LANGCHAIN_ENDPOINT
    LANGCHAIN_API_KEY              = var.LANGCHAIN_API_KEY
    LANGCHAIN_PROJECT              = var.LANGCHAIN_PROJECT
    JWT_EXPIRY                     = var.JWT_EXPIRY
    JWT_SECRET_KEY                 = var.JWT_SECRET_KEY
    GITHUB_CLIENT_ID               = var.GITHUB_CLIENT_ID
    GITHUB_CLIENT_SECRET           = var.GITHUB_CLIENT_SECRET
    FRONTEND_URL                   = var.FRONTEND_URL
    GOOGLE_API_KEY                 = var.GOOGLE_API_KEY
    AWS_ACCESS_KEY_ID              = var.AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY          = var.AWS_SECRET_ACCESS_KEY
    AWS_REGION                     = var.AWS_REGION
    AWS_S3_BUCKET                  = var.AWS_S3_BUCKET
    AUTH_TOKEN                     = var.AUTH_TOKEN
    ELEVEN_LABS_VOICE_LIST_API     = var.ELEVEN_LABS_VOICE_LIST_API
    PLAY_HT_VOICE_LIST_API         = var.PLAY_HT_VOICE_LIST_API
    AZURE_VOICE_LIST_API           = var.AZURE_VOICE_LIST_API
    ELEVEN_LABS_API_KEY            = var.ELEVEN_LABS_API_KEY
    PLAY_HT_API_KEY                = var.PLAY_HT_API_KEY
    PLAY_HT_USER_ID                = var.PLAY_HT_USER_ID
    AZURE_SPEECH_KEY               = var.AZURE_SPEECH_KEY
  }
}
