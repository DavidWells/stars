---
repo: ajbosco/terraform-provider-segment
url: 'https://github.com/ajbosco/terraform-provider-segment'
homepage: null
starredAt: '2019-01-18T17:40:29Z'
createdAt: '2018-12-10T00:55:17Z'
updatedAt: '2022-01-11T21:30:49Z'
language: Go
license: MIT
branch: master
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:50.733Z'
description: A Terraform provider for Segment
tags:
  - segment
  - segmentio
  - terraform
---

# terraform-provider-segment

A [Terraform](https://www.terraform.io/) provider for [Segment](https://www.segment.com)

## Usage

Create and manage Segment [sources](https://segment.com/docs/sources/)
```
resource "segment_source" "test_source" {
  source_name = "your-source"
  catalog_name = "catalog/sources/javascript"
}
```

Create and manage Segment [destinations](https://segment.com/docs/destinations/)
```
resource "segment_destination" "test_destination" {
  source_name = "test_source"
  destination_name = "google-analytics"
  connection_mode = "CLOUD"
  enabled = false
  configs = [{
      name = "workspaces/your-workspace/sources/your-source/destinations/google-analytics/config/trackingId"
      type = "string"
      value = "your-tracking-id"
  }]
}
```
