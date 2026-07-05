---
repo: tvanhens/pathery
url: 'https://github.com/tvanhens/pathery'
homepage: ''
starredAt: '2022-11-23T04:19:01Z'
createdAt: '2022-11-11T23:40:41Z'
updatedAt: '2025-02-11T21:57:46Z'
language: Rust
license: MIT
branch: main
stars: 76
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:08.165Z'
description: Serverless search for AWS.
tags:
  - aws
  - aws-lambda
  - rust
  - serverless
  - tantivy
---

# Pathery :fire: Serverless Search :fire:

[![npm version](https://badge.fury.io/js/@pathery%2Fcdk.svg)](https://badge.fury.io/js/@pathery%2Fcdk)

Pathery is a **serverless search service** built on AWS using Rust, CDK and [Tantivy][tantivy]. It uses AWS managed serverless offerings – DynamoDB, EFS, Lambda, SQS, and API Gateway – to the maximum extent possible.

**:bell: WARNING:** This is currently a work in progress and not ready for production usage.

## Features

- **🔥 Fast full-text search**. Built on Rust to limit AWS Lambda cold start overhead.
- **🥰 Simple REST API**. A [simple REST API][api-docs] to make search as easy as possible.
- **👍 Easy to install**. Ships as a CDK Component, making it easy to [get started][get-started].
- **💵 Usage based infra**. No long running servers, only pay for what you use.
- **🔼 Built for AWS**. Leans on AWS managed services to limit maintenance burden and maximize scalability.
  - Document store: [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
  - Index store: [Elastic File System (EFS)](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)
  - Index writer & handler: [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
  - Index queue: [SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
  - API: [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

## Getting Started

Check out the [getting started guide][get-started] to deploy Pathery into your AWS account using CDK.

[tantivy]: https://github.com/quickwit-oss/tantivy
[get-started]: ./examples/getting-started/
[api-docs]: ./doc/api.md

## Architecture

Follow along with the Dev Log:

- [Pathery Dev Log #1: Performant Serverless Queries Without a Cluster](https://tvanhens.substack.com/p/pathery-dev-log-1-performant-serverless)
- [Pathery Dev Log #2: Indexing and the Document Store](https://tvanhens.substack.com/p/pathery-dev-log-2-indexing-and-the)

![diagram](/doc/diagram.png)
