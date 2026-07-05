---
repo: jonschlinkert/markdown-symbols
url: 'https://github.com/jonschlinkert/markdown-symbols'
homepage: 'https://github.com/jonschlinkert'
starredAt: '2014-08-29T00:46:58Z'
createdAt: '2014-02-21T19:08:40Z'
updatedAt: '2023-04-14T02:03:47Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:02.619Z'
description: >-
  Easily add and create custom symbols to use in markdown, and then compile them
  to HTML.
tags:
  - markdown
---

# markdown-symbols

> Easily add and create custom symbols to use in markdown, and then compile them to HTML.

If you find a bug or have a feature request, [please create an issue](https://github.com/jonschlinkert/markdown-symbols/issues).

Inspired by [@Vinz243](https://github.com/Vinz243) from [this issue on marked-extras](https://github.com/assemble/marked-extras/issues/3).

## Install
Install with [npm](npmjs.org):

```bash
npm i markdown-symbols --save
``` 

## Usage
```js
var symbols = require('markdown-symbols');
symbols.process( String );
```

## Add Custom Symbols
> An array of replacement patterns for custom symbols can be passed as a second parameter

```js
symbols.process( String, patterns );
```

Replacement patterns follow this format:

```js
var patterns = [
  {
    pattern: /foo/, // the pattern to replace
    replacement: 'bar' // the replacement. can be a string or a function.
  }
];
```

### Example

This is the pattern and replacement used to for alerts:

```js
var patterns = [
  {
    pattern: symbols.makeDelims(['!!', '!!']),
    replacement: function (match, inner) {
      var arr = inner.split('|');
      var text = arr[0];
      var modifier = arr[1] ? ' alert-' + arr[1] : '';
      return '<span class="alert' + modifier + '">' + text + '</span>';
    }
  }
];
```
Take a look at [index.js](./index.js) to see how the others are created.

### .makeDelims()

For patterns, the `makeDelims` utility method is a convenience for more easily creating custom symbols:

```js
symbols.makeDelims(['!!', '!!'])
```

The [delims](https://github.com/jonschlinkert/delims) library is used to create delimiters, visit that project to learn about usage and available options.



## Examples
To build the examples, run `npm i && node examples/example`

### Labels

```
||This is a label!||
||This is a label!|warning||
||This is a label!|success||
```

### Spoiler

```
> and captcha protected spoilers:

\{{Simple spoiler|info}}

!\{{Write me at <john.doe@example.com>|info}}
```

### Progress bars

```
=====0%=====
=====10%|error=====
=====40%|warning=====
=====80%|success=====
```

### Glyphicons

```
::|search::
```

## Badges

```
[[42]]
[[42|danger]]
```

## Jumbotrons

```
////
Hello, world|small
////
```

## Alerts

```
!!New update released! !!
!!New update released!|info!!
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license
