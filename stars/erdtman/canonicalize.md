---
repo: erdtman/canonicalize
url: 'https://github.com/erdtman/canonicalize'
homepage: null
starredAt: '2022-01-20T20:44:34Z'
createdAt: '2018-05-03T20:07:10Z'
updatedAt: '2024-10-26T22:12:46Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 46
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:19.776Z'
description: JSON canonicalize function
tags: []
---

[![Build Status](https://app.travis-ci.com/erdtman/canonicalize.svg?branch=master)](https://app.travis-ci.com/erdtman/canonicalize)
[![Coverage Status](https://coveralls.io/repos/github/erdtman/canonicalize/badge.svg?branch=master)](https://coveralls.io/github/erdtman/canonicalize?branch=master)
# canonicalize
JSON canonicalize function. Creates crypto safe predictable canocalization of
JSON as defined by [RFC8785](https://tools.ietf.org/html/rfc8785)
## Usage
### Normal Example
```js
const canonicalize = require('canonicalize');
const  json = {
	"from_account": "543 232 625-3",
	"to_account": "321 567 636-4",
	"amount": 500,
	"currency": "USD"
}
console.log(canonicalize(json));
// output: {"amount":500,"currency":"USD","from_account":"543 232 625-3","to_account":"321 567 636-4"}
```
### Crazy Example
```js
const canonicalize = require('canonicalize');
const  json = {
	"1": {"f": {"f":  "hi","F":  5} ,"\n":  56.0},
	"10": { },
	"":  "empty",
	"a": { },
	"111": [ {"e":  "yes","E":  "no" } ],
	"A": { }
}
console.log(canonicalize(json));
// output: {"":"empty","1":{"\n":56,"f":{"F":5,"f":"hi"}},"10":{},"111":[{"E":"no","e":"yes"}],"A":{},"a":{}}
```
## Install
```
npm install canonicalize --save
```
## Test
```
npm test
```
