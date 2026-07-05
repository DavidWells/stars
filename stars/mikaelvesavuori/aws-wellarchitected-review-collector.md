---
repo: mikaelvesavuori/aws-wellarchitected-review-collector
url: 'https://github.com/mikaelvesavuori/aws-wellarchitected-review-collector'
homepage: ''
starredAt: '2025-01-14T17:54:26Z'
createdAt: '2023-05-18T08:21:38Z'
updatedAt: '2025-01-14T17:54:26Z'
language: TypeScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.019Z'
description: Collect high-level AWS Well-Architected review data for a workload.
tags:
  - architecture-review
  - aws
  - aws-review
  - review
  - wa-tool
  - well-architected
  - well-architected-tool
  - wellarchitected
---

# AWS Well-Architected Tool Review Collector

This solution sets up a small service that collects the high-level AWS Well-Architected review data for a given workload. It's currently for a single account, so you'd either need to modify this, or deploy this utility to each account you want to collect reviews from.

It's a convenient solution if you want, for example, to display the number of risks for a workload in your own dashboards or systems monitoring tool.

You could easily extend this solution with additional functionality; see [the AWS docs on the WA tool](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-wellarchitected/index.html) for what is possible.

## Prerequisites

- Recent [Node.js](https://nodejs.org/en/) (ideally 18+) installed.
- Amazon Web Services (AWS) account with sufficient permissions so that you can deploy infrastructure.
- Ideally some experience with [Serverless Framework](https://www.serverless.com) as that's what we will use to deploy the service and infrastructure.
- You will need to set up a workload in the AWS Well-Architected Tool manually, as that's not part of this solution.

## Installation

Clone, fork, or download the repo as you normally would. Run `npm install`.

## Commands

The below commands are the most critical ones. See `package.json` for more commands! Substitute `npm` for `yarn` or whatever floats your boat.

- `npm start`: Run Serverless Framework in offline mode
- `npm run deploy`: Deploy with Serverless Framework
- `npm run build`: Package and build the code with Serverless Framework
- `npm run teardown`: Removes the deployed stack

## Configuration

You need to set your AWS account number. Do this either by passing it in via CLI, e.g. `npx sls deploy --account 123412341234` or setting the fallback value in `serverless.yml`:

```yml
awsAccountNumber: ${opt:account, '123412341234'}
```

## API examples

### Request

The request requires the workload ID to be passed in.

Note that you might need to switch on the ID column if using the web console/UI as it's not visible by default.

```bash
curl https://RANDOM.execute-api.REGION.amazonaws.com/reviews?id=WORKLOAD_ID
```

### Response

```json
[
  {
    "LensAlias": "arn:aws:wellarchitected:eu-north-1:123412341234:lens/abcdef123456abcdef123456abcdef12",
    "LensArn": "arn:aws:wellarchitected:eu-north-1:123412341234:lens/abcdef123456abcdef123456abcdef12",
    "LensName": "My Custom Lens",
    "LensStatus": "CURRENT",
    "LensVersion": "0.1",
    "RiskCounts": { "UNANSWERED": 0, "HIGH": 7, "MEDIUM": 8, "NONE": 21, "NOT_APPLICABLE": 13 },
    "UpdatedAt": "2023-05-18T07:13:14.000Z"
  },
  {
    "LensAlias": "wellarchitected",
    "LensArn": "arn:aws:wellarchitected::aws:lens/wellarchitected",
    "LensName": "AWS Well-Architected Framework",
    "LensStatus": "CURRENT",
    "LensVersion": "2023-04-10",
    "RiskCounts": { "UNANSWERED": 0, "HIGH": 43, "MEDIUM": 4, "NONE": 1, "NOT_APPLICABLE": 12 },
    "UpdatedAt": "2023-05-18T07:17:46.000Z"
  }
]
```
