---
repo: SanderKnape/aws-upload-to-s3
url: 'https://github.com/SanderKnape/aws-upload-to-s3'
homepage: null
starredAt: '2019-02-08T19:31:13Z'
createdAt: '2017-08-08T18:05:43Z'
updatedAt: '2023-09-04T09:35:40Z'
language: JavaScript
license: NA
branch: master
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:46.354Z'
description: Example application for uploading files to S3 using pre-signed URLs
tags: []
---

# Serverless uploads to a private S3 bucket
This is an example application that allows you to upload files to S3 through a pre-signed URL. The pre-signed URL is retrieved through an API Gateway endpoint invoking a Lambda function. AWS Cognito is used to authenticate and authorize the request for the pre-signed URL. Through this method, you can upload files to an otherwise private S3 bucket.

The full setup is described in the diagram below and explained in my blog post: [Using pre-signed URLs to upload a file to a private S3 bucket](https://sanderknape.com/2017/08/using-pre-signed-urls-upload-file-private-s3-bucket).

![Serverless S3 upload architecture](https://sanderknape.com/wp-content/uploads/2017/07/architecture-s3-cognito-upload.png)
