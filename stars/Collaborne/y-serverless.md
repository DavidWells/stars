---
repo: Collaborne/y-serverless
url: 'https://github.com/Collaborne/y-serverless'
homepage: null
starredAt: '2024-09-17T17:26:18Z'
createdAt: '2021-09-04T18:33:27Z'
updatedAt: '2024-09-17T17:26:18Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T19:59:21.062Z'
description: Serverless Provider using Websockets and DynamoDB for YJS
tags: []
---

# y-serverless

 Serverless Provider using Websockets and DynamoDB for YJS. Easy deploy. Written in typescript.

 Huge shout out to [gaberogan](https://github.com/gaberogan/y-websocket-api/) original repo. 

 Open limitations:

 1. Doesn't work with regular `y-websockets`. AWS sockets requires base64 strings. You need a modifided sockets provider from the client repo to pass b64 strings

 2. Not optimized yet, so may create more clients and data than necessary


 ## Setup


 ### Testing Locally
 ```
 cd api
npm install
npm run start
 ```

 Spins up a local server on `ws://localhost:5000`

### Deploy to AWS
```
cd api
serverless deploy
```

### See Logs
```
serverless logs -f api
```

### Resources
Creates a DynamoDB table to maintain documents and connection information.
