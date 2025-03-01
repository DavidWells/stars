---
repo: englercj/tsd-jsdoc
url: 'https://github.com/englercj/tsd-jsdoc'
homepage: ''
starredAt: '2020-12-13T04:48:05Z'
createdAt: '2016-07-07T01:58:37Z'
updatedAt: '2025-02-24T15:13:33Z'
language: TypeScript
license: MIT
branch: master
stars: 321
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:17.305Z'
description: Compiles JSDoc annotated JavaScript into a Typescript Definition file (.d.ts)
tags: []
---

# tsd-jsdoc

This library's goal is to be able to take as input a JSDoc annotated source JavaScript
file (or many files) and output a single TypeScript Declaration File (.d.ts).

It is distributed as a JSDoc3 template. Running JSDoc with this as the template should
result in a TypeScript Definition File.

## Installation

You can install this module from npm:

```
$> npm install tsd-jsdoc
```

## Usage

To use this module, simply specify it as the template for your normal JSDoc generation.

For example, from the command-line you can do:

```
$> jsdoc -t node_modules/tsd-jsdoc/dist -r .
```

Or add this to your JSON configuration:

```json
{
    "opts": {
        "template": "./node_modules/tsd-jsdoc/dist"
    }
}
```

If you want to use [supported ClosureCompiler features](#supported-closurecompiler-features), you also need to specify this module as a pluginin your JSON configuration, like so:

```json
{
    "plugins": [ "./node_modules/tsd-jsdoc/dist/plugin" ],
    "opts": {
        "template": "./node_modules/tsd-jsdoc/dist"
    }
}
```

## Validation

This library provides very little validation beyond what JSDoc provides. Meaning if you
have invalid JSDoc comments, this will likely output an invalid TypeScript Definition File.

Additionally there are things that JSDoc allows, that TypeScript does not. This library
tries to make these differences transparent, and translate from one to the other when
necessary. It can't handle anything though, and you can generate invalid Typescript
even if your JSDoc is valid.

## Unsupported Features

### Default exports

JSDoc [has a bug](https://github.com/jsdoc3/jsdoc/issues/1464) that prevents it from
correctly parsing `export default class Name {}`. The workaround is to use named exports
(`export class Name {}`) or utilize the
[jsdoc-export-default-interop](https://www.npmjs.com/package/jsdoc-export-default-interop) plugin.


### Tags with no support

Tags that describe the code, but support is not implemented are:

- [`@default`](http://usejsdoc.org/tags-default.html) - No TS equivalent
- [`@deprecated`](http://usejsdoc.org/tags-deprecated.html) - No TS equivalent ([issue](https://github.com/Microsoft/TypeScript/issues/390))
- [`@event`](http://usejsdoc.org/tags-event.html) - No TS equivalent
- [`@exports`](http://usejsdoc.org/tags-exports.html) - Everything is exported
- [`@external`](http://usejsdoc.org/tags-external.html) - Not sure what behavior would be expected
- [`@fires`](http://usejsdoc.org/tags-fires.html) - No TS equivalent
- [`@listens`](http://usejsdoc.org/tags-listens.html) - No TS equivalent
- [`@override`](http://usejsdoc.org/tags-override.html) - No TS equivalent ([issue](https://github.com/Microsoft/TypeScript/issues/2000))
- [`@throws`](http://usejsdoc.org/tags-throws.html) - No TS equivalent

### Ignored tags

Tags that are just metadata and don't actually describe
the code are ignored. These are:

- [`@author`](http://usejsdoc.org/tags-author.html)
- [`@classdesc`](http://usejsdoc.org/tags-classdesc.html)
- [`@copyright`](http://usejsdoc.org/tags-copyright.html)
- [`@description`](http://usejsdoc.org/tags-description.html)
- [`@example`](http://usejsdoc.org/tags-example.html)
- [`@file`](http://usejsdoc.org/tags-file.html)
- [`@license`](http://usejsdoc.org/tags-license.html)
- [`@requires`](http://usejsdoc.org/tags-requires.html)
- [`@see`](http://usejsdoc.org/tags-see.html)
- [`@since`](http://usejsdoc.org/tags-since.html)
- [`@summary`](http://usejsdoc.org/tags-summary.html)
- [`@todo`](http://usejsdoc.org/tags-todo.html)
- [`@tutorial`](http://usejsdoc.org/tags-tutorial.html)
- [`@version`](http://usejsdoc.org/tags-version.html)

All other JSDoc tags should work fine.

## Supported ClosureCompiler features

ClosureCompiler has a couple tags beyond the built-in JSDoc tags that can improve your TypeScript output. Here is a complete
list of the features from CC that are supported in this template:

- [`@template T`](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#template-t) - For generics
- [`typeof T`](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#the-javascript-type-language) - For typeof operator

## Supported non-standard features

Vanilla JSDoc doesn't have a way to express all the features of TypeScript so we also support these non-standardized conventions:

- `Class<T>` - If we encounter a type that is `Class<T>` we will treat it as `typeof T`. See [jsdoc3/jsdoc#1349](https://github.com/jsdoc3/jsdoc/issues/1349)
