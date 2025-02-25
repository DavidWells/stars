---
repo: willdady/cdk-iam-credentials-rotator
url: 'https://github.com/willdady/cdk-iam-credentials-rotator'
homepage: ''
starredAt: '2022-03-22T00:40:44Z'
createdAt: '2022-03-20T06:33:13Z'
updatedAt: '2024-02-13T14:27:12Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:55.911Z'
description: >-
  AWS CDK construct for rotating IAM user credentials and sending to a third
  party
tags:
  - aws
  - cdk
  - cdk-construct
  - iam
  - serverless
---

# IAM Credentials Rotator

AWS CDK construct for rotating IAM user credentials and sending to a third party.

## Usage

Simply provide a list of user objects where each object contains a `username` of an IAM user which exists in the target account.

```typescript
const myCredentialsHandler = new lambda.Function(this, 'MyCredentialsHandler', {
  handler: 'index.handler',
  code: lambda.Code.fromAsset('path/to/your/code'),
  runtime: lambda.Runtime.NODEJS_14_X,
});

new IamCredentialsRotator(this, 'MyCredentialsRotator', {
  users: [
    { username: 'homer' }, 
    { username: 'marge' }, 
    { username: 'bart' }, 
    { username: 'lisa' }, 
    { username: 'maggie' }
  ],
  credentialsHandler: myCredentialsHandler,
});
```

Each user object supports an optional `metadata` key which can contain arbitrary string data. Do not store large or sensitive values in `metadata`. The `users` array is stored in a single AWS Parameter Store parameter which has a maximum size limit of 4KB.

The Lambda function, `credentialsHandler`, is called immediately after a new access key is created for a user. The newly created credentials must be retrieved from AWS Secrets Manager using `secretName` included in the function's event. 

By default, credentials are rotated once an hour. This can be changed by providing `scheduleDuration` in the constructor.

Below is a minimal boilerplate for your handler function.

```typescript
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const secretsManagerClient = new SecretsManagerClient({});

interface Event {
  username: string;
  secretName: string;
  metadata?: string;
}

export async function handler(event: Event) {
  const { username, secretName } = event;
  const getSecretResponse = await secretsManagerClient.send(
    new GetSecretValueCommand({ SecretId: secretName }),
  );
  const { AccessKeyId, SecretAccessKey }: { [key: string]: string } =
    JSON.parse(getSecretResponse.SecretString || '');

  // Do something with AccessKeyId and SecretAccessKey here e.g. send to a trusted third-party
}
```

Once your function exits the underlying AWS Step Functions workflow will wait a period of time before deleting the old credentials. During this period both the old and new credentials for the user exist. At the end of this period the old credentials are deleted.

The amount of time to wait before deleting old credentials defaults to 5 minutes and can be adjusted by setting `cleanupWaitDuration`. This value MUST be less-than `scheduleDuration`.

## Architecture

![Architecture diagram](images/diagram.png)
