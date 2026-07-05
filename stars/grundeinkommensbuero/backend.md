---
repo: grundeinkommensbuero/backend
url: 'https://github.com/grundeinkommensbuero/backend'
homepage: null
starredAt: '2020-09-13T23:13:30Z'
createdAt: '2019-10-01T08:12:43Z'
updatedAt: '2024-08-26T16:35:25Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:32.329Z'
description: This repo holds the serverless lambda functions which serve as our backend.
tags: []
---

# Grundeinkommensbüro Backend

This is the backend for our website. The backend is based on serverless lambda functions.
It uses the [Serverless Framework](https://www.serverless.com/) to define infrastructure as a code and deploy the codebase to AWS easily. Functions are bundled individally through webpack with help of the [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack) package. It uses AWS Cognito for User Authentication and DynamoDB as a non-relational database. The stack can be deployed to multiple stages. The API documentation can be viewed [here](https://grundeinkommensbuero.github.io/backend/index.html).

## Getting Started

- Clone the repository
- `cd serverless`
- Install dependencies via `npm install`
- Optionally install serverless cli (`npm install -g serverless`)

## Deployment`

- `cd serverless`
- Deploy the whole stack to dev: `npm run deployDev` or via the serverless cli `sls deploy`
- Deploy the whole stack to prod: `npm run deployProd` or via the serverless cli `sls deploy -s prod`
- Deploy one function (only via the serverless cli): `sls deploy -f functionName -s stageName`

## Documentation

- Make changes to docs/documentation.yml
- To watch Redoc-Documentation locally: `npm run serveDocs`
- To bundle Redoc-Documentation into html file: `npm run bundleDocs`
