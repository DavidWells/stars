---
repo: TysonWorks/serverless-cloudformation-drift-detection
url: 'https://github.com/TysonWorks/serverless-cloudformation-drift-detection'
homepage: null
starredAt: '2020-09-18T01:06:44Z'
createdAt: '2019-07-21T20:20:00Z'
updatedAt: '2022-06-06T09:25:49Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:30.924Z'
description: Automated Cloudformation Drift detection using Serverless framework
tags: []
---

# Serverless Cloudformation Drift Detection
Automated Cloudformation Drift detection using Serverless framework

## Deployment
Install Serverless framework globally if you haven't installed yet. You will need `npm` for that. [How to install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Configure `serverless.yaml` file

Set environment variables

```

export REGIONS="us-west-1,us-west-2,us-east-1,us-east-2"
export SLACK_URL="https://hooks.slack.com/services/replace/replace/replace"
export SLEEP_BETWEEN_ROUNDS=30
export SLEEP_BETWEEN_API_CALLS=5
export NUM_OF_ROUNDS=5
```
Deploy

``` sls deploy --stage dev --region us-west-2 --profile my-profile```


__You might see drift detection requests getting failed due to rate limits exceeded, create a support ticket to increase that limit.__

