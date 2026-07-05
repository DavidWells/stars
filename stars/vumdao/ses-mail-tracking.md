---
repo: vumdao/ses-mail-tracking
url: 'https://github.com/vumdao/ses-mail-tracking'
homepage: null
starredAt: '2022-05-30T17:36:26Z'
createdAt: '2021-04-06T06:26:43Z'
updatedAt: '2022-12-07T15:58:15Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:45.369Z'
description: null
tags: []
---

<p align="center">
  <a href="https://dev.to/vumdao">
    <img alt="SES Email Tracking" src="https://github.com/vumdao/ses-mail-tracking/blob/master/cover.png?raw=true" width="700" />
  </a>
</p>
<h1 align="center">
  <div><b>SES Email Tracking</b></div>
</h1>

**1. Email tracking gives us the power to build and maintain relationships in this exceedingly crowded, competitive inbox environment And tracking bounced emails, this will be useful for us to track our bounce rate, and monitor our future campaigns in order to get the lowest bounce rate possible and have your emails correctly delivered.**

**2. Definition and causes of bounces: A bounce (or bounced email) refers to the situation where your email is rejected by your subscriber's email server.**
- Soft bounce: This is a temporary issue. The reasons are the following:
    - Your recipients' mailbox and/or your own inbox are full
    - Your email message is too large and too heavy
    - Your recipients' email server is down or offline
    - A connection timeout occurred when Gmail tried to deliver your email
- Hard bounce: This is a permanent issue. The reasons are the following:
    - Your recipients' email address does not exist (anymore)
    - The domains do not exist (anymore)
    - Your recipients' email server has completely blocked email deliveries

