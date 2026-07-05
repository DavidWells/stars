---
repo: westy92/auth0-logs-to-s3
url: 'https://github.com/westy92/auth0-logs-to-s3'
homepage: null
starredAt: '2019-10-06T20:22:05Z'
createdAt: '2016-09-27T23:17:49Z'
updatedAt: '2021-01-14T11:31:09Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:17.445Z'
description: >-
  This extension will take all of your Auth0 logs and export them to an AWS S3
  Bucket.
tags:
  - amazon-web-services
  - analytics
  - auth0
  - auth0-plugin
  - aws
  - aws-s3
  - logs
  - node-js
  - nodejs
  - plugin
  - s3
  - s3-bucket
  - s3-storage
  - webtask
---

# Auth0 - Logs to S3

[![Auth0 Extensions](http://cdn.auth0.com/extensions/assets/badge.svg)](https://sandbox.it.auth0.com/api/run/auth0-extensions/extensions-badge?webtask_no_cache=1)

This extension will take all of your Auth0 logs and export them to an AWS S3 Bucket.

## Configure Amazon Web Services

First you'll need to [create an Amazon Web Services account](https://aws.amazon.com/).

You will need to setup an IAM user with the following policy (replace your-bucket-name with an actual bucket name):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowedActions",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

> You will also need to create an S3 Bucket to put the logs into if you have not already done so.

### Automatic Item Expiry

You can configure the S3 bucket with a lifecycle rule to enforce automatic deletion after X days.  See more information [here](http://docs.aws.amazon.com/AmazonS3/latest/dev/intro-lifecycle-rules.html).

## Configure Webtask

If you haven't configured Webtask on your machine run this first:

```
npm i -g wt-cli
wt init
```

> Requires at least node 0.10.40 - if you're running multiple version of node make sure to load the right version, e.g. "nvm use 0.10.40"

## Deploy to Webtask.io

To run it on a schedule (run every 5 minutes for example):

```
wt cron schedule \
    --name auth0-logs-to-s3 \
    --secret AUTH0_DOMAIN="YOUR_AUTH0_DOMAIN" \
    --secret AUTH0_CLIENT_ID="YOUR_AUTH0_GLOBAL_CLIENT_ID" \
    --secret AUTH0_CLIENT_SECRET="YOUR_AUTH0_GLOBAL_CLIENT_SECRET" \
    --secret AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID" \
    --secret AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY" \
    --secret AWS_BUCKET_NAME="YOUR_AWS_BUCKET_NAME" \
    --json \
    "*/5 * * * *" \
    ./build/bundle.js
```

There are optional properties you can set (here they are with their defaults).
```
    --secret AWS_REGION="us-west-2" \
    --secret BATCH_SIZE="100" \
```

> You can get your Global Client Id/Secret [here](https://auth0.com/docs/api/management/v2).

## Usage

Use any Storage Explorer to access your logs. Each record will be saved in the following structure:

```
{YOUR_AWS_BUCKET_NAME}/YYYY/MM/DD/HH/{LOG_ISO_8601_DATE_STRING}-{LOG_ID}.json
```

This will allow you to process the logs with Stream Analytics for example (which in turn can export them to Power BI).

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Seth Westphal](sethwestphal.com)

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

The original sources were heavily influenced by [auth0/auth0-logs-to-azure-blob-storage](https://github.com/auth0/auth0-logs-to-azure-blob-storage).
