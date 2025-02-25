---
repo: eemeli/dot-properties
url: 'https://github.com/eemeli/dot-properties'
homepage: 'https://npmjs.com/package/dot-properties'
starredAt: '2025-02-04T06:14:40Z'
createdAt: '2018-02-03T09:36:30Z'
updatedAt: '2025-02-04T12:47:08Z'
language: JavaScript
license: MIT
branch: main
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:08.524Z'
description: Parse & stringify .properties files in JavaScript
tags: []
---

# dot-properties

JavaScript `parse()` and `stringify()` for `.properties` (`text/x-java-properties`) files as defined in [java.util.Properties](https://docs.oracle.com/javase/9/docs/api/java/util/Properties.html#load-java.io.Reader-).

To install:

```
npm install dot-properties
```

For usage examples, see [below](#example) or take a look through the project's [test suite](tests/).

## API

### `parse(str: string | Line[] | Node[], path?: boolean | string): object`

Parses an input string read from a .properties file into a JavaScript Object

If the second `path` parameter is true, dots `.` in keys will result in a multi-level object (use a string value to customise). If a parent level is directly assigned a value while it also has a child with an assigned value, the parent value will be assigned to its empty string `''` key. Repeated keys will take the last assigned value. Key order is not guaranteed, but is likely to match the order of the input lines.

### `parseLines(str: string, ast?: false): Line[]`

Splits the input string into an array of logical lines; useful if you want to preserve order, comments and/or empty lines while processing. Used internally by `parse()`.

Key-value pairs are `[key, value]` arrays with string values. Escape sequences in keys and values are parsed. Empty lines are included as empty strings `''`, and comments as strings that start with `#` or `!` characters. Leading whitespace is not included.

### `parseLines(str: string, ast: true): Node[]`

Splits the input string into an array of AST nodes; see [the source](./lib/ast.js) for more details.

### `stringify(input: object, options?: StringifyOptions): string`

Stringifies a hierarchical object or an array of lines or nodes to `.properties` format

If `input` is a hierarchical object, keys will consist of the path parts joined by `.` characters. With array input, string values represent blank or comment lines and string arrays are `[key, value]` pairs. Control characters and `\` will be appropriately escaped. If the `latin1` option is not set to false, all non-Latin-1 characters will also be `\u` escaped. Non-empty string lines represent comments, and will have any existing `#` or `!` prefix replaced by the `commentPrefix`.

Output styling is controlled by the second (optional) `options` parameter; by default a spaced `=` separates the key from the value, `\n` is the newline separator, lines are folded at 80 characters (at most, splitting at nice places), with subsequent lines indented by four spaces, and comment lines are prefixed with a `#`. `''` as a key value is considered the default, and set as the value of a key corresponding to its parent object's path:

<!-- prettier-ignore -->
```js
const defaultOptions = {
  commentPrefix: '# ',  // could also use e.g. '!'
  defaultKey: '',       // YAML 1.1 used '='
  indent: '    ',       // tabs are also valid
  keySep: ' = ',        // should have at most one = or :
  latin1: true,         // default encoding for .properties files
  lineWidth: 80,        // use null to disable
  newline: '\n',        // Windows uses \r\n
  pathSep: '.',         // if non-default, use the same in parse()
  foldChars: '\f\t .'   // preferred characters for line folding
}
```

## Example

### `example.properties`

```
# You are reading the ".properties" entry.
! The exclamation mark can also mark text as comments.
# The key characters =, and : should be written with a preceding
# backslash to ensure that they are properly loaded. However, there
# is no need to precede the value characters =, and : by a backslash.
website = https://en.wikipedia.org/
language = English

# The backslash below tells the application to continue reading
# the value onto the next line.
message = Welcome to \
          Wikipedia!

# Add spaces to the key
key\ with\ spaces = This is the value that could be looked up with \
                    the key "key with spaces".

# Unicode
tab : \u0009

# If you want your property to include a backslash, it should be
# escaped by another backslash
path c:\\wiki\\templates
# However, some editors will handle this automatically
```

_Source: [Wikipedia](https://en.wikipedia.org/wiki/.properties)_

### `example.js`

```js
const fs = require('fs')
const { parse, parseLines, stringify } = require('dot-properties')
const src = fs.readFileSync('./example.properties', 'utf8')

const obj = parse(src)
// { website: 'https://en.wikipedia.org/',
//   language: 'English',
//   message: 'Welcome to Wikipedia!',
//   'key with spaces':
//    'This is the value that could be looked up with the key "key with spaces".',
//   tab: '',
//   path: 'c:wiki\templates' }

const str = stringify(obj, { lineWidth: 60 })
console.log(str)
// website = https://en.wikipedia.org/
// language = English
// message = Welcome to Wikipedia!
// key\ with\ spaces = This is the value that could be looked \
//     up with the key "key with spaces".
// tab = \t
// path = c:\\wiki\\templates

const lines = parseLines(src)
// [ '# You are reading the ".properties" entry.',
//   '! The exclamation mark can also mark text as comments.',
//   '# The key characters =, and : should be written with a preceding',
//   '# backslash to ensure that they are properly loaded. However, there',
//   '# is no need to precede the value characters =, and : by a backslash.',
//   [ 'website', 'https://en.wikipedia.org/' ],
//   [ 'language', 'English' ],
//   '',
//   '# The backslash below tells the application to continue reading',
//   '# the value onto the next line.',
//   [ 'message', 'Welcome to Wikipedia!' ],
//   '',
//   '# Add spaces to the key',
//   [ 'key with spaces',
//     'This is the value that could be looked up with the key "key with spaces".' ],
//   '',
//   '# Unicode',
//   [ 'tab', '' ],
//   '',
//   '# If you want your property to include a backslash, it should be',
//   '# escaped by another backslash',
//   [ 'path', 'c:wiki\templates' ],
//   '# However, some editors will handle this automatically' ]

const str2 = stringify(lines.slice(8, 14), { lineWidth: 60 })
console.log(str2)
// # The backslash below tells the application to continue
// # reading
// # the value onto the next line.
// message = Welcome to Wikipedia!
//
// # Add spaces to the key
// key\ with\ spaces = This is the value that could be looked \
//     up with the key "key with spaces".
```
