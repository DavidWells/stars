---
repo: allenheltondev/image-downscaler
url: 'https://github.com/allenheltondev/image-downscaler'
homepage: null
starredAt: '2026-01-08T20:59:52Z'
createdAt: '2026-01-02T13:22:07Z'
updatedAt: '2026-01-12T12:57:06Z'
language: Rust
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2026-01-24T22:32:31.929Z'
description: >-
  AWS template for automatically converting and downscaling static images hosted
  behind a CDN
tags: []
---

# Image Downscaler and WebP Converter

Serverless image processing service that automatically converts uploaded images to optimized WebP format with multiple sizes, served through CloudFront CDN.

## Features

- **Automatic WebP Conversion**: Converts JPG, PNG, GIF, TIFF, and BMP images to WebP format
- **Multiple Sizes**: Generates 240px (thumbnail), 480px (mobile), 768px (tablet), 1200px (desktop), and 1920px (large desktop) versions
- **CloudFront CDN**: Global content delivery with intelligent WebP serving
- **Smart Browser Support**: Automatically serves WebP to supporting browsers, falls back to originals
- **S3 Integration**: Event-driven processing on S3 object uploads
- **Custom Domain Support**: Optional custom domain with SSL certificate
- **Rust Performance**: High-performance Lambda function written in Rust

## Serverless Application Repository (SAR) Usage

Deploy directly from the AWS Serverless Application Repository by adding this to your SAM template:

```yaml
ImageResizing:
  Type: AWS::Serverless::Application
  Properties:
    Location:
      ApplicationId: arn:aws:serverlessrepo:us-east-1:745159065988:applications/image-optimizer-for-blogs
      SemanticVersion: 1.0.0
    Parameters:
      RootDomainName: !Ref RootDomainName
      CustomSubdomain: images
      HostedZoneId: !Ref HostedZoneId
      S3BucketName: !Ref BucketName
```

Or deploy via AWS CLI:
```bash
aws serverlessrepo create-cloud-formation-template \
  --application-id arn:aws:serverlessrepo:us-east-1:745159065988:applications/image-optimizer-for-blogs \
  --semantic-version 1.0.0
```

## Architecture

```
S3 Bucket → EventBridge → Lambda (Rust) → S3 (WebP files) → CloudFront → Users
```

1. Upload images to S3 bucket
2. EventBridge triggers Lambda function on new uploads
3. Lambda downloads, processes, and uploads WebP versions
4. CloudFront serves optimized images globally
5. CloudFront Function handles browser compatibility

## Prerequisites

- AWS CLI configured
- SAM CLI installed
- Rust toolchain (1.88+)
- cargo-lambda: `cargo install cargo-lambda`
- Docker (for containerized builds)

## Quick Start

### 1. Deploy the Stack

```bash
# Deploy with SAM
sam build
sam deploy --guided
```

### 2. Configuration Options

During `sam deploy --guided`, you'll be prompted for:

- **S3BucketName**: Leave empty to create new bucket, or specify existing bucket name
- **RootDomainName**: Your domain (e.g., `example.com`) for custom CDN URL (optional)
- **HostedZoneId**: Route53 hosted zone ID for your domain (optional)
- **CustomSubdomain**: Subdomain for accessing images (e.g., `assets`, `cdn`, `images`) (optional)

### 3. Upload Images

Upload images to your S3 bucket:

```bash
aws s3 cp image.jpg s3://your-bucket-name/
```

The Lambda function will automatically:
- Create `<filename>.webp` (original size)
- Create `<filename>-240.webp` (thumbnail)
- Create `<filename>-480.webp` (mobile)
- Create `<filename>-768.webp` (tablet)
- Create `<filename>-1200.webp` (desktop)
- Create `<filename>-1920.webp` (large desktop)

### 4. Access Images

Use the CloudFront URL from stack outputs with responsive srcset:

```html
<!-- Responsive image with automatic WebP serving -->
<img
  src="https://your-cloudfront-domain/image.jpg"
  srcset="https://your-cloudfront-domain/image-480.jpg 480w,
          https://your-cloudfront-domain/image-768.jpg 768w,
          https://your-cloudfront-domain/image-1200.jpg 1200w,
          https://your-cloudfront-domain/image-1920.jpg 1920w"
  sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1200px) 1200px,
         1920px"
  alt="Responsive optimized image">

<!-- Direct WebP with srcset for maximum optimization -->
<img
  src="https://your-cloudfront-domain/image.webp"
  srcset="https://your-cloudfront-domain/image-480.webp 480w,
          https://your-cloudfront-domain/image-768.webp 768w,
          https://your-cloudfront-domain/image-1200.webp 1200w,
          https://your-cloudfront-domain/image-1920.webp 1920w"
  sizes="(max-width: 480px) 480px,
         (max-width: 768px) 768px,
         (max-width: 1200px) 1200px,
         1920px"
  alt="Responsive WebP image">

<!-- Thumbnail usage -->
<img src="https://your-cloudfront-domain/image-240.webp" alt="Thumbnail" width="240">

<!-- Simple fallback for basic usage -->
<img src="https://your-cloudfront-domain/image.jpg" alt="Auto-optimized">
```

## File Access Patterns

### Public Access (via CloudFront)
- `*.webp` files are publicly accessible
- Original images remain private in S3
- CloudFront serves all content with proper caching headers

### Generated Files
For an uploaded `photo.jpg`, you'll get:
- `photo.webp` (original dimensions)
- `photo-240.webp` (240px wide thumbnail)
- `photo-480.webp` (480px wide mobile)
- `photo-768.webp` (768px wide tablet)
- `photo-1200.webp` (1200px wide desktop)
- `photo-1920.webp` (1920px wide large desktop)

## Custom Domain Setup

To use a custom domain like `cdn.yourdomain.com`:

1. Own a domain with Route53 hosted zone
2. Provide these parameters during deployment:
   - `RootDomainName`: Your domain (e.g., `yourdomain.com`)
   - `HostedZoneId`: Your Route53 hosted zone ID
   - `CustomSubdomain`: Your chosen subdomain (e.g., `cdn`, `assets`, `images`)
3. Stack automatically creates:
   - SSL certificate via ACM
   - Route53 DNS record for `{CustomSubdomain}.{RootDomainName}`
   - CloudFront custom domain configuration

### Example Custom Domain Configurations

- `CustomSubdomain: assets` → `https://assets.yourdomain.com`
- `CustomSubdomain: cdn` → `https://cdn.yourdomain.com`
- `CustomSubdomain: images` → `https://images.yourdomain.com`

## License

MIT License - see LICENSE file for details.
