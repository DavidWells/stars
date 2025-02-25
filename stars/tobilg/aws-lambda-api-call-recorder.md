---
repo: tobilg/aws-lambda-api-call-recorder
url: 'https://github.com/tobilg/aws-lambda-api-call-recorder'
homepage: null
starredAt: '2021-11-18T20:09:10Z'
createdAt: '2020-09-13T08:52:46Z'
updatedAt: '2025-02-22T06:09:26Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.783Z'
description: A recorder of AWS API calls for Lambda functions
tags: []
---

# aws-lambda-api-call-recorder
Client and infrastructure for the recording of AWS API calls in Node-based Lambda functions, leveraging AWS Client Side Monitoring.

## Why does this project exist?

Mainly curiosity. But also because AWS CloudTrail doesn't record all API calls, thus it's possible to gather more insights how your Lambda functions behave.

Also, it's possible to determine the latencies of the API calls of different AWS services.

## Client

To be able to use the client library, you need to have the backend installed in the AWS account you want to record the AWS SDK API calls. Please see the appropriate backend section in this README.

### Installation

To install the client library, just do the following:

```bash
$ npm i --save aws-lambda-api-call-recorder
```

### Usage

To use the client library, you can wrap you handler function with `ApiCallRecorder`:

```javascript
const AWS = require('aws-sdk');
const ApiCallRecorder = require('aws-lambda-api-call-recorder');

const sts = new AWS.STS();

const handler = async (event, context) => {
  console.log(event);
  console.log(context);
  const callerIdentity = await sts.getCallerIdentity({}).promise();
  console.log(callerIdentity);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ok: true
    })
  };
}

exports.handler = ApiCallRecorder(handler);
```

Also, you will have to set the following environment variables to enable the detailled AWS SDK API Call recording:

* `AWS_CSM_ENABLED`: This environment variable should be set to `true` 
* Either `NODE_ENV` needs to be set to `development`, or, in case you want `production`, you can additionally set `API_CALL_RECORDER_IS_ACTIVATED` to `true`
* `API_CALL_RECORDER_DELIVERY_STREAM_NAME` needs to be set to the name of the Kinesis DeliveryStream. In case you use the Serverless framework and already installed the backend, you should be able to use the backed stack's output for this: `${cf:api-call-recorder-backend-${self:provider.stage}.ApiCallRecorderDeliveryStreamName}`

Also, make sure that the IAM execution role of your Lambda function has the following permissions to write to the Kinesis Firehose DeliveryStream (this assumes you already have deployed the backend, and the stage is the same as of your Lambda function):

```yaml
- Effect: Allow
  Action:
    - firehose:PutRecordBatch
  Resource: '${cf:api-call-recorder-backend-${self:provider.stage}.ApiCallRecorderDeliveryStreamArn}'
```

**Hints**:  
* Running production workloads with the `APICallRecorder` enabled is not advise, because it will add latency (and hence, costs)
* The `APICallRecorder` will **NOT** log the final upload of the recorded events to the Firehose DeliveryStream

### How it works

The client will wrap the Node Lambda function handler, start a UDP server on `localhost` on port `31000`, so that it can receive the published messages of the [AWS Client Side Monitoring](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/metrics.html) (CSM). Once the wrapped handler functions completes, the UDP server will be kept running another 25ms to make sure all API calls can be recorded. After it's shut down, the API calls will be pushed to a Kinesis Firehose DeliveryStream, which will batch the events to gzipped files in S3. 

Those files in S3 are then made queryable in Athena by an appropriate Glue Table definition.

## Backend

The backend needs to be deployed before you can record the API calls.

### Installation

Please clone the git repo:

```bash
$ git clone git@github.com:tobilg/aws-lambda-api-call-recorder.git
```

Then, change to the backend folder:

```bash
$ cd backend
```

The deployment of the backend requires the presence of the [Serverless framework](https://www.serverless.com) on the machine from where the backend should be deployed. Also, you'll need to have your AWS credentials setup accordingly. 

If it's present, you can use a single command to deploy the backend:

```bash
$ sls deploy
```

### Query the API call logs

To query the API call logs, you can use Athena. Please go to the Athena service in the AWS Console, and select the appropriate database from the selection (`api_calls_$STAGE`). Once you've done that, you should see the table `calls` on the left-hand side.

Example query to get the most use API calls filtered by a specific Lambda function:

```sql
SELECT
    service,
    api,
    avg(latency) as avg_latency,
    count(*) as call_cnt
FROM
    api_calls_dev.calls
WHERE
    functionname = 'api-call-recorder-example-dev-test' -- Example
AND
    type = 'ApiCall'
GROUP BY
    service,
    api
```

**Hint:**  
If you don't see any data, make sure to run the following SQL command to update the table partitions:

```sql
MSCK REPAIR TABLE api_calls_dev.calls
```

## Example project

Please clone the git repo if you haven't done so already:

```bash
$ git clone git@github.com:tobilg/aws-lambda-api-call-recorder.git
```

Then, change to the backend folder:

```bash
$ cd example
```

The deployment of the example stack requires the presence of the [Serverless framework](https://www.serverless.com) on the machine from where the backend should be deployed. Also, you'll need to have your AWS credentials setup accordingly. 

If it's present, you can use a single command to deploy the example stack:

```bash
$ sls deploy
```

The example for a wrapped AWS Lambda function handler can be found at [functions/test.js](example/functions/test.js).
