variable "location" {
  description = "The Azure location where resources will be created"
  default     = "East US"
}

terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = ">=2.0"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "l3vels"

    workspaces {
      prefix = "l3-api-"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

resource "azurerm_resource_group" "rg" {
  name     = "${local.subdomain}-resourcegroup"
  location = var.location
}

resource "azurerm_storage_account" "sa" {
  name = substr("${lower(replace(local.subdomain, "-", ""))}storageaccount", 0, 24)
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "sc" {
  name = substr("${lower(replace(local.subdomain, "-", ""))}storagecontainer", 0, 24)
  storage_account_name  = azurerm_storage_account.sa.name
  container_access_type = "private"
}