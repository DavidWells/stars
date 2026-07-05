---
repo: JamesKyburz/aws-lambda-ws-server
url: 'https://github.com/JamesKyburz/aws-lambda-ws-server'
homepage: 'https://npm.im/aws-lambda-ws-server'
starredAt: '2025-01-14T06:43:07Z'
createdAt: '2019-01-09T14:23:14Z'
updatedAt: '2025-01-14T06:43:07Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 40
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:16.365Z'
description: ' aws lambda websocket server.'
tags:
  - apigateway
  - aws
  - lambda
  - websocket
  - ws
---

# aws-lambda-ws-server


[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![build status](https://api.travis-ci.org/JamesKyburz/aws-lambda-ws-server.svg)](https://travis-ci.org/JamesKyburz/aws-lambda-ws-server)
[![downloads](https://img.shields.io/npm/dm/aws-lambda-ws-server.svg)](https://npmjs.org/package/aws-lambda-ws-server)

<a href="https://asciinema.org/a/291478?autoplay=1&speed=1.5&size=medium&preload=1"><img src="https://asciinema.org/a/291478.svg" width="480"></a>

AWS Lambda Websocket Server.

### usage

```javascript
const ws = require('aws-lambda-ws-server')
exports.handler = ws(
  ws.handler({
    async connect ({ id }) {
      console.log('connection %s', id)
      return { statusCode: 200 }
    },
    async disconnect ({ id }) {
      console.log('disconnect %s', id)
      return { statusCode: 200 }
    },
    async default ({ message, id }) {
      console.log('default message', message, id)
      return { statusCode: 200 }
    },
    async message ({ message, id, context }) {
      const { postToConnection } = context
      console.log('message', message, id)
      await postToConnection({ message: 'echo' }, id)
      return { statusCode: 200 }
    }
  })
)
```

Works locally and in a lambda function.

# license
[Apache License, Version 2.0](LICENSE)
