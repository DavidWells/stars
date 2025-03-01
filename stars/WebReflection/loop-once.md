---
repo: WebReflection/loop-once
url: 'https://github.com/WebReflection/loop-once'
homepage: null
starredAt: '2025-02-27T01:51:16Z'
createdAt: '2024-01-25T13:43:40Z'
updatedAt: '2025-02-27T01:51:16Z'
language: JavaScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:46.931Z'
description: A safer loop for sync or async unique use cases.
tags: []
---

# loop-once

[![Coverage Status](https://coveralls.io/repos/github/WebReflection/loop-once/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/loop-once?branch=main)

<sup>**Social Media Photo by [Kier in Sight Archives](https://unsplash.com/@kierinsightarchives) on [Unsplash](https://unsplash.com/)**</sup>


A safer loop to iterate synchronously or asynchronously any unique identifier.

```js
import loopOnce from 'loop-once';

// create a function that will iterate
// over whatever iterable is passed along
// and arbitrary pass your own Set or WeakSet
// as once would be otherwise created automatically.
const unique = loopOnce();

// given a list of references
// or primitives if a Set is passed along ...
const iterable = [
  Promise.resolve('a'),
  Promise.resolve('b'),
  Promise.resolve('c')
];

// no matter how many times this will be called
// or how long it would take per each promise
// to resolve ...
const log = async () => {
  // the following loop will log once resolved promises
  for (const p of unique(iterable))
    console.log(await p);
};

// try it!
log();
log();
log().then(log);
setTimeout(log, 1000);

// the output will be
// "a"
// "b"
// "c"
// and that's it 🥳
```

### What exact problem does this module solve?

The *TL;DR* story here is that too many times I ended up writing code as such:

```js
const visited = new WeakSet;

const bootstrap = async () => {
  for (const thing of things) {
    if (visited.has(thing)) {
      visited.add(thing);
      await init(thing);
    }
  }
};
```

Now I can use a single utility all over the place to do the same:

```js
import loopOnce from 'loop-once';
const unique = loopOnce();

// every time I need to do the same ...
const bootstrap = async () => {
  for (const thing of unique(things))
      await init(thing);
};
```

That's it: I don't need to remember or worry about the fact `bootstrap` could be called many times while still executing and that `thing` should never be initialized twice.

I hope this explanation reasons well with you too 👋
