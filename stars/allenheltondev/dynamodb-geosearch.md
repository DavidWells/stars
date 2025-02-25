---
repo: allenheltondev/dynamodb-geosearch
url: 'https://github.com/allenheltondev/dynamodb-geosearch'
homepage: null
starredAt: '2025-01-09T03:20:13Z'
createdAt: '2020-03-09T12:31:52Z'
updatedAt: '2025-01-09T03:20:14Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:18.000Z'
description: >-
  Proof of Concept building a geosearching tool using DynamoDB and free, open
  source tools
tags: []
---

[![Twitter][1.1]][1] [![GitHub][2.1]][2] [![LinkedIn][3.1]][3] [![Medium][4.1]][4]
# Dynamodb-geosearch Proof of Concept #
## Description ##
This proof of concept was built to show the ability to do geosearching in AWS DynamoDB. It uses open source software to geocode and store/read/update geopoints in dynamo. For a detailed breakdown of this repository, refer to the [article on Medium](https://medium.com/better-programming/how-i-built-a-serverless-geo-search-app-with-dynamodb-491879233754).
* [Dynamodb-geo](https://www.npmjs.com/package/dynamodb-geo)
* [Geocodio](geocod.io)

## AWS Resources ##
The CloudFormation script (template.yaml) will deploy a handful of serverless resources to your AWS account:
* **1 x Public API** (API Gateway)
* **1 x NoSQL Table** (DynamoDB)
* **4 x CRUD Functions** (Lambda)
* **4 x Roles with Policies** (IAM)

## Prerequisites ##
In order to properly run and deploy this app, you must perform the following
1. [Setup an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
2. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
3. [Configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) to use your account
4. [Setup an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html)
5. [Sign up](https://dash.geocod.io/register) for a free Geocodio api key
6. [Install Git](https://git-scm.com/downloads)

## Setup ##
1. Clone the repository to your local machine
2. In the **template.yaml** file, change REPLACE_ME with your Geocodio api key
3. In the root **package.json**, change REPLACE_ME with the name of your S3 bucket

## Deployment ##
You are able to deploy the solution any way you'd like, but included in the root package.json is a script that will automatically build, package, and deploy the solution to AWS for you. Just run the following command to deploy
```
npm run deploy
```
[1.1]: http://i.imgur.com/tXSoThF.png
[2.1]: http://i.imgur.com/0o48UoR.png
[3.1]: http://i.imgur.com/lGwB1Hk.png
[4.1]: http://i.imgur.com/BrJQF7t.png

[1]: http://www.twitter.com/allenheltondev
[2]: http://www.github.com/allenheltondev
[3]: https://www.linkedin.com/in/allen-helton-85aa9650/
[4]: https://medium.com/@allen.helton
