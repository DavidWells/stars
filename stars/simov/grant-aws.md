---
repo: simov/grant-aws
url: 'https://github.com/simov/grant-aws'
homepage: ''
starredAt: '2022-01-13T21:28:48Z'
createdAt: '2020-07-27T13:37:51Z'
updatedAt: '2024-02-18T14:17:16Z'
language: HCL
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:21.435Z'
description: AWS Lambda handler for Grant
tags: []
---


# grant-aws

> _AWS Lambda handler for **[Grant]**_

```js
var grant = require('grant').aws({
  config: {/*Grant configuration*/}, session: {secret: 'grant'}
})

exports.handler = async (event) => {
  var {redirect, response} = await grant(event)
  return redirect || {
    statusCode: 200,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(response)
  }
}
```

> _Also available for [Azure], [Google Cloud], [Vercel]_

> _[ES Modules and TypeScript][grant-types]_

---

## Configuration

The `config` key expects your [**Grant** configuration][grant-config].

## Routes

Grant relies on the request path to determine the provider name and any static override being used. The following event keys are being used to determine the request path:

| Gateway | Event | Key
| :-:     | :-:   | :-
| rest    | -     | event.requestContext.path
| http    | v1    | event.path
| http    | v2    | event.rawPath

Additionally the `prefix` specified in your Grant configuration is used to generate the correct `redirect_uri` in case it is not configured explicitly.

However, AWS is inconsistent in the way it sets those values under different circumstances, and you may have to print those event keys and adjust your Grant configuration accordingly. A few known cases:

### Default Domain

```
https://[id].execute-api.[region].amazonaws.com/[stage]/connect/google
https://[id].execute-api.[region].amazonaws.com/[stage]/connect/google/callback
```

Gateway | Event | Key                       | Value
:-:     | :-:   | :-                        | :-
rest    | -     | event.requestContext.path | `/stage/connect/google`
http    | v1    | event.path                | `/stage/connect/google`
http    | v2    | event.rawPath             | `/stage/connect/google`

```json
{
  "defaults": {
    "origin": "https://[id].execute-api.[region].amazonaws.com",
    "prefix": "/[stage]/connect"
  },
  "google": {}
}
```

### Custom Domain

```
https://amazing.com/connect/google
https://amazing.com/connect/google/callback
```

Gateway | Event | Key                       | Value
:-:     | :-:   | :-                        | :-
rest    | -     | event.requestContext.path | `/connect/google`
http    | v1    | event.path                | `/connect/google`
http    | v2    | event.rawPath             | `/stage/connect/google`

##### REST API, HTTP API v1

```json
{
  "defaults": {
    "origin": "https://amazing.com",
    "prefix": "/connect"
  },
  "google": {}
}
```

##### HTTP API v2

```json
{
  "defaults": {
    "origin": "https://amazing.com",
    "prefix": "/stage/connect"
  },
  "google": {
    "redirect_uri": "https://amazing.com/connect/google/callback"
  }
}
```

### Custom Domain + Path Mapping

```
https://amazing.com/v1/connect/google
https://amazing.com/v1/connect/google/callback
```

Gateway | Event | Key                       | Value
:-:     | :-:   | :-                        | :-
rest    | -     | event.requestContext.path | `/v1/connect/google`
http    | v1    | event.path                | `/v1/connect/google`
http    | v2    | event.rawPath             | `/stage/connect/google`

##### REST API, HTTP API v1

```json
{
  "defaults": {
    "origin": "https://amazing.com",
    "prefix": "/v1/connect"
  },
  "google": {}
}
```

##### HTTP API v2

```json
{
  "defaults": {
    "origin": "https://amazing.com",
    "prefix": "/stage/connect"
  },
  "google": {
    "redirect_uri": "https://amazing.com/v1/connect/google/callback"
  }
}
```

---

## Local Routes

When running locally the following routes can be used:

```
http://localhost:3000/[stage]/connect/google
http://localhost:3000/[stage]/connect/google/callback
```

---

## Session

The `session` key expects your session configuration:

Option | Description
:- | :-
`name` | Cookie name, defaults to `grant`
`secret` | Cookie secret, **required**
`cookie` | [cookie] options, defaults to `{path: '/', httpOnly: true, secure: false, maxAge: null}`
`store` | External session store implementation

#### NOTE:

