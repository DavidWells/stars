---
repo: cremich/cdk-bill-bot
url: 'https://github.com/cremich/cdk-bill-bot'
homepage: null
starredAt: '2024-12-31T07:11:33Z'
createdAt: '2022-06-20T19:01:55Z'
updatedAt: '2025-01-18T16:06:05Z'
language: TypeScript
license: Apache-2.0
branch: main
stars: 491
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:34.385Z'
description: The serverless cost optimization bot
tags: []
---

# 👋 Welcome to Bill - the cost optimization bot

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](./CODE_OF_CONDUCT.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?)](https://github.com/prettier/prettier)
[![release](https://github.com/cremich/cdk-bill-bot/actions/workflows/release.yml/badge.svg)](https://github.com/cremich/cdk-bill-bot/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/cremich/cdk-bill-bot/branch/main/graph/badge.svg?token=VFbFQQY6Qh)](https://codecov.io/gh/cremich/cdk-bill-bot)
[![npm version](https://badge.fury.io/js/@cremich%2Fcdk-bill-bot.svg)](https://badge.fury.io/js/@cremich%2Fcdk-bill-bot)
![EXPERIMENTAL](https://img.shields.io/badge/stability-experimental-orange)

This Construct Library provides L2 and L3 constructs for resources to build AWS Cost and Usage reports using the AWS Cloud Development Kit (CDK).

---

**☝️ Important: Bill uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied.**

---

## 🤖 About Bill

Bill enables AWS customers to proactively monitor their infrastructure costs and identify unforeseen expenses in a timely manner. Bill wants to prevent AWS customers from receiving bad surprises in their monthly bill. Therefore he addresses two primary problem areas:

1.  cost history is not monitored on a regular basis
2.  basic cost optimization best practices are not setup

Bill is a happy bot, if you...

- ...have more money in your pocket
- ...are enabled to monitor your spends proactively

### How does Bill help you?

By analyzing your cost and usage reports, Bill will inform you about your monthly costs on a daily basis. This way, AWS customers will always have an up-to-date snapshot of how their infrastructure costs are progressing. AWS customers can then take direct action in the event of increased costs to prevent unintended suprises in their bill.

In addition to the daily status report, Bill enables various best practices in the area of cost optimization so that you can reliably control your costs. For example, by setting up multi-level AWS budget notifications or enabling cost anomaly detection and notification once anomalies are detected.

### What are Cost and Usage reports?

The AWS Cost and Usage Reports (AWS CUR) contains the most comprehensive set of cost and usage data available. You can use Cost and Usage Reports to publish your AWS billing reports to an Amazon Simple Storage Service (Amazon S3) bucket that you own. You can receive reports that break down your costs by the hour, day, or month, by product or product resource, or by tags that you define yourself.

Source: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html

## 🧱 Features & Architecture

- 🪣 Setup cost and usage report exports to S3
- 🗃 Provide an AWS Glue based datacatalog to crawl and analyze your cost and usage reports
- 🧮 Daily Spends Digest analysis

![Architecture](./docs/bill.png)

## 📝 Setup requirements

- [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and log in.
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured
- [Git Installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [AWS Cloud Development Kit](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install) (AWS CDK) installed. This construct library requires the AWS CDK v2 (>= 2.1.0).
- [Slack Webhook](https://api.slack.com/messaging/webhooks) created. To speed up the process, Bill provides a [pre-configured app manifest](./docs/slack-app-manifest.yaml). Feel free to download and use it.

## 🚀 Getting started

### Installation

You can install Bill in two ways. Either using the CDK library package or by provisioning a default and pre-packaged Cloudformation template within your existing AWS accounts.

#### CDK Library for Typescript

Bill can be added into your existing Typescript based CDK applications. Simply include the `@cremich/cdk-bill-bot` as a dependency within your application using either NPM or Yarn:

```sh
npm install @cremich/cdk-bill-bot --save-dev
# or
yarn add @cremich/cdk-bill-bot --save-dev
```

#### Cloudformation template

If you want to try and checkout a default configuration of Bill, you can also launch the default Cloudformation template using the following launch button.

[![launch cloudformation template](./docs/cloudformation-launch-stack.png)](https://go.aws/3JaO2ig)

The template contains a default configuration containing:

- A CUR export to Amazon S3
- A CUR datacatalog to crawl your CUR using AWS Glue and analyze it via Amazon Athena
- A daily spends digest analysis workflow based on AWS Step Functions.

The only parameter that is needed to deploy the Cloudformation Stack, is a Slack Webhook URL where Bill sends the analysis results to. Please see the [Requirements](#📝-requirements) section for detailed instructions how to create a Slack Webhook.

**Limitations:** as [CUR resources are only supported in `us-east-1`](https://github.com/aws-cloudformation/cloudformation-coverage-roadmap/issues/1020), the default template can only be provisioned in this region. If you need more flexibility, we recommend to build your own AWS CDK application and use the individual constructs.

## 🎉 Usage

### Using the "Bill the bot" L3 construct

The fastest way to get started with Bill, is to use the L3 construct named `BillTheBot`. This construct creates a new bot configuration containing:

- A CUR export to Amazon S3
- A CUR datacatalog to crawl your CUR using AWS Glue and analyze it via Amazon Athena
- A daily spends digest analysis workflow based on AWS Step Functions.

```javascript
import { BillTheBot } from "@cremich/cdk-bill-bot";

new BillTheBot(stack, "bill-the-bot", {
  slackWebHookUrl: "https://hooks.slack.com/services/WORKSPACE/CHANNEL/secret",
});
```

The only property that is needed to use the construct, is a Slack Webhook URL where Bill sends the analysis results to. Please see the [Requirements](#📝-requirements) section for detailed instructions how to create a Slack Webhook.

**Limitations:** as [CUR resources are only supported in `us-east-1`](https://github.com/aws-cloudformation/cloudformation-coverage-roadmap/issues/1020), the `BillTheBot` construct can only be provisioned in this region. If you need more flexibility, we recommend to build your own AWS CDK application and use the individual constructs in different `Stacks` like described in the following section.

### Composing your own bot configuration

If you need more flexibility, feel free to use the individual constructs to create your own setup. A detailed description and documentation about the available constructs and their API can be found in the [API documentation](./API.md).

#### Setup Cost and usage report export to S3

In order to receive cost and usage reports, you must have an Amazon S3 bucket in your AWS account to receive and store your reports. When using the `CostAndUsageReport` construct, an Amazon S3 Bucket is implicitly created for you.

> ⚠️ Please keep in mind, that cost and usage reports are only supported in `us-east-1`. The implicit created Bucket will then also be created in `us-east-1` and defaults to the current stack's region.

```javascript
import { CostAndUsageReport } from "@cremich/cdk-bill-bot";

new CostAndUsageReport(this, "cur", {
  compression: Compression.PARQUET,
  format: Format.PARQUET,
  timeUnit: TimeUnit.DAILY,
});
```

If you want to provision a custom Amazon S3 bucket, you can use the `CURBucket` construct and provide a reference to this bucket to the `CUR` construct. This gives you the flexibility, to provision the Amazon S3 bucket in another region while keeping the report provisioned in `us-east-1`

```javascript
import { CostAndUsageReport, CURBucket } from "@cremich/cdk-bill-bot";

const curBucket = new CURBucket(this, "bucket");

new CostAndUsageReport(this, "cur", {
  bucket: curBucket,
  compression: Compression.PARQUET,
  format: Format.PARQUET,
  timeUnit: TimeUnit.DAILY,
});
```

#### Use AWS Glue to enable access to your report using Amazon Athena

After you created your report, you can provision a AWS Glue based data catalog for this. This enables Bill and you to analyze your cost and usage reports using Amazon Athena.

If you want to enable a data catalog on a new provisioned report, you can simply call `addDataCatalog()` on your `CostAndUsageReport` construct like

```javascript
import { CostAndUsageReport } from "@cremich/cdk-bill-bot";

const report = new CostAndUsageReport(this, "cur", {
  compression: Compression.PARQUET,
  format: Format.PARQUET,
  timeUnit: TimeUnit.DAILY,
});

report.addDataCatalog();
```

This will create an AWS Glue crawler to crawl your report data, an AWS Glue database that references your metadata as well as an Athena Workgroup to enable you to query your data using Amazon Athena.

If you would like to enable a data catalog on an existing report, you can use the `CostAndUsageDataCatalog` construct independently and reference your existing S3 Bucket:

```javascript
import { CostAndUsageDataCatalog } from "@cremich/cdk-bill-bot";

new CostAndUsageDataCatalog(this, "costs-catalog", {
  curBucket: bucket,
});
```

#### Daily spends digest

Bill is able to analyze your spends on a daily bases. Bill will calculate your total costs and send you a digest message via slack. You can enable the daily spends digest by using the following construct and connecting it with your cost and usage data catalog.

```javascript
import { CostAndUsageDataCatalog } from "@cremich/cdk-bill-bot";

new DailySpendsDigest(this, "daily-spends-digest", {
  datacatalog,
  slackWebHookUrl:
    "https://hooks.slack.com/services/WORKSPACE_ID/CHANNEL_ID/personalSecret",
});
```

To use this construct, you have to provide a valid Slack webhook. If the webhok is not valid, the construct creation will during synthesis time. Please follow the official documentation to [create a personal and private webhook](https://api.slack.com/messaging/webhooks). If everything is setup correctly and your first daily spends are analyzed, you will receive a message like the following:

![Daily Spends Digest](./docs/daily-spends-digest.png)

The daily spends digest is orchestrated using AWS Step Functions. You can run the state machine workflow that is created along the `DailySpendsDigest` construct manually at any time. The state machine does not require any special execution input. By default, the state machine will be executed automatically once a day and analyze yesterdays usage data once they are propagated in the underlying cost and usage report.

By default, a daily spends CSV report is ready to be downloaded using a pre-signed URL. The URL will automatically expire after 15 minutes. You can use the report to dive deeper into the daily spends results. Please check out the [sample file](./test/daily-spends/daily-spends.csv) that is provided within this repository.

## 🤔 FAQs

### Can I also use Bill in my multi-account setup?

Bill can basically run in any AWS account but it might not be designed to cover all multi account use cases in detail. Depending on customer feedback, this might be added at a later stage.

### I already have an existing Cost and Usage report export setup. Can Bll reuse this instead of provisioning a new one?

Yes. You can skip the creation of a CUR export managed by Bill and point your existing S3 bucket to the datacatalog construct.

### What channels does Bill support?

Right now, Bill is capable to send notifications to a Slack channel of your choice. In order to enable Bill to send messages via Slack, you have to [create a Slack Webhook](https://api.slack.com/messaging/webhooks).

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/cremich/cdk-bill-bot/issues) for open issues or create one for feature requests or if you have general questions.

Be also sure to review our [contributing guidelines](./CONTRIBUTING.md) and [code of conduct](./CODE_OF_CONDUCT.md).
