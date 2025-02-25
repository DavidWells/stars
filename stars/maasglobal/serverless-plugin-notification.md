---
repo: maasglobal/serverless-plugin-notification
url: 'https://github.com/maasglobal/serverless-plugin-notification'
homepage: ''
starredAt: '2018-11-16T00:35:16Z'
createdAt: '2017-07-04T06:21:16Z'
updatedAt: '2020-08-18T09:07:47Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:03.587Z'
description: >-
  Setup a notification system that reports all Serverless framework action to
  multiple platforms
tags:
  - serverless
  - slack
  - webhook
---

# Serverless Plugin Notification

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-plugin-notification.svg)](https://badge.fury.io/js/serverless-plugin-notification)

## Requirement
1. Serverless 1.x
2. Project setup for AWS provider

## Plugin installation
1. Open a terminal to your Serverless project
2. `npm install --save-dev serverless-plugin-notification`
3. Add `serverless-plugin-notification` in your `serverless.yml` file (see [Serverless docs](https://serverless.com/framework/docs/providers/aws/guide/plugins/#installing-plugins))
4. Follow platform specific installation
  - [Slack](#slack)
  - [Webhook](#webhook)

## Supported platforms

### Slack

#### Feature
1. Notify service deployment to predefined Slack channel with custom username. Supporting states
  - Deployment started
  - Deployment succeeded
  - Deployment failed (TODO)
2. Predefined message format - General info in post, function and endpoint listing in thread reply
3. Support Slack thread
4. Support automatically retrieving deployer name
5. EMOJIs !

#### Platform installation

In your `serverless.yml` fill the following configuration
```yaml
custom:
  notification:
    deployer: /* Default deployer name, if not automatically retrieve from local variable, if not default to 'Unnamed deployer' */
    slack:
      token: /* Your slack token here */ - Follow https://api.slack.com/bot-users to get bot access token
      channel:  /* Your channel name here */ e.g '#serverless' NOTE: Using direct message '@person' will have 'channel_not_found' error at `Deployment succeeded` and `Deployment failed`
      username: /* (Optional) Username that will be used to post the message */
```

### Webhook

#### Feature
1. Notify service deployment through http webhook POST using configurable url and headers. Supporting states:
  - Deployment started
  - Deployment succeeded
  - Deployment failed (TODO)

#### Missing pieces
1. `Content-Type` currently support only `application/json`
2. Does not support CORs

#### Plattform installation
In your `serverless.yml` fill the following configuration
```yaml
custom:
  notification:
    webhook:
      url: /* Your webhook url here */
      headers: /* Your headers here - Must be in object format */
        Content-Type: application/json
```
