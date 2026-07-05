---
repo: alexdebrie/serverless-dynamodb-scanner
url: 'https://github.com/alexdebrie/serverless-dynamodb-scanner'
homepage: null
starredAt: '2019-02-08T04:55:35Z'
createdAt: '2019-02-05T02:22:23Z'
updatedAt: '2024-02-26T10:47:42Z'
language: Python
license: NA
branch: master
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:46.656Z'
description: >-
  A Serverless project to help you operate on every existing item in a DynamoDB
  table
tags: []
---

# Serverless DynamoDB Scanner

This is a Serverless application that scans a given DynamoDB table and inserts every item into a Kinesis Stream. You can then process the Kinesis stream, allowing you to perform an operation on all existing items in a DynamoDB table.

It was inspired by a tweet from [Eric Hammond](https://twitter.com/esh):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">We really want to run some code against every item in a DynamoDB table.<br><br>Surely there&#39;s a sample project somewhere that scans a DynamoDB table, feeds records into a Kinesis Data Stream, which triggers an AWS Lambda function?<br><br>We can scale DynamoDB and Kinesis manually. <a href="https://t.co/ZyAiLfLpWh">https://t.co/ZyAiLfLpWh</a></p>&mdash; Eric Hammond (@esh) <a href="https://twitter.com/esh/status/1092580853429952512?ref_src=twsrc%5Etfw">February 5, 2019</a></blockquote>

## Usage:

This project uses the [Serverless Framework](https://github.com/serverless/serverless) to deploy a Lambda function and associated AWS resources.

To use it, follow these steps:

1. Install the Framework and create your service:

	```bash
	# Make sure you have the Serverless Framework installed
	$ npm install -g serverless
	
	$ sls create --template-url https://github.com/alexdebrie/serverless-dynamodb-scanner --path serverless-dynamodb-scanner
	
	$ cd serverless-dynamodb-scanner
	```

2. Update the configuration in `serverless.yml`.

	Add the ARN of the DynamoDB table you want to scan and the ARN of the Kinesis stream where you want the config added:

	```yml
	# serverless.yml
	
	custom:
	  dynamodbTableArn: 'arn:aws:dynamodb:us-east-1:123456789012:table/my_table'
	  kinesisStreamArn: 'arn:aws:kinesis:us-east-1:123456789012:stream/my-stream'
	
	...
	```

3. Deploy your service:

	```bash
	$ sls deploy
	```

4. When you're ready, kick off your scan by invoking the function:

	```bash
	$ sls invoke -f scanner
	```
	
	
## How does it work?

The basic workflow is as follows:

![dynamodb scanner](https://user-images.githubusercontent.com/6509926/52250445-a396a680-28bd-11e9-9f41-22efa66266c8.png)

> A diagram that's missing a few steps ¯\\\_(ツ)_/¯

1. Inside the Lambda function, check [AWS SSM](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html) for a `LastEvaluatedKey` parameter that would be sent with our Scan call.

   If no parameter exist in SSM, we're just starting the scan.
   
2. Make a `Scan` call to our DynamoDB table.

3. Insert the items returned from our Scan into our Kinesis Stream via a `PutRecords` call.

4. If the `Scan` call did not return a `LastEvaluatedKey`, our Scan is done! We can exit the function.

5. If the `Scan` did return a `LastEvaluatedKey`, store the value in SSM.

6. Do a time check -- if our function has less than 15 seconds of execution time left, we'll invoke another instance of our function and exit the loop for this one. Our next function will pick up where our scan left off by using the `LastEvaluatedKey` in SSM.
