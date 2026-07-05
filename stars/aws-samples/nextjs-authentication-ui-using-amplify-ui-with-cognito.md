---
repo: aws-samples/nextjs-authentication-ui-using-amplify-ui-with-cognito
url: >-
  https://github.com/aws-samples/nextjs-authentication-ui-using-amplify-ui-with-cognito
homepage: ''
starredAt: '2022-03-11T04:19:44Z'
createdAt: '2022-03-10T06:14:41Z'
updatedAt: '2025-02-25T02:13:20Z'
language: TypeScript
license: MIT-0
branch: main
stars: 17
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:01.066Z'
description: >-
  This project will show developers a minimal way to build an Authentication UI
  using Amplify UI Components and Cognito in the Next.js.
tags:
  - amplify
  - aws
  - cdk
  - cdk-examples
  - cognito
  - lambda
  - react
  - typescript
---

# Next.js Authentication UI using Amplify UI Components with Cognito

```bash
npm ci && cd app && npm ci && cd ..
npm run build

npx cdk bootstrap
npx cdk deploy AllInOneStack
```

| Page      |                                                           |
| --------- | --------------------------------------------------------- |
| `/`       | Public page that anyone can access                        |
| `/admin`  | Require auth, unauthenticated users redirect to `/signin` |
| `/signin` | Authentication UI, return to `/admin` after auth          |

## This is Server-side Rendering?

No, this sample is a Single Page Application, generated with `next export`. The routing issue when using `next export` and S3 together is solved by [CloudFront Functions](cloudfrontfunction/rewrite.js) to rewrite the path.

## Deploy CDK stacks

### Deploy frontend and backend all at once

This sample requires the frontend resource to refer Cognito resource built as a backend resource, but the AllInOneStack deploys frontend and backend resources all at once.

#### Problem of deploying all at once

There is no need to set backend resource information as environment variables on the frontend since they can be deployed all at once. On the other hand, since it is necessary to fetch and render information of backend resources from S3, that logic and loading component are required and readability may be reduced.

#### How to deploy all at once

Buit the frontend and deploy CDK stack without configuration Amplify such as Cognito User Pool ID. The CDK stack exports CDK deploy-time values such as Cognito User Pool ID to S3 using [aws_s3_deployment module](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3_deployment-readme.html#data-with-deploy-time-values). During rendering, frontend fetches those resource information from S3 and configures them to Amplify.

### Deploy frontend and backend stacks separetly

This sample also contains frontend and backend stack separately.

#### How to deploy separetly

When splitting stacks between frontend and backend, frontend stack needs to refer to resources such as Cognito in backend stack. Also, since the `aws_s3_deployment.Source.jsonData` method does not support cross-stack references by `Fn::ImportValue`, it is necessary to use reference by `Ref` or `Fn:GetAtt`. Therefore, if the stack is separated, it can be solved by using `RemoteOutputs` of [cdk-remote-stack](https://constructs.dev/packages/cdk-remote-stack/v/2.0.8?lang=typescript).

#### Command to deploy separetly

```bash
npx cdk deploy BackendStack
npx cdk deploy FrontendStack
```

## Run local dev server

```bash
## Create `./app/.env.development.local` and add Cognito UserPoolId and WebClientId. Refer to the following
cat ./app/.env.development.local
NEXT_PUBLIC_AUTH_USER_POOL_ID=ap-northeast-1_xxxxxxxxxxxx
NEXT_PUBLIC_AUTH_WEB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx

cd app
npm run dev
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
