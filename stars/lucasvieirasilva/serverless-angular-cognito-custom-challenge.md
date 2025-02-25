---
repo: lucasvieirasilva/serverless-angular-cognito-custom-challenge
url: >-
  https://github.com/lucasvieirasilva/serverless-angular-cognito-custom-challenge
homepage: null
starredAt: '2019-03-05T05:41:45Z'
createdAt: '2018-11-27T00:37:59Z'
updatedAt: '2022-11-28T20:38:21Z'
language: TypeScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:43.909Z'
description: Serverless Framework + Angular + Cognito Custom Challenge
tags: []
---

# Serverless Framework + Angular + Cognito Custom Challenge

## Overview

![architecture](images/lambda-challenges.png)

## Prerequirement

Install serverless cli.

```shellscript
npm i -g serverless
```

## Deploy Backend

### Install dependencies

Navigate to Folder

```shellscript
cd backend
```

Install dependencies

```shellscript
npm i
```

### Deploy

Deploy backend environment

```shellscript
serverless deploy
```

## Deploy Front-end

### Install dependencies

Navigate to Folder

```shellscript
cd client
```

Install dependencies

```shellscript
npm i
```

Deploy to S3 + CloudFront

```shellscript
npm run build-deploy
```
