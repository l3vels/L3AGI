## backend data for terraform
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "remote" {
  hostname = "app.terraform.io"  
  organization = "l3vels"

    workspaces {
      prefix = "l3-ui-"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

locals {
  # subdomain = var.environment == "prod" ? "${var.unique_id}" : "${var.unique_id}-${var.environment}"
  subdomain = var.environment == "prod" ? "" : "${var.environment}"
}

module "frontend" {
  source = "git::https://github.com/l3vels/l3-infra.git//frontend/aws"
  unique_id        = var.unique_id
  interface_url    = local.subdomain == "" ? "www.${var.deployment_domain}" : "${local.subdomain}.${var.deployment_domain}" 

  environment = var.environment
}

data "aws_route53_zone" "deployment" {
  name = var.deployment_domain
}


resource "aws_route53_record" "site" {
  zone_id = data.aws_route53_zone.deployment.zone_id
  # name    = "${local.subdomain}.${var.deployment_domain}"
  name    =  local.subdomain == "" ? "www.${var.deployment_domain}" : "${local.subdomain}.${var.deployment_domain}" 
  type    = "A"

  alias {
    name                   = module.frontend.cloudfront_dns
    zone_id                = module.frontend.cloudfront_zone_id
    evaluate_target_health = true
  }
}
