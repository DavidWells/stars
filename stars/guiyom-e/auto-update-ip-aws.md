---
repo: guiyom-e/auto-update-ip-aws
url: 'https://github.com/guiyom-e/auto-update-ip-aws'
homepage: ''
starredAt: '2024-08-30T03:14:47Z'
createdAt: '2024-01-18T12:42:17Z'
updatedAt: '2024-08-30T03:14:47Z'
language: TypeScript
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:24.142Z'
description: >-
  CDK stack and scripts to make a free dynDNS with AWS Route 53 and serverless
  resources
tags:
  - aws
  - cdk-construct
  - dns
  - dyndns
  - nas
  - route53
---

# Auto-update A record with latest IP

> 🎉 No more use a costly dynDNS service to update DNS when your IP changes!

[![CI](https://github.com/guiyom-e/auto-update-ip-aws/actions/workflows/ci.yml/badge.svg)](https://github.com/guiyom-e/auto-update-ip-aws/actions/workflows/ci.yml)

This repo rely on an AWS CDK stack to update your A record in Amazon Route 53 with an API endpoint. It also provides a script to automatically call this API whenever your IP changes.

Suppose you host your own NAS server and want to access it at `my-server.com` you have bought on [AWS](https://aws.amazon.com/getting-started/hands-on/get-a-domain/). You need to add a A record to make `my-server.com` point to your server public IP. In general, if you rely on an Internet provider to get an IP, you are not guaranteed to have a one static, even if in practice they don't often change (at router reboot for instance). If you want to keep your A record up-to-date when your dynamic IP changes, this project is made for you!

... and it is [(almost) free](#🤑-estimated-cost)!

![Architecture](docs/assets/architecture.png)

## ▶️ Get started

### Prerequisites

- [`Node.js`](https://nodejs.org/en/download)
- An AWS account and credentials (to deploy the CDK stack)
- An hosted zone in AWS Route53, i.e. a domain that you want to point to your own server IP.

### Installation

1. Install the project

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and fill the values

   ```sh
   cp .env.example .env
   ```

   - `REGION`: AWS region to deploy your stack
   - `DOMAIN_NAME`: name (subdomain.domain.extension) of the A record you want to keep updated
   - `HOSTED_ZONE_ID`: Id of the hosted zone you own
   - `FETCH_IP_API_PATH`: Path of the API to get your current public IP on Internet. Must start with "/".
   - `API_INTEGRATION_PATH`: Path of the API to update the A record. Must start with "/".

3. Deploy your stack

   ```sh
   npm run deploy
   ```

   > If you need to use an AWS profile, you can run `AWS_PROFILE=my-profile npm run deploy` instead.

   At the end, you are asked if you want to add a cron job to automatically call the API to update your IP. Answer yes only if you are deploying from the server which will need the update.

4. Make it work!

   If you are not deploying from your server, you will need to:

   - copy the folder `scripts/domain-auto-update` (scripts and `*.cfg` files) to the target server
   - create a cron job to run the script regularly, for instance, once per hour:
     `0 * * * * /home/my-user/domain-auto-update/update-ip.sh`

     ⚠️ NB: this means that if your IP changes, you will need to wait one hour to get back to your website. Feel free to increase the frequency depending on your needs!

5. Make it more secure!

   - The API key stored in an unencrypted file. Consider using a password manager, or at least encrypt your session data.
   - The APIs are public and unauthenticated (only with an API key for integration API). Consider adding authentication.
   - To avoid brute-force or deny-of-wallet attacks, you can choose an API path difficult to guess or even setup a WAF.

## 🎛️ Advanced configuration

### CDK stack props

You can edit the stack props in [`bin/auto-update-ip-aws.ts`](./bin/auto-update-ip-aws.ts):

- `fetchIpApi` (defined by default): if not defined, you will need to call a third party API to get your IP address, like https://api.ipify.org?format=json or https://ipinfo.io/ip.
- `apiIntegration` (defined by default): if not defined, you will need to call the state machine directly through the AWS API. But in this case, it is simpler to call the route53 API directly!
- `user` (not defined by default): if defined, it will create an IAM user allowed to start the state machine synchronously. Not recommended.

Want more options? Feel free to contribute!

### Script `deploy.sh`

The script `deploy.sh` does multiple steps:

1. Deploy the CloudFormation stack with AWS CDK
2. Store the outputs to `.cfg` files in `scripts/domain-auto-update` folder
3. Create a cron job (ask user confirmation) to run `domain-auto-update/update-ip.sh` once a day at 1 am.

### Script `domain-auto-update/update-ip.sh`

The script `update-ip.sh` does multiple steps:

1. Fetch the current IP address (rely on the url in `get_current_ip_api_url.cfg` file)
2. Compare it to the latest one stored locally in `current_ip` file
3. If it has changed, call the API to update the A record in Route 53 (rely on the url in `update_ip_api_url.cfg` file and the API key in `api_key.cfg`)

In case of error when calling the update ip API, the error is kept in a dedicated log file. Keep in mind to delete these error files to avoid to saturate the server.

### General commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template

## 🤑 Estimated cost

The deployed stack uses AWS resources at really low cost, supposing the [script](./scripts/domain-auto-update/update-ip.sh) is run every hour and the IP changes every day:

Check the IP (every hour)

- *API Gateway V2*: ~ $0.00083 = 31 days x 24h x 1.11/million requests. NB: free tier the first year
- _Lambda_: ~ \$0.00126 / month = 31 days x 24h x 1000 milliseconds x $0.0000000017 (architecture ARM, memory: 128 MB, region eu-west-1, Jan. 2024)

Update the IP (every day)

- _Step Functions_: ~ \$0.033 / month = 31 days x (\$0.000001 (price per request, Jan. 2024) + 1000 milliseconds x 64 MB x \$0.00001667 )
- _CloudWatch_: Free tier = 6 months x 31 days x (2 kB (Step Functions) + 500 B (Lambda)) = 0.5 MB < 5 GB of free tier
- _API Gateway V1_: ~ \$0.00003 = 31 x 3.50/million requests. NB: free tier the first year
- _Route 53_ : ~ \$0.00001 / month = 31 queries x $0.40 per million queries
- _CloudFormation_ : free
- _IAM_: free

=> TOTAL: < 0.5$ per year!

> NB: you need to add the domain name cost (~\$12 per year (depending on the name chosen) + $0.50 per hosted zone per month).
