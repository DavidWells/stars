---
repo: madtrick/cfpat-audit
url: 'https://github.com/madtrick/cfpat-audit'
homepage: null
starredAt: '2018-04-16T18:35:10Z'
createdAt: '2018-03-23T14:58:37Z'
updatedAt: '2020-12-21T22:57:45Z'
language: JavaScript
license: NA
branch: development
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:22.971Z'
description: Audit for leaked PAT in your Contentful organization
tags: []
---

# About

Lambda function that finds leaked Contentful PATs and write those to a file in a S3 bucket.

## Contents

* Lambda function that searches for leaked PATs using Github's code search API
* Executable to do the same search locally
* Serverless setup

## Deploying to AWS

```shell
AUDIT_BUCKET=XXX GITHUB_ORGANIZATION_ID=YYY GITHUB_ACCESS_TOKEN=ZZZ $(npm bin)/serverless deploy
```
