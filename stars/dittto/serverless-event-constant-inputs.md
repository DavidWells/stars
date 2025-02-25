---
repo: dittto/serverless-event-constant-inputs
url: 'https://github.com/dittto/serverless-event-constant-inputs'
homepage: null
starredAt: '2016-11-27T19:36:04Z'
createdAt: '2016-10-09T23:52:38Z'
updatedAt: '2022-08-19T15:17:19Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:50:36.234Z'
description: >-
  Allows you to add constant inputs to events in Serverless 1.0. This is defined
  in
  https://aws.amazon.com/blogs/compute/simply-serverless-use-constant-values-in-cloudwatch-event-triggered-lambda-functions/
  .
tags: []
---

# Serverless event constant inputs

Allows you to add constant inputs to events in Serverless 1.0. This is defined in https://aws.amazon.com/blogs/compute/simply-serverless-use-constant-values-in-cloudwatch-event-triggered-lambda-functions/ .

[![Build Status](https://travis-ci.org/dittto/serverless-event-constant-inputs.svg?branch=master)](https://travis-ci.org/dittto/serverless-event-constant-inputs) [![Coverage Status](https://coveralls.io/repos/github/dittto/serverless-event-constant-inputs/badge.svg)](https://coveralls.io/github/dittto/serverless-event-constant-inputs) [![npm](https://badge.fury.io/js/serverless-event-constant-inputs.svg)](https://www.npmjs.com/package/serverless-event-constant-inputs)

## How to use

Add either a simple string as an input field to an event schedule, or an object.

```
functions:
  esi:
    handler: handler.esi
    events:
      - schedule:
          rate: cron(0 1 * * ? *)
          enabled: true
          input:
            provider: stubhub
            is_delta: true
      - schedule:
          rate: cron(0 2 * * ? *)
          enabled: true
          input: '{"provider": "see_tickets"}'
```

The above shows adding input values to 2 scheduled events. The first as an object and the second as a string.
