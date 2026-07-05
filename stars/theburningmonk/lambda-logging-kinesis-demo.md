---
repo: theburningmonk/lambda-logging-kinesis-demo
url: 'https://github.com/theburningmonk/lambda-logging-kinesis-demo'
homepage: null
starredAt: '2018-08-07T15:45:57Z'
createdAt: '2018-07-22T18:51:13Z'
updatedAt: '2022-07-04T02:46:24Z'
language: JavaScript
license: MIT
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:17.376Z'
description: >-
  Demo of how to ship logs from CloudWatch Logs to a Kinesis stream, and then
  ship them to Logz.io
tags: []
---

# lambda-logging-kinesis-demo

Demo of how to ship logs from CloudWatch Logs to a Kinesis stream, and then ship them to Logz.io

A group of Lambda functions for:

* shipping logs from Kinesis stream to Logz.io (hosted ELK stack)
* auto-subscribe new log groups to the configured Kinesis stream so you don't have to subscribe them manually
* auto-updates the retention policy of new log groups to 7 days (configurable)

## Deployment

1. insert the `logstash_host`, `logstash_port` and `token` in the `serverless.yml` file (under the `ship-logs-to-logzio` function's environment variables).

`token`: your Logz.io account token. Can be retrieved on the Settings page in the Logz.io UI.
`logstash_host`: if you are in the EU region insert `listener-eu.logz.io`, otherwise, use `listener.logz.io`. You can tell which region you are in by checking your login URL - app.logz.io means you are in the US. app-eu.logz.io means you are in the EU.
`logstash_port`: this should be 5050, but is subject to change. See [this](https://app.logz.io/#/dashboard/data-sources/logstash) page for details.

for example:

```
ship-logs-to-logzio:
  handler: functions/ship-logs/handler.handler
  description: Sends CloudWatch logs from Kinesis to Logz.io
  environment:
    logstash_host: listener.logz.io
    logstash_port: 5050
    token: CduNgGwuFFeUVzbXvqVDXoGkjxEdKzc9
```

2. run `./build.sh deploy dev` to deploy to a stage called "dev"

## Updating existing log groups

1. open the `process_all.js` script

2. fill in the missing configuration values

3. run `node process_all.js`
