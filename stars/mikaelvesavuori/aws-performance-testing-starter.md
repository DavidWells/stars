---
repo: mikaelvesavuori/aws-performance-testing-starter
url: 'https://github.com/mikaelvesavuori/aws-performance-testing-starter'
homepage: ''
starredAt: '2025-01-14T07:59:18Z'
createdAt: '2023-12-03T16:17:41Z'
updatedAt: '2025-01-14T07:59:18Z'
language: Shell
license: NA
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.445Z'
description: This is a basic starting point for conducting performance testing on AWS.
tags:
  - aws
  - aws-testing
  - k6
  - load-testing
  - performance-testing
  - testing
---

# AWS performance testing starter: EC2, Fargate, Lambda

This is a basic starting point for conducting performance testing on AWS, for the compute services EC2, Fargate, and Lambda. The provided application is a small "Hello world" application written in Node (running on Fastify).

Tests are conducted using [k6](https://k6.io). They come configured for 500 virtual users, hitting an endpoint for 30 seconds. The test also checks to ensure that >99% of all hits are successes and that the p95 duration is under 200ms.

For the Lambda solution, there is full deployment automation in place using [Serverless Framework](https://www.serverless.com). For EC2 and Fargate, there are steps and scripts provided for provisioning the infrastructure and building and pushing the container image that will be used.

## Prerequisites

- Recent [Node.js](https://nodejs.org/en/) (ideally 18+) installed.
- Amazon Web Services (AWS) account with sufficient permissions so that you can deploy the necessary infrastructure.
- For the Lambda part, ideally some experience with [Serverless Framework](https://www.serverless.com) as that's what we will use to deploy the service and infrastructure.

## Installation

Clone, fork, or download the repo as you normally would. Run `npm install`.

## Configuration

Make sure to check these files out and change them if their use applies to your use case.

- `scripts/push.sh`
- `scripts/ssh.sh`
- `serverless.yml`

Once you have deployed some testing application(s), update the endpoints in `scripts/test.js`.

## Commands

- `npm run setup`: Install [k6](https://k6.io) and [Podman](https://podman.io) (assumes Mac)
- `npm test`: Run the k6 load test
- `npm start`: Run the Lambda application locally
- `npm start:server`: Run the containerized application locally
- `npm run build`: Package Lambda stack with Serverless Framework
- `npm run build:image`: Use Podman to build the image
- `npm run push`: Use Podman to build and push image to AWS ECR
- `npm run deploy`: Deploy Lambda stack to AWS with Serverless Framework
- `npm run teardown`: Remove Lambda stack from AWS

## Setup

### EC2

There is no automation provided beyond the scripts. Instead, follow the web console wizard and the below general steps.

_Note that the described setup is not strictly equal to, for example, the Lambda setup unless you add (for example) HTTPS._

Basic instructions:

- Use Arm architecture
- Use the Amazon Linux AMI
- Use the `t4g.micro` (or other configuration)
- Use open inbound HTTPS traffic for the test traffic
- Allow SSH traffic from your IP so you can connect to the instance
- Add port 8080 (or whatever you are using) to the open/allowed ports in the security group
- Download the key pair so you can connect to the instance
- Connect to the instance; get the connection information in the EC2 instance view and update `scripts/ssh.sh` - run that script
- Inside the instance, copy paste the contents of `scripts/ec2-setup.sh`, it should end with the server being in a running state
- Find the public DNS address for the instance in the EC2 console
- You can now curl it, similar to `curl ec2-{RANDOM}.{REGION}.compute.amazonaws.com:8080`

### Fargate

There is no automation provided beyond the scripts. Instead, follow the web console wizard and the below general steps.

You may want to [follow this guide if you want a guided tour](https://www.youtube.com/watch?v=WsvuIxaCQGg) of the overall steps.

_Note that the described setup is not strictly equal to, for example, the Lambda setup unless you add (for example) HTTPS._

Basic instructions:

- Create a task definition
  - Use Arm architecture
  - Set the configuration as desired
  - Point it to your ECR image
  - No need to fiddle with roles or other things if you don't want to
- Create a cluster
  - Point to the task definition
- Create a service in the cluster
  - Most of this should be simple
  - Add load balancers if desired
  - Add service scaling if desired
- Start the task
  - Once it has started, click the task to get the public IP

## Lambda

Simply run `npm run deploy` (after having installed dependencies and being logged in through the CLI environment).

You'll get an endpoint you can use.

There are some configuration options in the `serverless.yml` if you want to set it up in other ways than the provided one.
