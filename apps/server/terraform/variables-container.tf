# DB Config
variable "NODE_ENV" {
  type = string
}
variable "OPENAI_API_KEY" {
  type = string
}
variable "DB_NAME" {
  type = string
}
variable "DB_HOST" {
  type = string
}
variable "DB_PORT" {
  type = string
}
variable "DB_USER" {
  type = string
}
variable "DB_PASS" {
  type = string
}
variable "AZURE_PUBSUB_CONNECTION_STRING" {
  type = string
}
variable "AZURE_PUBSUB_HUB_NAME" {
  type = string
}
variable "ZEP_API_URL" {
  type = string
}
variable "ZEP_API_KEY" {
  type = string
}
variable "SERPAPI_API_KEY" {
  type = string
}
variable "LANGCHAIN_TRACING_V2" {
  type = string
}
variable "LANGCHAIN_ENDPOINT" {
  type = string
}
variable "LANGCHAIN_API_KEY" {
  type = string
}
variable "LANGCHAIN_PROJECT" {
  type = string
}

locals {
  task_container_env_vars = [ ]
}