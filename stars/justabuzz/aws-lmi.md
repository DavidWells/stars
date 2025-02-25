---
repo: justabuzz/aws-lmi
url: 'https://github.com/justabuzz/aws-lmi'
homepage: null
starredAt: '2020-03-26T03:39:15Z'
createdAt: '2017-06-30T06:58:45Z'
updatedAt: '2020-03-26T03:39:15Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:00.820Z'
description: Quick access to AWS EC2 instances
tags:
  - aws
  - ec2-instance
  - serverless
---

## Synopsis

LMI is a serverless project to be deployed on AWS. It provides a quick way to add temporary rules to Security Groups, by accessing a simple web app, specifying an IP address, port range and number of minutes to keep the rule on. It can also keep track with your current IP address, detect when it changes and update current SG rules accordingly. Read all about it in my post here: https://medium.com/@onclouds/accessing-your-aws-ec2-instances-on-the-go-3122ba46d853

## Motivation

Easy access to granting access to EC2 instances solves a few problems for me:
1. When on the go and only with my mobile makes it quite tedious task (MFA, regions, navigating to the right place, fill up IP details, etc).
2. Offshore developers dependent on me granting them access. This tool allows them to do this independently.
3. It's especially useful when your IP changes frequently.

## Features

Once installed you can add users to the Cognito User Pool. Each user can sign in to the react app and add SG rules. Rules will expire after the specified "minutes to live". There's a cap on the max minutes to live for rules.

If a user uses this to open access for themselves then they can also use the "Auto Update IP", which is useful for situations where the IP changes frequently. The react app will keep track with the current IP of the user and will update the user's current rules in case of an IP change.

The admin receives an email about any added/removed rule.

## Installation

I assume you already have AWS CLI And Serverless installed and configured.

The majority of the deployment process is done by Serverless Framework. Steps for deploying this solution are:
1. Create an Amazon Cognito User Pool and a client app. Make sure not to generate a client secret, because your client is a web app. Create a user in the pool. This will be the user you will use to sign in to the react client app.
2. Plug the User Pool ARN in serverless.yml (variable USER_POOL_ARN).
3. Review serverless.yml parameters at the top and change values as needed. One important variable is the SG_ID - this is the security group ID which you will add/remove rules from. Also - set your email, as this will be the address that will receive messages about added and removed SG rules.
3. Deploy the serverless project by executing `serverless deploy --verbose` in sls directory.
4. Set the parameters in lmi-client/public/index.html (APIG endpoint is emitted when sls deploy completes as ServiceEndpoint output)
5. Prepare the React app (execute `npm install` and `npm run build` inside lmi-client directory)
6. Upload the React client (content of build directory) to BUCKET_NAME S3 bucket and make sure it's marked as public.

## Usage

1. Browse to S3 bucket web URL (URL is emitted when sls deployment completes).
2. Sign in using the credentials of the user you added to your Cognito User Pool.
3. Add a rule and submit.

## To do

- [ ] Add list of current rules after login, so user can remove them via UI
- [ ] Include a remove link in the "LMI rule added" email

That's it!
