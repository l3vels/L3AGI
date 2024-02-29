# DB Config
variable "ENV" {
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
variable "SENTRY_DSN" {
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
variable "JWT_EXPIRY" {
  type = string
}
variable "JWT_SECRET_KEY" {
  type = string
}
variable "GITHUB_CLIENT_ID" {
  type = string
}
variable "GITHUB_CLIENT_SECRET" {
  type = string
}
variable "FRONTEND_URL" {
  type = string
}
variable "GOOGLE_API_KEY" {
  type = string
}
variable "AWS_ACCESS_KEY_ID" {
  type = string
}
variable "AWS_SECRET_ACCESS_KEY" {
  type = string
}
variable "AWS_REGION" {
  type = string
}
variable "AWS_S3_BUCKET" {
  type = string
}
variable "AUTH_TOKEN" {
  type = string
}
variable "ELEVEN_LABS_VOICE_LIST_API" {
  type = string
}
variable "PLAY_HT_VOICE_LIST_API" {
  type = string
}
variable "AZURE_VOICE_LIST_API" {
  type = string
}
variable "ELEVEN_LABS_API_KEY" {
  type = string
}
variable "PLAY_HT_API_KEY" {
  type = string
}
variable "PLAY_HT_USER_ID" {
  type = string
}
variable "AZURE_SPEECH_KEY" {
  type = string
}

locals {
  task_container_env_vars = [ ]
}