---
repo: xobotyi/bem
url: 'https://github.com/xobotyi/bem'
homepage: null
starredAt: '2023-01-11T19:57:28Z'
createdAt: '2020-06-10T20:15:34Z'
updatedAt: '2023-01-11T19:57:28Z'
language: TypeScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:59.096Z'
description: The fastest BEM class name generator
tags: []
---

<div align="center">

# @xobotyi/bem

The fastest BEM class name generator

[![NPM Version](https://flat.badgen.net/npm/v/@xobotyi/bem)](https://www.npmjs.com/package/@xobotyi/bem)
[![NPM Downloads](https://flat.badgen.net/npm/dm/@xobotyi/bem)](https://www.npmjs.com/package/@xobotyi/bem)
[![NPM Dependents](https://flat.badgen.net/npm/dependents/@xobotyi/bem)](https://www.npmjs.com/package/@xobotyi/bem)
[![Build](https://img.shields.io/github/workflow/status/xobotyi/bem/CI?style=flat-square)](https://github.com/xobotyi/bem/actions)
[![Coverage](https://flat.badgen.net/codecov/c/github/xobotyi/bem)](https://app.codecov.io/gh/xobotyi/bem)
[![Types](https://flat.badgen.net/npm/types/@xobotyi/bem)](https://www.npmjs.com/package/@xobotyi/bem)
[![Tree Shaking](https://flat.badgen.net/bundlephobia/tree-shaking/@xobotyi/bem)](https://bundlephobia.com/result?p=@xobotyi/bem)

</div>

---

<div align="center">❤️Please consider starring this project to show your love and support.🙌</div>

---

As handwriting BEM-compatible class names is quite painful and existing couple of packages are slow or lack of
functionality needed for me (such as prefixing) &mdash; this package exists.
Also as figures this package the [fastest](/benchmark) one I know about🚀

And turns this:
```jsx
import * as react from "react";

export function component(){
  return (
    <div className="ns__blockName ns__blockName_size-l">
      <div className="ns__blockName__wrapperElement">
        <div className="ns__blockName__headerElement ns__blockName__headerElement_size-l">Block title</div>
        <button className="ns__blockName__buttonElement ns__blockName__buttonElement_left ns__blockName__buttonElement_size-l ns__blockName__buttonElement_disabled">Button left</button>
        <button className="ns__blockName__buttonElement ns__blockName__buttonElement_right ns__blockName__buttonElement_size-l">Button right</button>
      </div>
    </div>
  );
}
```
into this:
```jsx
import * as react from "react";
import { BEM } from "@xobotyi/bem";

const bem = BEM.extend({prefix: "MY"}); // in real world this row will be a single per project
                                        // and initialized elsewhere
const b = bem.lock('blockName');

export function component(){
  return (
    <div className={ b({ size:'l' }) }>
      <div className={ b('wrapperElement') }>
        <div className={ b('headerElement', { size: 'l' }) }>Block title</div>
        <button className={ b('buttonElement', { 'left':true, size:'l', disabled:true }) }>Button left</button>
        <button className={ b('buttonElement', { 'right':true, size:'l' }) }>Button right</button>
      </div>
    </div>
  );
}
```


#### Installation note

This package written in TypeScript and delivered with 3 versions:

- `main` field of `package.json` is pointing to transpiled ES5 version with CJS modules resolution;
- `module` field is pointing to transpiled ES5 version with ES modules resolution;
- `esnext` field is pointing to the ESNext version with ES modules resolution;

Depending on your targets you may have to use [Webpack](https://webpack.js.org/) and/or
[Babel](http://babeljs.io/) to pull untranspiled version of package.
See some tips on wiring thing up: [https://2ality.com/2017/06/pkg-esnext.html](https://2ality.com/2017/06/pkg-esnext.html)


## Usage

##### Regular BEM
By default component provides default BEM syntax
```typescript
import { BEM } from "@xobotyi/bem";

// blocks
BEM('block', ['large', 'disabled'], 'random_classname'); // block block_large block_disabled random_classname
// or
BEM('block', { size: 'large', disabled: true }); // block block_size_large block_disabled

// elements
BEM('block', 'element', { size: 'large' }); // block__element block__element_size_large
```

##### Syntax alternation
But you easily can alter any of separators as you wish, add prefix or make modifier-only generation as declared
in BEViS syntax notation.
```typescript
import { BEM } from "@xobotyi/bem";

const myBem = BEM.extend({
  prefix: 'PFX',
  prefixDelimiter: '__',
  elementDelimiter: '-',
  modifierDelimiter: '_',
  modifierValueDelimiter: '_',
  fullModifier: false,
});

// blocks
myBem('block', ['large', 'disabled']); // PFX__block _large _disabled
// or
myBem('block', { size: 'large', disabled: true }); // PFX__block _size_large _disabled

// elements
BEM('block', 'element', { size: 'large' }); // PFX__block-element _size_large
```

##### Block and Element baking
In order to improve performance it is possible to `bake-in` block and element name
```typescript jsx
import * as react from "react";
import { BEM } from "@xobotyi/bem";

const b = BEM.lock('block');

function render(){
  return (
    <div className={b()}>
      <span className={b('text', ['running'])}></span>
      <button className={b('button', { active: true })}></button>
    </div>
  );
}
```


### Performance (recent benchmark results)

Benchmark results can be found in the [`benchmark`](/benchmark) directory.

To run benchmarks simply clone this repo and make `yarn && yarn benchmark`.


## Related projects

- [cnbuilder](https://www.npmjs.com/package/cnbuilder) &mdash; Yet another classname string builder (the fastest one).
- [react-scrollbars-custom](https://www.npmjs.com/package/react-scrollbars-custom) &mdash; The best React custom scrollbars component. Allows you to customise scrollbars as you like it, crossbrowser!
- [zoom-level](https://www.npmjs.com/package/zoom-level) &mdash; A comprehensive cross-browser package that allow you to determine page's and element's zoom level.
- [@xobotyi/scrollbar-width](https://www.npmjs.com/package/@xobotyi/scrollbar-width) &mdash; A tool to get browser's scrollbars width.
- [@xobotyi/should-reverse-rtl-scroll](https://www.npmjs.com/package/@xobotyi/should-reverse-rtl-scroll) &mdash; A tool detecting if RTL scroll value should be negative.
