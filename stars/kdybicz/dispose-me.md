---
repo: kdybicz/dispose-me
url: 'https://github.com/kdybicz/dispose-me'
homepage: ''
starredAt: '2024-08-01T18:41:02Z'
createdAt: '2020-11-14T12:28:14Z'
updatedAt: '2024-11-07T14:00:49Z'
language: TypeScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:27.696Z'
description: Dispose Me is a simple AWS-hosted disposable email service.
tags:
  - aws
  - disposable-email
  - ejs
  - emails
  - expressjs
  - serverless
---

# Dispose Me

Dispose Me is a simple AWS-hosted disposable email service.


## TL;DR

1. Own a Route53-manageable domain with in a Region supporting SES incoming
   emails.
2. Create a project-dedicated AWS user for project deployment (optional).
3. Download the code, create and fill out `.env` file - based on
   `.env.example`.
4. Run `yarn deploy` to install dependencies, run tests, and deploy the stack.
5. Have fun!


## Tech Stack

### Frameworks

- [Node.js](https://github.com/nodejs/node)
- [express.js](https://github.com/expressjs/express)
- [EJS](https://github.com/mde/ejs)
- [AWS CDK](https://aws.amazon.com/cdk/)
- [AWS SAM](https://aws.amazon.com/serverless/sam/)
- [webpack](https://github.com/webpack/webpack)

### AWS Services

- Api Gateway
- CloudFormation
- Lambda with custom Authorizer
- Route53
- Simple Email Service
- Simple Storage Service


## Setup process

### Environment

First, make sure you have [Node.js installed](https://nodejs.org/en/download/
package-manager/) in version v20.x or above.

You can easily verify the installed Node.js version by running:

```
$ node -v
v20.17.0
```

Additionally, you will need the latest version of [AWS CDK](https://aws.amazon.com/cdk/)
and [AWS SAM](https://aws.amazon.com/serverless/sam/).

You can verify if they are installed by running:

```
$ cdk --version
2.158.0 (build 4b8714d)

$ sam --version
SAM CLI, version 1.122.0
```

### Getting the project

Download the project source code using `git`:

```
$ git clone https://github.com/kdybicz/dispose-me.git
```

Or download as a `zip` file from https://github.com/kdybicz/dispose-me/archive/
master.zip and unpack it into a folder of your choosing.

Next, run `yarn` to install all required dependencies:

```
$ cd dispose-me
$ yarn
```

Optionally, run the tests to ensure the code is running properly:

```
$ yarn test
```

### AWS user

**Note:** Next steps assume you already have an AWS account and you're logged
into the AWS Console!

It's a good practice to use a dedicated user for each AWS project. This makes
it easier to control which projects use what permissions.

Create a new user with Programmatic access only by going to:

https://console.aws.amazon.com/iam/home?#/users$new?step=details

Select _Attach policies directly_ in the _Set permissions_ section, click
_Create policy_, change the editor to _JSON_, and paste the policy below. Then
proceed to finalize the user creation.

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"cloudformation:*",
				"ecr:*",
				"ssm:*",
				"s3:*",
				"iam:*",
				"route53:*"
			],
			"Resource": "*"
		}
	]
}
```

**Note:** At the last step, you will receive user credentials. Be sure to copy
them and use them to set up AWS CLI access to your account. Follow the guide
here: https://docs.aws.amazon.com/cli/latest/userguide/cli-authentication-user.html

### Setup a Domain

To use Simple Email Service, you need to associate a domain with your AWS
account. This means using Route53 to:

- Buy a domain: https://console.aws.amazon.com/route53/home#DomainRegistration
- Or transfer an existing domain: https://console.aws.amazon.com/route53/home#DomainTransfer

**Note:** Domains are not free. Choose one that's affordable to buy and
maintain, like `.de` or `.uk`. For domain prices, refer to
https://aws.amazon.com/route53/pricing/

### Choose the Region

Select a region that supports receiving emails via SES:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/regions.html#region-receive-email


**Note:** This region will be used in the next steps and also during code
deployment. This will be referred to as the **Region** in the documentation.

### Deploy

Refer to the `.env.example` file and create your own `.env` file. Use the
comments inside for guidance. Once done, deploy the code to AWS by running:

```
$ yarn deploy
```

To get the API access key, go to the _API Gateway_ section of the AWS Console
and check _API keys_.

**Note:** If you encounter any issues, raise an Issue with steps taken and
error messages.

### Time for tests

Go to: https://DOMAIN_NAME/?x-api-key=ACCESS_TOKEN

**Note:** You can also send the `ACCESS_TOKEN` in the `x-api-key` request
Header.


## Opening to public

Some of you may want to open the service to the public. While this seems like
a great idea, be aware of the risks involved. Ensure you know what you're
doing! I'm not a security expert, but I can share suggestions left by @shokinn.

### The Suggestion

Certain email addresses have more power than others, like how an administrator
account on a computer is more powerful than a regular user. It's crucial not
to open those addresses to the public, as someone could impersonate you,
potentially leading to missed warnings or losing the domain.

Here is a list of such inbox names, also restricted in
[Google Services](https://support.google.com/a/answer/6093413?hl=en). This list
is based on [RFC 2142](https://www.ietf.org/rfc/rfc2142.txt) with some
additions.

### Setting it up

To open the service to the public, copy and uncomment two lines of code from
the `.env.example`:

```
PRIVATE_ACCESS=false

INBOX_BLACKLIST=hostmaster,postmaster,webmaster,admin,administrator,abuse,root,ssl-admin,majordomo
```

**Note:** Do not ignore the importance of `INBOX_BLACKLIST`.

Redeploy the service, and you're done.

### Beyond the bare minimum

You can further ensure that any emails sent to these powerful email addresses
are never processed by Lambda. This prevents anyone from bypassing the
blacklist and reading emails from these inboxes.

The current setup automatically creates a rule that stops processing any
emails matching the `INBOX_BLACKLIST`. By default, the list will look like:

- hostmaster@`DOMAIN_NAME`
- postmaster@`DOMAIN_NAME`
- webmaster@`DOMAIN_NAME`
- admin@`DOMAIN_NAME`
- administrator@`DOMAIN_NAME`
- abuse@`DOMAIN_NAME`
- root@`DOMAIN_NAME`
- ssl-admin@`DOMAIN_NAME`
- majordomo@`DOMAIN_NAME`

Here you can find more details:
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-action-stop.html


## Costs simulation

> This is an example of potential costs. It's an estimate, not verified by
> long-term usage, and may vary depending on your case. **BE WARNED**.

- `.de` domain: $9.00 per year
- Hosted Zones and Records: $0.50 per hosted zone / month
- Public SSL Certificate: Free via AWS Certificate Manager
- Simple Email Service:
  - Free Tier: $0 for the first 1,000 emails you receive, $0.10 per additional
    1,000 emails.
  - Later: $0.09 per 1,000 incoming email chunks (see
	  [Pricing details](https://aws.amazon.com/ses/pricing/#Pricing_details)).
- Simple Storage Service:
  - Storage: $0.023 per GB for the first 50 TB / Month.
  - Requests & data retrievals:
    - PUT, COPY, POST, LIST requests (per 1,000): $0.005
    - GET, SELECT, and others (per 1,000): $0.0004
  - Data Transfer: 1 GB / Month - $0.00 per GB
- Lambda 512MB: $0.0000008333 per 100ms

**Example for Small Scale Usage on Free Tier**:

- Domain + Hosted Zone: $9.00/year + $0.25 * 12 months = $12.00/year
- Incoming emails (1,000/month): (12 - 1) * $0.10 = $1.10
- Average Lambda processing time (300ms): 12,000 emails * (300 ms / 100 ms) *
  $0.0000008333 = $0.03
- Average 300ms API Lambda time per request (5x more requests than emails):
  $0.03 * 5 = $0.15
- S3 operations (assuming plain text/html emails, 84,000 requests): 84,000 /
  1,000 * $0.005 = $0.42

**Total**: ~$15.00 + TAX per year
