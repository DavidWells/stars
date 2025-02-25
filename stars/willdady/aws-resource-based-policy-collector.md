---
repo: willdady/aws-resource-based-policy-collector
url: 'https://github.com/willdady/aws-resource-based-policy-collector'
homepage: ''
starredAt: '2022-06-07T18:32:49Z'
createdAt: '2022-04-08T04:42:02Z'
updatedAt: '2024-04-02T14:04:47Z'
language: TypeScript
license: MIT
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:44.750Z'
description: Utility for collecting resource-based policies from AWS
tags: []
---

# AWS resource-based policy collector

This library aims to collect resource-based policies from an AWS account.

## Install

```bash
yarn add aws-resource-based-policy-collector
```
or
```bash
npm install aws-resource-based-policy-collector
```

## Motivation

When removing an account from an AWS organisation special attention must be paid to resource-based policies. Specifically, the presence of the [aws:PrincipalOrgID](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html#condition-keys-principalorgid) condition key will cause access issues once the account leaves it's parent organisation.

This library simply collects resources and their associated policies in an unopinionated manner. The actual analysis of the output is left to the consumers of this library.

## Usage

Your environment must be configured with valid AWS credentials. See [Setting credentials in Node.js][credentials]. Your credentials must be authorised to perform read-only actions within your account. This can be achieved simply by creating a role in your account with the AWS managed `ReadOnlyAccess` policy. Naturally, your account must also not have read actions restricted by any service control policies in your organisation hierarchy.

```typescript

import { collect } from 'aws-resource-based-policy-collector';

const main = async () => {
  const result = await collect();
  // ... Do something with result
};

main();
```

The AWS region defaults to that of your credentials however you may optionally set this explicitly.

```typescript
const result = await collect({ region: 'us-east-1' });
```

The `collect` function returns an array of objects per-service where each service object contains an array of `resource` objects. The service object may also contain an optional `error` field if there was an issue listing resources. This typically ocurrs if your credentials do not have the required permissions to read the resources (or is blocked by an SCP).

Each resource object contains a `type` and `id` to uniquly identify the resource as well as a JSON encoded `policy`. The resource may also contain an optional `error` field if there was an issue querying the resource or it's policy.

```typescript
[
  {
    serviceName: 's3',
    resources: [
      {
        type: 'AWS::S3::Bucket',
        id: 'my-bucket',
        policy: '', // Policy document
        error: '', // Only present if an error ocurred
      }
    ],
    error: '', // Only present if an error ocurred
  },
  ...
]
```

Only resources with policies or errors are included.

## Supported services

This library currently collects resource-based policies for AWS services listed below. 

This list of services is taken from the tables found at [AWS services that work with IAM][services], specifically those services with a **Yes** or **Partial** in the **Resource-based policies** column.

- [x]  Lambda
- [x]  Serverless Application Repository
- [x]  ECR
- [x]  AWS Backup
- [x]  EFS
- [x]  S3 Glacier
- [x]  S3
- [ ]  S3 on AWS Outposts
- [ ]  Cloud9
- [x]  CodeArtifact
- [x]  CodeBuild
- [x]  IAM
- [x]  SecretsManager
- [x]  ACM Private Certificate Authority
- [x]  KMS
- [ ]  Lex v2
- [x]  CloudWatch Logs
- [ ]  Systems Manager Incident Manager
- [ ]  Systems Manager Incident Manager Contacts
- [x]  API Gateway
- [x]  VPC (endpoints)
- [x]  Elemental MediaStore
- [x]  OpenSearch
- [x]  Glue
- [x]  EventBridge
- [x]  EventBridge Schemas
- [x]  SNS
- [x]  SQS
- [x]  IoT
- [ ]  SES v2

## Other services

### AWS RAM

AWS RAM does not support resource-based policies however it is included as it is likely of interest as resources may be shared with the parent organisation.

Note the `policy` field for this resource type is NOT a JSON policy rather it is an `arn` of the principal the resource is shared with.

## Troubleshooting

### Access denied on S3 buckets

If you are getting `AccessDenied` errors on S3 bucket resources your bucket likely has a bucket policy preventing access. Remove the bucket policy or modify it to grant read access to your role.

[services]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-services-that-work-with-iam.html
[credentials]: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html
