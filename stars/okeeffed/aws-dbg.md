---
repo: okeeffed/aws-dbg
url: 'https://github.com/okeeffed/aws-dbg'
homepage: null
starredAt: '2024-12-21T22:25:28Z'
createdAt: '2024-02-08T06:18:04Z'
updatedAt: '2024-12-21T22:25:29Z'
language: JavaScript
license: NOASSERTION
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:16.613Z'
description: null
tags: []
---

# AWS Debug

A helper for debugging CloudFormation deployments without always searching through CloudFormation.

## How to use

```bash
# or pnpx, bunx etc.
$ npx @okeeffe/aws-dbg@latest
```

It will prompt you for your profile name and the match you which to target.

## SSO Login

If you need to configure SSO, follow the prompts from the `aws configure sso` screen.

```bash
$ aws configure sso
# Follow prompts until you set the profile
```

It will request things like your start URL e.g. `https://your-app.awsapps.com/start`.

If your session is expired, you can renew it with `aws sso login`.
