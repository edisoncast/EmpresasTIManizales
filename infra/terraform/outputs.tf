output "bucket_name" {
  value       = aws_s3_bucket.site.bucket
  description = "Nombre del bucket S3 que almacena el sitio."
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.site.id
  description = "ID de la distribución de CloudFront (para invalidaciones)."
}

output "cloudfront_domain_name" {
  value       = aws_cloudfront_distribution.site.domain_name
  description = "Dominio de CloudFront."
}

output "site_url" {
  value       = var.enable_custom_domain ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.site.domain_name}"
  description = "URL pública del sitio."
}
