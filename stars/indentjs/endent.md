---
repo: indentjs/endent
url: 'https://github.com/indentjs/endent'
homepage: ''
starredAt: '2021-04-08T17:17:29Z'
createdAt: '2017-12-02T12:11:43Z'
updatedAt: '2024-09-13T09:21:41Z'
language: TypeScript
license: NA
branch: master
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:52.042Z'
description: ⬅️  An ES6 string tag makes indentation better
tags:
  - endent
  - es6
  - javascript
  - template-literals
---

# Endent [![stability][stability-image]][stability-index]

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![dm][dm-image]][npm-url]
[![js-standard-style][code-style]][standard]

[stability-image]: https://img.shields.io/badge/stability-stable-green.svg
[stability-index]: https://nodejs.org/api/documentation.html#documentation_stability_index
[npm-image]: https://img.shields.io/npm/v/endent.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/endent
[travis-image]: https://img.shields.io/travis/indentjs/endent.svg?style=flat-square
[travis-url]: https://travis-ci.org/indentjs/endent
[dm-image]: http://img.shields.io/npm/dm/endent.svg?style=flat-square
[code-style]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard]: https://github.com/feross/standard

An ES6 string tag that makes indentation right, adds some key features to [dedent](https://github.com/dmnd/dedent).

## Migrate

Because I lost my 2 factor authentic token, this project has moved to https://github.com/zhouhanseng/endent

## Feature

### Pretty object

```ts
import dedent from "dedent";
import endent from "endent";

var someobj = {
  contact: {
    jack: 123456,
    tom: 654321,
  },
  color: "blue",
};

var somejson = '["bear", "fish", "dog", "cat"]';

var awfulTmpl = dedent`
  function store (state, emitter) {
    state["someobj"] = ${JSON.stringify(someobj, null, 2)}
    state["somejson"] = ${JSON.stringify(JSON.parse(somejson), null, 2)}
  }
`;
// use endent.pretty(value) when value is object or array.
var prettyTmpl = endent`
  function store (state, emitter) {
    state["someobj"] = ${endent.pretty(someobj)}
    state["somejson"] = ${somejson}
  }
`;

console.log(awfulTmpl + "\n\n" + prettyTmpl);
```

```ts
// awfulTmpl
function store(state, emitter) {
  state["someobj"] = {
    contact: {
      jack: 123456,
      tom: 654321,
    },
    color: "blue",
  };
  state["somejson"] = ["bear", "fish", "dog", "cat"];
}

// prettyTmpl
function store(state, emitter) {
  state["someobj"] = {
    contact: {
      jack: 123456,
      tom: 654321,
    },
    color: "blue",
  };
  state["somejson"] = ["bear", "fish", "dog", "cat"];
}
```

### Endows suitable indentation for multiline interpolation

```ts
var dependencies = ["jquery", "underscore", "bootstrap"];
var dependencyTmpl = ``;
dependencies.forEach((d, i) => {
  dependencyTmpl += `var ${d} = require("${d}")\n`;
});

var awfulTmpl = dedent`
  ;(function () {
    ${dependencyTmpl}
  })()
`;

var prettyTmpl = endent`
  ;(function () {
    ${dependencyTmpl}
  })()
`;

console.log(awfulTmpl + "\n\n" + prettyTmpl);
```

```js
// awfulTmpl
(function () {
  var jquery = require("jquery");
  var underscore = require("underscore");
  var bootstrap = require("bootstrap");
})();

// prettyTmpl
(function () {
  var jquery = require("jquery");
  var underscore = require("underscore");
  var bootstrap = require("bootstrap");
})();
```

## License

MIT
