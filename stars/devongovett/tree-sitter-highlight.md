---
repo: devongovett/tree-sitter-highlight
url: 'https://github.com/devongovett/tree-sitter-highlight'
homepage: null
starredAt: '2021-12-22T19:49:17Z'
createdAt: '2021-12-22T00:54:18Z'
updatedAt: '2024-12-31T22:31:19Z'
language: Rust
license: MIT
branch: master
stars: 236
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:25.855Z'
description: A syntax highlighter for Node powered by Tree Sitter. Written in Rust.
tags: []
---

# tree-sitter-highlight

A syntax highlighter for Node.js powered by [Tree Sitter](https://github.com/tree-sitter/tree-sitter). Written in Rust.

## Usage

The following will output HTML:

```js
const treeSitter = require('tree-sitter-highlight');

treeSitter.highlight('const foo = "hi";', treeSitter.Language.JS);
// => '<span class="source">...</span>'
```

You can also output a [HAST](https://github.com/syntax-tree/hast) AST, which is useful for integrating with Markdown or MDX processors (e.g. Remark).

```js
treeSitter.highlightHast('const foo = "hi";', treeSitter.Language.JS);
// => {type: 'element', children: [...]}
```

## Themes

The output HTML will contain CSS class names for various tokens. These will depend on the language, but there are several common names used across languages. Here is a basic example theme:

```css
.keyword {
  color: purple;
}

.function {
  color: blue;
}

.type {
  color: pink;
}

.string {
  color: green;
}

.number {
  color: brown;
}

.operator {
  color: gray;
}

.comment {
  color: lightgray;
}
```

Inspect the generated output HTML and design your CSS accordingly.

## License

MIT
