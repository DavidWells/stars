---
repo: remorses/get-git-config
url: 'https://github.com/remorses/get-git-config'
homepage: null
starredAt: '2021-11-22T01:53:39Z'
createdAt: '2020-07-31T18:13:17Z'
updatedAt: '2021-11-22T01:53:39Z'
language: TypeScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:36.240Z'
description: null
tags: []
---

# get-git-config

Parses the .git/config file to extract information like remotes and branches

Does not require the git command installed, searches the git config on parent directories and throws if does not find any

## Usage

```
npm i get-git-config
```

```js
import { getGitConfig, getGitConfigSync } from 'get-git-config'

getGitConfig().then(console.log)

// get the current origin url
console.log(getGitConfigSync().remote.origin.url)
```
