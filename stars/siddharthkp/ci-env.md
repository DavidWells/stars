---
repo: siddharthkp/ci-env
url: 'https://github.com/siddharthkp/ci-env'
homepage: null
starredAt: '2021-10-25T17:46:33Z'
createdAt: '2017-07-12T19:05:36Z'
updatedAt: '2024-04-05T06:43:50Z'
language: JavaScript
license: MIT
branch: main
stars: 40
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.666Z'
description: Environment variables exposed by CI tools
tags: []
---

<p align="center">
  <br>
  <b>Environment variables exposed by CI tools</b>
  <br><br>
  <img src="https://travis-ci.org/siddharthkp/ci-env.svg?branch=master&maxAge=3600"/>
</p>

&nbsp;

Supports travis, circle, gitlab, wercker, drone, codeship, now(zeit), netlify, GitHub Actions, Buddy, Codefresh, Cloudflare Pages and [WoodpeckerCI](https://woodpecker-ci.org).

Kinda supports custom CI as well. [Specs here](https://github.com/siddharthkp/ci-env/blob/master/index.js#L68-L79)

&nbsp;

#### Installation

```
npm install ci-env
```

&nbsp;

#### Usage

```js
const { repo, sha, event, commit_message, pull_request_number, branch, ci } = require('ci-env')
```

&nbsp;

#### like it?

⭐️ this repo

&nbsp;

#### License

MIT © siddharthkp
