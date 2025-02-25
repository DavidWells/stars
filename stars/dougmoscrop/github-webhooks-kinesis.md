---
repo: dougmoscrop/github-webhooks-kinesis
url: 'https://github.com/dougmoscrop/github-webhooks-kinesis'
homepage: null
starredAt: '2018-11-15T23:52:49Z'
createdAt: '2017-02-11T20:08:53Z'
updatedAt: '2019-05-27T03:44:00Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:04.105Z'
description: Send GitHub Webhooks to Kinesis!
tags: []
---

# github-webhooks-kinesis

This is a simple API that accepts Webhooks from GitHub and sends them to Kinesis

## Usage

It's pretty easy! Follow the steps below after cloning this repository.

### Generate secret

(generate a secret somehow)

### Deploy this service

- `npm run deploy -- --secret={your-secret-here}`
- Note the endpoint URL

### Set up GitHub Webhook

- Go in to Settings for either a Repository or an Organization
- Choose Webhooks on the left
- Add a Webhook:
  - Specify the secret from the first step as well as the endpoint URL from the previous step
  - Choose the granularity of events you want to receive, etc.
