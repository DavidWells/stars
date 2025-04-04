---
repo: sindresorhus/cli-truncate
url: 'https://github.com/sindresorhus/cli-truncate'
homepage: null
starredAt: '2022-02-17T22:04:51Z'
createdAt: '2016-03-11T08:46:39Z'
updatedAt: '2025-01-15T14:16:58Z'
language: JavaScript
license: MIT
branch: main
stars: 86
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:20.644Z'
description: Truncate a string to a specific width in the terminal
tags: []
---

# cli-truncate

> Truncate a string to a specific width in the terminal

Gracefully handles [ANSI escapes](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors_and_Styles). Like a string styled with [`chalk`](https://github.com/chalk/chalk). It also supports Unicode surrogate pairs and fullwidth characters.

## Install

```sh
npm install cli-truncate
```

## Usage

```js
import cliTruncate from 'cli-truncate';

cliTruncate('unicorn', 4);
//=> 'uni…'

// Truncate at different positions
cliTruncate('unicorn', 4, {position: 'start'});
//=> '…orn'

cliTruncate('unicorn', 4, {position: 'middle'});
//=> 'un…n'

cliTruncate('unicorns rainbow dragons', 6, {position: 'end'})
//=> 'unico…'

cliTruncate('\u001B[31municorn\u001B[39m', 4);
//=> '\u001B[31muni\u001B[39m…'

// Truncate Unicode surrogate pairs
cliTruncate('uni\uD83C\uDE00corn', 5);
//=> 'uni\uD83C\uDE00…'

// Truncate fullwidth characters
cliTruncate('안녕하세요', 3);
//=> '안…'

// Truncate the paragraph to the terminal width
const paragraph = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.';
cliTruncate(paragraph, process.stdout.columns);
//=> 'Lorem ipsum dolor sit amet, consectetuer adipiscing…'
```

## API

### cliTruncate(text, columns, options?)

#### text

Type: `string`

The text to truncate.

#### columns

Type: `number`

The number of columns to occupy in the terminal.

#### options

Type: `object`

##### position

Type: `string`\
Default: `'end'`\
Values: `'start' | 'middle' | 'end'`

The position to truncate the string.

##### space

Type: `boolean`\
Default: `false`

Add a space between the text and the ellipsis.

```js
import cliTruncate from 'cli-truncate';

cliTruncate('unicorns', 5, {space: false});
//=> 'unic…'

cliTruncate('unicorns', 5, {space: true});
//=> 'uni …'

cliTruncate('unicorns', 6, {position: 'start', space: true});
//=> '… orns'

cliTruncate('unicorns', 7, {position: 'middle', space: true});
//=> 'uni … s'
```

##### preferTruncationOnSpace

Type: `boolean`\
Default: `false`

Truncate the string from a whitespace if it is within 3 characters from the actual breaking point.

```js
import cliTruncate from 'cli-truncate';

cliTruncate('unicorns rainbow dragons', 20, {position: 'start', preferTruncationOnSpace: true})
//=> '…rainbow dragons'

// without preferTruncationOnSpace
cliTruncate('unicorns rainbow dragons', 20, {position: 'start'})
//=> '…rns rainbow dragons'

cliTruncate('unicorns rainbow dragons', 20, {position: 'middle', preferTruncationOnSpace: true})
//=> 'unicorns…dragons'

cliTruncate('unicorns rainbow dragons', 6, {position: 'end', preferTruncationOnSpace: true})
//=> 'unico…'

// preferTruncationOnSpace would have no effect if space isn't found within next 3 indexes
cliTruncate('unicorns rainbow dragons', 6, {position: 'middle', preferTruncationOnSpace: true})
//=> 'uni…ns'
```

##### truncationCharacter

Type: `string`\
Default: `…`

The character to use at the breaking point.

```js
import cliTruncate from 'cli-truncate';

cliTruncate('unicorns', 5, {position: 'end'});
//=> 'unic…'

cliTruncate('unicorns', 5, {position: 'end', truncationCharacter: '.'});
//=> 'unic.'

cliTruncate('unicorns', 5, {position: 'end', truncationCharacter: ''});
//=> 'unico'
```

## Related

- [wrap-ansi](https://github.com/chalk/wrap-ansi) - Wordwrap a string with ANSI escape codes
- [slice-ansi](https://github.com/chalk/slice-ansi) - Slice a string with ANSI escape codes
