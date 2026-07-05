---
repo: JaredPh/cognito-export-users
url: 'https://github.com/JaredPh/cognito-export-users'
homepage: null
starredAt: '2020-03-23T23:03:07Z'
createdAt: '2018-06-03T22:16:11Z'
updatedAt: '2023-06-22T20:19:14Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:01.048Z'
description: CLI for exporting AWS Cogntito Users
tags: []
---

# cognito-export-users

## Install
```
npm install -g cognito-export-users
```

## Usage
```
cognito-export-users <user-pool-id> <options>
    
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY can be specified in env variables or ~/.aws/credentials

Options
  --file File name to export/import single pool users to (defaults to user-pool-id.json)
  --dir Path to export all pools, all users to (defaults to current dir)
      
```

## Examples
```
cognito-export-users eu-west-1_1_12345
cognito-export-users eu-west-1_1_12345 --file mypool.json
cognito-export-users eu-west-1_1_12345 --dir output
```