## What’s In This Document 
- [Setup Amazon SES to send detailed notifications about your bounces, complaints, and deliveries](#-Setup-Amazon-SES-to-send-detailed-notifications-about-your-bounces,-complaints,-and-deliveries)
- [Create the SNS to send message to lambda function](#-Create-the-SNS-to-send-message-to-lambda-function)
- [Create lambda function which store SES notification to Dynamodb](#-Create-lambda-function-which-store-SES-notification-to-Dynamodb)
- [Query Bounce Email By Using AWS CLI](#-Query-Bounce-Email-By-Using-AWS-CLI)

---

### 🚀 **Setup Amazon SES to send detailed notifications about your bounces, complaints, and deliveries**
![Alt-Text](https://github.com/vumdao/ses-mail-tracking/blob/master/enable_ses_sns.png?raw=true)

### 🚀 **Create the SNS to send message to lambda function**
![Alt-Text](https://github.com/vumdao/ses-mail-tracking/blob/master/sns_to_lambda.png?raw=true)

### 🚀 **Create lambda function which store SES notification to Dynamodb**
```
'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();
let tableName = 'ses-mailing';

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const message = JSON.parse(event.Records[0].Sns.Message);
    
    var eventType = message.eventType;
    if (eventType == undefined) {
        eventType = message.notificationType;
    }
    switch(eventType) {
        case "Bounce":
            handleBounce(message);
            break;
        case "Complaint":
            handleComplaint(message);
            break;
        case "Send":
            handleDelivery(message);
            break;
        case "Delivery":
            handleDelivery(message);
            break;
            
        case "Open":
            handleOpen(message);
            break;
            
        default:
            callback("Unknown notification type: " + message.notificationType);
    }
};

function handleBounce(message) {
    const messageId = message.mail.messageId;
    const addresses = message.bounce.bouncedRecipients.map(function(recipient){
        return recipient.emailAddress;
    });
    const bounceType = message.bounce.bounceType;

    console.log("Message " + messageId + " bounced when sending to " + addresses.join(", ") + ". Bounce type: " + bounceType);

    for (var i=0; i<addresses.length; i++){
        writeDDB(addresses[i], message, tableName, "disable");
    }
}

function handleComplaint(message) {
    const messageId = message.mail.messageId;
    const addresses = message.complaint.complainedRecipients.map(function(recipient){
        return recipient.emailAddress;
    });

    console.log("A complaint was reported by " + addresses.join(", ") + " for message " + messageId + ".");

    for (var i=0; i<addresses.length; i++){
        writeDDB(addresses[i], message, tableName, "disable");
    }
}

function handleDelivery(message) {
    const messageId = message.mail.messageId;
    const deliveryTimestamp = message.mail.timestamp;
    const addresses = message.mail.destination;
    console.log("Message " + messageId + " was delivered successfully at " + deliveryTimestamp + ".");

    for (var i=0; i<addresses.length; i++){
        writeDDB(addresses[i], message, tableName, "enable");
    }
}
function handleOpen(message) {
    const messageId = message.mail.messageId;
    const deliveryTimestamp = message.open.timestamp;
    const addresses = message.mail.destination;
    console.log("Message " + messageId + " was opened at " + deliveryTimestamp + ".");

    for (var i=0; i<addresses.length; i++){
        writeDDB(addresses[i], message, tableName, "enable");
    }
}

function writeDDB(id, payload, tableName, status) {
    const tags = payload.mail.tags;
    var configuration_set = null;
    var source_ip = null;
    var from_domain = null;
    var tenant = null;
    
    if (tags != undefined ) {
        console.log('Received tags:', JSON.stringify(tags, null, 2));
        if ('ses:configuration-set' in tags) {
            configuration_set = tags['ses:configuration-set'].join(',');
        }
        if ('ses:source-ip' in tags) {
            source_ip = tags['ses:source-ip'].join(',');
        }
        if ('ses:from-domain' in tags) {
            from_domain = tags['ses:from-domain'].join(',');
        }
        if ('tenant' in tags) {
            tenant = tags['tenant'].join(',');
        }
            
    }

    var eventType = payload.eventType;
    if (eventType == undefined) {
        eventType = payload.notificationType;
    }

    const item = {
            UserId: id,
            eventType: eventType,
            from: payload.mail.source,
            messageId: payload.mail.messageId,
            timestamp: payload.mail.timestamp,
            state: status,
            configuration_set: configuration_set,
            source_ip: source_ip,
            from_domain: from_domain,
            tenant: tenant
        };
    const params = {
            TableName:tableName,
            Item: item
        };
    dynamo.putItem(params,function(err,data){
            if (err) console.log(err);
            else console.log(data);
    });
}
```

DDB Result - Partition key| Sort key | Global secondary indexes
![Alt-text](https://github.com/vumdao/ses-mail-tracking/blob/master/example_ddb.png?raw=true)
![Alt-text](https://github.com/vumdao/ses-mail-tracking/blob/master/ddb_index.png?raw=true)

### Query Bounce Email By Using AWS CLI
1. Use dynamodb query
```
aws --region=us-east-1 dynamodb query --select ALL_ATTRIBUTES --table-name ses-mailing --index-name eventType-timestamp-index --key-condition-expression "eventType = :e and #timestamp >= :t" --expression-attribute-names '{ "#timestamp": "timestamp"}' --expression-attribute-values  '{":e":{"S":"Bounce"}, ":t": {"S": "2021-04-04"}}' > mail-bounce.json
cat mail-bounce.json | jq  -r '.Items[] | [.from.S, .UserId.S, .timestamp.S] | @csv ' > mail-bounce.csv
```
2. Use dynamodb execute-statement
```
aws dynamodb execute-statement --statement "SELECT * FROM \"ses-mailing\".\"eventType-timestamp-index\" WHERE \"eventType\" = 'Bounce' AND \"timestamp\" >= '2021-04-05'" --region us-east-1 > ses.json
cat ses.json | jq -r '.Items[] | [([.UserId.S, .from.S, .timestamp.S] | join(","))] | @csv' | sort -r > bounce.list
```

### Refs
- Sending email using the Amazon SES SMTP Interface with adding `CONFIGURATION_SET`
https://docs.aws.amazon.com/ses/latest/DeveloperGuide/examples-send-using-smtp.html

---

<h3 align="center">
  <a href="https://dev.to/vumdao">:stars: Blog</a>
  <span> · </span>
  <a href="https://github.com/vumdao/">Github</a>
  <span> · </span>
  <a href="https://vumdao.hashnode.dev/">Web</a>
  <span> · </span>
  <a href="https://www.linkedin.com/in/vu-dao-9280ab43/">Linkedin</a>
  <span> · </span>
  <a href="https://www.linkedin.com/groups/12488649/">Group</a>
  <span> · </span>
  <a href="https://www.facebook.com/CloudOpz-104917804863956">Page</a>
  <span> · </span>
  <a href="https://twitter.com/VuDao81124667">Twitter :stars:</a>
</h3>
