---
repo: fabiospampinato/kasi
url: 'https://github.com/fabiospampinato/kasi'
homepage: ''
starredAt: '2023-12-29T02:35:30Z'
createdAt: '2023-09-17T21:28:09Z'
updatedAt: '2025-01-23T01:51:29Z'
language: JavaScript
license: MIT
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:40.892Z'
description: A collection of functions for working with different casings.
tags:
  - case
  - casing
  - check
  - convert
  - copy
---

# Kasi

A collection of functions for working with different casings.

## Install

```sh
npm install kasi
```

## Functions

| Check                             | Convert                           | Extra             |
| --------------------------------- | --------------------------------- | ----------------- |
| [isCamelCase](#iscamelcase)       | [toCamelCase](#tocamelcase)       | [apply](#apply)   |
| [isConstantCase](#isconstantcase) | [toConstantCase](#toconstantcase) | [copy](#copy)     |
| [isDotCase](#isdotcase)           | [toDotCase](#todotcase)           | [detect](#detect) |
| [isKebabCase](#iskebabcase)       | [toKebabCase](#tokebabcase)       |                   |
| [isLowerCase](#islowercase)       | [toLowerCase](#tolowercase)       |                   |
| [isPascalCase](#ispascalcase)     | [toPascalCase](#topascalcase)     |                   |
| [isPathCase](#ispathcase)         | [toPathCase](#topathcase)         |                   |
| [isSnakeCase](#issnakecase)       | [toSnakeCase](#tosnakecase)       |                   |
| [isTitleCase](#istitlecase)       | [toTitleCase](#totitlecase)       |                   |
| [isUpperCase](#isuppercase)       | [toUpperCase](#touppercase)       |                   |

### Check

These functions allow you to check if a string is using a specific casing.

#### `isCamelCase`

```ts
import {isCamelCase} from 'kasi';

isCamelCase ( 'fooBar' ); // => true
isCamelCase ( 'foo-bar' ); // => false
```

#### `isConstantCase`

```ts
import {isConstantCase} from 'kasi';

isConstantCase ( 'FOO_BAR' ); // => true
isConstantCase ( 'fooBar' ); // => false
```

#### `isDotCase`

```ts
import {isDotCase} from 'kasi';

isDotCase ( 'foo.bar' ); // => true
isDotCase ( 'fooBar' ); // => false
```

#### `isKebabCase`

```ts
import {isKebabCase} from 'kasi';

isKebabCase ( 'foo-bar' ); // => true
isKebabCase ( 'fooBar' ); // => false
```

#### `isLowerCase`

```ts
import {isLowerCase} from 'kasi';

isLowerCase ( 'foo' ); // => true
isLowerCase ( 'Foo' ); // => false
```

#### `isPascalCase`

```ts
import {isPascalCase} from 'kasi';

isPascalCase ( 'FooBar' ); // => true
isPascalCase ( 'fooBar' ); // => false
```

#### `isPathCase`

```ts
import {isPathCase} from 'kasi';

isPathCase ( 'foo/bar' ); // => true
isPathCase ( 'fooBar' ); // => false
```

#### `isSnakeCase`

```ts
import {isSnakeCase} from 'kasi';

isSnakeCase ( 'foo_bar' ); // => true
isSnakeCase ( 'fooBar' ); // => false
```

#### `isTitleCase`

```ts
import {isTitleCase} from 'kasi';

isTitleCase ( 'Foo Bar' ); // => true
isTitleCase ( 'fooBar' ); // => false
```

#### `isUpperCase`

```ts
import {isUpperCase} from 'kasi';

isUpperCase ( 'FOO' ); // => true
isUpperCase ( 'foo' ); // => false
```

### Convert

These functions allow you to convert a string to a specific casing.

#### `toCamelCase`

```ts
import {toCamelCase} from 'kasi';

toCamelCase ( 'foo-bar' ); // => 'fooBar'
toCamelCase ( 'foo_bar' ); // => 'fooBar'
```

#### `toConstantCase`

```ts
import {toConstantCase} from 'kasi';

toConstantCase ( 'fooBar' ); // => 'FOO_BAR'
toConstantCase ( 'foo-bar' ); // => 'FOO_BAR'
```

#### `toDotCase`

```ts
import {toDotCase} from 'kasi';

toDotCase ( 'fooBar' ); // => 'foo.bar'
toDotCase ( 'foo-bar' ); // => 'foo.bar'
```

#### `toKebabCase`

```ts
import {toKebabCase} from 'kasi';

toKebabCase ( 'fooBar' ); // => 'foo-bar'
toKebabCase ( 'foo_bar' ); // => 'foo-bar'
```

#### `toLowerCase`

```ts
import {toLowerCase} from 'kasi';

toLowerCase ( 'FooBar' ); // => 'foobar'
toLowerCase ( 'foo-bar' ); // => 'foo-bar'
```

#### `toPascalCase`

```ts
import {toPascalCase} from 'kasi';

toPascalCase ( 'foo-bar' ); // => 'FooBar'
toPascalCase ( 'foo_bar' ); // => 'FooBar'
```

#### `toPathCase`

```ts
import {toPathCase} from 'kasi';

toPathCase ( 'fooBar' ); // => 'foo/bar'
toPathCase ( 'foo-bar' ); // => 'foo/bar'
```

#### `toSnakeCase`

```ts
import {toSnakeCase} from 'kasi';

toSnakeCase ( 'fooBar' ); // => 'foo_bar'
toSnakeCase ( 'foo-bar' ); // => 'foo_bar'
```

#### `toTitleCase`

```ts
import {toTitleCase} from 'kasi';

toTitleCase ( 'fooBar' ); // => 'Foo Bar'
toTitleCase ( 'foo-bar' ); // => 'Foo Bar'
```

#### `toUpperCase`

```ts
import {toUpperCase} from 'kasi';

toUpperCase ( 'fooBar' ); // => 'FOOBAR'
toUpperCase ( 'foo-bar' ); // => 'FOO-BAR'
```

### Extra

These extra functions perform other operations related to casings.

#### `apply`

Transform a string to the given casing. Useful in combination with `detect`.

```ts
import {apply} from 'kasi';

apply ( 'foo-bar', 'camel' ); // => 'fooBar'
apply ( 'foo-bar', 'constant' ); // => 'FOO_BAR'
```

#### `copy`

This function copies the casing of a string to another string, character by character. The two strings must have the same length.

```ts
import {copy} from 'kasi';

copy ( 'sIlLy', 'lions' ); // => 'lIoNs'
copy ( 'SiLlY', 'lions' ); // => 'LiOnS'
```

#### `detect`

This function detects the casing of a string. Useful in combination with `apply`.

```ts
import {detect} from 'kasi';

detect ( 'fooBar' ); // => 'camel'
detect ( 'FOO_BAR' ); // => 'constant'
detect ( ' foo BAR ' ); // => 'unknown'
```

## Related

- **[Kasi for VSCode](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.kasi)**: The official companion extension for Kasi, for quickly changing the casing of your selections.

## License

MIT © Fabio Spampinato
