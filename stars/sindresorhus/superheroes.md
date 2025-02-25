---
repo: sindresorhus/superheroes
url: 'https://github.com/sindresorhus/superheroes'
homepage: null
starredAt: '2015-05-28T22:57:13Z'
createdAt: '2015-05-11T11:00:55Z'
updatedAt: '2024-12-16T01:36:55Z'
language: JavaScript
license: MIT
branch: main
stars: 234
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:42.778Z'
description: Get superhero names
tags: []
---

# superheroes

> Get superhero names

<img src="https://cloud.githubusercontent.com/assets/170270/7563453/ad57a684-f7dd-11e4-8302-081f132e8653.png" width="100" height="112" align="right">

The list is just a [JSON file](superheroes.json) and can be used anywhere.

**I'm not accepting additional entries to the list.**

## Install

```sh
npm install superheroes
```

## Usage

```js
import superheroes from 'superheroes';

superheroes;
//=> ['3-D Man', 'A-Bomb', …]
```

## API

### superheroes

Type: `string[]`

Superhero names in alphabetical order.

### randomSuperhero()

Type: `Function`

Get a random superhero name.

```js
import {randomSuperhero} from 'superheroes';

randomSuperhero();
//=> 'Spider-Ham'
```

## Related

- [superheroes-cli](https://github.com/sindresorhus/superheroes-cli) - CLI for this module
- [supervillains](https://github.com/sindresorhus/supervillains) - Get supervillain names
- [cat-names](https://github.com/sindresorhus/cat-names) - Get popular cat names
- [dog-names](https://github.com/sindresorhus/dog-names) - Get popular dog names
- [pokemon](https://github.com/sindresorhus/pokemon) - Get Pokémon names
- [superb](https://github.com/sindresorhus/superb) - Get superb like words
- [yes-no-words](https://github.com/sindresorhus/yes-no-words) - Get yes/no like words
