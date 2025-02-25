---
repo: eemeli/yaml-types
url: 'https://github.com/eemeli/yaml-types'
homepage: 'https://npmjs.com/package/yaml-types'
starredAt: '2025-02-04T05:43:02Z'
createdAt: '2023-04-14T15:30:12Z'
updatedAt: '2025-02-04T05:43:03Z'
language: TypeScript
license: ISC
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:08.701Z'
description: Useful JavaScript types for YAML
tags: []
---

# yaml-types

Additional useful types for [`yaml`](https://github.com/eemeli/yaml).

## Installation and Usage

```
npm install yaml yaml-types
```

Each type (a.k.a. "tag") is available as a named export of `'yaml-types'`.
These may then be used as [custom tags](https://eemeli.org/yaml/#writing-custom-tags):

```js
import { parse } from 'yaml'
import { regexp } from 'yaml-types'

const re = parse('!re /fo./g', { customTags: [regexp] })
'foxbarfoo'.match(re) // [ 'fox', 'foo' ]
```

## Available Types

- `bigint` (`!bigint`) - JavaScript [BigInt] values.
  Note: in order to use this effectively,
  a function must be provided as `customTags` in order to prepend the `bigint` tag,
  or else the built-in `!!int` tags will take priority.
  See [bigint.test.ts](./src/bigint.test.ts) for examples.
- `binary` (`!!binary`) - JavaScript [Uint8Array], one of the YAML 1.1 tags
- `classTag` (`!class`) - JavaScript [Class] values
- `error` (`!error`) - JavaScript [Error] objects
- `functionTag` (`!function`) - JavaScript [Function] values
  (will also be used to stringify Class values,
  unless the `classTag` tag is loaded ahead of `functionTag`)
- `nullobject` (`!nullobject`) - Object with a `null` prototype
- `omap` (`!!omap`) - JavaScript [Map], one of the YAML 1.1 tags
- `pairs` (`!!pairs`) - Ordered sequence of key-value [pairs], one of the YAML 1.1 tags
- `regexp` (`!re`) - [RegExp] values,
  using their default `/foo/flags` string representation.
- `set` (`!!set`) - JavaScript [Set], one of the YAML 1.1 tags
- `sharedSymbol` (`!symbol/shared`) - [Shared Symbols],
  i.e. ones created with `Symbol.for()`
- `symbol` (`!symbol`) - [Unique Symbols]
- `timestamp` (`!!timestamp`) - JavaScript [Date], one of the YAML 1.1 tags

The function and class values created by parsing `!function` and
`!class` tags will not actually replicate running code, but
rather no-op function/class values with matching name and
`toString` properties.

[BigInt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
[Class]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[Date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[Error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
[Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[Shared Symbols]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry
[Uint8Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
[Unique Symbols]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[pairs]: https://yaml.org/type/pairs.html

## Customising Tag Names

To use one of the types with a different tag identifier, set its `tag` value accordingly.
For example, to extend the default tag namespace with `!!js/symbol`
instead of using a local `!symbol` tag for Symbol values:

```js
import { stringify } from 'yaml'
import { symbol } from 'yaml-types'

const mysymbol = { ...symbol, tag: 'tag:yaml.org,2002:js/symbol' }
stringify(Symbol('foo'), { customTags: [mysymbol] })
```

```yaml
!!js/symbol foo
```

To use a named tag handle like `!js!symbol`, a few more steps are required:

```js
import { Document } from 'yaml'
import { symbol } from 'yaml-types'

const mysymbol = { ...symbol, tag: 'tag:js:symbol' }
const doc = new Document(Symbol('foo'), { customTags: [mysymbol] })
doc.directives.tags['!js!'] = 'tag:js:'
doc.toString()
```

```yaml
%TAG !js! tag:js:
---
!js!symbol foo
```

## Contributing

Additions to this library are very welcome!
Many data types are useful beyond any single project,
and while the core `yaml` library is mostly limited to the YAML spec,
no such restriction applies here.

The source code is written in [TypeScript], and the tests use [Node-Tap].
When submitting a PR for a new type, tests and documentation are required,
as well as satisfying [Prettier].

[TypeScript]: https://www.typescriptlang.org/
[Node-Tap]: https://node-tap.org/
[Prettier]: https://prettier.io/
