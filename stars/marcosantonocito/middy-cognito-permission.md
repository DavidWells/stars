---
repo: marcosantonocito/middy-cognito-permission
url: 'https://github.com/marcosantonocito/middy-cognito-permission'
homepage: null
starredAt: '2021-05-15T20:09:12Z'
createdAt: '2020-06-25T14:08:15Z'
updatedAt: '2025-02-21T18:39:10Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:41.442Z'
description: null
tags: []
---

# Serverless Cognito Permission Middleware

[![GitHub version](https://badge.fury.io/gh/santonocito%2Fmiddy-cognito-groups-authorizer.svg)](https://badge.fury.io/gh/santonocito%2Fmiddy-cognito-groups-authorizer)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fsantonocito%2Fmiddy-cognito-permission.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fsantonocito%2Fmiddy-cognito-permission?ref=badge_shield)

Amazon Cognito user pools enables you to create and manage groups, 
add users to groups, and remove users from groups. 
You can use these groups to create collections of users and manage their permissions. 
This middleware checks for the user’s groups permission and authorizes user requests.

This middleware can be used in combination with
[`httpErrorHandler`](#httperrorhandler) to automatically return the right
response to the user.

## Install

To install this middleware you can use NPM:

```bash
npm install --save @marcosantonocito/middy-cognito-permission
```

## Options

 - `allowedRoles` (array) (optional): Array of strings defining containing the 
 roles authorized to accomplish the request


## Examples

Request authorized:

```javascript
const middy = require('@middy/core')
const cognitoPermission = require('@marcosantonocito/middy-cognito-permission')

const handler = middy((event, context, cb) => {
  cb(null, {})
})

handler.use(cognitoPermission({
  allowedRoles: ['Admin']
}))

// invokes the handler, note that property foo is missing
const event = {
  body: JSON.stringify({something: 'somethingelse'}),
  requestContext: {
    authorizer: {
      claims: {
        'cognito:groups': ['Admin']
      }
    }
  }
}
handler(event, {}, (err, res) => {
  expect(res).toEqual({})
})
```

Request not authorized:

```javascript
const middy = require('@middy/core')
const cognitoPermission = require('@marcosantonocito/middy-cognito-permission')

const handler = middy((event, context, cb) => {
  cb(null, {})
})

handler.use(cognitoPermission({
  allowedRoles: ['Admin']
}))

// invokes the handler, note that property foo is missing
const event = {
  body: JSON.stringify({something: 'somethingelse'}),
  requestContext: {
    authorizer: {
      claims: {
        'cognito:groups': ['User']
      }
    }
  }
}
handler(event, {}, (err, res) => {
  expect(err.message).toEqual('You don\'t have the permission to access this resource')
})
```

## Contributing

Everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/santonocito/middy-cognito-permission/issues) or to [submit Pull Requests](https://github.com/santonocito/middy-cognito-permission/pulls).


## License

Licensed under [MIT License](LICENSE). Copyright (c) 2020 Marco Santonocito.
