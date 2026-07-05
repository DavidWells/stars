---
repo: tschoffelen/is-iso-date-string
url: 'https://github.com/tschoffelen/is-iso-date-string'
homepage: ''
starredAt: '2024-09-16T22:26:19Z'
createdAt: '2024-09-03T07:44:26Z'
updatedAt: '2024-09-16T22:26:20Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:21.546Z'
description: Checks if a string is a valid ISO 8601 date string.
tags: []
---

# is-iso-date-string

Checks if a string is a valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations)
date string.

## Installation

Run `yarn add is-iso-date-string`, or `npm i is-iso-date-string` if you insist.

## Usage

```js
const isIsoDateString = require("is-iso-date-string");

isIsoDateString("2024-09-03T08:39:01+01:00"); // true
isIsoDateString("2024-09-03"); // true
isIsoDateString("03-09-2024 08:39:01"); // false
```
