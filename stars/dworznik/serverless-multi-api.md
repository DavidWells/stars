---
repo: dworznik/serverless-multi-api
url: 'https://github.com/dworznik/serverless-multi-api'
homepage: null
starredAt: '2019-10-23T07:46:27Z'
createdAt: '2019-01-16T05:58:15Z'
updatedAt: '2019-10-25T13:38:27Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:14.940Z'
description: Multiple Serverless services on Amazon API Gateway
tags: []
---



### Domain configuration

1. Edit `domain.yml` and provide the domain name and the cert's Arn.
1. Run `npx sls deploy` to create the custom domain config on API Gateway (this doesn't create a DNS record)


### Service deployment

1. To deploy a service, run `npx sls deploy` in its subdirectory
1. Services are available at the `/a` and `/b` base paths configured in their `serverless.yml` (e.g.: `https://api.example.org/a/hello`)
