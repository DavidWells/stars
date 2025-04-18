---
repo: af/envalid
url: 'https://github.com/af/envalid'
homepage: null
starredAt: '2021-11-25T06:59:23Z'
createdAt: '2012-11-29T05:24:45Z'
updatedAt: '2025-02-25T12:15:31Z'
language: TypeScript
license: MIT
branch: main
stars: 1407
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:34.292Z'
description: Environment variable validation for Node.js
tags:
  - environment
  - javascript
  - node
  - nodejs
  - validation
---

<p align="center">
  <img
    src="https://raw.githubusercontent.com/af/envalid/main/.github/logo.svg"
    width="160"
    alt="Envalid text logo with drop shadow"
  />
</p>

<p align="center">
  <strong>
    Envalid is a small library for validating and accessing<br />
    environment variables in Node.js programs
  </strong>
</p>

<p align="center">
  <a href="https://github.com/af/envalid/actions/workflows/ci.yml">
    <img src="https://github.com/af/envalid/workflows/continuous-integration/badge.svg" alt="Current GitHub Build Status Badge" />
  </a>
</p>

Envalid is a small library for validating and accessing environment variables in
Node.js programs, aiming to:

- Ensure that your program only runs when all of its environment dependencies are met
- Give you executable documentation about the environment your program expects to run in
- Give you an immutable API for your environment variables, so they don't change
  from under you while the program is running

## Why Envalid?

