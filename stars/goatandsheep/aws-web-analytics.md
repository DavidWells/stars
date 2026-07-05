---
repo: goatandsheep/aws-web-analytics
url: 'https://github.com/goatandsheep/aws-web-analytics'
homepage: 'https://console.aws.amazon.com/pinpoint/home'
starredAt: '2020-10-20T18:19:24Z'
createdAt: '2020-01-16T04:59:37Z'
updatedAt: '2024-08-08T21:46:10Z'
language: JavaScript
license: GPL-3.0
branch: master
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:26.403Z'
description: Privacy-focused alternative to Google Analytics on AWS Pinpoint
tags:
  - amplify-js
  - analytics
  - aws
  - google-analytics
  - help-wanted
---

# AWS Web Analytics

Tracking tag library for AWS Pinpoint as an alternative to Google Analytics using AWS Amplify. 

## Philosophy

Moving to AWS from Google Analytics is a way to maintain your users' privacy. Our blog post, [Why you need to move off Google Analytics](https://dev.to/goatandsheep/stop-donating-your-customers-data-to-google-analytics-191), explains more about it.

Amplify requires a lot of boilerplate to be able to setup a useful Analytics setup quickly and effectively.

## Initialize your account

1. Create an AWS account
2. Create your Pinpoint account and Cognito Federated user pool
3. Add the following tag to your code (with your own values for `data-id-pool` and `data-pinpoint-id`):

```html
<script
    data-id-pool="us-east-1:abcd1234-abcd-1234-5678-abcd12345678"
    data-pinpoint-id="1234abcd5678abcd7890abcd1234"
    id="aws-web-analytics"
    src="https://goatandsheep.github.io/aws-web-analytics/dist/aws-web-analytics.js"
    type="text/javascript"
></script>
```

## Click Events

> Based on [Amplify Page Event Tracking](https://docs.amplify.aws/lib/analytics/autotrack/q/platform/js#page-event-tracking)

Use `data-aws-analytics-` to indicate:

* `on`: event listening
* `name`: what will analytics event be named?
* `attrs`: any needed associated info

```html
<!-- you want to track this button and send an event when it is clicked -->
<button
    data-aws-analytics-on="click"
    data-aws-analytics-name="submitButtonClick"
    data-aws-analytics-attrs="attr1:attr1_value,attr2:attr2_value"
>Continue</button>
```

If you need other events than `click`, open a ticket 

## Custom events

> Based on [Amplify Analytics record](https://docs.amplify.aws/lib/analytics/record/q/platform/js).

```javascript
window.Amplify.Analytics.record({
    name: 'albumVisit', 
    // Attribute values must be strings
    attributes: { genre: '', artist: '' }
});
```

## AWS Cloud setup

### IAM Role

Setup the Federated Cognito pool allowing unauth roles with the following permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "mobiletargeting:PutEvents",
                "mobiletargeting:UpdateEndpoint"
            ],
            "Resource": "arn:aws:mobiletargeting:us-east-1:<account-number>:apps/<pinpoint-project-id>/*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "mobiletargeting:GetUserEndpoints",
                "mobileanalytics:PutEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

CloudFormation coming soon...
