---
repo: GuillaumeRochat/cron-validator
url: 'https://github.com/GuillaumeRochat/cron-validator'
homepage: null
starredAt: '2024-05-09T22:35:00Z'
createdAt: '2019-04-30T15:17:08Z'
updatedAt: '2024-11-26T22:35:51Z'
language: TypeScript
license: MIT
branch: master
stars: 79
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:30.655Z'
description: Validates cron expressions
tags: []
---

# Cron Validator

Cron Validator is a util that allows you to validate a cron expression, similar to what [crontab guru](https://crontab.guru) does, but in your code base.

## Alternatives

- [cron-validate](https://github.com/Airfooox/cron-validate):
  It has more features and configuration options to restrict ranges, or create presets of configs. It includes an AWS preset that should match AWS Schedule Expressions.

## Installation

```
npm install cron-validator
```

## Usage

Require syntax:

```js
const cron = require('cron-validator');

if (cron.isValidCron('* * * * *')) {
    // Do something
}
```
Or import syntax with TypeScript:
```ts
import { isValidCron } from 'cron-validator'

if (isValidCron('* * * * *')) {
    // Do something
}
```

Support for seconds can be enabled by passing the `seconds` flag as true in options:

```js
const cron = require('cron-validator');

cron.isValidCron('* * * * * *');
// false

cron.isValidCron('* * * * * *', { seconds: true });
// true
```

The same goes to enable the `alias` support for months and weekdays:

```js
const cron = require('cron-validator');

cron.isValidCron('* * * * mon');
// false

cron.isValidCron('* * * * mon', { alias: true });
// true
```

Likewise, the `allowBlankDay` flag can be enabled to mark days or weekdays blank with a `?` symbol:

```js
const cron = require('cron-validator');

cron.isValidCron('* * * * ?');
// false

cron.isValidCron('* * * * ?', { allowBlankDay: true });
// true
```

The `allowSevenAsSunday` flag can be enabled to enable support for digit 7 as Sunday:

```js
const cron = require('cron-validator');

cron.isValidCron('* * * * 7');
// false

cron.isValidCron('* * * * 7', { allowSevenAsSunday: true });
// true
```

The `allowNthWeekdayOfMonth` flag can be enabled to enable expressions denoting n-th weekday of the month:

```js
const cron = require('cron-validator');

cron.isValidCron('* * * * tue#2');
// false

cron.isValidCron('* * * * tue#2', { allowNthWeekdayOfMonth: true }); // second Tuesday of each month
// true
```

## Features

- [x] Support seconds.
- [x] Support alias.
- [x] Support blank day notation with `?` symbol.
- [x] Support both 0-6 and 1-7 ranges for weekdays.
- [x] Support n-th weekday of month such as `TUE#2`
- [ ] ~~Have an explain mode returning the fragments in error.~~

## Motivations

**Many great cron libraries already exists on NPM, why this one?**

Libraries like [node-cron](https://github.com/kelektiv/node-cron) are primarily made to schedule jobs using a cron expression, not validate those cron expressions. They come with additional behaviors not always required. They also bring their own set of defaults which might be in conflicts with the defaults of other external systems. We needed something to validate an expression before sending it off to an external system, so we created this to be a little more strict and configurable, with a more specific behavior.

We decided to go for the naive approach first, which results in lenghty code and tests, but also making it easier to reason about cron expressions and their specific rules.
