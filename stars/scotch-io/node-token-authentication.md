---
repo: scotch-io/node-token-authentication
url: 'https://github.com/scotch-io/node-token-authentication'
homepage: 'https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens'
starredAt: '2015-05-05T20:26:57Z'
createdAt: '2014-10-23T22:31:38Z'
updatedAt: '2025-01-21T20:47:32Z'
language: JavaScript
license: NA
branch: master
stars: 365
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:44.253Z'
description: 'Code for the scotch.io tutorial: Authenticate a Node API Using JSON Web Tokens'
tags: []
---

# Node Token Authentication

This repo uses JSON Web Tokens and the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package to implement token based authentication on a simple Node.js API.

This is a starting point to demonstrate the method of authentication by verifying a token using Express route middleware.

## Requirements

- node and npm

## Usage

1. Clone the repo: `git clone git@github.com:scotch-io/node-token-authentication`
2. Install dependencies: `npm install`
3. Change SECRET in `config.js`
4. Add your own MongoDB database to `config.js`
5. Start the server: `node server.js`
6. Create sample user by visiting: `http://localhost:8080/setup`

Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Getting a Token

Send a `POST` request to `http://localhost:8080/api/authenticate` with test user parameters as `x-www-form-urlencoded`. 

```
  {
    name: 'Nick Cerminara',
    password: 'password'
  }
```

### Verifying a Token and Listing Users

Send a `GET` request to `http://localhost:8080/api/users` with a header parameter of `x-access-token` and the token.

You can also send the token as a URL parameter: `http://localhost:8080/api/users?token=YOUR_TOKEN_HERE`

Or you can send the token as a POST parameter of `token`.
