terraform {
  # >= 1.10 requerido para el bloqueo de estado nativo en S3 (use_lockfile).
  required_version = ">= 1.10.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# CloudFront/ACM para certificados de dominio personalizado deben vivir en us-east-1.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
