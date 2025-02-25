---
repo: rlyders/dynamodb-lock-manager
url: 'https://github.com/rlyders/dynamodb-lock-manager'
homepage: null
starredAt: '2024-12-29T01:16:47Z'
createdAt: '2019-09-16T01:06:38Z'
updatedAt: '2024-12-29T01:16:47Z'
language: TypeScript
license: GPL-3.0
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.576Z'
description: >-
  NodeJS module to manage distributed locks in DynamoDB with the AWS SDK. This
  package allows the caller to create locks, auto-refresh locks via heartbeats,
  takeover expired locks, and release locks.
tags: []
---

# dynamodb-lock-manager
Node.js TypeScript module to manage distributed locks in DynamoDB with the AWS SDK. This package allows the caller to create locks, auto-refresh locks via heartbeats, takeover expired locks, and release locks.

This work is based on concepts from following AWS Database Blog post: https://aws.amazon.com/blogs/database/building-distributed-locks-with-the-dynamodb-lock-client

For the creation and publishing of this npm package, I followed the guidelines given by Carl-Johan Kihl in the following blog post: https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c
