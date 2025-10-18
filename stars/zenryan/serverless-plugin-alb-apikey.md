---
repo: zenryan/serverless-plugin-alb-apikey
url: 'https://github.com/zenryan/serverless-plugin-alb-apikey'
homepage: null
starredAt: '2025-08-25T19:33:41Z'
createdAt: '2020-01-31T07:51:39Z'
updatedAt: '2025-08-25T19:33:42Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-10-18T22:29:48.510Z'
description: Api key for Alb Event on Serverless Framework
tags: []
---

# Serverless Plugin Api Key For Application Load Balancer Event

This plugin will protect routes using x-api-key similar to Api Gateway implementation. This is implemented through: 
- Adding extra conditions in the Alb Http Listener
- New Rule to capture invalid key which will by default return status code 403 and json response with message `Forbidden`

### Support
This plugins only support provider from `aws`

### Documentation
- [Installation](#installation)
- [Register the plugin](#register-the-plugin)
- [Usage](#usage)
- [What does this plugin do](#what-does-this-plugin-do)


### Installation
```sh
$ yarn add --dev yarn add --dev https://github.com/zenryan/serverless-plugin-alb-apikey.git#master
```

### Register the plugin
Register this plugin in the serverless.yml
For example:
```
service:
  name: some-service

plugins:
  - ....
  - serverless-plugin-alb-apikey
  - ...
```

### Usage

Sample alb event without api key
```
albPingAuth:
  handler: ${self:custom.path.app}/handlers/ping.handler
  description: Ping Auth test from ALB
  timeout: 5
  reservedConcurrency: 1
  events:
    - alb:
        listenerArn:
          Ref: HTTPListener
        priority: 3
        conditions:
          path: ['/ping/auth']
          method: ['GET', 'POST']
```

Alb event setup with api key
```yml
albPingAuth:
  handler: ${self:custom.path.app}/handlers/ping.handler
  description: Ping Auth test from ALB
  timeout: 5
  reservedConcurrency: 1
  events:
    - alb:
        listenerArn:
          Ref: HTTPListener
        priority: 3
        apiKey:                         # api-key to check against - required - max 5 keys allowed
          - ${env:AWS_ALB_API_KEY}      # from env, custom, or provider
          - 'xxxxyyyy'                  # or simple string value
        conditions:
          path: ['/ping/auth']
          method: ['GET', 'POST']
        actions:                        // optional, if you need to override the default actions
          - Type: 'fixed-response'
            FixedResponseConfig:
              StatusCode: 403
              ContentType: 'application/json'
              MessageBody: '{ "custom error": "custom Forbidden message" }'
```

default error response
```yml
        actions:
          - Type: 'fixed-response'
            FixedResponseConfig:
              StatusCode: 403
              ContentType: 'application/json'
              MessageBody: '{ "message": "Forbidden: invalid api key" }'
```

This plugins is used as example in here - https://github.com/reflex-media/lesgo-lite

### What does this plugin do

For each alb event 

Extra condition is created to check for x-api-key header in the listener rule 
![Header check rule](https://github.com/zenryan/serverless-plugin-alb-apikey/blob/develop/image-example/add-header-rule.png)

Extra rule is also created to response forbidden access accordingly.
![Error Response](https://github.com/zenryan/serverless-plugin-alb-apikey/blob/develop/image-example/add-error-response.png)

