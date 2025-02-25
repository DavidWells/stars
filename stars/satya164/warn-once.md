---
repo: satya164/warn-once
url: 'https://github.com/satya164/warn-once'
homepage: null
starredAt: '2021-12-02T05:05:24Z'
createdAt: '2021-03-09T15:32:16Z'
updatedAt: '2024-10-27T09:39:40Z'
language: JavaScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:31.083Z'
description: Show a warning once
tags: []
---

# warn-once

Print a warning exactly once during development. Suitable for deprecation warnings, warnings for missing setup etc.

## Installation

Open a Terminal in the project root and run:

```sh
npm install warn-once
```

## Usage

The `warnOnce` function accepts a condition as the first argument. If the condition is `true`, then it'll print a warning:

```js
const warnOnce = require('warn-once');

// ...

warnOnce(someCondition, 'This is a warning message');
```

You can call `warnOnce` multiple times, but if the warning was printed already, it'll not be printed again.

The warning is only shown during development, i.e. if `NODE_ENV` is not set to `'production'`.
