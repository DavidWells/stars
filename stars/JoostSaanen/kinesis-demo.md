---
repo: JoostSaanen/kinesis-demo
url: 'https://github.com/JoostSaanen/kinesis-demo'
homepage: null
starredAt: '2020-03-25T06:37:25Z'
createdAt: '2018-06-03T12:01:26Z'
updatedAt: '2023-11-20T22:39:04Z'
language: Ruby
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:00.945Z'
description: null
tags: []
---

# Kinesis Demo


## AWS Infrastructure
You can install the AWS components, by simply running the following command:

```
aws cloudformation create-stack --template-body file://kinesis-demo.yaml --stack-name kinesis-demo --parameters ParameterKey=BucketName,ParameterValue=<unique_bucket_name> --capabilities CAPABILITY_NAMED_IAM
```

## Middleman project
Middleman is a static site generator using all the shortcuts and tools in modern web development. For deploying the Kinesis-demo website, run:

```
bundle exec middleman build
aws s3 sync build s3://<unique_bucket_name> --acl public-read --cache-control "public, max-age=86400"
```
