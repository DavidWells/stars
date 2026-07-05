---
repo: Ryanjlowe/pinpoint-engagement-scoring
url: 'https://github.com/Ryanjlowe/pinpoint-engagement-scoring'
homepage: null
starredAt: '2020-11-21T08:18:15Z'
createdAt: '2019-12-10T20:27:58Z'
updatedAt: '2020-11-21T08:18:15Z'
language: Python
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:21.981Z'
description: null
tags: []
---

# Amazon Pinpoint Engagement Scoring Solution

Use Amazon Pinpoint's Event Stream data to perform engagement scoring on your customers.  Increment or decrement scores based upon events as they flow through Pinpoint. As customers open or click emails, sms messages, or push messages - automatically keep track of an engagement score.

## Architecture
![Screenshot](images/Pinpoint_Scoring_Model.png)

## Repository content
Main files:
```bash
.
├── README.MD                                           <-- This instructions file
├── cloudformation                                      <-- Folder for the AWS CloudFormation Templates
│   └── template.yaml                                   <-- Template to configure the solution
├── lambdas                                             <-- Folder for the AWS CloudFormation Templates
│   └── IntializeDBCustomLambda
│       └── index.py                                    <-- Custom Resource used to populate DynamoDB tables
│   └── PinpointEventStreamLambda
│       └── index.py                                    <-- Function to process the Pinpoint Event Stream
│   └── UpdatePinpointLambda
│       └── index.py                                    <-- Function to update Pinpoint with new Score values
```

## Solution

This solution deploys the necessary AWS components to build a simple scoring model
* Using the Pinpoint Project ID provided, create a Project Event Stream configuration to stream events to a deployed Kinesis Data Stream
* Amazon DynamoDB Tables
  * Scoring Definition Table, pre-populated by CloudFormation with data.  See Screenshot below
  * User Score Table to keep track of the current user's aggregated score
* DynamoDB Stream to capture changes to the User Score Table records
* AWS Lambda Functions
  * Function to process events from the Kinesis Data Stream that will look up the event in DynamoDB and then increment the current users score.
  * Function to process the DynamoDB streams to update Pinpoint Endpoint data with the newly calculated score
* Halper Lambda Function that is called only during CloudFormation deploy to populate the score definition tables with initial Values.  See Screenshot Below

#### Initial score definition values pre-populated by CloudFormation Screenshot
![Screenshot](images/DynamoDBScreenshot.png)

## Testing

Navigate to the Amazon Pinpoint Console and select the Project used in the CloudFormation template deployment.  Create a campaign targeting users and execute.  As users interact with the messages, events will flow through the event stream, which will be scored and stored into DynamoDB.  Changes to the tables will trigger another stream that will update Pinpoint with the newly created score.  A Segment Export can then be performed which will show the user score!

## Next Steps

This solution can be extended to include custom events.  Amazon Pinpoint has an API to stream events from Mobile Apps, Web Apps, Social Channels, or any other custom event source.  These events will be immediately available in the same Event Stream and can then also be used for scoring.  Simply add the event_type of these events along with a score to the DynamoDB table to start including ANY custom event into your scoring model.
