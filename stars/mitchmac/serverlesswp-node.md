---
repo: mitchmac/serverlesswp-node
url: 'https://github.com/mitchmac/serverlesswp-node'
homepage: ''
starredAt: '2024-07-30T16:07:59Z'
createdAt: '2023-07-25T13:43:08Z'
updatedAt: '2025-02-13T02:25:31Z'
language: JavaScript
license: MIT
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:28.111Z'
description: 'Node.js library to run PHP on Vercel, Netlify, or AWS Lambda'
tags: []
---

# ServerlessWP
Serverless PHP on AWS Lambda, Vercel or Netlify

Just want to get started with WordPress?

Try the [WordPress starter project](https://github.com/mitchmac/serverlesswp)!

| Netlify | Vercel |
| --- | --- |
| [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/mitchmac/serverlesswp) |[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmitchmac%2Fserverlesswp) |


## Overview

This is the library that powers ServerlessWP but it can also be used standalone to execute PHP in Lambda functions.

ServerlessWP includes PHP 8.1 with common extensions and libraries required by WordPress to run in the serverless function Node.js runtimes of Vercel and Netlify.

## Usage
```
npm i serverlesswp
```

Then in your project's function directory use the ServerlessWP library in a file like api/index.js:

```javascript
const path = require('path');
const serverlesswp = require('serverlesswp');

exports.handler = async function (event, context, callback) {
    const pathToWP = path.join(process.cwd(), 'wp');

    return await serverlesswp({docRoot: pathToWP, event: event});
}
```

Where

* docRoot is the path to WordPress files
* event is the serverless event data from Vercel or Netlify

## License
MIT
