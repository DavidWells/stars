---
repo: readysetcloud/social-media-scheduler
url: 'https://github.com/readysetcloud/social-media-scheduler'
homepage: null
starredAt: '2025-01-09T02:46:03Z'
createdAt: '2023-10-23T15:14:44Z'
updatedAt: '2025-01-09T02:46:03Z'
language: JavaScript
license: NA
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:18.324Z'
description: Schedule social media posts with AWS EventBridge
tags: []
---

## Social Post Scheduler

This service will schedule your social posts asynchronously. The schedules run on a variable delay timer to simulate human activity. Currently the only social network supported is X/Twitter.

*For a full explanation of how this works, [check out the blog post](https://readysetcloud.io/blog/allen.helton/automatic-social-posts)*

### Deploy

To deploy this to your AWS account, you will need the [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html).

You will need to follow the Twitter developer setup page to create a [Twitter developer account](https://developer.twitter.com/en) and create all the necessary keys for posting into your account.

The keys required are your `API Key`, `API Key Secret`, `Bearer Token`, `Access Token`, and `Access Token Secret`. Be sure to create your Access Token Secret with read and write permissions (will require you to setup OAuth 1.0).

After you have your Twitter credentials and SAM CLI installed, you will need to deploy [my free serverless toolbox](https://github.com/allenheltondev/serverless-toolbox) into your account. This is a stack that has basic utility functions that can be reused throughout your applications.

Once installed, you can deploy this stack into your account with the following commands:

```bash
sam build
sam deploy --guided
```

This will walk you through a wizard and prompt you for your Twitter credentials, which will be stored in AWS Secrets Manager.

### How it works

Scheduling a social post is driven off an event-driven architecture. When the triggering event is recieved, a Step Function workflow is run to create a one-time EventBridge schedule. If the schedule already exists for the provided post, it is updated with the new information.

Below is an example EventBridge payload to trigger scheduling a post:

```json
{
  "detail-type": "Schedule Social Post",
  "source": "test",
  "detail": {
    "messages": [
      {
        "message": "Hello world!",
        "platform": "twitter",
        "scheduledDate": "2023-10-23T08:48:00",
        "referenceNumber": "testtweet",
        "campaign": "my test campaign"
      }
    ]
  }
}
```
* **messages** - Array of message objects to schedule. Messages are processed single threaded for scheduling purposes
* **message** - This is the contents of the message you wish to send. It must be within the standard 280 characters for a tweet (unless you are a premium member)
* **platform** - Social media platform to send on. Currently only supports `twitter` (case-sensitive)
* **scheduledDate** - *Optional* Date and time in UTC you wish to send the message. There will be up to an 8 minute delay on the sending of the message. If you do not provide this, it will be automatically configured for the next appropriate time slot
* **referenceNumber** - *Optional* - This is the unique identifier of your social post. This is used on the consumer end for tracking purposes.
* **campaign** - *Optional* - Used to group social posts and space related ones out. By default, any social posts sent with matching campaigns will be scheduled at least 5 days apart.

When a post is successfully scheduled, an EventBridge event will be sent in your AWS account with the following payload:

```json
{
  "detail-type": "Post Scheduled",
  "source": "SocialPostScheduler",
  "detail": {
    "referenceNumber": "testtweet",
    "scheduledDate": "2023-10-23T08:48:00"
  }
}
```

You can use this to confirm successful scheduling. If you did not include a reference number, a generated one will be used.

### Scheduling

You have the option to provide a `scheduledDate` property in your initiating event. If provided, it will be used and scheduled at the requested time. However if not provided, an automatic scheduler using [Amazon Bedrock](https://aws.amazon.com/bedrock/) will be used.

![Workflow diagram of the scheduling process](/images/scheduling.png)

**Automatic Scheduling**

By default, the automatic scheduler uses the following rules:
* No posting on weekends
* At most one post per day
* The earliest the post can be scheduled is tomorrow
* Time of day is optimized for a technical audience primarily in the United States
* If multiple posts are scheduled for the same campaign, the date will be at least 5 days from the latest one

You can change any of these rules by updating the code in the [calculate scheduled time](./functions/calculate-scheduled-time/index.js) Lambda function.

*Note - You must have the [Anthropic models enabled](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) in your AWS account for this to work.*

### Sending the post

After a post is scheduled, the EventBridge schedule will trigger at the time you configured. By default, it is set to an 8 minute flexible time window which you can change by updating the source code.

![Workflow diagram of the sending process](/images/sending.png)

#### Successful posting

If your message was successfully posted, you will receive an EventBridge event with the following payload:

```json
{
  "detail-type": "Social Post Sent",
  "source": "SocialPostSender",
  "detail": {
    "referenceNumber": "testtweet",
    "postId": "1716462083489812952"
  }
}
```

The postId is the identifier of the tweet that was sent. To compose it as part of a url, you can use:

> https://twitter.com/{account name}/status/{postId}

#### Failed posting

In the event your post was not successful, you will receive an EventBridge event with the following payload:

```json
{
  "detail-type": "Social Post Failed",
  "source": "SocialPostSender",
  "detail": {
    "referenceNumber": "testtweet"
  }
}
```

If the EventBridge scheduler failed to run, a message will be added to a Dead Letter Queue in your account. This DLQ has a CloudWatch alarm associated with it if items in the queue are older than 1 hour.

### Future plans

Below is a list of features that will be coming to the scheduler

* Automatic best time scheduling broken down by campaign
* LinkedIn support
