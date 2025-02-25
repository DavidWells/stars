---
repo: bahrmichael/serverless-scheduler
url: 'https://github.com/bahrmichael/serverless-scheduler'
homepage: null
starredAt: '2024-07-25T21:14:07Z'
createdAt: '2021-12-05T13:04:23Z'
updatedAt: '2024-07-25T21:51:23Z'
language: TypeScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:28.372Z'
description: null
tags: []
---

# Serverless Scheduler

If you are new to this project and problem domain, I recommend reading the companion article (https://bahr.dev/2022/01/06/point-in-time-scheduler/)
and the articles that it links to.

This project is the result of me writing 4 previous blog posts, at least 5 other posts on ad-hoc scheduling from the serverless
community, and more than 5 years of waiting on AWS to offer a solution for ad-hoc scheduling. They finally released such a solution
in November 2022 with the EventBridge Scheduler. See the section "Further Reading" at the end of this Readme. There are also additional repositories from previous experiments at https://github.com/bahrmichael/aws-scheduler and https://github.com/bahrmichael/aws-scheduler-testing.

This is the core of the scheduler project. You can find the frontend at https://github.com/bahrmichael/serverless-scheduler-app
and additional documentation at https://github.com/bahrmichael/point-in-time-scheduler.

## State of this Repository

Please consider the code in this repository as a working prototype for market validation. The authorization with NextAuth, API Keys, and Cognito
works, but it needs some work to clean up the code and the various authorization paths.

## Project Structure

This project consists of the Infrastructure as Code in the `serverless.ts` file, various CRUDL APIs and the authorizer in the
`/functions/api` folder, the heart of the project in `/functions/engine` and some rudimentary metering in `/functions/metering`.
The project uses API Gateway's usage plans feature to eventually support metering and billing through AWS marketplace.

### How does a message flow through the system?

Incoming messages are processed by `/functions/ingestMessage`. If all validations are successful, the message is sent directly into
an SQS queue (if it has less than 10 minutes remaining until release), or into a DynamoDB table for long term storage. SQS supports
message delays of up to 15 minutes.

The engine then picks up messages from the DynamoDB table. This happens in multiple steps to achieve high scalability.
First, `/functions/engine/schedulePull` loads all registered applications and triggers a run of `/functions/pullForOwner` for each.
This function name is not up-to-date and should rather be called `pullForApplication`. It takes an application id, and uses it
to query for messages that can be released within 5 minutes. The messages are then put into the SQS queue from above.

Once the message delay in SQS has expired, the message becomes visible and the Lambda function `/functions/releaseMessage` sends
them to their destination.

## API Specs

You can find a swagger dashboard at https://app.swaggerhub.com/apis/bahrmichael/Scheduler/0.1.0. Replace the current URL there
with https://k5v6qjp3ha.execute-api.us-east-1.amazonaws.com/dev.

## SDK

I made an attempt at building an SDK, but it turned out a bit more difficult than expected, so it moved down the priority list.

You can still check it out at https://www.npmjs.com/package/point-in-time-scheduler.

## Demo Instance

There is no demo instance at this time.

## Deployment

Due to the frontend and login features, the initial deployment is a multi-step process.

Run `npm i` to install the packages. Yarn doesn't work right now due to package conflicts.

To start the deployment, you need to come up with a `NEXTAUTH_SECRET`. Set it as an environment variable as shown below,
with an AWS profile of your choice (or omit if credentials are present via environment variables):

```
NEXTAUTH_SECRET=secret AWS_PROFILE=<YOUR-PROFILE> npm run deploy
```

Wait for this to complete, and note the deployment URL. You will need it again for the frontend deployment as `CORE_API_URL`.

Once this deployment is complete, you will need to do some click ops to generate an API key for the frontend. All requests
are secured through tenant-scoped api keys and usage plans, except for the frontend which currently uses a shared api key and usage plan.

1. Go to the API Gateway service, and make sure that the API for the scheduler has been deployed.
2. In the setting of the API Gateway service create a new API key and give it a name like "serverless scheduler frontend". Copy the key into a safe place.
3. Create a usage plan where you associate the api key and the deployed stage of the api.

Now redeploy the backend service with the api key as the `CORE_API_KEY` environment variable:

```
CORE_API_KEY=my-core-api-key NEXTAUTH_SECRET=secret AWS_PROFILE=<YOUR-PROFILE> npm run deploy
```

You can now go ahead and deploy the frontend. Once you have a Vercel project domain, come back to this repository,
and replace the domain from `CallbackURLs: ['https://serverless-scheduler-app-one.vercel.app/api/auth/callback/cognito']`  
in `serverless.ts` with your domain.

Deploy the backend service again, and now everything should work nicely together:

```
CORE_API_KEY=my-core-api-key NEXTAUTH_SECRET=secret AWS_PROFILE=<YOUR-PROFILE> npm run deploy
```

## Testing

I decided against tests during the prototyping phase. After that I went straight ahead to [canary-like e2e tests](https://github.com/bahrmichael/point-in-time-scheduler-e2e-api), 
because some code paths are only accessed if there are delays of more than 15 minutes. That felt like too much for
a test suite which is part of the deployment process.

## Further Reading on Serverless Scheduling

- [Serverless Scheduler - A research project](https://bahr.dev/2019/10/11/serverless-scheduler/)
- [Point In Time Scheduler - This project](https://bahr.dev/2022/01/06/point-in-time-scheduler/)
- https://medium.com/@zaccharles/there-is-more-than-one-way-to-schedule-a-task-398b4cdc2a75

### Scheduling with DynamoDB

- https://bahr.dev/2019/05/29/ddb-scheduling-cost/
- https://bahr.dev/2019/05/29/ddb-ttl-analysis/
- https://bahr.dev/2019/05/29/scheduling-ddb/
- https://theburningmonk.com/2019/03/dynamodb-ttl-as-an-ad-hoc-scheduling-mechanism/

### Scheduling with Step Functions

- https://theburningmonk.com/2019/06/step-functions-as-an-ad-hoc-scheduling-mechanism/

### Scheduling with CloudWatch

- https://theburningmonk.com/2019/05/using-cloudwatch-and-lambda-to-implement-ad-hoc-scheduling/

