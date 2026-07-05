---
repo: while-true/wt-dev-cloudfront-private-access
url: 'https://github.com/while-true/wt-dev-cloudfront-private-access'
homepage: null
starredAt: '2025-01-13T20:43:00Z'
createdAt: '2024-07-02T14:22:59Z'
updatedAt: '2025-01-13T20:43:00Z'
language: TypeScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:16.807Z'
description: null
tags: []
---

# Protecting AWS CloudFront site from prying eyes

AWS CloudFront is Amazon's CDN offering that is very often used to host single-page applications (SPAs). SPA files reside in an S3 bucket, and CloudFront serves them to customers. In some cases, you might want to hide these sites. For example, test and sandbox versions of the site that contain not-yet-released features and bugs might be better hidden from the public internet.

There are some ways to prevent access by combining VPN and AWS WAF (Web Application Firewall), but that requires routing all traffic through VPN and makes the site slower than if it was served by CloudFront's edge location.

Explore our [article](https://docs.wt.dev/blog/cf-private-access) to learn about an approach that makes content inaccessible to anyone without specific login credentials or (optionally) access to the internal network.
