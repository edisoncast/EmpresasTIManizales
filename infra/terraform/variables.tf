variable "project_name" {
  type        = string
  description = "Project name used for resource naming."
  default     = "empresas-ti-manizales"
}

variable "environment" {
  type        = string
  description = "Deployment environment."
  default     = "prod"
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
}

variable "price_class" {
  type        = string
  description = "CloudFront price class (PriceClass_100 is the cheapest)."
  default     = "PriceClass_100"
}

variable "enable_access_logs" {
  type        = bool
  description = "Enable CloudFront access logs (off by default to reduce cost)."
  default     = false
}
