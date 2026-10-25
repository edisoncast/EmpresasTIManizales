terraform {
  # 1.10+ habilita el bloqueo nativo en S3 (use_lockfile); se fija el mínimo en la versión probada.
  required_version = ">= 1.17.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.70"
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
