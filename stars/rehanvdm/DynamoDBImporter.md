---
repo: rehanvdm/DynamoDBImporter
url: 'https://github.com/rehanvdm/DynamoDBImporter'
homepage: 'https://www.rehanvdm.com/serverless/dynamodb-importer/index.html'
starredAt: '2019-11-13T04:35:35Z'
createdAt: '2019-11-10T11:01:28Z'
updatedAt: '2023-09-24T14:00:45Z'
language: JavaScript
license: NA
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:13.084Z'
description: >-
  Demonstrating DynamoDBs high throughput rate, by writing 1 million records in
  60 seconds with a single Lambda function streaming from a S3 file and then
  importing into DynamoDB using the Batch API
tags: []
---

# DynamoDB Data Importer

------

###  !!! WARNING: This Cloudformation script will launch a DynamoDB table at 40,000 WCU this can be expensive if left for more than an hour !!!

-----

## What's in side the box
A NodeJS Lambda function streams a S3 File and then imports it into DynamoDB using the Batch API. 

The full article for this code can be found here -> https://www.rehanvdm.com/serverless/dynamodb-importer/index.html

A note on the Environment variables passed to the function: 

- EXECUTE_LOCAL: If set uses the AWS profile specified on app.js line 6, currently set to "rehan', change to yours.
This is only used when we locally test the function
- CSV_BUCKET_NAME: Name of the bucket where the CSV is stored
- CSV_KEY_NAME: Name of the CSV file in the bucket
- DYNAMO_TABLE_NAME: DynamoDB table name where we will import into
- CONCURRENT_BATCH_SUBMITS: Make reference to the article, this is the amount of concurrent batch api writes made to the DynamoDB table
- READ_AHEAD_BATCHES: Make reference to the article, this is the amount of batches that will be read from the stream before 
they will be sent to DynamoDB at the CONCURRENT_BATCH_SUBMITS rate. This value must be greater or equal to CONCURRENT_BATCH_SUBMITS.
- MAX_ROWS_SUBMIT: Used for testing, setting to 0 means now restriction else stop the import when this amount of rows has been imported.
- AWS_NODEJS_CONNECTION_REUSE_ENABLED: AWS SDK NodeJS variable that allows the SDK to reuse TCP connections for faster API calls

Example:
```
EXECUTE_LOCAL: false
CSV_BUCKET_NAME: !Join ['', [!Ref AppName, '-source-', !Ref AppEnvironment]]
CSV_KEY_NAME: "data_s3.csv"
DYNAMO_TABLE_NAME: !Join ['', [!Ref AppName, '-table-', !Ref AppEnvironment]]
CONCURRENT_BATCH_SUBMITS: 20
READ_AHEAD_BATCHES: 40
MAX_ROWS_SUBMIT: 10000
AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1
```
## Install

- Change the ENV variables in the SAM/CloudFormation template to suite your needs. You would prob only change MAX_ROWS_SUBMIT
to 0 so that it imports everything after you did a small test with MAX_ROWS_SUBMIT amount of records.
- In the /package.json file, use your bucket for SAM deployments so change the content in line 9 (_sam_package): `--s3-bucket <YOUR EXISTING MANUAL CREATED S3 BUCKET NAME>` 
- Run npm install
- Runn the `sam_deploy` npm command to let SAM build, package and deploy your CloudFormation

## Batteries included

### Data generation tool
Using `mocker-data-generator` which abstracts over `faker` 2 CSV files are generated.
- A CSV file that contains (25*41) + 1 records that will be used by the File test to test most code paths
- A large CSV file containing 3,000,000 records that will be roughly around 250MB. Upload this file to your bucket 
before running the S3 test or the Lambda in the cloud.

### Tests 
Inside the /app-tests/lambda/importer/test-importer.js two tests can be found: 
- File: Streaming a small CSV from the file system and then doing the import
- S3: Streaming a S3 CSV file and then doing the import
 


