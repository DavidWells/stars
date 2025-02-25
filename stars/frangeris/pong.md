---
repo: frangeris/pong
url: 'https://github.com/frangeris/pong'
homepage: ''
starredAt: '2017-11-24T20:03:13Z'
createdAt: '2017-05-27T01:30:25Z'
updatedAt: '2024-11-08T15:04:37Z'
language: JavaScript
license: MIT
branch: master
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:35.071Z'
description: "\U0001F3D3 Pong for RESTful APIs (microservices pattern) using Serverless Framework :zap:"
tags:
  - api-gateway
  - api-generator
  - lambda-functions
  - microservice
  - restful-api
  - serverless-boilerplate
  - serverless-framework
---

<div align="center">
  <img src="https://cdn.rawgit.com/frangeris/pong/f389d356/boilerplate-logo.svg" alt="Serverless RESTful Boilerplate" width="500" />
</div>

# Pong for RESTful APIs (serverless microservices pattern)

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/frangeris/pong.svg?branch=master)](https://travis-ci.org/frangeris/pong)
[![Dependency Status][daviddm-image]][daviddm-url]
[![node](https://img.shields.io/badge/node-6.10-brightgreen.svg)](https://packagist.org/packages/frangeris/pong)
[![Semantic Releases][semantic-release-badge]][semantic-release]
[![PRs Welcome][prs-badge]][prs]

[daviddm-image]: https://david-dm.org/frangeris/pong.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/frangeris/pong
[semantic-release]: https://github.com/frangeris/pong/releases
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat
[prs]: http://makeapullrequest.com

Build scalables RESTful apis under serverless arquitecture for AWS (serverless +v1.x), create a good codebase with scalability while the project grow up could require a lot of efford, time and dedication to know how the framework works, often this process of learning tends to be while we're building the product and this require agility and fast learning, customizing the code could be annoying a take more time than expected, that's the reason of this skeleton. 

## Why Pong?
Have you play ping-pong? is a sport in which two players ([frontend and backend](https://en.wikipedia.org/wiki/Front_and_back_ends)) hit a lightweight ball ([HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)) back and forth across a table ([Restful](https://en.wikipedia.org/wiki/Representational_state_transfer)) using small bats ([Vuejs](https://vuejs.org/) and [Serverless Framework](https://github.com/serverless/serverless)). 

## Requirements
- [Serverless framework v1+](https://github.com/serverless/serverless)
- [node.js](https://nodejs.org/)

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-pong` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/) and [serverless framework](https://github.com/serverless/serverless)).

```bash
npm install -g yo
npm install -g generator-pong
```

Then generate your new project:

```bash
yo pong
```

Generate new functions inside a project using CLI (recomended for overwrite `serverless.yml`):

```bash
$ yo pong:func
? Path (can include parameters) /users/{uid}
? Which HTTP method? GET
? Your function description Get users by uid
   create functions/users/id.js
✔ GET /users/{uid} ► functions/users/id.handler (get-users-id)
```

Functions also can be nested resources, just specify the url and `pong` will create the files and nested folders.

```bash
$ pwd
/home/code/myproject

dev @ ~/code/myproject
$ yo pong:func
? Path (can include parameters) /users/{uid}/orgs
? Which HTTP method? GET
? Your function description Get users orgs
   create functions/users/orgs/get.js
✔ GET /users/{uid}/orgs ► functions/users/orgs/get.handler (get-users-orgs)

dev @ ~/code/myproject/functions/users
$ ls
total 16K
total 16K
drwxr-xr-x 3 frang 4,0K feb 14 12:34 .
drwxr-xr-x 5 frang 4,0K feb 14 12:32 ..
-rw-r--r-- 1 frang  268 feb 14 12:32 id.js
drwxr-xr-x 2 frang 4,0K feb 14 12:34 orgs <-------------- Nested folder was created
```
> The `func` subgenerator will save the path with parameters (if have)

## New updates & new nice stuff here?
Thank's to [Yeoman](http://yeoman.io) :raised_hands: we have a [conflict handler](http://yeoman.io/generator/Conflicter.html) out-of-the-box.

> The Conflicter is a module that can be used to detect conflict between files. Each Generator file system helpers pass files through this module to make sure they don't break a user file.

To update a project with the latest features in the boilerplate just run `yo pong` inside the project, the generator must detect and automatically inform that an update will be made, the generator will only update global files, if you have modifed "core" files be careful while overwriting in updates.

```bash
dev @ ~/code/my-api
$ yo pong
Project detected, updating the boilerplate files instead...
? Your project name (my-api)
```
Resolve conflicts (in case that exists) and continue...

*Note:* it will ask for some fields in case you want to update basic parameters in `serverless.yml`, in case nothing change, hit enter to use existing previous values.

## Now, let's Rock n' roll
The project structure presented in this boilerplate is Microservices Pattern, where functionality is grouped primarily by function rather than resources. Each job or functionality is isolated within a separate Lambda function.

If you wish to read more about this pattern and comparation with others, please check out this awesome [writeup](https://serverless.com/blog/serverless-architecture-code-patterns/) by [Eslam Hefnawy](https://github.com/eahefnawy).

The basic project contains the following directory structure:
```
.
├── __tests__
├── .vscode
│   ├── debug.js                    # Debugger for vscode <3
│   ├── event.json                  # Parameters for request when debugging
│   └── launch.json
├── functions
│   └── aws-authorizer-jwt          # AWS authorizer for jwt tokens
│       └── handler.js
│   └── firebase-authorizer-jwt     # Firebase authorizer for jwt tokens
│       └── handler.js
│   └── myresource                  # Basic structure of a resource
│       ├── id.js
│       ├── get.js
│       ├── post.js
│       ├── put.js
│       └── delete.js
├── helpers
│   ├── authpolicy.js
│   ├── index.js
│   └── response.js
├── templates
│   ├── request.vtl
|   └── response.vtl
├── tokens
│   ├── aws.json                    # AWS jwks file
│   └── firebase.json               # Firebase tokens
├── .editorconfig
├── .env.yml.example
├── .gitignore
├── LICENSE
├── package.json
├── README.md
├── serverless.yml
```

## Concepts
#### What is a service? (Api Gateway)
Due to the current limitations where every service will create an individual API in API Gateway (WIP), we'll be working with a unique service with all the functions (resources) that will be exposed.

#### How to use multiple environment stages (develop, prod, staging)?
The default stage is "develop", for create a new one, use the package `serverless-aws-alias` and change the value in `serverless.yml` or pass it as `--option` when deployment.

#### Custom with Apache Velocity Templates
Templates are optionals, used **ONLY** when the integration is `lambda`, this method is more complicated and involves a lot more configuration of the http event syntax, [more info](https://serverless.com/framework/docs/providers/aws/events/apigateway/#lambda-integration).

The templates are defined as plain text, however you can also reference an external file with the help of the `${file(templates/response.vtl)}` syntax, use [Apache Velocity](http://velocity.apache.org/) syntax for custom. 

## Configuration files

#### serverless.yml
The default provider is `aws`, see [documentation](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/) for complete list of options available.

#### package.js (core required packages)
- [yortus/asyncawait](https://github.com/yortus/asyncawait) for avoid [callback hell](http://callbackhell.com/) in validation helper.
- [krachot/options-resolver](https://github.com/krachot/options-resolver) as port of Symfony component [OptionsResolver](http://symfony.com/doc/current/components/options_resolver.html)
- [HyperBrain/serverless-aws-alias](https://github.com/HyperBrain/serverless-aws-alias) enables use of AWS aliases on Lambda functions.
- [Brightspace/node-jwk-to-pem](https://github.com/Brightspace/node-jwk-to-pem) used to convert jwks to pem file.
- [mzabriskie/axios](https://github.com/mzabriskie/axios) Awesome HTTP client for make request.

#### .env.yml.example
Environment variables used by your function, variables are grouped by stage, so this meas variables will only be available depending of the stage where you defined them, variables are loaded automatically, there is not need to "require a file early as possible", so copy the file **IN CASE IF NOT EXISTS (CREATED AUTOMATICALLY BY BOILERPLATE)** `.env.yml.example` to `.env.yml` and write the real values, depending the value for `stage` in `serverless.yml` file, values will be loaded, eg: 

Create your final env vars file

```sh
$ cp .env.yml.example .env.yml
```

Now add the values per stage

```yml
develop:
  AWS_SECRET_KEY: dontsavethiscredentialsstringsincode

prod:
  AWS_SECRET_KEY: dontsavethiscredentialsstringsincode
```

And access them natively in you code from `process.env`:

```javascript
module.exports.handler = (event, context, callback) => {
    console.log(process.env.AWS_SECRET_KEY)
}
```

> `.env.yml.example` is added to VCS for keep reference of the variables, not values (good practice). `.env.yml` is not uploaded either aws when create the package or vcs.

#### Some helpers...
Helpers are just custom reusable functions for facilitate some repetitive tasks like validations, custom response, etc.

Here the current availables:
- `jwks-to-pem.js` if a helper file to convert AWS jwks json to pem file used in `aws-authorizer-jwt` function, eg: in root inside a project:
```bash
$ node ./helpers/jwks-to-pem.js <url to jwks.json>
```
> `jwks.json` is usually located in `https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json`.

This will generate a json file with the pem keys in it, `aws-authorizer-jwt` use this file to authenticate using [JSON Web Tokens](https://jwt.io/) with [cognito integration](https://aws.amazon.com/blogs/mobile/integrating-amazon-cognito-user-pools-with-api-gateway/) for secure your API resources, [more info](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html).

The authorizer needs to khow the `iss` of the [token](https://tools.ietf.org/html/rfc7519#section-4.1.1), so add the value to `.env.yml` replacing the values of `region, userPoolId`, like this:
```bash
develop:
  AWS_ISS: https://cognito-idp.{region}.amazonaws.com/{userPoolId}
```
**If a function needs to be secured using aws jwt authorizer**, remember to add it inside the function template in `serverless.yml` file, eg like this:
```yml
  get-users-orgs:
    name: test-api-get-users-orgs
    description: Get users orgs
    handler: functions/users/orgs/get.handler
    events:
      - http:
          path: '/users/{sub}/orgs'
          method: GET
          cors: true
          authorizer: aws-authorizer-jwt
```
And that's it, API Gateway will run the [authorizer before the lambda execution](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/) automatically :dancer:

- `validate()` this method return a `Promise` and throw an `Error` if the validation fails.
- `response()` is a shorcut for the callback received in the lambda handler, but this add the json body for integration response in API Gateway at the same time implementing [JSON API](http://jsonapi.org) standard, eg:

Samples of the `response` **using lambda-proxy integration**, [more info of integrations](https://serverless.com/framework/docs/providers/aws/events/apigateway).
```javascript
const { response } = require('path/to/helpers')

response(201)
// {"statusCode": 201, "body": "{\"data\":null}","headers": {}}

response(403, new Error('my custom error message'))
// {"statusCode": 403, "body": "{\"error\":{\"title\":\"my custom error message\",\"meta\":{}}}", "headers":{}}

response(501, {key: 'value'})
//{"statusCode": 501, "body": "{\"data\":{\"key\":\"value\"}}", "headers": {}}
 
response(403)
// {"statusCode": 403, "body": "{\"data\":null}", "headers": {}}

response()
// Error - Invalid arguments supplied for response
```

> **[WIP]** Customization of header using the new response is not supported for now...

- `resolver` just an `object` to interact with [krachot/options-resolver](https://github.com/krachot/options-resolver)
**For use response helpers it's extremely required add this code at the very begining of the handler**, the reason is that `response` helper use the lambda `callback` function for finish the execution of the lambda and is not cool always send it by parameter...

```javascript
module.exports.handler = (event, context, callback) => {
    // needed for response scope
    global.cb = callback
```

The other issue is related to request body, from [Serverless docs](https://serverless.com/framework/docs/providers/aws/events/apigateway/#simple-http-endpoint) and [AWS Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-set-up-simple-proxy.html#api-gateway-simple-proxy-for-lambda-input-format):

Note: When the body is a JSON-Document, you must parse it yourself

```json
{
    "resource": "Resource path",
    "path": "Path parameter",
    "httpMethod": "Incoming request's method name",
    "headers": {},
    "queryStringParameters": {},
    "pathParameters":  {},
    "stageVariables": {},
    "requestContext": {},
    "body": "---------------A JSON STRING OF THE REQUEST PAYLOAD.-------------------",
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}
```

That means we must to parse the body received, in every functions, is not an object, is an string, so

```javascript
module.exports.handler = (event, context, callback) => {

    // needed for response scope
    global.cb = callback

    // parse the body string to object
    let body = JSON.parse(event.body)

    ...
```

After adding the code bellow, just import the helper lib built-in and that's it... ^_^

```javascript
const { validate, resolver, response } = require('../../helpers')

module.exports.handler = (event, context, callback) => {
    // needed for response scope
    global.cb = callback

    // parse the body string to object
    let body = JSON.parse(event.body)

    // marking as required some parameters
    resolver.setRequired([
        'email',
        'password'
    ])

    // { email: 'tommy@powerrangers.com' }
    validate(event)
        // all good!
        .then((body) => console.log('passed!'))
        /*
            400 Bad Request
            {"message": "The required options \"password\" are missing"}
        */
        .catch((err) => response(err)) 
}
```

## Development

Install dependencies, Run test:

``` bash
npm install
npm run test
```

## License
This boilerplate is open-sourced software licensed with **<3** under the [MIT license](http://opensource.org/licenses/MIT) © [Frangeris Peguero](http://github.com/frangeris)
