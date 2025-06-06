---
repo: ShivrajRath/jsonabc
url: 'https://github.com/ShivrajRath/jsonabc'
homepage: 'http://novicelab.org/jsonabc'
starredAt: '2022-10-21T04:43:22Z'
createdAt: '2016-05-28T18:22:20Z'
updatedAt: '2025-02-09T07:15:17Z'
language: JavaScript
license: MIT
branch: master
stars: 152
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:18.983Z'
description: >-
  Sorts JSON object alphabetically. It supports nested objects, arrays and
  collections. Works offline and beautifies JSON object too.
tags:
  - javascript
  - json
  - json-abc
  - sort
  - sorts-json
  - utility
---

[![Build Status][travis-icon]][travis]

## JSON ABC

Sorts JSON object alphabetically. It supports nested objects, arrays and collections. Works offline and beautifies JSON object too.

### Try it (Demo)

[JSON ABC][]

### Supports

- Beautifies JSON
- Sorts Plain Objects, Collections, Arrays
- Has offline supports
- IE9+ Support
- Mobile/ Tablet friendly
- Sorting plain arrays is optional

### Download

`npm install jsonabc`

### Usage

1.  Used directly in Node:
    ```js
    var myJsonAbc = require("jsonabc");
    var sorted = myJsonAbc.sortObj({ c: 0, b: 1, a: 0 });
    ```
2.  Built by Browserify, for directly inclusion in the browser:
    ```html
    <script src="dist/jsonabc.js"></script>
    <script>
      var output = jsonabc.sort(inputStr, noarray);
    </script>
    ```

### Example

It converts this

```json
{
  "object": {
    "b": 2,
    "a": 1,
    "d": 4,
    "c": 3
  },
  "array": ["d", "1", "c", "a", "b"],
  "collection": [
    {
      "b": 2,
      "a": 1,
      "d": 4,
      "c": 3
    },
    {
      "__b1": 2,
      "__a2": 1,
      "__d3": 4,
      "__c4": 3
    },
    ["d", "1", "c", "a", "b"]
  ]
}
```

to this

```json
{
  "array": ["1", "a", "b", "c", "d"],
  "collection": [
    ["1", "a", "b", "c", "d"],
    {
      "__a2": 1,
      "__b1": 2,
      "__c4": 3,
      "__d3": 4
    },
    {
      "a": 1,
      "b": 2,
      "c": 3,
      "d": 4
    }
  ],
  "object": {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4
  }
}
```

---

License: [MIT][]

[json abc]: https://novicelab.org/jsonabc "JSON ABC online"
[travis-icon]: https://travis-ci.org/ShivrajRath/jsonabc.svg?branch=master
[travis]: https://travis-ci.org/ShivrajRath/jsonabc "Build status — Travis-CI"
[mit]: https://mit-license.org/2016?c=ShivrajRath
