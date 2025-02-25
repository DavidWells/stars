---
repo: schibsted/serverless-slack-deploy-notification
url: 'https://github.com/schibsted/serverless-slack-deploy-notification'
homepage: null
starredAt: '2021-06-04T01:45:43Z'
createdAt: '2021-01-14T10:45:33Z'
updatedAt: '2025-02-08T12:51:20Z'
language: JavaScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:36.558Z'
description: Plugin that sends a slack message on deployment start and finish
tags: []
---

# Serverless Slack deploy notification

A Serverless plugin that sends a slack message on deployment start and finish

![github checks](https://badgen.net/github/checks/schibsted/serverless-slack-deploy-notification)
![current version @ npm](https://badgen.net/npm/v/@schibsted/serverless-slack-deploy-notification)
![weekly downloads @ npm](https://badgen.net/npm/dw/@schibsted/serverless-slack-deploy-notification)
![minified size](https://badgen.net//bundlephobia/min/@schibsted/serverless-slack-deploy-notification)

## Demo

When deployment starts plugin posts a message like this:
![Deployment in progress](./assets/deployInProgress.png)

When deployment finishes successfully plugin updates the first message into:
![Deployment finished successfully](./assets/deployFinished.png)

**Sadly there's no way to detect a deployment error and send a notification then.
In that case you get stuck on the 'deployment in progress' notification**

Additionally, when the deploy finishes, plugin posts app details into a thread of the notification e.g.
![Deployed app details](./assets/deployedAppDetails.png)

## Installation

`npm install @schibsted/serverless-slack-deploy-notification --save-dev`

## Options

### Required

- `token` - Slack API token with at least `chat.write` scope
- `channel` - Channel ID (not channel name)

### Optional

- `enabled` - Turn notifications off for specific stages
- `logo` - make the notification easier to notice by putting app logo on the side of the message
- `travisUrl` - URL to your builds in Travis
- `githubUrl` - URL to your Github repository
- `appUrl` - URL where the application you're deploying will be accessible

See the sample usage below.

## Usage

```yaml
service: your-service
provider:
  name: aws
  runtime: nodejs12.x

custom:
  slackDeployNotification:
    enabled:
      staging: false
    token: %SLACK_WEB_API_TOKEN
    channel: %SLACK_CHANNEL_ID
    logo: https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_1280.png
    travisUrl: https://travis.schibsted.io/foo/bar
    githubUrl: https://github.schibsted.io/foo/bar
    appUrl: https://google.com

plugins:
  - "@schibsted/serverless-slack-deploy-notification"

functions:
  foo:
    handler: foo.handler
```

## Contributing

Everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/schibsted/serverless-slack-deploy-notification/issues) or to [submit Pull Requests](https://github.com/schibsted/serverless-slack-deploy-notification/pulls).
