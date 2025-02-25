---
repo: artalar/rtcad
url: 'https://github.com/artalar/rtcad'
homepage: null
starredAt: '2023-01-05T20:44:16Z'
createdAt: '2018-05-08T18:27:53Z'
updatedAt: '2023-01-05T20:44:16Z'
language: TypeScript
license: GPL-3.0
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:00.731Z'
description: runtime type checking and documentation
tags: []
---

## WORK IN PROGRESS

Current status: proof of concept

# rtcad

> runtime type checking and documentation
<!-- refinement type checking ;) -->

## Motivation

1. Validate arguments and result of functions call for good guaranties of code correctness.
2. Automatically generate documentation.
3. Infer static types.
4. SSoT of validators, static types and documentation.
5. [static] Refinement data-types
6. Leave mocks for tests (generate it automatically).
7. Property-base testing out of the box.

## [target] Example

```typescript
import * as t from 'rtcad'
import * as network from './network' // fetcher

// declare runtype
const Password = t.String()

// declare runtype with description and extended validation
const Email = t`
  simple e-mail validation
  ${t.String(value => value.contains('@'))}
`

// declare structure
const User = t`user data ${t.Record({
  id: t.Number(),
  name: t.String(),
  avatar: t.OR(t.Null, t.String(url => url.startsWith('http'))),
})}`

// declare ~generic by custom runtype
// (TypeScript syntax)
const Instanceof = <T extends t.Runtype>(Gen: T) =>
  t.custom<T>(value => value instanceof Gen)

// use generic
const ErrorApi = Instanceof(network.Error)

// declare contract for function with description (Markdown)
export const authUser = t`
  # Return detailed user data from auth service
  > set auth token to cookies
  - ${[Email, Password]}
  - ${t.Promise(User, ErrorApi)}
`((email, password) => network.get(`/user`, { email, password }))

/* EQUAL */

// declare contract for function without description
export const authUser = t([Email, Password], t.Promise(User, ErrorApi))(
  (email, password) => network.get(`/user`, { email, password }),
)

/**
 * Now we can:
 * 1. Infer static types.
 * 2. Validate arguments and result of `authUser` call.
 * 3. Automatically generate documentation.
 * 4. Leave mocks for tests (generate it automatically).
 * 5. Property-base testing out of the box.
 */
```

<!--
TODO:
* study
    * http://usejsdoc.org 
      > https://code-examples.net/ru/docs/jsdoc
    * https://en.wikipedia.org/wiki/Design_by_contract
* write needed functionality on a road map
    * description syntax
      > MD (reason - convert to gitbook)
    * checks native types
    * checks user types (+ API for that)
    * API for literals range
    * IDE extensions for tips
    * documentation generator
    * codemon for convert JSDoc to rtcad
    * write autotests core
    * write autotests UI-manager
    * ...
-->

## Background

- API inspired by [runtypes](https://github.com/pelotom/runtypes)
