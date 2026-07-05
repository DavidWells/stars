---
repo: krisselden/dag-map
url: 'https://github.com/krisselden/dag-map'
homepage: ''
starredAt: '2022-02-27T05:31:27Z'
createdAt: '2014-07-01T23:37:59Z'
updatedAt: '2024-05-26T13:26:32Z'
language: JavaScript
license: MIT
branch: master
stars: 56
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:05.912Z'
description: >-
  A topologically ordered map of key/value pairs with a simple API for adding
  constraints.
tags: []
---

# dag-map [![Build Status](https://travis-ci.org/krisselden/dag-map.png?branch=master)](https://travis-ci.org/krisselden/dag-map)

A topologically ordered map of key/value pairs with a simple API for adding constraints.

Used for ordering initializers in Ember.  Has a flexible constraint syntax
that can add before/after contraints that can forward reference things
yet to be added.

## API

```js
// import DAGMap from "dag-map";
const DAGMap = require("dag-map").default;

let map = new DAGMap();

// map a key value pair
// #add(
//   key: string, value: any,
//   before?: string[] | string | undefined,
//   after?: string[] | string | undefined
// )
map.add('eat', 'Eat Dinner');

// add a key value pair with before and after constraints
map.add('serve', 'Serve the food', 'eat', 'set');

// keys can be added after a key has been referenced
map.add('set', 'Set the table');

// graph now is eat -> serve -> set

// constraints can be an array
map.add('cook', 'Cook the roast and veggies', 'serve', ['prep', 'buy']);

map.add('wash', 'Wash the veggies', 'prep', 'buy');
map.add('buy', 'Buy roast and veggies');
map.add('prep', 'Prep veggies', undefined, 'wash');

// log in order (multiple valid spots for set the table).
map.each((key, val) => console.log(`${key}: ${val}`));
// set: Set the table
// buy: Buy roast and veggies
// wash: Wash the veggies
// prep: Prep veggies
// cook: Cook the roast and veggies
// serve: Serve the food
// eat: Eat Dinner
```

### Notes

add is aliased as addEdges for backwards compat.
each is aliased as topsort for backwards compat.

## Developing

* `npm install`
* `npm test` runs the tests headless
* `npm run build` rebuild
* `npm run docs` documentation
