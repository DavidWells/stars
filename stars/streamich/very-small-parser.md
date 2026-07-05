---
repo: streamich/very-small-parser
url: 'https://github.com/streamich/very-small-parser'
homepage: ''
starredAt: '2024-11-25T02:26:55Z'
createdAt: '2024-11-24T11:22:19Z'
updatedAt: '2025-02-24T05:03:53Z'
language: TypeScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:18.401Z'
description: >-
  Small, no dependencies, Markdown, HTML, and inline CSS parser. Just 4KB,
  available as ESM module from CDN.
tags: []
---

# `very-small-parser`

- JavaScript parser for Markdown, HTML, and inline CSS.
- [Tiny](https://cdn.jsdelivr.net/npm/very-small-parser/dist/module.js), just over 4KB.
- Runs in browser and Node.js.
- No dependencies.
- Markdown is parsed into [MDAST (Markdown Abstract Syntax Tree)](https://github.com/syntax-tree/mdast).
- HTML is parsed into [HAST (Hypertext Abstract Syntax Tree)](https://github.com/syntax-tree/hast).


## Usage

[__Live demo__](https://jsfiddle.net/yd5eL1cb/)

On the web you can simply import the module using a script tag.

Using ESM.sh:

```html
<script type="module">
  import { markdown } from '//esm.sh/very-small-parser';

  const ast = markdown.block.parsef('Hello __world__!');
  console.log(ast);
</script>
```

Using jsDelivr:

```html
<script type="module">
  import { markdown } from '//esm.run/very-small-parser';

  const ast = markdown.block.parsef('Hello __world__!');
  console.log(ast);
</script>
```

To use TypeScript types or import into a Node.js project, you can install the package from npm:

```sh
npm install very-small-parser
```


## Reference

### Markdown

Parse Markdown document (block elements):

```js
import { markdown } from 'very-small-parser';

const ast = markdown.block.parsef('Hello __world__!');
```

Parse Markdown inline markup only:

```js
const ast = markdown.inline.parse('Hello __world__!');
```

Detect if text is likely to be a Markdown document:

```js
import { is } from 'very-small-parser/lib/markdown/is';

is('Hello __world__!');     // true
is('<b>Hello</b>!');        // false
```

Pretty-print MDAST back to text:

```js
import { markdown } from 'very-small-parser';
import { toText } from 'very-small-parser/lib/markdown/block/toText';

const mdast = markdown.block.parse('Hello __world__!');
const text = toText(mdast); // Hello __world__!
```

Convert MDAST to HAST (Markdown AST to HTML AST):

```js
import { markdown } from 'very-small-parser';
import { toHast } from 'very-small-parser/lib/markdown/block/toHast';
import { toText } from 'very-small-parser/lib/html/toText';

const mdast = markdown.block.parse('Hello __world__!');
const hast = toHast(mdast);
const html = toText(hast); // <p>Hello <strong>world</strong>!</p>
```


### HTML

Parse HTML to HAST (Hypertext Abstract Syntax Tree):

```js
import { html } from 'very-small-parser';

const ast = html.parse('<b>Hello</b> <i>world</i>!');
```

Pretty-print HAST to HTML:

```js
import { html } from 'very-small-parser';
import { toText } from 'very-small-parser/lib/html/toText';

const hast = html.parse('<b>Hello</b> <i>world</i>!');
const html = toText(hast); // '<b>Hello</b> <i>world</i>!'
```

Specify tabulation size for indentation when pretty-printing:

```js
import { html } from 'very-small-parser';
import { toText } from 'very-small-parser/lib/html/toText';

const tab = '  ';
const hast = html.parse('<div><b>Hello</b><i>world</i>!</div>', tab);
const html = toText(hast);
// <div>
//   <b>Hello</b>
//   <i>world</i>
//   !
// </div>
```

Convert HAST to MDAST (HTML AST to Markdown AST):

```js
import { html } from 'very-small-parser';
import { toMdast } from 'very-small-parser/lib/html/toMdast';
import { toText } from 'very-small-parser/lib/markdown/block/toText';

const hast = html.parse('<p><b>Hello</b> <i>world</i>!</p>');
const mdast = toMdast(hast);
const text = toText(mdast); // __Hello__ _world_!
```


### JSON-ML

JSON-ML is a simple way to represent HTML as JSON. For example, the HTML
`<b>Hello</b>` is represented as `['b', null, 'Hello']`. The first element is
the tag name, the second is the attributes, and the rest are children.

This package contains converters for JSON-ML to HAST and back. See the [`/src/html/json-ml`](./src/html/json-ml/) directory.
