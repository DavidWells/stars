---
repo: lukeed/obj-str
url: 'https://github.com/lukeed/obj-str'
homepage: ''
starredAt: '2019-09-02T03:14:41Z'
createdAt: '2017-04-09T00:37:08Z'
updatedAt: '2025-02-11T21:33:16Z'
language: JavaScript
license: MIT
branch: master
stars: 248
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:26.203Z'
description: A tiny (96B) library for serializing Object values to Strings.
tags: []
---

# obj-str [![CI](https://github.com/lukeed/obj-str/workflows/CI/badge.svg)](https://github.com/lukeed/obj-str/actions) [![codecov](https://badgen.net/codecov/c/github/lukeed/obj-str)](https://codecov.io/gh/lukeed/obj-str)

> A tiny (96B) library for serializing Object values to Strings.

This module's intended use is for converting an Object with CSS class names (as keys) to a space-delimited `className` string. Other modules have similar goals (like [`classnames`](https://npm.im/classnames)), but `obj-str` only does one thing. This is why it's only 100 bytes gzipped!

_PS: I made this because [Preact 8.0 removed this built-in behavior](https://github.com/developit/preact/commit/b2c85e3f7fa89ebbf242b00f4cab7619641e3a52) and I wanted a quick, drop-in replacement._

## Install

```
$ npm install --save obj-str
```


## Usage

```js
import objstr from 'obj-str';

objstr({ foo:true, bar:false, baz:isTrue() });
//=> 'foo baz'
```

### React

With React (or any of the React-like libraries!), you can take advantage of any `props` or `state` values in order to express conditional classes as an object.

```js
import React from 'react';
import objstr from 'obj-str';

const TodoItem = ({ text, isDone, disabled }) => (
  <li className={ objstr({ item:true, completed:isDone, disabled }) }>
    <input type="checkbox" disabled={ disabled } checked={ isDone } />
    <label>{ text }</label>
  </li>
);
```

### Preact

For simple use, the [React](#react) example will work for Preact too. However, you may also define a custom vNode "polyfill" to automatically handle Objects when used inside `className`.

> **Note:** For users of Preact 7.1 and below, _you do not need this module_! Your version includes this behavior out of the box!

```js
import objstr from 'obj-str';
import { options } from 'preact';

const old = options.vnode;

options.vnode = vnode => {
  const props = vnode.attributes;
  if (props != null) {
    const k = 'class' in props ? 'class' : 'className';
    if (props[k] && typeof props[k]=='object') {
      props[k] = objstr(props[k]);
    }
  }
  old && old(vnode);
}
```


## API

### objstr(input)

#### input

Type: `Object`

A hashmap of keys & their truthy/falsey values. Booleans are preferred when speed is critically important.


## Related

- [babel-plugin-optimize-obj-str](./babel-plugin-optimize-obj-str) - Babel plugin to transform `obj-str` calls into optimized expressions.

- [clsx](https://github.com/lukeed/clsx) - Drop-in replacement for `obj-str` and `classnames` – handles all (and multiple) input types.


## License

MIT © [Luke Edwards](http://lukeed.com)