- Type-safe: written completely in TypeScript, with great support for inference
- Light: no dependencies besides [tslib](https://github.com/Microsoft/tslib)
- Modular: customize behavior with custom validators, middleware, and reporters

## API

### `envalid.cleanEnv(environment, validators, options)`

`cleanEnv()` returns a sanitized, immutable environment object, and accepts three
positional arguments:

- `environment` - An object containing your env vars (eg. `process.env`)
- `validators` - An object that specifies the format of required vars.
- `options` - An (optional) object, which supports the following key:
  - `reporter` - Pass in a function to override the default error handling and
    console output. See `src/reporter.ts` for the default implementation.

By default, `cleanEnv()` will log an error message and exit (in Node) or throw (in browser) if any required
env vars are missing or invalid. You can override this behavior by writing your own reporter.

```js
import { cleanEnv, str, email, json } from 'envalid'

const env = cleanEnv(process.env, {
  API_KEY: str(),
  ADMIN_EMAIL: email({ default: 'admin@example.com' }),
  EMAIL_CONFIG_JSON: json({ desc: 'Additional email parameters' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
})

// Read an environment variable, which is validated and cleaned during
// and/or filtering that you specified with cleanEnv().
env.ADMIN_EMAIL // -> 'admin@example.com'

// Envalid checks for NODE_ENV automatically, and provides the following
// shortcut (boolean) properties for checking its value:
env.isProduction // true if NODE_ENV === 'production'
env.isTest // true if NODE_ENV === 'test'
env.isDev // true if NODE_ENV === 'development'
```

For an example you can play with, clone this repo and see the `example/` directory.

```
git clone https://github.com/af/envalid
cd envalid
yarn prepare
node example/server.js
```

## Validator types

Node's `process.env` only stores strings, but sometimes you want to retrieve other types
(booleans, numbers), or validate that an env var is in a specific format (JSON,
URL, email address). To these ends, the following validation functions are available:

- `str()` - Passes string values through, will ensure a value is present unless a
  `default` value is given. Note that an empty string is considered a valid value -
  if this is undesirable you can easily create your own validator (see below)
- `bool()` - Parses env var strings `"1", "0", "true", "false", "t", "f", "yes", "no", "on", "off"` into booleans
- `num()` - Parses an env var (eg. `"42", "0.23", "1e5"`) into a Number
- `email()` - Ensures an env var is an email address
- `host()` - Ensures an env var is either a domain name or an ip address (v4 or v6)
- `port()` - Ensures an env var is a TCP port (1-65535)
- `url()` - Ensures an env var is a URL with a protocol and hostname
- `json()` - Parses an env var with `JSON.parse`

Each validation function accepts an (optional) object with the following attributes:

- `choices` - An Array that lists the admissible parsed values for the env var.
- `default` - A fallback value, which will be present in the output if the env var wasn't specified.
  Providing a default effectively makes the env var optional. Note that `default`
  values are not passed through validation logic, they are default _output_ values.
- `devDefault` - A fallback value to use _only_ when `NODE_ENV` is explicitly set and _not_ `'production'`.
  This is handy for env vars that are required for production environments, but optional
  for development and testing.
- `desc` - A string that describes the env var.
- `example` - An example value for the env var.
- `docs` - A URL that leads to more detailed documentation about the env var.
- `requiredWhen` - A function (env -> boolean) specifying when this env var is required. Use With default: undefined (optional value).

## Custom validators

### Basic usage

You can easily create your own validator functions with `envalid.makeValidator()`. It takes
a function as its only parameter, and should either return a cleaned value, or throw if the
input is unacceptable:

```js
import { makeValidator, cleanEnv } from 'envalid'
const twochars = makeValidator((x) => {
  if (/^[A-Za-z]{2}$/.test(x)) return x.toUpperCase()
  else throw new Error('Expected two letters')
})

const env = cleanEnv(process.env, {
  INITIALS: twochars(),
})
```

### TypeScript users

You can use either one of `makeValidator`, `makeExactValidator` and `makeStructuredValidator`
depending on your use case.

#### `makeValidator<BaseT>`

This validator has the output narrowed down to a subtype of `BaseT` (e.g. `str`).
Example of a custom integer validator:

```ts
const int = makeValidator<number>((input: string) => {
  const coerced = parseInt(input, 10)
  if (Number.isNaN(coerced)) throw new EnvError(`Invalid integer input: "${input}"`)
  return coerced
})
const MAX_RETRIES = int({ choices: [1, 2, 3, 4] })
// Narrows down output type to '1 | 2 | 3 | 4' which is a subtype of 'number'
```

#### `makeExactValidator<T>`

This validator has the output widened to `T` (e.g. `bool`). To understand the difference
with `makeValidator`, let's use it in the same scenario:

```ts
const int = makeExactValidator<number>((input: string) => {
  const coerced = parseInt(input, 10)
  if (Number.isNaN(coerced)) throw new EnvError(`Invalid integer input: "${input}"`)
  return coerced
})
const MAX_RETRIES = int({ choices: [1, 2, 3, 4] })
// Output type is 'number'
```

As you can see in this instance, _the output type is exactly `number`, the parameter type of
`makeExactValidator`_. Also note that here, `int` is not parametrizable.

## Error Reporting

By default, if any required environment variables are missing or have invalid
values, Envalid will log a message and call `process.exit(1)`. You can override
this behavior by passing in your own function as `options.reporter`. For example:

```js
const env = cleanEnv(process.env, myValidators, {
  reporter: ({ errors, env }) => {
    emailSiteAdmins('Invalid env vars: ' + Object.keys(errors))
  },
})
```

Additionally, Envalid exposes `EnvError` and `EnvMissingError`, which can be checked in case specific error handling is desired:

```js
const env = cleanEnv(process.env, myValidators, {
    reporter: ({ errors, env }) => {
        for (const [envVar, err] of Object.entries(errors)) {
            if (err instanceof envalid.EnvError) {
                ...
            } else if (err instanceof envalid.EnvMissingError) {
                ...
            } else {
                ...
            }
        }
    }
})
```

## Custom Middleware (advanced)

In addition to `cleanEnv()`, as of v7 there is a new `customCleanEnv()` function,
which allows you to completely replace the processing that Envalid applies after applying
validations. You can use this custom escape hatch to transform the output however you wish.

### `envalid.customCleanEnv(environment, validators, applyMiddleware, options)`

`customCleanEnv()` uses the same API as `cleanEnv()`, but with an additional `applyMiddleware`
argument required in the third position:

- `applyMiddleware` - A function that can modify the env object after it's
  validated and cleaned. Envalid ships (and exports) its own default
  middleware (see src/middleware.ts), which you can mix and match with your own
  custom logic to get the behavior you desire.

## Utils

### testOnly

The `testOnly` helper function is available for setting a default value for an env var only when `NODE_ENV=test`. It is recommended to use this function along with `devDefault`. For example:

```js
const env = cleanEnv(process.env, {
  SOME_VAR: envalid.str({ devDefault: testOnly('myTestValue') }),
})
```

For more context see [this issue](https://github.com/af/envalid/issues/32).

## FAQ

### Can I call `structuredClone()` on Envalid's validated output?

Since by default Envalid's output is wrapped in a Proxy, structuredClone [will not work](https://bugzilla.mozilla.org/show_bug.cgi?id=1269327#c1) on it. See [#177](https://github.com/af/envalid/issues/177).

## Related projects

- [dotenv](https://www.npmjs.com/package/dotenv) is a very handy tool for loading env vars from
  `.env` files. It was previously used as a dependency of Envalid. To use them together, simply
  call `require('dotenv').config()` before you pass `process.env` to your `envalid.cleanEnv()`.

- [react-native-config](https://www.npmjs.com/package/react-native-config) can be useful for React Native projects for reading env vars from a `.env` file

- [fastify-envalid](https://github.com/alemagio/fastify-envalid) is a wrapper for using Envalid within [Fastify](https://www.fastify.io/)

- [nestjs-envalid](https://github.com/simenandre/nestjs-envalid) is a wrapper for using Envalid with [NestJS](https://nestjs.com/)

- [nuxt-envalid](https://github.com/manuelhenke/nuxt-envalid) is a wrapper for using Envalid with [NuxtJS](https://nuxtjs.org/)

## Motivation

http://www.12factor.net/config
