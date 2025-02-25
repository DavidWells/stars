---
repo: alessandrobologna/parameter-store-replicator
url: 'https://github.com/alessandrobologna/parameter-store-replicator'
homepage: null
starredAt: '2018-08-21T21:37:06Z'
createdAt: '2018-07-22T18:17:58Z'
updatedAt: '2025-01-28T04:20:51Z'
language: JavaScript
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:15.653Z'
description: AWS System Manager Parameter Store cross region replicator
tags: []
---

# parameter-store-replicator
AWS System Manager Parameter Store cross region replicator

### What is this
This is a sample Lambda to replicate the variables stored in [AWS System Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html) across different regions, in the same account. 
It listes to CloudWatch events, and when a parameter is updated, it tries to replicate it to another target region as defined during deployment of the Lambda function. 
It supports two way replication, so you can deploy the same lambda in, say `us-east-1` and `us-west-2` specifying the other region as a replication target.

### Installing it
The project depends on the [serverless framework](https://serverless.com/), so you will want to install that first:

```bash
$ npm install -g serverless
```

After you have it installed, just deploy your function to the main region, specifying as target the replication region. For instance, to replicate from `us-east-1` to `us-west-2`:

```bash
$ sls deploy --region us-east-1  --target=us-west-2
```

You can establish two way replication by deploying the same lambda to the target region:

```bash
$ sls deploy --region us-west-2  --target=us-east-1
```

If you are using two way replication, there's logic in place to avoid the "ping pong" effect, where a region replicating to another causes the replication to happen in the other direction. Currenlty, the logic is just based on value and type for a given parameter. If they already exist in the target region, and their value match, replication is not performed.

### Testing it
Just deploy the code, as described above, and run 
```bash
$ aws ssm put-parameter --name "/root/test4" --value "test6" --type "String" --overwrite --region us-east-1
```

After a few seconds, you should be able to do (results included):
```bash
$ aws ssm get-parameter --name "/root/test4" --region us-east-1
{
    "Parameter": {
        "Version": 65, 
        "Type": "String", 
        "Name": "/root/test4", 
        "Value": "test6"
    }
}

$ aws ssm get-parameter --name "/root/test4" --region us-west-2
{
    "Parameter": {
        "Version": 14, 
        "Type": "String", 
        "Name": "/root/test4", 
        "Value": "test6"
    }
```
