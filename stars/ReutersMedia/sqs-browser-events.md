---
repo: ReutersMedia/sqs-browser-events
url: 'https://github.com/ReutersMedia/sqs-browser-events'
homepage: null
starredAt: '2017-12-21T20:40:53Z'
createdAt: '2017-03-30T13:53:22Z'
updatedAt: '2024-12-31T21:45:22Z'
language: Python
license: MIT
branch: master
stars: 65
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:33.654Z'
description: 'Serverless long-polling via AWS SQS, Lambda, and Cognito'
tags: []
---


## Overview

NOTE: AWS in Dec 2018 released WebSocket support for their API Gateway.  This offers another pattern for serverless WebSocket implementation, as an alternative to per-user SQS queues and Cognito for identity management.

One challenge with serverless architectures is supporting event-driven browser experiences.  This package provides a solution by using AWS SQS and Lambda functions, and Cognito for creating temporary unauthorized sessions.  Typical use would be a backend system that creates a new session upon login, and passes an SQS Queue URL and a pair of AWS auth keys to the browser, and the browser then polls SQS for events.  A dispatcher API and Kinesis input stream is used to generate and dispatch events to the queues.

To accomodate high-volume messaging, the dispatcher (EventDispatcher) is kept lightweight and does not send to the SQS queues, it only looks up message targets and dispatches to two other Lambdas that send to the SQS Queues and to DynamoDB for addition to the user history, invoking them asynchronously.  The Lambda polling Kinesis is process-limited to the number of shards, but the SQSSender and UserHistoryAdder Lambdas has no such constraint and can scale out.  To increase the number of EventDispatcher processes, increase the number of shards and partition intelligently.

The SQSSender and UserHistoryAdder Lambdas are spearated to insulate against DB write throttling, in which case only the addition to user history will be impacted, and messages will be queued as quickly as possible.


## Principles

Your backend application should generally create the session for the user and share SQS access information, and then generate messages as needed.

```
 [Application]
    /create
        -> cognito - get_id
        -> cognito - get_credentials
        -> sqs - create_queue, attaching a per-queue policy permissioning the cognito user
    send sqsUrl, credentials, and expiration time to brower

 [Browser]
    sqs - long-poll for new messages
    /user-messages - retrieving history of messages for a user

 [Message Generator]
    /notify
    kinesis
```

For the `/create` method, you should supply an account ID and a session ID.  The account ID is used to partition the DynamoDB queue table, and support broadcast of messages to all logged in users for an account.  The session ID should be unique across all login sessions, as each client needs their own SQS queue.  The Session ID should be a string no longer than 256 characters.

The Cognito credentials expire after serveral hours, and periodically need to be renewed.  The client therefore needs to know the expiration time and request a refresh of the credentials.  The Cognito user also expires after several days without use.  The SQS Queues however need to be managed and cleaned up once they are no longer in use.  To facilitate this, a `ttl` field is set on each session table entry.  TTL Management should be turned on for the table, using the field `ttl`.  This has to be done manually, as the CloudFormation template does not support configuring TTL management.  The SessionUpdateProcessor lambda function listens on the event stream from the Session table, looks for SQS Urls that are no longer in use, and deletes them.

A message can optionally provide a `messageId` field, which will be used as part of the primary key in the DynamoDB table that stores user messages.  If one is not provided, a hash of the Kinesis eventID will be used for stream events, or a hash of the timestamp and the message in the case of events posted via the API Gateway.

## Message Encryption and Privacy

All messages are encrypted with AES using the counter mode of operation.  You will need to base-64 decode the AES key returned by the session creation call, and parse the SQS Body into a counter initialization value, and a message payload, as shown below.  Split the SQS message on the first pipe '|', and the first number is the initialization value for the counter, the second part is the base-64 encoded message digest.

