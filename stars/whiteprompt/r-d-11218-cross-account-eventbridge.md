---
repo: whiteprompt/r-d-11218-cross-account-eventbridge
url: 'https://github.com/whiteprompt/r-d-11218-cross-account-eventbridge'
homepage: null
starredAt: '2021-06-04T02:40:40Z'
createdAt: '2021-05-25T22:25:58Z'
updatedAt: '2022-05-12T12:48:33Z'
language: JavaScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:36.440Z'
description: null
tags: []
---

# AWS Cross-Account Communication with EventBridge

## Summary

This is the example code for the article `AWS Cross-Account Messaging using EventBridge`.

The intent is to allow cross-accounts bidirectional communication in AWS, using 
EventBridge and Lambda Functions.

This project has 2 different serverless files: 
  1. `serverless-sender.yml` For the account that generates the communication (the Emitter Account).
  2. `serverless-receiver.yml` For the account that receives the query request (the Receiver Account).

## Prerequisites

  * Node v14+
  * NPM 6.14+
  * Serverless Framework CLI
    * Framework Core: 2.25+
    * Plugin: 4.4+
    * SDK: 2.3+
    * Components: 3.7+
  * Administrator Access to the two accounts, and valid credentials for both in 
    the AWS credentials file.


## Getting Started

  * Clone this repo
  * `cp .env.sample .env`
  * Edit the `.env` file and update it to have your values:
    * `REGION` The AWS Region used for the project (e.g. `us-east-1`)
    * `DEFAULT_EVENT_BUS_NAME` The name of your default EventBridge event bus 
    * `SENDER_AWS_ACCOUNT_ID` The Emitter AWS Account ID
    * `SENDER_BUS_NAME` The name of your default EventBridge event bus
    * `SENDER_AWS_PROFILE` The name of the profile for the Emitter Account in 
      your AWS credentials file
    * `RECEIVER_AWS_ACCOUNT_ID` The Receiver AWS Account ID
    * `RECEIVER_BUS_NAME` The name of your default EventBridge event bus
    * `RECEIVER_AWS_PROFILE` The name of the profile for the Receiver Account 
      in your AWS credentials file
    * `QUERY_CACHE_TABLE_NAME` The name of your DynamoDB Table used for caching
  * Deploy the serverless apps
    * `dotenv -e .env  -- serverless deploy -c serverless-sender.yml`
    * `dotenv -e .env  -- serverless deploy -c serverless-receiver.yml`
    * **Note**: You might need to comment portions of your resources and do 
      partial deployments, since you might be permissioning resources that do 
      not exist yet otherwise.
    
## Testing it out

After deploying you'll get an API Gateway endpoint you can use to send your 
messages.

You can exercise this endpoint doing requests like this:

```
POST https://your_api_gateway_base_url/dev/query
Content-Type: application/json

{
  "source": "whiteprompt",
  "detailType": "query.execute",
  "detail": {
    "query": "YOUR QUERY HERE"
  }
}
```

