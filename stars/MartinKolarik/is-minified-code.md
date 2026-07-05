---
repo: MartinKolarik/is-minified-code
url: 'https://github.com/MartinKolarik/is-minified-code'
homepage: null
starredAt: '2019-10-13T21:53:51Z'
createdAt: '2017-06-09T14:16:43Z'
updatedAt: '2020-12-03T18:13:18Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:15.759Z'
description: Check if a piece of code is minified.
tags: []
---

# is-minified-code

Check if a piece of JS/CSS code is minified. Tested on the 10k most popular [jsDelivr](https://www.jsdelivr.com) packages.

## Installation

```bash
$ npm install is-minified-code
```

or

```html
<script src="https://cdn.jsdelivr.net/npm/is-minified-code@1.1.0"></script>
```

## Usage

```js
const isMinified = require('is-minified-code'); // or window.isMinified

isMinified('/* code */'); // => true/false
```

## License
Copyright (c) 2017 Martin Kolárik. Released under the MIT license.
