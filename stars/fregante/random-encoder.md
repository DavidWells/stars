---
repo: fregante/random-encoder
url: 'https://github.com/fregante/random-encoder'
homepage: null
starredAt: '2019-06-28T22:59:01Z'
createdAt: '2016-03-23T06:04:41Z'
updatedAt: '2022-06-04T20:32:00Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:31.415Z'
description: 'Lightweight way to generate multiple, random, reversible "hashes" or encoding'
tags: []
---

# random-encoder

> Lightweight way to generate multiple, random, reversible "hashes" or encoding

`random-encoder` can reversibly convert an integer into many pseudo-random hashes/shortcodes/encodings.

## Install

```sh
npm install --save random-encoder
```

## Usage

```js
import randomEncoder from "random-encoder";

randomEncoder.generate(100); // -> "txwkbqm"
randomEncoder.generate(100); // -> "nbmkbai"
randomEncoder.generate(100); // -> "rxuclio"
randomEncoder.generate(100); // -> "trsudww"
randomEncoder.generate(100); // -> "dzkcrsk"

randomEncoder.solve("txwkbqm"); // -> 100
randomEncoder.solve("nbmkbai"); // -> 100
randomEncoder.solve("rxuclio"); // -> 100
randomEncoder.solve("trsudww"); // -> 100
randomEncoder.solve("dzkcrsk"); // -> 100
```

This can come useful when you want to have multiple apparently-random URLs point to the same object.

More info here: http://programmers.stackexchange.com/questions/313553/how-do-i-generate-multiple-hashes-that-can-be-resolved-to-a-single-value
