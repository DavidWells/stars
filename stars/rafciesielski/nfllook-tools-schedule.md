---
repo: rafciesielski/nfllook-tools-schedule
url: 'https://github.com/rafciesielski/nfllook-tools-schedule'
homepage: ''
starredAt: '2016-12-19T04:19:02Z'
createdAt: '2016-12-16T13:01:19Z'
updatedAt: '2016-12-19T13:06:39Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:50.742Z'
description: 'Download, clean and export to MongoDB NFL schedule'
tags: []
---

# nfllook-tools-schedule
Download, clean and export to MongoDB NFL schedule

![nfllook-tools-schedule overview](nfllook-tools-schedule.png)

## Prerequisites:
1. AWS account
2. node.js
3. Serverless Framework
4. https://serverless.com/framework/docs/providers/aws/guide/credentials/
5. MongoDB
6. Create config.yml(.gitignore and .npmignore!) file based on config.template.yml

## Deploy AWS lambda functions
npm install

sls deploy

## Invoke download function(it will trigger other lambda functions)
sls invoke local --function download
