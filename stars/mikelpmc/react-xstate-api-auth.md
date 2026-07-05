---
repo: mikelpmc/react-xstate-api-auth
url: 'https://github.com/mikelpmc/react-xstate-api-auth'
homepage: null
starredAt: '2021-01-02T06:09:06Z'
createdAt: '2020-04-01T15:59:00Z'
updatedAt: '2023-08-17T13:48:56Z'
language: JavaScript
license: NA
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:10.645Z'
description: Basic demo to show the usage of React and Xstate with authentication flow
tags:
  - auth
  - context-api
  - finite-state-machine
  - javascript
  - react
  - statechart
  - xstate
---

# React xstate auth demo

Basic demo to show the usage of React and Xstate with authentication flow

You can visualize the auth machine here: https://xstate.js.org/viz/?gist=94e9a29e1ab016e06b8b354b9d558cf2

Project Structure:

```sh
    -server
        -src
            -data
                -schemas
            -logic
            -routes
            -utils
        -index.js
        -.env

    -client
        -src
            -components
            -machine
            -provider
            -service
            -utils
            -index.js
        -.env
```

System Requirements:

- Node
- Mongodb

Server:

1. Install the project dependencies

```sh
$ npm i
```

2. Create the .env file on the root of the server/ folder

```sh
$ touch .env
```

.env

```sh
DB_URL=mongodb://localhost:27017/your-database
PORT=5000
TOKEN_SECRET=your-secret
TOKEN_EXP=3h
```

3. Start the API

```sh
$ npm start
```

Client:

1. Download dependencies

```sh
$ npm i
```

2. Create the .env file on the root of the client/ folder

```sh
$ touch .env
```

.env

```sh
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

\*Note: In order to enviroment variables work with this react project without touching any config file they all have to start with REACT_APP

3. Start the app

```sh
$ npm start
```

Author: [http://github.com/mikelpmc](http://github.com/mikelpmc)
