---
repo: cloudflare/workers-aws-template
url: 'https://github.com/cloudflare/workers-aws-template'
homepage: ''
starredAt: '2021-04-10T01:10:56Z'
createdAt: '2020-10-07T16:14:05Z'
updatedAt: '2024-12-17T02:21:05Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 124
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:51.563Z'
description: >-
  Cloudflare Workers template for accessing AWS services such as DynamoDB and
  SQS
tags: []
---

# Using AWS from Cloudflare Workers

This is a template for using Amazon Web Services such as DynamoDB and SQS from a Cloudflare Worker.

This project is not related to, affiliated with, sponsored or endorsed by Amazon Web Services.

### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate projectname https://github.com/cloudflare/workers-aws-template
cd projectname
```

[`index.js`](https://github.com/cloudflare/workers-aws-template/blob/master/index.js) is the content of the Workers script. In handleRequest, uncomment the example for the service you want to try out.

You'll need to use wrangler secrets to add appropriate values for `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, plus any of the service specific secrets, e.g.

```
wrangler secret put AWS_ACCESS_KEY_ID
wrangler secret put AWS_SECRET_ACCESS_KEY
wrangler secret put AWS_AURORA_SECRET_ARN
wrangler secret put AWS_SQS_QUEUE_URL
```

Configuration of less sensitive values such as AWS_REGION can be done in wrangler.toml vars if you'd prefer.

After that you can use `wrangler publish` as normal. See the [wrangler documentation](https://developers.cloudflare.com/workers/cli-wrangler) for more information.

### AWS Resources

This template pieces together a few AWS products:

* [SQS Queue](https://console.aws.amazon.com/sqs/v2/home?region=us-west-2#/create-queue)
* [DynamoDB table](https://console.aws.amazon.com/dynamodb/home?region=us-west-2#create-table:)
* [Aurora RDS (**serverless**)](https://console.aws.amazon.com/rds/home?region=us-west-2#launch-dbinstance:gdb=false;s3-import=false)<br>_**Important:** You must enable "Data API" under the **Connectivity** settings._<br>_**Note:** You will need [Secrets Manager](https://us-west-2.console.aws.amazon.com/secretsmanager/home) for the RDS credentials._

The Aurora RDS example assumes the following SQL structure:

```mysql
CREATE DATABASE demo;

CREATE TABLE demo.friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB;
```

With this, you may insert new `demo.friends` values by submitting a `POST` request with JSON data:

```sh
$ curl -X POST https://<worker> -d '{"name":"alice"}'
$ curl -X POST https://<worker> -d '{"name":"bob"}'
$ curl -X POST https://<worker> -d '{"name":"carl"}'
```

And then you may retrieve a single `demo.friends` row by sending a `GET` request with an `ID` parameter:

```sh
$ curl https://<worker>?ID=1
#=> [[{"longValue":1},{"stringValue":"alice"},{"stringValue":"YYYY-MM-DD HH:mm:ss"}]]

$ curl https://<worker>?ID=2
#=> [[{"longValue":2},{"stringValue":"bob"},{"stringValue":"YYYY-MM-DD HH:mm:ss"}]]
```

### AWS SDK for JavaScript

These examples use [v3 of the AWS SDK for JavaScript](https://github.com/aws/aws-sdk-js-v3), see that repository for more information.
