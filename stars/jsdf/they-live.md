---
repo: jsdf/they-live
url: 'https://github.com/jsdf/they-live'
homepage: null
starredAt: '2019-02-08T04:51:22Z'
createdAt: '2017-04-05T06:40:09Z'
updatedAt: '2022-02-26T01:37:07Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:46.867Z'
description: serverless server monitoring with near-zero running costs
tags: []
---

![THEY LIVE](https://i.imgur.com/xjcXdWS.jpg)

THEY LIVE is a simple endpoint health monitor with email notifications, which
runs on AWS free tier services (Lambda, SimpleDB, SES), so it costs next-to-nothing to run.

### instructions

first, clone this repo

copy [config.default.js](config.default.js) to config.js and customise it:

```js
module.exports = {
  region: 'us-east-1', // aws region for simpledb & ses
  websites: {
    // groups of websites can be defined to ping at different intervals.
    // the keys of this object must match the 'group' parameter passed to the
    // cron event in serverless.yml (see below)
    oncePer10Mins: [
      {
        name: 'example-site', // unique site name
        url: 'http://example.com/health', // endpoint to request for healthcheck
      },
    ],
    // another group which pings at a different interval
    oncePerDay: [
      {
        name: 'other-site',
        url: 'http://example.com/health2',
        attempts: 3, // will retry this many times
        interval: 15, // seconds between retries
      },
    ],
  },
  notifyTo: ['someguy@example.com'], // email to notify of health changes
  notifyFrom: 'someguy@example.com', // email to send notification from
};
```

in [serverless.yml](serverless.yml) (note the 'group' param)
```yaml
functions:
  cron:
    handler: handler.cron
    events:
      - schedule:
        rate: rate(10 minutes)
        input:
          group: oncePer10Mins
      - schedule:
        rate: rate(1 day)
        input:
          group: oncePerDay
```

run `yarn install` to install dependencies

run `aws configure` if you haven't already, to set up aws credentials

run `node migrate.js` to create the AWS SimpleDB 'domain' (basically a database)

verify your email address [in AWS SES console](https://console.aws.amazon.com/ses/home?region=us-east-1#verified-senders-email:)

deploy using serverless framework

```bash
yarn global add serverless # install globally
serverless deploy
```

watch for a successful invocation [in lambda console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions/theylive-dev-cron?tab=monitoring). scroll down on this page to see the logs in cloudwatch

you can also test that it runs locally

```bash
yarn local --data='{"group": "oncePerDay"}'
```
