---
repo: ymatuhin/flatry
url: 'https://github.com/ymatuhin/flatry'
homepage: ''
starredAt: '2019-02-15T02:28:44Z'
createdAt: '2017-11-16T14:21:15Z'
updatedAt: '2024-08-30T03:28:48Z'
language: JavaScript
license: MIT
branch: master
stars: 55
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:45.541Z'
description: Flatry — try/catch free error handling module for JavaScript
tags: []
---

# Flatry

[![Build Status](https://travis-ci.org/ymatuhin/flatry.svg?branch=master)](https://travis-ci.org/ymatuhin/flatry)
[![GitHub license](https://img.shields.io/github/license/ymatuhin/flatry.svg)](https://github.com/ymatuhin/flatry/blob/master/LICENSE)

Flatry (flat try) converting promise or function to flat array response with `[err, result]`.

Inspired by golang style error handling without try/catch.

&nbsp;

## Install

```bash
npm install flatry
# or
yarn add flatry
```

&nbsp;

## Use

```js
import flatry from "flatry";
// or
const flatry = require("flatry");
```

&nbsp;

## Examples

![Flatry example](https://raw.githubusercontent.com/ymatuhin/flatry/master/example.png)

&nbsp;

### Asynchronous (async/await)

```js
// Before
async asyncData({ app, error }) {
  try {
    const categories = (await app.$axios.$get('forum')).sections;
    return { categories };
  } catch (err) {
    return error({ statusCode: err.statusCode });
  }
}


// After
async asyncData({ app, error }) {
  const [err, res] = await flatry(app.$axios.$get('forum'));
  if (err) return error({ statusCode: err.statusCode });
  return { categories: res.sections };
}
```

### Synchronous

```js
// Before
let result = false;
try {
  result = mayThrowErrorSomeday();
} catch (error) {
  console.log("Error catched", error);
}
console.log("result", result);

// After
const [err, result] = flatry(mayThrowErrorSomeday);
if (err) console.log("Error catched", err);
console.log("result", result);
```
