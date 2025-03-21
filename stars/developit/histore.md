---
repo: developit/histore
url: 'https://github.com/developit/histore'
homepage: null
starredAt: '2018-11-02T16:57:35Z'
createdAt: '2018-05-07T18:16:41Z'
updatedAt: '2025-02-11T15:50:33Z'
language: JavaScript
license: Apache-2.0
branch: master
stars: 677
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:07.510Z'
description: "\U0001F3EC 200b key-value store backed by navigation state"
tags:
  - database
  - history-api
  - key-value
  - localstorage
---

<p align="center">
  <img src="https://i.imgur.com/zN9xe7D.png" width="300" height="300" alt="histore">
  <h1 align="center">
  	Histore
	<a href="https://www.npmjs.org/package/histore"><img src="https://img.shields.io/npm/v/histore.svg?style=flat" alt="npm"></a>
  </h1>
</p>

Histore __[his·to·ry]__: a 200b key-value store backed by navigation state.

Does the fact that `sessionStorage`/`localStorage` is shared across tabs have you down?

Don't worry, here's a strange but widely supported way to store 640kb of object data in a page's navigation state.

[View Demo on JSFiddle](https://jsfiddle.net/developit/8Ltn29a5/)

## Usage

```js
import histore from 'histore'

let storage = histore()

storage.set('foo', 'bar')
storage.get('foo')  // 'bar'

storage.set('obj', { any: 'object' })
storage.get('obj').any  // 'object'
```

Interestingly, due to the way `history.replaceState` works, storing objects will implicitly clone them using the [Structured Clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Changelog

Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/developit/histore/releases) page.

## License

[Apache 2.0](LICENSE)
