---
repo: toastdriven/nanosearch
url: 'https://github.com/toastdriven/nanosearch'
homepage: 'https://toastdriven.github.io/nanosearch/'
starredAt: '2022-08-24T19:24:46Z'
createdAt: '2022-07-26T12:32:56Z'
updatedAt: '2024-12-07T13:26:04Z'
language: JavaScript
license: BSD-3-Clause
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:36.763Z'
description: A tiny search engine.
tags:
  - engine
  - ngram
  - search
---

# `nanosearch`

A tiny search engine.

Suitable for in-browser use, this provides n-gram based search results.


## Quickstart

```js
import { SearchEngine } from '@toastdriven/nanosearch';

// Create a search engine.
const engine = new SearchEngine();

// Index some documents.
// First parameter is the unique document ID, second is the document text.
engine.add("abc", "The dog is a 'hot dog'.");
engine.add("def", "Dogs > Cats");
engine.add("ghi", "the quick brown fox jumps over the lazy dog");
engine.add("jkl", "Am I lazy, or just work smart?");

// Then, you can let the user search on the engine...
let myDogResults = engine.search("my dog");
myDogResults.count(); // 3

for(let res of myDogResults.iterator()) {
  console.log(res.docId); // ex: "def"
  console.log(res.score); // ex: 0.2727272727272727
}

// ...including limiting results (to just one)...
let lazyResults = engine.search("lazy");
let topResult = lazyResults.at(0);
console.log(topResult);

// ...or making pages of ten results!
let dogResults = engine.search("dogs");
let pageOne = dogResults.slice(0, 10);
let pageTwo = dogResults.slice(10, 20);
console.log(pageOne);
console.log(pageTwo);
```


## Installation

`$ npm install @toastdriven/nanosearch`


## Requirements

* ES6 (or similar translation/polyfill)


## Tests

```shell
$ git clone git@github.com:toastdriven/nanosearch.git
$ cd nanosearch
$ npm install
$ npm test
```


## Docs

```shell
$ git clone git@github.com:toastdriven/nanosearch.git
$ cd nanosearch
$ npm install
$ ./node_modules/.bin/jsdoc -r -d ~/Desktop/out --package package.json --readme README.md src
```


## License

New BSD
