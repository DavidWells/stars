---
repo: purple-technology/serverless-git-branch-stage-plugin
url: 'https://github.com/purple-technology/serverless-git-branch-stage-plugin'
homepage: null
starredAt: '2020-12-23T07:22:23Z'
createdAt: '2020-09-28T18:53:43Z'
updatedAt: '2023-10-09T10:29:37Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:14.933Z'
description: >-
  Serverless Framework Plugin for transforming git branch name to a Serverless
  stage name  
tags: []
---

# serverless-git-branch-stage-plugin
[![CI Status Badge](https://circleci.com/gh/purple-technology/serverless-git-branch-stage-plugin.svg?style=svg)](https://github.com/purple-technology/serverless-git-branch-stage-plugin)


This plugin provides two Serverless variables:

- `git:stage` - branch name converted to camel case 
- `git:basePath` - branch name converted to kebab-case which is usefull for [`serverless-domain-manager`](https://www.serverless.com/plugins/serverless-domain-manager) plugin  

## Install

```sh
$ npm install --save-dev @purple/serverless-git-branch-stage-plugin
```

Add the plugin to your `serverless.yml` file
```yml
plugins:
  - '@purple/serverless-git-branch-stage-plugin'
```

### Prerequisites:
This plugin requires `git` to be installed.<br/>
*Tested on Linux and macOS.*

### Example

```yml
provider:
  name: aws
  stage: ${git:stage}
```

```yml
custom:
  customDomain:
    domainName: serverless.foo.com
    basePath:  ${git:basePath}
```


## Overriding branch name
You can override the branch name with envrionment variable `SLS_MOCK_BRANCH`.

```sh
$ SLS_MOCK_BRANCH=master serverless deploy 
```
