---
repo: DanteInc/js-cloud-native-cookbook
url: 'https://github.com/DanteInc/js-cloud-native-cookbook'
homepage: ''
starredAt: '2019-07-25T20:54:45Z'
createdAt: '2018-03-10T05:06:24Z'
updatedAt: '2025-02-20T14:03:15Z'
language: JavaScript
license: NA
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:28.871Z'
description: 'Continuously deliver serverless cloud-native solutions on AWS, Azure and GCP'
tags: []
---

# JavaScript Cloud Native Development Cookbook

Continuously deliver serverless cloud-native solutions on AWS, Azure and GCP

## Chapters
1. [Getting Started with Cloud-Native](./ch1)
2. [Applying the Event-Sourcing and CQRS Patterns](./ch2)
3. [Implementing Autonomous Services](./ch3)
4. [Leveraging the Edge of the Cloud](./ch4)
5. [Securing Cloud-Native Systems](./ch5)
6. [Building a Continuous Deployment Pipeline](./ch6)
7. [Optimizing Observability](./ch7)
8. [Designing for Failure](./ch8)
9. [Optimizing Performance](./ch9)
10. [Deploying to Multiple Regions](./ch10)
11. [Welcoming Polycloud](./ch11)

## Setup Development Environment:

1. Install Node Version Manager: https://github.com/creationix/nvm or https://github.com/coreybutler/nvm-windows
2. Install Node.js: `nvm install 8`
3. Install the Serverless Framework: `npm install serverless -g`
4. Create an AWS account: https://aws.amazon.com/free
5. Log into AWS and create an IAM user with admin privileges, a password, and an access key: https://serverless.com/framework/docs/providers/aws/guide/credentials#creating-aws-access-keys
6. Configure the default profile with your access key: `sls config credentials --provider aws --key 1234 --secret 5678`
7. Create an environment variable to hold your personal development stage: `export MY_STAGE=john <!-- use your name -->`
8. Install VS Code editor (optional): https://code.visualstudio.com
