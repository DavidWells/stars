---
repo: alexmacarthur/striff
url: 'https://github.com/alexmacarthur/striff'
homepage: ''
starredAt: '2022-04-08T23:02:32Z'
createdAt: '2022-03-04T02:25:28Z'
updatedAt: '2024-08-23T22:31:35Z'
language: TypeScript
license: MIT
branch: master
stars: 203
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:48.811Z'
description: Real simple string diffing.
tags:
  - diffing
  - javascript
  - text
---

# striff

[![Bundle Size](https://badgen.net/bundlephobia/minzip/striff)](https://bundlephobia.com/result?p=striff)

Simple string diffing. Given two strings, `striff` will return an object noting which characters were added or removed, and at which indices.

## Installation

Run `npm install striff`. Or stick in on a page [via CDN](https://unpkg.com/striff).

## Usage

Import it, pass a couple of strings, and do whatever you want with the results.

```js
import striff from "striff";

const result = striff("string #1", "string #2");

// {
//   added: [
//     ...added characters
//   ],
//   removed: [
//     ...removed characters
//   ]
// }
```

## Examples

Here's the kind of result you'll get with different types of diffing.

### Strings w/ Characters Added

#### Input

```js
const str1 = "abc";
const str2 = "abcde";

const result = striff(str1, str2);
```

#### Result

```js
{
  added: [
    {
      value: "d",
      index: 3
    },
    {
      value: "e",
      index: 4
    }
  ],
  removed: []
}
```

### Strings w/ Characters Removed

#### Input

```js
const str1 = "abc";
const str2 = "a";

const result = striff(str1, str2);
```

#### Result

```js
{
    added: [],
    removed: [
    {
      value: "b",
      index: 1
    },
    {
      value: "c",
      index: 2
    }
  ]
}
```

### Strings w/ Duplicate, Consecutive Characters

For strings whose characters were changed at the _end_, the indices will be grouped together at the end of the string.

#### Input

```js
const str1 = "abbbc";
const str2 = "ab";

const result = striff(str1, str2);
```

#### Result

```js
{
  added: [],
  removed: [
    {
      value: "b",
      index: 2
    },
    {
      value: "b",
      index: 3
    },
    {
      value: "c",
      index: 4
    }
  ]
}
```

For those whose characters were changed at the _beginning_, the indices will be grouped together at the beginning.

#### Input

```js
const str1 = "abbbc";
const str2 = "bc";

const result = striff(str1, str2);
```

#### Result

```js
{
  added: [].
  removed: [
    {
      value: "a",
      index: 0
    },
    {
      value: "b",
      index: 1
    },
    {
      value: "b",
      index: 2
    }
  ]
}
```

## Feedback or Contributions

Make an issue or a pull request!
