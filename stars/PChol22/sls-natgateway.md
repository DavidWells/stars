---
repo: PChol22/sls-natgateway
url: 'https://github.com/PChol22/sls-natgateway'
homepage: ''
starredAt: '2024-08-30T01:40:17Z'
createdAt: '2023-07-14T23:37:27Z'
updatedAt: '2024-08-30T01:40:18Z'
language: JavaScript
license: NA
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:24.511Z'
description: >-
  A "free" serverless alternative to AWS NAT Gateways. Still WIP ⚙️, help
  welcome!
tags:
  - aws
  - cdk
  - free
  - nat-gateway
  - serverless
  - typescript
---

# sls-natgateway

## Why and what?

### The problem with NAT Gateways

I am software engineer and I love doing serverless on AWS 🌸.

One day I had to access a resource residing inside a private VPC subnet from a Lambda function. The plan was simple: place the Lambda function inside the same subnet. 💪

_PROBLEM:_ the subnet was private, so the Lambda function could not access the internet anymore. 😭

_SOLUTION:_ I placed a NAT Gateway inside the subnet. 💪

**BIG PROBLEM:** NAT gateways are f\*cking expensive, and are not serverless at all. 💀

At this point, I started thinking, and found a loophole: VPC Gateway Endpoints! These are FREE and SERVERLESS endpoints that allow resources inside private VPCs to access S3 and DynamoDB without going through a NAT Gateway. 🎉

This only solves issues when trying to access S3 or DynamoDB, but you see me coming, with a little tweaking, you can use execute any HTTP request from the private subnet. 🧠

### The serverless alternative

Meet my "genius solution": sls-natgateway. 🤪

![sls-natgateway schema](./docs/schema.png 'sls-natgateway schema')

sls-natgateway is a set of 2 npm packages:

- 1️⃣ `@sls-natgateway/construct`: a CDK construct that provisions a S3 Bucket and a Lambda function able to execute HTTP requests. Everytime an object `{id}/request.json` is created in the bucket, the Lambda function will execute the HTTP request described in the JSON file and store the response in `{id}/response.json`.

- 2️⃣ `@sls-natgateway/sdk`: a single TS function that replaces `fetch`. It's simple: it creates a `{id}/request.json` file in the S3 bucket, waits for the `{id}/response.json` file to be created, and returns the response.

## How to use?

### 1️⃣ Add a S3 Gateway Endpoint to your VPC

First, you need to add a S3 Gateway Endpoint to your VPC. This lib does not do it for you. Here is a code example using AWS CDK:

```typescript
const SUBNET_GROUP_NAME = 'private-subnet-group';

const vpc = new cdk.aws_ec2.Vpc(this, 'Vpc', {
  subnetConfiguration: [
    {
      name: SUBNET_GROUP_NAME,
      subnetType: cdk.aws_ec2.SubnetType.PRIVATE_ISOLATED,
    },
  ],
  gatewayEndpoints: {
    S3: {
      service: cdk.aws_ec2.GatewayVpcEndpointAwsService.S3,
      subnets: [
        {
          subnetGroupName: SUBNET_GROUP_NAME,
        },
      ],
    },
  },
});
```

### 2️⃣ Add the sls-natgateway construct to your CDK stack

Very simple:

```typescript
import { SlsNatGatewayConstruct } from '@sls-natgateway/construct';

const { bucket } = new SlsNatGatewayConstruct(this, 'SlsNatConstruct');
```

Do not forget to grant access to the bucket to the Lambda living in your private subnet, and to pass it the bucket name as an environment variable.

```typescript
const privateLambda = new cdk.aws_lambda_nodejs.NodejsFunction(
  this,
  'PrivateLambda',
  {
    entry: path.join(__dirname, 'private-lambda', 'handler.ts'),
    handler: 'handler',
    vpc,
    vpcSubnets: {
      subnetGroupName: SUBNET_GROUP_NAME,
    },
    securityGroups: [
      new cdk.aws_ec2.SecurityGroup(this, 'PrivateLambdaSecurityGroup', {
        vpc,
        allowAllOutbound: true,
      }),
    ],
    environment: {
      BUCKET_NAME: bucket.bucketName,
    },
    timeout: cdk.Duration.seconds(15),
  },
);

bucket.grantReadWrite(privateLambda);
```

### 3️⃣ Use the sls-natgateway SDK in your private Lambda

The code speaks for itself:

```typescript
import { S3Client } from '@aws-sdk/client-s3';
import { getNatFetchRequest } from '@sls-natgateway/sdk';

const client = new S3Client({});
const bucketName = process.env.BUCKET_NAME;

if (bucketName === undefined) {
  throw new Error('BUCKET_NAME is not defined');
}

const natFetch = getNatFetchRequest(bucketName, client);

export const handler = async (event: { pokemon: string }): Promise<void> => {
  const { body, status } = await natFetch(
    `https://pokeapi.co/api/v2/pokemon/${event.pokemon}`,
    {
      method: 'GET',
    },
  );

  console.log(status, body);
};
```

## Caveats

- This library only supports requests to HTTP endpoints.
- This library only supports JSON payloads for now (contributions welcome!)
- Usual response delay is increased by around 2 seconds, which can increase compute costs.

_I am not sure this is a good idea, but I had fun doing it. 🤷‍♂️ **It's 100% not production ready**, but I would love to hear your feedback, and get your help to make it better!_

## Thanks

The project template was generated using [Swarmion](https://github.com/swarmion/swarmion). Go check them out they are great!
