---
repo: awslabs/awscli-aliases
url: 'https://github.com/awslabs/awscli-aliases'
homepage: null
starredAt: '2018-12-12T06:20:46Z'
createdAt: '2016-11-25T22:13:56Z'
updatedAt: '2025-02-07T09:29:22Z'
language: null
license: MIT-0
branch: master
stars: 477
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:57.513Z'
description: Repository for AWS CLI aliases.
tags: []
---

# awscli-aliases
Repository for AWS CLI aliases.

## Requirements

Make sure that you are using version ``1.11.24`` or higher of the AWS CLI.
You can determine the version by running:
```
$ aws --version
```

For information on installation and upgrading of the AWS CLI, please refer
to the [AWS CLI User Guide](http://docs.aws.amazon.com/cli/latest/userguide/installing.html).


## Quickstart

To start using aliases available in this repository, run the following
commands:

Note that running the commands below **will** delete any existing alias
file you may have had:

```
$ git clone https://github.com/awslabs/awscli-aliases.git
$ mkdir -p ~/.aws/cli
$ cp awscli-aliases/alias ~/.aws/cli/alias
```

To test that the aliases now work, run the following alias:
```
aws whoami
```

This will display the same response as the ``aws sts get-caller-identity``
command:
```
{
    "Account": "012345678901",
    "UserId": "AIUAINBADX2VEG2TC6HD6",
    "Arn": "arn:aws:iam::012345678901:user/myuser"
}
```

## Dependencies

### tostring alias
The tostring alias requires to have the jp command installed.  
For installing the command line interface for JMESPath (jp), please see the README.md at https://github.com/jmespath/jp

### tostring-with-jq alias
The tostring-with-jq alias requires to have the jq command installed.  
For installing the Command-line JSON processor (jq), please see this page: https://stedolan.github.io/jq/download/
