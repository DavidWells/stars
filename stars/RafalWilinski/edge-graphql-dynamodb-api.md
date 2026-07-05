---
repo: RafalWilinski/edge-graphql-dynamodb-api
url: 'https://github.com/RafalWilinski/edge-graphql-dynamodb-api'
homepage: 'https://rwilinski.me'
starredAt: '2022-01-04T22:45:55Z'
createdAt: '2020-05-15T10:31:28Z'
updatedAt: '2023-03-02T04:46:45Z'
language: TypeScript
license: NA
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.379Z'
description: Serverless GraphQL API on Edge with Global DynamoDB Tables
tags:
  - apollo
  - apollo-server
  - aws
  - aws-cdk
  - aws-lambda
  - cdk
  - dynamodb
  - edge-computing
  - graphql
  - serverless
---

![Solution Diagram](./assets/overview.png)

- [Demo Playground](https://d1pc7a0vu5q5b3.cloudfront.net/playground)
- [Blogpost with full explanation](https://servicefull.cloud/blog/graphql-at-edge/)

# Serverless GraphQL @ Edge + Global DynamoDB Tables

Why? Mostly for fun. I don't see too many practical use cases for such setup. Lambda@Edges aren't suitable for a lot of cases due to limited memory and CPU, so they are *slow*. If you need a globally available website with dynamic content, you should consider going with JAMStack served via CloudFront, Vercel or Cloudflare.

## Features

- Globally and highly available
- GraphQL Server at each of Edge locations using Lambda@Edge + CloudFront
- Globally replicated DynamoDB Tables
- GraphQL handlers routing to the closest DynamoDB table as persistence layer
- Pay-what-you-use model, no upfront or fixed charges, everything billed per-request
- Infra managed using AWS-CDK and Typescript
- Node functions packaged and minified automatically using Parcel, ([there's a small bug though](https://github.com/aws/aws-cdk/issues/8031))

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run deploy`  deploy this stack to your default AWS account/region

## Limitations

- Your server must be rather lightweight. Minified GraphQL Server code must be less than `1 MB`. Lambda@Edge is restricted to `128MB` of memory and `5000ms` of timeout for `VIEWER_REQUEST` integration type.
- Cannot use ENV variables
- Table name is hardcoded, gonna fix that
- Schema creation is laborious right now

Looking for cool DynamoDB editor? Check out [Dynobase](https://dynobase.dev)
