variable "project_name" {
  type        = string
  description = "Project name used for resource naming."
  default     = "empresas-ti-manizales"

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{2,30}$", var.project_name))
    error_message = "project_name debe usar minúsculas, números y guiones (3 a 31 caracteres)."
  }
}

variable "environment" {
  type        = string
  description = "Deployment environment."
  default     = "prod"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment debe ser dev, staging o prod."
  }
}

variable "aws_region" {
  type        = string
  description = "Main AWS region."
  default     = "us-east-1"
}

variable "enable_custom_domain" {
  type        = bool
  description = "Whether to create Route53 and ACM resources."
  default     = false
}

variable "domain_name" {
  type        = string
  description = "Custom domain name."
  default     = ""

  validation {
    condition     = var.domain_name == "" || can(regex("^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$", var.domain_name))
    error_message = "domain_name debe ser un nombre DNS válido en minúsculas."
  }
}

variable "hosted_zone_id" {
  type        = string
  description = "Route53 hosted zone ID."
  default     = ""
}

variable "owner" {
  type        = string
  description = "Owner tag applied to all resources."
  default     = "comunidad-tic-manizales"

  validation {
    condition     = length(trimspace(var.owner)) > 0
    error_message = "owner no puede estar vacío."
  }
}

variable "price_class" {
  type        = string
  description = "CloudFront price class (PriceClass_100 is the cheapest)."
  default     = "PriceClass_100"

  validation {
    condition     = contains(["PriceClass_100", "PriceClass_200", "PriceClass_All"], var.price_class)
    error_message = "price_class debe ser una clase válida de CloudFront."
  }
}

variable "enable_access_logs" {
  type        = bool
  description = "Enable CloudFront access logs (off by default to reduce cost)."
  default     = false
}

check "custom_domain_configuration" {
  assert {
    condition = !var.enable_custom_domain || (
      var.domain_name != "" && var.hosted_zone_id != ""
    )
    error_message = "domain_name y hosted_zone_id son obligatorios cuando enable_custom_domain es true."
  }
}
