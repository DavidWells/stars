---
repo: brettstimmerman/mensch
url: 'https://github.com/brettstimmerman/mensch'
homepage: null
starredAt: '2015-01-08T08:00:06Z'
createdAt: '2013-06-11T23:46:42Z'
updatedAt: '2024-12-11T06:24:45Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 114
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:55.171Z'
description: A decent CSS parser.
tags: []
---

# mensch [![Node.js CI](https://github.com/brettstimmerman/mensch/workflows/Node.js%20CI/badge.svg)](https://github.com/brettstimmerman/mensch/actions/workflows/ci.yaml)

A decent CSS parser.

# usage

```sh
npm install mensch
```

```js
var mensch = require('mensch');

var ast = mensch.parse('p { color: black; }');
var css = mensch.stringify(ast);

console.log(css);
// => p { color: black; }
```

# api

## parse(css, [options={}])

Convert a CSS string or an array of lexical tokens into a `stringify`-able AST.

- `css` {String|Array} CSS string or array of lexical tokens
- `[options]` {Object}
- `[options.comments=false]` {Boolean} Allow comment nodes in the AST.
- `[options.position=false]` {Boolean} Allow line/column position in the AST.

When `{position: true}`, AST node will have a `position` property:

```js
{
  type: 'comment',
  text: ' Hello World! ',
  position: {
    start: { line: 1, col: 1 },
    end: { line 1, col: 18 }
  }
}
```

## stringify(ast, [options={}])

Convert a `stringify`-able AST into a CSS string.

- `ast` {Object} A `stringify`-able AST
- `[options]` {Object}
- `[options.comments=false]` {Boolean} Allow comments in the stringified CSS.
- `[options.indentation='']` {String} E.g., `indentation: '  '` will indent by
    two spaces.

## lex(css)

Convert a CSS string to an array of lexical tokens for use with `.parse()`.

- `css` {String} CSS

# non-validating

Mensch is a non-validating CSS parser. While it can handle the major language
constructs just fine, and it can recover from gaffes like mis-matched braces and
missing or extraneous semi-colons, mensch can't tell you when it finds
invalid CSS like a misspelled property name or a misplaced `@import`.

# comments

Unlike most CSS parsers, mensch allows comments to be represented in the AST and
subsequently stringified with the `{comments: true}` option.

```js
var options = { comments: true };
```

```js
var ast = mensch.parse('.red { color: red; /* Natch. */ }', options);
var css = mensch.stringify(ast, options);

console.log(css);
//=> .red { color: red; /* Natch. */ }
```

However, comments within the context of a selector, property, etc., will be
ignored. These comments are difficult to represent in the AST.

```js
var ast = mench.parse('.red /*1*/ { color /*2*/: /*3*/ red /*4*/; }', options);
var css = mesch.stringify(ast, options);

console.log(css);
//=> .red { color: red; }
```

# ast

The structure of mensch's AST riffs on several existing CSS parsers, but it
might not be 100% compatible with other CSS parsers. Here it is in a nutshell:

```js
{
  type: 'stylesheet'
  stylesheet: {
    rules: [{
      type: 'rule',
      selectors: ['.foo'],
      declarations: [{
        type: 'property',
        name: 'color',
        value: 'black'
      }]
    }]
  }
}
```

# credits

Mensch is based on several existing CSS parsers, but
[nzakas/parser-lib](https://github.com/nzakas/parser-lib) and
[visionmedia/css](https://github.com/visionmedia/css) are notable influences.

# known users

[voidlabs/mosaico](https://github.com/voidlabs/mosaico) uses Mensch parser to parse custom-flavored CSS rules in email templates and make the template editable: positions, comment parsing, multiple declarations for the same property have been keys to the choice of Mensch!

[Automattic/juice](https://github.com/Automattic/juice) moved to Mensch CSS parser since 3.0 release in order to fix dozen of issues with the previous parser, expecially with support for "multiple properties declarations" in the same ruleset and with invalid values.

Please let us know if you use Mensch in your library!
