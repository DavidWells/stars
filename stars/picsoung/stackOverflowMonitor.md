---
repo: picsoung/stackOverflowMonitor
url: 'https://github.com/picsoung/stackOverflowMonitor'
homepage: ''
starredAt: '2018-08-02T15:43:31Z'
createdAt: '2017-08-08T22:23:20Z'
updatedAt: '2024-07-04T13:09:01Z'
language: JavaScript
license: NA
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:17.585Z'
description: Serverless project to monitor Stack Overflow directly in Slack
tags:
  - faunadb
  - hacktoberfest
  - hacktoberfest2018
  - serverless
  - stackoverflow
---

# Stack Overflow Monitor

Monitor Stack Overflow questions and post them in a Slack channel.

![Example of notification in Slack](./img/example_slack.png)

## Pre-requisites
- AWS account with [AWS-CLI](https://aws.amazon.com/cli/) configured
- [FaunaDB](https://faunadb.com) account
- [Serverless](https://serverless.com) framework installed
- [Slack](https://slack.com) team with incoming webhook

## Tutorial

Complete tutorial could be found [here](https://medium.com/@picsoung/monitor-stack-overflow-activity-directly-into-slack-dc778913490f)

## How to use it
in `serverless.yml` change the environment variables to your own values.

`FAUNADB_SECRET` to FaunaDB secret.

`STACK_EXCHANGE_KEY` to API key to access Stack Exchange API

`SLACK_WEBHOOK_URL` is the URL of the Slack incoming webhook you’ve created 

`SLACK_CHANNEL` should be an existing channel name in your Slack team (#support, #stackoverflow,…)

`SEARCH_KEYWORD` is the keyword you are interested to monitor (nodejs, angular2,…)

### test locally
`serverless invoke local — function getStackOverflowQuestions`

### deploy
`serveless deploy`

## Contribute
This project is open source, and we welcome anybody who wants to participate and contribute!

## License
The MIT License (MIT)
