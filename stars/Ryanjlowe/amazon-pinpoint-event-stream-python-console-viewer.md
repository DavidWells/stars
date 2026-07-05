---
repo: Ryanjlowe/amazon-pinpoint-event-stream-python-console-viewer
url: >-
  https://github.com/Ryanjlowe/amazon-pinpoint-event-stream-python-console-viewer
homepage: null
starredAt: '2020-11-21T08:03:18Z'
createdAt: '2020-06-05T21:14:05Z'
updatedAt: '2023-11-21T06:31:31Z'
language: Python
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:22.225Z'
description: null
tags: []
---

# Amazon Pinpoint Event Stream Python Console Listener

## Description

Amazon Pinpoint's Event Stream will stream user engagement events in real-time as they occur.  This Solution uses AWS CloudFormation to enable the Event Stream, connect it to an Amazon Kinsis Data Stream, and then allows you to run a python script locally to listen and receive the events as they occur.

First, deploy the [template.yaml](template.yaml) in CloudFormation with an existing Amazon Pinpoint Project ID.

The script below can be run locally using the CloudFormation Output Parameter `KinesisStreamName` and the AWS Profile containing credentials that have access to read from Kinesis.

Usage:  `python kinesis_listen.py <aws_profile_name> <kinesis_stream_name>`


![Screenshot](console.png)
