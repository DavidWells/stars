---
repo: grycap/cloudtrail-tracker
url: 'https://github.com/grycap/cloudtrail-tracker'
homepage: 'https://www.grycap.upv.es/cloudtrail-tracker/'
starredAt: '2019-10-06T08:56:20Z'
createdAt: '2018-01-16T18:49:36Z'
updatedAt: '2025-01-13T09:09:41Z'
language: Python
license: Apache-2.0
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:19.395Z'
description: Serverless Platform for Enhanced Insights from CloudTrail Logs
tags:
  - analytics
  - api-gateway
  - aws
  - aws-lambda
  - cloudtrail
  - dynamodb
  - s3-bucket
  - serverless
---

# CloudTrail-Tracker
A Serverless Platform for Enhanced Insights from CloudTrail Logs for Your Multi-Tenant AWS Account.

# Introduction

CloudTrail-Tracker is a tool that provides fast cost-effective insights on the multi-tenant use of an AWS account by several [AWS IAM](https://aws.amazon.com/iam/) users. It consists of:

* A serverless back-end composed of an [AWS Lambda](https://aws.amazon.com/lambda) that is triggered upon the event logs stored by [AWS CloudTrail](https://aws.amazon.com/cloudtrail/) on [Amazon S3](https://aws.amazon.com/s3) and stores them in [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) to allow faster access and enhanced query capabilities.

* A REST-based service provided by [Amazon API Gateway](https://aws.amazon.com/api-gateway/) (optionally integrated with [Cognito](https://aws.amazon.com/cognito) to manage authentication) to query the events stored in DynamoDB through an AWS Lambda function.

* A Vue.js-based web portal (eventually available in the [cloudtrail-tracker-ui](https://github.com/grycap/cloudtrail-tracker-ui) repository) that queries the REST-based service to visually depict high-level aggregated information concerning the use of resources in AWS by the different users based on the events information. A live site for demo purposes is provided at: [http://cloudtrailtracker.cursocloudaws.net](http://cloudtrailtracker.cursocloudaws.net) accesible with user/password `demo` / `demoDem0!`.

## Serverless Approach

CloudTrail-Tracker is designed as a serverless application that entirely runs on the aforementioned serverless services in order to minimize the operating costs while maintaining appropriate levels of scalability to efficiently achieve the aggregated metrics. The web portal can also be deployed as a static website on an Amazon S3 bucket. Depending on the usage, the entire platform can run within the Free Tier on your AWS account at zero cost and your usage data of the AWS services never leaves your own AWS account. The following figure describes the architecture:

![CloudTrail-Tracker Architecture](doc/img/ctt-arch2.png)



# Requirements

The following tools/libraries are required:

- The [serverless](https://serverless.com/) framework.
- The [Boto 3](http://boto3.readthedocs.io/en/latest/) library.
- The [flatten_json](https://pypi.org/project/flatten_json/) library.

You can install the requirements by issuing on either a GNU/Linux os macOS machine:

```sh
sudo apt-get install python-pip && pip install --upgrade pip
npm install -g serverless
pip install -r requeriments
```

## Requirements on AWS

### Access Credentials (To Deploy CloudTrail-Tracker)

You will need access credentials to AWS (Access Key ID and Secret Access Key specified in `$HOME/.aws/credentials`). In particular, the following [IAM policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) should allow you to perform the deployment (notice that a restricted set of privileges may allow you as well; this list is provided for your convenience; remember to respect the [Principe Of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)):
 
- AWSLambdaFullAccess
- AmazonDynamoDBFullAccess
- AmazonAPIGatewayAdministrator
- AmazonS3FullAccess

### IAM Role (For CloudTrail-Tracker to work)

An [IAM Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) is required for CloudTrail-Tracker to operate. A superset of the required privileges for that role can be achieved with the following IAM Policies:

- AmazonDynamoDBFullAccess
- AWSLambdaExecute
- AmazonS3FullAccess

# Local Installation and Deployment on AWS

1. Clone the project with Git or download it:

```sh
git clone https://github.com/grycap/cloudtrail-tracker.git
cd cloudtrail-tracker
```

2. Edit the `settings/settings.py` file and, at least, specify the right values for the following parameters:

* `bucket_name`: The name of the bucket that stores the event logs coming from CloudTrail.

The other configurable parameters are:

* `AWS_REGION`: The region on which the platform will be deployed.
* `lambda_func_name`: The name of the Lambda function that will query for events in the DynamoDB table.
* `lambda_func_name_trigger`: The name of the Lambda function that will insert the events in the DynamoDB table.
* `stage_name`: The stage name for API Gateway.
* `table_name`: The name of the table for DynamoDB.
* `API_name`: The name of the API in API Gateway
* `filterEventNames`: An array of prefixes of those events that will *not* be filtered out (not stored in DynamoDB).
  
3. Create the DynamoDB table on which the events will be stored:

```sh
python dynamodb/Database.py
```

4. Edit the `serverless.yml` file and modify the following parameters:

- `deploymentBucket name`: The name of a bucket on which temporary files will be uploaded to facilitate the deployment of the Lambda functions. This can be ommitted and the Serverless framework will create an S3 bucket with a random name.
- `role`: The ARN of the IAM role used by the Lambda functions.

Optionally, you can modify the Lambda function names (to match those used in the `settings.py` file)

5. Deploy CloudTrailTracker with the serverless platform:

```sh
sls deploy
```

6. Create a trigger in the S3 bucket so that whenever a file is created in the bucket, the corresponding Lambda function will be triggered to parse the event and insert the information in DynamoDB.

```sh
python3.6 lambda/eventuploads/trigger.py
```

## Uploading Past Events

Once CloudTrail-Tracker is up & running, from that moment on, the Lambda function that stores the events in DynamoDB will start to become triggered once any AWS service logged by CloudTrail is used. To include in DynamoDB the events previously registered by CloudTrail, and available in the corresponding S3 bucket, you will need to upload them using the following helper tools. 

### Uploading Past Events From a Local Directory

To upload previous events from a local directory, you can use the following command:

```sh
python dynamodb/Logs.py --path "local path" --t "YYYY-mm-dd date limit"
```

### Upload Past Events From an S3 Bucket

To upload previous events from an S3 bucket, you can use the following command:

```sh
  python dynamodb/Logs.py --bucket_name "BUCKET_NAME" --t "YYYY-mm-dd date limit"
```

## Using CloudTrail-Tracker

The REST API provided by the API Gateway endpoint receives the queries. You can query it using `curl`, [Postman](https://www.getpostman.com/) or rely on an easy-to-use web portal such as [cloudtrail-tracker-ui](https://github.com/grycap/cloudtrail-tracker-ui). There is a [Swagger API YAML description for CloudTrail-Tracker](https://raw.githubusercontent.com/grycap/cloudtrail-tracker/master/apigateway/swagger/swagger.yaml) that you can beautifully display using the [Swagger Editor](https://editor.swagger.io/) and importing the YAML file. Some example commands using `curl` to query the REST API are included in this section, assuming that the endpoint of the API Gateway is available at `https://api.mysite.com/tracker`:

### List all parameters

Obtain the parameters that can be used in the queries.

```sh
curl --url 'https://api.mysite.com/tracker/parameters'
```

### Scan

Obtain a list of events that ocurred between two timestamps (regardless of the user and the service):

```sh
curl --url 'https://api.mysite.com/tracker/scan?from=2016-01-01&to=2016-01-15' | jq
```

Notice that the use of the [jq](https://stedolan.github.io/jq/) library obtains pretty-printed output.

The default value is 7 days:
  
```sh
curl 'https://api.mysite.com/tracker/scan'
```

You can also specify fine-grained (to-the-second) timestamps:

```sh
curl 'https://api.mysite.com/tracker/scan?from=2018-01-15T09:00:00&to=2018-01-15T17:00:00'
```

### Services

List all services for which there are events stored in CloudTrail-Tracker:

```sh
curl 'https://api.mysite.com/tracker/services'
```

List all events from the Amazon EC2 service that occured in the last 7 days:

```sh
curl 'https://api.mysite.com/tracker/services/ec2
```

List all events from the Amazon RDS service that occured between a range of dates:
  
```sh
curl 'https://api.mysite.com/tracker/services/rds?from=2018-06-01&to=2018-06-15'
```

An excerpt of the output information is:

```sh
[
  ...
{
    "eventID": "6bcee565-5cf2-4f3e-bef9-6b250b091a80",
    "eventName": "CreateDBSubnetGroup",
    "eventSource": "rds.amazonaws.com",
    "eventTime": "2018-06-11T15:42:21Z",
    "userIdentity_userName": "alucloud131"
  },
  {
    "eventID": "d4f51839-b19d-46b3-b370-1b7833492aca",
    "eventName": "DeleteDBInstance",
    "eventSource": "rds.amazonaws.com",
    "eventTime": "2018-06-04T05:10:25Z",
    "userIdentity_userName": "alucloud139"
  },
  ...
]
```

### Users

List all the IAM users that have events registered in CloudTrail-Tracker:

```sh
curl 'https://api.mysite.com/tracker/users'
```

List all events from user `alucloud230` in the last 7 days:

```sh
curl 'https://api.mysite.com/tracker/users/alucloud230'
```

List events from user `alucloud00` caused between a range of dates:

```sh
curl 'https://api.mysite.com/tracker/users/alucloud00?from=2018-06-01T09:30:00&to=2018-06-15T23:30:00'
```

List Runinstances events caused by `alucloud121` between a range of dates (including hours):

```sh
curl 'https://api.mysite.com/tracker/users/alucloud121?from=2018-01-01T09:30:00&eventName=RunInstances&to=2018-06-15T23:30:00'
```

List RunInstances events (only those involving an `m1.small` instance type) caused by `alucloud230` between two dates. A list of parameters and values can be specified to filter the values.

```sh
 curl -g "https://api.mysite.com/tracker/users/alucloud230?params=['instanceType','eventSource']&value=['m1.small','ec2.amazonaws.com']&from=2017-06-06&eventName=RunInstances&to=2017-09-09"
 ```

  
