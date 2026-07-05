---
repo: jaypeng2015/aws-this-week
url: 'https://github.com/jaypeng2015/aws-this-week'
homepage: ''
starredAt: '2018-11-22T18:53:52Z'
createdAt: '2018-04-12T22:32:58Z'
updatedAt: '2021-02-22T23:20:10Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:01.843Z'
description: >-
  A cron lambda function that sends `aws-this-week` youtube video to a slack
  channel.
tags:
  - aws
  - this
  - week
---

**Retired**

A Cloud Guru has stopped uploading videos to the Youtube channel and all the videos are self-hosted at https://acloud.guru/series/aws-this-week/. Also the latest link is always https://acloud.guru/series/aws-this-week/view/latest so basically we don’t need this lambda function anymore.

# AWS This Week

[![Build Status](https://travis-ci.com/jaypeng2015/aws-this-week.svg?branch=master)](https://travis-ci.com/jaypeng2015/aws-this-week)
[![Dependency Status](https://david-dm.org/jaypeng2015/aws-this-week/status.svg)](https://david-dm.org/jaypeng2015/aws-this-week)
[![devDependency Status](https://david-dm.org/jaypeng2015/aws-this-week/dev-status.svg)](https://david-dm.org/jaypeng2015/aws-this-week?type=dev)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A cron lambda function which gets the link of the latest `AWS This Week` YouTube video and send it to a slack webhook.
By default it runs at 00:00 (UTC) every Monday.

## Getting Started

- git clone https://github.com/jaypeng2015/aws-this-week
- cd aws-this-week
- nvm install
- npm install
- npm test

## Configure your AWS credentials

You’ll need to configure your AWS dev account credentials if you want to deploy a private copy of the function to AWS.

To create/retrieve your AWS security access keys:

- Log into the AWS console, e.g. https://console.aws.amazon.com
- Go to the [IAM](https://console.aws.amazon.com/iam/home) page
- Click 'Users' from the side nav
- Click your username in the list of Users
- Click the 'Security credentials' tab
- Click 'Create access key' under 'Access keys'
- Click 'Download .csv file' to save a copy of the Access key ID and Secret access key

Note: You can't retrieve the secret access key later so either copy it now or save the `.csv` file to your computer.

Install the [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) for your operating system.

Then configure your AWS security access keys:

```sh
aws --profile developer configure
AWS Access Key ID [None]: xxxxxxxxxxxxxxxx
AWS Secret Access Key [None]: xxxxxxxxxxxxxxxxxxxx
Default region name [None]: ap-southeast-2
Default output format [None]: json
```

You activate the `developer` profile:

```sh
export AWS_PROFILE=developer
```

**Note:** If you want `developer` to be your default profile then simply omit the `--profile <profile_name>` option when configuring the AWS CLI. You then can also omit setting the `AWS_PROFILE` environment variable.

For detailed instructions, refer to the [Serverless AWS - Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/) guide.'

## Configure slack incoming webhook

Go to your slack team, `Custom Integrations` -> `Incoming WebHooks` and then create a new webhook.

Copy the webhook url and set it as an environment variable:

```sh
export WEBHOOK_URL=https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/xxxxxxxxxx
```

## Deployment scripts

- `npm run deploy` - deploy the function to your AWS account
- `npm run remove` - remove the function stack from your AWS account
- `npm run invoke` - invoke the function remotely
- `npm run invoke-local` - invoke the function locally

## Release

Managed by [Travis CI](https://travis-ci.com) and [semantic-release](https://github.com/semantic-release/semantic-release)

## Resources

- [License (MIT)][license]
- [Releases][releases]

[license]: ./LICENSE
[releases]: https://github.com/jaypeng2015/aws-this-week/releases
