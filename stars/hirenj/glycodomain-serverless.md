---
repo: hirenj/glycodomain-serverless
url: 'https://github.com/hirenj/glycodomain-serverless'
homepage: null
starredAt: '2019-05-14T00:06:22Z'
createdAt: '2016-03-24T22:04:54Z'
updatedAt: '2022-11-24T08:03:24Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:37.258Z'
description: >-
  Serverless (AWS Lambda / API gateway) implementation of Glycodomain data
  protocol
tags:
  - gatordata
---

# glycodomain-serverless

## What to do


### Copying configs to submodule directories
```
grunt update_configs:test
(export AWS_REGION=eu-west-1; grunt update_configs:beta --region=eu-west-1)
(export AWS_REGION=eu-west-1; grunt update_configs:prod --region=eu-west-1)
```

### Deploying
```
grunt deploy:test
(export AWS_REGION=eu-west-1; grunt deploy:beta --region=eu-west-1)
(export AWS_REGION=eu-west-1; grunt deploy:prod --region=eu-west-1)
```
