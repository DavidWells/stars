---
repo: markwylde/jsbun
url: 'https://github.com/markwylde/jsbun'
homepage: null
starredAt: '2022-11-12T20:10:07Z'
createdAt: '2021-01-05T14:00:19Z'
updatedAt: '2022-11-12T20:10:07Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:10.915Z'
description: >-
  An extremely lightweight bundler that does nothing but merge your js files
  using commonjs.
tags: []
---

# jsbun
An extremely lightweight bundler that does nothing but merge your js files using commonjs.

## Installation
```bash
npm install --save-dev jsbun
```

(or) globally:
```bash
npm install -g jsbun
```

## Example
The best example is the [npm test scenario](test/scenarios/npm) used in this project.

## Usage
### CLI
```bash
jsbun -o bundled.js js/index.js
```

Optional arguments are:

```text
--watch (-w) [pattern]         rerun when the files change (default pattern is '**/*.js')
--output (-o) fileName         output the bundle to a file instead of to stdout
```

### Code
```javascript
const jsbun = require('jsbun');
const bundled = await jsbun('./js/index.js');
console.log(bundled);
```
