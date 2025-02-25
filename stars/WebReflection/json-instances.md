---
repo: WebReflection/json-instances
url: 'https://github.com/WebReflection/json-instances'
homepage: null
starredAt: '2022-06-20T21:32:21Z'
createdAt: '2022-06-17T20:30:11Z'
updatedAt: '2022-06-23T03:13:20Z'
language: JavaScript
license: ISC
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:41.568Z'
description: A minimalistic yet efficient way to stringify and revive instances via JSON.
tags: []
---

# json-instances

[![build status](https://github.com/WebReflection/json-instances/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/json-instances/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/json-instances/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/json-instances?branch=main) [![CSP strict](https://webreflection.github.io/csp/strict.svg)](https://webreflection.github.io/csp/#-csp-strict)

<sup>**Social Media Photo by [Francisco J. Villena](https://unsplash.com/@villena_francis) on [Unsplash](https://unsplash.com/)**</sup>

A minimalistic yet efficient way to stringify and revive instances via JSON.

If stringified instances have a `fromJSON() {}` method in their prototypal chain, such method will be invoked once the instance gets revived.

```js
import JSONInstances from 'json-instances';

class MyThing {
  constructor(thing) {
    this.some = thing;
  }
  toString() {
    return this.some;
  }
}

class OtherThing {
  constructor() {
    this.revived = false;
  }
  fromJSON() {
    this.revived = true;
  }
}

// pass along any constructor that should survive JSON serialization
// and remember that order matters, as constructors are indexed!
const {replacer, reviver} = JSONInstances(
  MyThing,
  OtherThing
);

const before = [
  new MyThing('cool!'),
  new OtherThing
];

const str = JSON.stringify(before, replacer);
console.log(str);
// [{"i":0,"o":[["some","cool!"]]},{"i":1,"o":[["revived",false]]}]

const after = JSON.parse(str, reviver);
console.log(after);
// [ MyThing { some: 'cool!' }, OtherThing { revived: true } ]
```

## How does it work

This module provides both a [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter) and a [reviver](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter) callback able to convert *every **known** class* passed during initialization, either as *array* or [as namespace](https://github.com/WebReflection/json-instances#namespace-based).

This means that if the structure you are trying to stringify includes *unknown instances* that are not plain objects or not known upfront when these callbacks are created, the resulting serialization and deserialization will not work as expected.

Please be sure all classes meant to be revived are passed along and don't be surprised if errors happen when this is not the case.


## Hackable

Because constructors are not serialied, just referenced as index of an array, it is possible to use same ordered amount of classes in multiple workers, as well as different client/server classes, as long as the index well represents the purpose of the data/class associated with it.

```js
const client = [
  UIComponent,
  User
];

const user = new User(name);
const comp = new UICOmponent({props: values});

const state = JSON.stringify(
  {user, comp},
  JSONInstances(client).replacer
);

storeState(state);

// server
const backend = [
  SSRComponent,
  UserAuth
];

const {user, comp} = JSON.parse(
  state,
  JSONInstances(backend).reviver
);

user.authenticate();
response.write(comp.toString());
```

## Namespace based

By default this module accepts a list of classes because referring to these as indexes makes the *JSON* outcome extremely compact.

However, there might be a preference around a *namespace* able to make the outcome more readable, and this is usable via the `json-instances/namespace` dedicated export, sharing also 99% of the code with the array based version.

```js
import JSONInstances from 'json-instances/namespace';

class Some {}
class Other {}
class Test {}

// the namespace used to stringify and revive
const nmsp = {
  deeper: {
    Some,
    Other,
  },
  Test
};

const {replacer, reviver} = JSONInstances(nmsp);

const str = JSON.stringify([{}, new Some, new Other, new Test], replacer);
// [{"i":"","o":[]},{"i":"deeper.Some","o":[]},{"i":"deeper.Other","o":[]},{"i":"Test","o":[]}]

const [a, b, c, d] = JSON.parse(str, reviver);

a.constructor === Object; // true
b instanceof Some;        // true
c instanceof Other;       // true
d instanceof Test;        // true
```
