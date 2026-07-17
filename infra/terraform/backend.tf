# Estado remoto en S3 con bloqueo nativo (sin DynamoDB).
# El bloqueo usa el objeto <key>.tflock mediante escrituras condicionales de S3
# (requiere Terraform >= 1.10). El bucket de estado debe existir antes de `init`
# (ver README, sección "Desplegar con Terraform" / bootstrap del backend).
terraform {
  backend "s3" {
    bucket       = "ticmanizales-tfstate-362730983676"
    key          = "ticmanizales/prod/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
