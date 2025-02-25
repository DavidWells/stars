---
repo: markhobson/emojibot
url: 'https://github.com/markhobson/emojibot'
homepage: ''
starredAt: '2016-12-17T02:13:53Z'
createdAt: '2016-12-12T17:33:32Z'
updatedAt: '2023-06-11T18:54:27Z'
language: JavaScript
license: NA
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:50.965Z'
description: A Slack bot that joins the conversation with emojis.
tags:
  - aws-lambda
  - emoji
  - serverless
  - slack
---

# Emojibot

A Slack bot that joins the conversation with emojis.

## Getting started

1. [Create an AWS account](https://aws.amazon.com/free/) if haven't got one already

1. [Install Serverless](https://serverless.com/framework/docs/providers/aws/guide/installation/) and [configure your AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)

1. Deploy the server to AWS Lambda:

	```
	npm install
	serverless deploy
	```

	Note that you'll be charged for these services until they are [removed](#removing).

	Make a note of the endpoints output once it has deployed, e.g.:

	```
	endpoints:
	  POST - https://ab12cd34ef.execute-api.eu-west-1.amazonaws.com/dev/event
	  POST - https://ab12cd34ef.execute-api.eu-west-1.amazonaws.com/dev/explain
	```

1. Update the Slack app manifest for your server:

	1. Open `manifest.yml`
	1. Replace `<event endpoint>` with the `event` endpoint
	1. Replace `<explain endpoint>` with the `explain` endpoint
	1. Copy the contents of this file to your clipboard (no need to save these changes)

1. Create your Slack app from the manifest:

	1. [Create a Slack app](https://api.slack.com/apps/new)
	1. Select 'From an app manifest'
	1. Select your workspace and click 'Next'
	1. Paste in the manifest from your clipboard and click 'Next'
	1. Click 'Create'

1. Install the Slack app to your workspace:

	1. Under 'Basic Information / Install your app' click 'Install to Workspace'
	1. Click 'Allow' to authorize the permissions
	1. Under 'Basic Information / Display Information' click '+ Add App Icon'
	1. Select and upload `resources/emojibot.png`
	1. Select 'OAuth & Permissions' and under 'Bot User OAuth Token' click 'Copy'
	
1. Configure the server credentials:

	1. Create a `.env` file (do not commit this file, it is already Git ignored):

		```
		# Environment variables -- DO NOT COMMIT!

		BOT_ACCESS_TOKEN = <bot access token>
		```
	 
	1. Replace `<bot access token>` with your copied bot user OAuth token
	1. Save the file
	1. Redeploy the server to update the environment variable:
	
		```
		serverless deploy
		```

## Updating emojis

The bot works by using a map of words to emojis. This map is derived from [emoji-data](https://github.com/iamcal/emoji-data) and [emojilib](https://github.com/muan/emojilib) and stored in [emoji.js](src/emoji.js). To regenerate it:

```
npm run generate
```

## Running tests

To run the unit tests:

```
npm test
```

## Removing

To undeploy the server from AWS:

```
serverless remove
```

## See also

* Blog: [Building a serverless chatbot on AWS Lambda](https://www.markh.me/2017/01/25/building-a-serverless-chatbot-on-aws-lambda.html)
