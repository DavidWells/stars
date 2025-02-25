---
repo: stevecrozz/serverless-ddns-route53
url: 'https://github.com/stevecrozz/serverless-ddns-route53'
homepage: null
starredAt: '2016-11-27T09:38:00Z'
createdAt: '2016-07-09T00:36:33Z'
updatedAt: '2020-11-29T05:40:58Z'
language: JavaScript
license: BSD-3-Clause
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:14.103Z'
description: DDNS service for Route53 via Serverless and AWS Lambda
tags: []
---

# Serverless Route53 DDNS Service

This is a [serverless](https://github.com/serverless/serverless) service that
provides DDNS functionality for AWS Route53.

Serverless v1 does [not yet support environment
variables](https://github.com/serverless/serverless/issues/1455), so this
service is not yet secure. Anyone with the right non-secret URL could use it to
update your Dynamic DNS entries.

To use it, you need a Route53 hosted zone and an IAM role with access to update
it. This policy works:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1468016031000",
      "Effect": "Allow",
      "Action": [
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": [
        "arn:aws:route53:::hostedzone/ABCZONEID"
      ]
    }
  ]
}
```

Then all you need is a system on dynamic IP network to periodically call the
function to update it. A cron job works fine for me:

```sh
30 * * * * /opt/bin/curl -q https://97r5k1bsn4.execute-api.us-east-1.amazonaws.com/dev/update?name=my.name.com&hosted_zone_id=ABCZONEID 2>&1 > /dev/null
```
