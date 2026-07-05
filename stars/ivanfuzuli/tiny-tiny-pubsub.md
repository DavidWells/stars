---
repo: ivanfuzuli/tiny-tiny-pubsub
url: 'https://github.com/ivanfuzuli/tiny-tiny-pubsub'
homepage: ''
starredAt: '2022-03-02T06:36:32Z'
createdAt: '2022-02-26T18:08:11Z'
updatedAt: '2024-06-27T06:25:28Z'
language: TypeScript
license: MIT
branch: main
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:03.846Z'
description: An event management system.
tags: []
---

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/ivanfuzuli/tiny-tiny-pubsub/Release/main)
![npm bundle size](https://img.shields.io/bundlephobia/min/tiny-tiny-pubsub)
![npm](https://img.shields.io/npm/v/tiny-tiny-pubsub)
![GitHub last commit](https://img.shields.io/github/last-commit/ivanfuzuli/tiny-tiny-pubsub)
![GitHub](https://img.shields.io/github/license/ivanfuzuli/tiny-tiny-pubsub)

## What is the purpose?

It's a very tiny library for **publish/subscribe(pubsub)** operations. There's **no dependency**. It's **only** 933(gziped: 437) byte. Written in **TypeScript**

## Tests Coverage

**100%** coverage.

## Usage

### Install package

```javascript
# NPM
npm install tiny-tiny-pubsub

# Yarn
yarn add tiny-tiny-pubsub
```

### Register a function

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.on('test', (data) => {
  console.log('called with ' + data);
});
```

### Unregister a function

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.off('test', fn);
```

### Trigger

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.trigger('test', 'sample data');
```

### Clear

It clears all event listeners.

```javascript
import pubsub from 'tiny-tiny-pubsub';
pubsub.clear();
```

### Wildcard support

Pubsub be able to support **wildcard** text matching.

For example:

If there are event registrations as below and user calls it with `trigger` method.

```javascript
pubsub.on("john", () => console.log("john");
pubsub.on("john.doe", () => console.log("john's name");
pubsub.on("john.doe.mail", () => console.log("john's mail");
pubsub.trigger("john.*")
```

all previously defined functions must be called except "john".

```javascript
// console output
"john's name";
"john's mail";
```

or user should be able to remove event listeners based on wildcards.

```javascript
pubsub.off('john.*');
pubsub.trigger('john');
pubsub.trigger('john.doe');
pubsub.trigger('john.doe.mail');
```

```javascript
// console output
'john';
```

there must be only one listener in listeners array that is "john"
Because user removed all listeners which matched with wildcard query that ends with asterix except "john".

### Licence

MIT
