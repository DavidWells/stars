---
repo: trek10inc/dynamodb-autoscaling
url: 'https://github.com/trek10inc/dynamodb-autoscaling'
homepage: null
starredAt: '2017-03-31T20:29:50Z'
createdAt: '2017-03-28T18:28:49Z'
updatedAt: '2023-01-28T09:05:56Z'
language: JavaScript
license: NA
branch: master
stars: 41
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:46.432Z'
description: Serverlessly monitor and autoscale DynamoDB
tags: []
---

# THERE IS AN AWS OFFICIALY SUPPORTED METHOD FOR DOING THIS!

As all good ideas in AWS, eventually their platform expands to include it: https://aws.amazon.com/blogs/aws/new-auto-scaling-for-amazon-dynamodb/. This project may issue critical bug fixes, but should be considered deprecated. 

### Prerequisites

Install [Serverless framework](https://serverless.com/) globally:

`$ npm install -g serverless`

### Deployment

Install node modules and deploy serverless stack to AWS account

```
$ npm install
$ sls deploy --stage <stage name>
```

Stage flag is optional...

### Auto-Scale Lambdas

Auto-scaling lambdas are deployed with scheduled events which run *every 1 minute for scale up* and *every 6 hours for scale down* by default. Schedule settings can be adjusted in serverless.yml file.

### Add an API Key

By default we protect all API endpoints, and the quickest way to get started is just API Gateway API Keys. Create a key, give it permissions to hit your stage. You leverage the key by passing it in with the `x-api-key` header on any requests to the Configuration REST API.

### Configuration REST API

API gateway endpoints will be deployed to maintain auto-scaling configuration:

`GET https://api.domain.name/ddb-auto-scale/config` - Load all available configuration records.

`GET https://api.domain.name/ddb-auto-scale/config/{tableName}` - Load configuration record for specified DynamoDB table.

`POST https://api.domain.name/ddb-auto-scale/config` - Save configuration record for DynamoDB table (see [Configuration Data Structure](#config) section below).

`DELETE https://api.domain.name/ddb-auto-scale/config/{tableName}` - Delete configuration record for specified DynamoDB table.

### <a name="config"></a>Configuration Data Structure

All auto-scaling properties for specified DynamoDB table along with its global secondary indexes are described by configuration JSON object with following structure:

```
{
	tableName: name of DDB table to auto-scale (required)

	min: minimal capacity units (default 1)
	max: maximal capacity units (default 100)
	
	threshold: value which determines if we need to scale (scale up if consummed capacity units >= provisioned capacity units * threshold, default 0.8)
	increase: number of capacity units by which we increase (default 10)
	 
	upTimeSpan: a time span for which we analyze consummed capacity units for scale up (default to 5 minutes)
	downTimeSpan: a time span for which we analyze consummed capacity units for scale down (default to 30 minutes)
	
	indexes: array of indexes scale configuration [
		indexName: an index name to auto-scale (required)
		
		... similar configuration structure as for table ...
	]
}
```

