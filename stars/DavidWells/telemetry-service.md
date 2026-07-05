---
repo: DavidWells/telemetry-service
url: 'https://github.com/DavidWells/telemetry-service'
homepage: ''
starredAt: '2022-02-17T03:57:31Z'
createdAt: '2019-10-23T07:13:50Z'
updatedAt: '2022-02-17T03:57:53Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: false
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:22.861Z'
description: Serverless Telemetry Service API gateway to Kinesis
tags:
  - serverless
---

# Build telemetry

This service sends data into

- [Segment](https://app.segment.com/netlify/sources/netlify_build/overview) receives build events
- [Google Analytics](https://analytics.google.com/analytics/web/#/report-home/a42258181w212501728p203788988) receives build events
- [S3](https://s3.console.aws.amazon.com/s3/buckets/netlify-build-telemetry-prod-deliverybucket-fi3s98464gff/firehose/?region=us-west-2&tab=overview) receives build events & queryable with SQL via [Athena](https://us-west-2.console.aws.amazon.com/athena/home?force=&region=us-west-2#query)
- [DynamoDB](https://us-west-2.console.aws.amazon.com/dynamodb/home?region=us-west-2#tables:selected=netlify-build-telemetry-db-prod;tab=items) has build versions by count. This gives a good sense of usage / upgrade patterns

## Architecture

```

             ┌───────────────────────┐
             │                       │
             │    Netlify Build      │
             │                       │
             └───────────────────────┘
                         │
                         ▼
             ┌───────────────────────┐
             │                       │
             │      ApiGateway       │
             │                       │
             └───────────────────────┘
                         │
                         ▼
             ┌───────────────────────┐
             │                       │
             │        Kinesis        │
             │                       │
             └───────────────────────┘
                         │
        ┌────────────────┼─────────────────┬────────────────┐
        │                │                 │                │
        ▼                ▼                 ▼                ▼
 ┌─────────────┐  ┌─────────────┐    ┌──────────┐     ┌──────────┐
 │             │  │    Google   │    │          │     │          │
 │   Segment   │  │  Analytics  │    │    S3    │     │  Dynamo  │
 │             │  └─────────────┘    │          │     │          │
 └─────────────┘                     └──────────┘     └──────────┘
        │                                  │
        │                                  │
        │                                  │
        ▼                                  ▼
 ┌─────────────┐                    ┌─────────────┐
 │             │                    │   Athena    │
 │   Redshift  │                    │   Queries   │
 │             │                    └─────────────┘
 └─────────────┘
```

## Installation

```
npm install serverless -g
```

## Deployment

```
serverless deploy
```

## Teardown

```
serverless remove
```

After removing stack, you will need to clear out kinesis destination bucket as well.
