---
repo: DavidWells/env-stage-loader
url: 'https://github.com/DavidWells/env-stage-loader'
homepage: ''
starredAt: '2025-01-05T19:28:25Z'
createdAt: '2020-10-11T01:07:17Z'
updatedAt: '2025-01-06T00:59:51Z'
language: JavaScript
license: NA
branch: master
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:20.572Z'
description: >-
  Loads .env files in order based on process.env.NODE_ENV value with
  [stage].local support
tags: []
---

# Env Stage Loader

Loads `.env` files in order based on `process.env.NODE_ENV` value.

1. shell
2. .env.{environment}.local
3. .env.{environment}
4. .env.local
5. .env

If environment variable is set, any file loaded after will not override it.

## Usage

Import and use asap in your build process or app

```js
const loadStageEnv = require('env-stage-loader')

// Load env variables
const values = loadStageEnv()
console.log('resolved values', values)

// Debug load order & value setting
loadStageEnv({ debug: true })

// Set env dynamically
loadStageEnv({
  env: 'development'
})

// Force override of any env variable
loadStageEnv({
  forceSet: {
    FOO: 'this value will win'
  }
})

// Force override of any env variable
loadStageEnv({
  env: 'development'
  // Force unsetting of all previously found ENV vars found in shell
  unloadEnv: true
})
```

## Examples

**[stage].local takes presidence**

```js
/*
.env.dev.local contains FOO=BAR
.env.dev contains FOO=ZAZ
*/

const values = loadStageEnv({ env: 'dev' })

console.log(values.FOO === process.env.FOO)
console.log(process.env.FOO)
// value "BAR" from .env.dev.local
```

**shell takes presidence**

```js
/*
process.env.XYZ === '123'
.env.dev.local contains XYZ=345
.env.dev contains XYZ=987
*/

const values = loadStageEnv({ env: 'dev' })

console.log(process.env.XYZ)
// value "123" from original shell process
```

Another shell example

```bash
# Shell value set
export FOO=1
```

FOO is set in shell session...

```js
/*
.env file contains FOO=ZAZ
*/

const values = loadStageEnv({ env: 'dev' })

console.log(process.env.FOO)
// process.env.FOO === "1" because shell takes precedence
```

Run `tests` for more examples.

## Typical `.env` files used

- `.env`: Default.
- `.env.local`: Local overrides. **This file is loaded for all environments except test.**
- `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
- `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

- `npm start`: `.env.development.local`, `.env.local`, `.env.development`, `.env`

These variables will act as the defaults if the machine does not explicitly set them.

Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

## Alternative Packages

- [dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow)
- https://www.npmjs.com/package/universal-dotenv
- https://github.com/thenativeweb/nodeenv