- The default cookie store is used unless you specify a `store` implementation!
- Using the default cookie store **may leak private data**!
- Implementing an external session store is recommended for production deployments!

Example session store implementation using [Firebase]:

```js
var request = require('request-compose').client

var path = process.env.FIREBASE_PATH
var auth = process.env.FIREBASE_AUTH

module.exports = {
  get: async (sid) => {
    var {body} = await request({
      method: 'GET', url: `${path}/${sid}.json`, qs: {auth},
    })
    return body
  },
  set: async (sid, json) => {
    await request({
      method: 'PATCH', url: `${path}/${sid}.json`, qs: {auth}, json,
    })
  },
  remove: async (sid) => {
    await request({
      method: 'DELETE', url: `${path}/${sid}.json`, qs: {auth},
    })
  },
}
```

---

## Handler

The AWS Lambda handler for Grant accepts:

Argument | Type | Description
:- | :- | :-
`event` | **required** | The AWS Lambda event object
`state` | optional | [Dynamic State][grant-dynamic-state] object `{dynamic: {..Grant configuration..}}`

The AWS Lambda handler for Grant returns:

Parameter | Availability | Description
:- | :- | :-
`session` | Always | The session store instance, `get`, `set` and `remove` methods can be used to manage the Grant session
`redirect` | On redirect only | HTTP redirect controlled by Grant, your lambda have to return this object when present
`response` | Based on transport | The [response data][grant-response-data], available for [transport-state][example-transport-state] and [transport-session][example-transport-session] only

---

## Examples

Example | Session | Callback λ
:- | :- | :-
`transport-state` | Cookie Store | ✕
`transport-querystring` | Cookie Store | ✓
`transport-session` | Firebase Session Store | ✓
`dynamic-state` | Firebase Session Store | ✕

> _Different session store types were used for example purposes only._

#### Configuration

All variables at the top of the [`Makefile`][example-makefile] with value set to `...` have to be configured:

- `profile` - `AWS_PROFILE` to use for managing AWS resources, not used for local development

- `firebase_path` - [Firebase] path of your database, required for [transport-session][example-transport-session] and [dynamic-state][example-dynamic-state] examples

```
https://[project].firebaseio.com/[prefix]
```

- `firebase_auth` - [Firebase] auth key of your database, required for [transport-session][example-transport-session] and [dynamic-state][example-dynamic-state] examples

```json
{
  "rules": {
    ".read": "auth == '[key]'",
    ".write": "auth == '[key]'"
  }
}
```

- `api_type` - defaults to `http-api`, available for `rest-api` as well

- `event_format` - defaults to `1.0`, available for `2.0` as well, applicable for `http-api`

All variables can be passed as arguments to `make` as well:

```bash
make plan example=transport-querystring ...
```

---

## Develop

```bash
# build example locally
make build-dev
# run example locally
make run-dev
```

---

## Deploy

```bash
# build Grant lambda for deployment
make build-grant
# build callback lambda for transport-querystring and transport-session examples
make build-callback
# execute only once
make init
# plan before every deployment
make plan
# apply plan for deployment
make apply
# cleanup resources
make destroy
```

---

  [Grant]: https://github.com/simov/grant
  [AWS]: https://github.com/simov/grant-aws
  [Azure]: https://github.com/simov/grant-azure
  [Google Cloud]: https://github.com/simov/grant-gcloud
  [Vercel]: https://github.com/simov/grant-vercel

  [cookie]: https://www.npmjs.com/package/cookie
  [Firebase]: https://firebase.google.com/

  [grant-config]: https://github.com/simov/grant#configuration
  [grant-dynamic-state]: https://github.com/simov/grant#dynamic-state
  [grant-response-data]: https://github.com/simov/grant#callback-data
  [grant-types]: https://github.com/simov/grant#misc-es-modules-and-typescript

  [example-makefile]: https://github.com/simov/grant-aws/tree/master/Makefile
  [example-transport-state]: https://github.com/simov/grant-aws/tree/master/examples/transport-state
  [example-transport-querystring]: https://github.com/simov/grant-aws/tree/master/examples/transport-querystring
  [example-transport-session]: https://github.com/simov/grant-aws/tree/master/examples/transport-session
  [example-dynamic-state]: https://github.com/simov/grant-aws/tree/master/examples/dynamic-state
