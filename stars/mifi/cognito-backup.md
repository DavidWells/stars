---
repo: mifi/cognito-backup
url: 'https://github.com/mifi/cognito-backup'
homepage: null
starredAt: '2024-08-04T19:23:06Z'
createdAt: '2016-11-01T13:09:44Z'
updatedAt: '2025-02-08T06:10:06Z'
language: JavaScript
license: MIT
branch: master
stars: 156
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:27.033Z'
description: CLI for backing up AWS Cogntito User Pools
tags:
  - aws
  - aws-cognito
  - backup
  - cloud
  - cognito-backup
  - user-pool
  - user-pools
---

# cognito-backup 👫→💾
Amazon doesn't have any way of backing up their AWS Cognito User Pools and Groups.
So in my frustrating times working with AWS Cognito, I wrote this tool. `cognito-backup` is a simple CLI for backing up the user data, and can also restore afterwards. <b>Note: AWS has no way of extracting the passwords of your users so you need to store these separately 😵</b>

## Requirements

Requires node 12 or newer

## Install
```
npm install -g cognito-backup
```

## Usage
Backup all users in a single user pool:  
`cognito-backup backup-users <user-pool-id> <options>`

Backup all users in all user pools for this account:  
`cognito-backup backup-all-users <options>`

Restore users to a single user pool:   
`cognito-backup restore-users <user-pool-id> <temp-password>`

Backup/export all groups in a single user pool:
`cognito-backup backup-groups <user-pool-id> <options>`

Restore/import groups to a single user pool (Note: run this *before* restoring users)
`cognito-backup restore-groups <user-pool-id> <options>`

Run `cognito-backup` for complete usage.

## Examples

```bash
cognito-backup backup-users eu-west-1_1_12345
cognito-backup backup-users eu-west-1_1_12345 --region eu-west-1 --file mypool.json
cognito-backup backup-all-users eu-west-1_1_12345 --region eu-west-1 --dir output
cognito-backup restore-users eu-west-1_12345 Abcd.1234 --file eu-west-1_12345.json

cognito-backup backup-groups eu-west-1_12345
cognito-backup restore-groups eu-west-1_12345
```

## Troubleshooting

Enable verbose log output:
```
DEBUG=cognito-backup cognito-backup ...
```

## Related

- https://github.com/mifi/dynamodump
- https://github.com/rahulpsd18/cognito-backup-restore
