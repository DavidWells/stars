---
repo: neverendingqs/cron-allowed-range
url: 'https://github.com/neverendingqs/cron-allowed-range'
homepage: ''
starredAt: '2019-11-17T01:08:24Z'
createdAt: '2019-10-18T19:15:36Z'
updatedAt: '2022-01-03T19:49:06Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:12.589Z'
description: Use cron-like expressions to test if a datetime is in an allowed range.
tags: []
---

[![CircleCI](https://circleci.com/gh/neverendingqs/cron-allowed-range.svg?style=svg)](https://circleci.com/gh/neverendingqs/cron-allowed-range)
[![Coverage
Status](https://coveralls.io/repos/github/neverendingqs/cron-allowed-range/badge.svg?branch=master)](https://coveralls.io/github/neverendingqs/cron-allowed-range?branch=master)
[![npm
version](https://badge.fury.io/js/cron-allowed-range.svg)](https://badge.fury.io/js/cron-allowed-range)

# cron-allowed-range
Use cron-like expressions to test if a datetime is in an allowed range.

## Usage

### API

```sh
npm install cron-allowed-range
```

```js
const CronAllowedRange = require('cron-allowed-range');

/* Allowed if it is:
 * - At any minute
 * - Between 9 AM - 6 PM
 * - On any day of the month
 * - Between September to June, or on August
 * - Between Monday to Friday
 */
const cr = new CronAllowedRange('* 9-17 * 9-6,8 1-5', 'America/Toronto');

cr.isDateAllowed(new Date('December 18, 1995 08:59:59 GMT-0500'));
// false

cr.isDateAllowed(new Date('August 18, 1995 17:00:00 GMT-0400'));
// true
```

### CLI

```sh
npm install -g cron-allowed-range

cr -e '* 9-17 * * *' -t 'America/Toronto'

echo $?
# exit code is 0 if current time is within range, otherwise 1
```

## Formatting the Cron-Like Expression

```
* represents any value
, separator (e.g. 5,6)
- used to define (inclusive) ranges (e.g. 5-9)
/ not supported
```

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
│ │ │ │ │
│ │ │ │ │
* * * * *
```
<small>_Diagram from
[Wikipedia](https://en.wikipedia.org/wiki/Cron#Overview)_</small>