An example of decrypting the message in Python, using [pyaes](https://github.com/ricmoo/pyaes):

```
>>> import pyaes
>>> import base64
>>> aes_key_b64 = "LkWUsGQKi8E9QoMJEeY1HLL8rdJNJr3fzDp+F9CpkCY="
>>> msg_b64 = "nw7xCnVR0m/YrGgG"
>>> init_ctr = 9734675727
>>> ctr = pyaes.Counter(initial_value=init_ctr)
>>> aes = pyaes.AESModeOfOperationCTR(base64.b64decode(aes_key_b64),counter=ctr)
>>> print(aes.decrypt(base64.b64decode(msg_b64)))
this is a test
```

An example browser-side with Javascript, using [aes-js](https://github.com/ricmoo/aes-js).  Note that the counter initialization needs to be converted into an array, as the initialization values generated by this package exceed the 32-bit limit of aes-js when passed an integer.  The counter state is represented by a 16-byte array.

```
stringToByteArray = function(str) {
    var output = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        while (c > 0xff) {
            output[p++] = c & 0xff;
            c >>= 8;
        }
        output[p++] = c;
    }
    return output;
};

longToByteArray = function(/*long*/long) {
    var byteArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = long & 0xff;
        byteArray [ 15-index ] = byte;
        long = (long - byte) / 256 ;
    }
    return byteArray;
};

var aesKey = stringToByteArray(atob("LkWUsGQKi8E9QoMJEeY1HLL8rdJNJr3fzDp+F9CpkCY="));
var encryptedBytes = stringToByteArray(atob("nw7xCnVR0m/YrGgG"));
var ctrInit = longToByteArray(9734675727);

var aesCtr = new aesjs.ModeOfOperation.ctr(aesKey, new aesjs.Counter(ctrInit));
var decryptedBytes = aesCtr.decrypt(encryptedBytes);
var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

console.log(decryptedText);

output: this is test
```

It is not practical to limit access of an SQS queue to a specific Cognito user.  If a third party can guess the ID of a user, and then guess the URL of an SQS endpoint, they have access to the SQS queue.  However these IDs and URLs are generated using a cryptographic hash, and so are not predictable.  The encryption key ensures that only the holder of the encryption key can decrypt the message.  This is a sufficient security model for most but not all use cases. 


## Session Manager API

In the API calls below, the accountId must be an integer, and sessionId must be a string with length less than 256 characters.  For the create, renew, and status endpoints, the response will contain session descriptions of the form given below.  The expiration time is for the access key and will be several hours in the future.  These access keys can be renewed periodically by calling the `renew` endpoint.  The session manager API requires IAM authentication.  The AES key will be base-64 encoded.

```
   {
      "sqsUrl": "https://eu-west-1.queue.amazonaws.com/XXXXXX/kentest1-brws-KLK0dJ6AN9USg6CAx8FXVk52G2M",
      "sqsQueueName": "kentest1-brws-XXXXXXX",
      "accessKey": "XXXX",
      "expires": 1490867032,
      "identityId": "eu-west-1:bfb4c749-4c0e-446a-892e-defd9b01bed0",
      "secretKey": "XXXX",
      "sessionToken": "XXXXX",
      "sessionId": "abc",
      "accountId": 2,
      "aesKey": "xxxxxxx"
   }
```

* `/create/[accountId]/[sessionId]`: Creates a new session, or refreshes the given account and session (invalidating any existing keys).
* `/create/[accountId]/[sessionId]/[userId]`: Creates a new session as above, but also associates a userID with it, to facilitate dispatching events on a per-user basis.
* `/destroy/[accountId]/[sessionId]`: Destroys a session and it's SQS queue.  Note that simply abandoning a session will result in removal of the queue and temporary user automatically, so this is nice but not required.
* `/renew/[accountId]/[sessionId]`: Obtain a new access key for a given session.
* `/status/[accountId]/[sessionId]`: Return the status (sqs queue URL and access keys) of a given session, if it is still active.
* `/status`: Return list of all active sessions.
* `/cleanup`: Identity unused queues and remove them

Typically you will `create` a session when a user logs in, generating a session ID, and `renew` it periodically as the access key approaches expiration.  The `/create` methods also accept a `MessageRetentionPeriod` period, which is used to set the message retention period when creating the SQS queue.


## Dispatching Messages

Messages can be dispatched via Kinesis by posting JSON objects to the stream.  The Kinesis stream name is [ENV]-sqs-browser-event-dispatcher.  The entire JSON object is passed, and three fields are used for routing to the SQS queues by filtering against values set during session creation:

* `accountId`: optional, must be an integer
* `sessionId`: optional, must be a string
* `userId`: optional, must be an integer

If none of the above keys are present, the message will be dispatched to ALL users.  Messages can also be submitted via an API Gateway, which requires IAM authentication.  

* `/notify`: Post message to all queues
* `/notify/[accountId]`: Post message to all users associated with the account
* `/notify/[accountId]/user/[userId]`: Post to all sessions for a user
* `/notify/[accountId]/user/[userId]/session/[sessionId]`: Post to a specific session for a user

Each of these accepts query string parameters, and are used to construct the message.  For example:

`/notify/12345?msg=Hello+World`

Will send the folling JSON to every queue associated with the given account ID.

```
   {
      "accountId": 12345,
      "msg": "Hello World"
   }
```

Optionally a `_sqs_only` field can be set in the message, and if the field is present, the message will be sent to any SQS queues, but not posted to the user history.  This allows posting of epheremeral messages that need not appear in the user's history when they reconnect.

## Requesting and Receipting User Messages

In some cases it is useful to retrieve the message history for a user, for example when they are logging after being absent for some time.  Messages will accumulate depending on the USER_MESSAGE_TTL parameter set in serverless, by default 24 hours.  When messages are dispatched, a list of unique userIDs receiving the message is compiled, and those messages are put into a notification history table in DynamoDB.  If a user has several active sessions, the message is inserted for that userId only once.  A user's messages can be retrieved and read-receipted using an API Gateway authenticated by IAM.  

* `/messages/user/[userId]` (GET): retrieve messages for a user, optionally accepting a `start` and/or and `end` parameter in epoch seconds.  If a message has been read-receipted, an `is_read` parameter will be present and equal to 1, otherwise it will be present and equal to 0.
* `/messages/set-read/user/[userId]/message/[messageId]` (GET): set a message as read.  This updates the 'is_read' parameter to 1 from its initial value of 0.  The messageId can be a comma-delimited list of IDs for the same user.  
* `/messages/set-read/user/[userId]/asof/[timestamp]` (GET): set all messages as of the given timestamp in Epoch seconds to read.  This updates the 'is_read' parameter to 1 from its initial value of 0.  The messageId can be a comma-delimited list of IDs for the same user.
* `/messages/set-read/user/[userId]` (POST): set a collection of message as read.  The body should be a JSON-encoded list of messageIds.  This updates the 'is_read' parameter to 1 from its initial value of 0.  The messageId can be a comma-delimited list of IDs for the same user.

Read receipts themselves generate SQS queue messages, with a list of messageID's as the body, as shown below.  These read-receipt messages are only posted to SQS, and not to the user history.  This allows updating the read-status of other sessions for the connected user.

Both of the read-receipt endpoints also accept an "async" query parameter.  If it is present, updating the database with the read receipt will be performed asynchronously, usually visible within a few seconds.  This is useful when receipting a large number of messages.  The database updates will be batched into groups of 300 message IDs.

```
{
    _type: "message-read-receipt",
    userId: 59210235,
    messages-receipted: ["ABC0001","ABC0002","ABC0003"],
    _sqs_only: 1
}
```
    


## Deploying

Deployment requires installation of serverless (http://serverless.com), and this project was built with version 1.9.  After deployment, you should also turn on TTL Management for the Session table, using the `ttl` field.  This is necessary for automatic cleanup of unused SQS queues and Cognito identities, and can't be done via CloudFormation at this time.

```
aws dynamodb update-time-to-live --table-name [ENV]-sqs-browser-sessions --time-to-live-specification "Enabled=true, AttributeName=ttl"
```

The stack also needs a Cognito user pool.  One identity pool however can be shared by a number of stacks.  By default the serverless.yml file will use the pool name "sqs_browser", but this can overridden with a "--poolname" argument. 


Deployments require an environment name and a region.  For example:

```
# serverless deploy --env prod --region eu-west-1
```

You can also specify a Cognito pool name, and a version tag:

```
# serverless deploy --env prod --region eu-west-1 --poolname my-cognito-pool --version 1.0.5
```

## Testing

Test scripts are in ./test.  To configure, you need to set an environment name and a region in your environment.  For example, if you are running an environment `dev` in us-east-1:

```
$ export SLS_ENV=dev1
$ export SLS_REGION=us-east-1
```

The test_high_volume.py script can be used for load testing, and will need more than the default number of kinesis shards to support rapid delivery.

To clean up after testing, run `remove_all [env-label]`.

## Credits

Thanks to Dan Heidebrecht for original idea.
