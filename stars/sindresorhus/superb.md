---
repo: sindresorhus/superb
url: 'https://github.com/sindresorhus/superb'
homepage: null
starredAt: '2015-05-28T22:57:53Z'
createdAt: '2014-07-08T12:22:21Z'
updatedAt: '2024-12-08T09:27:27Z'
language: JavaScript
license: MIT
branch: main
stars: 393
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:42.837Z'
description: Get superb like words
tags: []
---

# superb

> Get superb like words

Currently ~100 words. **I'm not accepting more words.**

The word list itself is just a [JSON file](superb-words.json) and can be used anywhere.

## Install

```sh
npm install superb
```

## Usage

```js
import superbWords from 'superb';

superbWords;
//=> ['ace', 'amazing', …]
```

## API

### superbWords

Type: `string[]`

All the words in alphabetical order.

### randomSuperbWord()

Type: `Function`

Get a random word.

```js
import {randomSuperbWord} from 'superb';

randomSuperbWord();
//=> 'legendary'

randomSuperbWord();
//=> 'awesome'
```

## Related

- [superb-cli](https://github.com/sindresorhus/superb-cli) - CLI for this module
- [cat-names](https://github.com/sindresorhus/cat-names) - Get popular cat names
- [dog-names](https://github.com/sindresorhus/dog-names) - Get popular dog names
- [pokemon](https://github.com/sindresorhus/pokemon) - Get Pokémon names
- [superheroes](https://github.com/sindresorhus/superheroes) - Get superhero names
- [supervillains](https://github.com/sindresorhus/supervillains) - Get supervillain names
- [yes-no-words](https://github.com/sindresorhus/yes-no-words) - Get yes/no like words
