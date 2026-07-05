---
repo: KablamoOSS/cfn-analyse
url: 'https://github.com/KablamoOSS/cfn-analyse'
homepage: null
starredAt: '2018-12-16T06:10:41Z'
createdAt: '2018-09-27T23:20:40Z'
updatedAt: '2018-12-16T06:10:41Z'
language: Python
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T21:19:53.836Z'
description: CloudFormation static analysis tool.
tags: []
---

# CloudFormation Analyse #

![Template Evaluation Preview Screen](https://raw.githubusercontent.com/KablamoOSS/cfn-analyse/master/website/screen-2.png)

## Overview

This pipeline enables organizations to impose restrictions on the content of their AWS CloudFormation templates using a [custom ruleset](https://github.com/KablamoOSS/cfn-analyse/blob/master/lambda/rules.yml). It performs evaluation against the set of rules then posts to a Slack channel (usually managers) for them to approve the stack operation. Unlike other tools, the pipeline performs some resolution of Intrinsic Functions before evaluating the ruleset.

## Usage

To use this tool, create a [Slack Outgoing Webhook](https://my.slack.com/services/new/outgoing-webhook) then create a new CloudFormation stack using the cfn-validator-infra.yml file. You will need to provide the webhook URL and the name of a bucket where new stacks are to be uploaded (currently, only Sydney region has the required website files deployed).

Once the stack creation has completed, we're ready to begin. Upload a CloudFormation YAML template to the newly created bucket. If you specify `stackname` as a Tag or Metadata value, it will use this name when creating the new CloudFormation stack, after approval.

![Slack Message](https://raw.githubusercontent.com/KablamoOSS/cfn-analyse/master/website/screen-1.png)

A Slack message will be posted with information and a unique link to perform operations with the stack. Clicking this link will take you to a website where you can review all resources propsed to be created and review each resources compliance with the ruleset.

![Extra Information](https://raw.githubusercontent.com/KablamoOSS/cfn-analyse/master/website/screen-3.png)

Clicking on a specific resource will expand the row to reveal compliance information and resolved values for each field. Fields with unresolvable information will have that information shown in italics.

Clicking the Approve button will initiate the CloudFormation stack upsert and will track the status of that stack until completion. Once completed, a message will be posted to the Slack channel.

## Technical Implementation

The pipeline uses S3 Event Triggers, which triggers a new Step Function execution used to track progress. The following diagram shows the state machine:

![Step Function Execution](https://raw.githubusercontent.com/KablamoOSS/cfn-analyse/master/website/screen-4.png)

A single Lambda function is deployed to perform operations on all non-activity states. In order to process the users inputs, an API Gateway fronts the Lambda execution for the AJAX calls from the website. Due to the implementation of Step Functions, the execution token is used to uniquely identify the workflow being interacted with.

