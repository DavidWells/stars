---
repo: awsfundamentals-hq/sfn-wait-for-callback
url: 'https://github.com/awsfundamentals-hq/sfn-wait-for-callback'
homepage: 'https://awsfundamentals.com/newsletter'
starredAt: '2025-04-07T20:59:27Z'
createdAt: '2024-03-06T18:10:12Z'
updatedAt: '2025-04-08T06:52:21Z'
language: TypeScript
license: NA
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-12T22:30:06.823Z'
description: ⚡️ Learning about the AWS Step Functions using the callback pattern
tags:
  - aws
  - callback
  - lambda
  - newsletter
  - step-functions
---

# sfn-wait-for-callback

Welcome to the `sfn-wait-for-callback` repository! This project complements our [blog post](https://blog.awsfundamentals.com/building-a-real-world-use-case-with-step-functions-and-the-callback-pattern), demonstrating a real-world application of AWS Step Functions using the callback pattern.

We implement a basic UI that starts a Step Function, let's it wait for a specific input (title forbidden), and continues it only on user input.

![Step Function Workflow](https://github.com/awsfundamentals-hq/sfn-wait-for-callback/assets/19362086/08606338-9b90-4b63-99b9-7955c8601067)

## Deploy

You can use any package manager, we've used pnpm. Follow these commands to deploy the project to your AWS default profile:

```
pnpm install
pnpm run deploy:prod
```


## Running Locally

To run the project on your local machine:

1. Install dependencies:

```
pnpm install
```


2. Start the development server:

```
pnpm run dev
```


3. For the frontend, navigate to the `packages/frontend` directory and start its development server:

```
cd packages/frontend
pnpm run dev
```


## Components

### Frontend

**Technology**: Next.js

**Submit Articles**: We've implemented a mock form that submits new articles. We only send new article titles. If you send the title `forbidden` a step Function will halt.

![Content Moderation System UI](https://github.com/awsfundamentals-hq/sfn-wait-for-callback/assets/19362086/4033ce8e-a4fb-41fc-a506-01cdb0f60648)

**Admin Page**: In `/admin` we've built an admin page that shows you all waiting step functions.
On `approve` or `reject` you will continue the Step Function with the respective decision.

![image](https://github.com/awsfundamentals-hq/sfn-wait-for-callback/assets/19362086/3d3b3a20-a982-42ff-a55f-077d087e580e)

More details are available in our [blog post](https://blog.awsfundamentals.com/building-a-real-world-use-case-with-step-functions-and-the-callback-pattern).

### Backend Resources

- **Step Function**: Built using AWS CDK, employing the chain syntax for state management.
  
  ![Step Function](https://github.com/awsfundamentals-hq/sfn-wait-for-callback/assets/19362086/7e72e40e-586a-4508-a925-eebea9368316)

- **Lambda Functions**:
  - REST API: Starts Step Functions and retrieves items from DynamoDB.
  - Approval Receiver: Handles decision and task token reception.
  - Manual Approval Request: Records Step Functions awaiting approval in DynamoDB.

- **DynamoDB**: Stores active Step Functions and related metadata.

## Costs

This project is serverless, meaning it is 100% usage-based. Testing should be free under the AWS Free Tier. For larger-scale operations, be mindful of DynamoDB scan costs and Step Function state changes.

## Contributions

Interested in contributing? Great! 🚀 Simply create an issue or a pull request, and we'll take a look.
