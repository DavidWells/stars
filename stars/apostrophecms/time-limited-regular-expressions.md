---
repo: apostrophecms/time-limited-regular-expressions
url: 'https://github.com/apostrophecms/time-limited-regular-expressions'
homepage: null
starredAt: '2022-09-11T03:25:25Z'
createdAt: '2020-07-09T19:39:58Z'
updatedAt: '2024-06-11T20:53:23Z'
language: JavaScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:32.148Z'
description: >-
  Evaluates regular expressions with a time limit to mitigate DOS attacks based
  on catastrophic backtracking.
tags: []
---

# time-limited-regular-expressions

[![CircleCI](https://circleci.com/gh/apostrophecms/time-limited-regular-expressions/tree/main.svg?style=svg)](https://circleci.com/gh/apostrophecms/time-limited-regular-expressions/tree/main)

## Why?

You want to let end users enter their own regular expressions. But regular expressions can lead to [catastrophic backtracking](https://medium.com/@nitinpatel_20236/what-are-evil-regexes-7b21058c747e). This can take up hours of CPU time. In Node.js this means no other code can execute. It is a Denial of Service (DOS) attack vector, whether intentionally or by accident.

This module lets you test regular expressions with a time limit to mitigate the pain.

## Usage

```javascript
// Set a 1-second limit. Default is 0.25 seconds
const regExp = require('time-limited-regular-expressions')({ limit: 1 });

// A common email address validator with potentially evil characteristics
// (catastrophic backtracking)
const evil = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;

(async () => {
  // Run a potentially slow regular expression on short, matching input
  const realEmail = 'test@test.com';
  const realEmailResult = await regExp.match(evil, realEmail);
  // Normal behavior, may be truthy or falsy according to match,
  // returns the same array result as regular regexp match() calls
  console.log(realEmailResult);
  // This input is long enough to trigger catastrophic backtracking and
  // could take hours to evaluate
  const evilEmail = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  try {
    const evilEmailResult = await regExp.match(evil, evilEmail);
    // We will not get here, exception will be thrown
  } catch (e) {
    console.log(e.name); // Will be 'timeout'
  }
})();
```

## Notes

"Why is `match` an async function?" It runs in a separate process because that is the only way to avoid starving the Node.js application and implement a portable timeout on the regular expression.

"How bad is the performance overhead?" Communication with a separate worker process makes it slower of course, but the process is reused by later calls, so the hit is not serious.

Flags, for instance the `g` flag, are supported.

You can pass the regular expression as a string, but regular expression literals (what you are used to typing) are easier to get right because you don't have to double-escape anything.
