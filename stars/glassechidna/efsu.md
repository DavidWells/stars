---
repo: glassechidna/efsu
url: 'https://github.com/glassechidna/efsu'
homepage: ''
starredAt: '2021-06-21T19:26:47Z'
createdAt: '2021-06-21T01:50:02Z'
updatedAt: '2022-03-11T13:18:44Z'
language: Go
license: NA
branch: main
stars: 42
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:33.110Z'
description: efsu is for accessing AWS EFS from your machine without a VPN
tags:
  - aws
  - aws-efs
  - efs
---

# `efsu`: VPN-less access to AWS EFS

`efsu` is for accessing AWS EFS from your machine without a VPN. It achieves this
by deploying a Lambda function and shuttling data between your machine and EFS
via that function.

## Getting started

* Mac: `brew install glassechidna/taps/efsu`
* Windows: `scoop bucket add glassechidna https://github.com/glassechidna/scoop-bucket.git; scoop install efsu`
* Otherwise get the latest build from the [Releases][releases] tab.

Next, run the first-time setup. This will deploy the Lambda function that your 
local CLI will communicate with:

```shell
efsu setup \
--subnet-id subnet-abc0123 \
--security-group-id sg-abc0123 \
--access-point-arn arn:aws:elasticfilesystem:us-east-1:0123456789012:access-point/fsap-01234aEXAMPLE
```

Now you're ready to go!

## Usage

    % efsu ls -R /mnt/efs

`ls` will list files in EFS. The `-R` flag will recursively list files in all 
subdirectories.

    % efsu cp /mnt/file.txt .

`cp` will copy files from EFS to your machine. **NOTE**: Currently only copying
*one* file *from* EFS is supported.

## TODO

* `cp -R` recursive copies
* `mkdir [-p]`
* `rm [-r]`
* Get feedback
