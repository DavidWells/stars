---
repo: danilop/AutoScaling2IFTTT
url: 'https://github.com/danilop/AutoScaling2IFTTT'
homepage: null
starredAt: '2016-01-21T19:59:46Z'
createdAt: '2015-07-26T13:54:54Z'
updatedAt: '2018-10-30T21:17:43Z'
language: JavaScript
license: MIT
branch: master
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:33.446Z'
description: >-
  A sample AWS Lambda function to push EC2 Auto Scaling notifications to IFTTT
  via the Maker channel
tags: []
---

# AutoScaling2IFTTT

A sample [AWS Lambda](https://aws.amazon.com/lambda/) function to push [EC2 Auto Scaling](https://aws.amazon.com/autoscaling/) notifications to [IFTTT](https://ifttt.com) via the [Maker](https://ifttt.com/maker) channel.

## License

Copyright (c) 2015 Danilo Poccia, http://danilop.net

This code is licensed under the The MIT License (MIT). Please see the LICENSE file that accompanies this project for the terms of use.

## Installation

### On IFTTT

1. Go to [https://ifttt.com/maker](https://ifttt.com/maker) and write down your secret key

### On AWS

2. Create a new Amazon SNS topic, e.g. `autoscaling`
3. Configure the Auto Scaling group to send notifications to the SNS topic created at the previous step
4. Create a new AWS Lambda function, e.g. `autoscaling-2-ifttt`
  1. Use Node.js as runtime
  2. Paste the code inline from the `index.js` file included in this repository
  3. Replace the `iftttMakerSecretKey` with the one you wrote down at step 1
  4. (Optional) Replace the `iftttMakerBaseEventName` with the one you want to use
  5. Leave the default handler
  6. Use a basic execution role
  7. Leave the default memory (128MB) and timeout (3s)
5. Add SNS as an event source to the Lambda function
  1. Choose the SNS topic created at step 1
  2. In the options, enable the event source now (not later)

### On IFTTT

You can create a recipe for any event you want to monitor from IFTTT:

Notification type|Event
-----------------|-----
EC2_INSTANCE_LAUNCH|Successful instance launch
EC2_INSTANCE_LAUNCH_ERROR|Failed instance launch
EC2_INSTANCE_TERMINATE|Successful instance termination
EC2_INSTANCE_TERMINATE_ERROR|Failed instance termination

6. Select My Recipes
7. Create a Recipes
8. Choose Maker as Trigger ('this')
9. Select Receive a Web Request
10. Write the Event Name exacly as the concatenation of:
  - the `iftttMakerBaseEventName` variable of the Lambda function (step 4.4 on AWS)
  - the underscore character (`_`)
  - the Auto Scaling group name
  - the underscore character (`_`)
  - the Notification type as in the table above (you can find [more info on Auto Scaling notifications here](http://docs.aws.amazon.com/AutoScaling/latest/DeveloperGuide/ASGettingNotifications.html?tag=duckduckgo-osx-20))
  - for exaple, if you leave the default `iftttMakerBaseEventName` ('autoscaling'), to monitor new instance launches on an Auto Scaling group named 'web' the Event Name to use would be `autoscaling_web_EC2_INSTANCE_LAUNCH`
11. Select Create Trigger
12. `Value1` contains the Auto Scaling group name
13. `Value2` contains the Notification type as in the table above
14. Choose whatever you want as Action ('that'), for example:
  1. iOS or Android Notifications to receive it on your mobile (you need the IF app from IFTTT installed on the device), e.g. you can set the notification to `Auto Scaling {{Value1}} {{Value2}}`
  2. A Channel from the Connected Home category to have a *visible* effect, e.g. [Philips Hue](https://ifttt.com/hue) to change the color of your lights to green when scaling up, yellow when scaling down, red in case of errors
  3. Slack to send a message to your team
  4. Trello to create a new card

## Feedback

Please give me your feedback [here](https://twitter.com/danilop).
