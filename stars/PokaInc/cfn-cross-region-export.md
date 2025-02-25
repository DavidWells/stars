---
repo: PokaInc/cfn-cross-region-export
url: 'https://github.com/PokaInc/cfn-cross-region-export'
homepage: ''
starredAt: '2024-01-25T20:41:50Z'
createdAt: '2018-04-26T01:17:15Z'
updatedAt: '2024-10-02T14:24:30Z'
language: Python
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:38.281Z'
description: 'Like Fn::ImportValue, but cross-region.'
tags:
  - infra
---

# cfn-cross-region-export

### The problem

When you're building a multi-region infrastructure using _CloudFormation_, you're often faced with the problem of 
linking resources from a region to another. For example, if you've created a _Route53_ hosted zone for your main domain 
using a stack in the _us-east-1_ region but you want to create a DNS record from a stack in the _ca-central-1_ region, 
you'll need to have access to the `HostedZoneId`.  Usually, if both stacks were in the same region you could to a simple
`Fn::ImportValue` but this isn't going to work this time since this function does not support cross-region referencing.
As a workaround, you could decide to use a CloudFormation parameter but this limits the automation that can be done as 
it requires a manual intervention.

### The solution

In a nutshell this project shares the same features as `Fn::ImportValue` but allows values to be imported from other 
regions of the same account.

### The implementation

The project is divided in 2 parts; the **Exporter** and the **Importer**. Only one **Exporter** stack is needed per 
region you want outputs to be imported from. The **Importer** stack on the other hand, need to be instantiated for each 
region you want to import outputs from.

Here's an example use-case:
Let's say you are creating some resources in the _ca-central-1_ region and you need to import values from the
_us-east-1_ and _eu-west-1_ regions. You'll need to first provision the **Exporter** stack in both _us-east-1_ and 
_eu-west-1_ region. You'll then have to provision 2 **Importer** stacks in the _ca-central-1_ region, each targeting a 
specific region.

### Usage 

```
Resources: 
  Importer:
    Type: Custom::CrossRegionImporter
    Properties:
      ServiceToken: !ImportValue 'us-east-1:CrossRegionImporterServiceToken'
      Exports:
        Xyz: 'xyz-export-name'
      
  TestImport:
    Type: AWS::SSM::Parameter
    Properties:
      Type: String
      Value: !GetAtt Importer.Xyz

```

### Installation

#### _Important info_

If you were using this project in the release v0.1 and before, you need to run the dynamodb key migration script 
located in `migration-script/migrate_dynamo_keys.py`. 
Doing this will migrate rows with the old naming to the new naming.

**To run this script** you will need to have at least a **read** access to CloudFormation and a **read/write** access 
to the DynamoDB table. the following environment variable also need to be set:

`export CROSS_STACK_REF_TABLE_ARN=<THE DYNAMODB TABLE ARN>`

#### Exporter

Start by deploying the **Exporter**

```
export AWS_DEFAULT_REGION=<EXPORTER_REGION>
make deploy-exporter SENTRY_ENV=prod SENTRY_DSN=https://...@sentry.io/... 
```

#### Importer

You can find the `CROSS_STACK_REF_TABLE_ARN` in the output section of the **Exporter** stack we've just deployed.

```
export AWS_DEFAULT_REGION=<IMPORTER_REGION>
make deploy-importer CROSS_STACK_REF_TABLE_ARN=...
```

### Development

#### Exporter

Create a DynamoDB table. The python script for the **Exporter** can be ran locally like so: 

```
export SENTRY_DSN=<A SENTRY DSN>
export SENTRY_ENV=<dev|stage|prod|...>
export GENERATED_STACK_NAME='dev-ImportsReplication'
export CROSS_STACK_REF_TABLE_NAME=<THE DYNAMODB TABLE NAME>
python3 exporter/lambda/cross_region_import_replication.py
```

Just make sure you have these permissions attached to your IAM user (or role):

```
dynamodb:Scan
cloudformation:CreateStack
cloudformation:UpdateStack
ssm:PutParameter
ssm:DeleteParameter
```

#### Importer

Since the script `importer/lambda/cross_region_importer.py` is expecting to be called in the context of a  
_CloudFormation_ custom resource, I suggest to test your modifications using trials and errors. Which means that you 
edit the script and then deploy it using the method described in the **Installation** section. You can leverage
_CloudWatch_ to help you with the debugging. 


### TODO

* Support cross-account imports (using assume-role it should be fairly easy to do)
* Make the `SentryDsn` parameter optional
