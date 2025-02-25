---
repo: trek10inc/serverless-cloudformation-parameter-setter
url: 'https://github.com/trek10inc/serverless-cloudformation-parameter-setter'
homepage: null
starredAt: '2018-01-16T23:01:19Z'
createdAt: '2018-01-04T18:36:00Z'
updatedAt: '2023-12-08T14:01:30Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:30.036Z'
description: Set cloudformation parameters when deploying using serverless framework
tags: []
---

# serverless-cloudformation-parameter-setter
[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Serverless framework plugin to set CloudFormation Parameters when deploying

## Installation

Install the plugin from npm

```bash
$ npm install --save serverless-cloudformation-parameter-setter
```

Add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - serverless-cloudformation-parameter-setter
```

## Usage
#### CLI options
None

#### YAML settings
```yaml
custom:
  cf-parameters:
    secretPassword: whatever # this could be serverless ssm variable or s3 variable or plaintext or whatever, do what you want

resources:
  # define the cloudformation parameters here
  Parameters:
    secretPassword:
      Type: string
      Description: database password
      NoEcho: true # keep it secret, keep it safe
  # use the parameters here
  Resources:
    TheDatabase:
      Type: AWS::RDS::DBInstance
      Properties:
        Engine: MySQL
        DBInstanceIdentifier: MySQL
        DBName: MySQL
        MultiAZ: true
        PubliclyAccessible: true
        MasterUsername: root
        MasterUserPassword: { Ref: secretPassword } # you can also send this to a lambda's env var
        DBInstanceClass: db.t2.large
        AllocatedStorage: 100
        DBSubnetGroupName:
          Ref: DBSubnetGroup # not included in this example
        VPCSecurityGroups:
          - Ref: DBSecurityGroup # not included in this example
```

