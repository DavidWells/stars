---
repo: davidemiceli/gender-detection
url: 'https://github.com/davidemiceli/gender-detection'
homepage: null
starredAt: '2019-10-06T06:31:14Z'
createdAt: '2016-08-04T13:15:07Z'
updatedAt: '2024-07-25T20:29:30Z'
language: JavaScript
license: GPL-3.0
branch: master
stars: 66
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:20.442Z'
description: Determine a person's gender based on his/her first name.
tags:
  - ai
  - gender
  - gender-detection
  - nlp
---

# Gender Detection

## Description
A node.js module to determine a person's gender based on his/her first name.  

It works also for many languages other than english, supporting international names, using an own datasource of 40.000 records that can be extended.
This module is able to clean the text, detecting gender from dirty or unclear names.

## Installation

    $ npm install gender-detection

## Example
```javascript
// Require gender detection module
const gender = require('gender-detection');

let g;

// Use it to detect the gender:
g = gender.detect('Tim Johnson');
// "male"

g = gender.detect('Holly');
// "female"

g = gender.detect('GhJGhgj')
// "unknown"

// It works also with unclean or dirty names:
g = gender.detect('BiLL$...');
// "male"

g = gender.detect('::Jenni♥fer::');
// "female"

// Extract the first name
const first_name = gender.getFirstName('Mario Bros');
// "mario"
```

### Unit tests
```shell
npm test
```
